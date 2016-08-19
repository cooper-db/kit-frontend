'use strict';

angular.module('KitApp.services', [])

//-----------------------------------------------------------------------------
// IF YOU NEED TO CHANGE THE DATABASE YOU'RE HITTING, DO IT HERE.

//commment IN to hit LIVE HEROKU HOSTED DATABASE!
//p.s. - you'll need to comment out the constant BELOW this one too!
.constant("routeToAPI", {
        "url": "https://keep-intouch.herokuapp.com",
    })

// //comment IN to hit LOCALLY HOSTED DATABASE!
// //p.s. - you'll need to comment out the constant ABOVE this one too!
// .constant("routeToAPI", {
//         "url": "http://localhost:3000",
//     })
//-----------------------------------------------------------------------------

.service('LoginService', ['$http', '$location', '$window', 'ContactService', 'routeToAPI', function($http, $location, $window, ContactService, routeToAPI) {
  var vm = this;
  vm.errors = {};
  if ($window.sessionStorage.token) {
    vm.loginView = {show:false};
  } else {
    vm.loginView = {show:true};
  }

  vm.getContacts = ContactService.getContacts;

  vm.contacts;

  vm.login = function(username, password) {
    $http.post(routeToAPI.url + '/auth/login', {username: username, password: password})
    .then(function(response) {
      console.log(response);

      vm.loginForm = {}; 

      $window.sessionStorage.token = response.data.token;
      vm.loginView.show = false;
      $window.sessionStorage.id = response.data.id;
      ContactService.getContacts();
      $location.path('/tab/home');
    })
    .catch(function(err) {
      console.log(err);
      delete $window.sessionStorage.token;
      vm.loginView.show = true;
      vm.errors.message = err;
    });
  };

  vm.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.id;
    vm.loginView.show = true;
  };

}])

.service('SignupService', ['$http', '$location', '$window', '$ionicHistory', 'routeToAPI', function($http, $location, $window, $ionicHistory, routeToAPI) {
  var vm = this;
  vm.errors =[];
  vm.signup = function(user) {
    $http.post(routeToAPI.url + '/auth/signup', {username: user.username, password: user.password})
    .then(function(response){
      $window.sessionStorage.token = response.data.token;
      $window.sessionStorage.id = response.data.id;
      $ionicHistory.goBack();
      $location.path('/tab/contacts');
    })
    .catch(function(err) {
      console.log(err.data.message);
      if (err.data.message === 'Sorry, but that username already exists!') {
        console.log('caught username error');
        vm.errors.push(err.data.message);
        console.log(vm.errors);
      } else {
        for (var i = 0; i < err.data.length; i++){
          vm.errors.push(err.data[i].message);
          console.log(err.data[i].message);
        }
      }

    });
  };

  vm.resetResponse = {};

  vm.resetPassword = function(newPassword) {
    $http.post(routeToAPI.url + '/users/reset', {newPassword: newPassword})
    .then(function(response) {
      vm.resetResponse.success = response.data.message;
    })
    .catch(function(err) {
      vm.resetResponse.error = err.data.message;
    });
  };

}])

.service('ContactService', ['$http', '$state', '$ionicPopup', '$window', '$cordovaContacts', 'routeToAPI', '$location', function($http, $state, $ionicPopup, $window, $cordovaContacts, routeToAPI, $location) {
  var sv = this;

  sv.contacts = {};
  sv.addContactForm =   {};
  sv.possibleSuggestions = [];

  sv.editContact = function(name, phone, email, relationship, freq, notes, last_contact, contactId) {
    var id = $window.sessionStorage.id;
    console.log(name, phone, email, relationship, freq, notes, last_contact);

    $http.put(routeToAPI.url + '/users/' + id + '/contacts/' + contactId, {name:name, phone:phone, email:email, relationship:relationship, frequency_of_contact:freq, notes:notes, last_contact:last_contact})
    .then(function(response) {
      console.log('edit contact reponse: ', response);
      sv.getContacts(id);
      $location.path('/tab/contacts');
    })
    .catch(function(err) {
      console.log('edit contact err: ', err);
    });
  };

  sv.deleteContact = function(contactId) {
    var id = $window.sessionStorage.id;
    // var contactId = this.id;
    //remove contact from sv.contacts.arr
    // sv.contacts.arr.splice(sv.contacts.arr.indexOf(thisContact));
    $http.delete(routeToAPI.url + '/users/' + id + '/contacts/' + contactId)
    .then(function(response) {
      console.log('DELETE CONTACT RESPONSE: ', response);
      sv.getContacts(id);
      $location.path('/tab/contacts');
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  sv.getContacts = function(id) {
    // sv.contacts.arr.length = 0;

    id = $window.sessionStorage.id;
    $http.get(routeToAPI.url + '/users/' + id + '/contacts')
      .then(function(response) {

        console.log('getContacts response: ', response.data);

        sv.contacts.arr = response.data;

        sv.contacts.length = response.data.length;

        for (var i = 0; i < sv.contacts.arr.length; i++) {
          // console.log(sv.contacts.arr[i]);

          sv.contacts.arr[i].showForm = false;
          sv.contacts.arr[i].showFormFunc = function() {
            if(this.showForm === true) {
              this.showForm = false;
            } else if(this.showForm === false) {
              this.showForm = true;
            }
          };

          // sv.contacts.arr[i].deleteContact = function() {
          //   var thisContact = this;
          //   var contactId = this.id;
          //   //remove contact from sv.contacts.arr
          //   sv.contacts.arr.splice(sv.contacts.arr.indexOf(thisContact));
          //   $http.delete('http://localhost:3000/users/' + id + '/contacts/' + contactId)
          //   .then(function(response) {
          //     console.log(thisContact);
          //     console.log(response);
          //   })
          //   .catch(function(err) {
          //     console.log(err);
          //   });
          // };

          // sv.contacts.arr[i].editContact = function(name, phone, email, relationship, freq, notes) {
          //   var id = $window.sessionStorage.id;
          //   var contactId = this.id;
          //
          //   console.log(name, phone, email, relationship, freq, notes);
          //   $http.put(routeToAPI.url + '/users/' + id + '/contacts/' + contactId, {name:name, phone:phone, email:email, relationship:relationship, frequency_of_contact:freq, notes:notes})
          //   .then(function(response) {
          //     console.log('edit contact reponse: ', response);
          //
          //   })
          //   .catch(function(err) {
          //     console.log('edit contact err: ', err);
          //   });
          // };

          //editContact function shows the form
            sv.contacts.arr[i].showEditForm = false;
            sv.contacts.arr[i].showEditFormFunc = function() {
              if(this.showEditForm === true) {
                this.showEditForm = false;
                // this.showForm = true;
              } else {
                // this.showForm = false;
                this.showEditForm = true;
              }
            };

            //display up / down arrow depending on if information is displayed
            sv.contacts.arr[i].showArrowUp = false;
            sv.contacts.arr[i].showArrow = true;

            sv.contacts.arr[i].showArrowFunc = function() {
              if(this.showArrow === true) {
                this.showArrow = false;
                this.showArrowUp = true;
              } else {
                this.showArrow = true;
                this.showArrowUp = false;
              }
          };

        }

        sv.contacts.getRandomContact = function() {
          $state.reload();

          sv.possibleSuggestions.length = 0;
          var allContacts = this.arr;
          var currentDate = new Date();

          for (var i = 0; i < allContacts.length; i++) {
              var last = new Date(allContacts[i].last_contact);
              var freq = allContacts[i].frequency_of_contact;
              var modifier = last.getDate() + freq;
              var next = last.setDate(modifier);
              if (next < currentDate) {
                  sv.possibleSuggestions.push(allContacts[i]);
              }
          }
          if (sv.possibleSuggestions.length > 0) {
              var randInt = Math.floor(Math.random() * (sv.possibleSuggestions.length));
              this.randomContact = sv.possibleSuggestions[randInt];
          }
          sv.possibleSuggestions.current = !sv.possibleSuggestions.length;
        };

        sv.contacts.getRandomContact();

        sv.contacts.updateLastContact = function() {
          this.randomContact.last_contact =  new Date();
          $http.put(routeToAPI.url + '/users/' + id + '/contacts/' + this.randomContact.id, this.randomContact)
          .then(function() {
              $state.reload();
              sv.contacts.getRandomContact();
              sv.possibleSuggestions.current = !sv.possibleSuggestions.length;
            sv.contacts.showAlert();
          })
          .catch(function(err) {
            console.log(err);
          });
        };

        sv.contacts.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Nice!',
            template: 'Feel free to stop for the day, or keep going!'
          });
          alertPopup.then(function(res) {
            console.log('Show Alert is: ', res);
          });
        };
      })
      .catch(function(err) {
        console.log('getContacts ERR:', err);
      });

  };


  sv.addContact = function(name, phone, email, relationship, freq, notes){
    var id = $window.sessionStorage.id;
    console.log(name, phone, email, relationship, freq, notes);
    $http.post(routeToAPI.url + '/users/' + id + '/contacts', {name:name, phone:phone, email:email, relationship:relationship, frequency_of_contact:freq || 90, notes:notes})
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
