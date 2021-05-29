const express = require('express');
const axios = require('axios');
const Portfolio = require('../models/portfolio');
const Stock = require('../models/stock');
const Order = require('../models/order');
const app = express();
const User = require('../models/user');

exports.postLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          uid: req.body.uid,
          name: req.body.displayName,
          email: req.body.email,
          photoURL: req.body.photoURL,
          provider: req.body.providerId,
          balance: 50000,
          watchlist: [],
        });
        newUser
          .save()
          .then((response) => {
            console.log(`New user ${req.body.email} created`)
            res.send(response);
          })
          .catch((err) => console.log(err));
      } else {
        console.log(`User ${req.body.email} loggedIn`)
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res) => {
  req.session.uid = null;
  res.send(req.session);
};
