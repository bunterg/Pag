// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
//todo cuando user revisa materia donde insertar
// Schema
var Schema = new mongoose.Schema({
    nombre_usuario: { type: String, unique: true },
    nombre: String,
    correo: { type: String, unique: true },    
    pass: { type: String, min: 5, max:12},
    imagen: String,
    meta: mongoose.Schema.Types.Mixed,
    materias: [{
        materia:{type: mongoose.Schema.Types.ObjectId, ref: 'Materias'},
        revision : Date
    }]
});

// Return model
module.exports = restful.model('Users', Schema);