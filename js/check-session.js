var dir; //Directorio a seguir
var lat, lon, estado; //Latitud y Longitud , estado
var sess = 2; //Guarda la sesion 0:inactiva 1:activa 2:sin comprobar
var imgcont, images = Array(); //imgcont: define el contenedor de la imagen subida
//images: guarda las imagenes a subir   

/**
 * Función que acomoda el contenido para no tener conflictos con el menu fixed
 * 
 * @author Luis Sanchez
 * @param {boolean} [$reintento=false] 
 * @returns  
 */
function acomodarContenido($reintento = false) {
    var width = window.innerWidth;
    if ($reintento) {
        if (sess == 2) {
            addAlert("fail2checksess", "Ocurrio un error al verificar la sesión, compruebe su conexión a internet.", "alert-warning", "", "", "");
            return;
        }
    }
    switch (sess) {
        case 0:
            $("#contenido").css("margin-top", "4.1rem");
            break;
        case 1:
            if (width < 576) {
                $("#contenido").css("margin-top", "3.5rem");
            } else if (width < 767) {
                $("#contenido").css("margin-top", "3.9rem");
            } else {
                $("#contenido").css("margin-top", "6.6rem");
            }
            break;
        case 2:
            check_session();
            acomodarContenido(true);
            break;
    }
}

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
        url: dir + "php/actualizar-carrito.php",
        type: "post",
        dataType: "json",
        data: {
            folio_carrito: folio,
            cantidad: cantidad
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;
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
                    '<input class="form-control col-1 in_cantidad" type="number" value="' + datos[0].cantidad + '" folio="' + datos[0].folio_carrito + '" name="cantidad" id="cantidad">' +
                    '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[0].folio_carrito + '">' + (datos[0].precio * datos[0].cantidad) + '</span></h5>' +
                    '</li>' +
                    '</ul>');
                $("#cart-total").html(total + (datos[0].precio * datos[0].cantidad));
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() === 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
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
 * Función para crear alertas
 * 
 * @author Luis Sanchez
 * @param {string} id Id del DOM
 * @param {string} message Mensaje a mostrar en la alerta 
 * @param {string} color Color de la alerta ("alert-*")
 * @param {string} bgcolor Color de fondo ("bg-*") 
 * @param {string} ico Icono mostrado antes del mensaje de la alerta 
 * @param {string} ico2 Icono mostrado despues del mensaje de la alerta 
 * @param {boolean} autoclose Cerrar en automatico
 */
function addAlert(id, message, color, bgcolor, ico, ico2, autoclose) {
    $("#alertas").append(
        "<div class='alert " + color + " " + bgcolor + " alert-dismissible fade show text-center mb-0 ' role='alert' id=" + id + ">" +
        "<i class='fa " + ico + " mr-2' ></i>" +
        "<span>" + message + "</span>" +
        "<i class='fa " + ico2 + " ml-2' ></i>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='close'>" +
        "<span aria_hidden='true'>&times;</span>" +
        "</button>" +
        "</div>"
    );
    if (autoclose) {
        window.setTimeout(function () {
            $("#" + id).fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 2000);
    }
}

/**
 * Funcion para agregar un producto al carrito
 * 
 * @author Luis Sanchez
 * @param {int} id 
 */
function add2cart(id, cantidad) {
    if(sess != 1){
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
 * Función que elimina articulos de tu carrito
 * 
 * @author Luis Sanchez
 * @param {int} folio folio del articulo del carrito
 */
function borrarCarrito(folio) {
    var total = parseFloat($("#cart-total").html());
    total -= parseFloat($("#t_" + folio).html());
    $.ajax({
        url: dir + "php/quitar-carrito.php",
        type: "post",
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
 * Funcion que carga el carrito de compras en el dropdown del menu (max 5 items) y en la pagina de mostrar-carrito
 * 
 * @author Luis Sanchez
 */
function cargarCarrito() {
    $.ajax({
        url: dir + "php/obtenerCarrito.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data;
                var total = 0;
                var cont = 0;
                $("#carrito-dropdown").html("");
                $("#carrito").html("");
                for (var key in datos) {

                    if (window.location.pathname.indexOf("mostrar-carrito.html") != -1) {
                        total += (datos[key].precio * datos[key].cantidad);

                        $("#carrito").append('<div class="d-flex flex-nowrap mb-3" id="cont_' + datos[key].folio_carrito + '">' +
                            '<div class="card col-4 col-md-2">' +
                            '<img class="card-img" src="' + dir + "intranet/usuarios/" + datos[key].vendedor + "/uploads/" + datos[key].path + '" alt="Foto del producto">' +
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
                            '<input class="form-control col-3 col-md-2 col-lg-1 in_cantidad" type="number" value="' + datos[key].cantidad + '" folio="' + datos[key].folio_carrito + '" name="cantidad" id="cantidad">' +
                            '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[key].folio_carrito + '">' + (datos[key].precio * datos[key].cantidad) + '</span></h5>' +
                            '</li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>');
                    }
                    if (cont++ < 5) {
                        $("#carrito-dropdown").append(
                            '<span class="dropdown-item">' +
                            '<strong>' + datos[key].nombre_producto + '</strong>' +
                            '<p>x' + datos[key].cantidad + ' $' + (datos[key].precio * datos[key].cantidad) + '</p>' +
                            '</span>'
                        );
                    }
                }
                $("#carrito-dropdown").append('<div class="dropdown-divider"></div>' +
                    '<a class="dropdown-item ver_carrito"  >Ver más</a>');
                $("#cart-total").html(total);
                $(".close-carrito").click(function (e) {

                    e.preventDefault();
                    folio = $(this).attr("folio");
                    borrarCarrito(folio);
                });
                $(".ver_carrito").click(function (e) {
                    e.preventDefault();
                    href("paginas/mostrar-carrito.html");
                });
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() === 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
                    }
                    actualizarCarrito($(this).attr("folio"), $(this).val());
                });
                break;
        }
    });


}

/**
 * Funcion que carga los datos del usuario y la empresa
 * 
 * @author Luis Sanchez
 */
function cargarDatos(){
    $.ajax({
        url:dir+"php/datos_usuario.php",
        type:"post",
        dataType:"json"
    }).done(function(result){
        switch(result.status_code){
            case 200:
                datos = result.data[0];
                for(var key in datos){
                    if(datos[key] === null){
                        datos[key] = "";
                    }
                    console.log(key+" - "+datos.key);
                }
                $("#personal_nombre").append(" "+datos.nombre);
				$("#personal_apellido").append(" "+datos.apellidos);
				$("#personal_nacimiento").append(" "+datos.nacimiento);
				$("#personal_sexo").append(" "+datos.sexo);
                $("#personal_calle").append(" "+datos.calle);
				$("#personal_numero").append(" "+datos.numero);
				$("#personal_colonia").append(" "+datos.colonia);
				$("#personal_ciudad").append(" "+datos.delegacion);
				$("#personal_estado").append(" "+datos.estado);
				$("#personal_cp").append(" "+datos.cp);
				$("#personal_telefono").append(" "+datos.telefono);
				$("#personal_correo_back").append(" "+datos.correo_back);
                break;
        }
    });
    $.ajax({
        url:dir+"php/datos_empresa.php",
        type:"post",
        dataType:"json"
    }).done(function(result){
        switch(result.status_code){
            case 200:
                datos = result.data[0];
                $("#registra_empresa").remove();
                $("#mc-menu-empresa").removeClass("d-none");
                $("#empresa_nombre").append(" "+datos.nombre);
                $("#empresa_correo").append(" "+datos.email);
                $("#empresa_telefono").append(" "+datos.telefono);
                $("#empresa_calle").append(" "+datos.calle);
				$("#empresa_numero").append(" "+datos.numero);
				$("#empresa_colonia").append(" "+datos.colonia);
				$("#empresa_ciudad").append(" "+datos.delegacion);
				$("#empresa_estado").append(" "+datos.estado);
				$("#empresa_cp").append(" "+datos.cp);
                break;
        }
    });
}

/**
 * Funcion que pide los productos mas buscados
 * 
 * @author Luis Sanchez
 */
function cargarProductosDestacados() {
    console.log("p");
    $.ajax({
        url:dir+"php/getProductosDestacados.php",
        dataType:"json",
        type:"post",
        data:{estado:estado}
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                $("#PD_contenido").append('<button type="button" class="slick-prev slick-arrow"></button>');
                for (var i = 0; i < 6; i++) {
                    datos = result.data[i];
                    
                    if(datos != undefined){
                        nombre_producto = datos.nombre_producto;
                        n = result.data.length;
                        if(n > 6){
                            n = 6 
                        }
                        switch(n){
                            case 4:
                                if(nombre_producto.length > 10){
                                    nombre_producto = nombre_producto.slice(0,10) + "...";
                                }
                                
                                break;
                            case 5:case 6:
                                if(nombre_producto.length > 16){
                                    nombre_producto = nombre_producto.slice(0,16) + "...";
                                }
                                break;
                            default:
                                console.log(result.data.length);
                        }
                        
                        $("#PD_contenido").append(
                            '<div class="card mr-2">' +
                                '<img class="card-img-top" width="100px" src="'+dir+"intranet/usuarios/"+datos.author+"/uploads/"+datos.path+'" alt="Card image cap">' +
                                '<div class="card-body">' +
                                    '<a class="Producto_link" id="'+datos.Id_producto+'">' +
                                        '<h6 class="card-title">'+nombre_producto+'</h6>' +
                                    '</a>' +
                                    
                                '</div>' +
                                '<div class="card-footer">'+
                                '<p class="card-text">$'+datos.precio+'</p>' +
                                '</div>'+
                            '</div>' 
                        );
                    }
                }
                $("#PD_contenido").append('<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"></button>');
                $(".Producto_link").click(function (e) {
                    e.preventDefault();
                    href("php/mostrar-producto.php?key=" + this.id);
                });
                $('.responsive').slick({
                    prevArrow: '<i class="buttonCarousel fa fa-arrow-circle-left d-lg-none d-block" style="opacity: 0.5"></i>',
                    nextArrow: '<i class="buttonCarousel fa fa-arrow-circle-right d-lg-none d-block" style="opacity: 0.5"></i>',
                    dots: true,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 6,
                    slidesToScroll: 4,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                    ]
                });
                break;
        }
    });

}

/**
 * Función que verifica si faltan datos en la bd para poder comprar
 * 
 * @author Luis Sanchez
 * @version json_api : 2.0
 * @returns Datos obtenidos de la busqueda
 */
function check_progress_compra() {
    if (sess == 1) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: dir + "php/check-progress-compra.php"
        }).done(function (result) {
            switch (result.status_code) {
                case 200:
                    $("#progress-compra").remove()
                    break;
                case 201:
                    $("#progress-compra").removeClass("d-none");
                    if (result.data == "Completed1") {
                        $("#prog-compra-1").removeClass("bg-info");
                        $("#prog-compra-1").addClass("bg-success");
                    } else if (result.data == "Completed2") {
                        $("#prog-compra-2").removeClass("bg-info");
                        $("#prog-compra-2").addClass("bg-success");
                    }
                    break;
                case 300:
                    break;
                    
            }
        });
    }

}

/**
 * Función que comprueba si hay una sesión activa
 * 
 * @author Luis Sanchez
 * @returns  int Estado de la sesion
 */
function check_session() {
    $.ajax({
        url: dir + "php/check-session.php",
        dataType: 'json',
        type: 'post',
        async: false,
        data: {}
    }).done(function (result) {
        //Si se encuentra la sesión activa.
        switch (result.status_code) {
            case 100:
                $("#mi-ingresar").removeClass("d-none"); //Muestra la opción de ingresar en el menú
                $("#mi-ingresar2").removeClass("d-none"); //Muestra la opción de ingresar en el menú movil

                sess = 0; //Cambia la sessión a inactiva
                break;
            case 101:
                if (result.data.found == 1) {
                    var nombre, apellidos, i;

                    $("#menu-user").addClass("d-md-block"); //Muestra el menu del usuario
                    $("#mi-cuenta").addClass("d-md-block"); //Muestra el dropdown del usuario
                    $("#btn-cuenta").removeClass("d-none"); //Muestra el boton dropdown del usuario en dispositivos moviles
                    $("#btn-cuenta").addClass("d-md-none"); //Oculta el boton dropdown del usuario en pantallas md

                    apellidos = result.data.apellidos.charAt(0) + "."; //Obtiene la primer letra del apellido del usuario
                    i = result.data.nombre.indexOf(" "); //Busca el espacio para solo tomar el primer nombre en caso de que el usuario cuente con un segundo nombre
                    if (i === (-1)) {
                        //Si el usuario solo tiene un nombre se toma este y se agrega la primer letra del apellido
                        nombre = result.data.nombre + " " + apellidos;
                    } else {
                        //Si el usuario tiene más de un nombre se toma el primer nombre y se agrega la primer letra del apellido
                        nombre = result.data.nombre.slice(0, i) + " " + apellidos;
                    }

                    $("#drop-mi-cuenta").html(nombre); //Muestra el nombre en el dropdown
                    $("#dropdownMenuButton").html(nombre); //Muestra el nombre en el dropdown
                    $(".u-name").html(nombre); //Muestra el nombre en los elementos que cuenten con la clase u-name                  
                    sess = 1; //Cambia la sesión a activa
                }
                break;
        }
        acomodarContenido();
    });
    return sess;
}

/**
 * Función que define el directorio a seguir basandose en la url actual
 * 
 * @author Luis Sanchez
 */
function get_Dir() {
    if (window.location.pathname.indexOf("paginas") != -1) {
        dir = "../";
    } else if (window.location.pathname.indexOf("php/") != -1) {
        dir = "../";
    } else {
        dir = "";
    }
}

/**
 * Función que obtiene las coordenadas actuales del navegador
 * 
 * @author Luis Sanchez
 */
function getGeolocation() {
    //Comprueba el soporte del navegador para utilizar geolocalización.
    if (!navigator.geolocation) {
        //Muestra mensaje despues de un header seguido de una sección 
        addAlert("", "Su navegador no soporta algunas de nuestras funciones, para una mejor experiencia utilice otro navegador.", "alert-warning", "bg-danger", "fa-warning", "fa-warning", false);
    }
    //Obtiene la localización actual mediante el navegador
    navigator.geolocation.getCurrentPosition(
        function (geoloc) {
            lat = geoloc.coords.latitude; //Obtiene la latitud.
            lon = geoloc.coords.longitude; //Obtiene la longitud.
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json",
                dataType: "json",
                type: "GET",
                async: false,
                data: {
                    latlng: lat + "," + lon,
                    key: "AIzaSyCWY7xqWIram5PPPWVbXyN_I22rC02OQY0",
                    language: "es"
                }
            }).done(function (data) {
                estado = data.results[6].address_components[0].long_name; //Guarda la entidad federativa del usuario
            });
        },
        //Se ejecuta en caso de que ocurra un error al obtener las coordenadas.
        function (error) {
            //Si se detecta una conexion no segura muestra el mensaje y termina.
            if (error.message.indexOf("Only secure origins are allowed") == 0) {
                addAlert("", "Su conexion no es segura. Por favor utilice una conexion segura para disfrutar de una mejor experiencia.", "alert-danger", "bg-warning", "fa-warning", "fa-warning", false);
                return;
            }
            //Busca si el error es uno de los errores comunes.
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    addAlert("", "Por favor asegurate de permitir el acceso a tu ubicación para disfrutar de una mejor experiencia.", "alert-danger", "bg-warning", "fa-warning", "fa-warning", false);
                    break;

                case error.POSITION_UNAVAILABLE:
                    console.log("ERROR: Ubicación no disponible!");
                    break;

                case error.TIMEOUT:
                    console.log("ERROR: Tiempo agotado sin respuesta!");
                    break;

                default:
                    console.log("ERROR: Unknown problem!");
                    break;
            }

        }, {
            //Opciones avanzadas del geolocalizador pueden ser omitidas
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 10000
        });

    //Si se encontro la latitud y longitud se utilza el geocodificador de google para obtener la entidad federativa del usuario
    

}

/**
 * Función que redirige a otra página
 * 
 * @author Luis Sanchez
 * @param {string} url 
 */
function href(url) {
    window.location.assign(dir + url);
}

/**
 * Función para terminar la sesión activa
 * 
 * @author Luis Sanchez
 */
function logout() {
    $.ajax({
        url: dir + "php/logout.php",
        dataType: "json",
        type: "post"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                href("index.html");
                break;
        }
    });
}

/**
 * Función para mandar petición al servidor.
 * 
 * Registra los datos de la busqueda en la BD. 
 * 
 * @author Luis Sanchez
 * 
 * @param {string} token: Busqueda realizada por el usuario.
 * @param {string} coords: Coordenadas en el formato lat,lon. 
 * @param {string} estado: Nombre de la entidad federativa en que se realiza la busqueda. 
 */
function reg_buscar(token, coords, estado) {
    if(token.trim()!=""){
        $.ajax({
            url: dir + "php/reg_busqueda.php",
            dataType: "Json",
            type: "post",
            data: {
                busqueda: token,
                coords: coords,
                estado: estado
            }
        }).done(function (result) {
            //Si se registró la busqueda redirige al usuario a una página con los resultados de la busqueda.
            switch (result.status_code) {
                case 200:
                    href("php/buscador_new.php?search=" + token);
                    break;
            }
        });
    }else{
        href("php/buscador_new.php?search=");
    }
}

/**
 * Función que manda la petición al servidor para subir productos
 * 
 * @author Luis Sanchez
 * @version json_api : 2.0
 */
function subir_Producto() {
    form_data = new FormData($("#form2")[0]);
    $.ajax({
        url: dir + "php/subir_producto.php",
        dataType: "JSON",
        type: "post",
        data: form_data,
        contentType: false,
        processData: false
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                $("#form_sell3").removeClass("d-none");
                break;
            case 300:
                alert("Ha ocurrido un error inesperado, intentelo de nuevo mas tarde, si el problema persiste contacte con el administrador del sitio");
                break;
        }
    });
}

//Función a ejecutar una vez que se encuentre cargada la página
$(document).ready(function (e) {
    getGeolocation();
    get_Dir();
    check_session();
    check_progress_compra();

    //Define la función a realizar al clickear el logo
    $(".navbar-brand").click(function (e) {
        href("index.html");
    });
    //Define la función a realizar al clickear ingresar
    $(".login").click(function (e) {
        href("paginas/login.html");
    });
    //Define la función a realizar al clickear resumen en el menú
    $(".mc-resumen").click(function (e) {
        href("paginas/resumen.html");
    });
    $(".mc-compras").click(function (e) {
        href("paginas/compras.html");
    });
    $(".mc-ventas").click(function (e) {
        href("paginas/ventas.html");
    });
    //Define la función a realizar al clickear vender en el menú
    $(".vender").click(function (e) {
        if (sess === 1) {
            href("paginas/subir-producto.html");
        } else {
            href("paginas/login.html");
        }
    });
    //Define la función a realizar al clickear cerrar sesión
    $(".logout").click(function (e) {
        e.preventDefault();
        logout();
    });

    //Busqueda
    $("#buscar").click(function (e) {
        e.preventDefault();
        var token = $("#token").val(); //Obtiene la busqueda del usuario
        //Si no se encuentra las coordenadas del usuario se realiza la busqueda y termina
        if (lat === undefined || lon === undefined) {
            reg_buscar(token, null, null);
        } else if (estado === undefined) {
            reg_buscar(token, lat + "," + lon, null); 
        } else {
            reg_buscar(token, lat + "," + lon, estado); 
        }

    });

    //Mostrar el producto de manera detallada 
    $(".Producto_link").click(function (e) {
        e.preventDefault();
        href("php/mostrar-producto.php?key=" + this.id);
    });

    $("#add2cart-cont").mouseover(function () {
        $("#cantidad").removeClass("d-none");
    });
    $("#add2cart-cont").mouseout(function () {
        $("#cantidad").addClass("d-none");
    });

    $(".add2cart").click(function (e) {
        e.preventDefault();
        add2cart(this.id, $("#cantidad").val());
    });

    //Funcion para actualizar informacion de usuario antes de poder comprar
    //Formulario de información personal
    //@version json_api : 2.0
    $("#btn-info-personal").click(function (e) {
        e.preventDefault();
        var data_form = $("#form-info-personal").serialize();
        $.ajax({
            type: "post",
            dataType: "json",
            url: dir + "php/update_info_personal.php",
            data: data_form

        }).done(function (result) {
            switch (result.status_code) {
                case 200:
                    check_progress_compra();
                    break;
            }
        });
    });
    //Formulario de información contacto 
    //@version json_api : 2.0
    $("#btn-info-contacto").click(function (e) {
        e.preventDefault();
        var data_form = $("#form-info-contacto").serialize();
        $.ajax({
            type: "post",
            dataType: "json",
            url: dir + "php/update_info_contacto.php",
            data: data_form

        }).done(function (result) {
            switch (result.status_code) {
                case 200:
                    check_progress_compra();
                    break;
            }
        });
    });



    //Funcion de subir producto
    //Formulario 1
    $("#form-sell-btn").click(function (e) {
        e.preventDefault();
        $("#form_sell").addClass("d-none"); //Oculta el formulario 1
        $("#form_sell2").removeClass("d-none"); //Muestra el formulario 2
    });

    //Formulario 2
    //
    $("#form2").submit(function (e) {
        e.preventDefault();
        $("#form_sell2").addClass("d-none"); //Oculta el formulario 2
        subir_Producto();
    });
    //Formulario 3 (Confirmación)
    $("#form-sell-btn3").click(function (e) {
        e.preventDefault();
        href("index.html");
    });

    //Mostrar imagenes cargadas
    $(function () {
        $('#upload_img1').change(function (e) {
            imgcont = "#img1"; //imagen a cambiar
            $("#img2").removeClass("d-none"); //mostrar espacio de imagen sig.
            addImage(e); //mostrar la imagen del usuario
        });
        $('#upload_img2').change(function (e) {
            imgcont = "#img2";
            $("#img3").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img3').change(function (e) {
            imgcont = "#img3";
            $("#img4").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img4').change(function (e) {
            imgcont = "#img4";
            $("#img5").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img5').change(function (e) {
            imgcont = "#img5";
            $("#img6").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img6').change(function (e) {
            imgcont = "#img6";
            $("#img7").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img7').change(function (e) {
            imgcont = "#img7";
            $("#img8").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img8').change(function (e) {
            imgcont = "#img8";
            $("#img9").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img9').change(function (e) {
            imgcont = "#img9";
            $("#img10").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img10').change(function (e) {
            imgcont = "#img10";
            $("#img11").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img11').change(function (e) {
            imgcont = "#img11";
            $("#img12").removeClass("d-none");
            addImage(e);
        });
        $('#upload_img12').change(function (e) {
            imgcont = "#img12";
            addImage(e);
        });
        //Función para mostrar imagen despues de cargarla
        function addImage(e) {
            //Carga el archivo de imagen y define las imagenes aceptadas
            var file = e.target.files[0],
                imageType = /image.*/;

            //Si el archivo no coincide con el formato de una imagen termina
            if (!file.type.match(imageType))
                return;

            //Carga la imagen mediante un FileReader
            images.push(JSON.stringify(file));
            var reader = new FileReader();
            reader.onload = fileOnload;
            reader.readAsDataURL(file);
        }
        //Muestra la imagen en el contenedor indicado    
        function fileOnload(e) {
            var result = e.target.result;
            $(imgcont).attr("src", result);
            $("#img_prod").attr("src", result);
        }
    });

    $(window).resize(function () {
        acomodarContenido();
    });
    console.log(window.location.pathname);
    if (window.location.pathname.indexOf("mostrar-carrito.html") != -1) {
        cargarCarrito();
    } else if (window.location.pathname.indexOf("index.html") != -1 || window.location.pathname == '/') {
        cargarProductosDestacados(); 
    } else if (window.location.pathname.indexOf("mi-cuenta.html") != -1){
        cargarDatos();
    }
    $(".ver_carrito").click(function (e) {
        e.preventDefault();
        href("paginas/mostrar-carrito.html");
    });

    $("#dropdownShopping-Cart").click(function (e) {
        cargarCarrito();
    });

    $(".cuenta").click(function(e){
        e.preventDefault();
        href("paginas/mi-cuenta.html");
    });
    $("#btn_reg_empresa").click(function (e){
        e.preventDefault();
        address = $("#num-ext").val() + $("#calle-input").val() + "," + $("#ciudad-input").val() + "," + $("#est-input").val();
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json",
            dataType: "json",
            type: "GET",
            async: false,
            data: {
                address: address,
                key: "AIzaSyCWY7xqWIram5PPPWVbXyN_I22rC02OQY0",
                language: "es"
            }
        }).done(function (data) {
            console.log(data);
            datos = data.results[0].geometry.location;
            coords = datos.lat + "," + datos.lng; //Guarda la entidad federativa del usuario
            $("#coords_emp").val(coords);
            data_form = $("#form_reg_empresa").serialize();
            console.log(data_form);
            $.ajax({
                url:dir+"php/reg_empresa.php",
                dataType:"json",
                type:"post",
                data:data_form
            }).done(function(result){
                switch(result.status_code){
                    case 200:
                        addAlert("reg_empresa_ok","Su empresa ha sido registrada exitosamente","alert-success","","fa fa-check","",true);
                        cargarDatos();
                        break;
                }
            });
        });
        
    });
});