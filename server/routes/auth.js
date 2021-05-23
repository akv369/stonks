const path = require('path');
const express = require('express');
const authC = require('../controllers/auth');
const router = express.Router();

router.post('/login', authC.postLogin);
router.post('/logout', authC.postLogout);

module.exports = router;
