<?php
    header("Content-Type:application/json");
    include_once("conectar.php");
    include("funciones.php");

    $correo = $_POST['email'];
    $pass = $_POST['password'];
    if(notNull($correo) && notNull($pass)){
        login($correo,$pass,$enlace);
    }else{
        echo json_encode(response(302));
    }
    $enlace->close();

    /**
     * Función para iniciar sesión
     *
     * @param string $correo
     * @param string $pass
     * @param object $enlace
     */
    function login($correo,$pass,$enlace){
        if ($query = $enlace->prepare("SELECT count(*) as found, Id_usuario FROM usuario WHERE correo = ? AND contrasena = ?")) {
            $query->bind_param("ss", $correo,$pass);
            $query->execute();
            $query->bind_result($count,$id);
            $query->fetch();
            $query->close();
        }else{
            echo json_encode(response(300));
        }
		
        if ($count==1){
                setcookie('Activo',"True",time()+3600,'','','',TRUE);
                setcookie('Id',$id,time()+3600,'','','',TRUE);
                setcookie('Pass',$pass,time()+3600,'','','',TRUE);
                $filename = "../intranet/usuarios/" . $id . "/uploads/";
                if (!file_exists($filename)) {
                    mkdir($filename, 0777, true);
                }
                echo json_encode(response(200));	
        }else{
            echo json_encode(response(103));
        }  
    }
?>
