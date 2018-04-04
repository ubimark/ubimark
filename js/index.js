/**
 * Función que pide los productos mas buscados
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
        var n;
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
                            case 2:case 3:case 4:
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
                break;
        }
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
    });

}
