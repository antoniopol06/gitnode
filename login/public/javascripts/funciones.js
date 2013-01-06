$(document).on("ready", iniciar);
//listado de usuarios
var usuarios=[];
var socket=io.connect('http://localhost:3000');
function iniciar(){
	//si recibimos del servidor la cadena 'usuarioServidor' ejecutamos la funcion procesarUsuario
	socket.on('usuarioServidor',procesarUsuario)
	//eejecutar función registrarUsuario cuando damos click al boton enviar
	$("#enviar").on("click", registrarUsuario);
}

function registrarUsuario()
{
	//ejecutamos la funcion enviarUsuario del servidor y le pasamos el parametro usuario
	socket.emit('enviarUsuario',$("#usuario").val(), $("#pass").val());
}

//una vez recibido lo metemos la caja de texto de mensajes
function procesarUsuario(usuariologin, passlogin){
	usuarios.push({"usuario": usuariologin, "pass":passlogin});
	var tamano=usuarios.length;
	$("#listado").html("");
	for(elemento=0;elemento<tamano;elemento++)
	{
		$('#listado').append('<p><em>' + usuarios[elemento]["usuario"] + '</em></p>');
	}
}
