/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    author: { firstName: String, lastName: String},
    created: { type: Date, default: Date.now },
    level: String,
    referringPhysician: String,
    caseID: Number
});

exports.reportSchema = reportSchema;


var testSchema = new mongoose.Schema({
    name: String
});

testSchema.methods.speak = function(){
    var greeting = this.name
        ? "Hello name is: " + this.name
        : "I don't have a name";
    console.log(greeting);
};


exports.schema = testSchema;