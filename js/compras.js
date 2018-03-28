/**
 * Función que realiza una petición para obtener las compras realizadas por el usuario logueado
 * 
 * @author Luis Sanchez
 */
function cargarCompras() {
    $.ajax({
        url: dir + "php/getCompras.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                for (var key in result.data) {
                    datos = result.data[key];
                    $("#compras").append(
                        '<div class="d-flex flex-nowrap mb-2">' +
                        '<div class="card col-4 col-md-2">' +
                        '<img class="card-img" src="' + dir + "intranet/usuarios/" + datos.imagen.Id_usuario + "/uploads/" + datos.imagen.path + '" alt="Foto del producto">' +
                        '</div>' +
                        '<div class="card col-11">' +
                        '<div class="ml-4 d-flex justify-content-end">' +
                        '<i class="fa fa-caret-down"></i>' +
                        '</div>' +
                        '<ul class="list-unstyled">' +
                        '<li class="Producto_link" id="'+datos.Id_producto+'">' +
                        '<h3>' +
                        datos.nombre_producto +
                        '</h3>' +
                        '</li>' +
                        '<li class="">' +
                        '<h4>$ ' + datos.total + '</h4>' +
                        '</li>' +
                        '<li class="">Estado: ' +
                        datos.estado +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>'
                    );
                }
                $(".Producto_link").click(function (e) {
                    e.preventDefault();
                    href("php/mostrar-producto.php?key=" + this.id);
                });
                break;
        }
    });
}
$(document).ready(function(e){
    cargarCompras();
    
});