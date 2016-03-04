// JavaScript Document
var nombre = "";
var correo = "";
var procedencia = "";
var carrera = "";
var db;
var $contenido = "";
var $nombre="";


            function gotFS(fileSystem) {

				 var fecha = new Date();

 
$nombre = fecha.getDate() + "-" + (fecha.getMonth() +1) + "-" + fecha.getFullYear() + "-" + fecha.getHours() + "-" + fecha.getMinutes() + "-" + fecha.getSeconds();

   fileSystem.root.getDirectory("vivencia_UMAD_16", {create: true}, gotDir);
}

function gotDir(dirEntry) {
    dirEntry.getFile($nombre+".csv", {create: true, exclusive: true}, gotFileEntry);


            }

            function gotFileEntry(fileEntry) {
                fileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                writer.onwrite = function(evt) {				
					
                    console.log("Correcto");
                };

                writer.write($contenido);
				$("#archivo").html($nombre + ".csv");
				$("#exportado").popup();
                $("#exportado").popup("open");	 
				
                writer.abort();

            }

            function fail(error) {
                console.log("error : "+error.code);
            }
function Guardar()
{
	$contenido = "Folio Registro, Nombre, Correo Electronico, Escuela de Procedencia, Carrera" + "\n";

	db.transaction(function(tx) {
        tx.executeSql("select * from registros;", [], function(tx, res) {

    for (i = 0; i < res.rows.length; i++) { 
	$contenido = $contenido + res.rows.item(i).folioRegistro + "," + res.rows.item(i).nombre + "," + res.rows.item(i).correo + "," +res.rows.item(i).procedencia + "," + res.rows.item(i).carrera +"\n"; 

    }  

        });
      });
		
		

try
{
	
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
    catch (e)
	{
        alert(e);
	}


}


function conectar_base()
 {

			db = window.sqlitePlugin.openDatabase({name: "vivenciaumad16.db", createFromLocation: 1});

			
			db.transaction(function(tx) {
        tx.executeSql("select count(folioRegistro) as cuantas from registros;", [], function(tx, res) {

          $('#cuantas').html(res.rows.item(0).cuantas);
        });
      });
			
			
 }

$(document).ready(function(e) {
 document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
	  conectar_base();
	  
  $('#exportar').on('tap', function(){
     $("#opciones").popup("close");	 
	 Guardar();
 });
  
  	$('#imagenc').on('swipe', function() {
		var $nombre = $(this).attr('src');
		$nombre = $nombre.substring(18);
		if ($nombre == "gmail.png")
		 {
			 $(this).attr('src', 'recursos/imagenes/yahoo.png');
		 }
		else if ($nombre == "yahoo.png")
		 {
			 $(this).attr('src', 'recursos/imagenes/hotmail.png');
		 }
		else if ($nombre == "hotmail.png")
		 {
			 $(this).attr('src', 'recursos/imagenes/gmail.png');
		 }
		 
	});
	
	$('#imagenc').on('tap', function() {
		
		var $ccorreo = $(this).attr('src');
		$ccorreo = $ccorreo.substring(18);
        if ($ccorreo == "gmail.png")
		 {
		  $('#correoe').val($('#correoe').val() + '@gmail.com');
		 }
		else if ($ccorreo == "yahoo.png")
		 {
		  $('#correoe').val($('#correoe').val() + '@yahoo.com.mx');
		 }
		else if ($ccorreo == "hotmail.png")
		 {
		  $('#correoe').val($('#correoe').val() + '@hotmail.com');
		 }

	});

 $('#guardar').on('tap', function(){
nombre = $('#nombrea').val();
correo = $('#correoe').val();
procedencia = $('#procedenciaa').val();
carrera = $('#scarrera').val();

db.transaction(function(tx) {
              tx.executeSql("INSERT INTO registros (nombre, correo, procedencia, carrera) VALUES (?,?,?,?)", [nombre, correo, procedencia, carrera], function(tx, res) {
				  				  $("#confirmacion").popup();
				  $("#confirmacion").popup("open");
				  			  			db.transaction(function(tx) {
        tx.executeSql("select count(folioRegistro) as cuantas from registros;", [], function(tx, res) {


          $('#cuantas').html(res.rows.item(0).cuantas);
        });
      });
			   
			    }, function(e) {
            alert ("ERROR: " + e.message);
			  
			  }); 	   
   });

  
   });
   
$('#continuar').on('tap', function (){
 $('#nombrea').val("");
 $('#correoe').val("");
 $('#procedenciaa').val("");
 $('html, body').animate({
        scrollTop: 0 
    }, 200);
});
 }
 
});