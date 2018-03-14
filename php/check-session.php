<?PHP

    header("Content-type:application/json");
    include_once("conectar.php");
    include("funciones.php");

    if(isset($_COOKIE['Activo'])){
        $id = $_COOKIE['Id'];
        $pass = $_COOKIE['Pass'];
    }else{
        echo json_encode(response(100));
        return;
    }

    if($query = $enlace->prepare("SELECT count(*) as found, nombre, apellidos FROM usuario WHERE Id_usuario = ? AND contrasena = ?")){
        $query->bind_param("is",$id,$pass);
        $query->execute();
        $res=$query->get_result();
        while($row=$res->fetch_Assoc()){
            echo json_encode(response(101, $row));
        }
        $query->close();
    }else{
        echo json_encode(response(300));
    }

?>