/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    schemas = require('./schemas');

exports.TestModel = mongoose.model('model', schemas.schema);