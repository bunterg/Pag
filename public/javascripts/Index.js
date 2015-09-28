var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies']);
myApp.controller('AppCtrl', function ($scope, $http, $animate, $mdDialog, $mdToast, $window, $cookies) {

    $scope.isDisabled = false;

    //revisar usuario ya inicio sesión
    if ($cookies.getObject("usuario") === undefined)
        $scope.user = {};
    else
        $window.location.href = '/main';

    //buscar materia
    //TODO AGREGAR BUSQUEDA
    $scope.buscar = function () {
        //$scope.isDisabled = true;
        $cookies.put('materiaBuscar',$scope.materia);
        //codigo o nombre?
        //$window.location.href = '/main/buscar?nombre='+$scope.materia;
        //$window.location.href = '/main/buscar?short_id='+$scope.materia;
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
    $scope.registrar = function () {
        //REGISTRO DE USUARIO
        $http.post('/api/users', user).
            then(function (response) {
                $cookies.putObject("usuario", response.data[0]);
                $window.location.href = '/main';
            }, function (response) {
                console.log("error");
            });
    };
    $scope.LogIn = function () {
        //Consulta en db de login
        $http.get('/api/users', {params: {nombre_usuario: user.nombre_usuario, pass: user.pass}}).
            then(function (response) {
                if(response.data[0]===undefined) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Datos de conexión invalidos!')
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
}