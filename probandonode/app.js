
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
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//estas lineas de abajo, explicado de mala manera, si me pilla freddie me mata, como los
//controladores de las urls, vamos a crear una por ejemplo que sea /bienvenido
app.get('/', routes.index);
app.get('/bienvenido', routes.bienvenido);//llegasteis?, lo que estamos diciendo aqui es que cuando escribamos en la url /bienvenido, va a realizar lo que haya en routes.bienvenido
//utilizamos post ya que enviamos el formulario mediante post, ahora nos toca ir a index.js dentro de routes
app.post('/entrar', routes.entrar);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
