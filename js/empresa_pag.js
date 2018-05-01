function cargarProductos_empresa() {
    $.ajax({
        url: dir + "php/getProductosEmpresa.php",
        type: "post",
        dataType: "json",
        data: {
            "Id": 18
        }
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                for (let producto of res.data) {
                    $("#productos_empresa_pag").append(
                    '<div class="card mr-2 col-12 col-md-3 col-lg-2 float-left mb-2">'+
                        '<img class="card-img-top" src="../../../intranet/usuarios/'+producto.imagen.Id_usuario+'/uploads/'+producto.imagen.path+'" alt="Card image cap">'+
                        '<div class="card-block">'+
                            '<a href="">'+
                                '<h4 class="card-title">'+producto.nombre_producto+'</h4>'+
                            '</a>'+
                            '<p class="card-text"><strong>$'+producto.precio+'</strong></p>'+
                        '</div>'+
                    '</div>'
                    );
                }

                break;
        }
    });
}



$(document).ready(function (e) {
    cargarProductos_empresa();
});