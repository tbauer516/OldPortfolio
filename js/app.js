'use strict';

angular.module('Portfolio', ['ui.router', 'ui.bootstrap', 'angulartics', 'angulartics.google.analytics', 'smoothScroll'])

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

    var height = window.innerHeight;
    console.log(height);
    var sections = document.querySelectorAll('.section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.minHeight = (height - 50) + 'px';
        console.log(sections[i].style.minHeight);
    }

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
})

.directive('scrollSpy', function ($window) {
  return {
    restrict: 'A',
    controller: function ($scope) {
      $scope.spies = [];
      this.addSpy = function (spyObj) {
        $scope.spies.push(spyObj);
      };
    },
    link: function (scope, elem, attrs) {
      var spyElems;
      spyElems = [];

      scope.$watch('spies', function (spies) {
        var spy, _i, _len, _results;
        _results = [];

        for (_i = 0, _len = spies.length; _i < _len; _i++) {
          spy = spies[_i];

          if (spyElems[spy.id] == null) {
            _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
          }
        }
        return _results;
      });

      $($window).scroll(function () {
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;

        // cycle through `spy` elements to find which to highlight
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();

          // catch case where a `spy` does not have an associated `id` anchor
          if (spyElems[spy.id].offset() === undefined) {
            continue;
          }

          if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0) {
            // the window has been scrolled past the top of a spy element
            spy.pos = pos;

            if (highlightSpy == null) {
              highlightSpy = spy;
            }
            if (highlightSpy.pos < spy.pos) {
              highlightSpy = spy;
            }
          }
        }

        // select the last `spy` if the scrollbar is at the bottom of the page
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
          spy.pos = pos;
          highlightSpy = spy;
        }        

        return highlightSpy != null ? highlightSpy["in"]() : void 0;
      });
    }
  };
})

.directive('spy', function ($location, $anchorScroll) {
  return {
    restrict: "A",
    require: "^scrollSpy",
    link: function(scope, elem, attrs, affix) {
      elem.click(function () {
        $location.hash(attrs.spy);
        $anchorScroll();
      });

      affix.addSpy({
        id: attrs.spy,
        in: function() {
          elem.addClass('active');
        },
        out: function() {
          elem.removeClass('active');
        }
      });
    }
  };
});