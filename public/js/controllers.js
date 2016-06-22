'use strict';

/* Controllers */

// Constroller for index.jade
function AppCtrl($scope, $http, $log) {

    // Gets descriptors from /routes/api/descriptors for questions
    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        $log.log(data);

        $scope.data = data;

    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });
}

// Controller for partial1.jade
function MyCtrl1($scope, $http, $log) {



    // Provides case data but could use http for external case data
    $scope.collection = [{
        case: 1,
        lastModified: new Date(),
        report: "",
        completed: false
    }, {
        case: 2,
        lastModified: new Date(),
        report: Object,
        completed: false
    }, {
        case: 3,
        lastModified: new Date(),
        report: Object,
        completed: false
    }];
    //$scope.person = [{name: "bob", age: 40}];
}
MyCtrl1.$inject = ['$scope', '$http', '$log'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function newReportCtrl($scope, $http) {

    $scope.firstName = "";
    $scope.lastName = "";
    $scope.level = "";


    $scope.$watch('firstName', function (newValue, oldValue) {

    });
}
newReportCtrl.$inject = ['$scope'];


