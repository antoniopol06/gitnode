
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
app.get('/', routes.index);
app.post('/registrarse', routes.registrarse);
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
  usuario.on('enviarUsuario',recibirUsuario);
}

//esta función la hemos enviado desde funciones.js los parametros usuario
function recibirUsuario(usuariologin,passlogin){
  //emitimos usuarioServidor con los parametros usuario y pass
  io.sockets.emit("usuarioServidor",usuariologin,passlogin);
}

