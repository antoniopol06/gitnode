
/*
 * GET home page.
 */
//si nos fijamos en app.js, en app.get('/',routes.index) lo que hace es llamar a la siguiente funcion
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//como nosotros hemos puesto app.get('/bienvenido', routes.bienvenido) tenemos que agregar
exports.bienvenido = function(req, res){
	//y por ejemplo vamos a cargar un nuevo jade, por ejemplo bienvenido
	//todo bien?
  res.render('bienvenido', { title: 'Bienvenido' });
};
//el ultimo paso sería crear el jade, lo normal, es primero crear en app.js la url, quien la va a controlar , dentro de routes index.js , y que se va a cargar. Ahora vamos a la carpeta views

//entrar
exports.entrar = function(req, res){
	//y por ejemplo vamos a cargar un nuevo jade, por ejemplo bienvenido
	//todo bien?
	//recogemos la variable
	usuario=req.body.usuario;
	//si fuese por get seria req.params.usuario y si fuese sesiones para un futuro seria req.sessions.nombre_sesion
	//el primer parametro de render es el jade que se va a cargar, el segundo las variables que queremos mostrar en el en formato JSON, en este caso añadiremos también usuario
  res.render('nuevousuario', { title: 'Nuevo usuario' , usuario: usuario});
   //una vez hecho esto creamos otra plantilla jade "nuevousuario.jade"
};