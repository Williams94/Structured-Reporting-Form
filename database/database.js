/**
 * Created by rbwilliams on 14/06/2016.
 */

var mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    schemas = require('./schemas'),
    models = require('./models'),
    documents = require('./documents'),
    save = require('./save'),
    search = require('./search'),
    url = 'mongodb://localhost:27017/test',
    database = '',
    connected = false;

// Starts the database using mongoose with callbacks
// when there is an error and when the connection is open
exports.startDatabase = function(){

    mongoose.connect(url);

    database = mongoose.connection;

    database.on('error', console.error);

    database.on('open', function(){
        console.log("Connection to database established.");
        connected = true;
        testDB();


    });
};

// Function used to test initial Mongoose functionality
var testDB = function(){
    if (connected){
        //save.testDocSave();
        //search.testSearch();
    }
};

// Logs to console the collections held in the mongodb
var listCollections = function(){
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            names.forEach(function(e,i,a) {
                mongoose.connection.db.dropCollection(e.name);
                console.log("--->>", e.name);
            });
        }
    });
};

exports.connected = connected;