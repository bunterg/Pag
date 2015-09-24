/**
 * Created by Bernardo on 9/23/2015.
 */
var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies', 'ngResource']);
myApp.controller('AppCtrl', function ($scope, $http, $animate, $window, $cookies, $resource, $mdDialog) {
    //testeando scheme model
    var user = $resource('/api/model/users');
    if ($cookies.getObject("usuario") === undefined) {
        $scope.user = new user();
        console.log($scope.user);
    } else {
        $scope.user = $cookies.getObject("usuario");
    }
    $scope.buscador = false;
    $scope.tieneMaterias = !$scope.user.meta === undefined;

    //buscar materia
    $scope.buscar = function () {
        console.log($scope.materia);
        $scope.isDisabled = true;
        //buscar
    };

    $scope.mostarBuscador = function () {
        $scope.buscador = !$scope.buscador;
    };

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
        })
            .then(function (logIn) {
                console.log("dialog close");
            });
    };
});

function DialogController($scope, $http, $cookies, $mdDialog, $mdToast, $window, user) {
    $scope.materia = $cookies.get('materiaB');
    $scope.etiquetas = ['General'];
    $scope.etiquetasPersonalizadas = [];
    $scope.insertar = function($chip) {
        console.log("inserte: ",$chip);
        return $chip;
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