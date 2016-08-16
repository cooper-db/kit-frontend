'use strict';

angular.module('KitApp.services', [])

.service('LoginService', ['$http', '$window', function($http, $window) {
  var vm = this;
  vm.login = function(username, password) {
    $http.post('http://localhost:3000/auth/login', {username: username, password: password})
    .then(function(response) {
      $window.sessionStorage.token = response.data.token;
    })
    .catch(function(err) {
      console.log(err);
      delete $window.sessionStorage.token;
    });
  };
}])

.service('SignupService', function() {
  var vm = this;
  vm.message = 'hello';
});
