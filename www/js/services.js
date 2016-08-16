'use strict';

angular.module('KitApp.services', [])

.service('LoginService', ['$http', '$window', function($http, $window) {
  var vm = this;

  vm.showLogin = {show:true};

  vm.login = function(username, password) {
    $http.post('http://localhost:3000/auth/login', {username: username, password: password})
    .then(function(response) {
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      vm.showLogin.show = false;
    })
    .catch(function(err) {
      console.log(err);
      delete $window.sessionStorage.token;
      vm.showLogin.show = true;
    });
  };

  vm.logout = function() {
    delete $window.sessionStorage.token;
    vm.showLogin.show = true;
  };

}])

.service('SignupService', function() {
  var vm = this;
  vm.message = 'hello';
});
