<!doctype html>
<?php 
	include("conectar.php");
	include("funciones.php");
	$id = $_GET['key'];
	$sql = "SELECT p.*,u.nombre,u.apellidos,u.trabaja_en,u.Id_usuario,GROUP_CONCAT(i.path) AS paths FROM productos p JOIN usuario u ON u.Id_usuario = p.Id_usuario JOIN imagen_prod i ON i.Id_producto = p.Id_producto WHERE p.Id_producto = ?";
	if($query = $enlace->prepare($sql)){
		$query->bind_param("i",$id);
		$query->execute();
		$res = $query->get_result();
		$query->close();
	}else {
        echo json_encode(response(300, array('sql' => $sql, "params" => $id, )));
        return;
    }
	$row = $res->fetch_Assoc(); 
	if($row['tipo_cuenta']=="EMPRESA"){
        $sql = "SELECT * FROM empresa WHERE Id_empresa = ?";
        if($query = $enlace->prepare($sql)){
            $query->bind_param("i",$row['Id_empresa']);
            $query->execute();
            $res = $query->get_result();
            $query->close();
        }else {
            echo json_encode(response(300, array('sql' => $sql, "params" => $id, )));
            return;
        }
        $empresa = $res -> fetch_Assoc();
    }else{
        $sql = "SELECT * FROM usuario WHERE Id_usuario = ?";
        if($query = $enlace->prepare($sql)){
            $query->bind_param("i",$row['Id_usuario']);
            $query->execute();
            $res = $query->get_result();
            $query->close();
        }else {
            echo json_encode(response(300, array('sql' => $sql, "params" => $id, )));
            return;
        }
        $vendedor = $res -> fetch_Assoc();
    }

?>
<html>

<head>
    <meta charset="UTF-8">
    <title>Subir Producto</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="theme-color" content="#002F3F">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/estilos.min.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/estilos1.css">

</head>
<script src="../js/jquery-3.2.1.min.js" type="application/javascript"></script>
<script src="../js/main.js" type="application/javascript"></script>
<script src="../js/mostrar_prod.js" type="application/javascript"></script>
<script>
	get_Dir();
	check_session();
	session_required(window.location.pathname);
</script>
<body class="background-grey">
    <header class="container">
        <nav class="navbar navbar-expand-md navbar-dark container-fluid fixed-top d-flex flex-wrap">
            <a class="navbar-brand col-4 col-md-2 mr-auto">
                <img src="../images/ubimark_bco.svg" alt="">
            </a>

            <div class="btn-group dropdown d-none mr-2" id="btn-cuenta">
                <button class="btn navbar-toggler py-2 px-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item vender">Vender</a>
                    <a class="dropdown-item carrito">
                            <em class="fa fa-shopping-cart"></em>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item mc-resumen">Resumen</a>
                    <a class="dropdown-item mc-compras">Compras</a>
                    <a class="dropdown-item mc-ventas">Ventas</a>
                    <a class="dropdown-item mc-stats">Estadisticas</a>
                    <a class="dropdown-item mc-alerts"><i class="fa fa-bell-o" aria-hidden="true"></i></a>
                    <a class="dropdown-item mc-mail"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item cuenta">Mi cuenta</a>
                    <a class="dropdown-item logout">Cerrar sesion</a>
                </div>

            </div>
            <button class="btn d-none navbar-toggler col-1 px-0 py-2 mr-2" data-toggle="collapse" href="#menu" id="mi-ingresar2"><em class="fa fa-bars"></em></button>
            <button class="btn navbar-toggler col-1 px-0 py-2 mr-2" data-toggle="collapse" href=#buscador>
                    <i class="fa fa-search"></i>
            </button>

            <div class="collapse navbar-collapse col-md-7 mx-0 px-0 pt-2 pt-md-0 justify-content-center" id="buscador">
                <form class="form-inline col-lg-10 col-md-9 col-sm-auto" action="">
                    <div class="input-group col rounded-0 px-0">
                        <input type="search" class="form-control mr-md-0 " id="token">
                        <button class="btn btn-secondary input-group-addon" id="buscar"><i class="fa fa-search"></i></button>
                    </div>
                </form>
            </div>

            <div class="collapse navbar-collapse col-md-3 justify-content-end text-center" id="menu">
                <ul class="nav navbar-nav mr-0 my-0 d-flex flex-nowrap">
                    <li class="nav-item pt-1">
                        <div class="dropleft">
							<em class="nav-link fa fa-shopping-cart" id="dropdownShopping-Cart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></em>
							<div class="dropdown-menu" aria-labelledby="dropdownShopping-Cart" id="carrito-dropdown">

							</div>
						</div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link vender">Vender</a>
                    </li>
                    <li class="nav-item d-none" id="mi-ingresar">
                        <a class="nav-link login">Ingresar</a>
                    </li>
                    <li class="nav-item dropdown d-none" id="mi-cuenta">
                        <a class="nav-link dropdown-toggle" id="drop-mi-cuenta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Luis S.
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" area-labelledby="drop-mi-cuenta">
                            <a class="dropdown-item cuenta">Mi Cuenta</a>
                            <a class="dropdown-item logout">Cerrar Sesión</a>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="container-fluid account d-none" id="menu-user">
                <div class="container ">
                    <ul class="nav  nav-fill">
                        <li class="nav-item">
                            <a class="nav-link mc-resumen text-white">Resumen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-compras text-white">Compras</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-ventas text-white">Ventas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-stats text-white">Estadisticas</a>
                        </li>
                        <li class="nav-item">
                            <div class="mc-alerts nav-link dropdown">
								<i class="fa fa-bell-o text-white" id="dropdownNoti" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span class="badge badge-danger d-none" id="noti_cont">0</span>
								</i>
								<div class="dropdown-menu pb-1 px-1" id="drpdwn_noti" aria-labelledby="dropdownNoti">
									<strong class="text-center d-block	">Notificaciones</strong>
									<div class="dropdown-divider mb-0"></div>
									<ul class="nav nav-tabs" id="noti_body_tabs" role="tablist">
										<li class="nav-item">
											<span class="nav-link disabled" id="company_tab" data-toggle="tab" href="#company_noti" role="tab" aria-controls="company_noti" aria-selected="true">Empresa</span>
										</li>
										<li class="nav-item">
											<span class="nav-link disabled" id="personal_tab" data-toggle="tab" href="#personal_noti" role="tab" aria-controls="personal_noti" aria-selected="false">Personal</span>
										</li>
									</ul>
									<div id="drpdwn_noti_body" user="0">
										
										<div class="tab-content" id="noti_content">
											<div class="tab-pane fade" id="company_noti" role="tabpanel" aria-labelledby="company_tab">
												
											</div>
											<div class="tab-pane fade" id="personal_noti" role="tabpanel" aria-labelledby="personal_tab">

											</div>
										</div>
									</div>

								</div>
							</div>                                 
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-mail">
                                <i class="fa fa-envelope-o text-white" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    </header>
    <div class="background-white container d-flex flex-column">
    	<div id="contenido">
		<div id="alertas"></div>
		
			<section class="m-0">
					<div class="d-flex justify-content-center col-lg-8 offset-lg-2">
						<div id="myCarousel" class="carousel slide" data-ride="carousel">
							<div class="carousel-inner">
                                <?PHP 
                                $i=0;
                                $class_active = " active";
                                $class_normal = "carousel-item carousel-item-prod";

                                $paths=preg_split("/[,]+/",$row['paths']); //Separa a las rutas de imagen del producto para mostrarlas 
                                
                                foreach($paths as &$path){
                                    $class = $class_normal;
                                    if($i==0){
                                        $class.=$class_active;
                                    }
                                ?>
                                    <div <?PHP echo "class=\"".$class."\""; ?> data-slide-number=<?PHP echo $i; ?> >
                                        <img src=<?PHP echo "../intranet/usuarios/".$row['Id_usuario']."/uploads/".$path; ?> class="img-fluid img-resize">
                                    </div>
                                <?PHP $i++; } ?>
                                <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev"> <em class="fa fa-arrow-circle-o-left fa-2x" style="color: gray;" aria-hidden="true"></em> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next"> <em class="fa fa-arrow-circle-o-right fa-2x" style="color: gray;" aria-hidden="true"></em> <span class="sr-only">Next</span> </a></div>
									<!-- main slider carousel nav controls -->
							
								<ol class="carousel-indicators">
                                <?PHP 
                                   $i=0;
                                   $class_active = "active ";
                                   
                                   $paths=preg_split("/[,]+/",$row['paths']); //Separa a las rutas de imagen del producto para mostrarlas 
                                   
                                   foreach($paths as &$path){
                                        $class = "";
                                        $classA = "";
                                        if($i==0){
                                            $class.=$class_active;
                                            $classA="selected";
                                        }
                                       
                                        
                                    ?>
									<li <?PHP echo "class=\"".$class."\""; ?> data-slide-to="<?PHP echo $i; ?>" data-target="#myCarousel">
									</li>
                                    <?PHP $i++; } ?>
								</ol>
							
						</div>	
				</div>	
			</section>
			<div class="container pt-3">			
			<div class="mt-3 d-flex position-relative flex-md-row flex-column">
                <?PHP if (isset($empresa)){?>
                    
					<div class="col-12 col-md-6 order-2">
                        <?PHP
                            $coords = preg_split("/[,]+/",$empresa['coordenadas']);
                        ?>
                        <input type="text" value="<?PHP echo $coords[0];?>" id="lat" hidden>
                        <input type="text" value="<?PHP echo $coords[1];?>" id="lon" hidden>
                        <script>set_band_empresa(true);</script>
                        <h5>Información del vendedor</h5>
                        <span id="info_empresa">
                            <strong id="empresa"><?PHP echo $empresa['nombre_empresa']?></strong>
                            <p><span><?PHP echo $empresa['calle']." #".$empresa['numero'].$empresa['numinterior']?></span><br>
                            <span><?PHP echo "Colonia ".$empresa['colonia']." C.P. ".$empresa['cp'];?></span><br>
                            <span><?PHP echo $empresa['ciudad'].", ".$empresa['estado']?></span></p>
                            <p>Reputación:
                            
                            <?PHP
                                $i = $empresa['calificacion'];
                                for(;$i>=1;$i--){
                                    echo '<i class="fa fa-star colorStar"></i>';
                                }
                                if($i == 0.5){
                                    echo '<i class="fa fa-star-half colorStar"></i>';
                                }
                            ?>
                            
                            <small> (<?PHP echo $empresa['calificacion'];?>)</small></p>
                        </span>
					</div>
                <?PHP }else{ ?>

                    <div class="col-12 col-md-6 order-2">
                        
                        <input type="text" value="" id="lat" hidden>
                        <input type="text" value="" id="lon" hidden>
                        <script>getCoords("<?PHP echo $vendedor['delegacion'];?>");set_band_empresa(false);</script>
                        <h5>Información del vendedor</h5>
                        <span id="info_empresa">
                            <strong id="empresa"><?PHP echo $vendedor['nombre']." ".$vendedor['apellidos']?></strong>
                            <p><span><?PHP echo $vendedor['delegacion'].", ".$vendedor['estado']?></span></p>
                            <p>Reputación:
                            
                            <?PHP
                                $i = $vendedor['calificacion'];
                                for(;$i>=1;$i--){
                                    echo '<i class="fa fa-star colorStar"></i>';
                                }
                                if($i == 0.5){
                                    echo '<i class="fa fa-star-half colorStar"></i>';
                                }
                            ?>
                            
                            <small> (<?PHP echo $vendedor['calificacion'];?>)</small></p>
                        </span>
					</div>
                <?PHP } ?>
					<div class="col-12 col-md-6 order-1">
							<h4 id="nom-producto"><?PHP echo $row['nombre_producto']; ?></h4>
							<h6 id="precio">$<?PHP echo $row['precio']; ?></h6>
						<div class="mt-4 mb-3 d-flex">
						    <input type="number" value="1" id="cantidad" class="form-control col-4 col-md-2 col-lg-2 mr-3"> 
							<div class="d-flex" id="add2cart-cont">
								<button type="button" class="btn btn-info add2cart" id="<?PHP echo $id; ?>"><i class="fa fa-shopping-cart"></i></button>
							</div>
							<button type="button" class="btn btn-info ml-3" id="btn-comprar" folio="<?PHP echo $id; ?>">Comprar</button>

						</div>
					</div>

</div>
			<div class="mt-5">
				<div class="px-3 col-12">
					<h5>Descripción</h5>
					<p><?PHP echo $row['descripcion']; ?></p>
				</div>
				<div class="px-3 col-12 mt-5">
					<h5>Ubicación</h5>
					<div id="map"></div>
				</div>
				<div class="px-3 col-12 mt-5">
                    <h5>Preguntas</h5>
                    <div class="form-group clearfix">
                        <textarea name="pregunta" id="pregunta" rows="1" class="col-12 form-control"></textarea>
                        <button type="button" id="send_pregunta" producto="<?PHP echo $id; ?>" class="btn btn-success float-right mt-1">Enviar</button>
                    </div>
                    <div id="seccion_preguntas">
                        
                    </div>
                    
					
				</div>
			</div>
		</div>			
	</div>
	</div>
		<footer class="account mt-5 container-fluid">
			<div class="col-12">
				<ul class="list-inline d-flex justify-content-center">
				  <li class="list-inline-item text-white col-md-1 d-none d-md-block"><small><img src="../images/ubimark_grey.svg" alt=""></small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Trabaja con nosotros</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Politicas de uso</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Terminos y condiciones</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Preguntas frecuentes</small></li>
				</ul>
			</div>
			<div class="col-12 d-flex justify-content-center">
				<small class="text-white">Copyright © 2017-2018 Ubimark</small>
			</div>
		</footer>
    <script src="../js/popper.min.js" type="application/javascript"></script>
    <script src="../js/bootstrap.min.js" type="application/javascript"></script>
    <script src="js/fancywebsocket.js" type="text/javascript"></script>
    <script async="false" defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWY7xqWIram5PPPWVbXyN_I22rC02OQY0">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.js"></script>
    
    

  

</body>

</html>
