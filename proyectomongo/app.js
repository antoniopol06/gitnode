
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  , app = express()
  , http = require('http')
  , mongoose= require('mongoose')
  , server = module.exports = http.createServer(app);



server.listen(3000);

//configuracion express
app.configure(function(){
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

app.get('/', routes.index);
app.get('/editar/:usuario', routes.editar);
app.post('/editar', routes.editarusuario);
app.post('/anadir', routes.anadir);
app.post('/borrar', routes.borrar);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port 3000");
});

//mongoose
mongoose.connect( 'mongodb://localhost/uno' );
