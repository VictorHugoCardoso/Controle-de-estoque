$(document).ready(function(){
	var DOMAIN = "http://localhost/inv_project/public_html";

	$("#form_login").on("submit",function(){
		var email = $("#log_email");
		var pass = $("#log_password");
		var status = false;
		if (email.val() == "") {
			email.addClass("border-danger");
			$("#e_error").html("<span class='text-danger'>Preencha o campo do usuário!</span>");
			status = false;
		}else{
			email.removeClass("border-danger");
			$("#e_error").html("");
			status = true;
		}
		if (pass.val() == "") {
			pass.addClass("border-danger");
			$("#p_error").html("<span class='text-danger'>Preencha o campo da senha!</span>");
			status = false;
		}else{
			pass.removeClass("border-danger");
			$("#p_error").html("");
			status = true;
		}
		if (status) {
			$(".overlay").show();
			$.ajax({
				url : DOMAIN+"",// botar aqui a pagina para validação
				method : "POST",
				data : $("#form_login").serialize(),
				success : function(data){
					if (data == "NOT_REGISTERD") {
						$(".overlay").hide();
						email.addClass("border-danger");
						$("#e_error").html("<span class='text-danger'>Este usuário não existe!</span>");
					}else if(data == "PASSWORD_NOT_MATCHED"){
						$(".overlay").hide();
						pass.addClass("border-danger");
						$("#p_error").html("<span class='text-danger'>SENHA INCORRETA</span>");
						status = false;
					}else{
						$(".overlay").hide();
						console.log(data);
						window.location.href = DOMAIN+""; // pagina para qual vai se der bom
					}
				}
			})
		}
	})

	//Fetch category
	fetch_category();
	function fetch_category(){
		$.ajax({
			url : "./",
			method : "POST",
			data : {getCategory:1},
			success : function(data){
				var root = "<option value='0'>Root</option>";
				var choose = "<option value=''>Choose Category</option>";
				$("#parent_cat").html(root+data);
				$("#select_cat").html(choose+data);
			}
		})
	}

	//Fetch Brand
	fetch_brand();
	function fetch_brand(){
		$.ajax({
			url : "./",
			method : "POST",
			data : {getBrand:1},
			success : function(data){
				var choose = "<option value=''>Choose Brand</option>";
				$("#select_brand").html(choose+data);
			}
		})
	}

	//Add Category
	$("#category_form").on("submit",function(){
		if ($("#category_name").val() == "") {
			$("#category_name").addClass("border-danger");
			$("#cat_error").html("<span class='text-danger'>Please Enter Category Name</span>");
		}else{
			$.ajax({
				url : "./",
				method : "POST",
				data  : $("#category_form").serialize(),
				success : function(data){
					if (data == "CATEGORY_ADDED") {
							$("#category_name").removeClass("border-danger");
							$("#cat_error").html("<span class='text-success'>New Category Added Successfully..!</span>");
							$("#category_name").val("");
							fetch_category();
					}else{
						alert(data);
					}
				}
			})
		}
	})


	//Add Brand
	$("#brand_form").on("submit",function(){
		if ($("#brand_name").val() == "") {
			$("#brand_name").addClass("border-danger");
			$("#brand_error").html("<span class='text-danger'>Please Enter Brand Name</span>");
		}else{
			$.ajax({
				url : "./",
				method : "POST",
				data : $("#brand_form").serialize(),
				success : function(data){
					if (data == "BRAND_ADDED") {
						$("#brand_name").removeClass("border-danger");
						$("#brand_error").html("<span class='text-success'>New Brand Added Successfully..!</span>");
						$("#brand_name").val("");
						fetch_brand();
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//add product
	$("#product_form").on("submit",function(){
		$.ajax({
			url : "./",
			method : "POST",
			data : $("#product_form").serialize(),
			success : function(data){
				if (data == "NEW_PRODUCT_ADDED") {
					alert("New Product Added Successfully..!");
					$("#product_name").val("");
					$("#select_cat").val("");
					$("#select_brand").val("");
					$("#product_price").val("");
					$("#product_qty").val("");

				}else{
					console.log(data);
					alert(data);
				}
					
			}
		})
	})
})