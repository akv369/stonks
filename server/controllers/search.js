const axios = require('axios');

exports.getSearch = (req, res) => {
  let path =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
    req.params.searchID +
    '&apikey=OR7C580Y9LGTY7ZE';
  axios.get(path).then((response) => {
    let data = response.data.bestMatches;
    let i = 0,
      j = 0,
      arrLen,
      dispLen = 0,
      dispArr = [],
      nameArr = [],
      codeArr = [];
    arrLen = data ? data.length : 0;
    for (let i = 0; i < arrLen; i++) {
      let j = 0,
        k = 0;
      Object.values(data[i]).map((value) => {
        if (j === 1 && value.length < 30) k = 1;
        if (k === 1 && j === 2 && value === 'Equity') k = 2;
        if (k === 2 && j === 7 && value === 'USD') {
          dispLen++;
          dispArr.push(data[i]);
        }
        j++;
      });
    }
    if (dispLen > 0) {
      for (i = 0; i < dispLen; i++) {
        let j = 0;
        Object.values(dispArr[i]).map((value) => {
          j++;
          if (j === 1) codeArr.push(value);
          else if (j === 2) nameArr.push(value);
        });
      }
      res.send({
        nameArr: nameArr,
        codeArr: codeArr,
      });
    }
  });
};
