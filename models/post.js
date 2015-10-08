/**
 * Created by Bernardo on 10/6/2015.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Schema = new mongoose.Schema({
    creador: { _id: String, nombre: String, correo: String},
    materia: {type: mongoose.Schema.Types.ObjectId, ref: 'Materias'},
    contenido: String,
    etiquetas: [String],
    respuestas: [{
        usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        contenido: String,
        fecha: Date
    }]
});

// Return model
module.exports = restful.model('Posts', Schema);