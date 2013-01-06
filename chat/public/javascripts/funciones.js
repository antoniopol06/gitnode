$(document).on("ready",inicio);
var socket=io.connect('/');
function inicio()
{
	//si recibimos usuario desde el servidor
	socket.on("usuarioServidor", usuarioRecibidoServidor);
	socket.on("enviarFormulario", enviarChat);
}

function enviarUsuario()
{
	//ejecutamos la funcion enviarUsuario del servidor y le pasamos el parametro usuario
	var usuario=$("#usuario").val();
	socket.emit("enviarServidorUsuario",usuario);
	return false;
}

function usuarioRecibidoServidor(usuarioform, usuarios)
{
	var tamano=usuarios.length;
	var valido=1;
	alert(tamano);
	$("#mensaje").empty();
	for(elemento=0;elemento<tamano;elemento++)
	{
		if(usuarioform==usuarios[elemento]["usuario"])
		{
			valido=0;
		}
	}
	if(valido==1)
	{
		//se puede meter en el array de usuarios
		socket.emit("nuevoUsuarioServidor",usuarioform,1);
	}else{
		//no se puede meter
		socket.emit("nuevoUsuarioServidor",usuarioform,0)
	}
}

function enviarChat(valido)
{
	if(valido==1)
	{
		$("#formulario").submit();
	}else{
		$("#mensaje").html="Ese usuario ya esta registrado, prueba a elegir otro";
	}
}