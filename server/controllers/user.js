const axios = require('axios');
const dateTime = require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const Portfolio = require('../models/portfolio');
const userUpdate = require('./userDataUpdation');

exports.placeOrders = () => placeOrders();
exports.executeOrders = () => executeOrders();

exports.getOrderDetails = (req, res) => {
  Order.findOne({ _id: req.params.orderID })
    .then((resp) => {
      const code = resp.code;
      Stock.findOne({ code: code }).then((respo) => {
        Order.updateOne(
          { _id: req.params.orderID },
          { cmp: respo.cmp }
        ).catch((err) => console.log(err));
        let sendData = resp;
        sendData.cmp = respo.cmp;
        if (sendData.userID !== req.body._id) res.send('Access Denied');
        else res.send(sendData);
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  let fetchedData;
  fetchStock();
  async function fetchStock() {
    const userID = req.body.userID;
    const code = req.body.code;
    const quantity = Number(req.body.quantity);
    const type = req.body.type;
    const order = req.body.order;
    const subType = req.body.subType;
    const orderPrice = Number(req.body.orderPrice);
    const status = 'In Progress';
    const progress = 'Verified';
    await Stock.findOne({ code: req.body.code })
      .then((res) => (fetchedData = res))
      .catch((err) => console.log(err));
    const name = fetchedData.name;
    const cmp = fetchedData.cmp;
    const exchange = fetchedData.exchange;
    let balanceBeforeTransaction;
    await User.findOne({ _id: req.body.userID })
      .then((res) => (balanceBeforeTransaction = res.balance))
      .catch((err) => console.log(err));
    const now = new Date();
    const verifiedTimestamp = dateTime.format(
      now,
      'YYYY-MM-DD HH:mm:ss A [GMT]Z'
    );
    let totalAmount =
      subType === 'Market' ? quantity * cmp : quantity * orderPrice;
    totalAmount = totalAmount.toFixed(2);
    const saveOrder = new Order({
      userID: userID,
      code: code,
      name: name,
      quantity: quantity,
      type: type,
      order: order,
      subType: subType,
      balanceBeforeTransaction: balanceBeforeTransaction,
      orderPrice: orderPrice,
      cmp: cmp,
      exchange: exchange,
      status: status,
      progress: progress,
      verifiedTimestamp: verifiedTimestamp,
      totalAmount: totalAmount,
    });
    saveOrder
      .save()
      .then((response) => {
        placeOrders();
        const now = new Date();
        const hour = Number(dateTime.format(now, 'HH'));
        const minute = Number(dateTime.format(now, 'mm'));
        if (hour >= 17 || hour < 1 || (hour === 1 && minute <= 30)) {
          if (order === 'Market') res.send('Executed');
          else res.send('Placed');
        } else res.send('Verified');
      })
      .catch((err) => console.log(err));
  }
};

async function placeOrders() {
  const now = new Date();
  const hour = Number(dateTime.format(now, 'HH'));
  const minute = Number(dateTime.format(now, 'mm'));
  if (hour >= 17 || hour < 1 || (hour === 1 && minute <= 30)) {
    Order.find({ progress: 'Verified' })
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          const currentOrder = result[i];
          const type = currentOrder.type;
          const balance = currentOrder.balanceBeforeTransaction;
          const amount = currentOrder.totalAmount;
          let balanceAfterTransaction =
            type === 'Sell' ? balance + amount : balance - amount;
          balanceAfterTransaction = balanceAfterTransaction.toFixed(2);
          const now = new Date();
          const timestamp = dateTime.format(
            now,
            'YYYY-MM-DD HH:mm:ss A [GMT]Z'
          );
          User.updateOne(
            { _id: currentOrder.userID },
            { balance: balanceAfterTransaction }
          )
            .then(
              Order.updateOne(
                { _id: currentOrder._id },
                {
                  balanceAfterTransaction: balanceAfterTransaction,
                  progress: 'Placed',
                  placedTimestamp: timestamp,
                }
              )
                .then((response) => {
                  executeOrders();
                })
                .catch((err) => console.log(err))
            )
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  } else console.log('Markets Closed');
}

async function executeOrders() {
  Order.find({ progress: 'Placed' })
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        const currentOrder = result[i];
        const now = new Date();
        const timestamp = dateTime.format(now, 'YYYY-MM-DD HH:mm:ss A [GMT]Z');
        Order.updateOne(
          { _id: currentOrder._id },
          {
            progress: 'Executed',
            status: 'Successful',
            executedTimestamp: timestamp,
          }
        )
          .then((resp) => {
            if (resp.n == 1) {
              Portfolio.findOne({ userID: currentOrder.userID })
                .then((respo) => {
                  if (!respo) {
                    const newStockInPortfolio = {
                      code: currentOrder.code,
                      name: currentOrder.name,
                      quantity: currentOrder.quantity,
                      averagePrice: currentOrder.totalAmount,
                      returns: 0,
                      returnPercent: 0,
                      value: currentOrder.totalAmount,
                    };
                    let stocks = [];
                    stocks.push(newStockInPortfolio);
                    const newPortfolio = new Portfolio({
                      userID: currentOrder.userID,
                      investedValue: currentOrder.totalAmount,
                      totalReturns: 0,
                      stocks: stocks,
                    });
                    newPortfolio
                      .save()
                      .then((respon) =>
                        console.log(respon._id + ' portfolio created')
                      )
                      .catch((err) => console.log(err));
                  } else {
                    let stocksInPortfolio = respo.stocks;
                    const index = stocksInPortfolio.findIndex(
                      (element) => element.code === currentOrder.code
                    );
                    let investedValue = respo.investedValue;
                    if (index === -1) {
                      const newStockInPortfolio = {
                        code: currentOrder.code,
                        name: currentOrder.name,
                        quantity: currentOrder.quantity,
                        averagePrice: currentOrder.orderPrice,
                        returns: 0,
                        returnPercent: 0,
                        value: currentOrder.totalAmount,
                      };
                      stocksInPortfolio.push(newStockInPortfolio);
                      investedValue += currentOrder.totalAmount;
                    } else {
                      let currentStock = stocksInPortfolio[index];
                      if (currentOrder.type === 'Buy') {
                        currentStock.averagePrice = (
                          (currentOrder.totalAmount + (currentStock.averagePrice*currentStock.quantity)) /
                          (currentStock.quantity + currentOrder.quantity)
                        ).toFixed(2);
                        currentStock.value = (
                          currentStock.value + currentOrder.totalAmount
                        ).toFixed(2);
                        currentStock.quantity =
                          currentStock.quantity + currentOrder.quantity;
                        stocksInPortfolio[index] = currentStock;
                        investedValue += currentOrder.totalAmount;
                      } else {
                        currentStock.value = (
                          currentStock.value - currentOrder.totalAmount
                        ).toFixed(2);
                        currentStock.quantity =
                          currentStock.quantity - currentOrder.quantity;
                        stocksInPortfolio[index] = currentStock;
                        if (currentStock.quantity === 0) {
                          for (
                            let i = index;
                            i < stocksInPortfolio.length - 1;
                            i++
                          ) {
                            stocksInPortfolio[i] = stocksInPortfolio[i + 1];
                          }
                          stocksInPortfolio.pop();
                        }
                        investedValue -= currentOrder.totalAmount;
                      }
                    }
                    Portfolio.updateOne(
                      { _id: respo._id },
                      {
                        investedValue: investedValue,
                        stocks: stocksInPortfolio,
                      }
                    )
                      .then(console.log(`Added order to ${respo._id} portfolio`))
                      .catch((err) => console.log(err));
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}

exports.getOrders = (req, res) => {
  Order.find({ userID: req.body._id })
    .sort({ verifiedTimestamp: -1 })
    .then((resp) => {
      const status = req.body.status;
      const type = req.body.type;
      let sendData = [];
      if (resp.length) {
        for (let i = 0; i < resp.length; i++) {
          const order = resp[i];
          if (
            (status === 'All' || status === order.status) &&
            (type === 'All' || type === order.type)
          )
            sendData.push(order);
        }
      }
      if (sendData.length > 0) res.send(sendData);
      else res.send('Data Unavailable');
    })
    .catch((err) => console.log(err));
};

exports.getHome = (req, res) => {
  Portfolio.findOne({ userID: req.body._id })
    .then((resp) => {
      if (resp === null) res.send('Data Unavailable');
      else {
        userUpdate.updatePortfolio(resp._id);
        let stocks = resp.stocks;
        stocks.sort(function (a, b) {
          return a.returns - b.returns;
        });
        const sendData = {
          gainer: stocks[stocks.length - 1],
          loser: stocks[0],
          returnsPercent: resp.returnsPercent,
        };
        res.send(sendData);
      }
    })
    .catch((err) => console.log(err));
};

exports.getDashboard = (req, res) => {
  console.log(req.body);
  Portfolio.findOne({ userID: req.body._id })
    .then((resp) => {
      if (resp === null) res.send('Data Unavailable');
      else res.send(resp);
    })
    .catch((err) => console.log(err));
};

exports.getAvailableStocks = (req, res) => {
  const stockID = req.params.stockID;
  Portfolio.findOne({ userID: req.body._id })
    .then((resp) => {
      let sent=0;
      if (resp === null){ res.send({ quantity: 0 });sent=1;}
      else {
        const stocks = resp.stocks;
        for (let i = 0; i < stocks.length; i++) {
          const stock = stocks[i];
          if (stock.code === stockID){res.send({quantity:stock.quantity});sent=1;}
        }
      }
      if(sent===0)res.send({ quantity: 0 });
    })
    .catch((err) => console.log(err));
};

exports.getWatchlist = (req, res) => {
  let sendList = [],
    watchList = [];

  User.findById(req.body._id)
    .then((user) => {
      console.log(user);
      if (user !== null && user.watchlist.length > 0) {
        watchList = user.watchlist;
        getData();
      } else res.send('Data Unavailable');
    })
    .catch((err) => console.log(err));

  async function getData() {
    for (let i = 0; i < watchList.length; i++) {
      await Stock.findOne({ code: watchList[i] })
        .then((stock) => sendList.push(stock))
        .catch((err) => console.log(err));
    }
    res.send(sendList);
  }
};

exports.addToWatchList = (req, res) => {
  const _id = req.body.userId;
  const code = req.body.code;

  if (_id.length > 1 && code.length > 0) {
    User.findById(_id)
      .then((result) => {
        let newStocks = result.watchlist,
          f = 1;
        for (let i = 0; i < newStocks.length; i++) {
          if (newStocks[i] === code) f = 0;
        }
        if (f) {
          newStocks.push(code);
          User.findByIdAndUpdate(_id, { watchlist: newStocks })
            .then((resp) => {
              console.log('Added to WatchList');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.removeFromWatchList = (req, res) => {
  const _id = req.body.userId;
  const code = req.body.code;

  if (_id.length > 1 && code.length > 0) {
    User.findById(_id)
      .then((result) => {
        let newStocks = result.watchlist;
        const len = newStocks.length;
        for (let i = 0; i < len; i++) {
          if (newStocks[i] == code) {
            for (let j = i + 1; j < len; j++) {
              newStocks[j - 1] = newStocks[j];
            }
            newStocks.pop();
            break;
          }
        }

        User.findByIdAndUpdate(_id, { watchlist: newStocks })
          .then((resp) => {
            console.log('Removed from WatchList');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.send('Removed');
};
