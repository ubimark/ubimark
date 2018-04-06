var dir; //Directorio a seguir
var lat, lon, estado; //Latitud y Longitud , estado
var sess = 2; //Guarda la sesion 0:inactiva 1:activa 2:sin comprobar

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
    $("#contenido").css("min-height", "70vh");
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


    if (autoclose) {
        $("#alertas").append(
            "<div style='height:80px !important; position:fixed;top:15%;z-index:300;right:30%;left:30%;border:1px solid rgba(0,0,0,0.2);' class='alert " + color + " " + bgcolor + " alert-dismissible fade show mb-0 d-flex align-items-center justify-content-center' style='' role='alert' id=" + id + ">" +
            "<i class='fa " + ico + " mr-2' ></i>" +
            "<span>" + message + "</span>" +
            "<i class='fa " + ico2 + " ml-2' ></i>" +
            "</div>"
        );

        window.setTimeout(function () {
            $("#" + id).fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 1500);

    } else {
        $("#alertas").append(
            "<div class='alert " + color + " " + bgcolor + " alert-dismissible fade show text-center mb-0' style='' role='alert' id=" + id + ">" +
            "<i class='fa " + ico + " mr-2' ></i>" +
            "<span>" + message + "</span>" +
            "<i class='fa " + ico2 + " ml-2' ></i>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='close'>" +
            "<span aria_hidden='true'>&times;</span>" +
            "</button>" +
            "</div>"
        );
    }
}

/**
 * Función que carga el carrito de compras en el dropdown del menu (max 5 items) y en la pagina de mostrar-carrito
 * 
 * @author Luis Sanchez
 */
function cargarCarritoDrop() {
    console.log("peticion...");
    $.ajax({
        url: dir + "php/obtenerCarrito.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        console.log(result);
        switch (result.status_code) {

            case 200:
                datos = result.data;
                var cont = 0;
                $("#carrito-dropdown").html("");
                for (var key in datos) {

                    if (cont++ < 5) {
                        $("#carrito-dropdown").append(
                            '<span class="dropdown-item Producto_link" id="'+datos[key].Id_producto+'">' +
                            '<strong>' + datos[key].nombre_producto + '</strong>' +
                            '<p>x' + datos[key].cantidad + ' $' + (datos[key].precio * datos[key].cantidad) + '</p>' +
                            '</span>'
                        );
                    }
                }
                $("#carrito-dropdown").append('<div class="dropdown-divider"></div>' +
                    '<a class="dropdown-item ver_carrito"  >Ver más</a>');
                $(".ver_carrito").click(function (e) {
                    e.preventDefault();
                    href("paginas/mostrar-carrito.html");
                });
                $(".Producto_link").click(function (e) {
                    e.preventDefault();
                    href("php/mostrar-producto.php?key=" + this.id);
                });
                break;
        }
    });
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
                sess = 0; //Cambia la sessión a inactiva
                break;
            case 101:
                sess = 1; //Cambia la sesión a activa
                break;
        }
    });
    return sess;
}

function session_data() {
    switch (sess) {
        case 0:
            $("#mi-ingresar").removeClass("d-none"); //Muestra la opción de ingresar en el menú
            $("#mi-ingresar2").removeClass("d-none"); //Muestra la opción de ingresar en el menú movil
            break;
        case 1:
            $("#menu-user").addClass("d-md-block"); //Muestra el menu del usuario
            $("#mi-cuenta").addClass("d-md-block"); //Muestra el dropdown del usuario
            $("#btn-cuenta").removeClass("d-none"); //Muestra el boton dropdown del usuario en dispositivos moviles
            $("#btn-cuenta").addClass("d-md-none"); //Oculta el boton dropdown del usuario en pantallas md
            $.ajax({
                url: dir + "php/datos_usuario.php",
                type: "post",
                dataType: "json",
                data: {
                    required: ["nombre", "apellidos"]
                }
            }).done(function (result) {
                switch (result.status_code) {
                    case 200:
                        datos = result.data[0];
                        var nombre, apellidos, i;
                        apellidos = datos.apellidos.charAt(0) + "."; //Obtiene la primer letra del apellido del usuario
                        i = datos.nombre.indexOf(" "); //Busca el espacio para solo tomar el primer nombre en caso de que el usuario cuente con un segundo nombre
                        if (i === (-1)) {
                            //Si el usuario solo tiene un nombre se toma este y se agrega la primer letra del apellido
                            nombre = datos.nombre + " " + apellidos;
                        } else {
                            //Si el usuario tiene más de un nombre se toma el primer nombre y se agrega la primer letra del apellido
                            nombre = datos.nombre.slice(0, i) + " " + apellidos;
                        }
                        $("#drop-mi-cuenta").html(nombre); //Muestra el nombre en el dropdown
                        $("#dropdownMenuButton").html(nombre); //Muestra el nombre en el dropdown
                        $(".u-name").html(nombre); //Muestra el nombre en los elementos que cuenten con la clase u-name
                        break;
                }
            });
            break;
    }
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
    } else if (window.location.pathname.indexOf("intranet/") != -1) {
        dir = "../../../";
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
            //Si se encontro la latitud y longitud se utilza el geocodificador de google para obtener la entidad federativa del usuario
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
                console.log(data);
                estado = data.results[0].address_components[5].long_name; //Guarda la entidad federativa del usuario
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
        if (window.location.pathname.indexOf("index.html") != -1 || window.location.pathname == '/') {
            cargarProductosDestacados();
        }
}

/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Función que redirige a otra página
 * 
 * @author Luis Sanchez
 * @param {string} url 
 */
function href(url) {
    check_session();
    session_required(url, true);
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
        type: "post",
        data: {}
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
    if (token.trim() != "") {
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
    } else {
        href("php/buscador_new.php?search=");
    }
}

function session_required(path = window.location.pathname, redirect = false) {
    if (path.indexOf("/ubimark/") == 0) {
        path = path.substr(9);
    }else if(path.charAt(0)=='/'){
        path = path.substr(1);
    }else if(path.indexOf("/ubimark.git/") == 0){
        path = path.substr(13);
    }
    i = path.indexOf("?");
    params = "";
    if (i != -1) {
        params = path.substring(i, path.length);
        path = path.substring(0, i);
        console.log(path);
    }
    $.ajax({
        url: dir + "php/session_required.php",
        dataType: "json",
        type: "post",
        async: false,
        data: {
            path: path,
            session: sess
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 106:
                href("paginas/login.html?rdir=" + path);
                break;
            case 107:
                if (redirect) {
                    window.location.assign(dir + path + params);
                }
                break;
            case 108:
                console.log("108");
                window.location.assign(dir + "paginas/no-access-assigned.html");
        }
    });
}
//Función a ejecutar una vez que se encuentre cargada la página
$(document).ready(function (e) {

    getGeolocation();
    acomodarContenido();
    session_data();

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
            href("paginas/login.html?rdir=paginas/subir-producto.html");
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

    $(window).resize(function () {
        acomodarContenido();
    });

    $(".ver_carrito").click(function (e) {
        e.preventDefault();
        href("paginas/mostrar-carrito.html");
    });

    $("#dropdownShopping-Cart").click(function (e) {
        console.log("OK");
        cargarCarritoDrop();
    });

    $(".cuenta").click(function (e) {
        e.preventDefault();
        href("paginas/mi-cuenta.html");
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
                    cargarDatos();
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
                    cargarDatos();
                    break;
            }
        });
    });


});