$(document).ready(function(){
    shortcut.add("F1", function() {
		$("#order_form").click();
    });

    $('#arquivoXML').on('change', function(){
        var file = $('#arquivoXML').prop('files')[0];
        console.log(file);
        $("#labelFile").html(file['name']);

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function(e) {
                var content = e.target.result;
                var xml = $.parseXML(content);
                var $produtos = $(xml).find('prod');
                console.log($produtos);
                $produtos.each(function(){
                    var nomeProduto = $(this).find('xProd').text();
                    console.log(nomeProduto);
                });
             };
        }else{
            alert('Entre com algum arquivo!');
        }
    });
    
    $("#sendForm").click(function(e){
		e.preventDefault();
		
        $('#modalConfirm').modal('show');
        $('#modalConfirmYes').on('click',function(){
            
        });
    });
});