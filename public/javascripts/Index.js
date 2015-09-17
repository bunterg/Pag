var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('AppCtrl', function($scope, $http, $animate, $mdDialog, $mdToast, $window) {
      // buscador
      $scope.materia = '';
      $scope.isDisabled = false;
      
      // blank user .
      $scope.user = {
            userid: '',    
            name: '',
            email: '',    
            pass: '',
      };
      
      //buscar materia
      $scope.buscar = function() {
            console.log($scope.materia);
            $scope.isDisabled = true;
            //buscar
      };
      
      // creador de materias temporal
      $scope.crearMateria = function() {
            //redirect a crearMateria
            $window.location.href = '/creadorMateria';
            //$http.get('/creadorMateria');
                  /*.success(function(response) {$scope.names = response.records;});*/
      }
      // mostrar dialog de login
      $scope.showLogIn = function(ev) {
            $mdDialog.show({
                  controller: DialogController,
                  templateUrl: 'dialog.login.html',
                  parent: angular.element(document.body),
                  scope: $scope,        // use parent scope in template
                  preserveScope: true,
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  locals: {
                        user: $scope.user
                  }
            })
            .then(function(logIn) {
                  console.log("dialog close: "+logIn);
            }, function() {
                  console.log('You cancelled the dialog.');
            });
      };
});


function DialogController($scope, $http, $mdDialog, $mdToast,user) {
      console.log("response");
      $scope.Google = function(answer) {s
            $mdDialog.hide(answer);
      }
      $scope.registrar = function(answer) {
            //test de redirect          
            $http.post('/api/users', user).
                  then(function(response) {
                        console.log(response);
                  }, function(response) {
                        $mdToast.show(
                              $mdToast.simple()
                              .content('Error!')
                              .position({
                                    bottom: true,
                                    top: false,
                                    left: false,
                                    right: true
                              })
                              .hideDelay(3000)
                        );
                        console.log("error"+response);
                  });
            //$mdDialog.hide(answer);
      }
      $scope.LogIn = function(answer) {
            //test de redirect
            console.log(user);            
            $mdDialog.hide(answer);
      }
      $scope.hide = function() {
            $mdDialog.hide();
      };
      $scope.cancel = function() {
            $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
            $mdDialog.hide(answer);
      };
}