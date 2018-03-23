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
	if($band = notNull($row['trabaja_en'])){

	}

?>
<html>

<head>
    <meta charset="UTF-8">
    <title>Subir Producto</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/estilos.min.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/estilos1.css">

</head>

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
                            <a class="nav-link mc-resumen">Resumen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-compras">Compras</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-ventas">Ventas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-stats">Estadisticas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-alerts"><i class="fa fa-bell-o" aria-hidden="true"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link mc-mail"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    </header>
    <div class="background-white container d-flex flex-column">
    	<div id="contenido">
		<div id="alertas"></div>
			<section class="margen">
					<div class="d-flex justify-content-center col-lg-8 offset-lg-2">
						<div id="myCarousel" class="carousel slide" data-ride="carousel">
							<div class="carousel-inner">
                                <?PHP 
                                $i=0;
                                $class_active = " active";
                                $class_normal = "carousel-item";
                                
                                $paths=preg_split("/[,]+/",$row['paths']); //Separa a las rutas de imagen del producto para mostrarlas 
                                
                                foreach($paths as &$path){
                                    $class = $class_normal;
                                    if($i==0){
                                        $class.=$class_active;
                                    }
                                    
                                ?>
                                    <div <?PHP echo "class=\"".$class."\""; ?> data-slide-number=<?PHP echo $i; ?>>
                                        <img src=<?PHP echo "../intranet/usuarios/".$row['Id_usuario']."/uploads/".$path; ?> class="img-fluid">
                                    </div>
                                <?PHP $i++; } ?>
								<a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
									<span class="carousel-control-prev-icon" aria-hidden="true"></span>
									<span class="sr-only">Previous</span>
								</a>
								<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
									<span class="carousel-control-next-icon" aria-hidden="true"></span>
									<span class="sr-only">Next</span>
								</a> 

							</div>
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
			</div>
			<div class="container pt-3">			
			<div class="mt-3 d-flex position-relative flex-md-row flex-column">
					<div class="col-12 col-md-6 order-2">
						<h5>Información del vendedor</h5>
						<strong>Apple</strong>
						<p>Jalisco</p>
						<p>Reputación:</p>
						<i class="fa fa-star colorStar"></i><i class="fa fa-star colorStar"></i><i class="fa fa-star colorStar"></i><i class="fa fa-star colorStar"></i></i><i class="fa fa-star-half colorStar"></i>
						<small> (4.5)</small>
					</div>

					<div class="col-12 col-md-6 order-1">
							<h4 id="nom-producto"><?PHP echo $row['nombre_producto']; ?></h4>
							<h6 id="precio">$<?PHP echo $row['precio']; ?></h6>
						<div class="mt-4 mb-3 d-flex">
						    <input type="number" value="1" id="cantidad" class="form-control col-4 col-md-2 col-lg-1 mr-3"> 
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
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119452.69716917786!2d-103.40545358012501!3d20.67377770932267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b18cb52fd39b%3A0xd63d9302bf865750!2sGuadalajara%2C+Jal.!5e0!3m2!1ses!2smx!4v1518049408177" width="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
				</div>
				<div class="px-3 col-12 mt-5">
					<h5>Preguntas</h5>
					<div class="background-grey col-12 rounded">
						<p>Pregunta perrona: Lorem ipsum dolor sit amet, consectetur..</p>
					</div>
					<textarea name="" id="" rows="3" class="col-12"></textarea>
					<button type="button" class="btn btn-success float-right">Enviar</button>
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
    <script src="../js/jquery-3.2.1.min.js" type="application/javascript"></script>
    <script src="../js/popper.min.js" type="application/javascript"></script>
    <script src="../js/bootstrap.min.js" type="application/javascript"></script>
    <script src="../js/main.js" type="application/javascript"></script>
    <script src="../js/check-session.js" type="application/javascript"></script>
</body>

</html>