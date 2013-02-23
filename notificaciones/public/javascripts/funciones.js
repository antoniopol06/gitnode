$(document).on("ready", iniciar);
var socket=io.connect('http://localhost:3000');
function iniciar(){
	$('.contestar').on('click', mostrarMensaje);
	socket.on("notificar",nuevaNotificacion);
}
function mostrarMensaje(){
	id=$(this).attr("id");
	$('.contestacion_'+id).toggle();
}

function nuevaNotificacion(usuario,mensaje){
	alert("entra");
	var notificacion="El usuario <b>"+usuario+"</b> te ha contestado: <br/><i>"+mensaje+"</i>";
	$("#notificaciones").append(notificacion);
	var transicion={
		display:"block"
	};
	$("#notificaciones").css(transicion);
}

