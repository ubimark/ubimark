var preg_active_todas = null;
var preg_active_comp = null;
var preg_active_pend = null;

function cargarPreguntas() {
    preg_active_todas = null;
    preg_active_comp = null;
    preg_active_pend = null;
    $("#productos_todas").html("");
    $("#preguntas_todas").html("");
    $("#productos_comp").html("");
    $("#preguntas_comp").html("");
    $("#productos_pend").html("");
    $("#preguntas_pend").html("");
    $.ajax({
        url: dir + "php/getPreguntasPersonal.php",
        type: "post"
    }).done(function (res) {
        switch (res.status_code) {
            case 200:
                preguntas = res.data;
                 
                for (let producto in preguntas) {
                    preguntas_todas(preguntas[producto]);
                    if (preguntas[producto].completadas > 0) {
                        preguntas_completadas(preguntas[producto]);
                    }
                    if (preguntas[producto].pendientes > 0) {
                        preguntas_pendientes(preguntas[producto]);
                    }
                }
                $('.send_respuesta_todas').click(function(e){
                    e.preventDefault();
                    send_respuesta("todas",$(this).attr('pregunta'),$(this).attr('cliente'),$(this).attr('vendedor'));
                });
                $('.send_respuesta_comp').click(function(e){
                    e.preventDefault();
                    send_respuesta("comp",$(this).attr('pregunta'),$(this).attr('cliente'),$(this).attr('vendedor'));
                });
                $('.send_respuesta_pend').click(function(e){
                    e.preventDefault();
                    send_respuesta("pend",$(this).attr('pregunta'),$(this).attr('cliente'),$(this).attr('vendedor'));
                });
                break;
        }
    });
}

function send_respuesta(seccion,pregunta,cliente,vendedor){
    let respuesta = $("#txtarea_"+seccion+"_"+pregunta).val();
     
    $.ajax({
        url:dir+"php/send_respuesta.php",
        type:"post",
        dataType:"json",
        data:{
            Id_pregunta:pregunta,
            respuesta:respuesta,
            Id_cliente:cliente,
            Id_vendedor:vendedor

        }
    }).done(function(res){
        switch(res.status_code){
            case 200:
                 
                datos = res.data;
                send_notificacion("RESPUESTA",datos.user,datos.target,datos.destino,datos.fecha);
                cargarPreguntas();
               
                break;
        }
    });
}

function preguntas_todas(producto) {
     
    $("#productos_todas").append(
        '<div class="d-flex border-bottom pb-2 mt-2" id="prod_' + producto.Id_producto + '">' +
        '<div class="card col-md-4 border-0 d-none d-md-block">' +
        '<img class="card-img" src="'+dir+'intranet/usuarios/'+producto.usr_path+'/uploads/'+producto.path+'" alt="Foto del producto">' +
        '</div>' +
        '<div class="card col-12 col-md-7 border-0">' +
        '<strong>' + producto.nombre_producto + '</strong>' +
        '</div>' +
        '</div>'
    );
    $("#prod_" + producto.Id_producto).click(function (e) {
        e.preventDefault();
        $(preg_active_todas).addClass("d-none");
        preg_active_todas = "#preguntas_todas_" + producto.Id_producto;
        $("#preguntas_todas_" + producto.Id_producto).removeClass('d-none');
    });
    $("#preguntas_todas").append(
        '<div class="d-none" id="preguntas_todas_' + producto.Id_producto + '"></div>'
    );
    for (let pregunta of producto.preguntas) {

        if (pregunta.estado == 'completado') {
            $("#preguntas_todas_" + producto.Id_producto).prepend(
                '<div class="rounded bg-light mb-3 d-flex flex-column">' +
                '<strong>' +
                pregunta.cliente +
                '<small class="mr-3 float-right">Historial</small>' +
                '</strong>' +
                '<p>' + pregunta.pregunta + '<br>' +
                '<span id="respuestas_todas_'+pregunta.Id_pregunta+'"></span></p>'+
                '<div class="">' +
                '<textarea name="" id="txtarea_todas_'+pregunta.Id_pregunta+'" class="form-control" rows="1"></textarea>' +
                '<button type="button" class="btn btn-info pull-right send_respuesta_todas" pregunta="'+pregunta.Id_pregunta+'" cliente="'+pregunta.Id_cliente+'" vendedor="'+pregunta.Id_vendedor+'">Responder</button>' +
                '</div>' +
                '</div>'
            );
             
            for(let respuesta of pregunta.respuestas){
                 
                $("#respuestas_todas_"+pregunta.Id_pregunta).append(
                    '<span class="px-3">'+respuesta.respuesta+'</span><br>'
                );
            }
        }else{
            $("#preguntas_todas_" + producto.Id_producto).prepend(
                '<div class="rounded bg-light mb-3 d-flex flex-column">' +
                '<strong>' +
                pregunta.cliente +
                '<small class="mr-3 float-right">Historial</small>' +
                '</strong>' +
                '<p>' + pregunta.pregunta + '</p>' +
                '<div class="">' +
                '<textarea name="" id="txtarea_todas_'+pregunta.Id_pregunta+'" class="form-control" rows="1"></textarea>' +
                '<button type="button" class="btn btn-info pull-right send_respuesta_todas" pregunta="'+pregunta.Id_pregunta+'" cliente="'+pregunta.Id_cliente+'" vendedor="'+pregunta.Id_vendedor+'">Responder</button>' +
                '</div>' +
                '</div>'
            );
        } 
    }
    if (preg_active_todas == null) {
        preg_active_todas = "#preguntas_todas_" + producto.Id_producto;
        $("#preguntas_todas_" + producto.Id_producto).removeClass('d-none');
    }
}

function preguntas_completadas(producto) {
     
    $("#productos_comp").append(
        '<div class="d-flex border-bottom pb-2 mt-2" id="prod_comp_' + producto.Id_producto + '">' +
        '<div class="card col-md-4 border-0 d-none d-md-block">' +
        '<img class="card-img" src="'+dir+'intranet/usuarios/'+producto.usr_path+'/uploads/'+producto.path+'" alt="Foto del producto">' +
        '</div>' +
        '<div class="card col-12 col-md-7 border-0">' +
        '<strong>' + producto.nombre_producto + '</strong>' +
        '</div>' +
        '</div>'
    );
    $("#prod_comp_" + producto.Id_producto).click(function (e) {
        e.preventDefault();
        $(preg_active_comp).addClass("d-none");
        preg_active_comp = "#preguntas_comp_" + producto.Id_producto;
        $("#preguntas_comp_" + producto.Id_producto).removeClass('d-none');
    });
    $("#preguntas_comp").append(
        '<div class="d-none" id="preguntas_comp_' + producto.Id_producto + '"></div>'
    );
    for (let pregunta of producto.preguntas) {
        if (pregunta.estado == 'completado') {
            $("#preguntas_comp_" + producto.Id_producto).prepend(
                '<div class="rounded bg-light mb-3 d-flex flex-column">' +
                '<strong>' +
                pregunta.cliente +
                '<small class="mr-3 float-right">Historial</small>' +
                '</strong>' +
                '<p>' + pregunta.pregunta + '<br>' +
                '<span id="respuestas_'+pregunta.Id_pregunta+'"></span></p>'+
                '<div class="">' +
                '<textarea name="" id="txtarea_comp_'+pregunta.Id_pregunta+'" class="form-control" rows="1"></textarea>' +
                '<button type="button" class="btn btn-info pull-right send_respuesta_comp" pregunta="'+pregunta.Id_pregunta+'" cliente="'+pregunta.Id_cliente+'" vendedor="'+pregunta.Id_vendedor+'">Responder</button>' +
                '</div>' +
                '</div>'
            );
             
            for(let respuesta of pregunta.respuestas){
                 
                $("#respuestas_"+pregunta.Id_pregunta).append(
                    '<span class="px-3">'+respuesta.respuesta+'</span><br>'
                );
            }
        }
    }
    if (preg_active_comp == null) {
        preg_active_comp = "#preguntas_comp_" + producto.Id_producto;
        $("#preguntas_comp_" + producto.Id_producto).removeClass('d-none');
    }
}

function preguntas_pendientes(producto) {
    $("#productos_pend").append(
        '<div class="d-flex border-bottom pb-2 mt-2" id="prod_pend_' + producto.Id_producto + '">' +
        '<div class="card col-md-4 border-0 d-none d-md-block">' +
        '<img class="card-img" src="'+dir+'intranet/usuarios/'+producto.usr_path+'/uploads/'+producto.path+'" alt="Foto del producto">' +
        '</div>' +
        '<div class="card col-12 col-md-7 border-0">' +
        '<strong>' + producto.nombre_producto + '</strong>' +
        '</div>' +
        '</div>'
    );
    $("#prod_pend_" + producto.Id_producto).click(function (e) {
        e.preventDefault();
        $(preg_active_pend).addClass("d-none");
        preg_active_pend = "#preguntas_pend_" + producto.Id_producto;
        $("#preguntas_pend_" + producto.Id_producto).removeClass('d-none');
    });
    $("#preguntas_pend").append(
        '<div class="d-none" id="preguntas_pend_' + producto.Id_producto + '"></div>'
    );
    for (let pregunta of producto.preguntas) {
        if (pregunta.estado == 'pendiente') {
            $("#preguntas_pend_" + producto.Id_producto).prepend(
                '<div class="rounded bg-light mb-3 d-flex flex-column">' +
                '<strong>' +
                pregunta.cliente +
                '<small class="mr-3 float-right">Historial</small>' +
                '</strong>' +
                '<p>' + pregunta.pregunta + '</p>' +
                '<div class="">' +
                '<textarea name="" id="txtarea_pend_'+pregunta.Id_pregunta+'" class="form-control" rows="1"></textarea>' +
                '<button type="button" class="btn btn-info pull-right send_respuesta_pend" pregunta="'+pregunta.Id_pregunta+'" cliente="'+pregunta.Id_cliente+'" vendedor="'+pregunta.Id_vendedor+'">Responder</button>' +
                '</div>' +
                '</div>'
            );
        }
    }
    if (preg_active_pend == null) {
        preg_active_pend = "#preguntas_pend_" + producto.Id_producto;
        $("#preguntas_pend_" + producto.Id_producto).removeClass('d-none');
    }
}

$(document).ready(function (e) {
    cargarPreguntas();
});