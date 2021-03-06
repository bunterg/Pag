/*
*   INFO DIALOG LOGIN
* */
function DialogController($scope, $http, $cookies, $mdDialog, $mdToast, $window, user) {
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
myApp.controller('AppCtrl', function ($scope, $mdDialog, $window, $cookies, $http) {
    'use strict';
    $scope.isDisabled = false;
    $scope.user = {};
    //revisar usuario ya inicio sesi�n
    if ($cookies.getObject("usuario") !== undefined) {
        $window.location.href = '/main';
    }
    /*
    *   info busqueda de materias
    * */
    $scope.buscar = function () {
        $scope.isDisabled = true;
        $http.get('/api/materias?codigo=' + $scope.materiaB).then(function (response) {
            $window.location.href = '/materia#?id=' + response.data[0]._id;
        }, function (status, data) {
            console.log(status + "--" + data);
            $scope.isDisabled = false;
        });
    };

    /*
    * INFO mostrar dialog de login
    * */
    $scope.showLogIn = function (ev) {
        $mdDialog.show({
            controller         : DialogController,
            templateUrl        : 'dialog.login.html',
            parent             : angular.element(document.body),
            scope              : $scope,        // use parent scope in template
            preserveScope      : true,
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                user: $scope.user
            }
        })
            .then(function (logIn) {
                console.log(logIn);
                console.log("dialog close");
            }, function () {
                console.log('You cancelled the dialog.');
            });
    };
});