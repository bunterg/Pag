// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    nombre_usuario: { type: [String], unique: true }, // field level
    nombre: String,
    correo: { type: [String], unique: true },    
    pass: String
});

// Return model
module.exports = restful.model('Users', productSchema);