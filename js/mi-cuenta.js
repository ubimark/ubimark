function actualizarEmpresa(){
    address = $("#num-ext-inp-emp").val() + $("#calle-inp-emp").val() + "," + $("#ciudad-inp-emp").val() + "," + $("#est-inp-emp").val();
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
        $("#coords_emp_act").val(coords);
        var form_data = $("#form_act_empresa").serialize();
        $.ajax({
            url :api("updateEmpresa.php"),
            type : "post",
            dataType : "json",
            data : form_data
        }).done(function(result){
            switch(result.status_code){
                case 200:
                    cargarDatos();
                    addAlert("empresa_actualizada","Se actualizo correctamente la empresa","alert-success","","fa-check","",true);
            }
        });
    });
}

/**
 * Funcion que carga los datos del usuario y la empresa
 * 
 * @author Luis Sanchez
 */
function cargarDatos() {
    $.ajax({
        url:api("datos_usuario.php"),
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
                         
                        $("input[name='" + key + "'][value='" + datos[key] + "']").prop("checked", true);
                         
                    } else {
                        $("input[name='" + key + "']").val(datos[key]);
                    }
                    $("#personal_" + key).html(" " + datos[key]);
                }
                break;
        }
    });
    $.ajax({
        url:api("datos_empresa.php"),
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

                $("#coords_emp_act").val(datos.coordenadas);
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

function registra_empresa() {
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
        data_form = new FormData($("#form_reg_empresa")[0]);
        //data_form = $("#form_reg_empresa").serialize();
        $.ajax({
            url:api("reg_empresa.php"),
            dataType: "json",
            type: "post",
            data: data_form,
            contentType: false,
            processData: false
        }).done(function (result) {
            switch (result.status_code) {
                case 200:
                    addAlert("reg_empresa_ok", "Su empresa ha sido registrada exitosamente", "alert-success", "", "fa fa-check", "", true);
                    cargarDatos();
                    break;
            }
        });
    });
}

$(document).ready(function (e) {
    cargarDatos();
    $("#btn_reg_empresa").click(function (e) {
        e.preventDefault();
        registra_empresa();
    });

    $("#btn_act_empresa").click(function(e){
        actualizarEmpresa();
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


});