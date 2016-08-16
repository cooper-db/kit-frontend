'use strict';

angular.module('KitApp.directives', [])

.directive('kaLogin', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/login.html'
  };
})

.directive('kaSignup', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/signup.html'
  };
})

.directive('kaContactSuggestion', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/contact-suggestion.html'
  };
});
