
/*
 * GET home page.
 */
//usuarios conectados, inicializado vacio
exports.index = function(req, res){
  	res.render('index', {title:'Chat'});
};

exports.chat = function(req, res){
	usuario=req.body.usuario;
  	res.render('chat', {title:'Chat', usuario:usuario});
};

