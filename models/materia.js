// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    materiaID: String,    
    name: String
});

// Return model
module.exports = restful.model('Materias', productSchema);