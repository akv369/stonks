const axios = require('axios');

exports.getSearch = (req, res) => {
  let path =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
    req.params.searchID +
    '&apikey=CJZEFRDYZ1YXGYTW';
  axios.get(path).then((response) => {
    let data = response.data.bestMatches;
    let arrLen,
      searchResults = [];
    arrLen = data ? data.length : 0;
    for (let i = 0; i < arrLen; i++) {
      const stock = data[i];
      if (
        stock['3. type'] === 'Equity' &&
        stock['4. region'] === 'United States' &&
        stock['8. currency'] === 'USD'
      ) {
        let result = {};
        result.code = stock['1. symbol'];
        result.name = stock['2. name'];
        searchResults.push(result);
      }
    }
    res.send(searchResults);
  });
};
