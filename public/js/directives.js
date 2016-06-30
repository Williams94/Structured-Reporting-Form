'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
}]);

angular.module('myApp.directives', [])
    .directive('tooltip', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, newValue) {
                $(element).hover(function () {
                    // on mouseenter
                    $(element).tooltip('show')
                        .attr('data-original-title', newValue)
                        .tooltip('fixTitle');
                }, function () {
                    // on mouseleave
                    $(element).tooltip('hide')
                        .attr('data-original-title', newValue)
                        .tooltip('fixTitle');
                });
                $(element).click(function(){
                   $(element).tooltip('hide')
                       .attr('data-original-title', newValue)
                       .tooltip('fixTitle');
                });
            }
        };
    });
