const axios = require('axios');
const Stock = require('../models/stock');
const Graph = require('../models/graph');
const updateC = require('./databaseUpdation');
const mongoose = require('mongoose');

exports.getL = (req, res) => {
  res.redirect('/login');
};

exports.getWeekGraph = (req, res) => {
  const stockName = req.params.stockID.toUpperCase();
  Graph.findOne({ code: stockName, interval: '1week' })
    .then((resp) => {
      if (resp.values) {
        let sendData = {};
        sendData.code = resp.code;
        sendData.interval = resp.interval;
        sendData.coordinate = [];
        for (let i = 0; i < resp.values.length; i++) {
          const item = resp.values[i];
          let coordinates = {};
          coordinates.x = item.datetime;
          coordinates.y = Number(item.close).toFixed(2);
          sendData.coordinate.push(coordinates);
        }
        res.send(sendData);
        console.log(`${stockName} week graph sent`);
      } else console.log(`${stockName} graph not sent`);
    })
    .catch((err) => console.log(err));
};

exports.getGraph = (req, res) => {
  const stockName = req.params.stockID.toUpperCase();
  Graph.find({ code: stockName })
    .then((resp) => {
      let sendArray = [];
      for (let k = 0; k < resp.length; k++) {
        if (resp[k].values) {
          let sendData = {};
          sendData.code = resp[k].code;
          sendData.interval = resp[k].interval;
          sendData.coordinate = [];
          for (let i = 0; i < resp[k].values.length; i++) {
            const item = resp[k].values[i];
            let coordinates = {};
            coordinates.x = item.datetime;
            coordinates.y = [];
            coordinates.y.push(Number(item.open).toFixed(2));
            coordinates.y.push(Number(item.high).toFixed(2));
            coordinates.y.push(Number(item.low).toFixed(2));
            coordinates.y.push(Number(item.close).toFixed(2));
            sendData.coordinate.push(coordinates);
          }
          sendArray.push(sendData);
        }
      }
      res.send(sendArray);
      console.log(`${sendArray.length} ${stockName} graphs sent`);
    })
    .catch((err) => console.log(err));
};

exports.getStock = (req, res) => {
  const stockName = req.params.stockID.toUpperCase();
  Stock.findOne({ code: stockName })
    .then((resp) => {
      if (resp) {
        let companyOverviewData = [
            resp.marketCap,
            resp.pegRatio,
            resp.peRatio,
            resp.ebitda,
            resp.divYield,
            resp.bookValue,
            resp.eps,
            resp.roe,
            resp.about,
            resp.exchange,
            resp.sector,
            resp.industry,
            resp.assetType,
          ],
          companyPerformanceData = [
            resp._52wh,
            resp._52wl,
            resp.volume,
            resp._200dma,
            resp.open,
            resp.high,
            resp.low,
            resp.previousClose,
          ];
        res.send({
          companyName: resp.name,
          companySymbol: resp.code,
          close: resp.cmp,
          change: resp.change,
          tChange: resp.tChange,
          pChange: resp.pChange,
          overviewData: companyOverviewData,
          performanceData: companyPerformanceData,
        });
        console.log(`${resp.code} stock data sent`);
      }
      addToDB();
      async function addToDB() {
        await updateC.updateStock(stockName);
        await updateC.updateGraph(stockName);
        if (!resp) {
          console.log(`Adding ${stockName} to database`);
          res.redirect(`/stock/${stockName}`);
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.getSimilarStock = (req, res) => {
  const stockName = req.params.stockID.toUpperCase();
  Stock.findOne({ code: stockName })
    .then((resp) => {
      Stock.find({ sector: resp.sector })
        .sort({ marketCapitalization: -1 })
        .limit(9)
        .then((respo) => {
          let sendData = [];
          respo.map((eachStock) => {
            if (eachStock.code !== resp.code) sendData.push(eachStock);
          });
          if (sendData.length > 0) res.send(sendData);
          else res.send('Data Unavailable');
          console.log(
            `${sendData.length} similar stock with ${resp.code} sent`
          );
        });
    })
    .catch((err) => console.log(err));
};

exports.getAllStocks = (req, res) => {
  Stock.find().then((stocks) => {
    res.send(stocks);
  });
};

exports.postAllStocks = (req, res) => {
  Stock.find()
    .sort({ marketCapitalization: -1 })
    .then((stocks) => {
      let filteredStocks = [];
      const cmpUl = Number(req.body.cmpUl);
      const cmpLl = Number(req.body.cmpLl);
      const mcUl = Number(req.body.mcUl) * 1000000000;
      const mcLl = Number(req.body.mcLl) * 1000000000;
      const sectors = req.body.sectors;
      stocks.map((eachStock) => {
        const fetched_cmp = Number(eachStock['cmp']);
        const fetchedSector = eachStock['sector'];
        const fetchedMc = Number(eachStock['marketCapitalization']);
        if (
          cmpUl >= fetched_cmp &&
          cmpLl <= fetched_cmp &&
          mcUl >= fetchedMc &&
          mcLl <= fetchedMc &&
          (sectors['All'] || sectors[fetchedSector])
        ) {
          filteredStocks.push(eachStock);
        }
      });
      if (filteredStocks.length === 0) res.send('Data Unavailable');
      else res.send(filteredStocks);
      console.log(`${filteredStocks.length} stocks sent for screener`);
    });
};
