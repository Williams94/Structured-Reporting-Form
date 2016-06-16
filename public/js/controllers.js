'use strict';

/* Controllers */

function AppCtrl($scope, $http, $log) {

    $http({method: 'GET', url: '/api/descriptors/zonalDominance'}).success(function (data, status, headers, config){

        $log.log(data);

        /*var dataString = JSON.stringify(data);



        $scope.name = function(dataString){
            return dataString.substr(dataString.indexOf("descriptors"), (dataString.lastIndexOf("descriptors") + ));
        };

        $log.log($scope.name(dataString));*/



        $scope.data = data;
        $scope.questionNumber = 0;

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
