// JavaScript Document
var nombre = "";
var correo = "";
var procedencia = "";
var carrera = "";


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

alert (nombre);
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