<?PHP 
    header("Content-Type:application/json");
    include_once("conectar.php");
    include_once("funciones.php");
    $date = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));
    $Id_producto = $_POST['Id_producto'];
    $sql = "SELECT p.Id_pregunta,p.pregunta,p.fecha, CONCAT(SUBSTRING_INDEX(u.nombre,' ',1),' ',SUBSTRING(u.apellidos,1,1),'.') as cliente FROM preguntas as p JOIN usuario as u ON u.Id_usuario = p.Id_cliente WHERE p.Id_producto = ? ORDER BY p.Id_pregunta DESC" ;
    if($query = $enlace -> prepare($sql)){
        $query -> bind_param("i",$Id_producto);
        $query -> execute();
        $res = $query -> get_result();
        $query -> close();
    }
    $preguntas = array();
    while($row = $res -> fetch_Assoc()){
        $fecha = new DateTime($row['fecha']);
        $actual = time();
        $actual = $date->format("Y-m-d H:i:s");
        $actual = new DateTime($actual);
        $diff = $fecha -> diff($actual);
        if(strcmp($diff->format('%m'), "0")!=0){
            $row['fecha'] = $fecha -> format("d-m-Y");
        }else if(strcmp($diff->format('%d'), "1")==0){
            $row['fecha'] = $diff->format('hace %d dia');
        }else if(strcmp($diff->format('%d'), "0")!=0){
            $row['fecha'] = $diff->format('hace %d días');
        }else if(strcmp($diff->format('%h'), "1")==0){
            $row['fecha'] = $diff->format('hace %h hora');
        }else if(strcmp($diff->format('%h'), "0")!=0){
            $row['fecha'] = $diff->format('hace %h horas');
        }else if(strcmp($diff->format('%i'), "1")==0){
            $row['fecha'] = $diff->format('hace %i minuto');
        }else if(strcmp($diff->format('%i'), "0")!=0){
            $row['fecha'] = $diff->format('hace %i minutos');
        }else if(strcmp($diff->format('%s'), "1")==0){
            $row['fecha'] = $diff->format('hace %s segundo');
        }else if(strcmp($diff->format('%s'), "0")!=0){
            $row['fecha'] = $diff->format('hace %s segundos');
        }else if(strcmp($diff->format('%s'), "0")==0){
            $row['fecha'] = $diff->format('justo ahora');
        }
        $token = bin2hex(random_bytes(128));
        $expira = $date->format("Y-m-d H:i:s");
        $row['respuestas'] = array( array("respuesta" => "Fierro"));
        array_push($preguntas,$row);
    }
    echo json_encode(response(200,$preguntas));
?>