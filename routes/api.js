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

User.methods(['get', 'put', 'post']);
User.register(router, '/users');

Materia.methods(['get', 'put']);
Materia.register(router, '/materias');

router.post('/materias', function (req, res) {
	console.log(req.body);
})
// Return router
module.exports = router;