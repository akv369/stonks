const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const marketRoutes = require('./routes/market');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const mongoDbUri =
  'mongodb+srv://akash:JccEy11nQWbtu3Ti@stonks.hsaa7.mongodb.net/market';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(authRoutes);
app.use(marketRoutes);
app.use(userRoutes);

mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.PORT || 1111);
    console.log('Listening on server');
  })
  .catch((err) => {
    console.log(err);
  });
