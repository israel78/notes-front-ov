/*
 * librería "dycec_js.js" con funciones varias para la aplicación
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// iniciamos la librería dycec "dycec_js.js"
	dycec_js.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


// ******************************************************************************************
// vars *************************************************************************************
// ******************************************************************************************

/* 
 * Lista con los nombres de los meses y días en español, para mostrar en los toolTips en "jQuery Flot".
 * Estos arrays están definidos por defecto en inglés en "jquery.flot.time.js"
 * Se usa en la función "dycec_js.jquery_flot_getTick_eje_X_forTooltip"
 * OJO: Enero es 0, Febrero es 1, ..., Diciembre es 11
 *    : Domingo es 0, Lunes es 1, ..., Sábado es 6
 *    
 * NOTA: no lo definimos en objeto "dycec_js" porque ya están definidos jquery.flot.time.js,
 *       lo que hacemos es cambiar los nombres en inglés por español 
 */
//var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
//var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];



//******************************************************************************************
//dycec_js object **************************************************************************
//******************************************************************************************

/**
 * objeto "dycec_js", con varias funciones útiles
 */
var dycec_js = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// vars *************************************************************************************
	// ******************************************************************************************
	//OJOoooo, "${pageContext.request.contextPath}" no es accesible desde un fichero.js
	pageContext_contextPath: "", // a establecer en "includes_app.jsp"
	//monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
	//dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	dayNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
	//
	// Colores por defecto definidos en jquery.flot.js en function "function Plot(placeholder, data_, options_, plugins)"
	//					 0          1          2          3          4
	//					 naran_ama  azul_claro rojo       verde      morado
	colors_jqueryflot: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
	// Colores chillones 
	//colors_chillones_jquery: ["#003366", "#FFBF00", "#663300", "#00CCFF", "#009933"],
	// Degradado azul 
	//colors_jqueryflot: ["#003245","#006476","#0095a7","#00c6da","#009933"],
	//colors_jqueryflot: ["#003245","#FFBF00","#0095a7","#00c6da","#009933"],
    

    
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* iniciamos la librería dycec "dycec_js.js" */
	init_lib: function() {
		try {
			// Evitamos que si no existe console.log() nos pete. URL: http://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function
			if (!window.console) window.console = {};
			if (!window.console.log) window.console.log = function() {};
			
			// init prototypes of Object. Nuevas propiedades que añadimos a objetos JavaScript.
			this.init_prototypes();
			
			// init de librería "numeral.js" 
			this.init_lib_numeral(); //comentado, no usamos "numeral.js" en gum
			
			// iniciamos en español la librería BootstrapDialog "bootstrap-dialog.js"
			this.init_lib_BootstrapDialog();
			
			// ...
		} catch (except) {
			//console.log(except); //except.message, except.fileName, except.lineNumber, except.stack
			console.log("EXCEPTION: " + except.message); //except.message, except.fileName, except.lineNumber, except.stack
		}	
	}, 
	//init_lib: function() {
	
	init_prototypes: function() {
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
		if (typeof String.prototype.endsWith !== 'function') {
			String.prototype.endsWith = function(suffix) {
				return (this.indexOf(suffix, this.length - suffix.length) !== -1);
				//return this.match(suffix+"$") == suffix; //con "regexp", más lento
			}
			String.prototype.startsWith = function(prefix) {
				return (this.indexOf(prefix) === 0);
			}
		}
	},
	//init_prototypes: function() {
	
	init_lib_numeral: function() {
		// lib "numeral.js". Establecemos formato numérico en español. URL: http://numeraljs.com/ 
		try {
			if (typeof numeral === "undefined") { //si la variable no está definida (que no es lo mismo que contenga un valor "undefined") 
				//if ( !numeral ) { --> Norlll, //check for empty strings (""), null, undefined, false and the numbers 0 and NaN
				//console.log("[numeral] is not defined. You must include lib [numeral.js].");
			}
			
			// Cargamos el lenguaje español. "./languages/es.min.js" ... (js importado en "includes_cdm.js" )
			// ...
			// ... y lo ponemos como activo
			numeral.language("es");
		} catch (except) {
			// No se pudo cargar la librería "numeral.js", hay que importarla (<script src="numeral.min.js"></script>) !!!
			/*
			console.log("ERROR ejecutando [numeral.language('es')]. Importar lib [numeral.js] con <script src='numeral.min.js'></script>");
			console.log("EXCEPTION: ", except);
			*/
		}
	}, 
	//init_lib_numeral: function() {
	
	// -------------------------------------------------------------------------------------------
	// BootstrapDialog. //URL: https://nakupanda.github.io/bootstrap3-dialog/ --------------------
	// -------------------------------------------------------------------------------------------
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
	 *  dycec_js.alert(), dycec_js.alert(s_message), dycec_js.alert(s_title, s_message), dycec_js.alert(s_title, s_message, i_type)
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
	//dycec_js.alert(), dycec_js.alert(s_message), dycec_js.alert(s_title, s_message), dycec_js.alert(s_title, s_message, i_type), dycec_js.alert(s_title, s_message, i_type, o_callback_function)
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
			var o_dialog = dycec_js.alertError("ERROR.", "La sesión actual ha caducado.\n\nPulse el botón [Aceptar] para recargar la página principal.");
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
	// dycec_js.alertError(), dycec_js.alertError(s_message), dycec_js.alertError(s_title, s_message)
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
	
	//dycec_js.waitDialog(), dycec_js.waitDialog(s_title), dycec_js.waitDialog(s_title, s_message), dycec_js.waitDialog(s_title, s_message, i_type)
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
		//return dycec_js.alertError("Error al enviar los datos al servidor Web. ", s_msg);
		return this.alertError("Error al enviar los datos al servidor Web. ", s_msg);
	},
	
	/**
	 * "${pageContext.request.contextPath}" para "ficheros.js"
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
	
	//-------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------
	/*
	 * Modificamos el estilo del "flotTip" (toopTip del  jqueryFlot) 
	 *  - el nivel de transparencia/opacity, para que quede más bonito (por defecto, es opaco).
	 *  - aumentamos el tamaño del font, ya que por defecto es muy pequeño
	 * div "flotTip" definido en "jquery.flot.tooltip.js" y se ve con el depurador del Firefox, 
	 * al final del fichero.
	 */
	jquery_flot_flotTip_setCSS: function() {
		/*
		// URL: http://stackoverflow.com/questions/447197/how-to-define-multiple-css-attributes-in-jquery
		// URL: http://stackoverflow.com/questions/8085981/flot-tooltip-placement
		// URL: http://www.pureexample.com/jquery-flot/tooltip-chart.html
		// URL: http://andrewdeponte.com/2009/08/22/flot-multi-series-bar-graph-support.html
		//
		$("<div id='tooltip'></div>").css({
			position: "absolute",
			display: "none",
			border: "1px solid #fdd",
			padding: "2px",
			"background-color": "#fee",
			opacity: 0.80
		}).appendTo("body");
		*/
		/* Modificamos al estilo del "flotTip" (toopTip del  jqueryFlot) el nivel de transparencia/opacity, 
		   para que quede más bonito (por defecto, es opaco).
		 * div "flotTip" definido en "jquery.flot.tooltip.js" y se ve con el depurador del Firefox, 
		   al final del fichero.
		*/
		$("#flotTip").css({
			'z-index': '1071',  /* 'z-index': '1040, --> lo subimos de valor, para que se ponga por encima de los diálogos de bootstrap, que tienen un z-index=1070 */
			'font-size': '1em', /* hacemos la fuente más grande, ya que por defecto es muy pequeña */
			opacity: 0.9        /* grado de opacidad-transparencia */
		});			
	},
	//jquery_flot_flotTip_setCSS: function() {


	//jquery_flot_onPlotHover_showHand ---------------------------------------------------------------
	/*
	// toolTip "maqueado" por nosotros
	function showTooltip_maqueado(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute', display: 'none', top: y + 5, left: x + 5,
			border: '1px solid #fdd', padding: '2px', 'background-color': '#fee', opacity: 0.80
	    }).appendTo("body").fadeIn(200);
	},
	*/
	// Con esto cambiamos el puntero del ratón al pasar sobre el gráfico
	jquery_flot_onPlotHover_showHand: function(event, pos, item) {
		/* 
		//  Mostramos un toolTip "maquetado" por nosostros
		//$("#tooltip").remove();
		if (item) {    
			var x = item.datapoint[0].toFixed(2),y = item.datapoint[1].toFixed(2);
			showTooltip_maqueado(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
		}
		*/
		if(item) {
			//puntero como "mano" para mostrar que se puede hacer click
			document.body.style.cursor = 'pointer'; 
		} else {
			document.body.style.cursor = 'default';
		}			
	},
	//jquery_flot_onPlotHover_showHand: function(event, pos, item) {
	//
	/* Ejemplo de uso
	$("#id_flotcontainer").bind("plothover", function (event, pos, item) {
		// Cambiamos el puntero del ratón al pasar sobre el gráfico, para que se vea que se puede hacer "click"
		dycec_js.jquery_flot_onPlotHover_showHand(event, pos, item);
	});
	$("#id_placeholder_num_inc").bind("plothover", function (event, pos, item) {
		// Cambiamos el puntero del ratón al pasar sobre el gráfico, para que se vea que se puede hacer "click"
		dycec_js.jquery_flot_onPlotHover_showHand(event, pos, item);
	});
	*/
	//End. jquery_flot_onPlotHover_showHand -----------------------------------------------------------


	// jquery_flot_getTooltip ----------------------------------------------------------------------
	/*
	 * Devuelve un toolTip más elegante (colores, transparente, ...) que el que muestra por 
	 * defecto el jquery.Flot si no definimos tooltipOpts; {content: ...}
	 * (defecto: "label_leyenda | X: valor_x | Y: valor_y)
	 */
	//jquery_flot_getTooltip: function(label, x, y, item) {
	jquery_flot_getTooltip: function(label, x, y, item, o_plot) {
		//alert("dycec_js.jquery_flot_getTooltip. label: " + label + ", x: " + x + ", y: " + y + ", item: " + item + ", o_plot: " + o_plot);
		/* 
		// URL: http://stackoverflow.com/questions/21354196/setting-label-for-tooltip-in-flot-based-on-x-axis-value
		// URL: http://stackoverflow.com/questions/18184013/how-to-set-x-axis-value-as-tooltip-in-flot-charts-textual-data
		// URL: http://andrewdeponte.com/2009/08/22/flot-multi-series-bar-graph-support.html
		*
		* Queremos un toolTip como este (tenemos un gráfico con 3 líneas):
			Num. preventivos: 1.000 (o "Num. ejecutados: 990" o "% Cumplimiento	: 98,00") (= punto de la línea seleccionada con el ratón)
			2014/12/31
			Num. preventivos: 1.000
			Num. ejecutados	: 990
			% Cumplimiento	: 98,00
		*/

		var datos = o_plot.getData();
		//var ticks_eje_x = o_plot.getOptions().xaxis.ticks;
		var s_label = label;	//Num. preventivos, Num. ejecutados en plazo, % Cumplimiento 
		var s_tooltip = "<table>";
		if (datos.length > 1) { 
			//"<tr> <td>" + s_label + "</td><td>:</td><td>" + y + "</td> </tr>" +
			// punto seleccionado: "valor leyenda : valor eje_Y" ----------------------
			//"<tr> <td>Num. preventivos</td><td>: </td><td>1.000</td> </tr>" +
			//s_tooltip = s_tooltip + "<tr> <td>" + s_label + ": " + this.formatNumber_spanish(y) + "</td> </tr>";
			s_tooltip = s_tooltip + "<tr style='color: " + this.rgb2hex(datos[item.seriesIndex].color) + ";'> <td>" + s_label + ": " + this.formatNumber_spanish(y) + "</td> </tr>";
		}
		// etiqueta del eje_X: "valor eje_X" --------------------------------------
		//"<th colspan='3'>" + item.series.xaxis.ticks[item.dataIndex].label + "</th>";
		//"<th colspan='3'>" + x.toLocaleDateString() + "</th>";
		s_tooltip = s_tooltip + "<th colspan='3'><u>" + this.jquery_flot_getTick_eje_X_forTooltip(label, x, y, item, o_plot) + "</u></th>";
		//... mostramos todos los datos de esta posicion --> lo hacemos con un for
		for ( iIndex = 0; iIndex < datos.length; iIndex++ ) {
			//"valor leyenda : valor eje_Y" -------------------------------------------
			//"<tr style="color: red;"> <td>Num. preventivos</td><td>:</td><td>1.000</td> </tr>"
			//"<tr style="color: #FF0000;"> <td>Num. preventivos</td><td>:</td><td>1.000</td> </tr>"
			//s_tooltip = s_tooltip + "<tr> <td>" + datos[iIndex].label + "</td><td>:</td><td>" + this.formatNumber_spanish(datos[iIndex].data[item.dataIndex][1]) + "</td> </tr>";
			//s_tooltip = s_tooltip + "<tr style=\"color: " + this.rgb2hex(datos[iIndex].color) + ";\"> <td>" + datos[iIndex].label + "</td><td>:</td><td>" + this.formatNumber_spanish(datos[iIndex].data[item.dataIndex][1]) + "</td> </tr>";
			s_tooltip = s_tooltip + "<tr style='font-weight: bold; color: " + this.rgb2hex(datos[iIndex].color) + ";'> <td>" + datos[iIndex].label + "</td><td>:</td><td>" + this.formatNumber_spanish(datos[iIndex].data[item.dataIndex][1]) + "</td> </tr>";
		}
		s_tooltip = s_tooltip + "</table>";
		/*
		s_tooltip = "<table>" +
			"<tr> <td>Num. preventivos: 1.000</td> </tr>" +
			"<th colspan='3'>2014/12/28</th>" +
			"<tr> <td>Num. preventivos</td><td>:</td><td>1.000</td> </tr>" +
			"<tr> <td>Num. ejecutados</td><td>:</td><td>900</td> </tr>" +
			"<tr> <td>% Cumplimiento</td><td>:</td><td>90,00</td> </tr>" +
		"</table>";
		*/
	    //return "x: " + x + "<br>, y: " + y + ", label: " + label; 
	    return s_tooltip;
	}, 
	//jquery_flot_getTooltip: function(label, x, y, item, o_plot) {
	
	// Devuelve el valor del eje X a mostrar en el toolTip
	jquery_flot_getTick_eje_X_forTooltip: function(label, x, y, item, o_plot) {
		//this.alert(JSON.stringify(item));
		/*
		//alert("dycec_js.jquery_flot_getTick_eje_X_forTooltip. label: " + label + ", x: " + x + ", y: " + y + ", item: " + item + ", o_plot: " + o_plot);
		console.log("dycec_js.jquery_flot_getTick_eje_X_forTooltip. label: " + label + ", x: " + x + ", y: " + y + ", item: " + item + ", o_plot: " + o_plot);
		//console.log("o_plot.getOptions().xaxis.ticks.length: " + o_plot.getOptions().xaxis.ticks.length);
		console.log("item.series.xaxis.ticks.length: " + item.series.xaxis.ticks.length);
		console.log("item.series.data.length: " + item.series.data.length);
		console.log("index_x:" + (x/item.series.data.length*item.series.xaxis.ticks.length));
		*/
		// por defecto, devolvemos el valor "X" del "eje_x", que es un valor numérico
		var o_return = x; 
		
		var eje_x = o_plot.getOptions().xaxis; 
		//var ticks_eje_x = [[1, "Enero"], [2, "Febrero"], [3, "Marzo"], [4, "Abril"], ..., [12, "Diciembre"]];
		var ticks_eje_x = o_plot.getOptions().xaxis.ticks;
		//alert("dycec_js.jquery_flot_getTick_eje_X_forTooltip. ticks_eje_x: " + ticks_eje_x);
		//alert("dycec_js.jquery_flot_getTick_eje_X_forTooltip. item.series.xaxis.ticks.length: " + item.series.xaxis.ticks.length);
		//alert("dycec_js.jquery_flot_getTick_eje_X_forTooltip. ticks_eje_x.length: " + ticks_eje_x.length);
		if (ticks_eje_x) {
			// Si tenemos ticks (string_label para valores en el ejeX) para el eje configurados por el usuario, cogemos su valor 
			/*
			ticks_eje_x[item.dataIndex][0] = item.series.xaxis.ticks[item.dataIndex].v     : valor númerico real en el eje_X del item
			ticks_eje_x[item.dataIndex][1] = item.series.xaxis.ticks[item.dataIndex].label : string_label asignado a este item en el eje_X
			*/
			//o_return = ticks_eje_x[item.dataIndex][1]; //Comentado, podemos tener más datos que ticksX o viceversa
			var f_index_ticksX = (x/item.series.data.length*item.series.xaxis.ticks.length); 
			var i_index_ticksX = Math.floor(f_index_ticksX); 
			if ( (i_index_ticksX == f_index_ticksX) ) {
				//o_return = ticks_eje_x[item.dataIndex][1];
				o_return = ticks_eje_x[i_index_ticksX - 1][1];
			} else {
				//o_return = "";
			}
		} else if (eje_x.mode == "time") {
			// Si hemos introducido una fecha_javascript en el eje_x y hemos dicho que es de tipo "time" (fecha)  
			/* 
			d_date = new Date(2015, 0, 1); //2015/01/01.
			d_date.toLocaleDateString() = "1/1/2015"
			d_date.toLocaleTimeString() = "00:00:00"
			d_date.toLocaleString() = "1/1/2015 00:00:00"
			d_date.toString() = "Fri Jan 23 2015 12:58:02 GMT+0100"
			*/
			//o_return = o_return.toLocaleDateString();
			//o_return = $.plot.formatDate(o_return, fmt, monthNames, dayNames);
			//o_return = $.plot.formatDate(o_return, "%Y/%m/%d", null, null);
			//o_return = $.plot.formatDate(o_return, eje_x.timeformat, null, null);
			o_return = $.plot.formatDate(o_return,  eje_x.timeformat, monthNames, dayNames);
		} else {
			// formateamos el número ó fecha en formato "español"
			o_return = this.formatNumber_spanish(o_return);	
		}
		
		//alert("dycec_js.jquery_flot_getTick_eje_X_forTooltip. o_return: " + o_return);
		return o_return;
	}, 
	//jquery_flot_getTick_eje_X_forTooltip: function(label, x, y, item, o_plot) {

	/* <%-- <!-- Comentado, esto está puesto como ayuda para ver todos los casos ---------------------
	jquery_flot_getTooltip: function(label, x, y, item) {
//	    // URL: http://stackoverflow.com/questions/21354196/setting-label-for-tooltip-in-flot-based-on-x-axis-value
//	    // URL: http://stackoverflow.com/questions/18184013/how-to-set-x-axis-value-as-tooltip-in-flot-charts-textual-data
//	    // URL: http://andrewdeponte.com/2009/08/22/flot-multi-series-bar-graph-support.html
	//    
//	    label = mes_0, mes_1, .., Ejecutadas = leyenda
//	    x = 1..12 (tenemos 12 datos en el eje_x, añadidos como 1, 2, .., 12)
//	    y = num_actuaciones para cada serie (valor en el eje_y del dato)
//	    item.dataIndex    = 0..11 = index_en_el_array_datos. tenemos 12 datos en el eje_x.
//	    item.datapoint[0] = x = 1..12 = valor_x_en_el_array_datos [[x_0, y_0], .., [x_11, y_11]]
//	    item.datapoint[1] = y         = valor_y_en_el_array_datos [[x_0, y_0], .., [x_11, y_11]]
//	    item.datapoint    = pareja_valores [x, y] anterior
//	    item.series.label = label = label_leyenda = mes_0, mes_1,.., mes_11, Planificadas, Ejecutadas
//	    item.pageX = pos_x_del_tooltip
//	    item.pageY = pos_y_del_tooltip
//	    //
//	    item.seriesIndex = 0..13 = índice de la serie en los datos de "plot_1.getData()". Tenemos 14 series de datos (14 leyendas: mes_0, mes_1,.., mes_11, Planificadas, Ejecutadas). 
//	    item.series.index_serie = item.seriesIndex = 0..13 = propiedad creada por nosotros para facilitar las cosas 
//	    item.series.data = serie de datos = lista de pareja_valor [x, y] de la series mes_0 ó mes_1 ó ... Ejecutadas
//	    item.series.data = data_evolucion[item.seriesIndex].data = plot_1.getData()[item.seriesIndex].data
//	    item.series.xaxis.ticks[item.dataIndex].label = Enero..Diciembre = label_eje_X = ticks_eje_x[item.dataIndex][1] = plot_1.getOptions().xaxis.ticks[item.dataIndex][1]
//	    item.series.xaxis.ticks[item.dataIndex].v = x = ticks_eje_x[item.dataIndex][0] = plot_1.getOptions().xaxis.ticks[item.dataIndex][0]
//	    plot_1.getOptions().xaxis.ticks = ticks_eje_x = lista de pareja_valor [x, "label_x"] del eje_x 
//	    //
//	    data_evolucion.length = plot_1.getData().length = 14 = num_total de series
//	    data_evolucion[0].data.length = la serie_0 ("mes_0") tiene 12 datos = 12 pareja de valores [x, y].
//	    data_evolucion[0].data = plot_1.getData()[0].data = 12 pareja_valores [x, y] de la serie_0 "mes_0"
//	    data_evolucion[1].data = plot_1.getData()[1].data = 12 pareja_valores [x, y] de la serie_1 "mes_1"
//	    ...
//	    data_evolucion[12].data = plot_1.getData()[1].data = 12 pareja_valores [x, y] de la serie_12 "Planificadas"
//	    data_evolucion[13].data = plot_1.getData()[1].data = 12 pareja_valores [x, y] de la serie_13 "Ejecutadas"
//	    //
//	    // Ojo !!!!!, data_evolucion[0] no tiene la propiedad "seriesIndex", por eso creamos "index_serie"
//	    data_evolucion[0].index_serie = 0 = plot_1.getData()[0].index_serie = propiedad creada por nosotros
//	    data_evolucion[1].index_serie = 1 = plot_1.getData()[1].index_serie = propiedad creada por nosotros
//	    ...
//	    data_evolucion[11].index_serie = 11 = plot_1.getData()[11].index_serie = propiedad creada por nosotros
//	    data_evolucion[12].index_serie = 12 = plot_1.getData()[12].index_serie = propiedad creada por nosotros
//	    data_evolucion[13].index_serie = 13 = plot_1.getData()[13].index_serie = propiedad creada por nosotros

		var s_text = "x: " + x + ", y: " + y + ", label: " + label +
	    	"\n item.dataIndex: " + item.dataIndex +
	    	"\n item.datapoint: " + item.datapoint +
	        "\n item.series.label: " + item.series.label +
	        "\n item.series.xaxis.ticks[item.dataIndex].label: " + item.series.xaxis.ticks[item.dataIndex].label + 
	        "\n item.series.xaxis.ticks[item.dataIndex].v: " + item.series.xaxis.ticks[item.dataIndex].v + 
	        "\n item.series.data: " + item.series.data + 
	        "\n item.seriesIndex: " + item.seriesIndex + 
	        "\n item.series.index_serie: " + item.series.index_serie +
	        "\n" + 
	        "\n data_evolucion.length: " + data_evolucion.length + 
	        "\n data_evolucion[0].data: " + data_evolucion[0].data + 
	        "\n data_evolucion[1].data: " + data_evolucion[1].data + 
	        "\n plot_1.getData().length: " +  plot_1.getData().length +
	        "\n plot_1.getData()[0].data: " + plot_1.getData()[0].data + 
	        "\n plot_1.getData()[1].data: " + plot_1.getData()[1].data + 
	        "\n plot_1.getData()[0].index_serie: " + plot_1.getData()[0].index_serie + 
	        "\n plot_1.getData()[1].index_serie: " + plot_1.getData()[1].index_serie + 
	        "\n --------------------------"; 
	    alert("dycec_js.jquery_flot_getTooltip. s_text: " + s_text);
	    //return "x: " + x + "<br>, y: " + y + ", label: " + label; 
	},
	--> --%> */
	//End. jquery_flot_getTooltip ----------------------------------------------------------------------


	/*
	 * Convert RGB to Hex Colour Values.
	 * URL: http://www.sitepoint.com/jquery-convert-rgb-hex-color/
	 *      http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *      http://jsfiddle.net/Mottie/xcqpF/1/light/
	 */
	rgb2hex: function(rgb) {
		//alert( "dycec_js.rgb2hex. rgb: " + rgb);
	    //if (rgb.substr(0, 1) == "#") {
	    if (rgb.substr(0, 1) === "#") {
	    	// "rgb" ya está en formato hexadecimal "#FFFFFF" !!!!!
	        return rgb;
	    }	
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		//alert( "dycec_js.rgb2hex. rgb.match: " + rgb + ", rgb[0]: " + rgb[0] + ", rgb[1]: " + rgb[1] + ", rgb[2]: " + rgb[2] + ", rgb[3]: " + rgb[3]);
		var s_hex = "#" +
			("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
		//alert( "dycec_js.rgb2hex. s_hex: " + s_hex);
		return s_hex;
	},
	//
	r_g_b2hex: function(r, g, b) {
		var s_hex = "#" + this.word2hex(r) + this.word2hex(g) + this.word2hex(b);
		return s_hex;
	},
	//
	word2hex: function(word) {
		var hex = word.toString(16);
		var s_hex = ((hex.length == 1) ? "0" + hex : hex);
		return s_hex;
	},

	/**
	 * Generate lighter/darker color using javascript.
	 *  
	 * hex: a hex color value such as “#abc” or “#123456” (the hash is optional)
	 * lum: the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
	 * 
	 * URL: http://stackoverflow.com/questions/16787880/how-can-we-maker-color-darker-than-given-color-in-jquery
	 *      http://www.sitepoint.com/javascript-generate-lighter-darker-color/
	 *      http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript
	 */
	colorLuminance: function(hex, lum) {
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	},
	//colorLuminance: function(hex, lum) {
	
	
	/**
	 * Devuelve el valor máximo a establecer en el ejeY de un gráfico jquery.flot, morris.js, 
	 * para reajustar la escala a un valor proximo a "i_ValueMax". 
	 * i_ValueMax: valor máximo de todos los valores mostrados en el gráfico
	 */
	jquery_flot_ejeY_getYMax: function(i_ValueMax) {
		var sNumber = i_ValueMax.toString();
		//var i_number = parseInt(sNumber);   //parseInt("10.0") = 10;   //parseInt("10.1") = 10;
		//var f_number = parseFloat(sNumber); //parseFloat("10.0") = 10; //parseFloat("10.1") = 10.1;
		//var iCeros = sNumber.length - 1; //Esto es el ajuste de morris.js
		var iCeros = sNumber.length - 2;   
		var iDiez = Math.pow(10, iCeros);
		//var i_ymax = (Math.round(i_ValueMax/1000)*1000);
		var i_ymax = (Math.round(i_ValueMax/iDiez)*iDiez);
		//alert("sNumber: " + sNumber + ", round_sNumber: " + i_ymax + ", iDiez: " + iDiez );
		
		// Si 'ymax' es '0', lo ponemos a '10', para que el 'ymin' no sea '-1.0' y quede más bonita la escala del eje_y
		if ( i_ymax == 0 ) {
			i_ymax = 10;
		}
		return i_ymax;
	}, 
	//jquery_flot_ejeY_getYMax: function(i_ValueMax) {



	/**
	 * Devuelve el valor a pintar encima de los puntos de un gráfico jquery_flot
	 * con los números en formato español.
	 * Los valores "0" no los pinta, para dejar el gráfico más limpio,
	 * 
	 * Se llamará desde la propidad:
	 *   valueLabels: {
	 *   	...
	 *   	labelFormatter: function (v) {
	 *   		return dycec_js.jquery_flot_getLabelFormater_forValues(v);
	 *   		return dycec_js.jquery_flot_getLabelFormater_forValues(v, "0,00.00");
	 *   		return dycec_js.jquery_flot_getLabelFormater_forValues(v, "0,00.00", " %");
	 *   	}
	 *   	...
	 *   } 
	 
	 * v: dato del gráfico a formatear 
	 */
	jquery_flot_getLabelFormater_forValues: function(v, s_format, s_sufijo) { //NOTA: 'v' es una var de tipo texto
		//return (+v).toFixed(1); //con 1 decimal
		var s_return;
		
		if ( !(+v) ) { //!x: check for empty strings (""), null, undefined, false and the numbers 0 and NaN
			// "+v", para forzar número y así poder ver si es 0 ó 0.0
			// Los "0" no los pintamos, para dejar el gráfico más limpio
			s_return = "";
		} else if ( !s_format ) { //!s_format: check for empty strings (""), null, undefined, false and the numbers 0 and NaN
			// NOTA: 'v' es una var de tipo texto, lo multiplicamos por "1*v" ó "+v", para forzar número
			s_return = this.formatNumber_spanish(+v);
		} else {
			s_return = this.formatNumber(v, s_format);
		}
		
		// Si tenemos sufijo, lo añadimos
		if ( (!!s_return && !!s_sufijo) ) {
			s_return = s_return + s_sufijo;
		}
		
		return s_return
	},
	//jquery_flot_getLabelFormater_forValues: function(v, s_format, s_sufijo) {


	/*
	 * Devuelve la fecha formatada con formato "yyyy/MM/dd"
	 * d_fecha: variable de tipo fecha-Javascript ó fecha-Java
	 *          var d_fecha = new Date();
	 *          var d_fecha = new Date(year, month, day, hours, minutes, seconds, milliseconds);
	 */
	formatDate_yyyy_mm_dd: function(d_fecha) {
		//alert(d_fecha);
		//var d_fecha = new Date();

		var i_day = d_fecha.getDate();
		var i_month = d_fecha.getMonth() + 1; //'+1': Enero es 0, Febrero es 1,...
		var i_year = d_fecha.getFullYear();
		var s_fecha = i_year + "/" + i_month + "/" + i_day;
		//alert("Formato_Fecha ="+ s_fecha);
		
		/* Ejemplo: 2012/1/1
		var d_fecha = new Date(2012, 0, 1);
		var i_day = d_fecha.getDate(); //=1
		var i_month = d_fecha.getMonth() + 1; //=1 //'+1': Enero es 0, Febrero es 1,...
		var i_year = d_fecha.getFullYear(); //=2012
		var i_time = d_fecha.getTime(); //=1325347200000 --> number of milliseconds since midnight Jan 1, 1970
		*/

		return s_fecha;				
	},
	//formatDate_yyyy_mm_dd: function(d_fecha) {


	// Comprueba si "v_number" (puede ser texto/número) es un int, float, ...
	isInt: function(v_number) {
		return (parseInt(v_number, 10) == v_number);
		//return (v_number % 1 == 0);
	},
	//
	isFloat: function(v_number) {
		return (parseFloat(v_number, 10) == v_number);
	},
	//isFloat: function(v_number) {
	
	/* 
	 * Devuelve un número formateado en español: 
	 * 	- Si "x" es tipo número: texto formateado con separador de miles y hasta 3 dígitos decimales.
	 * 	  ej: "1.000"  ó  "1.000,1"  ó  "1.000,12" ó  "1.000,123" en función del número pasado
	 * 	- Si "x" es tipo Date: texto formateado como "d/M/yyyy hh:mm:ss"
	 * 	  ej: "1/1/2015 00:00:00"
	 *      
	 * 
	 * Otra opción mucho más potente sería usar el librería "numeral.js" ó "jquery.numberformatter".
	 * 	URL: https://code.google.com/p/jquery-numberformatter/
	 */
	formatNumber_spanish: function(x) {
		//if ( !x ) { //!x: check for empty strings (""), null, undefined, false and the numbers 0 and NaN
		if ( !x && ((+x) != 0) ) { //!x: check for empty strings (""), null, undefined, false and the numbers 0 and NaN
			     //((+x) != 0) ó (parseFloat(x) != 0) --> los "0" si que debemos formatearlos !!! 
			return "";
		}
		
		//x = x.toLocaleString();         //en función de lo configurado en el PC, o sea, español
		//x = x.toLocaleString('es');     //español : 1 000,123 - hasta 3 decimales.
		x = x.toLocaleString('it');       //italiano: 1.000,123 - hasta 3 decimales
		//x = (1*x).toLocaleString('it'); //lo multiplicamos por "1", para forzar número
		//x = (+x).toLocaleString('it');  //+x, para forzar número

		// Si queremos solo dos decimales, en lugar de 3 posibles
		//x = x.toFixed(2); //con 2 decimales
		
	    return x;
	}, 
	//formatNumber_spanish: function(x) {

	/**
	 * Formatea él número "x" según el formato "s_formal".
	 * El separador de millar (".") y decimal (",") está español , ya que la librería
	 * "numeral.js" se ha configurado al cargarse este fichero.js como "numeral.language('es')" 
	 * --> español.
	 * 
	 * Usa "numeral.js". URL: http://numeraljs.com/
	 * Ej.: formato puntos miles + 2 decimales: s_format = "0,0.00".
	 *      s_number = dycec_js.formatNumber(1000.1, "0,0.00"); //s_number = 1.000,10 
	 *      s_number = dycec_js.formatNumber(1000.1);           //s_number = 1.000 
	 *      s_number = dycec_js.formatNumber(0);                //s_number = 0 
	 */
	formatNumber: function(x, s_format) {
		var s_number;
		//var s_number = numeral(1000.1).format('0,0.00'); //s_number = 1.000,10
		
		//URL: http://stackoverflow.com/questions/6003884/how-do-i-check-for-null-values-in-javascript
		if ( !x && ((+x) != 0) ) { //!x: check for empty strings (""), null, undefined, false and the numbers 0 and NaN
				 //((+x) != 0) ó (parseFloat(x) != 0) --> los "0" si que debemos formatearlos !!! 
			s_number = "";
		} else {
			s_number = numeral(x).format(s_format);
		}
		return s_number;
	}, 
	//formatNumber: function(x, s_format) {


	/* 
	 * Rellena "number" con ceros por la izquierda hasta que el string resultante
	 * tenga "targetLength" dígitos 
	 * 	- ej: leftPad(1, 2)  --> devuelve "01"
	 * 	-     leftPad(12, 4) --> devuelve "0012"
	 * 
	 * Otra opción mucho más potente sería usar el librería "jquery.numberformatter".
	 * 	URL: https://code.google.com/p/jquery-numberformatter/
	 */
	leftPad: function(number, targetLength) {
	    var output = number + '';
	    while (output.length < targetLength) {
	        output = '0' + output;
	    }
	    return output;
	}, 
	//leftPad: function(number, targetLength) {


	/**
	 * Convierte un texto_numero (con formato español) en un número javascript (=en formato inglés)
	 * URL: http://www.masquewordpress.com/convertir-cadenas-de-texto-en-numeros-en-javascript/
	 */
	textSpanish_toNumber: function(s_text) {
		// Quitamos posibles separadores de millar "." (/gi: g:todos, i:case_insensitive)
		//var s_number = s_text.replace("/./gi", ""); //1.234.567,89 --> 1234567,89
		var s_number = s_text.replace( /\./gi, "");   //1.234.567,89 --> 1234567,89
		// Reemplazamos separador decimal "," por ".". Solo reemplazamos la 1ª ocurrencia
		//s_number = s_number.replace(",", "."); //1234567,89   --> 1234567.89
		s_number = s_number.replace(/,/, ".");   //1234567,89   --> 1234567.89
		
	    // Devolvemos como number. URL: http://www.w3schools.com/jsref/jsref_parsefloat.asp
		// parseFloat("10.0") = 10;  parseFloat("10.01") = 10.01
		return parseFloat(s_number);
	}, 
	//textSpanish_toNumber: function(s_text) {	


	//sleep function in js. URL: http://www.sitepoint.com/delay-sleep-pause-wait/
	sleep: function(milliseconds) {
		var start = new Date().getTime();
		while ((new Date().getTime() - start) < milliseconds) {
			// No hacemos nada, seguimos esperando
		}
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
			date_sleep_until(d_wait) // espera hasta "d_wait"
		 * Ejemplo uso 2:
		    // Esperamos 5 segundos 
			var d_date = new Date();
			var d_wait = new Date(d_date.getTime() + (5*1000));
			date_sleep_until(d_wait) // espera hasta "d_wait"
		*/
		while (new Date() < d_date) {
			// No hacemos nada, seguimos esperando
		}
		return true;
	}, 
	//date_sleep_until: function(d_date) {
	
	
	/**
	 * Devuelve una fecha Javascript.
	 * Ejemplos de uso:
	 *   dycec_js.date();             //fecha/hora actual
	 *   dycec_js.date(2015, 12, 31); //2015/12/31 00:00:00
	 *   dycec_js.date(2015, 12, 31, 23, 59, 59); //2015/12/31 23:59:59
	 * 
	 * URL: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date
	 * URL: http://albertovilches.com/profundizando-en-javascript-parte-1-funciones-para-todo
	 *      http://albertovilches.com/profundizando-en-javascript-parte-2-objetos-prototipos-herencia-y-namespaces
	 *      http://geeks.ms/blogs/etomas/archive/2013/10/25/191-es-javascript-orientado-a-objetos.aspx
	 *      //
	 *      https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos
	 *      https://www.video2brain.com/es/tutorial/polimorfismo-en-javascript
	 */
	date: function(i_year, i_month, i_day, i_hour, i_min, i_seg) {
		if (i_seg) { //if ( arguments[5] ) { //if ( (arguments.length >= 6) ) {
			//dycec_js.date(2015, 12, 31, 23, 59, 59);
			return new Date(i_year, i_month - 1, i_day, i_hour, i_min, i_seg, 0);
		} else if (i_day) { //if ( arguments[2] ) { //if ( (arguments.length >= 3) ) {
			//dycec_js.date(2015, 12, 31);
			return new Date(i_year, i_month - 1, i_day);
		} else {
			//dycec_js.date();
			return new Date();
		}
		//return new Date(i_year, i_month - 1, i_day).getTime(); //milisegundos transcurridos desde las 00:00:00 UTC del 1 de enero de 1970.
		//
		//return Date();     //fecha/hora actual: 'Wed Dec 16 2015 10:47:12 GMT+0100 (Hora estándar romance)'
		//return Date.now(); //fecha/hora actual: 1450259243498. milisegundos transcurridos desde las 00:00:00 UTC del 1 de enero de 1970.
	},
	//date: function(i_year, i_month, i_day, i_hour, i_min, i_seg) {
	
	/**
	 * Convierte un string_boolean ("true", "false", "") en un boolean (true/false)
	 */
	strToBool: function(s_bool) {
		return ((s_bool.toLowerCase() == "true") ? true : false);
	}, 
	//strToBool: function(s_bool) {
	
	
	/** 
	 * Split a string into an array of substrings and return substring i_index (i_index=0, 1, 2, ...)
     * Ejemplos de uso:
     *  s_str = "How,are,you,doing,today?";	
     *  strOfSplit(s_str, ",", 0) = "How"
     *  strOfSplit(s_str, ",", 1) = "are"
     *  strOfSplit(s_str, ",", 10) = ""
     *  strOfSplit(s_str, "|", 0) = "How,are,you,doing,today?"
	*/
	strOfSplit: function(s_str, s_separator, i_index) {
		var s_return = "";
		
		if ( s_str ) {
			// partimos el string
			var a_str = s_str.split(s_separator);
			if ( a_str[i_index] ) {
				s_return = a_str[i_index]; //i_index=0, 1, ... OJO, empieza en 0!!
			}
		}

		return s_return;	
	},
	//strOfSplit: function(s_str, s_separator, i_index) {
	
	/** 
	 * str_endsWith, para poder usarla en IExplorer, que no la tiene, al contrario que Firefox y Chrome.
	 * URL: http://stackoverflow.com/questions/280634/endswith-in-javascript
     * Ejemplos de uso:
     *  s_str = "How,are,you,doing,today?";	
     *  dycec_js.str_endsWith(s_str, "today?") = true
     *  dycec_js.str_endsWith(s_str, "doing")  = false
     * Return:
     *  true:  si string "s_str" finaliza con el string "s_suffix" 
     *  false: si string "s_str" no finaliza con el string "s_suffix"
     *  
     * NOTA: también hemos añadido al objeto genérico JS "String" en este módulo el prototipo
     *       genérico "endsWith" en la función "dycec.init_prototypes()"
	*/
	str_endsWith: function(s_str, s_suffix) {
		return (s_str.indexOf(s_suffix, s_str.length - s_suffix.length) !== -1);
	},
	//str_endsWith: function(s_str, s_suffix) {
	
	
	/** 
	 * Selecciona en un <select> "select2.js" el value "s_val".
     * Ejemplo de uso: 
     *  dycec_js.select2_select_val($("#id_select_estado_inc"), "28");
     *  dycec_js.select2_select_val($("#id_select_estado_inc"), "");
     *  
     *  <select id="id_select_provincia" class="select2 span">
	 *		<option value="">&nbsp;</option> <!-- ponemos "&nbsp;" (blank) para que la línea en blanco tenga la misma altura que el resto de opciones. -->
	 *		<option value="01">Alava</option>
	 *		...
	 *		<option value="27">Lugo</option>
	 *		<option value="28" selected>Madrid</option>
	 *		<option value="29">Málaga</option>
     *  </select>
     * ---------------------------------------------------------------------------------
     * Ejemplo de obtención del valor seleccionado en un combo select (select2, ...): 
     *  var s_val  = $("#id_select_daga").val();                  //Cogemos el ".val". <option value='2'>dos</option> --> obtenemos "2"
     *  var s_text = $("#id_select_daga option:selected").text(); //Cogemos el ".text". <option value='2'>dos</option> --> obtenemos "dos"
     *
     * Ejemplo de marcar la selección en un combo select (select2, ...): 
     *  // Seleccionamos por ".val". <option value='2'>dos</option> --> seleccionamos "2"
     *  $("select#id_select_daga").val(s_value); //con select visible, pero NO OCULTO !!!
     *  ó
     *  $("#id_select_daga option[value=" + s_value + "]").attr("selected", true); //con select visible y oculto
     *  
     *  // Seleccionamos por ".text". <option value='2'>dos</option> --> seleccionamos "dos". Valido para jquery >= 1.9					
     *  $('#id_select_daga option').filter(function () {
     *  	return $(this).text() == s_value;
     *  }).attr("selected", true);
     *  // End. Seleccionamos en el comboBox por su .text() --------------
	 */
	select2_select_val: function(o_select2, s_val) {
		// Con este "if" subsanamos el "bug" del select2 que no muestra bien la selección si value=""
		if (s_val == "") {
			o_select2.val(" ").change();
		}
		// Seleccionamos el "value"
		o_select2.val(s_val).change(); //OJOoo, .val("...").change() ó .val("...").trigger("change") con "select2"; Nooooo .val("...")
	},
	//select2_select_val: function(o_select2, s_val) {
	
	zzz: null // último método/propiedad
}; //var dycec_js = {