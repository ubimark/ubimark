<?PHP
    header("Content-Type:application/json");
    include_once("funciones.php");
    $params = $_POST;
    $params['Id_vendedor'] = $_COOKIE['Id'];
    $date = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
    $actual = time();
    $actual = $date->format("Y-m-d H:i:s");
    $params['fecha'] = $actual;
    $result = dbInsert("respuestas","isis",$params);
    echo json_encode($result);
?>