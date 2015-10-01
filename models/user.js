// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Schema = new mongoose.Schema({
    nombre_usuario: { type: String, unique: true }, // field level
    nombre: String,
    correo: { type: String, unique: true },    
    pass: { type: String, min: 5, max:12},
    imagen: String,
    meta: mongoose.Schema.Types.Mixed,
    materias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Materias'}]
});

// Return model
module.exports = restful.model('Users', Schema);