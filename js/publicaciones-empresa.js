function cargarPublicaciones() {
    $.ajax({
        url:api("producto.php?tipo=EMPRESA"),
        type: "get",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                 
                for (var key in result.data) {
                    datos = result.data[key];
                    $("#publicaciones").append(
                        '<div class="d-flex flex-nowrap mb-2 col-10" id="cont_'+datos.Id_producto+'">' +
                            '<div class="card col-md-2">' +
                                '<img class="card-img" src="'+api("intranet/usuarios/" + datos.imagen.Id_usuario + "/uploads/" + datos.imagen.path) + '" alt="Foto del producto">' +
                            '</div>' +
                            '<div class="card col-10 justify-content-center">' +
                                '<div class="dropdown">' +
                                    '<i class="fa fa-angle-down float-right" id="dropdownPublicacion" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>' +
                                    '<div class="dropdown-menu" aria-labelledby="dropdownPublicacion">'+
                                    '<a class="dropdown-item" href="modificar-publicacion.html">Modificar</a>'+
                                    '<p class="dropdown-item del_prod" prod="'+datos.Id_producto+'" >Eliminar</p>'+
                                    '</div>'+
                                '</div>' +
                        
                                '<h5>' +
                                datos.nombre_producto +
                                '</h5>' +
                        
                                '<strong>$ ' + datos.precio + '</strong>' +
                                '<small>Existencias:' + datos.existencias +'</small>'+

                            '</div>' +
                        '</div>'
                    );
                    $(".del_prod").click(function(e){
                        e.preventDefault();
                        deleteProd($(this).attr("prod"));
                    })
                }
                break;
        }
    });
}


function deleteProd(id){
    $.ajax({
        url: api("producto.php"),
        type: "delete",
        dataType: "json",
        data: {
            Id_producto : id
        }
    }).done(function(res){
        switch(res.status_code){
            case 200:
                $("#cont_"+id).remove();
                break;
        }
    });
}

$(document).ready(function(e){
    cargarPublicaciones();
});