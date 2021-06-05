const express = require('express');
const dbUpdateC = require('../controllers/databaseUpdation');
const userUpdateC = require('../controllers/userDataUpdation');
const router = express.Router();

router.get('/updatestocks', dbUpdateC.updateStocksData);
router.get('/updateportfolios', userUpdateC.updateUserData);

module.exports = router;
