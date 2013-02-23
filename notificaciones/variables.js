var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose=require('mongoose')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , probando = "probando"
  , io = require('socket.io').listen(server);

//exports
exports.express = express;
exports.routes=routes;
exports.user=user;
exports.http=http;
exports.mongoose=mongoose;
exports.path=path;
exports.app=app;
exports.server=server;
exports.io=io;
exports.probando=probando;