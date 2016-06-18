/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    models = require('./models');

var reportDoc = new models.reportModel({

});

var testDoc = new models.TestModel({
    name: 'testing123'
});

exports.doc = testDoc;
