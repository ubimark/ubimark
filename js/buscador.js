var search;

function buscar(val){
    $.ajax({
        url : api("buscador.php?search=" + val),
        type : "get",
        dataType : "json"
    }).done(function(res){
        switch(res.status_code){
            case 200:
                data = res.data;
                for(var key in data){
                    result=data[key];
                    image = data[key]['image'];
                    $("#results").append('<section class="container-fluid d-flex flex-nowrap col-12 col-md-9 position-relative float-right mt-3 Producto_link" id="'+result.Id_producto+'">'+               
                    '<div class="card col-4 col-md-3">'+
                    '<img class="card-img" src="'+api("intranet/usuarios/"+image.uploader+"/uploads/"+image.path)+'" alt="Foto del producto">'+
                    '</div>'+
                    '<div class="card col-8 col-md-6">'+
                    '<ul class="list-unstyled">'+
                    '<li class="">'+
                    '<h3>'+
                    result.nombre_producto+
                    '</h3>'+
                    '</li>'+
                    '<li class="">'+
                    '<h4>$ '+
                    parseFloat(result.precio).toFixed(2)+
                    '</h4>'+
                    '</li>'+
                    '<li class="">'+result.existencias+
                    ' en existencia'+
                    '</li>'+
                    '<li class=" py-0 px-1 ml-3 mb-3 bg-light">Descripción:'+
                    result.descripcion+
                    '</li>'+
                    '</ul>'+
                    '</div>'+
                    '</section>');
                   
            
                }
                $(".Producto_link").click(function (e) {
                    e.preventDefault();
                    href("paginas/mostrar-producto.html?key=" + this.id);
                });
                break;
        }
    });
}
$(document).ready(function(){
    search = getParameterByName("search");
    buscar(search);
    $("#token").prop("value",search);
    $(".search").addClass(search!=""?"":"d-none");
    $(".token").html(search);
    
});