var dir; //Directorio a seguir
var lat = 0, lon = 0, estado, pais, ciudad; //Latitud y Longitud , estado
var localizacionDB;
var sess = 2; //Guarda la sesion 0:inactiva 1:activa 2:sin comprobar
var user = 0;
var socket;
var unread_noti;

var empresa = 0;



/**
 * Funcion que inicializa el tooltip
 */
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

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
            $("#contenido").css("margin-top", "5.1rem");
            break;
        case 1:
            if (width < 576) {
                $("#contenido").css("margin-top", "4.5rem");
            } else if (width < 767) {
                $("#contenido").css("margin-top", "4.9rem");
            } else {
                $("#contenido").css("margin-top", "7.6rem");
            }

            break;

        case 2:
            check_session();
            acomodarContenido(true);
            break;
    }
    $("#contenido").css("padding-bottom", "3rem");
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
 * @param {boolean} closeable Icono para cerrar alerta
 */
function addAlert(id, message, color, bgcolor, ico, ico2, autoclose = false, closeable = true) {
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
        }, 2000);

    } else {
        if (closeable) {
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
        } else {
            $("#alertas").append(
                "<div class='alert " + color + " " + bgcolor + " alert-dismissible fade show text-center mb-0' style='' role='alert' id=" + id + ">" +
                "<i class='fa " + ico + " mr-2' ></i>" +
                "<span>" + message + "</span>" +
                "<i class='fa " + ico2 + " ml-2' ></i>" +
                "</div>"
            );
        }
    }
}

function api(target) {
    const API_URL = location.protocol + "//localhost/ubimark_api/";
    return API_URL + target;
}

/**
 * Función que carga el carrito de compras en el dropdown del menu (max 5 items) y en la pagina de mostrar-carrito
 * 
 * @author Luis Sanchez
 */
function cargarCarritoDrop() {

    $.ajax({
        url: api("carrito.php"),
        type: "get",
        dataType: "json"
    }).done(function (result) {

        switch (result.status_code) {

            case 200:
                datos = result.data;
                var cont = 0;
                $("#carrito-dropdown").html("");
                for (var key in datos) {

                    if (cont++ < 5) {
                        $("#carrito-dropdown").append(
                            '<div class="d-flex border-bottom notificacion">' +
                            '<div class="card col-3 p-0 border-0 bg-transparent">' +
                            '<img class="card-img p-2" src="' + api('intranet/usuarios/' + datos[key].vendedor + '/uploads/' + datos[key].path) + '" alt="Foto del producto">' +
                            '</div>' +
                            '<div class="card col-9 border-0 bg-transparent">' +
                            '<span class="dropdown-item Producto_link" id="' + datos[key].Id_producto + '">' +

                            '<strong>' + datos[key].nombre_producto + '</strong>' +
                            '<p>x' + datos[key].cantidad + ' $' + (datos[key].precio * datos[key].cantidad) + '</p>' +
                            '</span>' +
                            '</div>' +
                            '</div>');
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
                    href("paginas/mostrar-producto.html?key=" + this.id);
                });
                break;
        }
    });
}

function cargarNotificacion(title, data, estado) {

    if (estado == "unread") {
        unread_noti.push(data.Id_notificacion);
    }
    $("#personal_noti").prepend('<div class="d-flex border-bottom notificacion ' + estado + '">' +
        '<div class="card col-4 col-md-2 p-0 border-0 bg-transparent">' +
        '<img class="card-img p-2" src="' + api('intranet/usuarios/' + data.autor_img + '/uploads/' + data.ruta_img) + '" alt="Foto del producto">' +
        '</div>' +
        '<div class="card col-8 col-md-10 border-0 bg-transparent">' +
        '<p><span class="d-block">' + title + ':</span> ' +
        '<small>' + data.mensaje + '</small>' +
        '</p>' +
        '</div>' +
        '</div>');
}

function cargarNotificacionEmpresa(title, data, estado) {
    if (estado == "unread") {
        unread_noti.push(data.Id_notificacion);
    }
    $("#company_noti").prepend('<div class="d-flex border-bottom notificacion ' + estado + '">' +
        '<div class="card col-4 col-md-2 p-0 border-0 bg-transparent">' +
        '<img class="card-img p-2" src="' + api('intranet/usuarios/' + data.autor_img + '/uploads/' + data.ruta_img) + '" alt="Foto del producto">' +
        '</div>' +
        '<div class="card col-8 col-md-10 border-0 bg-transparent">' +
        '<p><span class="d-block">' + title + ':</span> ' +
        '<small>' + data.mensaje + '</small>' +
        '</p>' +
        '</div>' +
        '</div>');
}

function cargarNotificaciones() {
    unread_noti = [];
    $.ajax({
        url: api("notificacion.php"),
        type: "get",
        dataType: "json"
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                let cont = 0;
                let not_empresa = false;
                let not_personal = false;
                res.data.reverse();
                for (let notificacion of res.data) {

                    let title = "";
                    let estado = "";
                    switch (notificacion.tipo) {
                        case "PREGUNTA":
                            title = "Nueva pregunta sobre tu producto";
                            break;
                        case "RESPUESTA":
                            title = "Se ha respondido tu pregunta";
                            break;
                    }
                    switch (notificacion.estado) {
                        case "LEIDO":
                            estado = "read";
                            break;
                        case "NO_LEIDO":
                            estado = "unread";
                            break;
                    }
                    if (notificacion.estado == "NO_LEIDO") cont++;
                    switch (notificacion.tipo_destino) {
                        case "PERSONAL":
                            not_personal = true;
                            cargarNotificacion(title, notificacion, estado);
                            break;
                        case "EMPRESA":
                            not_empresa = true;
                            cargarNotificacionEmpresa(title, notificacion, estado);
                            break;
                    }
                }
                if (not_empresa && not_personal) {
                    $("#company_tab").removeClass("disabled");
                    $("#personal_tab").removeClass("disabled");
                    $("#company_noti").addClass("show");
                    $("#company_noti").addClass("active");
                    $("#company_tab").addClass("active");
                    $("#company_tab").addClass("text-info");
                    $("#personal_tab").addClass("text-info");
                } else if (not_empresa) {
                    $("#company_tab").removeClass("disabled");
                    $("#company_noti").addClass("show");
                    $("#company_noti").addClass("active");
                    $("#company_tab").addClass("active");
                    $("#company_tab").addClass("text-info");
                } else {
                    $("#personal_tab").removeClass("disabled");
                    $("#personal_noti").addClass("show");
                    $("#personal_noti").addClass("active");
                    $("#personal_tab").addClass("active");
                    $("#personal_tab").addClass("text-info");
                }
                if (cont > 0) {
                    $("#noti_cont").removeClass("d-none");
                    $("#noti_cont").html(cont);
                }
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
        url: api("check-session.php"),
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
                user = result.data.user;
                empresa = result.data.empresa;
                break;
        }

    });

    return sess;
}

function emit_ws(datos) {
    $.ajax({
        url: socket_api("socket_command.php"),
        type: "post",
        dataType: "json",
        data: datos
    }).done(function (res) {});
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
    if (window.location.pathname.charAt(window.location.pathname.length - 1) == '/') {
        window.location.pathname += "index.html";
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
            if (lat != geoloc.coords.latitude && lon != geoloc.coords.longitude) {
                lat = parseFloat(geoloc.coords.latitude.toFixed(6)); //Obtiene la latitud.
                lon = parseFloat(geoloc.coords.longitude.toFixed(6)); //Obtiene la longitud.
                //Si se encontro la latitud y longitud se utilza el geocodificador de google para obtener la entidad federativa del usuario
                $.ajax({
                    url : api("localizacion.php?latitud="+lat+"&longitud="+lon),
                    type : "get" 
                }).done(function(res){
                    switch(res.status_code){
                        case 200:
                            if(res.data == null || res.data == undefined){
                                getGoogleLocation();
                                break;
                            }
                            if(res.data.estado != null || res.data.estado != undefined){
                                console.log(res.data);
                                window.localizacionDB = res.data.Id_localizacion;
                                ciudad = res.data.ciudad;
                                estado = res.data.estado;
                                pais = res.data.pais;
                                console.log(window.localizacionDB);

                            }else{
                                getGoogleLocation();
                            }
                            break;
                        default:
                            getGoogleLocation();
                    }
                });
               
            }

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

function getGoogleLocation(){
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
        ciudad = data.results[0].address_components[4].long_name;
        estado = data.results[0].address_components[5].long_name; //Guarda la entidad federativa del usuario
        pais = data.results[0].address_components[6].long_name;
        $.ajax({
            url : api("localizacion.php"),
            type : "post",
            dataType : "json",
            data : {
                latitud : lat,
                longitud : lon,
                ciudad : ciudad,
                estado : estado,
                pais : pais
            }
        }).done(function(res){
            switch(res.status_code){
                case 200:
                    window.localizacionDB = res.data.ID;
                    break;
            }
        });
    });
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
        url: api("sesion.php"),
        dataType: "json",
        type: "delete"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                href("index.html");
                break;
        }
    });
}

function read_notifications() {
    $.ajax({
        url: api("notificacion.php"),
        type: "put",
        dataType: "json",
        data: {
            estado: "LEIDO",
            notificaciones: unread_noti
        }
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                unread_noti = new array();
                $(".unread").addClass("read");
                $(".read").removeClass("unread")
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
            url: api("reg_busqueda.php"),
            dataType: "json",
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
                    href("paginas/buscador.html?search=" + token);
                    break;
            }
        });
    } else {
        href("paginas/buscador.html?search=");
    }
}

function send_notificacion(tipo, remitente, origen, destino, fecha, tipo_destino) {
    $.ajax({
        url: api("notificacion.php"),
        dataType: "json",
        type: "post",
        data: {
            tipo: tipo,
            remitente: remitente,
            origen: origen,
            destino: destino,
            fecha: fecha,
            tipo_destino: tipo_destino
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                result.data.key = "notificacion";
                emit_ws(result.data);
                break;
        }
    });
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
                url: api("datos_usuario.php"),
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

function session_required(path = window.location.pathname, redirect = false) {

    if (path.indexOf("/ubimark/") == 0) {
        path = path.substr(9);

    } else if (path.charAt(0) == '/') {
        path = path.substr(1);
    } else if (path.indexOf("/ubimark.git/") == 0) {
        path = path.substr(13);
    }
    i = path.indexOf("?");
    params = "";
    if (i != -1) {
        params = path.substring(i, path.length);
        path = path.substring(0, i);

    }

    $.ajax({
        url: api("session_required.php"),
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

                window.location.assign(dir + "paginas/no-access-assigned.html");
        }

    });


}

function show_noti(id, titulo, message, color) {
    $("#alertas").append(
        "<div style='height:120px !important;padding: 0; position:fixed;bottom:1%;z-index:300;right:70%;left:1%;border:1px solid rgba(0,0,0,0.2);' class='alert alert-" + color + " alert-dismissible fade show mb-0  align-items-center justify-content-center' style='' role='alert' id=" + id + ">" +
        "<div class='card bg-transparent border-0'>" +
        "<div class='card-header bg-" + color + "'>" + titulo + "</div>" +
        "<ul class='list-group list-group-flush bg-transparent'>" +
        "<li class='list-group-item bg-transparent'>" + message + "</li>" +
        "</ul>" +
        "</div>" +
        "<button type='button' class='close' style='width: 5px;height: 5px;font-size: 18px;top: -10px !important;' data-dismiss='alert' aria-label='close'>" +
        "<span aria_hidden='true'>&times;</span>" +
        "</button>" +
        "</div>"
    );

    window.setTimeout(function () {
        $("#" + id).fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 4000);
}

function socket_api(file) {
    const SOCKET_URL = location.protocol + "//localhost/ubimark_socket/"
    return SOCKET_URL + file;
}

function solicitar_noti(notificacion, empresa = false) {
    $.ajax({
        url: api("notificacion.php?notificacion=" + notificacion),
        type: "get",
        dataType: "json"
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                let title;
                $("#noti_cont").removeClass("d-none");
                $("#noti_cont").html(parseInt($("#noti_cont").html()) + 1);
                switch (res.data.tipo) {
                    case "PREGUNTA":
                        title = "Nueva pregunta sobre tu producto";
                        break;
                    case "RESPUESTA":
                        title = "Se ha respondido tu pregunta";
                        break;
                }
                switch (res.data.tipo_destino) {
                    case "PERSONAL":
                        cargarNotificacion(title, res.data, "unread");
                        break;
                    case "EMPRESA":
                        cargarNotificacionEmpresa(title, res.data, "unread");
                        break;
                }
                show_noti("notificacion", title, res.data.mensaje, "info");
                break;
        }
    });
}

//Función a ejecutar una vez que se encuentre cargada la página
$(document).ready(function (e) {

    if (location.protocol == "http:") {
        socket = io.connect("ws://localhost:3001");
        addAlert("conexion_segura", "Tu conexion no es segura. Da click aqui para usar una conexion segura", "alert-white", "bg-info", "fa-warning", "fa-warning", false, false);
        $("#conexion_segura").click(function (e) {
            url = window.location.host + window.location.pathname;
            if (getParameterByName('key') != "") {
                url += '?key=' + (getParameterByName('key'));
            } else if (getParameterByName('search') != "") {
                url += '?search=' + (getParameterByName('search'));
            } else if (getParameterByName('rdir') != "") {
                url += '?rdir=' + (getParameterByName('rdir'));
            }
            window.location.assign("https://" + url);
        });
        $("#conexion_segura").hover(function (e) {
            $("#conexion_segura").css("cursor", "pointer");
        });
    } else {
        socket = io.connect("wss://localhost:3002", {
            rejectUnauthorized: false
        });
    }

    if (sess == 1) {
        $("#drpdwn_noti_body").attr("user", user);
        cargarNotificaciones();
    }

    socket.on("notificacion", function (data) {
        check_session();

        destino = parseInt(data.destino);
        if (sess == 1 && (destino == user && $("#drpdwn_noti_body").attr('user') == destino)) {
            solicitar_noti(data.notificacion);
        } else if (sess == 1 && (destino == empresa)) {
            solicitar_noti(data.notificacion, true);
        }
    });


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
        socket.emit('logout');
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
        href("paginas/mostrar-producto.html?key=" + this.id);
    });

    $(window).resize(function () {
        acomodarContenido();
    });

    $(".ver_carrito").click(function (e) {
        e.preventDefault();
        href("paginas/mostrar-carrito.html");
    });

    $("#dropdownShopping-Cart").click(function (e) {
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
            url: api("update_info_personal.php"),
            data: data_form

        }).done(function (result) {
            switch (result.status_code) {
                case 200:
                    cargarDatos();
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
            url: api("update_info_contacto.php"),
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

    $("#dropdownNoti").click(function (e) {
        $("#noti_cont").addClass("d-none");
        $("#noti_cont").html("0");
        var noti_estado = setInterval(noti_close, 5000);

        function noti_close() {
            if ($("#drpdwn_noti").hasClass("show") == false) {
                if (unread_noti.length > 0) {
                    read_notifications();
                }
                clearInterval(noti_estado);
            }
        }
    });


    $("#dropdownNoti").change()

    $("#company_tab").click(function (e) {
        e.preventDefault();
        return;
    });
    $("#personal_tab").click(function (e) {
        e.preventDefault();
        return;
    });

    $("#company_tab").mouseover(function (e) {
        if ($("#company_tab").hasClass("disabled")) {
            return;
        }
        $("#personal_noti").removeClass("show");
        $("#personal_noti").removeClass("active");
        $("#personal_tab").removeClass("active");
        $("#company_noti").addClass("show");
        $("#company_noti").addClass("active");
        $("#company_tab").addClass("active");
    });
    $("#personal_tab").mouseover(function (e) {
        if ($("#personal_tab").hasClass("disabled")) {
            return;
        }
        $("#company_noti").removeClass("show");
        $("#company_noti").removeClass("active");
        $("#company_tab").removeClass("active");
        $("#personal_noti").addClass("show");
        $("#personal_noti").addClass("active");
        $("#personal_tab").addClass("active");
    });


});