<?PHP 
    header("Content-Type:application/json");
    include_once("conectar.php");
    include_once("funciones.php");
    $params = $_POST;
    $params['Id_cliente'] = $_COOKIE['Id'];
    $date = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
    $actual = time();
    $actual = $date->format("Y-m-d H:i:s");
    $params['fecha'] = $actual;
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

    if(strcmp($row['tipo_cuenta'], "PERSONAL") == 0){
        $params['tipo_vendedor'] = $row['tipo_cuenta'];
        $params['Id_vendedor'] = $row['Id_usuario'];
        $respuesta['destinoU'] = $row['Id_usuario'];
    }else if(strcmp($row['tipo_cuenta'], "EMPRESA") == 0){
        
        $params['tipo_vendedor'] = $row['tipo_cuenta'];
        $params['Id_vendedor'] = $row['Id_empresa'];
        $respuesta['destinoE'] = $row['Id_empresa'];

    }
    
    $types="";
    foreach($params as $key => $val){
        if(strcmp($key,"Id_producto")==0||strcmp($key,"Id_cliente")==0||strcmp($key,"Id_vendedor")==0){ 
            $types .= "i";
        }else{
            $types .= "s";
        }
    }
    $result = dbInsert("preguntas",$types,$params);
    if($result['status_code']!=200){
        echo json_encode($result);
        return;
    }
    $sql = "SELECT Id_pregunta FROM preguntas WHERE Id_cliente = ? AND fecha = ?";
    if($query = $enlace -> prepare($sql)){
        $query -> bind_param("is",$params['Id_cliente'],$params['fecha']);
        $query -> execute();
        $query -> bind_result($Id_pregunta);
        $query -> fetch();
        $query -> close();
    }else{
        echo json_encode(response(300,sqlError($sql,"is",array("Id_cliente"=>$params['Id_cliente'],"fecha"=>$params['fecha']))));
        return;
    }
    $respuesta = array("user"=> $params['Id_cliente'], "pregunta" =>$params['pregunta'],"target"=> $Id_pregunta, "fecha" =>$params['fecha'],"destino"=>$params['Id_vendedor'],"tipo"=>$params['tipo_vendedor']);
    echo json_encode(response(200,$respuesta));
    
?>