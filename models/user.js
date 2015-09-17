// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    userid: String,    
    name: String,
    email: String,    
    pass: String
});

// Return model
module.exports = restful.model('Users', productSchema);