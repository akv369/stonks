const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb://localhost:27017', 
        {useUnifiedTopology: true}
    )
    .then(client => {
      console.log('Mongo Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
