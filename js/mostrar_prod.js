var band_empresa = false;
var coords;
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
        url: api("carrito.php"),
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

function cargarImagenes(images){
    let i = 1;
    images.forEach(image => {
        $("#carousel_body").append(
            '<div class = "carousel-item carousel-item-prod ' + (i == 1 ? "active" : "") + '" data-slide-number = ' + i + ' >' +
            '<img src = "../intranet/usuarios/' + image.uploadedBy + '/uploads/' + image.path + '" class = "img-fluid img-resize" >' +
            '</div>');
        $("#carousel_ind").append('<li class= "' + (i == 0 ? "active" : "") + '" data-slide-to="' + i + '" data-target="#myCarousel"></li>')
        i++;
    });
    $("#carousel_body").append('<a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">' +
        '<em class="fa fa-arrow-circle-o-left fa-2x" style="color: gray;" aria-hidden="true"></em>' +
        '<span class="sr-only">Previous</span>' +
        '</a>' +
        '<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">' +
        '<em class="fa fa-arrow-circle-o-right fa-2x" style="color: gray;" aria-hidden="true"></em>' +
        '<span class="sr-only">Next</span>' +
        '</a>');
}

function cargarInfoVendedor(vendedor){
    $("#empresa").html(vendedor.nombre);
    let i=1;
    vendedor.addrs.forEach(addr => {
        $("#addr"+i).html(addr);
        i++;
    });
    i=vendedor.calificacion;
    $("#calificacion").html("("+i+")");
    while(i>0){
        if(i>=1){
            star = "fa-star";
        }else{
            star = "fa-star-half";
        }
        $("#stars").append('<i class="fa '+star+' colorStar"></i>');
        i--;
    } 
}

function cargarPreguntas() {
    $("#seccion_preguntas").html("");
    $.ajax({
        url: api("preguntas.php?Id_producto=" + getParameterByName('key')),
        dataType: "json",
        type: "get"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;

                for (var pregunta of datos) {
                    $("#seccion_preguntas").append(
                        '<div class="background-grey col-12 rounded p-2 mb-3 " id="pregunta_' + pregunta.Id_pregunta + '">' +
                        '<span class="px-1">' + pregunta.cliente + '</span>' +
                        '<span class="px-2 float-right fecha">' + pregunta.fecha + '</span>' +
                        '<span class="d-block px-2 pregunta">' + pregunta.pregunta + '</span>' +
                        '</div>'
                    );
                    for (var respuesta of pregunta.respuestas) {
                        $('#pregunta_' + pregunta.Id_pregunta).append(
                            '<span class="ml-2 pl-3 respuesta">' + respuesta.respuesta + '</span>'
                        );
                    }
                }

                break;
            case 305:
                $("#seccion_preguntas").append(
                    '<div class="background-grey col-12 rounded p-2 mb-3 ">' +
                    '<span class="d-block px-2 pregunta text-center">Aún no hay preguntas para este producto, se el primero en realizar una!</span>' +
                    '</div>'
                );
                break;
        }
    }).always(function(){
        initMap(band_empresa);
    });
}

function cargarProducto() {
    key = getParameterByName('key');
    $.ajax({
        url: api("producto.php?key=" + key),
        type: "get",
        dataType: "JSON"
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                data = res.data
                cargarImagenes(data.images);
                switch(data.tipo_cuenta){
                    case "EMPRESA":
                        coords = data.vendedor.coordenadas.split(",");
                        set_band_empresa(true);
                        $("#addrEmp").removeClass("d-none");
                        cargarInfoVendedor(data.vendedor)
                        break;
                    case "PERSONAL":
                        getCoords(data.vendedor.addrs[0]);
                        set_band_empresa(false);
                        cargarInfoVendedor(data.vendedor);
                        break;
                }
                
                $("#nom-producto").html(data.nombre_producto);
                $("#precio").html("$ "+ parseFloat(data.precio).toFixed(2));
                $("button.add2cart").prop("id",data.Id_producto);
                $("#btn-comprar").attr("folio",data.Id_producto);
                $("#description").html(data.descripcion);
                $("#send_pregunta").attr("producto",data.Id_producto);
        }
    }).always(function(){
        cargarPreguntas();
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
        url: api("comprarProducto.php"),
        dataType: "json",
        type: "post",
        data: {
            Id_prod: Id
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 100:
                href("paginas/login.html?rdir=" + window.location.pathname + "?key=" + Id);
                break;
            case 200:
                addAlert("comprado", "Compra realizada correctamente", "alert-success", "", "fa-check", "", true);
                break;
            case 304:
                addAlert("existencias", "No hay existencias suficientes para procesar la compra de " + result.data.nombre_producto, "alert-warning", "", "fa-warning", "", true);
                break;
        }
    });
}

function initMap(empresa = true) {
    var zoom = empresa ? 15 : 13;
    var coords = {
        lat: parseFloat(window.coords[0]),
        lng: parseFloat(window.coords[1])
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: coords
    });
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: $("#empresa").html(),
        animation: google.maps.Animation.BOUNCE
    });
    var contentString = $("#info_empresa").html();

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);

}

function getCoords(location) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        dataType: "json",
        type: "GET",
        async: false,
        data: {
            address: location,
            key: "AIzaSyCWY7xqWIram5PPPWVbXyN_I22rC02OQY0",
            language: "es"
        }
    }).done(function (data) {
        datos = data.results[0].geometry.location;
        coords = new Array();
        coords[0]=datos.lat;
        coords[1]=datos.lng;
    });
}

function send_pregunta(producto) {
    $.ajax({
        url: api("preguntas.php"),
        dataType: "json",
        type: "post",
        data: {
            "pregunta": $("#pregunta").val(),
            "Id_producto": producto
        }

    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                addAlert("alert_pregunta", "Su pregunta ha sido enviada", "alert-success", "", "fa fa-check", "", true);
                $("#pregunta").val('');
                cargarPreguntas();
                datos = result.data;
                send_notificacion("PREGUNTA", datos.user, datos.target, datos.destino, datos.fecha, datos.tipo);
                break;
        }

    });
}

function set_band_empresa(val) {
    band_empresa = val;
}


$(document).ready(function (e) {
    cargarProducto();
    
    //cargarPreguntas();
    $(".add2cart").click(function (e) {
        e.preventDefault();
        add2cart(this.id, $("#cantidad").val());
    });
    $("#btn-comprar").click(function (e) {
        e.preventDefault();
        comprarProducto($(this).attr("folio"));

    });
    $("#send_pregunta").click(function (e) {
        e.preventDefault();
        if (sess != 1) {
            href("paginas/login.html?rdir=" + window.location.pathname + "?key=" + getParameterByName('key'));
        }
        if ($("#pregunta").val().length > 0) {
            send_pregunta($(this).attr("producto"));
            $("#pregunta").removeClass("border-danger");
        } else {
            $("#pregunta").addClass("border-danger");
        }
    });
    
});