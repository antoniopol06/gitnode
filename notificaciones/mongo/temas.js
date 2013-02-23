var mongoose = require('mongoose');
var schema= mongoose.Schema;
var temas = new schema({
	tema: String,
	usuario: String,
	mensajes:[],
});
module.exports=mongoose.model( 'temas', temas);