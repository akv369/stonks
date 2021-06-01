const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session');
// const mongoDbStore = require('connect-mongodb-session')(session);
const cors = require('cors');

const marketRoutes = require('./routes/market');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const mongoDbUri =
  'mongodb+srv://akash:JccEy11nQWbtu3Ti@stonks.hsaa7.mongodb.net/market';

const app = express();

// const store = new mongoDbStore({
//   uri: mongoDbUri,
//   collection: 'sessions',
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: 'JccEy11nQWbtu3TiJccEy11nQWbtu3Ti',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

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
    app.listen(1111);
    console.log('Listening on 1111');
  })
  .catch((err) => {
    console.log(err);
  });
