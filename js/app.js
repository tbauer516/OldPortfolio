'use strict';

angular.module('Portfolio', ['ui.router', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })
        .state('edit', {
            url: '/edit',
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl'
        })
        .state('itemEdit', {
            url: '/edit/{id}',
            templateUrl: 'partials/itemEdit.html',
            controller: 'ItemEditCtrl'
        });

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/#');
}])

// parent controller that houses all the ui-views
// put all global functions and variables here to access them from
// the other ui-views
.controller('PortfolioCtrl', ['$scope', function($scope) {



}])

.controller('HomeCtrl', ['$scope', '$timeout', '$http', function($scope) {

    

}])

.controller('LoginCtrl', ['$scope', function($scope) {



}])

.controller('EditCtrl', ['$scope', function($scope) {

 

}])

.controller('ItemEditCtrl', ['$scope', function($scope) {



}])

.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});