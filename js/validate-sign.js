// JavaScript Document
/**
 * Función para validar los datos del formulario de registro 
 * 
 * @author Jonathan
 * @returns boolean Campos correctos
 */
function validate() {
    var checkPass = passOk();
    var checkEmail = emailVal();
    var checkEqual = equalPass();
    if (checkPass && checkEmail && checkEqual) {
        return true;
    } else {
        return false;
    }
}



/**
 * Función que valida la contraseña
 * 
 * @author Jonathan
 * @returns boolean Contraseña valida
 */
function passOk() {
    var pass = $("#inputPass").val();
    var inpOk = $("#alertP");
    var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$@$!¡%*¿?&;:\-\_\.]{8,}$/;
    if (passRegex.test(pass)) {
        inpOk.html("");
        return true;
    } else {
        inpOk.html("La contraseña debe contener: Mínimo 8 caracteres, una mayúscula y un número.");
        return false;
    }

}

/**
 * Funcion que valida el email
 * 
 * @author Jonathan
 * @returns boolean Email valido
 */
function emailVal() {
    var email = $("#inputEmail").val();
    var inpOk = $("#alertE");
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
        inpOk.html("");
        return true;
    } else {
        inpOk.html("¡El correo electrónico no es valido!");
        return false;
    }
}

/**
 * Función que verifica que las contraseñas sean iguales
 * 
 * @author Jonathan
 * @returns boolean Contraseñas iguales 
 */
function equalPass() {
    var pass = $("#inputPass").val();
    var pass1 = $("#inputPass1").val();
    var inpOk = $("#alertP1");
    if (pass === pass1) {
        inpOk.html("");
        return true;
    } else {
        inpOk.html("¡Las contraseñas no coinciden!");
        return false;
    }
}




/**
 * Función para mandar la petición de inicio de sesión
 * 
 * @author Luis Sanchez
 */
function login(correo,pass){
    $.ajax({
        url: api("login.php"),
        dataType: "json",
        type: "post",
        data: {
            email: correo,
            password: pass
        }
    }).done(function (result) {
        switch (result.status_code) {
            case 103:
                addAlert("login_fail","Usuario o contraseña incorrecta","alert-danger","","fa fa-times","",true);
                break;
            case 200:
                window.location.assign("../index.html");
                break;
        }
    });
}

/**
 * Funcion que realiza el registro del nuevo usuario
 * 
 * @author Luis Sanchez
 */
function registrar() {
    var correo = $("#inputEmail").val();
    var pass = $("#inputPass").val();
    if (validate()) {
        $.ajax({
                url: api('sign-up.php'),
                dataType: 'JSON',
                type: 'post',
                data: {
                    nombre: $("#inputNombre").val(),
                    apellidos: $("#inputApellido").val(),
                    correo: correo,
                    contrasena: pass
                }
            })
            .done(function (result) {
                switch (result.status_code) {
                    case 102:
                        addAlert("correo_en_uso","Ya hay un usuario registrado con este correo!","alert-warning","","fa fa-warning","",true);
                        break;
                    case 200:
                        login(correo,pass);
                        break;
                    case 300:
                        addAlert("error_bd","Ocurrio un error al guardar los datos. Intentelo de nuevo más tarde. Si el error persiste contacte con el administrador.","alert-warning","","fa fa-warning","",true);
                        break;
                }
            });
    }
}

$(document).ready(function () {
    $('form').submit(function (e) {
        e.preventDefault();
        registrar();
    });

});