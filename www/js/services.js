'use strict';

angular.module('KitApp.services', [])

.service('LoginService', ['$http', '$window', 'ContactService', function($http, $window, ContactService) {
  var vm = this;

  vm.message = 'login';

  vm.getContacts = ContactService.getContacts;

  vm.contacts;

  vm.login = function(username, password) {
    $http.post('http://localhost:3000/auth/login', {username: username, password: password})
    .then(function(response) {
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      $window.sessionStorage.id = response.data.id;
      //get contact list here:
      // vm.getContacts($window.sessionStorage.id)



    })
    .catch(function(err) {
      console.log(err);
      delete $window.sessionStorage.token;
    });
  };

  vm.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
  };
}])

.service('SignupService', function() {
  var vm = this;
  vm.message = 'hello';
})

.service('ContactService', ['$http', '$window', function($http, $window) {
  var sv = this;

  sv.contacts = {};

  //sv.getContacts = function(id) {
    var id = $window.sessionStorage.id;
     $http.get('http://localhost:3000/users/' + id + '/contacts')
    .then(function(response) {
      console.log('getContacts response: ', response.data);
      sv.contacts.arr = response.data;
      sv.contacts.length = response.data.length;
      // return response.data;
    })
    .catch(function(err) {
      console.log('getContacts ERR:', err);
    });
  //};

}])

.service('authInterceptor', ['$q', '$window', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function(response) {
      if(response.status === 400) {
        // handle the case where the user is not authenticated
        console.log(response);
      }
      return response || $q.when(response);
    }
  };
}]);
