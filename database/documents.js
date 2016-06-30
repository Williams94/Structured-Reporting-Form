/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    models = require('./models');

exports.newReport = function (req, res){
    console.log(req.body);
};

exports.descriptors = function (req, res){
    console.log(req.body.descriptors[0].zonalDominance);
};

var reportDoc = new models.reportModel({

});

var testDoc = new models.TestModel({
    name: 'testing123'
});

exports.doc = testDoc;
