<?PHP
    header("Content-Type:application/json");
    include("funciones.php");
    $table = "empresa";
    $params = $_POST;
    $params['Id_usuario'] = $_COOKIE['Id'];
    $params['pais'] = "Mexico";
    $types = "";
    foreach($params as $key => $val){
        if($key != "numinterior"){
            if(!notNull($val)){
                echo json_encode(response(302,$key));
            }
        }
        if($key == "numero" || $key == "cp" || $key == "Id_usuario"){
            $types .= "i";
        }else{
            $types .= "s";
        }
    }
    $result = dbInsert($table,$types,$params);
    if($result['status_code'] != 200){
        echo json_encode($result);
        return;
    }
    $sql = "SELECT Id_empresa FROM empresa WHERE RFC = ?";
    if($query = $enlace->prepare($sql)){
        $query->bind_param("s",$params['RFC']);
        $query->execute();
        $query->bind_result($Id_empresa);
        $query->fetch();
        $query->close();
    }
    $params2 = array("trabaja_en" => $Id_empresa);
    $result = dbUpdate("usuario","i",array("trabaja_en" => $Id_empresa),"i",array("Id_usuario" => $params['Id_usuario']));
    if($result != 200){
        echo json_encode($result);
        return;
    }
    if($Id_empresa >= 1){
        $filename = "../intranet/empresas/" . $Id_empresa . "/uploads/";
        if (!file_exists($filename)) {
            mkdir($filename, 0777, true);
        }
    }
    echo json_encode($result);

?>