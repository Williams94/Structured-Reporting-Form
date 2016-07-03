/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    models = require('./models'),
    save = require('./save');

exports.newReport = function (req, res){
    var reportDoc = new models.reportModel({
        author: { firstName: req.body.firstName, lastName: req.body.lastName},
        created: req.body.created,
        level: req.body.level,
        referringPhysician: req.body.referringPhysician,
        caseID: req.body.caseID
    });

    save.newReportDocSave(reportDoc, function(){
        console.log("Saved");
    });
};

exports.descriptors = function (req, res){
    console.log(req.body.descriptors[0].zonalDominance);
};



var testDoc = new models.TestModel({
    name: 'testing123'
});

exports.doc = testDoc;