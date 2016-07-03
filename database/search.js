/**
 * Created by rbwilliams on 17/06/2016.
 */
var models = require('./models');

exports.testSearch = function () {
    models.TestModel.find(function (err, docs){
     if (err) return console.error(err);
     //console.log(docs);
     });
    /*models.reportModel.find(function (err, docs) {
        if (err) return console.error(err+ " search.testSearch.reportModel.find");
        console.log(docs);
    });*/
};



exports.findReports = function () {
    models.reportModel.find({}, function (err, docs){
        if (err) return console.log(err + " search.findReports");
        //console.log(docs);
    });
};