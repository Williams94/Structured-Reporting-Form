/*
 * Serve JSON to our AngularJS client
 */
exports.descriptors = function (req, res) {
    res.json(
        {
            descriptors: [
                {
                    zonalDominance: [
                        {
                            name: "Cranio-caudal Involvement",
                            basal: false,
                            upper: false,
                            middle: false,
                            none: false
                        },
                        {
                            name: "Antero-Posterior Distribution",
                            posterior: false,
                            anterior: false,
                            none: false
                        },
                        {
                            name: "Left-Right Predominance",
                            symmetrical: false,
                            asymmetrical: false
                        },
                        {
                            name: "Central vs Peripheral Dominance",
                            central: false,
                            peripheral: false,
                            none: false
                        }
                    ]
                },
                {
                    parenchymalDescriptors: [
                        {
                            name: "Predominant Abnormality",
                            reticular: false,
                            nodular: false,
                            both: false,
                            none: false
                        },
                        {
                            name: "Ground-glass opacification (GGO)",
                            present: false,
                            significant: false,
                            none: false,
                            comment: ""
                        },
                        {
                            name: "Concordance of GGO & reticulation",
                            present: false,
                            significant: false,
                            none: false,
                            comment: ""
                        },
                        {
                            peribronchovascularComponent: [
                                {
                                    name: "Traction bronchiectasis",
                                    present: false,
                                    significant: false,
                                    none: false,
                                    comment: ""
                                },
                                {
                                    name: "Traction bronchiolectasis",
                                    present: false,
                                    significant: false,
                                    none: false,
                                    comment: ""
                                },
                                {
                                    name: "Airway plugging",
                                    present: false,
                                    significant: false,
                                    none: false,
                                    comment: ""
                                },
                                {
                                    name: "Mosaicism",
                                    present: false,
                                    significant: false,
                                    none: false,
                                    comment: ""
                                },
                                {
                                    name: "Evidence of consolidation",
                                    present: false,
                                    significant: false,
                                    none: false,
                                    comment: ""
                                }
                            ],
                            name: "Peribronchovascular component"
                        },
                        {
                            nodularAbnormalities: {
                                name: "Nodular Abnormalities",
                                present: false,
                                ifPresent: {
                                    "extensive-limited": false,
                                    "perilymphatic": false,
                                    "centrilobular": false,
                                    "treeInBud": false,
                                    "fissural": false,
                                    "random": false
                                }
                            }
                        },
                        {
                            "honeycombingVSemphysema": {
                                "emphysema": [
                                    {
                                        "name": "Emphysema",
                                        "present": false,
                                        "significant": false,
                                        "none": false,
                                        "comment": ""
                                    },
                                    {
                                        "name": "Centrilobular",
                                        "present": false,
                                        "significant": false,
                                        "none": false,
                                        "comment": ""

                                    },
                                    {
                                        "name": "Panlobular",
                                        "present": false,
                                        "significant": false,
                                        "none": false,
                                        "comment": ""
                                    },
                                    {
                                        "name": "Panacinar",
                                        "present": false,
                                        "significant": false,
                                        "none": false,
                                        "comment": ""
                                    },
                                    {
                                        "name": "Predominantly basal",
                                        "present": false,
                                        "significant": false,
                                        "none": false,
                                        "comment": ""
                                    }
                                ],
                                "discreteLungCysts": {
                                    "name": "Discrete Lung Cysts",
                                    "present": false,
                                    "significant": false,
                                    "none": false,
                                    "comment": ""
                                },
                                "microcysticHoneycombing": {
                                    "name": "Microcystic honeycombing",
                                    "present": false,
                                    "significant": false,
                                    "none": false,
                                    "comment": ""
                                },
                                "coarseHoneycombing": {
                                    "name": "Coarse honeycombing",
                                    "present": false,
                                    "significant": false,
                                    "none": false,
                                    "comment": ""
                                }

                            },
                            "name": "Honeycombing vs emphysema"
                        }
                    ]
                }
            ]
        }
    )
};

exports.diagnoses = function (req, res) {
    res.json(
        {
            diagnoses: {
                radiologist: "",
                gmc: "",
                date: "",
                questions: [
                    {
                        name: "Is there evidence of Interstitial Lung Disease (ILD)?",
                        evidence: false
                    },
                    {
                        name: "Clinical Information provided",
                        knownILD: false,
                        knownCTD: false,
                        evidenceOfCTD: {
                            name: "Evidence of CTD",
                            evidence: false,
                            comment: ""
                        },
                        everSmoker: false,
                        otherRelevantClinicalInfo: ""
                    },
                    {
                        name: "UIP Classification",
                        fullName: "Usual Interstitial Pneumonia",
                        UIP: false,
                        possibleUIP: false,
                        inconsistentUIP: false
                    },
                    {
                        name: "Non-specific IP",
                        fullName: "Non-Specific Interstitial Pneumonia (NSIP)",
                        notConsideredORtypical: {
                            value: false,
                            iftrue: 5
                        },
                        yes: false,
                        possible: false,
                        suspectFibroticNSIP: false,
                        previousCT: false,
                        progression: false,
                        comment: ""
                    },
                    {
                        name: "Crypto Organising Pneumonia (COP)",
                        notConsideredORtypical: false,
                        yes: false,
                        known: false,
                        progressonFromBefore: false
                    },
                    {
                        name: "Respiratory Bronchioloitis ILD (RBILD)",
                        notConsideredORtypical: false,
                        yes: false,
                        known: false,
                        newDiagnosis: false,
                        severity: "mild/moderate/severe",
                        suspectDIP: false
                    },
                    {
                        name: "Sarcoidosis",
                        notConsideredORtypical: false,
                        known: false,
                        probable: false,
                        possible: false,
                        staging: 1,
                        extraPulmonaryDisease: false
                    },
                    {
                        name: "Hypersensitivity Pneumonitis (HP)",
                        notConsideredORtypical: false,
                        known: false,
                        actueHP: false,
                        subacuteHP: false,
                        chronicHP: false,
                        clinicalRefToSuspectAntigen: ""
                    },
                    {
                        name: "Asbestos-related disease",
                        notConsideredORtypical: false,
                        known: false,
                        pleuralPlaques: false,
                        pleuralThickening: false,
                        asbestosis: false,
                        severity: "mild/moderate/severe"
                    },
                    {
                        name: "Other ILD",
                        notConsideredORtypical: false,
                        aip: {
                            name: "Acute Interstitial Pneumonia (AIP)",
                            known: false,
                            comparison: false,
                            newDiagnosis: false
                        },
                        lch: {
                            name: "Langerhans CellHistocytosis (LCH)",
                            known: false,
                            comparison: false,
                            newDiagnosis: false
                        },
                        lam: {
                            name: "Lymphangioleiomyomatosis (LAM)",
                            known: false,
                            comparison: false,
                            newDiagnosis: false
                        },
                        other: "consider Eosinophilic pneumonia",
                        comment: ""
                    },
                    {
                        name: "Cardiovascular Findings",
                        normal: false,
                        dilatedRightHeart: false,
                        abnormalLeftHeart: false,
                        coronaryCalcification: false
                    },
                    {
                        name: "Other/Incidental findings",
                        nilElse: false,
                        solitaryPulmonaryNodule: false,
                        other: false,
                        comment: ""
                    },
                    {
                        name: "Other/Comment",
                        comment: "",
                        secondOpinion: false
                    }
                ]

            }
        }
    )
};