'use strict';
/* Global Variables */
var caseID;
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
};
var currentReport;
var editing = false;

/* Controllers */

// Constroller for index.jade
function AppCtrl($scope, $http, $log) {

    $scope.questionNumber = 0;


}

// Controller for partial1.jade
function MyCtrl1($scope, $http, $log, $location) {
    editing = false;

    // Provides case data but could use http for external case data
    $scope.collection = [{
        caseID: 1,
        referringPhysician: "Dr. Jones",
        date: "20/06/2016 15:30",
        patient: "xxxxx xxxxx"
    }, {
        caseID: 2,
        referringPhysician: "Dr. Stephenson",
        date: "24/06/2016 11:20",
        patient: "xxxxx xxxxx"
    }, {
        caseID: 3,
        referringPhysician: "Dr. Davies",
        date: "26/06/2016 12:55",
        patient: "xxxxx xxxxx"
    }];

    $scope.status = function (caseID, reports) {
        if (reports != undefined) {
            var status = "waiting";
            for (var i = 0; i < reports.length; i++) {
                if (reports[i].caseID == caseID) {
                    status = "reported";
                }
            }
            return status
        }
    };

    $scope.startNewReport = function (caseId) {
        caseID = caseId;
    };

    $http.post("/database/search/reports").success(function (data, status) {
        console.log("Reports successfully retrieved " + data);
        $scope.reports = data;
    }).error(function (data, status, headers, config) {
        $log.log(status);
    });

    $scope.editReport = function (reportID) {
        var data = $.param({
            _id: reportID
        });

        $http.post("/database/search/report", data, config).success(function (data, status) {
            console.log("Successfully retrieved report for editing " + data);
            currentReport = data;
            editing = true;
            $location.path('/existing');
        }).error(function (data, status) {
            $log.log(status)
        });
    };
}
MyCtrl1.$inject = ['$scope', '$http', '$log', '$location'];


// Controller for partial2.jade
function MyCtrl2() {
}
MyCtrl2.$inject = [];

// Controller for partial3.jade
function newReportCtrl($scope, $http, $log, $timeout, $location) {

    var zonalDominance,
        parenchymalDescriptors,
        peribronchovascularComponent,
        nodularAbnormalities,
        honeycombingVSemphysema;

    // Gets descriptors from /routes/api/descriptors for question names used on the client-side
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        zonalDominance = data.descriptors[0].zonalDominance;
        parenchymalDescriptors = data.descriptors[1].parenchymalDescriptors;
        peribronchovascularComponent = data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent;
        nodularAbnormalities = data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities;
        honeycombingVSemphysema = data.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema;


    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });

    $scope.editing = editing;

    var date = new Date();

    // If the user is editing the report then their details will be loaded into the input otherwise leave it blank
    if (editing) {
        $scope.firstName = currentReport.author.firstName;
        $scope.lastName = currentReport.author.lastName;
        $scope.level = currentReport.level;
        $scope.mdt = currentReport.mdt;
        $scope.dateCreated = currentReport.created;
        $scope.referringPhysician = currentReport.referringPhysician;
        $scope.caseID = currentReport.caseID;
    } else {
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.level = "";
        $scope.mdt = {
            regular: false
        };
        $scope.dateCreated = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
        $scope.referringPhysician = "";
        $scope.caseID = caseID;
    }

    // Submits the users details to the database
    $scope.submit = function () {
        document.getElementById('submitDetails').value = "Submitting...";

        // Sends a different POST request depending on whether the user is creating a new report
        // or updating an old report
        var config,
            data;

        if (editing) {


            // data to send to database from user input
            data = $.param({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                created: $scope.dateCreated,
                level: $scope.level,
                mdt: $scope.mdt,
                referringPhysician: $scope.referringPhysician,
                caseID: caseID
            });

            console.log("Updating");
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Update': editing,
                    '_id': currentReport._id
                }
            };

            // User details are sent to server side in app.js using http POST request to update the user details
            $http.post("/database/documents/update", data, config).success(function (data, status) {
                $scope.questionNumber++;
                $location.path('/descriptors');
            }).error(function (data, status, headers, config) {
                $log.log(status);
            });


        } else {


            // data to send to database from user input and empty report
            data = $.param({
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                created: $scope.dateCreated,
                level: $scope.level,
                mdt: $scope.mdt,
                referringPhysician: $scope.referringPhysician,
                caseID: caseID,
                descriptors: [
                    {
                        zonalDominance: [
                            {
                                name: zonalDominance[0].name,
                                basal: zonalDominance[0].basal,
                                upper: zonalDominance[0].upper,
                                middle: zonalDominance[0].middle,
                                none: zonalDominance[0].none
                            },
                            {
                                name: zonalDominance[1].name,
                                posterior: zonalDominance[1].posterior,
                                anterior: zonalDominance[1].anterior,
                                none: zonalDominance[1].none
                            },
                            {
                                name: zonalDominance[2].name,
                                symmetrical: zonalDominance[2].symmetrical,
                                asymmetrical: zonalDominance[2].asymmetrical
                            },
                            {
                                name: zonalDominance[3].name,
                                central: zonalDominance[3].central,
                                peripheral: zonalDominance[3].peripheral,
                                none: zonalDominance[3].none
                            }
                        ]
                    },
                    {
                        parenchymalDescriptors: [
                            {
                                name: parenchymalDescriptors[0].name,
                                reticular: parenchymalDescriptors[0].reticular,
                                nodular: parenchymalDescriptors[0].nodular,
                                both: parenchymalDescriptors[0].both,
                                none: parenchymalDescriptors[0].none
                            },
                            {
                                name: parenchymalDescriptors[1].name,
                                present: parenchymalDescriptors[1].present,
                                significant: parenchymalDescriptors[1].significant,
                                none: parenchymalDescriptors[1].none,
                                comment: parenchymalDescriptors[1].comment
                            },
                            {
                                name: parenchymalDescriptors[2].name,
                                present: parenchymalDescriptors[2].present,
                                significant: parenchymalDescriptors[2].significant,
                                none: parenchymalDescriptors[2].none,
                                comment: parenchymalDescriptors[2].comment
                            },
                            {
                                peribronchovascularComponent: [
                                    {
                                        name: peribronchovascularComponent[0].name,
                                        present: peribronchovascularComponent[0].present,
                                        significant: peribronchovascularComponent[0].significant,
                                        none: peribronchovascularComponent[0].none,
                                        comment: peribronchovascularComponent[0].comment
                                    },
                                    {
                                        name: peribronchovascularComponent[1].name,
                                        present: peribronchovascularComponent[1].present,
                                        significant: peribronchovascularComponent[1].significant,
                                        none: peribronchovascularComponent[1].none,
                                        comment: peribronchovascularComponent[1].comment
                                    },
                                    {
                                        name: peribronchovascularComponent[2].name,
                                        present: peribronchovascularComponent[2].present,
                                        significant: peribronchovascularComponent[2].significant,
                                        none: peribronchovascularComponent[2].none,
                                        comment: peribronchovascularComponent[2].comment
                                    },
                                    {
                                        name: peribronchovascularComponent[3].name,
                                        present: peribronchovascularComponent[3].present,
                                        significant: peribronchovascularComponent[3].significant,
                                        none: peribronchovascularComponent[3].none,
                                        comment: peribronchovascularComponent[3].comment
                                    },
                                    {
                                        name: peribronchovascularComponent[4].name,
                                        present: peribronchovascularComponent[4].present,
                                        significant: peribronchovascularComponent[4].significant,
                                        none: peribronchovascularComponent[4].none,
                                        comment: peribronchovascularComponent[4].comment
                                    }
                                ],
                                name: "Peribronchovascular component"
                            },
                            {
                                nodularAbnormalities: {
                                    name: nodularAbnormalities.name,
                                    present: nodularAbnormalities.present,
                                    ifPresent: {
                                        "extensive-limited": nodularAbnormalities.ifPresent.extensive,
                                        "perilymphatic": nodularAbnormalities.ifPresent.perilymphatic,
                                        "centrilobular": nodularAbnormalities.ifPresent.centrilobular,
                                        "treeInBud": nodularAbnormalities.ifPresent.treeInBud,
                                        "fissural": nodularAbnormalities.ifPresent.fissural,
                                        "random": nodularAbnormalities.ifPresent.random
                                    }
                                }
                            },
                            {
                                "honeycombingVSemphysema": {
                                    "emphysema": [
                                        {
                                            "name": honeycombingVSemphysema.emphysema[0].name,
                                            "present": honeycombingVSemphysema.emphysema[0].present,
                                            "significant": honeycombingVSemphysema.emphysema[0].significant,
                                            "none": honeycombingVSemphysema.emphysema[0].none,
                                            "comment": honeycombingVSemphysema.emphysema[0].comment
                                        },
                                        {
                                            "name": honeycombingVSemphysema.emphysema[1].name,
                                            "present": honeycombingVSemphysema.emphysema[1].present,
                                            "significant": honeycombingVSemphysema.emphysema[1].significant,
                                            "none": honeycombingVSemphysema.emphysema[1].none,
                                            "comment": honeycombingVSemphysema.emphysema[1].comment

                                        },
                                        {
                                            "name": honeycombingVSemphysema.emphysema[2].name,
                                            "present": honeycombingVSemphysema.emphysema[2].present,
                                            "significant": honeycombingVSemphysema.emphysema[2].significant,
                                            "none": honeycombingVSemphysema.emphysema[2].none,
                                            "comment": honeycombingVSemphysema.emphysema[2].comment
                                        },
                                        {
                                            "name": honeycombingVSemphysema.emphysema[3].name,
                                            "present": honeycombingVSemphysema.emphysema[3].present,
                                            "significant": honeycombingVSemphysema.emphysema[3].significant,
                                            "none": honeycombingVSemphysema.emphysema[3].none,
                                            "comment": honeycombingVSemphysema.emphysema[3].comment
                                        },
                                        {
                                            "name": honeycombingVSemphysema.emphysema[4].name,
                                            "present": honeycombingVSemphysema.emphysema[4].present,
                                            "significant": honeycombingVSemphysema.emphysema[4].significant,
                                            "none": honeycombingVSemphysema.emphysema[4].none,
                                            "comment": honeycombingVSemphysema.emphysema[4].comment
                                        }
                                    ],
                                    "discreteLungCysts": {
                                        "name": honeycombingVSemphysema.discreteLungCysts.name,
                                        "present": honeycombingVSemphysema.discreteLungCysts.present,
                                        "significant": honeycombingVSemphysema.discreteLungCysts.significant,
                                        "none": honeycombingVSemphysema.discreteLungCysts.none,
                                        "comment": honeycombingVSemphysema.discreteLungCysts.comment
                                    },
                                    "microcysticHoneycombing": {
                                        "name": honeycombingVSemphysema.microcysticHoneycombing.name,
                                        "present": honeycombingVSemphysema.microcysticHoneycombing.present,
                                        "significant": honeycombingVSemphysema.microcysticHoneycombing.significant,
                                        "none": honeycombingVSemphysema.microcysticHoneycombing.none,
                                        "comment": honeycombingVSemphysema.microcysticHoneycombing.comment
                                    },
                                    "coarseHoneycombing": {
                                        "name": honeycombingVSemphysema.coarseHoneycombing.name,
                                        "present": honeycombingVSemphysema.coarseHoneycombing.present,
                                        "significant": honeycombingVSemphysema.coarseHoneycombing.significant,
                                        "none": honeycombingVSemphysema.coarseHoneycombing.none,
                                        "comment": honeycombingVSemphysema.coarseHoneycombing.comment
                                    }

                                },
                                "name": "Honeycombing vs emphysema"
                            }
                        ]
                    }
                ]
            });

            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Update': editing
                }
            };

            // User details are sent to server side in app.js using http POST request
            $http.post("/database/documents/saveNew", data, config).success(function (data, status) {
                currentReport = data;
                console.log("Saved report: " + data);
                $location.path('/descriptors');
            }).error(function (data, status, headers, config) {
                $log.log(status);
            });
        }
    };

    // Delete Button code that changes the button and span class to indicate to the user
    // that the deletion has been successful
    $scope.deleteButtonClass = "form-control btn btn-danger";
    $scope.deleteButtonSpanClass = "glyphicon glyphicon-trash";
    $scope.deleteButtonValue = "Delete ";

    $scope.deleteReport = function () {
        var data = $.param({
            '_id': currentReport._id
        });
        $http.post("database/documents/deleteReport", data, config).success(function (data, status) {
            $log.log(data);
            $scope.deleteButtonClass = "form-control btn btn-success";
            $scope.deleteButtonSpanClass = "glyphicon glyphicon-ok";
            $scope.deleteButtonValue = "Deleted ";
            $timeout(function () {
                $location.path('/view1');        // Need to change this when implementing the login system

            }, 1000);
        }).error(function (data, status) {
            $log.log(status);
        });
    }
}
newReportCtrl.$inject = ['$scope', '$http', '$log', '$timeout', '$location'];

function descriptorsController1($scope, $http, $log, $location) {

    console.log("Current report: " + currentReport);

    // Gets descriptors from /routes/api/descriptors for question names used on the client-side
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        $scope.data = data;

        /********* Names and data for descriptors questions ************/
            // Zonal Dominance data needed for questions
        $scope.zonalDominance = data.descriptors[0].zonalDominance;
        $scope.ccName = Object.getOwnPropertyNames($scope.zonalDominance[0]);
        $scope.apName = Object.getOwnPropertyNames($scope.zonalDominance[1]);
        $scope.lrName = Object.getOwnPropertyNames($scope.zonalDominance[2]);
        $scope.cpName = Object.getOwnPropertyNames($scope.zonalDominance[3]);

        // Parenchymal Descriptors data needed for questions
        $scope.parenchymalDescriptors = data.descriptors[1].parenchymalDescriptors;
        $scope.paName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[0]);
        $scope.ggoName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[1]);
        $scope.ggorName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[2]);

        // Peribronchovascular Component
        $scope.pcName = data.descriptors[1].parenchymalDescriptors[3];
        $scope.tbName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[0]);
        $scope.tb2Name = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[1]);

    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });

    /************ Bound variables ***************/
    /**** Zonal Dominance ******/
        // Cranio-caudal Involvement bound variables
    $scope.basal = currentReport.descriptors.zonalDominance.ccInvolvement.basal;
    $scope.upper = currentReport.descriptors.zonalDominance.ccInvolvement.upper;
    $scope.middle = currentReport.descriptors.zonalDominance.ccInvolvement.middle;
    $scope.ccNone = currentReport.descriptors.zonalDominance.ccInvolvement.none;

    // Antero-Posterior Distribution bound variables
    $scope.anterior = currentReport.descriptors.zonalDominance.apDistribution.anterior;
    $scope.posterior = currentReport.descriptors.zonalDominance.apDistribution.posterior;
    $scope.apNone = currentReport.descriptors.zonalDominance.apDistribution.none;

    // Left-Right Predominance bound variables
    $scope.symmetrical = currentReport.descriptors.zonalDominance.lrPredominance.symmetrical;
    $scope.asymmetrical = currentReport.descriptors.zonalDominance.lrPredominance.asymmetrical;

    // Central vs Peripheral Dominance
    $scope.central = currentReport.descriptors.zonalDominance.cpDominance.central;
    $scope.peripheral = currentReport.descriptors.zonalDominance.cpDominance.peripheral;
    $scope.cpNone = currentReport.descriptors.zonalDominance.cpDominance.none;

    /**** Parenchymal Descriptors ****/
        // Predominant Abnormality
    $scope.predominantAbnormalityReticular = currentReport.descriptors.parenchymalDescriptors.predominantAbnormality.reticular;
    $scope.predominantAbnormalityNodular = currentReport.descriptors.parenchymalDescriptors.predominantAbnormality.nodular;
    $scope.predominantAbnormalityBoth = currentReport.descriptors.parenchymalDescriptors.predominantAbnormality.both;
    $scope.predominantAbnormalityNone = currentReport.descriptors.parenchymalDescriptors.predominantAbnormality.none;

    // Ground-Glass Opacification
    $scope.ggoPresent = currentReport.descriptors.parenchymalDescriptors.ggo.present;
    $scope.ggoSignificant = currentReport.descriptors.parenchymalDescriptors.ggo.significant;
    $scope.ggoNone = currentReport.descriptors.parenchymalDescriptors.ggo.none;
    $scope.ggoComment = currentReport.descriptors.parenchymalDescriptors.ggo.comment;

    // Concordance of GGO & reticulation
    $scope.ggorPresent = currentReport.descriptors.parenchymalDescriptors.ggoReticulation.present;
    $scope.ggorSignificant = currentReport.descriptors.parenchymalDescriptors.ggoReticulation.significant;
    $scope.ggorNone = currentReport.descriptors.parenchymalDescriptors.ggoReticulation.none;
    $scope.ggorComment = currentReport.descriptors.parenchymalDescriptors.ggoReticulation.comment;

    // Peribronchovascular Component
    // Traction bronchiectasis
    $scope.tbPresent = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.present;
    $scope.tbSignificant = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.significant;
    $scope.tbNone = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.none;
    $scope.tbComment = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiectasis.comment;

    // Traction bronchiolectasis
    $scope.tb2Present = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.present;
    $scope.tb2Significant = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.significant;
    $scope.tb2None = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.none;
    $scope.tb2Comment = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.tractionBronchiolectasis.comment;

    $scope.submit = function () {
        //document.getElementById('submitDetails').value = "Submitting...";

        var data = $.param({
            descriptors: {
                zonalDominance: {
                    ccInvolvement: {
                        basal: $scope.basal,
                        upper: $scope.upper,
                        middle: $scope.middle,
                        none: $scope.ccNone
                    },
                    apDistribution: {
                        posterior: $scope.posterior,
                        anterior: $scope.anterior,
                        none: $scope.apNone
                    },
                    lrPredominance: {
                        symmetrical: $scope.symmetrical,
                        asymmetrical: $scope.asymmetrical
                    },
                    cpDominance: {
                        central: $scope.central,
                        peripheral: $scope.peripheral,
                        none: $scope.cpNone
                    }
                },
                parenchymalDescriptors: {
                    predominantAbnormality: {
                        reticular: $scope.predominantAbnormalityReticular,
                        nodular: $scope.predominantAbnormalityNodular,
                        both: $scope.predominantAbnormalityBoth,
                        none: $scope.predominantAbnormalityNone
                    },
                    ggo: {
                        present: $scope.ggoPresent,
                        significant: $scope.ggoSignificant,
                        none: $scope.ggoNone,
                        comment: $scope.ggoComment
                    },
                    ggoReticulation: {
                        present: $scope.ggorPresent,
                        significant: $scope.ggorSignificant,
                        none: $scope.ggorNone,
                        comment: $scope.ggorComment
                    },
                    peribronchovascularComponent: {
                        tractionBronchiectasis: {
                            present: $scope.tbPresent,
                            significant: $scope.tbSignificant,
                            none: $scope.tbNone,
                            comment: $scope.tbComment
                        },
                        tractionBronchiolectasis: {
                            present: $scope.tb2Present,
                            significant: $scope.tb2Significant,
                            none: $scope.tb2None,
                            comment: $scope.tb2Comment
                        }
                    }
                }
            }
        });

        config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                'Update': editing,
                'reportid': currentReport._id
            }
        };

        $http.post("/database/documents/descriptors1", data, config).success(function (data, status) {
            console.log(data);
            $location.path('/descriptors2');
        }).error(function (data, status, headers, config) {
            $log.log(status);
        });
    }
}
descriptorsController1.$inject = ['$scope', '$http', '$log', '$location'];

function descriptorsController2($scope, $http, $log, $location) {

    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        $scope.names = data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent;
        $scope.data = data;

        $scope.airwayPluggingName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2]);
        $scope.mosaicismName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3]);
        $scope.consolidationName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4]);

        // Nodular Abnormalities
        $scope.naName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities);
        $scope.ifPresentNames = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent);

    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });

    // Airway Plugging
    $scope.airwayPluggingPresent = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.present;
    $scope.airwayPluggingSignificant = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.significant;
    $scope.airwayPluggingNone = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.none;
    $scope.airwayPluggingComment = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.airwayPluging.comment;

    // Mosaicism
    $scope.mosaicismPresent = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.present;
    $scope.mosaicismSignificant = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.significant;
    $scope.mosaicismNone = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.none;
    $scope.mosaicismComment = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.mosaicism.comment;

    // Evidence Of Consolidation
    $scope.evidenceOfConsolidationPresent = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.present;
    $scope.evidenceOfConsolidationSignificant = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.significant;
    $scope.evidenceOfConsolidationNone = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.none;
    $scope.evidenceOfConsolidationComment = currentReport.descriptors.parenchymalDescriptors.peribronchovascularComponent.evidenceOfConsolidation.comment;

    // Nodular Abnormalities
    $scope.nodularAbnormalitiesPresent = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.present;
    $scope.nodularAbnormalitiesIfPresentExtensive = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent['extensive-limited'];
    $scope.nodularAbnormalitiesIfPresentPerilymphatic = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.perilymphatic;
    $scope.nodularAbnormalitiesIfPresentCentrilobular = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.centrilobular;
    $scope.nodularAbnormalitiesIfPresentTreeInBud = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.treeInBud;
    $scope.nodularAbnormalitiesIfPresentFissural = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.fissural;
    $scope.nodularAbnormalitiesIfPresentRandom = currentReport.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent.random;

    $scope.submit = function () {
        //document.getElementById('submitDetails').value = "Submitting...";

        var data = $.param({
            descriptors: {
                parenchymalDescriptors: {
                    peribronchovascularComponent: {
                        airwayPluging: {
                            present: $scope.airwayPluggingPresent,
                            significant: $scope.airwayPluggingSignificant,
                            none: $scope.airwayPluggingNone,
                            comment: $scope.airwayPluggingComment
                        },
                        mosaicism: {
                            present: $scope.mosaicismPresent,
                            significant: $scope.mosaicismSignificant,
                            none: $scope.mosaicismNone,
                            comment: $scope.mosaicismComment
                        },
                        evidenceOfConsolidation: {
                            present: $scope.evidenceOfConsolidationPresent,
                            significant: $scope.evidenceOfConsolidationSignificant,
                            none: $scope.evidenceOfConsolidationNone,
                            comment: $scope.evidenceOfConsolidationComment
                        }
                    },
                    nodularAbnormalities: {
                        present: $scope.nodularAbnormalitiesPresent,
                        ifPresent: {
                            "extensive-limited": $scope.nodularAbnormalitiesIfPresentExtensive,
                            "perilymphatic": $scope.nodularAbnormalitiesIfPresentPerilymphatic,
                            "centrilobular": $scope.nodularAbnormalitiesIfPresentCentrilobular,
                            "treeInBud": $scope.nodularAbnormalitiesIfPresentTreeInBud,
                            "fissural": $scope.nodularAbnormalitiesIfPresentFissural,
                            "random": $scope.nodularAbnormalitiesIfPresentRandom
                        }
                    }
                }
            }
        });

        config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                'Update': editing,
                'reportid': currentReport._id
            }
        };

        $http.post("/database/documents/descriptors2", data, config).success(function (data, status) {
            console.log(data);
            $location.path('/descriptors3');
        }).error(function (data, status, headers, config) {
            $log.log(status);
        });
    }
}

descriptorsController2.$inject = ['$scope', '$http', '$log', '$location'];

function descriptorsController3($scope, $http, $log, $location) {
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        // Honeycombing vs Emphysema
        $scope.honeycombing = data.descriptors[1].parenchymalDescriptors[5];
        $scope.emphysemaName = data.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema;
        $scope.listOptions = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0]);

    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });

    // Emphysema
    $scope.emphysemaPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.present;
    $scope.emphysemaSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.significant;
    $scope.emphysemaNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.none;
    $scope.emphysemaComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.emphysema.comment;

    // Centrilobular
    $scope.centrilobularPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.present;
    $scope.centrilobularSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.significant;
    $scope.centrilobularNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.none;
    $scope.centrilobularComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.centrilobular.comment;

    // Panlobular
    $scope.panlobularPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.present;
    $scope.panlobularSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.significant;
    $scope.panlobularNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.none;
    $scope.panlobularComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panlobular.comment;

    // Panacinar
    $scope.panacinarPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.present;
    $scope.panacinarSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.significant;
    $scope.panacinarNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.none;
    $scope.panacinarComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.panacinar.comment;

    // Predominantly basal
    $scope.predominantlyBasalPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.present;
    $scope.predominantlyBasalSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.significant;
    $scope.predominantlyBasalNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.none;
    $scope.predominantlyBasalComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.emphysema.predominantlyBasal.comment;

    // Discrete Lung Cysts
    $scope.discreteLungCystsPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.present;
    $scope.discreteLungCystsSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.significant;
    $scope.discreteLungCystsNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.none;
    $scope.discreteLungCystsComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.discreteLungCysts.comment;

    // Microcystic honeycombing
    $scope.microcysticHoneycombingPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.present;
    $scope.microcysticHoneycombingSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.significant;
    $scope.microcysticHoneycombingNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.none;
    $scope.microcysticHoneycombingComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.microcysticHoneycombing.comment;

    // Coarse honeycombing
    $scope.coarseHoneycombingPresent = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.present;
    $scope.coarseHoneycombingSignificant = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.significant;
    $scope.coarseHoneycombingNone = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.none;
    $scope.coarseHoneycombingComment = currentReport.descriptors.parenchymalDescriptors.honeycombingVSemphysema.coarseHoneycombing.comment;

    $scope.submit = function () {
        //document.getElementById('submitDetails').value = "Submitting...";

        var data = $.param({
            descriptors: {
                parenchymalDescriptors: {
                    "honeycombingVSemphysema": {
                        "emphysema": {
                            emphysema: {
                                "present": $scope.emphysemaPresent,
                                "significant": $scope.emphysemaSignificant,
                                "none": $scope.emphysemaNone,
                                "comment": $scope.emphysemaComment
                            },
                            centrilobular: {
                                "present": $scope.centrilobularPresent,
                                "significant": $scope.centrilobularSignificant,
                                "none": $scope.centrilobularNone,
                                "comment": $scope.centrilobularComment
                            },
                            panlobular: {
                                "present": $scope.panlobularPresent,
                                "significant": $scope.panlobularSignificant,
                                "none": $scope.panlobularNone,
                                "comment": $scope.panlobularComment
                            },
                            panacinar: {
                                "present": $scope.panacinarPresent,
                                "significant": $scope.panacinarSignificant,
                                "none": $scope.panacinarNone,
                                "comment": $scope.panacinarComment
                            },
                            predominantlyBasal: {
                                "present": $scope.predominantlyBasalPresent,
                                "significant": $scope.predominantlyBasalSignificant,
                                "none": $scope.predominantlyBasalNone,
                                "comment": $scope.predominantlyBasalComment
                            }
                        },
                        "discreteLungCysts": {
                            "present": $scope.discreteLungCystsPresent,
                            "significant": $scope.discreteLungCystsSignificant,
                            "none": $scope.discreteLungCystsNone,
                            "comment": $scope.discreteLungCystsComment
                        },
                        "microcysticHoneycombing": {
                            "present": $scope.microcysticHoneycombingPresent,
                            "significant": $scope.microcysticHoneycombingSignificant,
                            "none": $scope.microcysticHoneycombingNone,
                            "comment": $scope.microcysticHoneycombingComment
                        },
                        "coarseHoneycombing": {
                            "present": $scope.coarseHoneycombingPresent,
                            "significant": $scope.coarseHoneycombingSignificant,
                            "none": $scope.coarseHoneycombingNone,
                            "comment": $scope.coarseHoneycombingComment
                        }
                    }
                }
            }
        });

        config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                'Update': editing,
                'reportid': currentReport._id
            }
        };

        $http.post("/database/documents/descriptors3", data, config).success(function (data, status) {
            console.log(data);
            $location.path('/print1');
        }).error(function (data, status, headers, config) {
            $log.log(status);
        });
    }
}
descriptorsController3.$inject = ['$scope', '$http', '$log', '$location'];

function printController1($scope, $http, $log, $location){
    $scope.data = "";
    var data = $.param({
        _id: currentReport._id
    });
    $http.post('/database/search/report', data, config).success(function(data, status){
        callback(data);
    }).error(function(data, status){
        $log.log(status);
    });
    var callback = function(data){
        $scope.data = data;
        $scope.zonalDominance = $scope.data.descriptors.zonalDominance;
        $scope.parenchymalDescriptors = $scope.data.descriptors.parenchymalDescriptors;
        $scope.nodularAbnormalities = data.descriptors.parenchymalDescriptors.nodularAbnormalities;
        $scope.ifPresent = data.descriptors.parenchymalDescriptors.nodularAbnormalities.ifPresent;
        $scope.peribronchovascularComponent = data.descriptors.parenchymalDescriptors.peribronchovascularComponent;
        $scope.honeycombingVSemphysema = data.descriptors.parenchymalDescriptors.honeycombingVSemphysema;

        console.log($scope.honeycombingVSemphysema);
    };


    $scope.showIf = function(obj){
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && obj.name != "Nodular Abnormalities" && key != 'name' && key != 'none' && obj[key] != '[object Object]'){
                    return true;
                } else if (obj[key] == '[object Object]'){
                    
                    console.log(key + ": " + JSON.stringify(obj[key]));
                }
            }
        }
    };

    $scope.findTrueValues = function(obj){
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && key != 'name' && obj[key] != '[object Object]'
                        && key != 'peribronchovascularComponent' && key != 'nodularAbnormalities' && isNaN(key)){
                    //console.log(key + ": " + obj[key]);
                    return key + ": " + obj[key];
                } else if (obj[key] == '[object Object]'){
                    for (var k in obj[key]){
                        if(obj[key].hasOwnProperty(k)){
                            console.log(k + ": " + obj[k]);
                        }
                    }
                }

            }
        }
    }

}
printController1.$inject = ['$scope', '$http', '$log', '$location'];