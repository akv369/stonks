const path = require('path');
const express = require('express');
const marketC = require('../controllers/market');
const searchC = require('../controllers/search');
const updateC = require('../controllers/updation');
const router = express.Router();

router.get('/search/:searchID', searchC.getSearch);
router.get('/stock/:stockID', marketC.getStock);
router.get('/graph/:stockID', marketC.getGraph);
router.get('/similarstock/:stockID', marketC.getSimilarStock);
router.get('/updatestocks', updateC.updateStocksData);
router.get('/updateportfolios', updateC.updatePortfoliosData);
router.get('/allStocks', marketC.getAllStocks);
router.post('/allStocks', marketC.postAllStocks);

module.exports = router;
