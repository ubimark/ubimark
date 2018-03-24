
var imgcont, images = Array(); //imgcont: define el contenedor de la imagen subida
//images: guarda las imagenes a subir  

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

function verificar_empresa(){
    $.ajax({
        url: dir + "php/datos_empresa.php",
        type: "post",
        dataType: "json"
    }).done(function (result) {
        switch (result.status_code) {
            case 200:
                if(result.data.length == 1){
                    $("#up_tipo_cuenta").removeClass("d-none");
                }
                break;
        }
    });
}

$(document).ready(function(e){
    verificar_empresa();

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
});