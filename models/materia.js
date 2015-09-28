// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Schema = new mongoose.Schema({
    usuario_id: mongoose.Schema.Types.ObjectId,
    corto_id: { type: [String], unique: true },    
    nombre: String,
    descripcion: String,
    disponible: { type: Boolean, default: true},    
    etiquetas: [String]
});

// Return model
module.exports = {modelo: mongoose.model('Materias',Schema),api : restful.model('Materias', Schema)};