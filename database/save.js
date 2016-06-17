/**
 * Created by rbwilliams on 17/06/2016.
 */
var documents = require('./documents');

exports.testDocSave = function() {
    console.log("saving");
    documents.doc.testDB(function (err, doc) {
        if (err) return console.error(err);
        //testDoc.speak();
    });
};