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
        creador: {
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo
        },
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
*   info dialog de edicion de materia
* */
function DialogControllerMateria($scope, $http, $mdDialog, $window, materia) {
    'use strict';
    $scope.materia = materia;
    $scope.nuevasEtiquetas = [];
    /*
    *   info obtener iconos
    * */
    $http.get('/api/statusIcon').then(function (response) {
        if (response.data === undefined) {
            console.log(response);
        } else {
            $scope.items = response.data;
        }
    }, function (data, status) {
        console.log('eror: ' + status + ' --: ' + data);
    });
    /*
    * info seleccion de nuevo status para la materia
    * */
    $scope.listItemClick = function (index) {
        delete $scope.materia.status;
        $scope.materia.status = index;
    };
    /*
    *   info guardar cambios en materia
    * */
    $scope.editMateria = function () {
        $scope.materia.etiquetas = $scope.materia.etiquetas.concat($scope.nuevasEtiquetas);
        $http.put('/api/materias/' + $scope.materia._id, $scope.materia).then(function (res) {
            $window.location.reload();
        }, function (data, status) {
            console.log('eror: ' + status + ' --: ' + data);
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
*   info DIALOGO CREAR EVENTO
* */
function DialogControllerEvento($scope, $http, $mdDialog, $window, materia) {
    'use strict';
    $scope.evento = {};
    $scope.crearEvento = function () {
        console.log($scope.evento);
        if (materia.evento === undefined) {
            materia.evento = [$scope.evento];
        } else {
            materia.evento = materia.evento.concat($scope.evento);
        }
        console.log(materia);
        $http.put('/api/materias/' + materia._id, materia).then(function () {
            $window.location.reload();
        }, function (data, status) {
            console.log('error:' + status + ' --data: ' + data);
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
    $scope.materiaB = '';
    $scope.materia = {};
    $scope.esProfesor = false;
    $scope.hayFiltro = false;
    //info variables locales
    var init, getUser,
        userID, user,
        materiaB, colores = ['gray', 'green', 'yellow', 'blue', 'darkBlue', 'deepBlue', 'purple', 'lightPurple', 'red', 'pink'],
        Etiqueta = '', busqueda = false;
    $scope.color = function (id) {
        return colores[id];
    };
    $scope.filtrado = function (post) {
        if (!busqueda) {
            if (Etiqueta !== '') {
                return post.etiqueta === Etiqueta;
            }
            return true;
        }
        return post.titulo.indexOf($scope.materiaB) >= 0;
    };
    /*
    *   info metodo para setear variable filtro
    * */
    $scope.listItemClick = function (id) {
        $scope.hayFiltro = id !== -1;
        if ($scope.hayFiltro) {
            Etiqueta = colores[id];
        } else {
            Etiqueta = '';
        }
    };
    //<editor-fold desc="METODOS INICIALES DE LA PAGINA">
    /*
     * info Metodo getter USER ID
     * */
    init = function (next) {
        if ($location.search() === undefined) {
            $window.location.href = '/';
        } else {
            materiaB = $location.search().id;
            $http.get('/api/materias/' + materiaB + '?populate=posts').
                then(function (response) {
                    if (response.data === undefined) {
                        console.log(response);
                    } else {
                        $scope.materia = response.data;
                        $scope.hayPosts = response.data.posts.length !== 0;
                        $scope.hayEventos = response.data.evento.length !== 0;
                    }
                }, function (response) {
                    console.log(response);
                    $mdDialog.cancel();
                });
        }
        userID = $cookies.getObject("usuario");
        next();
    };
    function revisarMaterias(materias, id) {
        var i, m;
        console.log(materias);
        for (i = 0; i < materias.length; i++) {
            m = materias[i];
            console.log(m);
            if (m._id === id) {
                return true;
            }
        }
        return false;
    }
    /*
     * info Metodo set User
     * */
    getUser = function () {
        if (userID === undefined) {
            $scope.user = {nombre: ''};
            $scope.noInicio = true;
        } else {
            $http.get('/api/users/' + userID).then(function (response) {
                user = response.data;
                console.log($scope.materia.creador);
                $scope.esProfesor = user._id === $scope.materia.creador._id;
                $scope.tieneEstaMateria = $scope.esProfesor || revisarMaterias(user.materias, $scope.materia._id);
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
    // info cerrar sesión
    $scope.salir = function () {
        $cookies.remove('usuario');
        $window.location.href = '/';
    };
    /*
    *   info agregar materia a usarios
    * */
    $scope.agregarMateria = function () {
        console.log('agregando materio');
        user.materias = user.materias.concat($scope.materia._id);
        $http.put('/api/users/' + user._id, user).then(
            function (response) {
                $cookies.putObject("usuario", response.data._id);
            },
            function (data, status) {
                console.error('put user error', status, data);
            }
        );
    };
    /*
    *   info redirect a post
    * */
    $scope.select = function (id) {
        $window.location.href = '/post#?id=' + id;
    };
    /*
     *   info busqueda post
     * */
    $scope.buscar = function () {
        busqueda = true;
    };
    //mostrar dialog crear evento
    $scope.crearEvento = function (ev) {
        $mdDialog.show({
            controller         : DialogControllerEvento,
            templateUrl        : 'dialog.evento.html',
            parent             : angular.element(document.body),
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                materia: $scope.materia
            }
        }).then(function () {
            console.log("dialog close");
        }, function () {
            console.log('You cancelled the dialog.');
        });
    };
    // mostrar creador de Posts
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
    // mostrar editar materia
    $scope.editarMateria = function (ev) {
        console.log('hola mundo');
        $mdDialog.show({
            controller         : DialogControllerMateria,
            templateUrl        : 'dialog.materiaEdit.html',
            parent             : angular.element(document.body),
            targetEvent        : ev,
            clickOutsideToClose: true,
            locals             : {
                materia: $scope.materia
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