var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies']);
//app controller
myApp.controller('AppCtrl', function ($scope, $http, $animate, $mdDialog, $mdToast, $window, $cookies) {

    // buscador
    $scope.materia = '';
    $scope.isDisabled = false;

    if ($cookies.getObject("usuario") === undefined) {
        $http.get('/api/model/users').then(function(response){
            $scope.user = response.data;
        });
        console.log($scope.user);
    } else {
        $scope.user = $cookies.getObject("usuario");
        $window.location.href = '/main';
    }
    //buscar materia
    $scope.buscar = function () {
        console.log($scope.materia);
        $scope.isDisabled = true;
        //buscar
    };

    // mostrar dialog de login
    $scope.showLogIn = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog.login.html',
            parent: angular.element(document.body),
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                user: $scope.user
            }
        })
            .then(function (logIn) {
                console.log("dialog close");
            }, function () {
                console.log('You cancelled the dialog.');
            });
    };
});


function DialogController($scope, $http, $cookies, $mdDialog, $mdToast, $window, user) {
    console.log("response");
    $scope.Google = function (answer) {
        $mdDialog.hide(answer);
    };
    $scope.registrar = function (answer) {
        //test de redirect
        $http.post('/api/users', user).
            then(function (response) {
                console.log(response);
                $cookies.putObject("usuario", user);
                $window.location.href = '/main';
            }, function (response) {
                console.log("error");
            });
    };
    $scope.LogIn = function (answer) {
        //Consulta en db de login
        $http.get('/api/users', {params: {nombre_usuario: user.nombre_usuario, pass: user.pass}}).
            then(function (response) {
                //resultado de consulta (consulta exitosa)
                console.log(response.data[0]);
                if(response.data[0]===undefined) {
                    //El usuario o contrasena incorrecto o no existe
                    //$mdToast no esta funcionando
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
                } else {
                    //inicio de sesion correcta
                    $cookies.putObject("usuario", response.data[0]);
                    $window.location.href = '/main';
                }
            }, function (response) {
                $mdDialog.cancel();
            });
    };
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}