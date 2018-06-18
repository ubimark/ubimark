/**
 * Funcion que carga el carrito de compras
 * 
 * @author Luis Sanchez
 */
function cargarCarrito() {
    $.ajax({
        url:api("carrito.php"),
        type: "get",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;
                var total = 0;
                $("#carrito").html("");
                for (var key in datos) {
                    total += (datos[key].precio * datos[key].cantidad);
                    /*
                    if (datos[key].cantidad > datos[key].existencias) {
                        clase = "btn-outline-danger text-dark";
                    } else {
                        clase = "";
                    } */
                    $("#productos_carrito").append('<div class="d-flex flex-nowrap mb-2">'+
                                        '<div class="card col-2 col-md-3">'+
                                        '<img class="card-img" src="'+api("intranet/usuarios/"+datos[key].vendedor+"/uploads/"+datos[key].path)+'" alt="Foto del producto">'+
                                        '</div>'+
                                        '<div class="card col-9">'+
                                        '<ul class="list-unstyled">'+
                                        '<li class="">'+
                                        '<h6>'+datos[key].nombre_producto+'</h6>'+
                                        '</li>'+
                                        '<li class="">'+
                                        '<strong>$ '+parseFloat(datos[key].precio).toFixed(2)+'</strong>'+
                                        '</li>'+
                                        '</ul>'+
                                        '</div>'+
                                        '</div>');
                }
                $("#subtotal").html("$ "+parseFloat(total).toFixed(2));
                $("#total_compra").html(parseFloat(total+500).toFixed(2));
                
                break;
        }
    });
}

function cargarDatos(){
    $.ajax({
        url:api("datos_usuario.php"),
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data[0];
                for (var key in datos) {
                    if (datos[key] === null) {
                        datos[key] = "";
                    }
                    $("#envio-" + key).html(" " + datos[key]);
                }
                break;
        }
    });
}

function comprarCarro(){
    $.ajax({
        url:api("comprar_carrito.php"),
        dataType: "json",
        type: "post"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                addAlert("comprado", "Compra realizada correctamente", "alert-success", "", "fa-check", "", true);
                break;
            case 304:
                addAlert("existencias", "No hay existencias suficientes para procesar la compra de " + result.data.nombre_producto, "alert-warning", "", "fa-warning", "", true);
                break;
        }
    });
}

$(document).ready(function(e){
    cargarCarrito();
    cargarDatos();
});