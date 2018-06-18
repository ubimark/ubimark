/**
 * Función que manda la petición para actualizar la cantidad en el carrito
 * 
 * @author Luis Sanchez
 * @param {int} folio Folio del articulo en el carrito
 * @param {int} cantidad Cantidad del articulo en el carrito
 */
function actualizarCarrito(folio, cantidad) {
    var total = parseFloat($("#cart-total").html());
    total -= parseFloat($("#t_" + folio).html());
    $.ajax({
        url:api("carrito.php"),
        type: "put",
        dataType: "json",
        data: {
            folio_carrito: folio,
            cantidad: cantidad
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;
                if (datos[0].cantidad > datos[0].existencias) {
                    clase = "btn-outline-danger text-dark";
                } else {
                    clase = "";
                }
                $("#fc_" + folio).html('<div class="ml-4 d-flex justify-content-end close-carrito" folio="' + datos[0].folio_carrito + '">' +
                    ' <i class="fa fa-close " ></i>' +
                    '</div>' +
                    '<ul class="list-unstyled">' +
                    '<li class="">' +
                    '<h3> ' + datos[0].nombre_producto + '</h3>' +
                    '</li>' +
                    '<li class="">' +
                    ' <h4>$ ' + datos[0].precio + '</h4>' +
                    '</li>' +
                    '<li class="d-flex">' +
                    '<input class="form-control col-3 col-md-2 col-lg-1 in_cantidad ' + clase + '" type="number" value="' + datos[0].cantidad + '" folio="' + datos[0].folio_carrito + '" name="cantidad" id="cantidad">' +
                    '<span class="p-2"> en existencia ' + datos[0].existencias + '</span>' +
                    '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[0].folio_carrito + '">' + (datos[0].precio * datos[0].cantidad) + '</span></h5>' +
                    '</li>' +
                    '</ul>');
                $("#cart-total").html(total + (datos[0].precio * datos[0].cantidad));
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() == 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
                        return;
                    }
                    actualizarCarrito($(this).attr("folio"), $(this).val());
                });
                $(".close-carrito").click(function (e) {
                    e.preventDefault();
                    folio = $(this).attr("folio");
                    borrarCarrito(folio);
                });
                break;
        }
    });
}

/**
 * Función que elimina articulos de tu carrito
 * 
 * @author Luis Sanchez
 * @param {int} folio folio del articulo del carrito
 */
function borrarCarrito(folio) {
    var total = parseFloat($("#cart-total").html());
    total -= parseFloat($("#t_" + folio).html());
    $.ajax({
        url:api("carrito.php"),
        type: "delete",
        dataType: "json",
        data: {
            folio_carrito: folio
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                $("#cont_" + folio).remove();
                $("#cart-total").html(total);
                break;
        }
    });
}

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
                    if (datos[key].cantidad > datos[key].existencias) {
                        clase = "btn-outline-danger text-dark";
                    } else {
                        clase = "";
                    }
                    $("#carrito").append('<div class="d-flex flex-nowrap mb-3" id="cont_' + datos[key].folio_carrito + '">' +
                        '<div class="card col-4 col-md-2">' +
                        '<img class="card-img" src="' + api( "intranet/usuarios/" + datos[key].vendedor + "/uploads/" + datos[key].path) + '" alt="Foto del producto">' +
                        '</div>' +
                        '<div class="card container-fluid" id="fc_' + datos[key].folio_carrito + '">' +
                        '<div class="ml-4 d-flex justify-content-end close-carrito" folio="' + datos[key].folio_carrito + '">' +
                        ' <i class="fa fa-close " ></i>' +
                        '</div>' +
                        '<ul class="list-unstyled">' +
                        '<li class="">' +
                        '<h3> ' + datos[key].nombre_producto + '</h3>' +
                        '</li>' +
                        '<li class="">' +
                        ' <h4>$ ' + datos[key].precio + '</h4>' +
                        '</li>' +
                        '<li class="d-flex">' +
                        '<input class="form-control col-3 col-md-2 col-lg-1 in_cantidad ' + clase + '" type="number" value="' + datos[key].cantidad + '" folio="' + datos[key].folio_carrito + '" name="cantidad" id="cantidad">' +
                        '<span class="p-2"> en existencia ' + datos[key].existencias + '</span>' +
                        '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[key].folio_carrito + '">' + (datos[key].precio * datos[key].cantidad) + '</span></h5>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>');
                }
                $("#cart-total").html(total);
                $(".close-carrito").click(function (e) {
                    e.preventDefault();
                    folio = $(this).attr("folio");
                    borrarCarrito(folio);
                });
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() == 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
                        return;
                    }
                    actualizarCarrito($(this).attr("folio"), $(this).val());
                });
                break;
        }
    });
}

function comprarCarrito() {
    href("paginas/form-compra-carrito.html");
    
}

$(document).ready(function(e){
    cargarCarrito();
    $("#comprar_carrito").click(function (e) {
        e.preventDefault();
        comprarCarrito();

    });
});