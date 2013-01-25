
/*
 * GET home page.
 */
var nodemailer=require('nodemailer');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.enviar = function(req, res){
	// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "nodejsnpm@gmail.com",
        pass: "nodejs1234"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Nodejsnpm <nodejsnpm@gmail.com>", // sender address
    to: req.body.email, // list of receivers
    subject: req.body.asunto, // Subject line
    text: req.body.texto, // plaintext body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        res.render('error',{title: "Error al enviar el Mail"});
    }else{
        console.log("Message sent: " + response.message);
        res.render('enviado',{title: "El mensaje fue enviado con éxito"});
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
};