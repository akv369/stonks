const axios = require('axios');
const dateTime = require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const Portfolio = require('../models/portfolio');
const Graph = require('../models/graph');
const Watch = require('../models/watch');

exports.updateStock = (stockName) => updateStock(stockName);
exports.updateGraph = (stockName) => updateGraph(stockName);

exports.updateStocksData = (req, res) => {
  res.send('Started');
  console.log('Started :)');
  // setInterval(intervalFunc, 65000);
  // function intervalFunc() {
  //   let stockList = [];
  //   Stock.find()
  //     .sort({ lastUpdated: 1 })
  //     .limit(5)
  //     .then((resp) => {
  //       resp.map((item) => {
  //         console.log(item.code);
  //         stockList.push(item.code);
  //       });
  //       console.log(stockList);
  //       startUpdate();
  //     })
  //     .catch((err) => console.log(err));
  //   function startUpdate() {
  //     for (let i = 0; i < 5; i++) {
  //       updateGraph(stockList[i]);
  //       updateStock(stockList[i]);
  //     }
  //   }
  // }

  // Watch.find()
  //   .then(res => {
  //     res.map(stock => {
  //       const newsScore = stock.newsScore ? stock.newsScore : 0;
  //       const userScore = stock.userScore ? stock.userScore : 0;
  //       Watch.findByIdAndUpdate(stock._id,{userScore:userScore, newsScore: newsScore})
  //         .then((result) => {
  //           console.log(`${stock.code} done`);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     })
  //   })

  // Stock.find()
  //   .sort({ lastUpdated: 1 })
  //   .then((resp) => {
  //     resp.map((item) => {
  //         stockList.push(item.code)
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

async function updateStock(stockName) {
  let avData, tdData;
  if (stockName) await fetchFromApi();
  async function fetchFromApi() {
    const a1 = 'OR7C580Y9LGTY7ZE';
    const a2 = 'U13VR4LQ6T70HUZ3';
    const a3 = 'V8JAZ6B117C590RH';
    const t1 = 'd609067766fb4ac9bcd8a24d328d7a13';
    const t2 = 'c40c191c2f3f428d8625ebaad4d34349';
    const t3 = '9406b1e2abbd4402a8ef168c684045c1';
    await axios
      .get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockName}&apikey=${a2}`
      )
      .then((response) => {
        avData = response.data;
        if (avData['Sector'] === undefined) {
          console.log('AlphaVantage Failed');
          console.log(response.path);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`https://api.twelvedata.com/quote?symbol=${stockName}&apikey=${t2}`)
      .then((response) => {
        tdData = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (avData['Sector']) {
    let companyName = avData['Name'];
    let companySymbol = avData['Symbol'];
    let marketCapitalization = avData['MarketCapitalization'];
    let labelValue = avData['MarketCapitalization'];
    let marketCap =
      Number(labelValue) >= 1.0e12
        ? (Number(labelValue) / 1.0e12).toFixed(2) + 'T'
        : Number(labelValue) >= 1.0e9
        ? (Number(labelValue) / 1.0e9).toFixed(2) + 'B'
        : Number(labelValue) >= 1.0e6
        ? (Number(labelValue) / 1.0e6).toFixed(2) + 'M'
        : (Number(labelValue) / 1.0e3).toFixed(2) + 'K';
    let pegRatio = Number(avData['PEGRatio']).toFixed(2);
    if (isNaN(pegRatio)) pegRatio = 0;
    let peRatio = Number(avData['PERatio']).toFixed(2);
    if (isNaN(peRatio)) peRatio = 0;
    labelValue = avData['EBITDA'];
    let ebitda =
      Number(labelValue) >= 1.0e12
        ? Number(labelValue) / 1.0e12 + 'T'
        : Number(labelValue) >= 1.0e9
        ? Number(labelValue) / 1.0e9 + 'B'
        : Number(labelValue) >= 1.0e6
        ? Number(labelValue) / 1.0e6 + 'M'
        : Number(labelValue) / 1.0e3 + 'K';
    ebitda = Number(ebitda.slice(0, -1)).toFixed(2) + ebitda[ebitda.length - 1];
    if (isNaN(ebitda)) ebitda = '0';
    let divYield = (Number(avData['DividendYield']) * 100).toFixed(2);
    if (isNaN(divYield)) divYield = 0;
    let bookValue = Number(avData['BookValue']).toFixed(2);
    if (isNaN(bookValue)) bookValue = 0;
    let eps = Number(avData['EPS']).toFixed(2);
    if (isNaN(eps)) eps = 0;
    let roe = (Number(avData['ReturnOnEquityTTM']) * 100).toFixed(2);
    if (isNaN(roe)) roe = 0;
    let about = avData['Description'];
    let exchange = avData['Exchange'];
    let sector = avData['Sector'];
    let industry = avData['Industry'];
    let assetType = avData['AssetType'];
    let _52wh = Number(avData['52WeekHigh']).toFixed(2);
    let _52wl = Number(avData['52WeekLow']).toFixed(2);
    let volume = tdData['volume'];
    let _200dma = Number(avData['200DayMovingAverage']).toFixed(2);
    let open = Number(tdData['open']).toFixed(2);
    let high = Number(tdData['high']).toFixed(2);
    let low = Number(tdData['low']).toFixed(2);
    let previousClose = Number(tdData['previous_close']).toFixed(2);
    let close = Number(tdData['close']).toFixed(2);
    let pChange = Number(tdData['percent_change']).toFixed(2);
    let change,
      tChange = 0;
    if (isNaN(tdData['change'].slice(0, 1)))
      change = Number(tdData['change']).toFixed(2);
    else {
      change = '+' + String(Number(tdData['change']).toFixed(2));
      tChange = 1;
    }

    const newData = {
      code: companySymbol,
      name: companyName,
      cmp: close,
      _200dma: _200dma,
      _52wh: _52wh,
      _52wl: _52wl,
      volume: volume,
      marketCap: marketCap,
      roe: roe,
      peRatio: peRatio,
      exchange: exchange,
      marketCapitalization: marketCapitalization,
      change: change,
      tChange: tChange,
      pChange: pChange,
      open: open,
      high: high,
      low: low,
      previousClose: previousClose,
      pegRatio: pegRatio,
      ebitda: ebitda,
      divYield: divYield,
      bookValue: bookValue,
      eps: eps,
      about: about,
      sector: sector,
      industry: industry,
      assetType: assetType,
      lastUpdated: Date.now(),
    };

    Stock.updateOne({ code: stockName }, newData)
      .then((result) => {
        if (!result.n) {
          const stock = new Stock(newData);
          stock
            .save()
            .then((result) => {
              console.log(stockName + ' Saved');
            })
            .catch((err) => {
              console.log(err);
            });
        } else console.log(stockName + ' Updated');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function updateGraph(stockName) {
  if (stockName === undefined) return;
  const key1 = '49f8384292044ed6864c6b5cfb6a9c09',
    key2 = 'ad9b6465a8b745c9af565cb3ed658609',
    key3 = '16d95139104f441f9c38f4aaad13a634';
  for (let i = 0; i < 3; i++) {
    let key, time;
    if (i == 0) {
      key = key1;
      time = '1day';
    } else if (i == 1) {
      key = key2;
      time = '1week';
    } else if (i == 2) {
      key = key3;
      time = '1month';
    }
    await axios
      .get(
        `https://api.twelvedata.com/time_series?symbol=${stockName}&interval=${time}&apikey=${key}`
      )
      .then((response) => {
        const data = response.data;
        Graph.updateOne(
          { code: data.meta.symbol, interval: data.meta.interval },
          { values: data.values }
        )
          .then((result) => {
            if (!result.n) {
              const graph = new Graph({
                code: data.meta.symbol,
                interval: data.meta.interval,
                currency: data.meta.currency,
                values: data.values,
              });
              graph
                .save()
                .then(
                  console.log(`${stockName} ${data.meta.interval} Graph Saved`)
                )
                .catch((err) => {
                  console.log(err);
                });
            } else
              console.log(`${stockName} ${data.meta.interval} Graph Updated`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
