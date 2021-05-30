const axios = require('axios');
const dateTime = require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const Portfolio = require('../models/portfolio');
const Graph = require('../models/graph');
const Updation = require('../models/updation');

// exports.updateOrder = (stockName) => updateOrder(stockName);
exports.updatePortfolio = (_id) => updatePortfolio(_id);

exports.updateUserData = (req, res) => {
  res.send('Started');
  console.log('Lets Start :)');
  let stockList = [];
  Portfolio.find()
    .then((resp) => {
      resp.map((item) => {
        updatePortfolio(item._id);
      });
    })
    .catch((err) => console.log(err));
};

async function updatePortfolio(portfolioID) {
  Portfolio.findOne({ _id: portfolioID })
    .then((resp) => {
      let stocks = resp.stocks;
      let returns = 0,
        i = 0;
      let returnsPercent = 0;
      stocks.map((stock) => {
        Stock.findOne({ code: stock.code }).then((respo) => {
          i++;
          let stockReturn = (
            (respo.cmp - stock.averagePrice) *
            stock.quantity
          ).toFixed(2);
          stock.value = Number((respo.cmp * stock.quantity).toFixed(2));
          stock.returns = Number(stockReturn);
          stock.returnsPercent = Number(
            (
              (stock.returns * 100) /
              (stock.averagePrice * stock.quantity)
            ).toFixed(2)
          );
          returns += Number(stockReturn);
          if (i === stocks.length) {
            returnsPercent = Number(
              ((returns * 100) / resp.investedValue).toFixed(2)
            );
            updatePortfolioNow();
          }
        });
      });

      function updatePortfolioNow() {
        Portfolio.findByIdAndUpdate(portfolioID, {
          totalReturns: returns,
          stocks: stocks,
          returnsPercent: returnsPercent,
        })
          .then((respo) => console.log(`${portfolioID} portfolio updated`))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
