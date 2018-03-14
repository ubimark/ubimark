<?PHP 
    header("Content-Type:application/json");
    include("conectar.php");
    include("funciones.php");
    $id = $_COOKIE['Id'];
    $sql = "SELECT c.*,p.nombre_producto,p.precio,p.existencias,i.path,i.Id_usuario AS vendedor FROM carrito c JOIN productos p ON p.Id_producto = c.Id_producto JOIN imagen_prod i ON i.Id_producto=p.Id_producto WHERE c.Id_usuario = ? GROUP BY p.Id_producto";
    if($query = $enlace->prepare($sql)){
        $query->bind_param("i",$id);
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
?>