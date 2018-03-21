<!DOCTYPE html>
<?PHP
    include_once("conectar.php");
    include("busqueda.php");
    $token=$_GET['search'];
    $results = buscar($token);

?>

    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <title>Ubimark</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">

        <link rel="stylesheet" href="../css/font-awesome.min.css">
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/estilos.min.css">
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
                            <input type="search" class="form-control mr-md-0 " id="token" value="<?PHP echo $token;?>">
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
        <div id="contenido">
		<div id="alertas"></div>
        <section>
           
            <div class="container-fluid text-center p-0 m-0">
                <?PHP if(notNull($token)){ ?>
                Estos son los resultados encontrados de:
                <?PHP echo $token."<br>";}?>
            </div>
        </section>
        <div class="mt-3 d-flex float-left ">
        	<h4>
   
        </div>
		
        <?PHP
            //Toma los resultados almacenados y solicita informacion mas detallada mostrandolos en pantalla
            foreach($results as &$val){
                if($query=$enlace->prepare("SELECT P.*, GROUP_CONCAT(T.tag) AS tags FROM productos P INNER JOIN map_tag M ON M.ID_producto=P.Id_producto INNER JOIN tags T ON T.ID_tag=M.ID_tag WHERE P.Id_producto=?")){
                    $query->bind_param("i",$val);
                    $query->execute();
                    $res=$query->get_result();
                    $query->close();
                }else{
                    print_r($enlace);
                }
                if($query=$enlace->prepare("SELECT path, Id_usuario FROM imagen_prod WHERE Id_producto = ? LIMIT 1")){
                    $query->bind_param("i",$val);
                    $query->execute();
                    $query->bind_result($img,$id_usuario);
                    $query->fetch();
                    $query->close();
                }else{
                    print_r($enlace);
                }
            
                while($row=$res->fetch_Assoc()){      
        ?>
            <section class="container-fluid d-flex flex-nowrap col-12 col-md-9 position-relative float-right mt-3 Producto_link" id="<?PHP echo($row['Id_producto']) ?>">
    
                <div class="card col-4 col-md-3">
                    <img class="card-img" src=<?PHP echo "../intranet/usuarios/".$id_usuario."/uploads/".$img ?> alt="Foto del producto">
                </div>
				<div class="card col-8 col-md-6">
				  <ul class="list-unstyled">
					<li class="">
						<h3 >
                        	<?PHP echo($row['nombre_producto']);?>
                        </h3>					
					</li>
					<li class="">
                         <h4>$
                          	<?PHP echo($row['precio']);?>
                         </h4>
                    </li>
                    <li class="">
                    	<?PHP echo($row['existencias']);?> en existencia.
                    </li>
					<li class=" py-0 px-1 ml-3 mb-3 bg-light">
						Descripción: <?PHP echo($row['descripcion']);?>
					</li>
				  </ul>
				</div>
            </section>

            <?PHP
                }
            }
           ?>
           
		</div>
        <footer class="account mt-5 container-fluid d-flex flex-column">
			<div class="">
				<ul class="list-inline d-flex justify-content-center">
				  <li class="list-inline-item text-white col-md-1 d-none d-md-block"><small><img src="../images/ubimark_grey.svg" alt=""></small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Trabaja con nosotros</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Politicas de uso</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Terminos y condiciones</small></li>
				  <li class="list-inline-item text-white col-3 col-md-2"><small>Preguntas frecuentes</small></li>
				</ul>
			</div>
			<div class=" d-flex justify-content-center">
				<small class="text-white">Copyright © 2017-2018 Ubimark</small>
			</div>
		</footer>

                <script src="../js/jquery-3.2.1.min.js" type="application/javascript"></script>
                <script src="../js/popper.min.js" type="application/javascript"></script>
                <script src="../js/bootstrap.min.js" type="application/javascript"></script>
                <script src="../js/check-session.js" type="application/javascript"></script>
    </body>

    </html>
