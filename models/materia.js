/**
 * Created by Bernardo on 9/29/2015.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var Schema = new mongoose.Schema({
    creador: { _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}, nombre: String, correo: String},
    //post: mongoose.Schema.Types.ObjectId, solo se puede tener un tolo objectid extra el otro ira en meta
    codigo: String,
    nombre: String,
    descripcion: String,
    etiquetas: [String],
    status: mongoose.Schema.Types.Mixed,
    meta: mongoose.Schema.Types.Mixed,
    ultimoPost: {type: Date, default: Date.now()},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
});

// Return model
module.exports = restful.model('Materias', Schema);