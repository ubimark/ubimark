<?PHP 
    header("Content-Type:application/json");
    include("conectar.php");
    include("funciones.php");
    $table = "carrito";
    $params = $_POST;
    $params["Id_usuario"] = $_COOKIE['Id'];
    $types = "iii";

    $sql = "SELECT count(*) 
            FROM carrito 
            WHERE Id_producto = ? AND Id_usuario = ?";
    if($query = $enlace -> prepare($sql)){
        $query->bind_param("ii",$params['Id_producto'],$params['Id_usuario']);
        $query->execute();
        $query->bind_result($count);
        $query->fetch();
        $query->close();
    }else{
        echo json_encode(response(300,sqlError($sql,"ii",array($params['Id_producto'],$params['Id_usuario']))));
        return;
    }

    if($count >= 1){
        echo json_encode(response(303, array("Id_producto" => $params['Id_producto'],"Id_usuario" => $params['Id_usuario'],"en_carrito" => $count) ));
        return;
    }
    $result = dbInsert($table,$types,$params);
    echo json_encode($result);

?>