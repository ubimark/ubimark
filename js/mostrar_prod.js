var band_empresa = false;
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

function cargarPreguntas() {
    $("#seccion_preguntas").html("");
    $.ajax({
        url: dir + "php/cargar_preguntas.php",
        dataType: "json",
        type: "post",
        data: {
            "Id_producto": getParameterByName('key')
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;
                console.log(datos);
                for(var pregunta of datos){
                    $("#seccion_preguntas").append(
                        '<div class="background-grey col-12 rounded p-2 mb-3 " id="pregunta_'+pregunta.Id_pregunta+'">' +
                        '<span class="px-1">'+pregunta.cliente+'</span>'+
                        '<span class="px-2 float-right fecha">'+pregunta.fecha+'</span>'+
                        '<span class="d-block px-2 pregunta">'+pregunta.pregunta+'</span>' +
                        '</div>'
                    );
                    for(var respuesta of pregunta.respuestas){
                        $('#pregunta_'+pregunta.Id_pregunta).append(
                            '<span class="ml-2 pl-3 respuesta">'+respuesta.respuesta+'</span>' 
                        );
                    }
                }
                
                break;
            case 305:
                $("#seccion_preguntas").append(
                    '<div class="background-grey col-12 rounded p-2 mb-3 ">' +
                    '<span class="d-block px-2 pregunta text-center">Aún no hay preguntas para este producto, se el primero en realizar una!</span>'+
                    '</div>'
                );
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
        lat: parseFloat($("#lat").val()),
        lng: parseFloat($("#lon").val())
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
        $("#lat").val(datos.lat);
        $("#lon").val(datos.lng);
    });
}

function send_pregunta(producto) {
    $.ajax({
        url: dir + "php/enviar_pregunta.php",
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
                send_notificacion("PREGUNTA",datos.user,datos.target,datos.destino,datos.fecha);
                break;
        }

    });
}

function set_band_empresa(val) {
    band_empresa = val;
}

$(document).ready(function (e) {
    initMap(band_empresa);
    cargarPreguntas();
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