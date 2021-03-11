const path = require('path');
const express = require('express');
const marketC = require('../controllers/market');
const searchC = require('../controllers/search');
const router = express.Router();

router.get('/search/:searchID', searchC.getSearch);
router.get('/stock/:stockID', marketC.getStock);
router.get('/allStocks', marketC.getAllStocks);
router.post('/allStocks', marketC.postAllStocks);

module.exports = router;
