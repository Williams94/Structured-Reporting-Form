'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/name'}).success(function (data, status, headers, config) {
        $scope.name = data.name;
    }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
    });

    $http({method: 'GET', url: '/api/descriptors/zonalDominance'}).success(function (data, status, headers, config){
        $scope.descriptors = data.descriptors;

    }).error(function (data, status, headers, config){
        $scope.name = 'Error!'
    });
}

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
