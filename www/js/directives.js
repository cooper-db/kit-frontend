'use strict';

angular.module('KitApp.directives', [])

.directive('kaLogin', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/login.html',
    controller: 'LoginController',
    controllerAs: 'LC'
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
})
.directive('kaAddContact', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/create-contact.html',
    controller: 'AddContactController',
    controllerAs: 'ACC'
  };
});
