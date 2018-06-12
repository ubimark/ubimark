<?PHP 
    header("Content-Type:application/json");
    include("conectar.php");
    include("funciones.php");
    if($res = check_session()['status_code'] != 101){
        echo json_encode($res);
        return;
    }
    $JSON = json_decode(file_get_contents("php://input"), true);
    if(isset($JSON) && $JSON != null){
        $_POST = $JSON;
    }
    
    $folio = array("folio_carrito" => $_POST['folio_carrito']);
    $cantidad = array("cantidad" => $_POST['cantidad']);
    $table = "carrito";
    $result = dbUpdate($table,"i",$cantidad,"i",$folio);
    if($result["status_code"] != 200){
        echo json_encode($result);
        return;
    }else{
        $sql = "SELECT c.*,p.nombre_producto,p.existencias,p.precio 
                FROM carrito c 
                JOIN productos p ON p.Id_producto = c.Id_producto 
                WHERE c.folio_carrito = ? ";
        if($query = $enlace->prepare($sql)){
            $query->bind_param("i",$folio['folio_carrito']);
            $query->execute();
            $res = $query->get_result();
            $query->close();
        }else{
            echo json_encode(response(300,sqlError($sql,"i",$id)));
        }
        $result=array();
        while($row = $res -> fetch_assoc()){
            array_push($result,$row);
        }
        echo json_encode(response(200,$result));
    }
?>