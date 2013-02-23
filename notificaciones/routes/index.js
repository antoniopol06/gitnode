
/*
 * GET home page.
 */

//////////////7
var ClientBd = require('mysql');
var db = ClientBd.createConnection({
  host     : 'localhost',
  user     : 'administrador',
  password : '123456',
  database : 'nodejs',
});

db.connect();


var temas = require('../mongo/temas.js');

exports.index = function(req, res){
  //console.log(req.headers["user-agent"]);
  res.render('index', { title: 'Foro' });
};

exports.login = function(req, res){
  usuario=req.body.usuario;
  pass=req.body.pass;
  db.query("SELECT id from usuarios where usuario='"+usuario+"' and pass='"+pass+"'", function(err, rows, fields) {
      if (err) throw err;
      if(rows.length==1)
      {
        req.session.usuario=usuario;
        res.redirect('/foro');
      }else{
        res.redirect('/errorLogin');
      }

  });
};

exports.errorLogin = function(req, res){
  res.render('errorLogin', { title: 'Login o Pass incorrectos' });
};

var notificaciones={};
exports.foro = function(req, res){
  usuario=req.session.usuario; 
  if(usuario)
  {
    var io=require('../variables').io;
    //sockets
    io.sockets.on('connection', inicio);
    function inicio(socket){
      notificaciones[usuario]=socket.id;
    }
    temas.find(function (err, registros) {
      if(err) throw err;
      //console.log(registros);
      //el render debe de estar dentro de .find porque al ser asincrono y tardar algo más find pasaría al render sin la variable
      res.render('foro', { title: 'FORO' ,usuario:usuario, temas: registros});
    });
  }else{
    res.redirect('/');
  }
};

exports.anadirTema = function(req, res){
  usuario=req.session.usuario;
  tema=req.body.tema;
  nuevoTema=new temas;
  nuevoTema.tema=tema;
  nuevoTema.usuario=usuario;
  nuevoTema.save();
  res.redirect('/foro'); 
};



exports.contestarTema = function(req, res){
  usuario=req.session.usuario;
  tema=req.body.tema;
  mensaje=req.body.mensaje;
  condicion={_id:tema};
  temas.find(condicion,'usuario', function (err, registros) {
      if(err) throw err;
      registros.forEach(function (registro) {
        usuarioFinal=registro.usuario;
     });
     var io=require('../variables').io;
      //sockets
      io.sockets.on('connection', inicio);
      function inicio(socket){
      var socketid = notificaciones[usuarioFinal];
      if (typeof socketid == 'undefined' || usuario==usuarioFinal)
      {
        console.log("no emitir");
      }else{
        io.sockets.socket(socketid).emit('notificar', usuario, mensaje);
      }
      
      }
    actualizar={
       $push: { mensajes: { mensaje: mensaje, usuario: usuario } }
     }
    temas.update({_id: tema},
         actualizar, function(err, data) { 
          if(err) throw err;
          res.redirect('/foro');
    }); 
  });
};

exports.salir = function(req, res){
  usuario=req.session.usuario;
  delete notificaciones[usuario];
  delete usuario;
  res.redirect('/');
};