// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Product = require('../models/product');
var User = require('../models/user');
var Materia = require('../models/materia');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

User.methods(['get', 'put', 'post']);
User.register(router, '/users');

Materia.methods(['get', 'put', 'post']);
Materia.register(router, '/materias');
// Return router
module.exports = router;