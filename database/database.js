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

var testDB = function(){
    if (connected){
        //save.testDocSave();
        //search.testSearch();
    }
};

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