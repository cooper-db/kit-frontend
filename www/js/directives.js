'use strict';

angular.module('KitApp.directives', [])

.directive('kaLogin', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/login.html',
    controller: 'AccountController',
    controllerAs: 'AC'
  };
})

.directive('kaSignup', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/signup.html',
    controller: 'SignupConroller',
    controllerAs: 'SC'
  };
})

.directive('kaContactSuggestion', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/contact-suggestion.html'
  };
});
