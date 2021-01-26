const path = require('path');

const express = require('express');

const marketC = require('../controllers/market');

const router = express.Router();

router.get('/l', marketC.getL);

router.post('/l', marketC.postL);

router.get('/login', marketC.getLogin);

router.post('/login', marketC.postLogin);

module.exports = router;
