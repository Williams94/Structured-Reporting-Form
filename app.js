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
app.get('/api/diagnoses', api.diagnoses);
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
                peribronchovascularComponent: {
                    name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent.name,
                    tractionBronchiectasis: {
                        name: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].name,
                        present: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].present,
                        significant: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].significant,
                        none: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].none,
                        comment: req.body.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0].comment
                    },
                    tractionBronchiolectasis: {
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
        },
        diagnoses: {
            questions: {
          ildEvidence: {
                    name: req.body.diagnoses.questions.ildEvidence.name,
                    evidence: req.body.diagnoses.questions.ildEvidence.evidence
                },
                clinicalInfo: {
                    name: req.body.diagnoses.questions.clinicalInfo.name,
                    knownILD: req.body.diagnoses.questions.clinicalInfo.knownILD,
                    knownCTD: req.body.diagnoses.questions.clinicalInfo.knownCTD,
                    evidenceOfCTD: {
                        name: req.body.diagnoses.questions.clinicalInfo.evidenceOfCTD.name,
                        evidence: req.body.diagnoses.questions.clinicalInfo.evidenceOfCTD.evidence,
                        comment: req.body.diagnoses.questions.clinicalInfo.evidenceOfCTD.comment
                    },
                    everSmoker: req.body.diagnoses.questions.clinicalInfo.everSmoker,
                    otherRelevantClinicalInfo: req.body.diagnoses.questions.clinicalInfo.otherRelevantClinicalInfo
                },
                uipClassification: {
                    name: req.body.diagnoses.questions.uipClassification.name,
                    fullName: req.body.diagnoses.questions.uipClassification.fullName,
                    UIP: req.body.diagnoses.questions.uipClassification.UIP,
                    possibleUIP: req.body.diagnoses.questions.uipClassification.possibleUIP,
                    inconsistentUIP: req.body.diagnoses.questions.uipClassification.inconsistentUIP
                },
                nsipClassification: {
                    name: req.body.diagnoses.questions.nsipClassification.name,
                    fullName: req.body.diagnoses.questions.nsipClassification.fullName,
                    notConsideredORtypical: {
                        value: req.body.diagnoses.questions.nsipClassification.notConsideredORtypical.value,
                        iftrue: req.body.diagnoses.questions.nsipClassification.notConsideredORtypical.iftrue
                    },
                    yes: req.body.diagnoses.questions.nsipClassification.yes,
                    possible: req.body.diagnoses.questions.nsipClassification.possible,
                    suspectFibroticNSIP: req.body.diagnoses.questions.nsipClassification.suspectFibroticNSIP,
                    previousCT: req.body.diagnoses.questions.nsipClassification.previousCT,
                    progression: req.body.diagnoses.questions.nsipClassification.progression,
                    comment: req.body.diagnoses.questions.nsipClassification.comment
                },
                cryptoOrganisingPneumonia: {
                    name: req.body.diagnoses.questions.cryptoOrganisingPneumonia.name,
                    notConsideredORtypical: req.body.diagnoses.questions.cryptoOrganisingPneumonia.notConsideredORtypical,
                    yes: req.body.diagnoses.questions.cryptoOrganisingPneumonia.yes,
                    known: req.body.diagnoses.questions.cryptoOrganisingPneumonia.known,
                    progressonFromBefore: req.body.diagnoses.questions.cryptoOrganisingPneumonia.progressonFromBefore
                },
                respiratoryBronchioloitisILD: {
                    name: req.body.diagnoses.questions.respiratoryBronchioloitisILD.name,
                    notConsideredORtypical: req.body.diagnoses.questions.respiratoryBronchioloitisILD.notConsideredORtypical,
                    yes: req.body.diagnoses.questions.respiratoryBronchioloitisILD.yes,
                    known: req.body.diagnoses.questions.respiratoryBronchioloitisILD.known,
                    newDiagnosis: req.body.diagnoses.questions.respiratoryBronchioloitisILD.newDiagnosis,
                    severity: req.body.diagnoses.questions.respiratoryBronchioloitisILD.severity,
                    suspectDIP: req.body.diagnoses.questions.respiratoryBronchioloitisILD.suspectDIP
                },
                sarcoidosis: {
                    name: req.body.diagnoses.questions.sarcoidosis.name,
                    notConsideredORtypical: req.body.diagnoses.questions.sarcoidosis.notConsideredORtypical,
                    known: req.body.diagnoses.questions.sarcoidosis.known,
                    probable: req.body.diagnoses.questions.sarcoidosis.probable,
                    possible: req.body.diagnoses.questions.sarcoidosis.possible,
                    staging: req.body.diagnoses.questions.sarcoidosis.staging,
                    extraPulmonaryDisease: req.body.diagnoses.questions.sarcoidosis.extraPulmonaryDisease
                },
                hypersensitivityPneumonitis: {
                    name: req.body.diagnoses.questions.hypersensitivityPneumonitis.name,
                    notConsideredORtypical: req.body.diagnoses.questions.hypersensitivityPneumonitis.notConsideredORtypical,
                    known: req.body.diagnoses.questions.hypersensitivityPneumonitis.known,
                    actueHP: req.body.diagnoses.questions.hypersensitivityPneumonitis.actueHP,
                    subacuteHP: req.body.diagnoses.questions.hypersensitivityPneumonitis.subacuteHP,
                    chronicHP: req.body.diagnoses.questions.hypersensitivityPneumonitis.chronicHP,
                    clinicalRefToSuspectAntigen: req.body.diagnoses.questions.hypersensitivityPneumonitis.clinicalRefToSuspectAntigen
                },
                asbestosRelatedDisease: {
                    name: req.body.diagnoses.questions.asbestosRelatedDisease.name,
                    notConsideredORtypical: req.body.diagnoses.questions.asbestosRelatedDisease.notConsideredORtypical,
                    known: req.body.diagnoses.questions.asbestosRelatedDisease.known,
                    pleuralPlaques: req.body.diagnoses.questions.asbestosRelatedDisease.pleuralPlaques,
                    pleuralThickening: req.body.diagnoses.questions.asbestosRelatedDisease.pleuralThickening,
                    asbestosis: req.body.diagnoses.questions.asbestosRelatedDisease.asbestosis,
                    severity: req.body.diagnoses.questions.asbestosRelatedDisease.severity
                },
                otherILD: {
                    name: req.body.diagnoses.questions.otherILD.name,
                    notConsideredORtypical: req.body.diagnoses.questions.otherILD.notConsideredORtypical,
                    aip: {
                        name: req.body.diagnoses.questions.otherILD.aip.name,
                        known: req.body.diagnoses.questions.otherILD.aip.known,
                        comparison: req.body.diagnoses.questions.otherILD.aip.comparison,
                        newDiagnosis: req.body.diagnoses.questions.otherILD.aip.newDiagnosis
                    },
                    lch: {
                        name: req.body.diagnoses.questions.otherILD.lch.name,
                        known: req.body.diagnoses.questions.otherILD.lch.known,
                        comparison: req.body.diagnoses.questions.otherILD.lch.comparison,
                        newDiagnosis: req.body.diagnoses.questions.otherILD.lch.newDiagnosis
                    },
                    lam: {
                        name: req.body.diagnoses.questions.otherILD.lam.name,
                        known: req.body.diagnoses.questions.otherILD.lam.known,
                        comparison: req.body.diagnoses.questions.otherILD.lam.comparison,
                        newDiagnosis: req.body.diagnoses.questions.otherILD.lam.newDiagnosis
                    },
                    other: req.body.diagnoses.questions.otherILD.other,
                    comment: req.body.diagnoses.questions.otherILD.comment
                },
                cardiovascularFindings: {
                    name: req.body.diagnoses.questions.cardiovascularFindings.name,
                    normal: req.body.diagnoses.questions.cardiovascularFindings.normal,
                    dilatedRightHeart: req.body.diagnoses.questions.cardiovascularFindings.dilatedRightHeart,
                    abnormalLeftHeart: req.body.diagnoses.questions.cardiovascularFindings.abnormalLeftHeart,
                    coronaryCalcification: req.body.diagnoses.questions.cardiovascularFindings.coronaryCalcification
                },
                otherIncidentalFindings: {
                    name: req.body.diagnoses.questions.otherIncidentalFindings.name,
                    nilElse: req.body.diagnoses.questions.otherIncidentalFindings.nilElse,
                    solitaryPulmonaryNodule: req.body.diagnoses.questions.otherIncidentalFindings.solitaryPulmonaryNodule,
                    other: req.body.diagnoses.questions.otherIncidentalFindings.other,
                    comment: req.body.diagnoses.questions.otherIncidentalFindings.comment
                },
                otherComments: {
                    name: req.body.diagnoses.questions.otherComments.name,
                    comment: req.body.diagnoses.questions.otherComments.comment,
                    secondOpinion: req.body.diagnoses.questions.otherComments.secondOpinion
                }
            }
        }
    });

    //console.log(reportDoc);

    reportDoc.save(function (err, doc) {
        if (err) {
            console.log(err + " error trying to save new report");
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
    console.log(req.body);
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " searching report for descriptors1");

        //console.log(doc);
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
            if (err) return console.log(err + " error saving updated doc for descriptors1");
            callback(doc);
        });

    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/descriptors2', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " searching report for descriptors2");

        // Airway Plugging
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.present
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.present;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.significant
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.significant;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.none
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.none;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.comment
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.comment;

        // Mosaicism
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.present
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.present;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.significant
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.significant;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.none
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.none;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.comment
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.comment;

        // Evidence of consolidation
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.present
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.present;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.significant
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.significant;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.none
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.none;
        doc.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.comment
            = req.body.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.comment;

        // Nodular Abnormalities
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.present
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.present;
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent['extensive-limited']
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent['extensive-limited'];
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.perilymphatic
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.perilymphatic;
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.centrilobular
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.centrilobular;
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.treeInBud
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.treeInBud;
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.fissural
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.fissural;
        doc.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.random
            = req.body.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.random;

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for descriptors2");
            callback(doc);
        });

    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/descriptors3', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report for descriptors3");

        // Emphysema
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.comment;

        // Centrilobular
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.comment;

        // Panlobular
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.comment;

        // Panacinar
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.comment;

        // Predominantly Basal
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.comment;

        // Discrete Lung Cysts
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.comment;

        // Microcystic Honeycombing
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.comment;

        // Coarse Honeycombing
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.present
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.present;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.significant
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.significant;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.none
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.none;
        doc.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.comment
            = req.body.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.comment;

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for descriptors3");
            callback(doc);
        });
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

/*app.post('/database/documents/diagnoses/newReport', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report for new report diagnoses");

        //console.log(doc);

        // Diagnoses Questions
        // ILD question
        doc.diagnoses.questions.ildEvidence.evidence = req.body.diagnoses.questions[0].evidence;

        // Clinical Info
        doc.diagnoses.questions.clinicalInfo.knownILD = req.body.diagnoses.questions[1].knownILD;
        doc.diagnoses.questions.clinicalInfo.knownCTD = req.body.diagnoses.questions[1].knownCTD;
        doc.diagnoses.questions.clinicalInfo.evidenceOfCTD.evidence = req.body.diagnoses.questions[1].evidenceOfCTD.evidence;
        doc.diagnoses.questions.clinicalInfo.evidenceOfCTD.comment = req.body.diagnoses.questions[1].evidenceOfCTD.comment;
        doc.diagnoses.questions.clinicalInfo.everSmoker = req.body.diagnoses.questions[1].everSmoker;
        doc.diagnoses.questions.clinicalInfo.otherRelevantClinicalInfo = req.body.diagnoses.questions[1].otherRelevantClinicalInfo;

        // UIP classification
        doc.diagnoses.questions.uipClassification.UIP = req.body.diagnoses.questions[2].UIP;
        doc.diagnoses.questions.uipClassification.possibleUIP = req.body.diagnoses.questions[2].possibleUIP;
        doc.diagnoses.questions.uipClassification.inconsistentUIP = req.body.diagnoses.questions[2].inconsistentUIP;

        // NSIP classification
        doc.diagnoses.questions.nsipClassification.notConsideredORtypical.value = req.body.diagnoses.questions[3].notConsideredORtypical.value;
        doc.diagnoses.questions.nsipClassification.yes = req.body.diagnoses.questions[3].yes;
        doc.diagnoses.questions.nsipClassification.possible = req.body.diagnoses.questions[3].possible;
        doc.diagnoses.questions.nsipClassification.suspectFibroticNSIP = req.body.diagnoses.questions[3].suspectFibroticNSIP;
        doc.diagnoses.questions.nsipClassification.previousCT = req.body.diagnoses.questions[3].previousCT;
        doc.diagnoses.questions.nsipClassification.progression = req.body.diagnoses.questions[3].progression;
        doc.diagnoses.questions.nsipClassification.comment = req.body.diagnoses.questions[3].comment;

        // Crypto Organising Pneumonia
        doc.diagnoses.questions.cryptoOrganisingPneumonia.notConsideredORtypical = req.body.diagnoses.questions[4].notConsideredORtypical;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.yes = req.body.diagnoses.questions[4].yes;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.known = req.body.diagnoses.questions[4].known;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.progressonFromBefore = req.body.diagnoses.questions[4].progressonFromBefore;

        // Respiratory Bronchioloitis ILD
        doc.diagnoses.questions.respiratoryBronchioloitisILD.notConsideredORtypical = req.body.diagnoses.questions[5].notConsideredORtypical;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.yes = req.body.diagnoses.questions[5].yes;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.known = req.body.diagnoses.questions[5].known;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.newDiagnosis = req.body.diagnoses.questions[5].newDiagnosis;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.severity = req.body.diagnoses.questions[5].severity;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.suspectDIP = req.body.diagnoses.questions[5].suspectDIP;

        // Sarcoidosis
        doc.diagnoses.questions.sarcoidosis.notConsideredORtypical = req.body.diagnoses.questions[6].notConsideredORtypical;
        doc.diagnoses.questions.sarcoidosis.known = req.body.diagnoses.questions[6].known;
        doc.diagnoses.questions.sarcoidosis.probable = req.body.diagnoses.questions[6].probable;
        doc.diagnoses.questions.sarcoidosis.possible = req.body.diagnoses.questions[6].possible;
        doc.diagnoses.questions.sarcoidosis.staging = req.body.diagnoses.questions[6].staging;
        doc.diagnoses.questions.sarcoidosis.extraPulmonaryDisease = req.body.diagnoses.questions[6].extraPulmonaryDisease;

        // Hypersensitivity Pneumonitis
        doc.diagnoses.questions.hypersensitivityPneumonitis.notConsideredORtypical = req.body.diagnoses.questions[7].notConsideredORtypical;
        doc.diagnoses.questions.hypersensitivityPneumonitis.known = req.body.diagnoses.questions[7].known;
        doc.diagnoses.questions.hypersensitivityPneumonitis.actueHP = req.body.diagnoses.questions[7].actueHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.subacuteHP = req.body.diagnoses.questions[7].subacuteHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.chronicHP = req.body.diagnoses.questions[7].chronicHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.clinicalRefToSuspectAntigen = req.body.diagnoses.questions[7].clinicalRefToSuspectAntigen;

        // Asbestos Related Disease
        doc.diagnoses.questions.asbestosRelatedDisease.notConsideredORtypical = req.body.diagnoses.questions[8].notConsideredORtypical;
        doc.diagnoses.questions.asbestosRelatedDisease.known = req.body.diagnoses.questions[8].known;
        doc.diagnoses.questions.asbestosRelatedDisease.pleuralPlaques = req.body.diagnoses.questions[8].pleuralPlaques;
        doc.diagnoses.questions.asbestosRelatedDisease.pleuralThickening = req.body.diagnoses.questions[8].pleuralThickening;
        doc.diagnoses.questions.asbestosRelatedDisease.asbestosis = req.body.diagnoses.questions[8].asbestosis;
        doc.diagnoses.questions.asbestosRelatedDisease.severity = req.body.diagnoses.questions[8].severity;

        // Other ILD
        doc.diagnoses.questions.otherILD.notConsideredORtypical = req.body.diagnoses.questions[9].notConsideredORtypical;
        doc.diagnoses.questions.otherILD.other = req.body.diagnoses.questions[9].other;
        doc.diagnoses.questions.otherILD.comment = req.body.diagnoses.questions[9].comment;

        // AIP
        doc.diagnoses.questions.otherILD.aip.known = req.body.diagnoses.questions[9].aip.known;
        doc.diagnoses.questions.otherILD.aip.comparison = req.body.diagnoses.questions[9].aip.comparison;
        doc.diagnoses.questions.otherILD.aip.newDiagnosis = req.body.diagnoses.questions[9].aip.newDiagnosis;

        // LCH
        doc.diagnoses.questions.otherILD.lch.known = req.body.diagnoses.questions[9].lch.known;
        doc.diagnoses.questions.otherILD.lch.comparison = req.body.diagnoses.questions[9].lch.comparison;
        doc.diagnoses.questions.otherILD.lch.newDiagnosis = req.body.diagnoses.questions[9].lch.newDiagnosis;

        // LAM
        doc.diagnoses.questions.otherILD.lam.known = req.body.diagnoses.questions[9].lam.known;
        doc.diagnoses.questions.otherILD.lam.comparison = req.body.diagnoses.questions[9].lam.comparison;
        doc.diagnoses.questions.otherILD.lam.newDiagnosis = req.body.diagnoses.questions[9].lam.newDiagnosis;

        // Cardiovascular Findings
        doc.diagnoses.questions.cardiovascularFindings.normal = req.body.diagnoses.questions[10].normal;
        doc.diagnoses.questions.cardiovascularFindings.dilatedRightHeart = req.body.diagnoses.questions[10].dilatedRightHeart;
        doc.diagnoses.questions.cardiovascularFindings.abnormalLeftHeart = req.body.diagnoses.questions[10].abnormalLeftHeart;
        doc.diagnoses.questions.cardiovascularFindings.coronaryCalcification = req.body.diagnoses.questions[10].coronaryCalcification;

        // Other Incidental Findings
        doc.diagnoses.questions.otherIncidentalFindings.nilElse = req.body.diagnoses.questions[11].nilElse;
        doc.diagnoses.questions.otherIncidentalFindings.solitaryPulmonaryNodule = req.body.diagnoses.questions[11].solitaryPulmonaryNodule;
        doc.diagnoses.questions.otherIncidentalFindings.other = req.body.diagnoses.questions[11].other;
        doc.diagnoses.questions.otherIncidentalFindings.comment = req.body.diagnoses.questions[11].comment;

        // Other Comments
        doc.diagnoses.questions.otherComments.comment = req.body.diagnoses.questions[12].comment;
        doc.diagnoses.questions.otherComments.secondOpinion = false;



        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for new report diagnoses");
            callback(doc);
        });
    });

    var callback = function (doc) {
        res.send(doc);
    }
});*/

app.post('/database/documents/diagnoses', function (req, res) {
    //console.log(req.headers.reportid);
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " Error searching for doc diagnoses");

        callback(doc);

    });
    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/diagnoses1', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report for diagnoses1");

        // Diagnoses Questions
        // ILD question
        doc.diagnoses.questions.ildEvidence.evidence = req.body.questions.ildEvidence.evidence;

        // Clinical Info
        doc.diagnoses.questions.clinicalInfo.knownILD = req.body.questions.clinicalInfo.knownILD;
        doc.diagnoses.questions.clinicalInfo.knownCTD = req.body.questions.clinicalInfo.knownCTD;
        doc.diagnoses.questions.clinicalInfo.evidenceOfCTD.evidence = req.body.questions.clinicalInfo.evidenceOfCTD.evidence;
        doc.diagnoses.questions.clinicalInfo.evidenceOfCTD.comment = req.body.questions.clinicalInfo.evidenceOfCTD.comment;
        doc.diagnoses.questions.clinicalInfo.everSmoker = req.body.questions.clinicalInfo.everSmoker;
        doc.diagnoses.questions.clinicalInfo.otherRelevantClinicalInfo = req.body.questions.clinicalInfo.otherRelevantClinicalInfo;

        // UIP classification
        doc.diagnoses.questions.uipClassification.UIP = req.body.questions.uipClassification.UIP;
        doc.diagnoses.questions.uipClassification.possibleUIP = req.body.questions.uipClassification.possibleUIP;
        doc.diagnoses.questions.uipClassification.inconsistentUIP = req.body.questions.uipClassification.inconsistentUIP;

        // NSIP classification
        doc.diagnoses.questions.nsipClassification.notConsideredORtypical.value = req.body.questions.nsipClassification.notConsideredORtypical.value;
        doc.diagnoses.questions.nsipClassification.yes = req.body.questions.nsipClassification.yes;
        doc.diagnoses.questions.nsipClassification.possible = req.body.questions.nsipClassification.possible;
        doc.diagnoses.questions.nsipClassification.suspectFibroticNSIP = req.body.questions.nsipClassification.suspectFibroticNSIP;
        doc.diagnoses.questions.nsipClassification.previousCT = req.body.questions.nsipClassification.previousCT;
        doc.diagnoses.questions.nsipClassification.progression = req.body.questions.nsipClassification.progression;
        doc.diagnoses.questions.nsipClassification.comment = req.body.questions.nsipClassification.comment;

        // Crypto Organising Pneumonia
        doc.diagnoses.questions.cryptoOrganisingPneumonia.notConsideredORtypical = req.body.questions.cryptoOrganisingPneumonia.notConsideredORtypical;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.yes = req.body.questions.cryptoOrganisingPneumonia.yes;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.known = req.body.questions.cryptoOrganisingPneumonia.known;
        doc.diagnoses.questions.cryptoOrganisingPneumonia.progressonFromBefore = req.body.questions.cryptoOrganisingPneumonia.progressonFromBefore;

        // Respiratory Bronchioloitis ILD
        doc.diagnoses.questions.respiratoryBronchioloitisILD.notConsideredORtypical = req.body.questions.respiratoryBronchioloitisILD.notConsideredORtypical;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.yes = req.body.questions.respiratoryBronchioloitisILD.yes;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.known = req.body.questions.respiratoryBronchioloitisILD.known;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.newDiagnosis = req.body.questions.respiratoryBronchioloitisILD.newDiagnosis;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.severity = req.body.questions.respiratoryBronchioloitisILD.severity;
        doc.diagnoses.questions.respiratoryBronchioloitisILD.suspectDIP = req.body.questions.respiratoryBronchioloitisILD.suspectDIP;


        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for diagnoses1");
            callback(doc);
        });
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/diagnoses2', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report for diagnoses2");

        // Diagnoses Questions
        // Sarcoidosis
        doc.diagnoses.questions.sarcoidosis.notConsideredORtypical = req.body.questions.sarcoidosis.notConsideredORtypical;
        doc.diagnoses.questions.sarcoidosis.known = req.body.questions.sarcoidosis.known;
        doc.diagnoses.questions.sarcoidosis.probable = req.body.questions.sarcoidosis.probable;
        doc.diagnoses.questions.sarcoidosis.possible = req.body.questions.sarcoidosis.possible;
        doc.diagnoses.questions.sarcoidosis.staging = req.body.questions.sarcoidosis.staging;
        doc.diagnoses.questions.sarcoidosis.extraPulmonaryDisease = req.body.questions.sarcoidosis.extraPulmonaryDisease;


        // Hypersensitivity Pneumonitis
        doc.diagnoses.questions.hypersensitivityPneumonitis.notConsideredORtypical = req.body.questions.hypersensitivityPneumonitis.notConsideredORtypical;
        doc.diagnoses.questions.hypersensitivityPneumonitis.known = req.body.questions.hypersensitivityPneumonitis.known;
        doc.diagnoses.questions.hypersensitivityPneumonitis.actueHP = req.body.questions.hypersensitivityPneumonitis.actueHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.subacuteHP = req.body.questions.hypersensitivityPneumonitis.subacuteHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.chronicHP = req.body.questions.hypersensitivityPneumonitis.chronicHP;
        doc.diagnoses.questions.hypersensitivityPneumonitis.clinicalRefToSuspectAntigen = req.body.questions.hypersensitivityPneumonitis.clinicalRefToSuspectAntigen;

        // Asbestos-related disease
        doc.diagnoses.questions.asbestosRelatedDisease.notConsideredORtypical = req.body.questions.asbestosRelatedDisease.notConsideredORtypical;
        doc.diagnoses.questions.asbestosRelatedDisease.known = req.body.questions.asbestosRelatedDisease.known;
        doc.diagnoses.questions.asbestosRelatedDisease.pleuralPlaques = req.body.questions.asbestosRelatedDisease.pleuralPlaques;
        doc.diagnoses.questions.asbestosRelatedDisease.pleuralThickening = req.body.questions.asbestosRelatedDisease.pleuralThickening;
        doc.diagnoses.questions.asbestosRelatedDisease.asbestosis = req.body.questions.asbestosRelatedDisease.asbestosis;
        doc.diagnoses.questions.asbestosRelatedDisease.severity = req.body.questions.asbestosRelatedDisease.severity;

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for diagnoses2");
            callback(doc);
        });
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/diagnoses3', function (req, res) {
    models.reportModel.findById(req.headers.reportid, function (err, doc) {
        if (err) return console.log(err + " error finding report for diagnoses3");

        // Diagnoses Questions
        // Other ILD
        doc.diagnoses.questions.otherILD.notConsideredORtypical = req.body.questions.otherILD.notConsideredORtypical;
        doc.diagnoses.questions.otherILD.other = req.body.questions.otherILD.other;
        doc.diagnoses.questions.otherILD.comment = req.body.questions.otherILD.comment;

        // AIP
        doc.diagnoses.questions.otherILD.aip.known = req.body.questions.otherILD.aip.known;
        doc.diagnoses.questions.otherILD.aip.comparison = req.body.questions.otherILD.aip.comparison;
        doc.diagnoses.questions.otherILD.aip.newDiagnosis = req.body.questions.otherILD.aip.newDiagnosis;

        // LCH
        doc.diagnoses.questions.otherILD.lch.known = req.body.questions.otherILD.lch.known;
        doc.diagnoses.questions.otherILD.lch.comparison = req.body.questions.otherILD.lch.comparison;
        doc.diagnoses.questions.otherILD.lch.newDiagnosis = req.body.questions.otherILD.lch.newDiagnosis;

        // LAM
        doc.diagnoses.questions.otherILD.lam.known = req.body.questions.otherILD.lam.known;
        doc.diagnoses.questions.otherILD.lam.comparison = req.body.questions.otherILD.lam.comparison;
        doc.diagnoses.questions.otherILD.lam.newDiagnosis = req.body.questions.otherILD.lam.newDiagnosis;

        // Cardiovascular Findings
        doc.diagnoses.questions.cardiovascularFindings.normal = req.body.questions.cardiovascularFindings.normal;
        doc.diagnoses.questions.cardiovascularFindings.dilatedRightHeart = req.body.questions.cardiovascularFindings.dilatedRightHeart;
        doc.diagnoses.questions.cardiovascularFindings.abnormalLeftHeart = req.body.questions.cardiovascularFindings.abnormalLeftHeart;
        doc.diagnoses.questions.cardiovascularFindings.coronaryCalcification = req.body.questions.cardiovascularFindings.coronaryCalcification;

        // Other Incidental Findings
        doc.diagnoses.questions.otherIncidentalFindings.nilElse = req.body.questions.otherIncidentalFindings.nilElse;
        doc.diagnoses.questions.otherIncidentalFindings.solitaryPulmonaryNodule = req.body.questions.otherIncidentalFindings.solitaryPulmonaryNodule;
        doc.diagnoses.questions.otherIncidentalFindings.other = req.body.questions.otherIncidentalFindings.other;
        doc.diagnoses.questions.otherIncidentalFindings.comment = req.body.questions.otherIncidentalFindings.comment;

        // Other Comments
        doc.diagnoses.questions.otherComments.comment = req.body.questions.otherComments.comment;
        doc.diagnoses.questions.otherComments.secondOpinion = req.body.questions.otherComments.secondOpinion;

        //console.log(req.body.questions.otherComments.secondOpinion);

        doc.save(function (err) {
            if (err) return console.log(err + " error saving updated doc for diagnoses3");
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
    models.reportModel.findById(req.body.reportid, function (err, doc) {
        if (err) return console.log(err + " search.findReport");
        //console.log(doc);
        callback(doc);
    });

    var callback = function (doc) {
        res.send(doc);
    }
});

app.post('/database/documents/deleteReport', function (req, res) {
    models.reportModel.findById(req.body.reportid, function (err, doc) {
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
