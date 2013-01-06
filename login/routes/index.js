
/*
 * GET home page.
 */

var usuarios=[];
exports.index = function(req, res){
  	res.render('index', {title:'Login', usuarios: usuarios});
};

exports.registrarse = function(req, res){
  	if(req.body.usuario && req.body.pass)
  	{
  		var usuario=req.body.usuario;
  		var pass=req.body.pass;
  		usuarios.push({"usuario": usuario, "pass":pass});
  	}
  	res.redirect('/');
};
