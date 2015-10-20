/**
 * Created by Bernardo on 10/3/2015.
 */
// <editor-fold desc="Dialogos">
/*
 *   INFO DIALOGO CREADOR MATERIAS
 * */
function DialogController($scope, $mdDialog, $http, $window, user, etiquetas, id) {
    'use strict';
    $scope.etiquetas = etiquetas;
    $scope.post = {
        creador: user._id,
        materia: id
    };
    /*
     * info crear materia
     * */
    $scope.crearPost = function () {
        $http.post('/api/posts', $scope.post).then(function (response) {
            console.log(response);
            $window.location.reload();
        }, function (data, status) {
            console.error('put user error', status, data);
        });
    };
    //<editor-fold desc="METODOS BASICOS DE $mdDialog">
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    //</editor-fold>
}
/*
 *  INFO DIALOGO INICIO SESI�N + REGISTRO NO SE USA POR AHORA
 * */
function DialogControllerLogin($scope, $http, $cookies, $mdDialog, $mdToast, $window, user) {
    'use strict';
    /*
     *   INFO REGISTRO DE USUARIO
     * */
    $scope.registrar = function () {
        $http.post('/api/users', user).
            then(function (response) {
                $cookies.putObject("usuario", response.data._id);
                $window.location.reload();
            }, function (response) {
                console.log("error", response);
            });
    };
    /*
     *   INFO INICIO DE SESION
     * */
    $scope.LogIn = function () {
        //Consulta en db de login
        $http.get('/api/users', {params: {nombre_usuario: user.nombre_usuario, pass: user.pass}}).
            then(function (response) {
                if (response.data[0] === undefined) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Datos de conexi�n invalidos!')
                    );
                } else {
                    //inicio de sesion correcta
                    $cookies.putObject("usuario", response.data[0]._id);
                    $mdDialog.hide();
                    $window.location.reload();
                }
            }, function (response) {
                console.log(response);
                $mdDialog.cancel();
            });
    };
    //<editor-fold desc="METODOS BASICOS DE $mdDialog">
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    //</editor-fold>
}
// </editor-fold>

myApp.controller('AppCtrl', function ($scope, $http, $window, $cookies, $mdDialog, $location) {
    'use strict';
    $scope.materiaB = '';
    $scope.materia = {};
    //info variables locales
    var userID, user, init, getUser, materiaB;
    //<editor-fold desc="METODOS INICIALES DE LA PAGINA">
    /*
     * info Metodo getter USER ID
     * */
    init = function (next) {
        if ($location.search() === undefined) {
            $window.location.href = '/main';
        } else {
            materiaB = $location.search().id;
            $http.get('/api/materias/' + materiaB + '?populate=posts').
                then(function (response) {
                    if (response.data === undefined) {
                        console.log(response);
                    } else {
                        $scope.hayPosts = response.data.posts.length !== 0;
                        $scope.materia = response.data;
                        console.log($scope.materia.posts);
                    }
                }, function (response) {
                    console.log(response);
                    $mdDialog.cancel();
                });
        }
        userID = $cookies.getObject("usuario");
        next();
    };
    /*
     * info Metodo set User
     * */
    getUser = function () {
        if (userID === undefined) {
            $scope.user = {nombre: ''};
            $scope.noInicio = true;
        } else {
            $http.get('/api/users/' + userID + '?populate=materias').then(function (response) {
                user = response.data;
                if (user.materias !== undefined) {
                    $scope.tieneMaterias = user.materias.length > 0;
                } else {
                    $scope.tieneMaterias = false;
                }
                $scope.user = user;
            }, function (data, status) {
                console.error('Repos error', status, data);
            });
        }
    };
    //</editor-fold>

    //info iniciando pag
    init(getUser);
    // <editor-fold desc="METODOS BASICOS">
    //cerrar sesi�n
    $scope.salir = function () {
        $cookies.remove('usuario');
        $window.location.href = '/';
    };
    //fixme buscar materia
    $scope.buscar = function () {
        $scope.isDisabled = true;
        $cookies.put('materiaBuscar', $scope.materiaB);
        //codigo o nombre?
        //$window.location.href = '/main/buscar?nombre='+$scope.materia;
        //$window.location.href = '/main/buscar?short_id='+$scope.materia;
    };
    // mostrar creador de materias
    $scope.crearPost = function (ev) {
        $mdDialog.show({
            controller         : DialogController,
            templateUrl        : 'dialog.post.html',
            parent             : angular.element(document.body),
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                user: user,
                id: $scope.materia._id,
                etiquetas: $scope.materia.etiquetas
            }
        }).then(function () {
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
        }).then(function (logIn) {
            console.log(logIn);
            console.log("dialog close");
        }, function () {
            console.log('You cancelled the dialog.');
        });
    };
    // </editor-fold>
});