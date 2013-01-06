
/*
 * GET home page.
 */

var usuarios = require('../usuarios.js');
exports.index = function(req, res){
  var listadousuarios = [];
  usuarios.find(function (err, registros) {
  	/*registros.forEach(function (registro){
     	var temp = {
        usuario: registro.usuario
        };
        listadousuarios.push(temp);
    });*/
  	listadousuarios=registros;
  	console.log(listadousuarios);
  	//el render debe de estar dentro de .find porque al ser asincrono y tardar algo más find pasaría al render sin la variable
  	res.render('index', { title: 'MongoDB con mongoose' ,usuarios:listadousuarios});
  });
};

exports.anadir = function(req, res){
  usuario=req.body.usuario;
  nuevoUsuario=new usuarios;
  nuevoUsuario.usuario=usuario;
  nuevoUsuario.save();
  console.log("guardado "+usuario);
  res.redirect("/");
};

exports.editar = function(req, res){
  usuario=req.params.usuario;
  console.log("nombre de usuario "+usuario);
  usuarios.findOne({usuario: usuario}).exec(function (err, registro) { 
    res.render('editar', { title: 'MongoDB con mongoose' , usuarioantiguo: usuario, usuario:registro});
  });
};

exports.editarusuario = function(req, res){
  usuarioantiguo=req.body.usuarioantiguo;
  usuarionuevo=req.body.nuevousuario;
  condicion={usuario:usuarioantiguo};
  actualizar={usuario:usuarionuevo};
  usuarios.update(condicion,actualizar).exec(function (err, registro){
    console.log("editado "+usuario);
    res.redirect("/");
  });
};

exports.borrar = function(req, res){
  usuarioantiguo=req.body.usuarioantiguo;
  usuarios.remove({usuario:usuarioantiguo}).exec(function (err, registro){
    res.redirect("/");
  });
};

