
/**
 * Module dependencies.
 */

var variables = require('./variables');

// name is a member of myModule due to the export above
var server=variables.server
    , app=variables.app
    , http=variables.http
    , mongoose=variables.mongoose
    , express=variables.express
    , path=variables.path
    , routes=variables.routes
    , user=variables.user
    , io= variables.io;

server.listen(3000);

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
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/login', routes.login);
app.get('/errorLogin', routes.errorLogin);
app.get('/foro', routes.foro);
app.post('/salir', routes.salir);
app.post('/anadirTema', routes.anadirTema);
app.post('/contestarTema', routes.contestarTema);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port 3000");
});

//mongoose
mongoose.connect('mongodb://localhost/temas', function (err){
  if(!err){
    console.log("Conexión establecida con mongodb");
  }else{
    throw err;
  }
});



