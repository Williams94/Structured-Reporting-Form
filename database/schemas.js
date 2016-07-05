/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    author: {firstName: String, lastName: String},
    created: String,
    level: String,
    referringPhysician: String,
    caseID: Number,
    descriptors: [
        {
            zonalDominance: [
                {
                    name: String,
                    posterior: Boolean,
                    basal: Boolean,
                    upper: Boolean,
                    middle: Boolean,
                    none: Boolean
                },
                {
                    name: String,
                    posterior: Boolean,
                    anterior: Boolean,
                    none: Boolean
                },
                {
                    name: String,
                    symmetrical: Boolean,
                    asymmetrical: Boolean
                },
                {
                    name: String,
                    central: Boolean,
                    peripheral: Boolean,
                    none: Boolean
                }
            ]
        }
    ]
});

exports.reportSchema = reportSchema;


var testSchema = new mongoose.Schema({
    name: String
});

testSchema.methods.speak = function () {
    var greeting = this.name
        ? "Hello name is: " + this.name
        : "I don't have a name";
    console.log(greeting);
};


exports.schema = testSchema;