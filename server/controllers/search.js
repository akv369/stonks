const axios = require('axios');

exports.getSearch = (req, res) => {
  let path =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
    req.params.searchID +
    '&apikey=BMCR4UT4WWSY40XY';
  let path2 =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
    req.params.searchID +
    '&apikey=0Y422GSYV68OXAMN';
  axios.get(path).then((response) => {
    if (response.data.bestMatches) sendResults(response.data.bestMatches);
    else {
      axios.get(path2).then((resp) => {
        sendResults(resp.data.bestMatches);
      });
    }
  });
  function sendResults(data) {
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
    console.log(`${searchResults.length} stocks sent as search result`);
  }
};
