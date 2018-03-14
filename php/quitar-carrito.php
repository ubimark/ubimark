<?PHP
    header("Content-Type:application/json");
    include("conectar.php");
    include("funciones.php");
    $params = $_POST;
    $types = "i";
    $table = "carrito";
    $result = dbDelete($table,$types,$params); 
    echo json_encode( $result);
?>