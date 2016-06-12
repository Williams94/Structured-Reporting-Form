/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    res.json({
        name: 'Bob'
    });
};

exports.descriptors = function (req, res) {
    res.json(
        {
            "descriptors": {
                "zonalDominance": [
                    {
                        "cranio-caudalInvolvment": [
                            {
                                "name": "Cranio-caudal Involvement",
                                "basal": "false",
                                "upper": "false",
                                "middle": "false",
                                "none": "false"
                            }
                        ]
                    },
                    {
                        "antero-posteriorDistribution": [
                            {
                                "name": "Antero-Posterior Distribution",
                                "posterior": "false",
                                "anterior": "false",
                                "none": "false"
                            }
                        ]
                    },
                    {
                        "left-rightPredominance": [
                            {
                                "name": "Left-Right Predominance",
                                "symmetrical": "false",
                                "asymetrical": "false"
                            }
                        ]
                    },
                    {
                        "central-peripheralDominance": [
                            {
                                "name": "Central vs Peripheral Dominance",
                                "central": "false",
                                "peripheral": "false",
                                "none": "false"
                            }
                        ]
                    }
                ],
                "parenchymalDescriptors": [
                    {
                        "predominantAbnormaility": [
                            {
                                "name": "Predominant Abnormality",
                                "reticular": "false",
                                "nodular": "false",
                                "both": "false"
                            }
                        ]
                    },
                    {
                        "ground-glassOpacification": [
                            {
                                "name": "Ground-glass opacification (GGO)",
                                "present": "false",
                                "significant": "false",
                                "comment": "none"
                            }
                        ]
                    },
                    {
                        "ggo/reticulationConcordance": [
                            {
                                "name": "Is there concordance of GGO & reticulation",
                                "present": "false",
                                "significant": "false",
                                "comment": "none"
                            }
                        ]
                    },
                    {
                        "peribronchovascularComponent": [
                            {
                                "name": "Peribronchovascular component",
                                "tractionBronchiectasis":[
                                    {
                                        "name": "Traction bronchiectasis",
                                        "present": "false",
                                        "significant": "false",
                                        "comment": "none"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

        }
    )
};