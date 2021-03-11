const path = require('path');
const express = require('express');
const userC = require('../controllers/user');
const router = express.Router();

router.get('/order/:orderID', userC.getOrder);
router.post('/order', userC.postOrder)
router.get('/orders', userC.getOrders)
router.get('/placeOrders', userC.placeOrders)
router.get('/dashboard', userC.getDashboard);
router.get('/watchlist', userC.getWatchlist);
router.post('/addToWatchlist', userC.addToWatchList);
router.post('/removeFromWatchlist', userC.removeFromWatchList);

module.exports = router;
