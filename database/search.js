/**
 * Created by rbwilliams on 17/06/2016.
 */
var models = require('./models');

exports.testSearch = models.TestModel.find(function (err, docs){
    if (err) return console.error(err);
    console.log(docs);
});