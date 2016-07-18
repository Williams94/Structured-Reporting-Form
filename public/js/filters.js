'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION-TEST\%/, version);
    }}])
    .filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1) : '';
    }});
