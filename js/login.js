
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
 * Función para realizar petición de inicio de sesión
 *  
 * @author Luis Sanchez
 */

function login() {
    $.ajax({
        url: "../php/login.php",
        dataType: "json",
        type: "post",
        data: {
            email: $("#inputEmail").val(),
            password: $("#inputPassword").val()
        }

    }).done(function (result) {
        switch (result.status_code) {
            case 103:
                addAlert("login_fail","Usuario o contraseña incorrecta","alert-danger","","fa fa-times","",true);
                break;
            case 200:
                //Redireccionar a la página anterior
                if (document.referrer != 'undefined' && document.referrer.indexOf("login.html") == -1 && document.referrer.indexOf("sign-up.html") == -1) {
                    console.log(document.referrer);
                    window.location = document.referrer;
                } else {
                    window.location.replace("../index.html");
                }
                break;
        }
    });
}

$(document).ready(function (e) {
    //Petición a php para iniciar sesión
    $("form").submit(function (e) {
        e.preventDefault();
        login();
    });

});