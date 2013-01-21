
/*
 * GET home page.
 */
 //variable global que contendrá los usuarios que estan conectados simultaneamente (sin websockets, de momento no es app realtime)
var usuarios=[];


//pagina de inicio
exports.index = function(req, res){
  //si el usuario ya tiene una sesión le redireccionará automaticamente a la página del chat
  if(req.session.usuario)
  {
  	res.redirect('/chat');
  //si no tiene sesión le cargará la página inicial
  }else{
    //renderiza el archivo index.jade de la carpeta views
  	res.render('index', { title: 'Bienvenido al Chat' });
  }
};

/*Al enviar el formulario, habrá un paso intermedio, esto se hace, por que si directamente se carga la página
al recargar la página nos dará error de usuario ya que estamos volviendo a enviar las variables*/
exports.login = function(req, res){
  //recogemos el usuario del formulario mediante post req.body.nombre_variable, si fuese mediante get sería req.params.nombre_variable
  usuario=req.body.usuario;
  //para recorrer el array y saber si existe el usuario necesitamos saber cuantos usuarios estan conectado ahora mismo
  tamano=usuarios.length;
  //creamos esta variable como bandera, si esta a 0, será que no existe el usuario y es correcto, si esta a 1 redireccionara a la página de error
  var error=0;
  //si al menos hay un usuario lo vamos a recorrer
  if(tamano>0)
  {
    //recorremos el array usuarios(variable global que almacena todos los usuarios)
  	for(elemento=0;elemento<tamano;elemento++)
  	{
      //si el usuario que hemos introducido en el formulario es igual a alguno que hay en el array ponemos la bandera error a 1
  		if(usuario==usuarios[elemento]["usuario"])
  		{
  			error=1;
  		}
  	}
  }
  //si existe el usuario le enviaremos a errorUsuario
  if(error==1)
  {
  	res.redirect('/errorUsuario');
  //si no existe le enviaremos al chat
  }else{
    //antes de redireccionar, metemos el usuario introducido al array global de usuarios
  	usuarios.push({"usuario":usuario});
    //inicializamos la sesión del usuario con req.session.nombre_sesion
  	req.session.usuario=usuario;
  	res.redirect('/chat');
  }
};


exports.errorUsuario = function(req, res){
  //si existe la sesion le redireccionamso al chat y si no existe renderizamos el el archivo errorUsuario.jade d ela carpeta views
  if(req.session.usuario)
  {
  	res.redirect('/chat');
  }else{
  	res.render('errorUsuario', { title: 'Error de Usuario' });
  }
};


exports.chat = function(req, res){
  //console.log nos permite mostrar por consola los valores que van llegando, muy útil cuando encontramos errores
  console.log("***************Llega con valor "+req.session.usuario);
  //si existe la sesiçon renderizamos el chat y le enviamos como parametros el título, el usuario introducido en el formulario y el array con todos los usuarios conectados si no existe la sesión le redireccionamso a la página inicial 
  if(req.session.usuario)
  {
  	usuario=req.session.usuario;
    res.render('chat', { title: 'Chat', usuario: usuario, usuarios: usuarios });
  }else{
  	res.redirect('/');
  }
  
};

//si el usuario da a salir
exports.salir = function(req, res){
  //la variable usuario toma el valor de la sesión del usuario actual que nos servirá para eliminarlo posteriormente del array global ya que se ha desconectado
  usuario=req.session.usuario;
  //volvemos a realizar los pasos para recorrer el array y para ello debemos sacar el tamano del array
  tamano=usuarios.length;
  if(tamano>0)
  {
  	for(elemento=0; elemento<tamano; elemento++)
  	{
      //si el usuario es igual a algún elemento del array lo eliminaremos del array y eliminaremos la sesion
  		if(usuario==usuarios[elemento]["usuario"])
  		{
        //eliminamos del array
  			usuarios.splice(elemento,1);
        //eliminamos la sesión
  			delete req.session.usuario;
  		}
  	}
  }
  //por ultimo redireccionamos a la página inicial dónde podrá entrar otra vez introduciendo un nombre de usuario
  res.redirect('/');
};