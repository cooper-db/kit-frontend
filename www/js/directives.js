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
})

.directive('kaAddContact', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/create-contact.html',
    controller: 'AddContactController',
    controllerAs: 'ACC'
  };
})

.directive('compareTo', function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };
      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
})


.directive('passwordValidation', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(password) {
        console.log('password validation directive checking validity');
        if (password.match(/\W/g) && password.match(/\d/g)) {
            mCtrl.$setValidity('password', true);
        } else {
            mCtrl.$setValidity('password', false);
        }
        return password;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
