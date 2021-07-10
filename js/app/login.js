
var login = {
    validateCredentials:function(){
        $.ajax({
            type: "GET", 
            timeout: 50000,
            url: "http://localhost:8080/notes_back/login",
            contentType :'application/json; charset=utf-8',
            headers:    {'user':''+$('#username').val()+'',
                        "pass": ''+$('#pass').val()+'',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
                        }, 
            }).done(function( data, textStatus, jqXHR ) {	
                var dataParse = 
                sessionStorage.setItem("Token",data['Token']);
                sessionStorage.setItem("id",data['id']);
                $(location).attr('href','comentarios.html');
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
            dycec_js.ajax_post_fail(jqXHR, textStatus, errorThrown);
            }) 
            .always(function( jqXHR, textStatus, errorThrown ) {
            });	
    }
}