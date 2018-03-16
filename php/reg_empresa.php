<?PHP
    header("Content-Type:application/json");
    include("funciones.php");
    $table = "empresa";
    $params = $_POST;
    $params['Id_usuario'] = $_COOKIE['Id'];
    $params['pais'] = "Mexico";
    $types = "";
    foreach($params as $key => $val){
        if($key!="numinterior"){
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
    $result=dbInsert($table,$types,$params);
    echo json_encode($result);

?>