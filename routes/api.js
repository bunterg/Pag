// Dependencies
var express = require('express');
var router = express.Router();

/* reductor de id
 var shortId = require('short-mongo-id');
 var id = shortId("507f191e810c19729de860ea"); // returns "iTxuMF"
 */
// Models
var Product = require('../models/product');
var User = require('../models/user');
var Materia = require('../models/materia');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

User.api.methods(['get', 'put', 'post', 'delete']);
User.api.after('get', function (req, res, next) {
    //console.log(req.body);
    //importate sin next(); sino bloquea la transacción
    next();
});
User.api.register(router, '/users');

Materia.api.methods(['get', 'put']);
Materia.api.register(router, '/materias');

//modelos
router.get('/model/users', function(req, res) {
    //console.log(User.modelo());
    res.send(User.modelo());
});
router.get('/model/materia', function(req, res) {
    res.json(Materia.modelo());
});
// Return router
module.exports = router;