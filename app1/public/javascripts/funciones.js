$(document).on("ready", iniciar);
var socket=io.connect('/');
function iniciar(){
	//si recibimos del servidor la cadena 'comentarioServidor' ejecutamos la funcion procesarComentario
	socket.on('comentarioServidor',procesarComentario)
	//eejecutar función enviarPost cuando damos click al boton enviar
	$("#enviar").on("click", enviarPost);
}

function enviarPost()
{
	//ejecutamos la funcion enviarMensaje del servidor y le pasamos el parametro autor y comentario
	socket.emit('enviarMensaje',$("#autor").val(),$("#comentario").val());
}

//una vez recibido lo metemos la caja de texto de mensajes
function procesarComentario(autor,comentario){
	$('#mensajes').append('<p><em>' + autor + '</em><br/>'+comentario+'</p>');
}
