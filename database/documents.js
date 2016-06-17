/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    models = require('./models');

var testDoc = new models.TestModel({
    name: 'testing123'
});

exports.doc = testDoc;
