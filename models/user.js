// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    userid: { type: [String], unique: true }, // field level
    name: String,
    email: { type: [String], unique: true },    
    pass: String
});

// Return model
module.exports = restful.model('Users', productSchema);