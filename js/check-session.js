
var imgcont, images = Array(); //imgcont: define el contenedor de la imagen subida
//images: guarda las imagenes a subir   




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
                if (datos[0].cantidad > datos[0].existencias) {
                    clase = "btn-outline-danger text-dark";
                } else {
                    clase = "";
                }
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
                    '<input class="form-control col-3 col-md-2 col-lg-1 in_cantidad ' + clase + '" type="number" value="' + datos[0].cantidad + '" folio="' + datos[0].folio_carrito + '" name="cantidad" id="cantidad">' +
                    '<span class="p-2"> en existencia ' + datos[0].existencias + '</span>' +
                    '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[0].folio_carrito + '">' + (datos[0].precio * datos[0].cantidad) + '</span></h5>' +
                    '</li>' +
                    '</ul>');
                $("#cart-total").html(total + (datos[0].precio * datos[0].cantidad));
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() == 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
                        return;
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


//Pendiente
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
//fin Pendiente

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
                /*$("#carrito-dropdown").html("");*/
                $("#carrito").html("");
                for (var key in datos) {

                    if (window.location.pathname.indexOf("mostrar-carrito.html") != -1) {
                        total += (datos[key].precio * datos[key].cantidad);
                        if (datos[key].cantidad > datos[key].existencias) {
                            clase = "btn-outline-danger text-dark";
                        } else {
                            clase = "";
                        }
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
                            '<input class="form-control col-3 col-md-2 col-lg-1 in_cantidad ' + clase + '" type="number" value="' + datos[key].cantidad + '" folio="' + datos[key].folio_carrito + '" name="cantidad" id="cantidad">' +
                            '<span class="p-2"> en existencia ' + datos[key].existencias + '</span>' +
                            '<h5 class="ml-auto p-2">Total: $<span id="t_' + datos[key].folio_carrito + '">' + (datos[key].precio * datos[key].cantidad) + '</span></h5>' +
                            '</li>' +
                            '</ul>' +
                            '</div>' +
                            '</div>');
                    }

                }
                $("#cart-total").html(total);
                $(".close-carrito").click(function (e) {

                    e.preventDefault();
                    folio = $(this).attr("folio");
                    borrarCarrito(folio);
                });
                $(".in_cantidad").change(function (e) {
                    if ($(this).val() == 0) {
                        $(".close-carrito[folio=" + $(this).attr("folio") + "]").trigger('click');
                        return;
                    }
                    actualizarCarrito($(this).attr("folio"), $(this).val());
                });
                break;
        }
    });


}

//Pendiente
function cargarCompras() {
    $.ajax({
        url: dir + "php/getCompras.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                for (var key in result.data) {
                    datos = result.data[key];
                    $("#compras").append(
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
                        '<h4>$ ' + datos.total + '</h4>' +
                        '</li>' +
                        '<li class="">Estado: ' +
                        datos.estado +
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


/**
 * Funcion que carga los datos del usuario y la empresa
 * 
 * @author Luis Sanchez
 */
function cargarDatos() {
    $.ajax({
        url: dir + "php/datos_usuario.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data[0];
                for (var key in datos) {
                    if (datos[key] === null) {
                        datos[key] = "";
                    }
                    if (key == 'sexo') {
                        console.log($("input[name='" + key + "'][value='" + datos[key] + "']"));
                        $("input[name='" + key + "'][value='" + datos[key] + "']").prop("checked", true);
                        console.log($("input[name='" + key + "'][value='" + datos[key] + "']"));
                    } else {
                        $("input[name='" + key + "']").val(datos[key]);
                    }
                    $("#personal_" + key).html(" " + datos[key]);
                }
                break;
        }
    });
    $.ajax({
        url: dir + "php/datos_empresa.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                datos = result.data[0];
                $("#registra_empresa").remove();
                $("#mc-menu-empresa").removeClass("d-none");
                $("#empresa_nombre").html(" " + datos.nombre_empresa);
                $("#empresa_RFC").html(" " + datos.RFC);
                $("#empresa_email").html(" " + datos.email);
                $("#empresa_telefono").html(" " + datos.telefono);
                $("#empresa_calle").html(" " + datos.calle);
                $("#empresa_num_ext").html(" " + datos.numero);
                $("#empresa_num_int").html(" " + datos.numinterior);
                $("#empresa_colonia").html(" " + datos.colonia);
                $("#empresa_ciudad").html(" " + datos.delegacion);
                $("#empresa_estado").html(" " + datos.estado);
                $("#empresa_pais").html(" " + datos.pais);
                $("#empresa_delegacion").html(" " + datos.delegacion);
                $("#empresa_cp").html(" " + datos.cp);

                $("#nombre-inp-emp").val(datos.nombre_empresa);
                $("#rfc-inp-emp").val(datos.RFC);
                $("#email-inp-emp").val(datos.email);
                $("#tel-inp-emp").val(datos.telefono);
                $("#calle-inp-emp").val(datos.calle);
                $("#num-ext-inp-emp").val(datos.numero);
                $("#num-int-inp-emp").val(datos.numinterior);
                $("#colonia-inp-emp").val(datos.colonia);
                $("#ciudad-inp-emp").val(datos.delegacion);
                $("#est-inp-emp").val(datos.estado);
                $("#dele-inp-emp").val(datos.delegacion);
                $("#cp-inp-emp").val(datos.cp);

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
    $.ajax({
        url: dir + "php/getProductosDestacados.php",
        dataType: "json",
        type: "post",
        data: {
            estado: estado
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                $("#PD_contenido").append('<button type="button" class="slick-prev slick-arrow"></button>');
                for (var i = 0; i < 6; i++) {
                    datos = result.data[i];

                    if (datos != undefined) {
                        nombre_producto = datos.nombre_producto;
                        n = result.data.length;
                        if (n > 6) {
                            n = 6;
                        }
                        switch (n) {
                            case 4:
                                if (nombre_producto.length > 10) {
                                    nombre_producto = nombre_producto.slice(0, 10) + "...";
                                }

                                break;
                            case 5:
                            case 6:
                                if (nombre_producto.length > 16) {
                                    nombre_producto = nombre_producto.slice(0, 16) + "...";
                                }
                                break;
                            default:
                                console.log(result.data.length);
                        }

                        $("#PD_contenido").append(
                            '<div class="card mr-2">' +
                            '<img class="card-img-top" width="100px" src="' + dir + "intranet/usuarios/" + datos.author + "/uploads/" + datos.path + '" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<a class="Producto_link" id="' + datos.Id_producto + '">' +
                            '<h6 class="card-title">' + nombre_producto + '</h6>' +
                            '</a>' +

                            '</div>' +
                            '<div class="card-footer">' +
                            '<p class="card-text">$' + datos.precio + '</p>' +
                            '</div>' +
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
                    $("#progress-compra").remove();
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
//fin Pendiente


//Pendiente
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
            case 200:
                addAlert("comprado", "Compra realizada correctamente", "alert-success", "", "fa-check", "", true);
                break;
            case 304:
                addAlert("existencias", "No hay existencias suficientes para procesar la compra de " + result.data.nombre_producto, "alert-warning", "", "fa-warning", "", true);
                break;
        }
        cargarCarrito();
    });
}
//fin Pendiente

function comprarCarrito() {
    $.ajax({
        url: dir + "php/comprar_carrito.php",
        dataType: "json",
        type: "post"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                addAlert("comprado", "Compra realizada correctamente", "alert-success", "", "fa-check", "", true);
                break;
            case 304:
                addAlert("existencias", "No hay existencias suficientes para procesar la compra de " + result.data.nombre_producto, "alert-warning", "", "fa-warning", "", true);
                break;
        }
        cargarCarrito();
    });
}


//Pendiente
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
//fin Pendiente

//Función a ejecutar una vez que se encuentre cargada la página
$(document).ready(function (e) {
   
    check_progress_compra();
   
    //Pendiente
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
    //fin Pendiente

    //Pendiente 
    if (window.location.pathname.indexOf("mostrar-carrito.html") != -1) {
        cargarCarrito();
    } else if (window.location.pathname.indexOf("mi-cuenta.html") != -1) {
        cargarDatos();
    } else if (window.location.pathname.indexOf("ventas.html") != -1) {
        cargarPublicaciones();
    } else if (window.location.pathname.indexOf("compras.html") != -1) {
        cargarCompras();
    }
    //fin Pendiente

    //Pendiente
    $("#btn_reg_empresa").click(function (e) {
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
            datos = data.results[0].geometry.location;
            coords = datos.lat + "," + datos.lng; //Guarda la entidad federativa del usuario
            $("#coords_emp").val(coords);
            data_form = $("#form_reg_empresa").serialize();
            $.ajax({
                url: dir + "php/reg_empresa.php",
                dataType: "json",
                type: "post",
                data: data_form
            }).done(function (result) {
                switch (result.status_code) {
                    case 200:
                        addAlert("reg_empresa_ok", "Su empresa ha sido registrada exitosamente", "alert-success", "", "fa fa-check", "", true);
                        cargarDatos();
                        break;
                }
            });
        });

    });
    $("#comprar_carrito").click(function (e) {
        e.preventDefault();
        comprarCarrito();

    });
    $("#btn-comprar").click(function (e) {
        e.preventDefault();
        comprarProducto($(this).attr("folio"));

    });

    $("#mc-menu-empresa").click(function (e) {
        e.preventDefault();
        $("#cont-empresa").removeClass("d-none");
        $("#cont-mis-datos").addClass("d-none");
        $("#cont-mis-datos").removeClass("d-flex");

    });
    $("#mc-mis-datos").click(function (e) {
        e.preventDefault();
        $("#cont-empresa").addClass("d-none");
        $("#cont-mis-datos").removeClass("d-none");
        $("#cont-mis-datos").addClass("d-flex");

    });
    //fin Pendiente
});