<?PHP
    header("Content-Type:application/json");
    include_once("conectar.php");
    include("funciones.php");
    $Id = $_COOKIE['Id'];
    $sql = "SELECT * FROM usuario WHERE Id_usuario = ?"; 
    if ($query = $enlace -> prepare($sql)){
        $query -> bind_param("i",$Id);
        $query -> execute();
        $res = $query -> get_result();
        $query -> close();
    }else{
        echo json_encode(response(300,sqlError($sql,"i",$Id)));
        return;
    }
    $datos = array();
    while($row = $res -> fetch_Assoc()){
        array_push($datos,$row);
    }
    echo json_encode(response(200,$datos));

?>