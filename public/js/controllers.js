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
    // Provides case data but could use http for external case data
    $scope.collection = [{
        caseID: 1,
        referringPhysician: "Dr. Jones",
        date: "20/06/2016 15:30",
        patient: "xxxxx xxxxx",
        status: "waiting"
    }, {
        caseID: 2,
        referringPhysician: "Dr. Stephenson",
        date: "24/06/2016 11:20",
        patient: "xxxxx xxxxx",
        status: "wiating"
    }, {
        caseID: 3,
        referringPhysician: "Dr. Davies",
        date: "26/06/2016 12:55",
        patient: "xxxxx xxxxx",
        status: "waiting"
    }];

    $scope.startNewReport = function (caseId) {
        caseID = caseId;
    };

    $http.post("/database/search/reports").success(function (data, status) {
        console.log(data);
        $scope.reports = data;

    }).error(function (data, status, headers, config) {
        $log.log(status);
    });

    $scope.editReport = function (reportID) {
        var data = $.param({
            _id: reportID
        });

        $http.post("/database/search/report", data, config).success(function (data, status){
            console.log(data);
            currentReport = data;
            editing = true;
            $location.path('/existing');
        }).error(function (data, status){
            $log.log(status)
        });
    };

    //$scope.person = [{name: "bob", age: 40}];
}
MyCtrl1.$inject = ['$scope', '$http', '$log', '$location'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function newReportCtrl($scope, $http, $log, $timeout, $location) {

    var date = new Date();

    if (editing){
        $scope.firstName = currentReport.author.firstName;
        $scope.lastName = currentReport.author.lastName;
        $scope.level = currentReport.level;
        $scope.dateCreated = currentReport.created;
        $scope.referringPhysician = currentReport.referringPhysician;
        $scope.caseID = currentReport.caseID;
    } else {
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.level = "";
        $scope.dateCreated = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
        $scope.referringPhysician = "";
        $scope.caseID = caseID;
    }

    // Code to save details to mongoDB goes here....
    $scope.submit = function () {
        document.getElementById('submitDetails').value = "Submitting...";

        var data = $.param({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            created: $scope.dateCreated,
            level: $scope.level,
            referringPhysician: $scope.referringPhysician,
            caseID: caseID
        });

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                'Update': 'true',
                '_id': currentReport._id
            }
        };

        $http.post("/database/documents", data, config).success(function (data, status) {
            $scope.questionNumber++;
            $location.path('/descriptors');
        }).error(function (data, status, headers, config) {
            $log.log(status);
        });

    }
}
newReportCtrl.$inject = ['$scope', '$http', '$log', '$timeout', '$location'];


function descriptorsController($scope, $http, $log, $location) {
    // Gets descriptors from /routes/api/descriptors for questions
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        //$log.log(data);

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
        $scope.airwayPluggingName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[2]);
        $scope.mosaicismName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[3]);
        $scope.consolidationName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[3].peribronchovascularComponent[4]);

        // Nodular Abnormalities
        $scope.naName = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities);
        $scope.ifPresentNames = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities.ifPresent);

        // Honeycombing vs Emphysema
        $scope.honeycombing = data.descriptors[1].parenchymalDescriptors[5];
        $scope.emphysema = data.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema;
        $scope.listOptions = Object.getOwnPropertyNames(data.descriptors[1].parenchymalDescriptors[5].honeycombingVSemphysema.emphysema[0]);


        /************ Bound variables ***************/
        /**** Zonal Dominance ******/
            // Cranio-caudal Involvement bound variables
        $scope.basal = $scope.zonalDominance[0].basal;
        $scope.upper = $scope.zonalDominance[0].upper;
        $scope.middle = $scope.zonalDominance[0].middle;
        $scope.ccNone = $scope.zonalDominance[0].none;

        // Antero-Posterior Distribution bound variables
        $scope.anterior = $scope.zonalDominance[1].anterior;
        $scope.posterior = $scope.zonalDominance[1].posterior;
        $scope.apNone = $scope.zonalDominance[1].none;

        // Left-Right Predominance bound variables
        $scope.symmetrical = $scope.zonalDominance[2].symmetrical;
        $scope.asymmetrical = $scope.zonalDominance[2].asymmetrical;

        // Central vs Peripheral Dominance
        $scope.central = $scope.zonalDominance[3].central;
        $scope.peripheral = $scope.zonalDominance[3].peripheral;
        $scope.cpNone = $scope.zonalDominance[3].none;

        /**** Parenchymal Descriptors ****/
            // Predominant Abnormality
        $scope.predominantAbnormalityReticular = $scope.parenchymalDescriptors[0].reticular;
        $scope.predominantAbnormalityNodular = $scope.parenchymalDescriptors[0].nodular;
        $scope.predominantAbnormalityBoth = $scope.parenchymalDescriptors[0].both;
        $scope.predominantAbnormalityNone = $scope.parenchymalDescriptors[0].none;

        // Ground-glass opacification (GGO)
        $scope.ggo = $scope.parenchymalDescriptors[1].present;
        $scope.ggo = $scope.parenchymalDescriptors[1].significant;
        $scope.ggoComment = $scope.parenchymalDescriptors[1].comment;

        // GGO Reticulation
        $scope.ggoReticulation = $scope.parenchymalDescriptors[2].present;
        $scope.ggoReticulation = $scope.parenchymalDescriptors[2].significant;
        $scope.ggoReticulationComment = $scope.parenchymalDescriptors[2].comment;

        // Peribronchovascular Component


        // Nodular Abnormalities
        $scope.nodularAbnormalities = data.descriptors[1].parenchymalDescriptors[4].nodularAbnormalities;


    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });


    $scope.submit = function () {
        //document.getElementById('submitDetails').value = "Submitting...";

        console.log($scope.basal + " " + $scope.anterior);

        var data = $.param({
            descriptors: [
                {
                    zonalDominance: [
                        {
                            name: "Cranio-caudal Involvement",
                            basal: $scope.basal,
                            upper: $scope.upper,
                            middle: $scope.middle,
                            none: $scope.ccNone
                        },
                        {
                            name: "Antero-Posterior Distribution",
                            posterior: $scope.posterior,
                            anterior: $scope.anterior,
                            none: $scope.apNone
                        },
                        {
                            name: "Left-Right Predominance",
                            symmetrical: $scope.symmetrical,
                            asymmetrical: $scope.asymmetrical
                        },
                        {
                            name: "Central vs Peripheral Dominance",
                            central: $scope.central,
                            peripheral: $scope.peripheral,
                            none: $scope.cpNone
                        }
                    ]
                }, {
                    parenchymalDescriptors: [
                        {
                            "name": "Predominant Abnormality",
                            "reticular": false,
                            "nodular": false,
                            "both": false,
                            "none": false
                        },
                        {
                            "name": "Ground-glass opacification (GGO)",
                            "present": false,
                            "significant": false,
                            "none": false,
                            "comment": ""
                        },
                        {
                            "name": "Concordance of GGO & reticulation",
                            "present": false,
                            "significant": false,
                            "none": false,
                            "comment": ""
                        }
                    ]
                }]
        });

        $http.post("/database/documents/descriptors", data, config).success(function (data, status) {

            $location.path('/diagnoses');

        }).error(function (data, status, headers, config) {
            $log.log(status);
        });
    };
}

descriptorsController.$inject = ['$scope', '$http', '$log', '$location'];