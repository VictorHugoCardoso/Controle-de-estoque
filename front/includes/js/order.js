$(document).ready(function(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	$('#data').val(dd+"/"+mm+"/"+yyyy);	

	$('.date').mask('00/00/0000', {placeholder: "__/__/____"});
	$('.money').mask("#.##0,00", {reverse: true});		

	function refreshN(){
		var n = 0;
		$(".number").each(function(){
			$(this).html(++n);
		})
	}
	
	function calculate(){
		var sub_total = 0;
		$(".preco").each(function(){
			sub_total = sub_total + ($(this).cleanVal() * 1);
		})
		$("#sub_total").unmask().val(sub_total).mask("#.##0,00", {reverse: true});
		$("#total").unmask().val($("#sub_total").cleanVal()-$("#discount").cleanVal()).mask("#.##0,00", {reverse: true});
	};

	$("#add").click(function(){
		$newitem = $("#first_invoice");
		$("#invoice_item").append($newitem);
		refreshN();
	});

	$(".removeitem").on('click',function(){
		$(this).parent().parent().remove();
		calculate();
		refreshN();
	});

	$("#invoice_item").on("change",".selectpicker",function(){
		var pid = $(this).val();
		var tr = $(this).parent().parent().parent();
		$(".overlay").show();
		setTimeout(function(){
			var estoque = Math.floor((Math.random() * 100) + 1);
			var precounitario = Math.floor((Math.random() * 10000) + 1);

			tr.find(".estoque").val(estoque);
			tr.find(".precounitario").unmask().val(precounitario).mask("#.##0,00", {reverse: true});
			tr.find(".preco").unmask().val(precounitario).mask("#.##0,00", {reverse: true});
			calculate();
			$(".overlay").hide();
		}, 500);
	});

	$("#invoice_item").delegate(".quantidade","focusout",function(){
		var qty = $(this);
		var tr = $(this).parent().parent();
		if (isNaN(qty.val())) {
			alert("Entre com uma quantidade valida");
			qty.val(1);
		}else{
			if ((qty.val() - 0) > (tr.find(".estoque").val()-0)) {
				alert("Quantidade não disponível no estoque!");
				qty.val(1);
			}else{
				tr.find(".preco").unmask().val(qty.val() * tr.find(".precounitario").cleanVal()).mask("#.##0,00", {reverse: true});
				calculate();
			}
		}
	});

	$("#discount").keyup(function(){
		calculate();
	});

	/*Order Accepting*/

	$("#order_form").click(function(){
		e.preventDefault();

		if($('.itemrow').length < 1){
			alert("Adicione algum item ao pedido!");
		}else if($("#paid").val() === ""){
			alert("Entre com o valor pago!");
		}else{
			funfo = 0;
			if (funfo < 0) {
				alert(data);
			}else{
				var invoice = $("#get_order_data").serialize();
				$("#get_order_data").trigger("reset");

				if (confirm("Gostaria de imprimir o cupom não fiscal?")) {
					
				}
			}
		}
	});

});