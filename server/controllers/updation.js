const axios = require('axios');
const dateTime = require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const Portfolio = require('../models/portfolio');
const mongoose = require('mongoose');

exports.updateStocks = (req, res) => {
  Order.findOne({ _id: req.params.orderID })
    .then((resp) => res.send(resp))
    .catch((err) => console.log(err));
};

exports.updatePortFolios = (req, res) => {
  Portfolio.find()
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
};

exports.updateOrders = (req, res) => {
  console.log('updateOrders');
};

exports.executeOrders = (req, res) => {
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
                  if (respo === null) {
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
                      investedValue: 0,
                      totalReturns: 0,
                      stocks: newStockInPortfolio,
                    });
                    newPortfolio
                      .save()
                      .then((respon) =>
                        console.log(respon._id + ' portfolio created...')
                      )
                      .catch((err) => console.log(err));
                  } else {
                    const stocksInPortfolio = respo.stocks;
                    const index = stocksInPortfolio.findIndex(
                      (element) => element.code === currentOrder.code
                    );
                    if (index === -1) {
                      let averagePrice =
                        currentOrder.totalAmount / currentOrder.quantity;
                      const newStockInPortfolio = {
                        code: currentOrder.code,
                        name: currentOrder.name,
                        quantity: currentOrder.quantity,
                        averagePrice: averagePrice,
                        returns: 0,
                        returnPercent: 0,
                        value: currentOrder.totalAmount,
                      };
                      stocksInPortfolio.push(newStockInPortfolio);
                      const investedValue = (
                        respo.investedValue + currentOrder.totalAmount
                      ).toFixed(2);
                      Portfolio.updateOne(
                        { _id: respo._id },
                        {
                          investedValue: investedValue,
                          stocks: stocksInPortfolio,
                        }
                      ).catch((err) => console.log(err));
                    } else {
                      let currentStock = stocksInPortfolio[index];
                      currentStock.value = (
                        currentStock.value + currentOrder.totalAmount
                      ).toFixed(2);
                      currentStock.quantity =
                        currentStock.quantity + currentOrder.quantity;
                      currentStock.averagePrice = (
                        currentStock.value / currentStock.quantity
                      ).toFixed(2);
                      stocksInPortfolio[index] = currentStock;
                      const investedValue = (
                        respo.investedValue + currentOrder.totalAmount
                      ).toFixed(2);
                      Portfolio.updateOne(
                        { _id: respo._id },
                        {
                          investedValue: investedValue,
                          stocks: stocksInPortfolio,
                        }
                      ).catch((err) => console.log(err));
                    }
                  }
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  res.send('Executed');
};

exports.getOrders = (req, res) => {
  Order.find({ userID: req.user._id })
    .sort({ verifiedTimestamp: -1 })
    .then((resp) => res.send(resp))
    .catch((err) => console.log(err));
};

exports.getDashboard = (req, res) => {
  Portfolio.findOne({ userID: req.user._id })
    .then((resp) => res.send(resp))
    .catch((err) => console.log(err));
};

exports.getWatchlist = (req, res) => {
  const watchlist = req.user.watchlist;
  let sendList = [];
  fetchData();
  async function fetchData() {
    for (let i = 0; i < watchlist.length; i++) {
      await Stock.find({ code: watchlist[i] })
        .then((response) => {
          sendList.push(response[0]);
        })
        .catch((err) => {
          console.log(err);
        });
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
        console.log(newStocks);
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
        console.log(newStocks);

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
