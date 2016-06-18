'use strict';

/* Controllers */

function AppCtrl($scope, $http, $log) {

    $http({method: 'GET', url: '/api/descriptors/zonalDominance'}).success(function (data, status, headers, config){

        $log.log(data);

        $scope.data = data;
        $scope.questionNumber = 0;

        //$log.log(doc.name);

    }).error(function (data, status, headers, config){
        $log.log(status);
        $scope.descriptors = 'Error!'
    });
}

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
