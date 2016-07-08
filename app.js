/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    api = require('./routes/api'),
    database = require('./database/database'),
    documents = require('./database/documents'),
    search = require('./database/search'),
    models = require('./database/models');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
}


// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/descriptors', api.descriptors);

// Post requests to database from client-side
app.post('/database/documents/update', function (req, res) {
    documents.updateReport(req, res);
    res.end();
});

// Saves a new empty report that can be saved as the user answers questions
app.post('/database/documents/saveNew', function (req, res) {

    var reportDoc = new models.reportModel({
        author: {firstName: req.body.firstName, lastName: req.body.lastName},
        created: req.body.created,
        level: req.body.level,
        mdt: req.body.mdt,
        referringPhysician: req.body.referringPhysician,
        caseID: req.body.caseID,
        descriptors: {
            zonalDominance: {
                ccInvolvement: {
                    name: req.body.descriptors[0].zonalDominance[0].name,
                    basal: req.body.descriptors[0].zonalDominance[0].basal,
                    upper: req.body.descriptors[0].zonalDominance[0].upper,
                    middle: req.body.descriptors[0].zonalDominance[0].middle,
                    none: req.body.descriptors[0].zonalDominance[0].none
                },
                apDistribution: {
                    name: req.body.descriptors[0].zonalDominance[1].name,
                    posterior: req.body.descriptors[0].zonalDominance[1].posterior,
                    anterior: req.body.descriptors[0].zonalDominance[1].anterior,
                    none: req.body.descriptors[0].zonalDominance[1].none
                },
                lrPredominance: {
                    name: req.body.descriptors[0].zonalDominance[2].name,
                    symmetrical: req.body.descriptors[0].zonalDominance[2].symmetrical,
                    asymmetrical: req.body.descriptors[0].zonalDominance[2].asymmetrical
                },
                cpDominance: {
                    name: req.body.descriptors[0].zonalDominance[3].name,
                    central: req.body.descriptors[0].zonalDominance[3].central,
                    peripheral: req.body.descriptors[0].zonalDominance[3].peripheral,
                    none: req.body.descriptors[0].zonalDominance[3].none
                }
            },
            parenchymalDescriptors: {
                predominantAbnormality: {
                    name: req.body.descriptors[1].parenchymalDescriptors[0].name,
                    reticular: req.body.descriptors[1].parenchymalDescriptors[0].reticular,
                    nodular: req.body.descriptors[1].parenchymalDescriptors[0].nodular,
                    both: req.body.descriptors[1].parenchymalDescriptors[0].both,
                    none: req.body.descriptors[1].parenchymalDescriptors[0].none
                },
                ggo: {
                    name: req.body.descriptors[1].parenchymalDescriptors[1].name,
                    present: req.body.descriptors[1].parenchymalDescriptors[1].present,
                    significant: req.body.descriptors[1].parenchymalDescriptors[1].significant,
                    none: req.body.descriptors[1].parenchymalDescriptors[1].none,
                    comment: req.body.descriptors[1].parenchymalDescriptors[1].comment
                },
                ggoReticulation: {
                    name: req.body.descriptors[1].parenchymalDescriptors[2].name,
                    present: req.body.descriptors[1].parenchymalDescriptors[2].present,
                    significant: req.body.descriptors[1].parenchymalDescriptors[2].significant,
                    none: req.body.descriptors[1].parenchymalDescriptors[2].none,
                    comment: req.body.descriptors[1].parenchymalDescriptors[2].comment
                },
                peribronchovascularComponent:{
                    name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent.name,
                    tractionBronchiectasis: {
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].comment
                    },
                    tractionBronchiolectasis:{
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1].comment
                    },
                    airwayPluging: {
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2].comment
                    },
                    mosaicism: {
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3].comment
                    },
                    evidenceOfConsolidation: {
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4].comment
                    }
                },
                nodularAbnormalities: {
                    name: req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.name,
                    present: req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.present,
                    ifPresent: {
                        "extensive-limited": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent['extensive-limited'],
                        "perilymphatic": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent.perilymphatic,
                        "centrilobular": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent.centrilobular,
                        "treeInBud": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent.treeInBud,
                        "fissural": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent.fissural,
                        "random": req.body.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent.random
                    }
                },
                "honeycombingVSemphysema": {
                    "emphysema": {
                        emphysema: {
                            "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0].name,
                            "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0].present,
                            "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0].significant,
                            "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0].none,
                            "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0].comment
                        },
                        centrilobular: {
                            "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[1].name,
                            "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[1].present,
                            "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[1].significant,
                            "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[1].none,
                            "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[1].comment

                        },
                        panlobular: {
                            "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[2].name,
                            "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[2].present,
                            "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[2].significant,
                            "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[2].none,
                            "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[2].comment
                        },
                        panacinar: {
                            "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[3].name,
                            "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[3].present,
                            "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[3].significant,
                            "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[3].none,
                            "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[3].comment
                        },
                        predominantlyBasal: {
                            "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[4].name,
                            "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[4].present,
                            "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[4].significant,
                            "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[4].none,
                            "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[4].comment
                        }
                    },
                    "discreteLungCysts": {
                        "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.discreteLungCysts.name,
                        "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.discreteLungCysts.present,
                        "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.discreteLungCysts.significant,
                        "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.discreteLungCysts.none,
                        "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.discreteLungCysts.comment
                    },
                    "microcysticHoneycombing": {
                        "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.microcysticHoneycombing.name,
                        "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.microcysticHoneycombing.present,
                        "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.microcysticHoneycombing.significant,
                        "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.microcysticHoneycombing.none,
                        "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.microcysticHoneycombing.comment
                    },
                    "coarseHoneycombing": {
                        "name": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.coarseHoneycombing.name,
                        "present": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.coarseHoneycombing.present,
                        "significant": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.coarseHoneycombing.significant,
                        "none": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.coarseHoneycombing.none,
                        "comment": req.body.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.coarseHoneycombing.comment
                    }
                }
            }
        }
    });

    reportDoc.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
        callback(doc);
    });

    var callback = function (doc) {
        //console.log(JSON.stringify(doc.descriptors[0].zonalDominance));
        res.send(doc);
    }
});

app.post('/database/documents/descriptors', function (req, res) {
    documents.descriptors(req, res);
    res.end();
});

app.post('/database/documents/descriptors1', function (req, res) {
	console.log(req.headers);
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " searching report for descriptors1");
	
        console.log(doc);
        doc.descriptors.zonalDominance.ccInvolvement.basal = req.body.descriptors.zonalDominance.ccInvolvement.basal;
        doc.descriptors.zonalDominance.ccInvolvement.upper = req.body.descriptors.zonalDominance.ccInvolvement.upper;
        doc.descriptors.zonalDominance.ccInvolvement.middle = req.body.descriptors.zonalDominance.ccInvolvement.middle;
        doc.descriptors.zonalDominance.ccInvolvement.none = req.body.descriptors.zonalDominance.ccInvolvement.none;

        // Antero-Posterior Distribution bound variables
        doc.descriptors.zonalDominance.apDistribution.anterior = req.body.descriptors.zonalDominance.apDistribution.anterior;
        doc.descriptors.zonalDominance.apDistribution.posterior = req.body.descriptors.zonalDominance.apDistribution.posterior;
        doc.descriptors.zonalDominance.apDistribution.none = req.body.descriptors.zonalDominance.apDistribution.none;

        // Left-Right Predominance bound variables
        doc.descriptors.zonalDominance.lrPredominance.symmetrical = req.body.descriptors.zonalDominance.lrPredominance.symmetrical;
        doc.descriptors.zonalDominance.lrPredominance.asymmetrical = req.body.descriptors.zonalDominance.lrPredominance.asymmetrical;

        // Central vs Peripheral Dominance
        doc.descriptors.zonalDominance.cpDominance.central = req.body.descriptors.zonalDominance.cpDominance.central;
        doc.descriptors.zonalDominance.cpDominance.peripheral = req.body.descriptors.zonalDominance.cpDominance.peripheral;
        doc.descriptors.zonalDominance.cpDominance.none = req.body.descriptors.zonalDominance.cpDominance.none;

        // Predominant Abnormality
        doc.descriptors.parenchymalDescriptors.predominantAbnormality.reticular = req.body.descriptors.parenchymalDescriptors.predominantAbnormality.reticular;
        doc.descriptors.parenchymalDescriptors.predominantAbnormality.nodular = req.body.descriptors.parenchymalDescriptors.predominantAbnormality.nodular;
        doc.descriptors.parenchymalDescriptors.predominantAbnormality.both = req.body.descriptors.parenchymalDescriptors.predominantAbnormality.both;
        doc.descriptors.parenchymalDescriptors.predominantAbnormality.none = req.body.descriptors.parenchymalDescriptors.predominantAbnormality.none;

        // Ground-glass opacification (GGO)
        doc.descriptors.parenchymalDescriptors.ggo.present = req.body.descriptors.parenchymalDescriptors.ggo.present;
        doc.descriptors.parenchymalDescriptors.ggo.significant = req.body.descriptors.parenchymalDescriptors.ggo.significant;
        doc.descriptors.parenchymalDescriptors.ggo.none = req.body.descriptors.parenchymalDescriptors.ggo.none;
        doc.descriptors.parenchymalDescriptors.ggo.comment = req.body.descriptors.parenchymalDescriptors.ggo.comment;

        // Concordance of GGO & reticulation
        doc.descriptors.parenchymalDescriptors.ggoReticulation.present = req.body.descriptors.parenchymalDescriptors.ggoReticulation.present;
        doc.descriptors.parenchymalDescriptors.ggoReticulation.significant = req.body.descriptors.parenchymalDescriptors.ggoReticulation.significant;
        doc.descriptors.parenchymalDescriptors.ggoReticulation.none = req.body.descriptors.parenchymalDescriptors.ggoReticulation.none;
        doc.descriptors.parenchymalDescriptors.ggoReticulation.comment = req.body.descriptors.parenchymalDescriptors.ggoReticulation.comment;

        // Traction bronchiectasis
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.present = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.present;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.significant = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.significant;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.none = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.none;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.comment = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.comment;

        // Traction bronchiolectasis
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.present = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.present;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.significant = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.significant;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.none = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.none;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.comment = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.comment;

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc");
            /*console.log("report descriptors1 updated");
            console.log(JSON.stringify(doc.descriptors[0].zonalDominance));*/
            callback(doc);
        });

    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/search/reports', function (req, res) {
    models.reportModel.find({}, function (err, docs) {
        if (err) return console.log(err + " search.findReports");
        //console.log(docs);
        callback(docs);
    });

    var callback = function (docs) {
        res.send(docs);
    }
});

app.post('/database/search/report', function (req, res) {
    models.reportModel.findById(req.body._id, function (err, doc) {
        if (err) return console.log(err + " search.findReport");
        //console.log(doc);
        callback(doc);
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/deleteReport', function (req, res) {
    models.reportModel.findById(req.body._id, function (err, doc) {
        if (err) return console.log(err + " error finding report to update");

        doc.remove(callback());
    });

    var callback = function () {
        res.send("Deleted");
    }
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Start Database
 */

database.startDatabase();
