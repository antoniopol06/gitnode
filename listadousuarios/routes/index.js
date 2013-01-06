
/*
 * GET home page.
 */
//creamos una variable global que va a ser usuarios
var usuarios=[];

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.listar = function(req, res){
	//a primera vista le estamos enviado la variable usuarios vacia
  res.render('listado', { title: 'Listado de Usuarios', usuarios: usuarios });
  //ahora creamos la plantilla "listado.jade"
};

exports.nuevousuario = function(req, res){
	//recogemos el usuario
	usuario=req.body.usuario;
	//añadimos el usuario al array
	usuarios.push(usuario);
	//esta vez no vamso a cargar ningún jade, si no que vamos a hacer una redirección
	//y queremos que vaya a listar que si nos fijamos en app.js
	res.redirect("/listadousuarios");
	//si lo lanzamos ahora tendríamos que poder añadir usuarios y verlos
	//si nos fijamos, así podriamos hacer un chat, pero solo para nosotros mismos
	//otro día podiamos utilizar websockets, para conseguir que esto se transmitiese en tiempo real aunque los websockets no los he tocado mucho, creo que por hoy yo estoy medio muerto, son las 2:51 =D y vienen los reyes magos. Si mañana estaré, podriamos si te parece u os parece bien tocar las sesiones de express e intentar hacer el chat con websockets
};