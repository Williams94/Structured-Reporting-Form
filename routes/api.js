/*
 * Serve JSON to our AngularJS client
 */
exports.descriptors = function (req, res) {
    res.json(
        {
            "descriptors": [
                {
                    "zonalDominance": [
                        {
                            "name": "Cranio-caudal Involvement",
                            "basal": false,
                            "upper": false,
                            "middle": false,
                            "none": false
                        },
                        {
                            "name": "Antero-Posterior Distribution",
                            "posterior": false,
                            "anterior": false,
                            "none": false
                        },
                        {
                            "name": "Left-Right Predominance",
                            "symmetrical": false,
                            "asymetrical": false
                        },
                        {
                            "name": "Central vs Peripheral Dominance",
                            "central": false,
                            "peripheral": false,
                            "none": false
                        }
                    ]
                },
                {
                    "parenchymalDescriptors": [
                        {
                            "name": "Predominant Abnormality",
                            "reticular": false,
                            "nodular": false,
                            "both": false
                        },
                        {
                            "name": "Ground-glass opacification (GGO)",
                            "present": false,
                            "significant": false,
                            "comment": "none"
                        },
                        {
                            "name": "Is there concordance of GGO & reticulation",
                            "present": false,
                            "significant": false,
                            "comment": "none"
                        },
                        {
                            "peribronchovascularComponent": [
                                {
                                    "name": "Traction bronchiectasis",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                {
                                    "name": "Traction bronchiolectasis",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                {
                                    "name": "Airway plugging",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                {
                                    "name": "Mosaicism",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                {
                                    "name": "Evidence of consolidation",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                }
                            ],
                            "name": "Peribronchovascular component"
                        },
                        {
                            "nodularAbnormalities": {
                                "name": "Nodular Abnormalities",
                                "present": false,
                                "ifPresent": {
                                    "extensive/limited": false,
                                    "perilymphatic": false,
                                    "centrilobular": false,
                                    "tree-in-bud": false,
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
                                        "comment": "none"
                                    },
                                    {
                                        "name": "Centrilobular",
                                        "present": false,
                                        "significant": false,
                                        "comment": "none"

                                    },
                                    {
                                        "name": "Panlobular",
                                        "present": false,
                                        "significant": false,
                                        "comment": "none"
                                    },
                                    {
                                        "name": "Panacinar",
                                        "present": false,
                                        "significant": false,
                                        "comment": "none"
                                    },
                                    {
                                        "name": "Predominantly basal",
                                        "present": false,
                                        "significant": false,
                                        "comment": "none"
                                    }
                                ],
                                "discreteLungCysts": {
                                    "name": "Discrete Lung Cysts",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                "microcysticHoneycombing": {
                                    "name": "Microcystic honeycombing",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                },
                                "coarseHoneycombing": {
                                    "name": "Coarse honeycombing",
                                    "present": false,
                                    "significant": false,
                                    "comment": "none"
                                }

                            },
                            "name": "Honeycombing vs emphysema"
                        }
                    ]
                }]
        }
    )
};

exports.diagnoses = function (req, res) {
    res.json(
        {
            "diagnoses": {
                "radiologist": "",
                "gmc": "",
                "date": "",
                "questions": [
                    {
                        "name": "Is there evidence of Interstitial Lung Disease (ILD)?",
                        "evidence": false
                    },
                    {
                        "name": "Clinical Information provided",
                        "knownILD": false,
                        "knownCTD": false,
                        "evidenceOfCTD": {
                            "name": "Evidence of CTD",
                            "evidence": false,
                            "comment": "none"
                        },
                        "everSmoker": false,
                        "otherRelevantClinicalInfo": "none"
                    },
                    {
                        "name": "UIP Classification",
                        "fullName": "Usual Interstitial Pneumonia",
                        "UIP": false,
                        "possibleUIP": false,
                        "inconsistentUIP": false
                    },
                    {
                        "name": "Non-specific IP",
                        "fullName": "Non-Specific Interstitial Pneumonia (NSIP)",
                        "notConsidered/typical": {
                            "value": false,
                            "iftrue": 5
                        },
                        "yes": false,
                        "possible": false,
                        "suspectFibroticNSIP": false,
                        "previousCT": false,
                        "progression": false,
                        "comment": "none"
                    },
                    {
                        "name": "Crypto Organising Pneumonia (COP)",
                        "notConsidered/typical": false,
                        "yes": false,
                        "known": false,
                        "progressonFromBefore": false
                    },
                    {
                        "name": "Respiratory Bronchioloitis ILD (RBILD)",
                        "notConsidered/typical": false,
                        "yes": false,
                        "known": false,
                        "newDiagnosis": false,
                        "severity": "mild/moderate/severe",
                        "suspectDIP": false
                    },
                    {
                        "name": "Sarcoidosis",
                        "notConsidered/typical": false,
                        "known": false,
                        "probable": false,
                        "possible": false,
                        "staging": {
                            "onlyLN": 1,
                            "LN+parenchyma": 2,
                            "onlyParenchyma": 3,
                            "fibrosis": 4
                        },
                        "extra-pulmonaryDisease": false
                    },
                    {

                    }


                ]

            }
        }
    )
};