'use strict';

angular.module('KitApp.services', [])

.service('LoginService', ['$http', '$location', '$window', 'ContactService', function($http, $location, $window, ContactService) {
  var vm = this;

  if ($window.sessionStorage.token) {
    vm.loginView = {show:false};
  } else {
    vm.loginView = {show:true};
  }

  vm.getContacts = ContactService.getContacts;

  vm.contacts;

  vm.login = function(username, password) {
    $http.post('http://localhost:3000/auth/login', {username: username, password: password})
    .then(function(response) {
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      vm.loginView.show = false;
      $window.sessionStorage.id = response.data.id;
      $location.path('/tab/home');
    })
    .catch(function(err) {
      console.log(err);
      delete $window.sessionStorage.token;
      vm.loginView.show = true;
    });
  };

  vm.logout = function() {
    delete $window.sessionStorage.token;
    vm.loginView.show = true;
    delete $window.sessionStorage.id;
  };

}])

.service('SignupService', ['$http', '$location', '$window', function($http, $location, $window) {
  var vm = this;
  vm.signup = function(user) {
    $http.post('http://localhost:3000/auth/signup', {username: user.username, password: user.password})
    .then(function(response){
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      $window.sessionStorage.id = response.data.id;
      $location.path('/tab/home');
    })
    .catch(function(err) {
      console.log(err);
    });
  };
}])

.service('ContactService', ['$http', '$window', '$cordovaContacts', function($http, $window, $cordovaContacts) {
  var sv = this;

  sv.contacts = {};

  //sv.getContacts = function(id) {
  var id = $window.sessionStorage.id;
  $http.get('http://localhost:3000/users/' + id + '/contacts')
    .then(function(response) {
      console.log('getContacts response: ', response.data);
      sv.contacts.arr = response.data;
      sv.contacts.length = response.data.length;
      sv.contacts.getRandomContact = function(input) {
        input = this.arr;
        var randInt = Math.floor(Math.random() * (input.length - 1));
        // var lastContact = new Date(input[randInt].last_contact.substr(0,10)).getTime() / 1000;
        // var freq = input[randInt].frequency_of_contact * 86164;
        // var now = Date.now() / 1000;
        // console.log('Now: ' + now + ' Last: ' + lastContact + ' Freq: ' + freq);
        this.randomContact = input[randInt];
      };

      sv.contacts.getRandomContact();

      sv.contacts.updateLastContact = function() {
        this.randomContact.last_contact =  new Date();
        $http.put('http://localhost:3000/users/' + id + '/contacts/' + this.randomContact.id, this.randomContact)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
      };

    })
    .catch(function(err) {
      console.log('getContacts ERR:', err);
    });
  //};

  sv.addContact = function(name, phone, email, notes){
    var id = $window.sessionStorage.id;
    console.log(name, phone, email, notes);
    $http.post('http://localhost:3000/users/' + id + '/contacts', {name:name, phone:phone, email:email, notes:notes})
    .then(function(response){
      console.log('successfully posted a new contact');
      console.log(response.data);
    })
    .catch(function(err){
      console.log('posting new contact didn\'t work');
      console.log(err);
    });
  };

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
