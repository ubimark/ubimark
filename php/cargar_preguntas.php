<?PHP 
    header("Content-Type:application/json");
    include_once("funciones.php");
    echo json_encode(response(200));
?>