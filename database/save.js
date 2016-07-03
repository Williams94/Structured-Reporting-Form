/**
 * Created by rbwilliams on 17/06/2016.
 */
var documents = require('./documents');

exports.testDocSave = function() {
    documents.doc.save(function (err, doc) {
        if (err) return console.error(err);
        //testDoc.speak();
    });
};

exports.newReportDocSave = function(report){
    report.save(function (err, doc){
        if (err) {
            console.log(err);
        }
        console.log("Saved!\n" + doc);
    });
};