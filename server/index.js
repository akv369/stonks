const express = require('express');
const axios = require('axios');
const cors = require('cors');

const marketRoutes = require('./routes/market');

const app = express();
app.use(cors());

app.use(marketRoutes);

app.get('/users', (req, res) => {/*
    axios.get('https://randomuser.me/api/?page=1&results=10')
     .then(response => {
    });*/
    res.send('response.users');
});


app.listen(1111, () => {
    console.log('Listening on port 1111');
});
