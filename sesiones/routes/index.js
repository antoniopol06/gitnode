
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("usuario logeado: "+req.session.usuario)
  if(req.session.usuario)
  {
  	res.redirect('/bienvenido');
  }else{
  	res.render('index', { title: 'Sesiones en Nodejs' });
  }
};

exports.bienvenido = function(req, res){
 	usuario=req.session.usuario;
  	res.render('bienvenido', { title: 'Bienvenido', usuario: usuario });
};

exports.login = function(req, res){
 	usuario=req.body.usuario;
 	req.session.usuario=usuario;
  	res.redirect('/');
};

exports.salir = function(req, res){
 	req.session.usuario=null;
  	res.redirect('/');
};