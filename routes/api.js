// Dependencias
var express = require('express');
var router = express.Router();
var shortId = require('short-mongo-id');
// Modelos
var User = require('../models/user');
var Materia = require('../models/materia');

// estado de materia
var materiaStatusHint = ['Hay actividades','Actividades Suspendidas','No hay Actividades','Entrega de actividades'];
var materiaStatusImg = ['bell','bell-off','bell-outline','bell-ring'];
// css colores para el cambio de colores en vistas
var colores = ['gray','green','yellow','blue','darkBlue','deepBlue','purple','lightPurple','red','pink'];
//metodos
var materiaStatus = function(pos){
    return { pos: pos, img: materiaStatusHint[pos], hint: materiaStatusImg[pos]};
};
var materiaBackground = function (){
    return {background: colores[Math.floor((Math.random() * colores.length))]};
};

// Routes
Materia.methods(['get', 'put', 'post']);
Materia.before('post', function (req, res, next) {
    //aplicar status
    req.body.status = materiaStatus(2);
    //colocar color
    req.body.meta = materiaBackground();
    //update
    req.body.ultimoPost = Date.now();
    next();
});
Materia.before('put', function (req, res, next) {
    //cambio de status
    req.body.status = materiaStatus(req.body.status.pos);
    //actualizar ultima hora
    req.body.ultimoPost = Date.now();
    next();
});
Materia.before('put', function (req, res, next) {
    //id-corto
    req.body.codigo = shortId(req.body._id);
    next();
});
Materia.register(router, '/materias');

User.methods(['get', 'put', 'post']);
User.before('get', function (req, res, next) {
    delete req.body.pass;
    delete req.body.nombre_usuario;
    next();
});
User.register(router, '/users');


// Return router
module.exports = router;