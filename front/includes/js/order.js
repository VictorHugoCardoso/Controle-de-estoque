$(document).ready(function(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	$('#data').val(dd+"/"+mm+"/"+yyyy);	

	$('.date').mask('00/00/0000', {placeholder: "__/__/____"});
	$('.money').mask("#.##0,00", {reverse: true});

	shortcut.add("F1", function() {
		$("#order_form").click();
	});

	function setEstoque(){
		$(".overlay").show();
		setTimeout(function(){
			var estoque = ['item1','item2','item3','item4'];

			$.each(estoque, function (i, item) {
				$('#firstitemselect').append($('<option>', { 
						text: item 
				}));
			});
			$(".overlay").hide();
			addNewItem();			
		}, 100);
	}
	setEstoque();

	function refreshN(){
		var n = -1;
		$(".number").each(function(){
			$(this).html(++n);
		})
	}
	
	function calculate(){
		var sub_total = 0;
		$(".precototal").each(function(){
			sub_total = sub_total + ($(this).cleanVal() * 1);
		})
		$("#sub_total").unmask().val(sub_total).mask("#.##0,00", {reverse: true});
		var total = $("#sub_total").cleanVal()-$("#discount").cleanVal();
		$("#total").unmask().val(total).mask("#.##0,00", {reverse: true});
		$("#paid").unmask().val(total).mask("#.##0,00", {reverse: true});
	};

	function addNewItem(){
		$newitem = $("#first_invoice").clone().removeAttr('id').removeClass('d-none');
		$("#invoice_item").append($newitem);
		refreshN();
		$newitem.find('.estoque').val('0');
		$newitem.find('.quantidade').val('1');
		$newitem.find('.precounitario').val('0000');
		$newitem.find('.precototal').val('0000');
		$newitem.find('.itemselect').removeAttr('id').selectpicker();
		$('.money').mask("#.##0,00", {reverse: true});

		$newitem.find('.itemselect').focus();
	}

	$("#add").click(function(){
		addNewItem();
	});

	$("#invoice_item").delegate(".removeitem","click",function(){
		var tr = $(this).parent().parent().remove();
		calculate();
		refreshN();
	});

	$("#invoice_item").on("change","select",function(){
		var pid = $(this).val();
		var tr = $(this).closest('tr');
		$(".overlay").show();
		setTimeout(function(){
			var estoque = Math.floor((Math.random() * 100) + 1);
			var precounitario = Math.floor((Math.random() * 10000) + 1);

			tr.find(".estoque").val(estoque);
			tr.find(".precounitario").unmask().val(precounitario).mask("#.##0,00", {reverse: true});
			tr.find(".precototal").unmask().val(precounitario).mask("#.##0,00", {reverse: true});
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
				tr.find(".precototal").unmask().val(qty.val() * tr.find(".precounitario").cleanVal()).mask("#.##0,00", {reverse: true});
				calculate();
			}
		}
	});
		
	$("#invoice_item").delegate(".precototal","keyup",function(){
		calculate();
	});

	$("#discount").keyup(function(){
		var discount = parseInt($(this).cleanVal());
		var subtotal = parseInt($("#sub_total").cleanVal());
		
		if(discount >= subtotal){
			alert('O desconto não pode ser maior que o subtotal');
			$("#discount").unmask().val(0).mask("#.##0,00", {reverse: true})
		}
		calculate();
	});
	$("#teste").click(function(){
		
	});

	$("#order_form").click(function(e){
		e.preventDefault();
		
		var validapedido = false;
		$(".itemselect select").each(function(n){
			if($(this).val() === ''){
				validapedido = true;
			}
		});
		
		if($('.itemrow').length <= 1){
			alert("Adicione algum item ao pedido!");
		}else if(validapedido){
			alert("Informe o nome do produto!");
		}else if($("#total").val() === ""){
			alert("Nenhum total selecionado!");
		}else if($("#paid").val() === ""){
			alert("Entre com o valor pago!");
		}else{

			$("#first_invoice").remove();

			var formData = $("#get_order_data").serializeArray();
			
			var data = {};
			$(formData).each(function(index, obj){
				data[obj.name] = obj.value;
			});
			console.log(data);

			var items = [];
			$('.itemselect select').each(function(){
				var tr = $(this).closest('tr');
				var item = [];
				item['nomeItem'] = $(this).val();
				item['quantidade'] = parseInt(tr.find('.quantidade').unmask().val());
				item['total'] = parseFloat(tr.find('.precototal').val().replace(",", "."));
				items.push(item);
			});
			data['produtos'] = items;
		
			console.log(data);
			
			var jsonData =  JSON.stringify(data);
			console.log(data);

			/*
			if (confirm("Finalizar Pedido?")) {
				if (confirm("Gostaria de imprimir o cupom não fiscal?")) {
					
				}
				$("#get_order_data").trigger("reset");
			}
			*/
		}
	});
});