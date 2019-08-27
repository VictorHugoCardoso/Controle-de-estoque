$(document).ready(function(){
    shortcut.add("F1", function() {
		$("#order_form").click();
	});
    
    $("#sendForm").click(function(e){
		e.preventDefault();
		
        $('#modalConfirm').modal('show');
        $('#modalConfirmYes').on('click',function(){
            
        });
    });
});