/**
 * Created by rbwilliams on 14/06/2016.
 */

var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://localhost:27017/data',
    database = '',
    collection = '',
    connected = false;

exports.startDatabase = function(){
  MongoClient.connect(url, function(err, db){
      if (err){
          console.log("Unable to connect to database: " + err);
      } else {
          console.log("Connection to database established.");
      }
      database = db;
      // collection = database.collection('test');
      connected = true;
  });
};