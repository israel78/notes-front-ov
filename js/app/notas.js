var token = '';
var id = '';
$( document ).ready(function() {
	token = sessionStorage.getItem("Token");
	id = sessionStorage.getItem("id");
});
var urlBase = '';
$( document ).ready(function() {
	setTimeout(function(){ notas.init_datatable($('#tabla_comentarios'), null); }, 900);
	
	var myVar = '<div class="col-lg-9"><h3 class="col-lg-2" >Notas</h3>'+
						'<div class="col-lg-4 form-group">'+
							'<button type="button" class="btn btn-w-m btn-success btn-sm"'+
								'style="margin-left: 0px !important; min-width: 90px !important"'+
								'onclick="notas.annadirNota(\'null\')">Añadir'+
								 '</button>'+
						'</div>'+
				'</div>';
	$('#tabla_comentarios').append('<caption style="caption-side:top-right">'+myVar+'</caption>');
	$(".dataTables_wrapper").css('padding-bottom','0px !important');
	$('head').append('<style> .dataTables_wrapper{padding-bottom:0px !important} </style>');
	$(".filtroVistas").css('font-size','10px !important');
});
var notas = {
		annadirNota:function(ruta){
			$("#botonAnnadir").show();
			$("#botonActualizar").hide();
			$("#botonBorrarRegistro").hide();
			$("#pestana2").css("display","block");
			$("#tipoBuscador2").val("RSS");
			$("#botonAnnadir").css("display","visible");
			$("#botonActualizar").css("display","none");
			$("#botonBorrarRegistro").css("display","none");
			//AIM se borran los campos por si hubieramos seleccionado algua accion antes
			$('#titulo').val("");
			$('#body').val("");
			$('#idnota').attr('disabled','disabled');
			$("#enlacePestana2").text("Añadir nueva nota");
			$("#tituloTabDetalle").text("Añadir nueva nota");
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			$("#tab-1").removeClass("active");
			$("#tab-3").removeClass("active");
			$("#tab-2").addClass("active");
		},
		actualizarInfo: function(numRow,fila){
					
			//Actualizamos por lo que no es necesario el boton añadir
			$("#botonAnnadir").hide();
			$("#botonActualizar").show();
			$("#botonBorrarRegistro").show();
			$("#capaId").show();
			$("#capaInforme").show();			
			$("#capafechaSemanaVer").show();
			
			$("#idnota").attr('disabled','disabled');
			filaCompleta = fila.split("*");	
			$('#idnota').val(filaCompleta[0]);
			$('#titulo').val(filaCompleta[1]);
			$('#body').val(filaCompleta[2]);
			//AIM se actualiza la informacion de la pestaña y del titulo de la caja
			$("#pestana2").css("display","block");
			$("#enlacePestana2").text("Ver/Actualizar nota ["+filaCompleta[1]+"]");
			$("#tituloTabDetalle").text("Ver/Actualizar nota ["+filaCompleta[1]+"]");
			//Se prepara el selecionable subtipo en funcion del tipo
			$("#pestana1").removeClass("active");
			$("#pestana2").addClass("active");
			$("#pestana3").addClass("active");
			$("#tab-1").removeClass("active");
			$("#tab-2").addClass("active");
			$("#tab-3").removeClass("active");
		},
		insertarActualizarNota : function(){
			var check = false;
			var titulo;
			if($('#idnota').val()==""){
				titulo = "Insertar nueva nota";
				if($('#titulo').val()=='')
					BootstrapDialog.confirm({
						title: titulo,
						message: "No se puede una nota sin título",
						type: BootstrapDialog.TYPE_DANGER,
						btnOKLabel: "Aceptar", 
						callback: function(result) {
							if (result) {
								check = false;
								return null;	
							} else {
								
							}
						}
					});	
				else
					check = true;
			}else{
				titulo = "Actualizar informacion del comentario ["+$('#id_comentario').val()+"]";		
					check = true;	
			}
			if(check){
				BootstrapDialog.confirm({
					title: titulo,
					message: "Confirme que desea grabar los datos",
					type: BootstrapDialog.TYPE_WARNING,
					btnCancelLabel: "Cancelar", 
					btnOKLabel: "Aceptar", 
					callback: function(result) {
						if (result) {
							notas.insertarActualizarNota_1();
						} else {
						}
					}
				});	
			}
		},
		volverAlistado:function(path){

			$("#botonAnnadir").show();
			$("#botonActualizar").show()
			$("#botonBorrarRegistro").show();
			
			$("#pestana3").removeClass("active");
			$("#pestana2").removeClass("active");
			$("#pestana1").addClass("active");
			
			$("#tab-2").removeClass("active");
			$("#tab-3").removeClass("active");
			$("#tab-1").addClass("active");
			
			$("#pestana2").css("display","none");
			
			

		},
		borrarNota:function(idloc,timestamp){
			BootstrapDialog.confirm({
				title: "Borrado de nota",
				message: "¿Quiere borrar este registro?",
				type: BootstrapDialog.TYPE_DANGER,
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					if (result) {
						notas.borrarNota_1(idloc);	
					} else {
					}
				}
			});	
		},
		borrarNota_1:function(idloc){
			
			if(idloc == null||idloc == ''){
				idloc = $('#idnota').val();
			}
				//......................................................................................
				//$.post. URL: https://api.jquery.com/jquery.post/
				//......................................................................................
				var o_waitDialog = dycec_js.waitDialog("Esperando grabar la informacion ");
				o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
				//
				$.ajax({
					type: "POST", 
					timeout: 5000,
					url: "http://localhost:8080/notes_back/delete?noteId="+idloc,
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					headers: {'Authorization':token,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
						},	   
				}).done(function( data, textStatus, jqXHR ) {
					
						$("#pestana3").removeClass("active");
						$("#pestana2").removeClass("active");
						$("#pestana1").addClass("active");
						$("#tab-3").removeClass("active");
						$("#tab-2").removeClass("active");
						$("#tab-1").addClass("active");
						
						$("#pestana2").css("display","none");
						var table = $('#tabla_comentarios').DataTable().clear().draw();			
						table.ajax.reload();
						
						var s_message = "borrado llevado a cabo correctamente";
						
						dycec_js.alert("Borrado de datos", s_message, BootstrapDialog.TYPE_DANGER);
					 //if ( (data && data.newPlan) ) {
				}) //.done(function( data, textStatus, jqXHR ) {
				.fail(function( jqXHR, textStatus, errorThrown ) {
					// Error
					dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
				}) //.fail(function( jqXHR, textStatus, errorThrown ) {
				.always(function( jqXHR, textStatus, errorThrown ) {
					// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
					o_waitDialog.close();
				});	
		},
		borrarCamposEditables:function(url){
			
			BootstrapDialog.confirm({
				title: "Borrar campos",
				message: "¿Quiere borrar los campos?",
				type: BootstrapDialog.TYPE_WARNING,
				btnCancelLabel: "Cancelar", 
				btnOKLabel: "Aceptar", 
				callback: function(result) {
					$('#titulo').val("");
					$('#body').val("");
				}
			});	
		},
		insertarActualizarNota_1:function(){
			var idObten;
			
			if($('#idnota').val()==''){
				idObten = "";
			var aComentarios = {
					name		 			     : $('#titulo').val(),
					body		 		 		 : $('#body').val(), 
					createModifyDate	 		 : '2022-07-09T22:00:00.000+00:00', 
					user: {
						id: parseInt(id),						
					}				
				};	
				var o_waitDialog = dycec_js.waitDialog("Esperando grabar la informacion ");
				o_waitDialog.setSize(BootstrapDialog.SIZE_WIDE);
				//
				$.ajax({
					type: "POST", 
					timeout: 50000,
					url: "http://localhost:8080/notes_back/save",
					contentType :'application/json; charset=utf-8',
					headers: {'Authorization':token,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
						},
					dataType : 'json',
					data:JSON.stringify(aComentarios)	   
					}).done(function( data, textStatus, jqXHR ) {

							//Se obtiene el id despues de insertar
							$('#id').val(data);
							
							//Se vuelve a la pestaña 1 y se refresca la tabla
							$("#pestana2").removeClass("active");
							$("#pestana1").addClass("active");
							
							$("#tab-2").removeClass("active");
							$("#tab-1").addClass("active");
							
							$("#pestana2").css("display","none");					
							var table = $('#tabla_comentarios').DataTable();			 
							table.ajax.reload();
						//	comentarios.volverAlistado(null);
							var s_message = "Inserción llevada a cabo correctamente";
							dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
						}) //.done(function( data, textStatus, jqXHR ) {
						.fail(function( jqXHR, textStatus, errorThrown ) {
							// Error
							dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
						}) //.fail(function( jqXHR, textStatus, errorThrown ) {
						.always(function( jqXHR, textStatus, errorThrown ) {
							// Fin. Proceso completado (se ejecuta después de ".done"/".fail"
							o_waitDialog.close();
						});		
						}else{
							
							var nota = {
									id		: $('#idnota').val(),
									name	: $('#titulo').val(), 
									body	: $('#body').val(), 
									createModifyDate : "2022-07-09T22:00:00.000+00:00",
									user    :{ 
												id	: parseInt(id)
											}
							};	
							$.ajax({
								type: "POST", 
								timeout: 50000,
								url: "http://localhost:8080/notes_back/update",
								contentType :'application/json; charset=utf-8',
								headers: {'Authorization':token,
									'Access-Control-Allow-Origin': '*',
									'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
									'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
									},
								dataType : 'json',
								data:JSON.stringify(nota)	   
								}).done(function( data, textStatus, jqXHR ) {							
							var table = $('#tabla_comentarios').DataTable();			 
							table.ajax.reload();		
							notas.volverAlistado(null);
							var s_message = "Actualizacion llevada a cabo correctamente";
							dycec_js.alert("Guardar datos", s_message, BootstrapDialog.TYPE_DANGER);
					}) //.done(function( data, textStatus, jqXHR ) {
					.fail(function( jqXHR, textStatus, errorThrown ) {
						// Error
						dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
					}) //.fail(function( jqXHR, textStatus, errorThrown ) {
					.always(function( jqXHR, textStatus, errorThrown ) {
					});	
							
				}
		},
		init_datatable: function(o_html_table, json_datos) {
			this.o_html_table = o_html_table;
			this.json_datos   = json_datos;
			if(o_html_table.attr('id') == 'tabla_comentarios')
				this.datatable_setConfig(o_html_table, json_datos);			
		},
		o_datatable: null,
		datatable_setConfig: function(o_html_table, json_datos) {
			var _this = this; //URL: https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
			this.o_datatable = o_html_table.DataTable({
				
				//lengthMenu: [10, 25, 50, 75, 100],
				lengthMenu: [[10, 20, 100, -1], [10, 20, 100, "Todos"]],
				pageLength: 10, 
				responsive: true,
				processing: true,
				info: false,
				searching: true,
			
				
				buttons: [ //https://datatables.net/reference/button/

				],
				language: { //textos en español, coño, no en guiri
					url: "/inspinia_admin-v2.7.1/js/plugins/dataTables/i18n/Spanish.json",
		            processing: '<span class="fa fa-refresh fa-spin fa-3x fa-fw datatable-spinner"></span><div class="loading-text">Loading</div>',

					decimal: ",",  //coma como separador decimal
					thousands: ".", //punto para los millares
					//infoEmpty: "No hay datos disponibles, para buscar aplica un filtro y pulsa en buscar"

				},
				scrollY: "auto", //scroll vertical. //URL: https://datatables.net/examples/basic_init/scroll_y_dynamic.html
				scrollX: true, //scroll horizontal. //URL: https://www.datatables.net/examples/basic_init/scroll_x.html
				colReorder: true, //mover columnas
				deferRender: true,
				dom: '<"float-left"B>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',//deferred rendering enabled. Los objetos HTML (TR, TD) se crean cuando se muestran
				columnDefs: [
					{
						targets: [0,1,2],
						createdCell: function (td, cellData, rowData, row, col) {
					        $(td).attr('title', cellData)
						}   
					},
					{
					targets: [2],
					render: function (data, type, row, meta ) {	
	                	var datos = "";
	                	if(data!=null&&data.length>30){
	                		datos = data.substring(0,30)+"...";
	                	}else if(data==null){
	                	}else{
	                		datos = data;
	                	}
	                	return datos;
	                	}
					},
	                {
	            	targets: [3],
	                render: function (data, type, row, meta ) {	
	                	
	                	var filaCompleta =
	                	 row["id"]+"*"
	                	+row["name"]+"*"
	                	+row["body"]+"*"
	                	var datos = '<button type="button" class="btn btn-success btn-xs dropdown-toggle" onclick="notas.actualizarInfo('+meta.row+',\''+filaCompleta+'\')" >Ver</button>'+
	                	'<button type="button" style="margin-left:5px" class="btn btn-danger btn-xs dropdown-toggle" onclick="notas.borrarNota(\''+row["id"]+'\',\''+row["timestamp"]+'\')" ><i class="fa fa-times-rectangle" aria-hidden="true"></button></i>';     	
	                return datos;
	                }
	            }],	
				columns: [
					 {title: "Id Nota", data: "id"}
					,{title: "Título", data: "name"}
					,{title: "Nota", data: "body"}
		        ],      
				ajax: {
					type: "GET", 
					timeout: 50000,
					url: "http://localhost:8080/notes_back/noteslist?userId="+id,
					contentType : 'application/json; charset=utf-8',
				    dataType : 'json',
					beforeSend: function (jqXHR, settings) {
						jqXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
					},
					headers: {'Authorization':token,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
						},
					dataSrc: function ( json ) { //URL: https://stackoverflow.com/questions/15786572/call-a-function-in-success-of-datatable-ajax-call
						return json; //URL: https://datatables.net/manual/ajax
			        },
			        error: function (xhr, error, thrown) { //URL: https://stackoverflow.com/questions/35475964/datatables-ajax-call-error-handle
			        }	            
				}
		    });
		}	
}