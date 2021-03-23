const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const path = require('path');
const cors = require('cors');

const marketRoutes = require('./routes/market');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const mongoDbUri = 'mongodb+srv://akash:JccEy11nQWbtu3Ti@stonks.hsaa7.mongodb.net/market';

const app = express();
const store = new mongoDbStore({
  uri: mongoDbUri,
  collection: 'sessions'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret:'loginPlease',
    resave: false,
    saveUninitialized: false,
    store:store
  })
)

app.use((req,res,next) => {
  User.findById('6042f71d5e5b631c10fa3d6e')
  .then(user=>{
    req.user = user;
    next();
  })
  .catch(err=>{
    console.log(err);
  })
})

app.use(cors());
app.use(marketRoutes);
app.use(userRoutes);
app.use(authRoutes);

const User = require('./models/user')

mongoose.connect(
  mongoDbUri,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false }
  )
  .then(() => {
    User.findOne().then(user=>{
      if(!user){
        const user = new User({
          name: 'Akayishh',
          balance: 50000,
          email: 'email@akayishh.com',
          watchlist:[]
        });
        user.save();
      }
    })
    app.listen(1111);
    console.log('Listening on 1111');
  })
  .catch(err => {
    console.log(err);
  });