$(document).ready(function(){
    $('.money').mask("#.##0,00", {reverse: true});
    shortcut.add("F1", function() {
		$("#order_form").click();
    });

    $(".overlay").show();
    setTimeout(function(){
        $.ajax({
            url : 'http://localhost:9002/api/v1/produto/',
            type : 'GET',
            dataType:'json',
            beforeSend: function(request) {
                request.setRequestHeader("Content-Type", "application/json");
            },
            success : function(data) {
                data['conteudo'].forEach(function(item){
                    $('.selectpicker').append($('<option>', { 
                        text: item.descricao 
                    }));
                    $('.selectpicker').selectpicker('refresh');
                });

                $(".overlay").hide();
            },
            error : function(request,error){
                alert('Não foi possível carregar os itens!');
            }
        });	
    }, 100);

    $("#order_form").click(function(e){
        e.preventDefault();

        var select = $('select').val();
        var preco = $('#preco').val().replace(",", ".");
        if(select.length === 0){
            alert('Selecione algum item!');
            $('select').focus();
        }else if(preco === ""){
            alert('Informe um preço');
            $('#preco').focus();
        }else{
            $('#sendForm').modal('show');
            $('#sendFormYes').on('click',function(){
                var data = {};
                console.log(preco);
                data['preco'] = parseFloat(preco);
                data['produtos'] = select;
                var jsonData =  JSON.stringify(data);
			    console.log(jsonData);
            });
        }
    });
});

// data-subtext="Heinz"