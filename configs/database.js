var mongoose = require('mongoose');

//Set up default mongoose connection

//demo URL

var uri = "mongodb://amitjain:amit1992@cluster0-shard-00-00-di9yd.mongodb.net:27017,cluster0-shard-00-01-di9yd.mongodb.net:27017,cluster0-shard-00-02-di9yd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(uri, { useMongoClient : true   }).then(x => {
  console.log('Monngo Connected');
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notificati#on of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
