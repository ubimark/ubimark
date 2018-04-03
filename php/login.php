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
        if ($query = $enlace->prepare("SELECT count(*) as found, Id_usuario, contrasena FROM usuario WHERE correo = ?")) {
            $query->bind_param("s", $correo);
            $query->execute();
            $query->bind_result($count,$id,$hash);
            $query->fetch();
            $query->close();
        }else{
            echo json_encode(response(300));
        }
		
        if ($count==1 && password_verify($pass,$hash)){
                $vigencia = time() + 3600;
                $date = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
                $date->setTimestamp($vigencia);
                $token = bin2hex(random_bytes(128));
                $expira = $date->format("Y-m-d H:i:s");
                $params = array (
                    "token" => $token,
                    "Id_usuario" => $id,
                    "expira" => $expira
                );
                dbInsert("sesiones_activas","sis",$params);
                setcookie('Activo',"True",time()+3600,'','','',TRUE);
                setcookie('Id',$id,time()+3600,'','','',TRUE);
                setcookie('token',$token,time()+3600,'','','',TRUE);
                $filename = "../intranet/usuarios/" . $id . "/uploads/";
                if (!file_exists($filename)) {
                    mkdir($filename, 0777, true);
                }
                echo json_encode(response(200,$params));	
        }else{
            echo json_encode(response(103));
        }  
    }
?>
