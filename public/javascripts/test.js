/**
 * Created by Bernardo on 9/27/2015.
 */
var myApp = angular.module('myApp', ['ngMaterial', 'ngCookies']);
myApp.controller('AppCtrl', function ($scope, $http, $animate, $mdDialog, $mdToast, $window, $cookies) {
    $cookies.materia = {
        nombre: Lenguaje,
        status: 3,
        creador: {
            nombre: 'Gaby',
            imagen: 'img/icons/account.svg'
        }

    };
    $cookies.status = ['bell','bell-off','bell-outline']
});