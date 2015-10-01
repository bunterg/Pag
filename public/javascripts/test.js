/**
 * Created by Bernardo on 9/27/2015.
 */
var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies']);
myApp.controller('AppCtrl', function ($scope) {
    $scope.materias = [{
        nombre: 'Título de la materia',
        codigo: 'iTxuMF',
        meta: {
            background: 'gray'
        },
        status: {
            img: 'bell',
            hint: 'Hay actividades'
        },
        creador: {
            nombre: 'Nombre del creador',
            imagen: 'img/icons/account.svg'
        },
        ultimoPost: Date.now()
    }];
    $scope.select = function (materia) {
        console.log(materia);
    }

});