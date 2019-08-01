$(document).ready(function(){
	var DOMAIN = "http://localhost/inv_project/public_html";

	$('.date').mask('00/00/0000', {placeholder: "__/__/____"});
	$('.money').mask('000.000.000.000.000,00', {reverse: true});
	$('.time').mask('00:00:00');

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	$('#data').val(dd+"/"+mm+"/"+yyyy);	

	addNewRow();

	$("#add").click(function(){
		addNewRow();
	});

	function addNewRow(){
		/*
		$("#invoice_item").append(data);
		var n = 0;
		$(".number").each(function(){
			$(this).html(++n);
		})
		*/
	};

	$(".removeitem").on('click',function(){
		console.log('oi');
		calculate(0,0);
	});

	$("#invoice_item").delegate(".pid","change",function(){
		var pid = $(this).val();
		var tr = $(this).parent().parent();
		$(".overlay").show();
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {getPriceAndQty:1,id:pid},
			success : function(data){
				tr.find(".tqty").val(data["product_stock"]);
				tr.find(".pro_name").val(data["product_name"]);
				tr.find(".qty").val(1);
				tr.find(".price").val(data["product_price"]);
				tr.find(".amt").html( tr.find(".qty").val() * tr.find(".price").val() );
				calculate(0,0);
			}
		})
	});

	$("#invoice_item").delegate(".quantidade","keyup",function(){
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
				tr.find(".preco").unmask().val(qty.val() * tr.find(".precounitario").cleanVal()).mask('000.000.000.000.000,00', {reverse: true});

				calculate(0,0);
			}
		}
	});

	function calculate(dis,paid){
		var sub_total = 0;
		var gst = 0;
		var net_total = 0;
		var discount = dis;
		var paid_amt = paid;
		var due = 0;
		$(".amt").each(function(){
			sub_total = sub_total + ($(this).html() * 1);
		})
		gst = 0.18 * sub_total;
		net_total = gst + sub_total;
		net_total = net_total - discount;
		due = net_total - paid_amt;
		$("#gst").val(gst);
		$("#sub_total").val(sub_total);
		
		$("#discount").val(discount);
		$("#net_total").val(net_total);
		//$("#paid")
		$("#due").val(due);

	};

	$("#discount").keyup(function(){
		var discount = $(this).val();
		calculate(discount,0);
	});

	$("#paid").keyup(function(){
		var paid = $(this).val();
		var discount = $("#discount").val();
		calculate(discount,paid);
	});


	/*Order Accepting*/

	$("#order_form").click(function(){
		var invoice = $("#get_order_data").serialize();
		if ($("#cust_name").val() === "") {
			alert("Plaese enter customer name");
		}else if($("#paid").val() === ""){
			alert("Plaese eneter paid amount");
		}else{
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : $("#get_order_data").serialize(),
				success : function(data){

					if (data < 0) {
						alert(data);
					}else{
						$("#get_order_data").trigger("reset");

						if (confirm("Do u want to print invoice ?")) {
							window.location.href = DOMAIN+"/includes/invoice_bill.php?invoice_no="+data+"&"+invoice;
						}
					}
				}
			});
		}
	});

});