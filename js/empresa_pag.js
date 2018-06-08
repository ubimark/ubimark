var empresa  = "";

function cargarProductos_empresa() {
    $.ajax({
        url: dir + "php/getProductosEmpresa.php",
        type: "post",
        dataType: "json",
        data: {
            "nombre_empresa": empresa
        }
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                loadDatosEmpresa(res.data);
                for (let producto of res.data.productos) {
                    $("#productos_empresa_pag").append(
                    '<div class="card mr-2 col-12 col-md-3 col-lg-2 float-left mb-2">'+
                        '<img class="card-img-top" src="../../../intranet/usuarios/'+producto.imagen.Id_usuario+'/uploads/'+producto.imagen.path+'" alt="Card image cap">'+
                        '<div class="card-block">'+
                            '<a id = "prod'+producto.Id_producto+'">'+
                                '<h4 class="card-title">'+producto.nombre_producto+'</h4>'+
                            '</a>'+
                            '<p class="card-text"><strong>$'+producto.precio+'</strong></p>'+
                        '</div>'+
                    '</div>'
                    );
                    $("#prod"+producto.Id_producto).click(function(e){
                        e.preventDefault();
                        href("php/mostrar-producto.php?key=" + producto.Id_producto);
                    });
                }

                break;
        }
    });
}

function loadDatosEmpresa(empresa){
    $(".dir_empresa").html(empresa.ciudad + ", " + empresa.estado);
    
    let calificacion = empresa.calificacion
    while(calificacion > 0.0){
        if(calificacion >= 1){
            $(".rating").append('<i class="fa fa-star colorStar"></i>');
            calificacion -= 1;
        }else{
            $(".rating").append('<i class="fa fa-star-half colorStar"></i>');
            calificacion = 0;
        }
    }
    $(".rating").append('<small> ('+empresa.calificacion+')</small>');
    $(".img-cover").attr("src","uploads/"+empresa.portada);
    $(".img-logo").attr("src","uploads/"+empresa.logo);

    $(".tel_empresa").html(empresa.telefono);
    $(".mail_empresa").html(empresa.email);
    $(".calle_numero").html(empresa.calle + " #" + empresa.numero +(empresa.numinterior != null && empresa.numinterior != "" ? "int. "+empresa.numinterior : "")+", Col. "+empresa.colonia);
}

function setNombreEmpresa(){
    let i = 0;
    empresa = window.location.pathname;
    i = window.location.pathname.indexOf("empresas/");
    empresa = empresa.substr(i+9)
    i = empresa.indexOf("/index.html");
    empresa = empresa.substring(0,i);
    empresa = empresa.replace("%20"," ");
    $(".nom_empresa").html(empresa);
}

$(document).ready(function (e) {
    setNombreEmpresa();
    cargarProductos_empresa();
});