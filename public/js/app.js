'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute', 'smart-table'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partial/1', controller: MyCtrl1});
        $routeProvider.when('/view2', {templateUrl: 'partial/2', controller: MyCtrl2});
        $routeProvider.when('/new', {templateUrl: 'partial/3', controller: newReportCtrl});
        $routeProvider.when('/existing', {templateUrl: 'partial/3', controller: newReportCtrl});
        $routeProvider.when('/descriptors', {templateUrl: 'partial/4', controller: descriptorsController1});
        $routeProvider.when('/descriptors2', {templateUrl: 'partial/5', controller: descriptorsController2});
        $routeProvider.when('/descriptors3', {templateUrl: 'partial/6', controller: descriptorsController3});
        $routeProvider.when('/print1', {templateUrl: 'partial/7', controller: printController1});
        $routeProvider.when('/diagnoses1', {templateUrl: 'partial/8', controller: diagnosesController1});
        $routeProvider.when('/diagnoses2', {templateUrl: 'partial/9', controller: diagnosesController2});
        $routeProvider.when('/diagnoses3', {templateUrl: 'partial/10', controller: diagnosesController3});
        $routeProvider.when('/print2', {templateUrl: 'partial/11', controller: printController2});
        $routeProvider.otherwise({redirectTo: '/view1'});
        $locationProvider.html5Mode(true);
    }]);