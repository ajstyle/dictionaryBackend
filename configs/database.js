var mongoose = require('mongoose');

//Set up default mongoose connection

//demo URL
var mongoDB = 'mongodb://plan2go:plan2go@plan2go-shard-00-00-sljbn.mongodb.net:27017,plan2go-shard-00-01-sljbn.mongodb.net:27017,plan2go-shard-00-02-sljbn.mongodb.net:27017/plan2go?ssl=true&replicaSet=plan2go-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(mongoDB, { useMongoClient : true   });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notificati#on of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
