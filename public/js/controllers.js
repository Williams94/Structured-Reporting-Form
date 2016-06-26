'use strict';

/* Controllers */

// Constroller for index.jade
function AppCtrl($scope, $http, $log) {

    $scope.questionNumber = 0;


}

// Controller for partial1.jade
function MyCtrl1($scope, $http, $log) {
    // Provides case data but could use http for external case data
    $scope.collection = [{
        case: 1,
        date: new Date(),
        patient: "xxxxx xxxxx",
        status: "waiting"
    }, {
        case: 2,
        date: new Date(),
        patient: "xxxxx xxxxx",
        status: "wiating"
    }, {
        case: 3,
        date: new Date(),
        patient: "xxxxx xxxxx",
        status: "waiting"
    }];


    //$scope.person = [{name: "bob", age: 40}];
}
MyCtrl1.$inject = ['$scope', '$http', '$log'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function newReportCtrl($scope, $http, $log, $timeout, $location) {

    var date = new Date();

    // Would use http to get radiologists details from mongoDB including case info
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.level = "";
    $scope.dateCreated = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
    $scope.referringPhysician = "";

    $scope.$watch('firstName', function (newValue, oldValue) {

    });


    // Code to save details to mongoDB goes here....
    $scope.submit = function () {
        document.getElementById('submitDetails').value = "Submitting...";

        var data = $.param({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            created: $scope.dateCreated,
            level: $scope.level,
            referringPhysician: $scope.referringPhysician
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        $http.post("/database/documents", data, config).success(function (data, status) {
            $log.log("data: " + data + " status: " + status);
            $scope.questionNumber++;
            $location.path('/descriptors');
        }).error(function (data, status, headers, config) {
            $log.log(status);
        });

    }
}
newReportCtrl.$inject = ['$scope', '$http', '$log', '$timeout', '$location'];


function descriptorsController($scope, $http, $log){
    // Gets descriptors from /routes/api/descriptors for questions
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        $log.log(data);

        $scope.data = data;

    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });
}

descriptorsController.$inject = ['$scope', '$http', '$log'];