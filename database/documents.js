/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose'),
    models = require('./models'),
    save = require('./save');

exports.newReport = function (req, res) {
    console.log(req.body.descriptors);
    var reportDoc = new models.reportModel({
        author: {firstName: req.body.firstName, lastName: req.body.lastName},
        created: req.body.created,
        level: req.body.level,
        referringPhysician: req.body.referringPhysician,
        caseID: req.body.caseID/*,
        descriptors: [
            {
                zonalDominance: [
                    {
                        "name": req.body.descriptors[0].name,
                        "basal": req.body.descriptors[0].basal,
                        "upper": req.body.descriptors[0].upper,
                        "middle": req.body.descriptors[0].middle,
                        "none": req.body.descriptors[0].none
                    },
                    {
                        "name": String,
                        "posterior": Boolean,
                        "anterior": Boolean,
                        "none": Boolean
                    },
                    {
                        "name": String,
                        "symmetrical": Boolean,
                        "asymmetrical": Boolean
                    },
                    {
                        "name": String,
                        "central": Boolean,
                        "peripheral": Boolean,
                        "none": Boolean
                    }
                ]
            }
        ]*/
    });

    save.newReportDocSave(reportDoc, function () {
        console.log("Saved");
    });
};

exports.updateReport = function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error findings doc to update");

        doc.author.firstName = req.body.firstName;
        doc.author.lastName = req.body.lastName;
        doc.created = req.body.created;
        doc.level = req.body.level;
        doc.referringPhysician = req.body.referringPhysician;

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc");
            console.log("report updated");
        })
    });
};

exports.deleteReport = function (req, res) {
    models.reportModel.findById(req.body.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report to update");

        doc.remove();
    })
};

exports.descriptors1 = function (req, res) {
    console.log(req.body.descriptors[0]);
};


var testDoc = new models.TestModel({
    name: 'testing123'
});

exports.doc = testDoc;
