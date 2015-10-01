/**
 * Created by Bernardo on 9/23/2015.
 */
var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies']);
myApp.controller('AppCtrl', function ($scope, $http, $animate, $window, $cookies, $mdDialog) {
    $scope.materiaB = '';
    //revisar si el usuario ya inicio sesion
    if ($cookies.getObject("usuario") === undefined) {
        $scope.user = {nombre: ''};
        $scope.noInicio = true;
    }
    else {
        $scope.user = $cookies.getObject("usuario");
        $scope.noInicio = false;
    }
    // Mostrar que el usuario debe agregar o buscar materia TODO CORREGIR
    $scope.tieneMaterias = false;
    if($scope.user.meta !== undefined)
        if($scope.user.meta.materias !== undefined)
            $scope.tieneMaterias = true;
    //cerrar sesión
    $scope.salir = function () {
        $cookies.remove('usuario');
        $window.location.href = '/';
    };
    //buscar materia TODO
    $scope.buscar = function () {
        console.log($scope.materia);
        $scope.isDisabled = true;
        //codigo o nombre?
        //$window.location.href = '/main/buscar?nombre='+$scope.materia;
        //$window.location.href = '/main/buscar?short_id='+$scope.materia;
    };
    // mostrar creador de materias
    $scope.crearMateria = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog.materia.html',
            parent: angular.element(document.body),
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                user: $scope.user
            }
        }) .then(function (logIn) {
            console.log("dialog close");
        }, function () {
            console.log('You cancelled the dialog.');
        });
    };
    // mostrar dialog de login
    $scope.showLogIn = function (ev) {
        $mdDialog.show({
            controller: DialogControllerLogin,
            templateUrl: 'dialog.login.html',
            parent: angular.element(document.body),
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                user: $scope.user,
                noInicio: $scope.noInicio
    }
        })
            .then(function (logIn) {
                console.log("dialog close");
            }, function () {
                console.log('You cancelled the dialog.');
            });
    };
    //TEST
    /*$scope.test = function () {
        if($scope.user.meta === undefined)
            $scope.user.meta = {};
        $scope.user.meta.like = 2;
        $http.put('/api/users/'+$scope.user._id, $scope.user).then(
            function(response) {
                console.log(response.data);
            }, function (response){
                console.log(response.data);
            }
        );
    };*/
});
//DIALOGO CREADOR MATERIAS
function DialogController($scope, $cookies, $mdDialog, $http, $window) {
    $scope.materia = {
        etiquetas : ['General']
    };
    $scope.etiquetasPersonalizadas = [];
    //insercion de chip personalizados (permite agregar data
    $scope.insertar = function($chip) {
        console.log("inserte: ",$chip);
        return $chip;
    };
    //actualizar Usuario
    var actualizar = function () {
        $scope.user.materias = $scope.user.materias.concat($scope.materia._id);
        $http.put('/api/users/' + $scope.user._id, $scope.user).then(
            function (response) {
                console.log(response.data);
                $cookies.putObject("usuario", response.data);
                $http.put('/api/materias/' + $scope.materia._id, $scope.materia).then(
                    function (response) {
                        $window.location.reload();
                    }, function (response) {
                        console.log(response.data);
                    }
                );
            }, function (response) {
                console.log(response.data);
            }
        );
    };
    //intsertar materia
    $scope.crearMateria = function () {
        $scope.materia.etiquetas =  $scope.materia.etiquetas.concat($scope.etiquetasPersonalizadas);
        $scope.materia.creador = $scope.user._id;
        console.log($scope.materia);
        $http.post('/api/materias', $scope.materia).
            then(function (response) {
                console.log(response.data);
                $cookies.putObject("materia", response.data);
                $scope.materia = response.data;
                actualizar();
            }, function (response) {
                console.log(response);
            });
    };
    //metodos de  mdDialog
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}
// DIALOGO INICIO SESIÓN + REGISTRO NO SE USA POR AHORA
function DialogControllerLogin($scope, $http, $cookies, $mdDialog, $mdToast, $window, user, noInicio) {
    $scope.registrar = function () {
        console.log(user);

        //REGISTRO DE USUARIO
        $http.post('/api/users', user).
            then(function (response) {
                $cookies.putObject("usuario", response.data);
                $window.location.reload();
            }, function (response) {
                console.log("error",response);
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
                    $mdDialog.hide();
                    $window.location.reload();
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