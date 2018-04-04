<?PHP 
    header("Content-Type:application/json");
    include_once("conectar.php");
    include_once("funciones.php");
    $params = $_POST;
    $params['Id_cliente'] = $_COOKIE['Id'];
    $sql = "SELECT * FROM productos WHERE Id_producto = ?";
    if ($query = $enlace -> prepare($sql)){
        $query -> bind_param("i",$params['Id_producto']);
        $query -> execute();
        $res = $query -> get_result();
        $query -> close();
    }else{
        echo json_encode(response(300,sqlError($sql,"i",$params['Id_producto'])));
        return;
    }
    $row = $res -> fetch_Assoc();
    if($row['tipo_cuenta'] == "PERSONAL"){
        $params['tipo_vendedor'] = "PERSONAL";
        $params['Id_vendedor'] = $row['Id_usuario'];
    }else if($row['tipo_cuenta'] == "EMPRESA"){
        $params['tipo_vendedor'] = "EMPRESA";
        $params['Id_vendedor'] = $row['Id_empresa'];
    }
    $result = dbInsert("preguntas","siisi",$params);
    echo json_encode($result);
    
?>