
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//inicializamos usuarios vacio
var usuarios=[];
app.get('/', routes.index);
app.post('/chat', routes.chat);
app.get('/users', user.list);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port 3000");
});

//sockets
io.sockets.on('connection', inicio);

function inicio(usuario){
  console.log("socket escuchando");
  //variables relativas al cliente
  //una vez se envie el mensaje vamos a ejecutar la función recibirUsuario
  usuario.on('enviarServidorUsuario',recibirUsuario);
  usuario.on('nuevoUsuarioServidor',actualizarUsuarios);
}

function recibirUsuario(usuarioform)
{
  io.sockets.emit("usuarioServidor",usuarioform, usuarios);
}

function actualizarUsuarios(usuarioform,valido)
{
  console.log("ESTE USUARIO ES VALIDO"+valido);
  if(valido==1)
  {
    usuarios.push({"usuario":usuarioform});
  }
  io.sockets.emit("enviarFormulario",valido);
}
