
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
////
app.get('/', routes.index);// llamamos a routes.index cuando entramos a la página principal
app.post('/login', routes.login);//llamamos a routes.login cuando enviamos el formulario de la pagina inicial o de la pagina errorUsuario
app.get('/errorUsuario', routes.errorUsuario);//En /login determinamos si es valido el usuario, si ya existe llamaremos a routes.errorUsuario
app.get('/chat', routes.chat);//Si existe le enviaremos a /chat llamando a routes.chat
app.post('/salir', routes.salir);//Dentro del chat al clickar en el boton salir, llamaremos a routes.salir
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
