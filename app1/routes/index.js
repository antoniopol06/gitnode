
/*
 * GET home page.
 */
exports.index = function(req, res){
  	res.render('index', {title:'Primer contacto con node.js, express, jade y socket.io'});
};
exports.newPost = function(req, res){
	res.redirect('/');
};