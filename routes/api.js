// Dependencias
var express = require('express');
var router = express.Router();
var shortId = require('short-mongo-id');
// Modelos
var User = require('../models/user');
var Materia = require('../models/materia');
var Post = require('../models/post');

// <editor-fold desc="Variables locales">
// estado de materia
var materiaStatusHint = ['Hay actividades', 'Actividades Suspendidas', 'No hay Actividades', 'Entrega de actividades'];
var materiaStatusImg = ['bell', 'bell-off', 'bell-outline', 'bell-ring'];
// css colores para el cambio de colores en vistas
var colores = ['gray', 'green', 'yellow', 'blue', 'darkBlue', 'deepBlue', 'purple', 'lightPurple', 'red', 'pink'];

//locales
var color = Math.floor(Math.random() * colores.length);
// </editor-fold>

// <editor-fold desc="metodos locales">
/*
* INFO return cambio nuevo estado de materia
* */
var materiaStatus = function (pos) {
    'use strict';
    return { pos: pos, img: materiaStatusImg[pos], hint: materiaStatusHint[pos]};
};
/*
* INFO return color para fondo de materia
* */
var materiaBackground = function () {
    'use strict';
    color = (color + 1) % 10;
    return {background: colores[color]};
};
// </editor-fold>

// <editor-fold desc="metodos de enrutamiento">
Materia.methods(['get', 'put', 'post']);
Materia.before('post', function (req, res, next) {
    'use strict';
    //console.log(res);
    // INFO DEFINICIÓN DE DATOS ADICIONALES
    req.body.status = materiaStatus(2);
    req.body.meta = materiaBackground();
    req.body.ultimoPost = Date.now();

    next();
});
Materia.before('put', function (req, res, next) {
    'use strict';
    //console.log(res);
    // INFO ACTUALIZAR DATOS DE MATERIA
    req.body.status = materiaStatus(req.body.status.pos);
    req.body.ultimoPost = Date.now();
    console.log(req.body.codigo);
    if (req.body.codigo === undefined) {
        req.body.codigo = shortId(req.body._id);
    }
    next();
});
Materia.register(router, '/materias');

User.methods(['get', 'put', 'post']);
User.after('get', function (req, res, next) {
    'use strict';
    //console.log(res);
    // info ocultar datos de conexión
    delete req.body.pass;
    delete req.body.nombre_usuario;
    next();
});
User.register(router, '/users');

Post.methods(['get', 'put', 'post', 'delete']);
Post.before('post', function (req, res, next) {
    'use strict';
    req.body.etiqueta = colores[req.body.etiqueta];
    next();
});
Post.after('post', function (req, res, next) {
    'use strict';
    // INFO actualizacion de ultimo de post en materia
    Materia.findOne({_id: req.body.materia}, function (error, materia) {
        if (error) {
            return console.log(error);
        }
        materia.posts = materia.posts.concat(res.locals.bundle._id);
        materia.ultimoPost = Date.now();
        materia.save(function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
    next();
});
Post.after('put', function (req, res, next) {
    'use strict';
    //console.log(res);
    // INFO actualizacion de ultimo de post en materia
    Materia.findOne({_id: req.body.materia}, function (err, materia) {
        if (err) {
            return console.log(err);
        }
        materia.ultimoPost = Date.now();
        materia.save(function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
    next();
});
Post.register(router, '/posts');
// </editor-fold>

// Return router
module.exports = router;