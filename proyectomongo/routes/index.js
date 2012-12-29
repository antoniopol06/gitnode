
/*
 * GET home page.
 */

var usuarios = require('../usuarios.js');
exports.index = function(req, res){
  usuarios.find(function (err, listado) {
    listadousuarios=listado;
  });
  console.log(listadousuarios);
  res.render('index', { title: 'MongoDB con mongoose' ,usuarios:listadousuarios});
};

/*exports.anadir = function(req, res){
  usuario=req.body.usuario;
  nuevoUsuario=new usuarios;
  nuevoUsuario.usuario=usuario;
  nuevoUsuario.save();
  console.log("guardado "+usuario);
  res.redirect("/");
};*/
