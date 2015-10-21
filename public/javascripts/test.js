/**
 * Created by Bernardo on 9/27/2015.
 */
myApp.controller('AppCtrl', function ($scope, $location, $window, $http, $cookies, $mdSidenav, $log) {
    'use strict';
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
    };
    $scope.items = [{
        icon: 'bell',
        name: 'Hay actividades'
    }, {
        icon: 'bell-off',
        name: 'Actividades Suspendidas'
    }, {
        icon: 'bell-outline',
        name: 'No hay Actividades'
    }, {
        icon: 'bell-ring',
        name: 'Entrega de actividades'
    }];
    //info variables locales
    var userID, user, init, getUser;
    //<editor-fold desc="METODOS INICIALES DE LA PAGINA">
    /*
     * info Metodo getter USER ID
     * */
    init = function (next) {
        if ($location.search() === undefined) {
            $window.location.href = '/main';
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

    $scope.listItemClick = function (index) {
        console.log(index);
    };
    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
    $scope.toggleRight = buildToggler('left');
});