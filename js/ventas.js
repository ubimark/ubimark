function cargarPublicaciones() {
    $.ajax({
        url: dir + "php/getProductos.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                console.log(result.data);
                for (var key in result.data) {
                    datos = result.data[key];
                    $("#publicaciones").append(
                        '<div class="d-flex flex-nowrap mb-2">' +
                        '<div class="card col-4 col-md-2">' +
                        '<img class="card-img" src="' + dir + "intranet/usuarios/" + datos.imagen.Id_usuario + "/uploads/" + datos.imagen.path + '" alt="Foto del producto">' +
                        '</div>' +
                        '<div class="card col-11">' +
                        '<div class="ml-4 d-flex justify-content-end">' +
                        '<i class="fa fa-caret-down"></i>' +
                        '</div>' +
                        '<ul class="list-unstyled">' +
                        '<li class="">' +
                        '<h3>' +
                        datos.nombre_producto +
                        '</h3>' +
                        '</li>' +
                        '<li class="">' +
                        '<h4>$ ' + datos.precio + '</h4>' +
                        '</li>' +
                        '<li class="">Existencias:' +
                        datos.existencias +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>'
                    );
                }
                break;
        }
    });
}
$(document).ready(function(e){
    cargarPublicaciones();
});