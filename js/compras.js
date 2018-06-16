var saved_data;
/**
 * Función que realiza una petición para obtener las compras realizadas por el usuario logueado
 * 
 * @author Luis Sanchez
 */
function cargarCompras() {
    $.ajax({
        url:api("getCompras.php"),
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                saved_data = result.data;
                for (var key in result.data) {
                    datos = result.data[key];
                    switch(datos.estado){
                        case "NO ENVIADO":
                            estatus = "fa-times-circle text-danger";
                            datos.estado = "No enviado";
                            break;
                        case "ENVIADO":
                            estatus = "fa-truck text-info";
                            datos.estado = "Enviado";
                            break;
                        case "ENTREGADO":
                            estatus = "fa-check text-success";
                            datos.estado = "Entregado";
                            break;
                    }
                    $("#compras").append(
                        '<div class="d-flex flex-nowrap mb-2 col-10">' +
                            '<div class="card col-md-2">' +
                            '<img class="card-img" src="' + dir + "intranet/usuarios/" + datos.imagen.Id_usuario + "/uploads/" + datos.imagen.path + '" alt="Foto del producto">' +
                            '</div>' +
                            '<div class="card col-10 d-flex flex-row align-items-center">' +
                                '<div class="col-6">' +
                                    '<h5 class="Producto_link" id="'+datos.Id_producto+'">' +
                                    datos.nombre_producto +
                                    '</h5>' +
                                    '<strong>$ '+ parseFloat(datos.total).toFixed(2) +'</strong>'+
                                    '<br>' +
                                    '<small>x ' + datos.cantidad + '</small>' +
                                '</div>' +
                                '<div class="col-4">'+
                                    '<div class="p-2 bg-light rounded">'+
                                            '<p class="m-0"> <i class="text-primary fa fa-user-circle"></i> '+datos.vendedor.nombre+'</p>'+
                                            '<small class="m-0 text-muted"> <i class="fa fa-phone "></i> '+datos.vendedor.telefono+'</small>'+
                                            '<p class="m-0"> <i class="fa '+estatus+'"></i> '+datos.estado+'</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-2">'+
                                    '<button type="button" prod="'+key+'" class="btn btn-link modal_info_compra" data-toggle="modal" data-target="#modal-info">Información</button>'+
                                '</div>'+
                            '</div>' +
                        '</div>'
                    );
                   

                }
                $(".modal_info_compra").click(function(e){
                    e.preventDefault();
                    data = window.saved_data[$(this).attr("prod")];
                    $("#modal_img").prop("src",dir+"intranet/usuarios/"+data.imagen.Id_usuario+"/uploads/"+data.imagen.path);
                    $("#nombre-prod").html(data.nombre_producto);
                    $("#cant-prod").html("x "+data.cantidad);
                    $("#precio-prod").html("$ "+parseFloat(data.total).toFixed(2)); 
                    $("#vend_nombre").html(data.vendedor.nombre);
                    $("#vend_calle").html(data.vendedor.calle);
                    $("#vend_num").html(data.vendedor.numero);
                    $("#vend_col").html(data.vendedor.colonia);
                    $("#vend_cp").html(data.vendedor.cp);
                    $("#vend_ciudad").html(data.vendedor.ciudad);
                    $("#modal_estatus").html(data.estado);
                });
                $(".Producto_link").click(function (e) {
                    e.preventDefault();
                    href("paginas/mostrar-producto.html?key=" + this.id);
                });
                break;
        }
    });
}
$(document).ready(function(e){
    cargarCompras();
    
});