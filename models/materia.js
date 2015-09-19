// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    userio_id: mongoose.Schema.Types.ObjectId,
    corto_id: { type: [String], unique: true },    
    nombre: String,
    descripcion: String,
    disponible: { type: Boolean, default: true},    
    etiquetas: [{ nombre: String, color: Number }]
});

// Return model
module.exports = restful.model('Materias', productSchema);