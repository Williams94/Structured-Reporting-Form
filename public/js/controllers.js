'use strict';

/* Controllers */

function AppCtrl($scope, $http, $log) {

    $http({method: 'GET', url: '/api/descriptors'}).success(function (data, status, headers, config) {

        $log.log(data);

        $scope.data = data;
        $scope.questionNumber = 0;


    }).error(function (data, status, headers, config) {
        $log.log(status);
        $scope.descriptors = 'Error!'
    });
}

function MyCtrl1($scope, $http, $log) {
    $scope.collection = [{
        case: 1,
        lastModified: new Date(),
        report: Object,
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

function newReportCtrl() {

}
newReportCtrl.$inject = [];


