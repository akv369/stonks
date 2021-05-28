const axios = require('axios');

exports.getSearch = (req, res) => {
  // function intervalFunc() {
  //   console.log('Cant stop me now!');
  // }

  // setInterval(intervalFunc, 1500);

  let path =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
    req.params.searchID +
    '&apikey=CJZEFRDYZ1YXGYTW';
  axios.get(path).then((response) => {
    let data = response.data.bestMatches;
    let i = 0,
      j = 0,
      arrLen,
      nameArr = [],
      codeArr = [];
    arrLen = data ? data.length : 0;
    for (let i = 0; i < arrLen; i++) {
      const stock = data[i];
      if (
        stock['3. type'] === 'Equity' &&
        stock['4. region'] === 'United States' &&
        stock['8. currency'] === 'USD'
      ) {
        console.log(stock);
        codeArr.push(stock['1. symbol']);
        nameArr.push(stock['2. name']);
      }
    }
    res.send({
      nameArr: nameArr,
      codeArr: codeArr,
    });
  });
};
