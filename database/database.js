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

        //console.log(schemas.testSchema);
        //console.log(models.TestModel);
        //console.log(documents.testDoc.speak());
    });
};

exports.testDB = function(){
    if (connected){
        //save.testDocSave();
        search.testSearch();
    }
};

