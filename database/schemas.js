/**
 * Created by rbwilliams on 17/06/2016.
 */
var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    author: {firstName: String, lastName: String},
    created: String,
    level: String,
    mdt: Boolean,
    referringPhysician: String,
    caseID: Number,
    descriptors: {
        zonalDominance: {
            ccInvolvement: {
                name: String,
                basal: Boolean,
                upper: Boolean,
                middle: Boolean,
                none: Boolean
            },
            apDistribution: {
                name: String,
                posterior: Boolean,
                anterior: Boolean,
                none: Boolean
            },
            lrPredominance: {
                name: String,
                symmetrical: Boolean,
                asymmetrical: Boolean
            },
            cpDominance: {
                name: String,
                central: Boolean,
                peripheral: Boolean,
                none: Boolean
            }
        },
        parenchymalDescriptors: {
            predominantAbnormality: {
                name: String,
                reticular: Boolean,
                nodular: Boolean,
                both: Boolean,
                none: Boolean
            },
            ggo: {
                name: String,
                present: Boolean,
                significant: Boolean,
                none: Boolean,
                comment: String
            },
            ggoReticulation: {
                name: String,
                present: Boolean,
                significant: Boolean,
                none: Boolean,
                comment: String
            },
            peribronchovascularComponent: {
                name: String,
                tractionBronchiectasis: {
                    name: String,
                    present: Boolean,
                    significant: Boolean,
                    none: Boolean,
                    comment: String
                },
                tractionBronchiolectasis: {
                    name: String,
                    present: Boolean,
                    significant: Boolean,
                    none: Boolean,
                    comment: String
                },
                airwayPluging: {
                    name: String,
                    present: Boolean,
                    significant: Boolean,
                    none: Boolean,
                    comment: String
                },
                mosaicism: {
                    name: String,
                    present: Boolean,
                    significant: Boolean,
                    none: Boolean,
                    comment: String
                },
                evidenceOfConsolidation: {
                    name: String,
                    present: Boolean,
                    significant: Boolean,
                    none: Boolean,
                    comment: String
                }
            },
            nodularAbnormalities: {
                name: String,
                present: Boolean,
                ifPresent: {
                    "extensive-limited": Boolean,
                    "perilymphatic": Boolean,
                    "centrilobular": Boolean,
                    "treeInBud": Boolean,
                    "fissural": Boolean,
                    "random": Boolean
                }
            },
            "honeycombingVSemphysema": {
                "emphysema": {
                    emphysema: {
                        "name": String,
                        "present": Boolean,
                        "significant": Boolean,
                        "none": Boolean,
                        "comment": String
                    },
                    centrilobular: {
                        "name": String,
                        "present": Boolean,
                        "significant": Boolean,
                        "none": Boolean,
                        "comment": String

                    },
                    panlobular: {
                        "name": String,
                        "present": Boolean,
                        "significant": Boolean,
                        "none": Boolean,
                        "comment": String
                    },
                    panacinar: {
                        "name": String,
                        "present": Boolean,
                        "significant": Boolean,
                        "none": Boolean,
                        "comment": String
                    },
                    predominantlyBasal: {
                        "name": String,
                        "present": Boolean,
                        "significant": Boolean,
                        "none": Boolean,
                        "comment": String
                    }
                },
                "discreteLungCysts": {
                    "name": String,
                    "present": Boolean,
                    "significant": Boolean,
                    "none": Boolean,
                    "comment": String
                },
                "microcysticHoneycombing": {
                    "name": String,
                    "present": Boolean,
                    "significant": Boolean,
                    "none": Boolean,
                    "comment": String
                },
                "coarseHoneycombing": {
                    "name": String,
                    "present": Boolean,
                    "significant": Boolean,
                    "none": Boolean,
                    "comment": String
                }
            }
        }
    },
    diagnoses: {
        questions: {
            ildEvidence: {
                name: String,
                evidence: Boolean
            },
            clinicalInfo: {
                name: String,
                knownILD: Boolean,
                knownCTD: Boolean,
                evidenceOfCTD: {
                    name: String,
                    evidence: Boolean,
                    comment: String
                },
                everSmoker: Boolean,
                otherRelevantClinicalInfo: String
            },
            uipClassification: {
                name: String,
                fullName: String,
                UIP: Boolean,
                possibleUIP: Boolean,
                inconsistentUIP: Boolean
            },
            nsipClassification: {
                name: String,
                fullName: String,
                notConsideredORtypical: {
                    value: Boolean,
                    iftrue: Number
                },
                yes: Boolean,
                possible: Boolean,
                suspectFibroticNSIP: Boolean,
                previousCT: Boolean,
                progression: Boolean,
                comment: String
            },
            cryptoOrganisingPneumonia: {
                name: String,
                notConsideredORtypical: Boolean,
                yes: Boolean,
                known: Boolean,
                progressonFromBefore: Boolean
            },
            respiratoryBronchioloitisILD: {
                name: String,
                notConsideredORtypical: Boolean,
                yes: Boolean,
                known: Boolean,
                newDiagnosis: Boolean,
                severity: String,
                suspectDIP: Boolean
            },
            sarcoidosis: {
                name: String,
                notConsideredORtypical: Boolean,
                known: Boolean,
                probable: Boolean,
                possible: Boolean,
                staging: Number,
                extraPulmonaryDisease: Boolean
            },
            hypersensitivityPneumonitis: {
                name: String,
                notConsideredORtypical: Boolean,
                known: Boolean,
                actueHP: Boolean,
                subacuteHP: Boolean,
                chronicHP: Boolean,
                clinicalRefToSuspectAntigen: String
            },
            asbestosRelatedDisease: {
                name: String,
                notConsideredORtypical: Boolean,
                known: Boolean,
                pleuralPlaques: Boolean,
                pleuralThickening: Boolean,
                asbestosis: Boolean,
                severity: String
            },
            otherILD: {
                name: String,
                notConsideredORtypical: Boolean,
                aip: {
                    name: String,
                    known: Boolean,
                    comparison: Boolean,
                    newDiagnosis: Boolean
                },
                lch: {
                    name: String,
                    known: Boolean,
                    comparison: Boolean,
                    newDiagnosis: Boolean
                },
                lam: {
                    name: String,
                    known: Boolean,
                    comparison: Boolean,
                    newDiagnosis: Boolean
                },
                other: String,
                comment: String
            },
            cardiovascularFindings: {
                name: String,
                normal: Boolean,
                dilatedRightHeart: Boolean,
                abnormalLeftHeart: Boolean,
                coronaryCalcification: Boolean
            },
            otherIncidentalFindings: {
                name: String,
                nilElse: Boolean,
                solitaryPulmonaryNodule: Boolean,
                other: Boolean,
                comment: String
            },
            otherComments: {
                name: String,
                comment: String,
                secondOpinion: Boolean
            }
        }
    }
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