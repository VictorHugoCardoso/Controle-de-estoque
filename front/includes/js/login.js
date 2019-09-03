$(document).ready(function(){
    
    $("#form_login").on("submit", function(e){
        e.preventDefault();

        if($("#log_email").val() === "" || $("#log_password").val() === ""){
            $('#ajaxCall').modal('show');   
		}else{
            $(".overlay").show();
            
            var email = $("#log_email").val();
            var senha = $("#log_password").val();
            
            var data = {};
            data['email'] = email;
            data['senha'] = senha;
            
            var jsonData =  JSON.stringify(data);
            console.log(jsonData);

            $.ajax({
                url : 'http://localhost:9002/api/v1/usuario/logar/',
                type : 'POST',
                data : jsonData,
                dataType:'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Content-Type", "application/json");
                },
                success : function(data) {
                    console.log(data);
                    $(".overlay").hide();
                    window.location.href="./dashboard.html";
                },
                error : function(request,error){
                    $("#incorret").html("Usuário ou senha Incorreta.");
                }
            });
        }
    });
});