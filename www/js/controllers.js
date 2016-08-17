'use strict';

angular.module('KitApp.controllers', [])

.controller('HomeController', ['LoginService', 'ContactService', function(LoginService, ContactService) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.contacts = ContactService.contacts;

}])

.controller('AccountController', ['LoginService', 'SignupService', '$location', '$window', function(LoginService, SignupService, $location, $window) {

  var vm = this;

  vm.loginView = LoginService.loginView;

  vm.login = function(username, password) {
    LoginService.login(username, password);
  };

  vm.logout = function() {
    LoginService.logout();
  };

  vm.signup = function(user) {
    SignupService.signup(user);
    vm.loginView.show = false;
  };

}])

.controller('ContactController', ['ContactService', '$cordovaContacts', '$window', function(ContactService, $cordovaContacts, $window ) {
  var vm = this;

  vm.contacts = ContactService.contacts;


  vm.message = ContactService.message;



  vm.showAddContactForm = false;
  var isIOS = ionic.Platform.isIOS();
  //Works
  vm.getContacts = function() {
    $cordovaContacts.pickContact()
     .then(function(result) {
       var id = $window.sessionStorage.id;
       if(isIOS == true){
        //  alert(Object.keys(result));
        //  alert(result.name.givenName);
        //  alert(result.name.familyName);
        //  alert(result.name.formatted); // USE THIS FOR SIMPLICITY
        // //  alert(Object.keys(result.phoneNumbers)); //This is an array // [object, Object]
        // //  alert(JSON.stringify(result.phoneNumbers[0])); //This is an array // [object, Object]
        //  alert(result.phoneNumbers[0].value); // PHONE NUMBER!!
        // //  alert(result.phoneNumbers[0].type); //PHONE NUMBER TYPE
        //  alert(JSON.stringify(result.email));
        //  alert(Object.keys(result));

         ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
         console.log("After addContact");
         ContactService.getContacts(id);
         alert("Added Contact")
       } else {
         // result // this is an object
        //   alert(Object.keys(result));
        //  //  alert(result.id); //This is number
        //   // alert(result.displayName); //This is text // N/A in IOS
        //   // alert(result.name.familyName);
        //   // alert(result.givenName);
        //   alert(result.name.formatted); //USE FOR SIMPlICITY
        //   // // alert(Object.keys(result.name));
        //   // alert(JSON.stringify(result.phoneNumbers[0])); //This is an array // [object, Object]
        //   alert(result.phoneNumbers[0].value); // PHONE NUMBER!!
          // alert(result.phoneNumbers[0].type); //PHONE NUMBER TYPE

          ContactService.addContact(result.name.formatted, result.phoneNumbers[0].value);
          ContactService.getContacts(id);
          alert("Added Contact");

       }

       console.log("Inside cordovaContacts");

     });
   };


  // vm.contacts.arr[i].showForm = false;



  // vm.showForm = false;
  //
  // vm.showInfo = function() {
  //   if(!vm.showForm) {
  //     vm.showForm = true;
  //   } else {
  //     vm.showForm = false;
  //   }
  // }

}])

.controller('AddContactController', ['ContactService', '$cordovaContacts', '$window', function(ContactService, $cordovaContacts, $window ) {
  var vm = this;
  //vm.addContact = ContactService.addContact;
  vm.addContact = function(name, phone, email, relationship, freq, notes){
    var id = $window.sessionStorage.id;
    console.log('wat the hell');
    ContactService.addContact(name, phone, email, relationship, freq, notes);
    ContactService.getContacts(id);
  };

  vm.setPristine = function(){
    console.log('setting pristine');
    vm.createContactForm.$setPristine();
  };

}]);
