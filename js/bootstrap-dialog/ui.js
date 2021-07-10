/*
 * librería "ui.js" con funciones varias para la UI (bootstrap-dialog, sleep, string,  ...)
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// iniciamos la librería dycec "ui.js"
	ui.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


// ******************************************************************************************
// vars *************************************************************************************
// ******************************************************************************************


//******************************************************************************************
//ui object **************************************************************************
//******************************************************************************************

/**
 * objeto "ui", con varias funciones útiles para la UI (bootstrap-dialog, sleep, string,  ...)
 */
var ui = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// vars *************************************************************************************
	// ******************************************************************************************
	//OJOoooo, "${pageContext.request.contextPath}" no es accesible desde un fichero.js
	//s_contextPath: "", --> usar función ui.getContextPath()

    
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* iniciamos la librería dycec "ui.js" */
	init_lib: function() {
		try {
			//"${pageContext.request.contextPath}" no es accesible desde un fichero.js
			//s_contextPath = ui.getContextPath() --> función ui.getContextPath();
			
			// init prototypes of Object. Nuevas propiedades que añadimos a objetos JavaScript.
			this.init_prototypes();
			
			// iniciamos en español la librería BootstrapDialog "bootstrap-dialog.js"
			this.init_lib_BootstrapDialog();
			
			// ...
		} catch (except) {
			/*
			//console.log(except); //except.message, except.fileName, except.lineNumber, except.stack
			console.log("EXCEPTION: " + except.message); //except.message, except.fileName, except.lineNumber, except.stack
			*/
		}	
	}, 
	//init_lib: function() {
	
	init_prototypes: function() {
		// Evitamos que si no existe console.log() nos pete. URL: http://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function
		if (!window.console) window.console = {};
		if (!window.console.log) window.console.log = function() {};
		if (!window.console.debug) window.console.debug = function() {};
		if (!window.console.error) window.console.error = function() {};
		
		/* Añadimos el prototipo "startsWith", "endsWith" al objeto String para el IExplorer, que no lo tiene.
		 * URL: http://stackoverflow.com/questions/280634/endswith-in-javascript
		 * URL: http://rickyrosario.com/blog/javascript-startswith-and-endswith-implementation-for-strings/
		 * 
		 * NOTA 1: este prototipo lo tiene el JS de Firefox, Chrome, pero no el IExplorer !!!.
		 *         Ahora, ya podemos hacer en IExplorer esta llamada:
		 *         "How,are,you,doing,today?".endsWith("today?")
		 * NOTA 2: también hemos creado la función "dycec_js.str_endsWith", en este módulo que
		 *         hace lo mismo.
		 */
		if (typeof String.prototype.startsWith !== 'function') {
			String.prototype.startsWith = function(prefix) {
				return (this.indexOf(prefix) === 0);
			}
		}
		if (typeof String.prototype.endsWith !== 'function') {
			String.prototype.endsWith = function(suffix) {
				return (this.indexOf(suffix, this.length - suffix.length) !== -1);
				//return this.match(suffix+"$") == suffix; //con "regexp", más lento
			}
		}
	},
	//init_prototypes: function() {
	
	// -------------------------------------------------------------------------------------------
	// BootstrapDialog. //URL: https://nakupanda.github.io/bootstrap3-dialog/ --------------------
	// -------------------------------------------------------------------------------------------
	// Otras lib de dialogs:
	// 1) SweetAlert: sweetalert.js (incluido en el desktop de Inspinia)
	// 2) https://blog.reaccionestudio.com/alertify-alertas-y-notificaciones-con-jquery-en-espanol/
	//    https://github.com/fabien-d/alertify.js  
	/* iniciamos en español la librería BootstrapDialog "bootstrap-dialog.js" */
	init_lib_BootstrapDialog: function() {
		try {
			if (typeof BootstrapDialog === "undefined") { //si la variable no está definida (que no es lo mismo que contenga un valor "undefined") 
			//if ( !BootstrapDialog ) { --> Norlll, //check for empty strings (""), null, undefined, false and the numbers 0 and NaN
				//console.log("[BootstrapDialog] is not defined. You must include lib [bootstrap-dialog.js].");
			}

			// "bootstrap-dialog.js". Textos por defecto de la lib "BootstrapDialog" en español.
			/*
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = 'Information';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = 'Information';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = 'Information';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = 'Success';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = 'Warning';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = 'Danger';
			BootstrapDialog.DEFAULT_TEXTS['OK'] = 'OK';
			BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = 'Cancel';
			BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = 'Confirmation';
			*/	
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = 'Información';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = 'Información';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = 'Información';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = 'Éxito';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = 'Aviso';
			BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = 'Peligro';
			BootstrapDialog.DEFAULT_TEXTS['OK'] = 'Aceptar';
			BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = 'Cancelar';
			BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = 'Confirmación';
		} catch (except) {
			// Si falla, es que no se hizo el include de "bootstrap-dialog.js"
			// No se pudo cargar la librería "bootstrap-dialog.js", hay que importarla (<script src="bootstrap-dialog.min.js"></script>) !!!
			/*
			//console.log(except); //except.message, except.fileName, except.lineNumber, except.stack
			console.log("EXCEPTION: " + except.message); //except.message, except.fileName, except.lineNumber, except.stack
			*/
		}	
	}, 
	//init_lib_BootstrapDialog: function() {
	
	/**
	 *  ui.alert(), ui.alert(s_message), ui.alert(s_title, s_message), ui.alert(s_title, s_message, i_type)
	 *  wrapper para "bootstrap-dialog.js".
	 *  
	 *  URL: http://nakupanda.github.io/bootstrap3-dialog/
	 *  
	 *  Se deben añadir estas líneas en el fichero.html que haga uso de esta función
	 *  <!-- "bootstrap-dialog.js". Bootstrap modals made easy (JavaScript alert(), confirm() and other flexible dialogs). URL: http://nakupanda.github.io/bootstrap3-dialog/ -->
	 *  <script src="${pageContext.request.contextPath}/js/lib/bootstrap-dialog.min.js" type="text/javascript"></script>
	 *  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/lib/bootstrap-dialog.min.css" type="text/css" media="screen" />
	 * 
	 */
	//ui.alert(), ui.alert(s_message), ui.alert(s_title, s_message), ui.alert(s_title, s_message, i_type), ui.alert(s_title, s_message, i_type, o_callback_function)
	alert: function() {
		/*
		//BootstrapDialog.alert("Mensaje"); //=alert("Mensaje");
        BootstrapDialog.alert("Mensaje", function(){
            alert("Botón [OK/Aceptar] pulsado");
        });
        */
		var s_title = "Información"; //=BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO];
		var s_message = "";
		var i_type = BootstrapDialog.TYPE_INFO; //TYPE_PRIMARY, TYPE_INFO, TYPE_SUCCESS, TYPE_WARNING, TYPE_DANGER
		var o_callback = null; //function a ejecutar cuando se pulsa el botón "Aceptar"
		if ( arguments[3] ) {
			s_title = arguments[0];
			s_message = arguments[1];
			i_type = arguments[2];
			o_callback = arguments[3]; //URL: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
		} else if ( arguments[2] ) {
			s_title = arguments[0];
			s_message = arguments[1];
			i_type = arguments[2];
		} else if ( arguments[1] ) {
			s_title = arguments[0];
			s_message = arguments[1];
		} else if ( arguments[0] ) {
			s_message = arguments[0];
		} 
		var o_dialog = BootstrapDialog.alert({
			type   : i_type, //Default is BootstrapDialog.TYPE_PRIMARY
			title  : s_title,
			message: s_message,
			closable: false, //Default is false. ¿ Mostrar la "x" de "cerrar el diálogo", lo hacemos con botón, que queda más bonito ?
			draggable: true, //Default is false
			buttonLabel: "Aceptar",
			/*
			buttons: [{
				label   : 'Aceptar',
				cssClass: 'btn-primary',
				action: function(dialogRef){
					dialogRef.close();
				}						
			}],
			*/
			/*
			// función de callback para el botón "Aceptar"
			callback: function(result) {
				// result will be true if button was click, while it will be false if users close the dialog directly.
				if (result) {
					// Se pulsó el botón "Aceptar"
				} else {
					// Se pulsó sobre la "x" del diálogo
				}
			}
			*/
			callback: o_callback
		}); //BootstrapDialog.alert({
		
	    /**
	     * setter de la función "callback" del botón [Aceptar]
	     * Añadimos nuevo método al objeto "o_dialog", por si se le quiere añadir al 
	     * botón "Aceptar" una función de callback
	     *
	     * @param {type} callback_function
	     * @returns
	     * 
	     *  Ejemplo de uso:
	        //-------------------------------------------------------------------------------------- 
			// Mostramos ventana de error "La sesión ha caducado".
			var o_dialog = ui.alertError("ERROR.", "La sesión actual ha caducado.\n\nPulse el botón [Aceptar] para recargar la página principal.");
			//--- "callback" a ejecutar cuando se pulse el botón "Aceptar". Start ----------
			var callback_function = function(result) {
				o_dialog.close(); //esto ya lo hace el propio botón [Aceptar], pero por si acaso 
				// Botón "Aceptar": Recargamos la página, para que el usuario pueda logarse otra vez
				window.location.reload(); //= http://localhost:8080/incidencias/inc_masivas_movistar_tv.action
				//window.location.href = '${pageContext.request.contextPath}'; //= http://localhost:8080/incidencias/
			};
			o_dialog.setCallback(callback_function);
			//--- "callback" a ejecutar cuando se pulse el botón "Aceptar". End -----------
	        //-------------------------------------------------------------------------------------- 
	     */
		o_dialog.setCallback = function(callback_function) {
			//--- "callback" a ejecutar cuando se pulse el botón "Aceptar". Start ----------
			//o_dialog.options.callback = callback_function;
			//o_dialog.options.data.callback = this.options.callback;
			this.options.callback = callback_function;
			this.options.data.callback = this.options.callback;
			//--- "callback" a ejecutar cuando se pulse el botón "Aceptar". End -----------
		};
		return o_dialog; 
	}, 
	//alert: function() {
	// ui.alertError(), ui.alertError(s_message), ui.alertError(s_title, s_message)
	alertError: function() {
		var s_title = "Error"; //=BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO];
		var s_message = "";
		var i_type = BootstrapDialog.TYPE_DANGER; //TYPE_PRIMARY, TYPE_INFO, TYPE_SUCCESS, TYPE_WARNING, TYPE_DANGER
		if ( arguments[1] ) {
			s_title = arguments[0];
			s_message = arguments[1];
		} else if ( arguments[0] ) {
			s_message = arguments[0];
		}
		return this.alert(s_title, s_message, i_type);
	}, 
	//alertError: function() {
	
	//ui.waitDialog(), ui.waitDialog(s_title), ui.waitDialog(s_title, s_message), ui.waitDialog(s_title, s_message, i_type)
	waitDialog: function() {
		/*
		//BootstrapDialog.show("Mensaje"); //=alert("Mensaje");
		var o_dialog = BootstrapDialog.show({
			title  : "Esperando respuesta de iGRI",
			// OJOooooo, en un "fichero.js" no podemos hacer uso de "${pageContext.request.contextPath}", esto es para "ficheros.jsp"
			message: "Espere, por favor ...<img src='${pageContext.request.contextPath}/img/animated/loading_small.gif' alt='Espere, por favor ...' align='right' />",
			closable: false, //Default is true. ¿ Mostrar la "x" de "cerrar el diálogo", lo hacemos con botón, que queda más bonito ?
			draggable: true, //Default is false
		});
		alert("Ejemplo de dialog [Espere, por favor ...]");
		o_dialog.close();
        */
		var s_title = "Espere, por favor"; //=BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO];
		//var s_message = "Espere, por favor ...";
		// OJOooooo, en un "fichero.js" no podemos hacer uso de "${pageContext.request.contextPath}", esto es para "ficheros.jsp"
		//var s_message = "Espere, por favor ...<img src='${pageContext.request.contextPath}/img/animated/loading_small.gif' alt='Espere, por favor ...' align='right' />"
		var s_message = "Espere, por favor ...<img src='"+ this.getContextPath() + "/img/animated/loading_small.gif' alt='Espere, por favor ...' align='right' />";
		var i_type = BootstrapDialog.TYPE_INFO; //TYPE_PRIMARY, TYPE_INFO, TYPE_SUCCESS, TYPE_WARNING, TYPE_DANGER
		if ( arguments[2] ) {
			s_title = arguments[0];
			s_message = arguments[1];
			i_type = arguments[2];
		} else if ( arguments[1] ) {
			s_title = arguments[0];
			s_message = arguments[1];
		} else if ( arguments[0] ) {
			s_title = arguments[0];
		} 
		var o_dialog = BootstrapDialog.show({
			type   : i_type, //Default is BootstrapDialog.TYPE_PRIMARY
			title  : s_title,
			message: s_message,
			closable: false, //Default is true. ¿ Mostrar la "x" de "cerrar el diálogo", lo hacemos con botón, que queda más bonito ?
			draggable: true  //Default is false
			/* // NOTA: Botón "Aceptar" ó "Aceptar/Cancelar" solo sale con "BootstrapDialog.alert" !!!!
			buttonLabel: "Aceptar",
			*/
		}); //BootstrapDialog.show({
		return o_dialog; 
	}, 
	//waitDialog: function() {
	// BootstrapDialog.End -----------------------------------------------------------------------
	// -------------------------------------------------------------------------------------------

	ajax_post_fail: function( jqXHR, textStatus, errorThrown ) {
		// msg de Error por defecto en las peticiones AJAX POST ("$.post(...)")
		/*
		// Error al perderse la comunicación:
		//jqXHR=json= {"readyState":0,"responseText":"","status":0,"statusText":"error"}
		// Error si se produce una excepción en el servidorWeb y struts la devuelve al navegador:
		//jqXHR=json= {"readyState":4,"responseText":"...html_con_datos_error...","status":200,"statusText":"OK"}
		alert("volumenes.detalle_autonomia.action: fail. jqXHR= " + JSON.stringify(jqXHR));
		//console.log( "$.post(volumenes.detalle_autonomia.action): fail. ERROR= " + textStatus + ", " + errorThrown );
		*/
		
		var s_msg = "Error: " + textStatus + ", " + errorThrown;
		if ( jqXHR.status == 0 ) {
			// 2015/09/16 - Mejora. Se ha perdido la conexión con el servidorWeb
			//jqXHR=json= {"readyState":0,"responseText":"","status":0,"statusText":"error"}
			s_msg = "Error: " + "Se ha perdido la conexión con el servidor Web.";
		}
		// Añadimos el detalle del error enviado por el servidor (datos planos HTML recibidos del servidor_web). 
		//jqXHR: {"readyState":4,"responseText":"...html_con_datos_error...","status":200,"statusText":"OK"}
		s_msg = s_msg + jqXHR.responseText; 
		//return ui.alertError("Error al enviar los datos al servidor Web. ", s_msg);
		return this.alertError("Error al enviar los datos al servidor Web. ", s_msg);
	},
	
	/**
	 * "${pageContext.request.contextPath}" es de "ficheros.jsp", en "ficheros.js" no podemos usar "${pageContext.request.contextPath}"
	 */
	getContextPath: function() {
		//Ejemplo: "http://localhost:8080/incidencias/inc_masivas_movistar_tv.action" --> "/incidencias" 
		return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
	}, 
	//getContextPath: function () {

	
	/**
	 * htmlEncode(s_text)
	 * s_text = "Autonomía A1" --> to --> return "Autonom&iacute;a A1"
	 */
	htmlEncode: function(s_text) {
		//create a in-memory div, set it's inner text(which jQuery automatically encodes)
		//then grab the encoded contents back out.  The div never exists on the page.
		return $('<div/>').text(s_text).html();
	},
	/**
	 * htmlDecode(s_html)
	 * s_html = "Autonom&iacute;a A1" --> to --> return "Autonomía A1"
	 */
	htmlDecode: function(s_html) {
		return $('<div/>').html(s_html).text();
	},
	
	// Movemos el elemento HTML "tagToMove" dentro del elemento HTML "toTag"
	moveTagHtml: function(tagToMove, toTag, bAddToBeginning) {
		/* Ejemplos de uso:
		ui.moveTagHtml("#id_div_contenedor_historico>div", ".bootstrap-dialog-message"); 
		ui.moveTagHtml("#id_div_origen", "#id_div_destino");
		// 
		// Movemos el div que contiene el dataTable de la página HTML al dialog ------
		//URL: https://stackoverflow.com/questions/1279957/how-to-move-an-element-into-another-element
		//   : https://www.elated.com/articles/jquery-removing-replacing-moving-elements/
		//$(".bootstrap-dialog-message").remove(); //.remove() removes the element itself
		$(".bootstrap-dialog-message").empty(); //.empty() removes everything inside an element //Quitamos el s_message = "Procesando..." 
		$("#id_div_contenedor_historico>div").detach().appendTo(".bootstrap-dialog-message"); //añade al final
		//$("#id_div_contenedor_historico>div").detach().prependTo(".bootstrap-dialog-message"); //añade al principio
		*/
		
		// Movemos el elemento HTML "tagToMove" dentro del elemento HTML "toTag" ------
		//URL: https://stackoverflow.com/questions/1279957/how-to-move-an-element-into-another-element
		//   : https://www.elated.com/articles/jquery-removing-replacing-moving-elements/
		//$(toTag).remove(); //.remove() removes the element itself
		//$(toTag).empty(); //.empty() removes everything inside an element //Borramos todo el contenido HTML de "toTag"
		if (bAddToBeginning) {
			$(tagToMove).detach().prependTo(toTag); //añade al principio
		} else {
			$(tagToMove).detach().appendTo(toTag); //añade al final
		}
	},


	//sleep function in js. URL: http://www.sitepoint.com/delay-sleep-pause-wait/
	sleep: function(milliseconds) {
		/*
		var start = new Date().getTime();
		while ((new Date().getTime() - start) < milliseconds) {
			// No hacemos nada, seguimos esperando
		}
		return true;
		*/
	    // Esperamos x milisegundos 
		var d_wait = new Date((new Date()).getTime() + milliseconds);
		ui.date_sleep_until(d_wait);
		return true;
	}, 
	//sleep: function(milliseconds) {
	//
	// date_sleep_until. Espera hasta la "Date" pasada como parámetro
	date_sleep_until: function(d_date) {
		// d_date: es de tipo new Date();
		// returns 1: true
		/* Ejemplo uso 1:
		    // Esperamos 3 segundos 
			var d_wait = new Date((new Date()).getTime() + (3*1000));
			date_sleep_until(d_wait); // espera hasta "d_wait"
		 * Ejemplo uso 2:
		    // Esperamos 5 segundos 
			var d_date = new Date();
			var d_wait = new Date(d_date.getTime() + (5*1000));
			date_sleep_until(d_wait); // espera hasta "d_wait"
		*/
		while (new Date() < d_date) {
			// No hacemos nada, seguimos esperando
		}
		return true;
	}, 
	//date_sleep_until: function(d_date) {
	
	
	zzz: null // último método/propiedad
}; //var ui = {