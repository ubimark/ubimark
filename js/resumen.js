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
            url: api("check-progress-compra.php")
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

$(document).ready(function (e) {
    check_progress_compra();
});