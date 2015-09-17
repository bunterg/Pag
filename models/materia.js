// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    materiaID: { type: [String], unique: true },    
    name: String,
    descripcion: String,    
    tags: [{ name: String, color: Number }]
});

// Return model
module.exports = restful.model('Materias', productSchema);