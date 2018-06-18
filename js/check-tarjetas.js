// JavaScript Document
/**
 * Función que revisa si el formulario de tarjetas esta lleno y agrega el boton de confirmar
 * @author Jonathan Aguilar
 */
function formTarjetasCompleto(){
	if(visaOrMaster()&&checkNombre()&&checkFecha()&&checkCVV()){
		if($("#boton-confirmar").length==0){
			$("#confirmar-pago").append('<button class="btn btn-success" type="submit" id="boton-confirmar">Confirmar</button>');
			if($("#info-compra").hasClass('d-none')){
				$("#pago-envio").addClass("d-none d-md-block");
				$("#info-compra").removeClass("d-none d-md-block")
			}
			$("#boton-confirmar").click(function (e) {
				e.preventDefault();
				comprarCarro();
			});
		}else{
			addAlert("existe_boton", "Presiona el botón confirmar para realizar tu compra", "alert-success","","fa fa-check-circle","",true);
		}
	}
}

/**
 * Función que regresa a la pantalla anterior en la versión movil
 * @author Jonathan Aguilar
 */

function regresar(){
	$("#info-compra").addClass("d-none d-md-block");
	$("#pago-envio").removeClass("d-none d-md-block");
	$("#boton-confirmar").remove();
}

/**
 * Función que revisa los campos de metodo de pago
 * @author Jonathan Aguilar
 */
function visaOrMaster(){
	var aviso = $("#aviso-tarjeta");
	var numTarjeta = $("#numero-tarjeta").val();
	var regExpMaster =/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
	var regExpVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
	if(regExpVisa.test(numTarjeta)){
		$("#numero-tarjeta").removeClass("is-invalid").addClass("is-valid");
		$("#tarjeta-sucess").removeClass("text-danger").addClass("text-success");
		if($("#img-master").length>=0 && $("#img-visa").length==0){
			$("#img-master").remove();
			$("#card-header").append('<i class="fa fa-cc-visa fa-2x pull-right font-white" id="img-visa"></i>');
		}
		return true;
	}else{
		if(regExpMaster.test(numTarjeta)){
			$("#numero-tarjeta").removeClass("is-invalid").addClass("is-valid");
			$("#tarjeta-sucess").removeClass("text-danger").addClass("text-success");
			if($("#img-visa").length>=0 && $("#img-master").length==0){
				$("#img-visa").remove();
				$("#card-header").append('<i class="fa fa-cc-mastercard fa-2x pull-right font-white" id="img-master"></i>');
			}
			return true;
		}else{
			aviso.text("Tarjeta de credito no valida");
			$("#numero-tarjeta").removeClass("is-valid").addClass("is-invalid");
			$("#tarjeta-sucess").removeClass("text-sucess").addClass("text-danger");
			$("#aviso-tarjeta").removeClass("valid-feedback").addClass("invalid-feedback");
			return false;
		}
	}
}


function checkNombre(){
	var nombre = $("#nombre-apellido").val();
	var aviso = $("#aviso-nombre");
	var regExpName = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
	if(regExpName.test(nombre)){
		$("#nombre-apellido").removeClass("is-invalid").addClass("is-valid");
		$("#text-nombre").removeClass("text-danger").addClass("text-success");
		return true;
	}else{
		$("#nombre-apellido").removeClass("is-valid").addClass("is-invalid");
		$("#text-nombre").removeClass("text-sucess").addClass("text-danger");
		$("#aviso-nombre").removeClass("valid-feedback").addClass("invalid-feedback");
		aviso.text("Ingresa un nombre valido");
	}
	
}

function checkFecha(){
	var fechaExp = $("#fecha-exp").val()+"";
	var aviso=$("#aviso-fecha");
	var regExpFecha = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
	$( "#fecha-exp" ).on( "keydown", function teclaPress( event ) {
		if(event.which!==8){
			if($("#fecha-exp").val().length==2){
				$("#fecha-exp").val($("#fecha-exp").val()+"/");
			}
		}
	  });
	
	if(fechaExp.length==5){
		if(regExpFecha.test(fechaExp)){
			$("#fecha-exp").removeClass("is-invalid").addClass("is-valid");
			$("#text-fecha").removeClass("text-danger").addClass("text-success");
			return true;
		}else{
			$("#text-fecha").removeClass("text-sucess").addClass("text-danger");
			$("#fecha-exp").removeClass("is-valid").addClass("is-invalid");
			$("#aviso-fecha").removeClass("valid-feedback").addClass("invalid-feedback");
			aviso.text("Ingresa una fecha valida");
		}
	}
}

function checkCVV(){
	var cvv = $("#cvv").val()+"";
	var aviso=$("#aviso-cvv");
	var regEx = /^[0-9]{3}$/;
	if(regEx.test(cvv)){
		$("#cvv").removeClass("is-invalid").addClass("is-valid");
		$("#text-cvv").removeClass("text-danger").addClass("text-success");
		return true;
	}else{
		$("#text-cvv").removeClass("text-sucess").addClass("text-danger");
		$("#cvv").removeClass("is-valid").addClass("is-invalid");
		$("#aviso-cvv").removeClass("valid-feedback").addClass("invalid-feedback");
		aviso.text("Ingresa una código de seguridad valido");
	}
}


