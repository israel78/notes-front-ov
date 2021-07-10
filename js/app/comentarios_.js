
var contador = 0;
var cont = 0;
var filaCompletaArray = null;

$(document).ready(function() {
	
	
// Para la tabla
	setTimeout(function(){ comentarios.init_datatable($('#tabla_comentarios'), null); }, 1000);	
//año_num,mes_num,dia_num
	
$('#tabla_comentarios').on('click', 'tr', function () {
    $(this).css("background-color", "#eeeeee");
});


});
function ISO8601_week_no(dt) 
{
   var tdt = new Date(dt.valueOf());
   var dayn = (dt.getDay() + 6) % 7;
   tdt.setDate(tdt.getDate() - dayn + 3);
   var firstThursday = tdt.valueOf();
   tdt.setMonth(0, 1);
   if (tdt.getDay() !== 4) 
     {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
      }
   return 1 + Math.ceil((firstThursday - tdt) / 604800000);
      }

var comentarios = {
		s_contextPath:"",
		
		formateoFechaJson: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[0]+"-"+arrayfecha[1]+"-"+arrayfecha[2]+" "+hora;
		
			
		},
		formateoFechaJsonDatatables: function(fecha){
			var fechaHora = fecha.split(" ");	
			var arrayfecha = fechaHora[0].split("/");
			var hora = fechaHora[1];
			return  arrayfecha[2]+"-"+arrayfecha[1]+"-"+arrayfecha[0]+" "+hora;			
		},				
		buscarcomentarios: function(path){	
			var tipoBusqueda = $('#tipoBusqueda').val();
			var numSemanaMes =$('#idsemana').val();
			var numIncidencia =$('#numincidenciaBuscador').val().trim();
			var tipoIncidencia = $('#tipoBuscador').val();
			var annioBusqueda =  $('#annioBusqueda').val();
			
			//Se mete en sesion los datos de los select generales para que al refrescar se mantengan los valores
			sessionStorage.setItem("numSemana", $('#idsemana').val());
			sessionStorage.setItem("tipoBusqueda", $('#tipoBusqueda').val());
			sessionStorage.setItem("annioBusqueda", $('#annioBusqueda').val());
			
			//poner a null el tipo de busqueda cuando venga informado el num_incidencia
			

			if(tipoIncidencia=="TI" && !/^([0-9])*$/.test(numIncidencia)){
				$('#numincidenciaBuscador').val("Si seleccionas tipo TI, el num. incidencia son solo números")
				$('#numincidenciaBuscador').css('color','red');
				
			}else{
				var table = $('#tabla_comentarios').DataTable();			 
				table.ajax.reload()
	//			window.location = path+"/comentarios.buscar.action?tipoBusqueda="+tipoBusqueda+"&numSemanaMes="+numSemanaMes+"&numIncidencia="
	//			+numIncidencia+"&tipoIncidencia="+tipoIncidencia+"&annioBusqueda="+annioBusqueda;
			}	
		},
		
		paginar: function(sentido){	
			 datos = aa_data_comentarios;				
			if(sentido=='up'){
				if(datos.length>=contador+1){
					$('#botonDown').show();
					
				 if(datos.length==contador+2){
					 $('#botonUp').hide();
					 $('#botonDown').show()
				 }else{
					 	 
				 }
				 if(datos.length-1!=contador){
					 contador++;
				 }
				}	
			}
			if(sentido=='down'){
				if(contador-1>=0){
					$('#botonDown').show();
					$('#botonUp').show();
				 if(contador-1==0){
					 $('#botonDown').hide();
					 $('#botonUp').show();
				 }else{
				 }
				 if(contador!=0){
					 contador--;
				 }
				}												
			}
			var fila = datos[contador];
			//AIM decodificar los caracteres especiales en html
			for (var i = 0; i < datos[contador].length; i++) {
				datos[contador][i]= general.HtmlDecode(datos[contador][i]);
			}
					
			$('#numIncidencia').val( datos[contador][2]);
			$('#tipoIncidencia').val( datos[contador][1]);
			$('#descripcion').val(datos[contador][3]);
			$('#sev').val(datos[contador][10]);
			$('#fechainicio').val(datos[contador][12]);
			$('#fechafin').val( datos[contador][14]);
			$('#indisponibilidad').val( datos[contador][11]);
			$('#alias').val(datos[contador][0]);
			$('#servicioafectado').val(datos[contador][4]);
			$('#causa').val(datos[contador][5]);
			$('#accionesrecuperacion').val( datos[contador][6]);
			$('#accionesmejora').val( datos[contador][7]);
			$('#contacto').val(datos[contador][9]);
			$('#area').val( datos[contador][8]);
			$('#fechaSemana').val( datos[contador][16]);
			if(datos[contador][20]!=null&&datos[contador][20]!=""){
				$('#provincia').val(datos[contador][13]);
			}
			var textoRegistroBusqueda = "Num registros encontrados : "+aa_data_comentarios.length + ". Registro num : " +(contador+1);
			$('#comentariosencontradas').text(textoRegistroBusqueda); 

			
			//AIM, si la informacion recuperada pertenece a la semana anterior a la actual se desabilitan los campos para escribir
			var fechaSeparada = aa_data_comentarios[contador][16].split("/");

			if(fechaSeparada[2]<100){
				fechaSeparada[2] = 20+fechaSeparada[2];
			}			
			var numSemanafechaPosicioncero = ISO8601_week_no(new Date((fechaSeparada[2]),fechaSeparada[1]-1,fechaSeparada[0]));
			var numSemanafechaActual = ISO8601_week_no(new Date());
			//AIM, Se compara la fecha de los datos recuperados con la actual menos 1 confirmar
			if(fechaSeparada[2]==new Date().getFullYear()&&numSemanafechaPosicioncero == numSemanafechaActual-1){
				  $('#formulariocomentariosIn input').attr('readonly', false);
				  $('#formulariocomentariosIn textarea').attr('readonly', false);
				  $('#botonBorrarcomentarios').attr('disabled', false);
				  $('#botonGrabarcomentarios').attr('disabled', false);
			}else{
				
				  $('#formulariocomentariosIn input').attr('readonly', 'true');
				  $('#formulariocomentariosIn textarea').attr('readonly', 'true');
				  $('#botonBorrarcomentarios').attr('disabled', 'disabled');
				  $('#botonGrabarcomentarios').attr('disabled', 'disabled');
			}			
		},
		borrarCamposEditables:function(){
			
			BootstrapDialog.confirm({
				title: "Borrar campos editables de incidencia",
				message: "¿Quiere borrar los campos?",
				type: BootstrapDialog.TYPE_WARNING,
				btnCancelLabel: "Cancelar", 
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						$('div.bootstrap-dialog-message #alias').val("");
						$('div.bootstrap-dialog-message #causa').val("");
						$('div.bootstrap-dialog-message #accionesrecuperacion').val("");
						$('div.bootstrap-dialog-message #accionesmejora').val("");
						$('div.bootstrap-dialog-message #contacto').val("");
						$('div.bootstrap-dialog-message #area').val("");	
						$('div.bootstrap-dialog-message #servicioafectado').val("");


					} else {
					}
				}
			});	
		},
		guardarIncidenciaRelevante:function(conta,filaCompletaArray){
			
			var servicio_afectado = $('div.bootstrap-dialog-message #servicioafectado').val();
			var alias = $('div.bootstrap-dialog-message #alias').val();
			var causa = $('div.bootstrap-dialog-message #causa').val();
			var acciones_recuperacion = $('div.bootstrap-dialog-message #accionesrecuperacion').val();
			var acciones_mejora_responsables = $("div.bootstrap-dialog-message #accionesmejora").val();
			var area = $('div.bootstrap-dialog-message #area').val();
			var contacto = $('div.bootstrap-dialog-message #contacto').val();
			
			
			
			BootstrapDialog.confirm({
				title: "Guardar informacion de la incidencia ["+$('#numIncidencia').val()+"]",
				message: "Confirme que desea guardar los datos",
				type: BootstrapDialog.TYPE_WARNING,
				btnCancelLabel: "Cancelar", 
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
							comentarios.guardarInformacionRelevante_1(conta,filaCompletaArray,servicio_afectado,alias,causa,acciones_recuperacion,acciones_mejora_responsables,area,contacto);
						
					} else {
					}
				}
			});	
		},
		guardarInformacionRelevante_1:function(conta,filaCompletaArray,servicio_afectadop,aliasp,causap,acciones_recuperacionp,acciones_mejora_responsablesp,areap,contactop){			
			var v_data = {
					
					alias		 			 			 : aliasp,  
					tipo		 			 		     : filaCompletaArray[1], 
					num_incidencia	 		 			 : filaCompletaArray[2], 
					descripcion	 	  	  	 			 : general.HtmlDecode(filaCompletaArray[3]), 
					servicio_afectado  		 			 : servicio_afectadop, 
					causa		    		 			 : causap,
					acciones_recuperacion	 			 : acciones_recuperacionp, 
					acciones_mejora_responsables		 : acciones_mejora_responsablesp, 
					area	 							 : areap, 
					contacto 							 : contactop,
					severidad                            : filaCompletaArray[9],
					indisponibilidad 					 : filaCompletaArray[10],
					fecha_inicio 						 : comentarios.formateoFechaJson(filaCompletaArray[11]),
					provincia 							 : general.HtmlDecode(filaCompletaArray[12]),
					fecha_fin 							 : comentarios.formateoFechaJson(filaCompletaArray[14]),
					tipoSemMes 							 : filaCompletaArray[15],
					fecha 								 : comentarios.formateoFechaJson(filaCompletaArray[16]),
					cod_provincia						 : filaCompletaArray[13],
				};	
			
			
				//......................................................................................
				//$.post. URL: https://api.jquery.com/jquery.post/
				//......................................................................................
				var o_waitDialog = dycec_js.waitDialog("Esperando grabar la informacion ");
				o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
				//
				s_action = "comentarios.insertOrUpdate.action";
				$.post( s_action,{jsonAJAX: JSON.stringify(v_data)}, null, "json") 
				.done(function( data, textStatus, jqXHR ) {
					datosFila = {
							
							alias		 			 			 : aliasp,  
							tipo		 			 		     : filaCompletaArray[1], 
							num_incidencia	 		 			 : filaCompletaArray[2], 
							descripcion	 	  	  	 			 : filaCompletaArray[3], 
							servicio_afectado  		 			 : servicio_afectadop, 
							causa		    		 			 : causap,
							acciones_recuperacion	 			 : acciones_recuperacionp, 
							acciones_mejora_responsables		 : acciones_mejora_responsablesp, 
							area	 							 : areap, 
							contacto 							 : contactop,
							severidad                            : filaCompletaArray[9],
							indisponibilidad 					 : filaCompletaArray[10],
							fecha_inicio 						 : filaCompletaArray[11],
							provincia 							 : filaCompletaArray[12],
							fecha_fin 							 : filaCompletaArray[14],
							tipoSemMes 							 : filaCompletaArray[15],
							fecha 								 : filaCompletaArray[16],
							cod_provincia						 : filaCompletaArray[13],
						};
					
					$('#tabla_comentarios').DataTable().row(conta).data(datosFila).draw();
					 $('tr',$('#tabla_comentarios').DataTable().row(conta)).css("background-color", "#eeeeee");

					var s_message = "Actualizacion llevada a cabo correctamente";
					dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
					} //if ( (data && data.newPlan) ) {
				) //.done(function( data, textStatus, jqXHR ) {
				.fail(function( jqXHR, textStatus, errorThrown ) {
					// Error
					dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
				}) //.fail(function( jqXHR, textStatus, errorThrown ) {
				.always(function( jqXHR, textStatus, errorThrown ) {
					// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					o_waitDialog.close();
				});	
		},
		
		//AIM DATATABLES CONFIGURACION
		init_lib: function() {
			//...
		}, 
		//init_lib: function() {
		idVista: 0,
		// 1) Inicializamos la dataTable: telco_comentarios.init_datatable($("#id_table_planes"));
		o_html_table: null, //o_html_table = $("#id_table_planes"). objeto "tag table html"
		json_datos  : null, //datos json para el dataTable
		init_datatable: function(o_html_table, json_datos) {
			// 1) Configuramos el dataTable
			this.o_html_table = o_html_table;
			this.json_datos   = json_datos;
			this.datatable_setConfig(o_html_table, json_datos);
			//o_html_table.dataTable().fnSettings().oLanguage.sEmptyTable = "No existe ningún boletín para este plan especial";
		},
		o_datatable: null,
		datatable_setConfig: function(o_html_table, json_datos) {
			var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
			//$('#id_datatable').DataTable(); //  llamada a dataTables
			//var o_datatable = $('#id_datatable').DataTable({
			this.o_datatable = o_html_table.DataTable({
				
				//lengthMenu: [10, 25, 50, 75, 100],
				lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "All"]],
				pageLength: 100, //filas por defecto paginadas en la tabla
				responsive: true,
				processing: true,
				//dom: "lfrtip", //URL: https://datatables.net/reference/option/dom
				//dom: '<"html5buttons"B>lfrtip', //URL: https://datatables.net/reference/option/dom
				dom: '<"html5buttons"B>frtlip', //URL: https://datatables.net/reference/option/dom
				buttons: [ //https://datatables.net/reference/button/

				],
				language: { //textos en español, coño, no en guiri
					//url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
					//url: "<%=request.getContextPath()%>" + "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					//url: "${pageContext.request.contextPath}/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
					url: this.s_contextPath + "/gdm/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",

					decimal: ",",  //coma como separador decimal
					thousands: ".", //punto para los millares
					//infoEmpty: "No hay datos disponibles, para buscar aplica un filtro y pulsa en buscar"

				},
				scrollY: "70vh", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
				scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
				colReorder: true, //mover columnas
				deferRender: true,
				searching: false,
				dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',//deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
				//ordering: false, //no permitimos ordenar por ninguna columna
				//orderMulti: false, //no permitimos ordenar por varias columnas, solo por una
				//colFilter. //URL: https://datatables.net/extensions/colreorder/examples/initialisation/col_filter
				//order: [[4, "desc"]], //0..(totalCols-1). ordenamos por la 5ª columna "F.apertura" descendente
				columnDefs: [
					
					{
	                targets: [2,3,4],
	                render: function (data, type, row, meta ) {	
	   	                return comentarios.formateoFechaJsonDatatables(data);
	                	}
					},
	                {
	            	targets: [6],
	                render: function (data, type, row, meta ) {	
	                	
	                	var filaCompleta =
	                	row["alias"]+"*"
	                	+row["tipo"]+"*"
	                	+row["num_incidencia"]+"*"
	                	+row["descripcion"]+"*"
	                	+row["servicio_afectado"]+"*"
	                	+row["causa"]+"*"
	                	+row["acciones_recuperacion"]+"*"
	                	+row["acciones_mejora_responsables"]+"*"
	                	+row["area"]+"*"
	                	+row["severidad"]+"*"
	                	+row["indisponibilidad"]+"*"
	                	+row["fecha_inicio"]+"*"
	                	+row["provincia"]+"*"
	                	+row["cod_provincia"]+"*"
	                	+row["fecha_fin"]+"*"
	                	+row["tipoSemMes"]+"*"
	                	+row["fecha"]+"*"
	                	+row["fecha_fin_texto"]+"*"
	                	+row["fecha_inicio_texto"]+"*"
	                	+row["contacto"]+"*"
	                	+row["indisponibilidad_texto"];
	                	
	                	
	                	var datos = '<button type="button" class="btn btn-success btn-xs dropdown-toggle" onclick="comentarios.actualizaInfo('+meta.row+',\''+filaCompleta+'\')" >Ver información relevante</button>';      	
	                return datos;
	                }
	            }],				
				columns: [
					{title: "ID.", data: "num_incidencia"}
					,{title: "Subcapitulo", data: "tipo"} 
					,{title: "Item", data: "fecha"}
					,{title: "Comentario", data: "fecha_inicio"}
					,{title: "Contacto", data: "fecha_fin"}
					,{title: "Área", data: "provincia"}	
		        ],
		        
				// Damos formato a algunas filas en función de sus datos ==========================
		       /* createdRow: function( row, data, dataIndex ) {
					//URL: https://datatables.net/reference/option/createdRow
		        	_this.datatable_createdRow(row, data, dataIndex);
				},*/		        
				ajax: {
					type: "POST", 
					timeout: 5000,
					url: "comentarios.ajax-data.action",
					//data: ...vistasProv..., //URL: https://datatables.net/reference/option/ajax.data
					data:  function (params) {
						params.tipoBusqueda = $('#tipoBusqueda').val();
						params.numSemanaMes = $('#idsemana').val();
						params.numIncidencia = $('#numincidenciaBuscador').val();
						params.annioBusqueda =  $('#annioBusqueda').val();
						params.tipoIncidencia = $('#tipoBuscador').val();
						//console.log("parametro: " + JSON.stringify(params));
					    return params;
				    },
			        //dataSrc: "data", //"data" es un objeto json //URL: https://datatables.net/manual/ajax
					dataSrc: function ( json ) { //URL: https://stackoverflow.com/questions/15786572/call-a-function-in-success-of-datatable-ajax-call
			            // Make your callback here.
						return _this.ajax_dataSrc(json); //URL: https://datatables.net/manual/ajax
			        },
			        error: function (xhr, error, thrown) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
			            // Make your callback here.
			        	_this.ajax_error(xhr, error, thrown);
			        }	            
				}
		    }); //var o_datatable = o_html_table.DataTable({

			// autoFilter. //URL: https://github.com/vedmack/yadcf
			//this.init_autoFilter(this.o_datatable); 
			
			// Refresh por ajax. //URL: https://datatables.net/reference/api/ajax.reload()
			//URL: https://stackoverflow.com/questions/12934144/how-to-reload-refresh-jquery-datatable
			/*setInterval( function () {
				_this.o_datatable.ajax.reload();
			    //v_datatable.ajax.reload( null, false ); // user paging is not reset on reload
				//v_datatable.ajax.reload( callback, resetPaging );
			    //v_datatable.ajax.reload( callback_ajax_reload, true ); // user paging is not reset on reload
			}, 1*60*1000 );*/ //refresh cada 2 minutos
		},
		//datatable_setConfig: function(o_html_table) {
		//
		//
		// Damos formato a algunas filas en función de sus datos ================================
	   /* datatable_createdRow: function( row, data, dataIndex ) {
			//URL: https://datatables.net/reference/option/createdRow
			/*
	    	if (dataIndex < 2) { //2 primeras filas
				console.log(row, data, dataIndex);
				$(row).addClass( "row_updated" );
			}
			//
			// 1) cambiamos el color del fondo de la fila si se actualizó hace menos de 60 minutos
			var d_now = new Date();
			var d_min_update = new Date(d_now.getTime() - (60*60*1000)); //60 minutos menos (min*sg*1000)
			// fecha en formato "yyyy/MM/dd HH:mm:ss"
			//var s_fecha_min_update = dateFormat("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
			var s_fecha_min_update = d_min_update.format("yyyy/mm/dd HH:MM:ss"); //lib js "date.format.js"
			//if ( data[index_col_F_update] <= "60 minutos") {
			if (data.f_update_rt >= s_fecha_min_update) {
				$(row).addClass( "row_updated" );
			}
		},*/
		//datatable_createdRow: function( row, data, dataIndex ) {
		// End. Damos formato a algunas filas en función de sus datos =============================
		//
		// Damos formato a algunas columnas en función de sus datos *******************************
		datatable_createdCell: function (td, cellData, rowData, row, col) {
			//URL: https://datatables.net/reference/option/columns.createdCell
			/*
			if (row < 2) { //2 primeras filas
				console.log(td, cellData, rowData, row, col);
			}
			*/
			/*
			// Cambiamos el color de la celda "ID TroubleTicket" si...
			if ( cellData == "TT1711AHPXO5WJ" ) {
				$(td).css('color', 'red')
			}
			*/
			/*
			//$(telco_comentarios.o_datatable.column(0).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
			$(telco_comentarios.o_datatable.column(col).nodes()).addClass("gri_column"); //URL: https://datatables.net/examples/api/highlight.html
			*/
		},
		
		ajax_dataSrc: function(json) {
	        /*
	        console.log("ajax Done!");	                
	        console.log(json);
	        //*/
			
			// Actualizamos div con la jpra de actualización
			//this.ultimaActualizacion (json.data.horaActualizacion);
			
			// 1) datos para el datatable con las notificaciones.
	        //console.log(json.notificaciones);
			//telco_udo_notif.setJsonData(json.notificaciones);
			
			// 2) Datos para este datatable
	        //console.log(json.data);
	        return json.data; //"data" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
	        //return json.staff; //"staff" es el objeto json para la tabla //URL: https://datatables.net/manual/ajax
		},
		//ajax_dataSrc: function(json) {
		//
		ajax_error: function(xhr, error, thrown) {
	        // Make your callback here.
	        /*
	        //alert("telco_comentarios.ajax_error(): AJAX ERROR!!!");	                
	        console.log("telco_comentarios.ajax_error(): AJAX ERROR!!!");	                
	        console.log(xhr);	                
	        console.log(error);	                
	        console.log(thrown);
	        */
	        console.error("comentarios.ajax_error(): AJAX ERROR!!!");	                
	        console.error("ERROR: " + error);
	        console.error("SyntaxError.message: " + thrown.message);
		},
		//ajax_error: function(xhr, error, thrown) {
		
		/*setVista: function (idVista) {
			this.idVista = idVista;
			if (this.o_datatable != null) {
				this.o_datatable.ajax.reload();
			}
		},
		ultimaActualizacion: function (horaActualizacion){
			$('#idActualización').text("ULTIMA ACTUALIZACIÓN: " + horaActualizacion);
		},*/
		actualizarTabla: function (){
			if (this.o_datatable != null) {
				this.o_datatable.ajax.reload();
			}
		},		
		actualizaInfo: function(conta,filaCompleta){
		
		var prueba= 0;
    	var filaCompletaArray = filaCompleta.split("*");

		
		var fechaSeparada = filaCompletaArray[16].split("/");

		if(fechaSeparada[2]<100){
			fechaSeparada[2] = 20+fechaSeparada[2];
		}


		var fechaPosicioncero = ISO8601_week_no(new Date((fechaSeparada[0]),fechaSeparada[1]-1,fechaSeparada[2].split(" ")[0]));
		var fechaActual = ISO8601_week_no(new Date());
		var alert = false
		//AIM, Se compara la fecha de los datos recuperados con la actual menos 1 confirmar
		if(fechaSeparada[0]==new Date().getFullYear()&&fechaPosicioncero == fechaActual-1){	  
			  $('#informacionRelevante input').attr('readonly', false);
			  $('#informacionRelevante textarea').attr('readonly', false);
			 // $('#botonBorrarcomentarios').attr('disabled', false);
			//  $('#botonGrabarcomentarios').attr('disabled', false);
		}else{
			  $('#informacionRelevante input').attr('readonly', 'true');
			  $('#informacionRelevante textarea').attr('readonly', 'true');
			 // $('#botonBorrarcomentarios').attr('disabled', 'disabled');
			//  $('#botonGrabarcomentarios').attr('disabled', 'disabled');
			  alert = true;
		}
		var buttons
		if(alert){
			buttons =[{
                label: 'cancelar',
                title: 'cancelar',
                cssClass: 'btn-info btn-xs',
                action: function(dialogRef){
                	dialogRef.close();
                }
            }]
		}else{
			buttons = [{
                label: 'cancelar',
                title: 'cancelar',
                cssClass: 'btn-info btn-xs',
                action: function(dialogRef){
                	dialogRef.close();
                }
			},
			{
                label: 'Borrar campos',
                title: 'Borrar campos',
                cssClass: 'btn-danger btn-xs',
                action: function(){
                	comentarios.borrarCamposEditables();
                }
			},
			{
				label: 'Actualizar información',
                title: 'Actualizar información',
                cssClass: 'btn-warning btn-xs',
                action: function(dialogRef){
					comentarios.guardarIncidenciaRelevante(conta,filaCompletaArray);
					dialogRef.close();

            }
            }]
		}
		
		

		    var mens =  $("#informacionRelevante").html();
			BootstrapDialog.show({
				title: "Consultar/modificar informacion relevante de incidencia "+filaCompletaArray[2]+" ",
				message: mens,
				type: BootstrapDialog.TYPE_INFO,
				size: BootstrapDialog.SIZE_LARGE,// <-- Default value is BootstrapDialog.TYPE_PRIMARY
				//closable: true, // <-- Default value is false
				//draggable: true, // <-- Default value is false
				buttons: buttons,				
			});
			setTimeout(function(){
				//AIM se pintan los datos de la pantalla emeregente
				$('div.bootstrap-dialog-message').css("font-size", "13px")
		    	$('div.bootstrap-dialog-message #alias').val(filaCompletaArray[0]);
				$('div.bootstrap-dialog-message #causa').val(filaCompletaArray[5]);
				$('div.bootstrap-dialog-message #accionesrecuperacion').val(filaCompletaArray[6]);
				$('div.bootstrap-dialog-message #accionesmejora').val(filaCompletaArray[7]);
				$('div.bootstrap-dialog-message #contacto').val(filaCompletaArray[19]);
				$('div.bootstrap-dialog-message #area').val(filaCompletaArray[8]);	
				$('div.bootstrap-dialog-message #servicioafectado').val(filaCompletaArray[4]);
				
			}, 500);			
		}
		
		
		
}