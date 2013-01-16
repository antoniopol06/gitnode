
/*
 * GET home page.
 */
//variable que recogerá todos los usuarios que estan "conectados"
var usuarios=[];

exports.index = function(req, res){
	//si existe el usuario lo redirecciona a la pagina del chat
  if(req.session.usuario)
  {
  	res.redirect('/chat');
  }else{
  	res.render('index', { title: 'Bienvenidos al Chat con NodeJs' });
  }
};

exports.login = function(req, res){
  //recogemos variable post mediante req.body
  usuario=req.body.usuario;
  //vemos el tamaño del array de usuarios
  tamano=usuarios.length;
  //la siguiente variable error será 0 si el usuario no existe y 1 si el usuario ya existe
  error=0;
  //recorremos el array para saber si ese usuario ya existe
  if(tamano>0)
  {
  	for(elemento=0; elemento<tamano; elemento++)
  	{
  		console.log("usuario form "+usuario+"----usuario array"+usuarios[elemento]);
  		if(usuario==usuarios[elemento]["usuario"])
  		{
  			console.log("entra");
  			error=1;
  		}
  	}
  }
  if(error==1)
  {
  	res.redirect('/errorUsuario');
  }else{
  	usuarios.push({usuario: usuario});
  	req.session.usuario=usuario;
  	res.redirect('/chat');
  }
};

exports.errorUsuario = function(req, res){
  if(req.session.usuario)
  {
  	res.redirect('/chat');
  }else{
  	res.render('errorUsuario', { title: 'Error de Usuario' });
  }
};

exports.chat = function(req, res){
  //si no tiene sesion le vuelve a a la página de inicio
  if(!req.session.usuario)
  {
  	res.redirect('/');
  }else{
  	res.render('chat', { title: 'Chat',usuario: req.session.usuario, usuarios: usuarios  });
  }
};

exports.salir = function(req, res){
  //recogemos el valor del usuario de sesion
  usuario=req.session.usuario;
  //sacamos el tamano del array
  tamano=usuarios.length;
  if(tamano>0)
  {
  	for(elemento=0; elemento<tamano; elemento++)
  	{
  		//si son iguales lo eliminamos
  		if(usuario==usuarios[elemento]["usuario"])
  		{
  			usuarios.splice(elemento,1);
  			delete req.session.usuario;
  		}
  	}
  }
  res.redirect('/');
};