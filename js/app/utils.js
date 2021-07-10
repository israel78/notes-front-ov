/*
 * librería "utils.js" con funciones varias de utilidades (string, ...)
 * 
 * LINT. Online javascript code check.
 * URL: http://www.javascriptlint.com/online_lint.php
 */


//------------------------------------------------------------------------------------------
// Esto se ejecuta una vez se cargue completamente la página HTML que incluye este ".js"
$(function () {
	// iniciamos la librería "utils.js"
	utils.init_lib();
}); //$(function () {
//------------------------------------------------------------------------------------------


// ******************************************************************************************
// vars *************************************************************************************
// ******************************************************************************************


//******************************************************************************************
//utils object **************************************************************************
//******************************************************************************************

/**
 * objeto "utils", con varias funciones varias de utilidades (string, ...)
 */
var utils = {
	property_1: "",
	function_1: function() {
		//...
	},

	// ******************************************************************************************
	// vars *************************************************************************************
	// ******************************************************************************************
	//s_var1: "", 

    
	// ******************************************************************************************
	// functions ********************************************************************************
	// ******************************************************************************************
	/* iniciamos la librería dycec "utils.js" */
	init_lib: function() {
		try {
			// init prototypes of Object. Nuevas propiedades que añadimos a objetos JavaScript.
			this.init_prototypes();
			
			// init lib lib_1 ...
			//this.init_lib_1();
			
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
		
		/* Añadimos el prototipo "startsWith", "endsWith", "contains" al objeto String para el IExplorer, que no lo tiene si IExplorer < 12.0.
		 * SOLUCION_1: lib "string.js" //URL: https://github.com/jprichardson/string.js/
		               S("...").startsWith("% Cumplimiento")  
		   SOLUCION_1: la añadimos a String.prototype si no existe
		 * URL: http://stackoverflow.com/questions/280634/endswith-in-javascript
		   URL: http://rickyrosario.com/blog/javascript-startswith-and-endswith-implementation-for-strings/
		   URL: https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
		 * 
		 * NOTA 1: este prototipo lo tiene el JS de Firefox, Chrome, pero no el IExplorer !!!.
		 *         Ahora, ya podemos hacer en IExplorer esta llamada:
		 *         "How,are,you,doing,today?".endsWith("today?")
		 */
		//if (typeof String.prototype.startsWith === 'undefined') {
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function (arg) {
				return this.indexOf(arg) == 0;
				//return !!~this.indexOf(arg);
				//return this.match("^" + suffix) == suffix; //con "regexp", más lento
			};
		}
		if (typeof String.prototype.endsWith !== 'function') {
			String.prototype.endsWith = function(suffix) {
				return (this.indexOf(suffix, this.length - suffix.length) != -1);
				//return this.match(suffix+"$") == suffix; //con "regexp", más lento
			};
		}
		if (!String.prototype.contains) { //"contains" no lo tiene ningún navagador
			String.prototype.contains = function(suffix) {
				return (this.indexOf(suffix) != -1); //URL: https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
				//return this.match(suffix) == suffix; //con "regexp", más lento
			};
		}
		
	},
	//init_prototypes: function() {
	
	zzz: null // último método/propiedad
}; //var utils = {