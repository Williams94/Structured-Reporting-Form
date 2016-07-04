'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute', 'smart-table', 'angular.filter'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partial/1', controller: MyCtrl1});
        $routeProvider.when('/view2', {templateUrl: 'partial/2', controller: MyCtrl2});
        $routeProvider.when('/new', {templateUrl: 'partial/3', controller: newReportCtrl});
        $routeProvider.when('/existing', {templateUrl: 'partial/3', controller: newReportCtrl});
        $routeProvider.when('/descriptors', {templateUrl: 'partial/4', controller: descriptorsController});
        $routeProvider.when('/descriptors2', {templateUrl: 'partial/5', controller: descriptorsController});
        $routeProvider.when('/descriptors3', {templateUrl: 'partial/6', controller: descriptorsController});
        $routeProvider.otherwise({redirectTo: '/view1'});
        $locationProvider.html5Mode(true);
    }]);