var mongoose = require('mongoose');
var schema= mongoose.Schema;
var usuarios = new schema({
	usuario: String,
});
module.exports=mongoose.model( 'usuarios', usuarios);
