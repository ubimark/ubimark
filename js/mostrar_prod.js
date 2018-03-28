/**
 * Funcion para agregar un producto al carrito
 * 
 * @author Luis Sanchez
 * @param {int} id 
 */
function add2cart(id, cantidad) {
    if (sess != 1) {
        href("paginas/login.html");
    }
    $.ajax({
        url: dir + "php/agregar-carrito.php",
        type: "post",
        dataType: "json",
        data: {
            Id_producto: id,
            cantidad: cantidad
        }
    }).
    done(function (result) {
        switch (result.status_code) {
            case 200:
                addAlert("add2cart_200", "El producto ha sido agregado a su carrito", "alert-success", "", "fa-check-circle", "", true);

                break;
            case 303:
                if ($("#add2cart_303")) {
                    $("#add2cart_303").remove();
                }
              
                addAlert("add2cart_303", "El producto ya se encuentra en tu carrito", "alert-warning", "", "", "", true);
                break;
        }
    });

}

/**
 * Función que envia la petición de compra de un producto
 * 
 * @author Luis Sanchez
 * @param {int} Id 
 */
function comprarProducto(Id) {
    $.ajax({
        url: dir + "php/comprarProducto.php",
        dataType: "json",
        type: "post",
        data: {
            Id_prod: Id
        }
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
    $(".add2cart").click(function (e) {
        e.preventDefault();
        add2cart(this.id, $("#cantidad").val());
    });
    $("#btn-comprar").click(function (e) {
        e.preventDefault();
        comprarProducto($(this).attr("folio"));

    });
});