const express = require('express');
const userC = require('../controllers/user');
const router = express.Router();

router.get('/order/:orderID', userC.getOrder);
router.post('/orders', userC.getOrders);
router.post('/order', userC.postOrder);
router.get('/placeOrders', userC.placeOrders);
router.get('/executeOrders', userC.executeOrders);
router.post('/dashboard', userC.getDashboard);
router.post('/portfolio/:stockID', userC.getAvailableStocks);
router.post('/watchlist', userC.getWatchlist);
router.post('/addToWatchlist', userC.addToWatchList);
router.post('/removeFromWatchlist', userC.removeFromWatchList);

module.exports = router;
