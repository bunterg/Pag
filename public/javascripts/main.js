/**
 * Created by Bernardo on 9/23/2015.
 */
//fixme put user cambio schema akjshdlkajlks
// <editor-fold desc="Dialogos">
/*
 *   INFO DIALOGO CREADOR MATERIAS
 * */
function DialogController($scope, $cookies, $mdDialog, $http, $window, user) {
    'use strict';
    $scope.materiac = {
        etiquetas : ['General']
    };
    $scope.etiquetasPersonalizadas = [];
    /*
     * info insercion de chip personalizados (permite agregar data
     * */
    $scope.insertar = function ($chip) {
        console.log("inserte: ", $chip);
        return $chip;
    };
    /*
     * info actualizar Usuario
     * */
    var actualizar = function (materia) {
        user.materias = user.materias.concat(materia._id);
        $http.put('/api/users/' + user._id, user).then(
            function (response) {
                $cookies.putObject("usuario", response.data._id);
                $http.put('/api/materias/' + materia._id, materia).then(
                    function (response) {
                        console.log(response);
                        $window.location.reload();
                    },
                    function (data, status) {
                        console.error('put materia error', status, data);
                    }
                );
            },
            function (data, status) {
                console.error('put user error', status, data);
            }
        );
    };
    /*
     * info crear materia
     * */
    $scope.crearMateria = function () {
        var materia = $scope.materiac;
        materia.etiquetas =  $scope.materiac.etiquetas.concat($scope.etiquetasPersonalizadas);
        materia.creador = {_id: user._id, nombre: user.nombre, correo: user.correo};

        $http.post('/api/materias', materia).then(function (response) {
            materia = response.data;
            actualizar(materia);
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
 *  INFO DIALOGO INICIO SESIÓN + REGISTRO NO SE USA POR AHORA
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
                            .content('Datos de conexión invalidos!')
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
    //info variables locales
    var userID, user, init, getUser;
    //<editor-fold desc="METODOS INICIALES DE LA PAGINA">
    /*
    * info Metodo getter USER ID
    * */
    init = function (next) {
        if ($location.search() === undefined) {
            $scope.materiaB = '';
        } else {
            $scope.materiaB = $location.search().buscar;
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
    $scope.select = function (materia) {
        console.log(materia);
        $window.location.href = '/materia#?id=' + materia._id;
    };
    /*
        INFO METODOS BASICOS
     */
    $scope.salir = function () {
        $cookies.remove('usuario');
        $window.location.href = '/';
    };
    // fixme BUSCAR MATERIA
    $scope.buscar = function () {
        $scope.isDisabled = true;
        $cookies.put('materiaBuscar', $scope.materiaB);
        //codigo o nombre?
        //$window.location.href = '/main/buscar?nombre='+$scope.materia;
        //$window.location.href = '/main/buscar?short_id='+$scope.materia;
    };
    // mostrar creador de materias
    $scope.crearMateria = function (ev) {
        $mdDialog.show({
            controller         : DialogController,
            templateUrl        : 'dialog.materia.html',
            parent             : angular.element(document.body),
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                user: user
            }
        }).then(
            function () {
                console.log("dialog close");
            },
            function () {
                console.log('You cancelled the dialog.');
            }
        );
    };
    // mostrar dialog de login
    $scope.showLogIn = function (ev) {
        $mdDialog.show({
            controller         : DialogControllerLogin,
            templateUrl        : 'dialog.login.html',
            parent             : angular.element(document.body),
            scope              : $scope,        // use parent scope in template
            preserveScope      : true,
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                user    : $scope.user,
                noInicio: $scope.noInicio
            }
        }).then(
            function (logIn) {
                console.log(logIn);
                console.log("dialog close");
            },
            function () {
                console.log('You cancelled the dialog.');
            }
        );
    };
});