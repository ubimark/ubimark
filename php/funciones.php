<?php
    include_once("conectar.php");
    /**
     * Funcion para eliminar de cualquier tabla de la bs
     *
     * @param string $table Nombre de la tabla en BD
     * @param string $types Tipos de los datos
     * @param array $params Diccionario de datos para eliminar
     * @return array Respuesta en formato json 
     */
    function dbDelete($table,$types,$params){
        $link = getDBConnection();
        $sql = "DELETE FROM ".$table." WHERE ";
        $values = array();
        foreach($params as $key => $val){
            $sql .= $key." = ? ";
            array_push($values,$val);
        }
        if(strlen($types) != count($values)){
            return response(301);
        }
        $a_params = array();
        $a_params[] = & $types;
        for($i = 0; $i < count($values); $i++) {
            $a_params[] = & $values[$i];
        }
        if($query = $link->prepare($sql)){
            call_user_func_array(array($query,'bind_param'),$a_params);
            $query->execute();
            $query->close();
        }else{
            return response(300,sqlError($sql,$types,$values));
        }
        return response(200);
    }

    /**
     * Función para insertar datos en cualquier tabla de la bd
     *
     * @param string $table Nombre de la tabla en BD
     * @param string $types Tipos de los datos a insertar
     * @param array $params Diccionario de datos a insertar
     * @return array Respuesta en formato json 
     */
    function dbInsert($table, $types, $params){
        $link = getDBConnection();
        $sql = "INSERT INTO " . $table . " ";
        $columnas = "";
        $valores = "";
        $values = array();
        foreach($params as $key => $val){
            $columnas .= $key.", ";
            $valores .= "?, ";
            array_push($values,$val);
        }
        $columnas = substr($columnas, 0, (strlen($columnas) - 2));
        $valores = substr($valores, 0, (strlen($valores) - 2));
        $sql .= "(" . $columnas . ") VALUES (" . $valores .  ")";

        //Comprueba que los datos tengan su tipo correspondiente
        if(strlen($types) != count($values)){
            return response(301);
        }
        
        $a_params = array();
        $a_params[] = & $types;
        for($i = 0; $i < count($values); $i++) {
            $a_params[] = & $values[$i];
        }
        if($query = $link->prepare($sql)){
            call_user_func_array(array($query,'bind_param'),$a_params);
            $query->execute();
            $query->close();
        }else{
            return response(300,sqlError($sql,$types,$values));
        }
        return response(200,sqlError($sql,"",$a_params));
    }

    /**
     * Función para actualizar cualquier tabla de la bd
     *
     * @param string $table Tabla de la bd
     * @param string $types Tipos de los datos a actualizar
     * @param array $params Diccionario de datos a actualizar 
     * @param string $target_types Tipos de los datos con los que se buscará el registro
     * @param array $target Diccionario de los datos con los que se buscará el registro
     * @return array Respuesta en formato json 
     */
    function dbUpdate($table,$types,$params,$target_types,$target){
        $link = getDBConnection();
        //Se genera la consulta sql y se da formato a los datos a actualizar
        $sql = "UPDATE " . $table . " SET ";
        $values = array();
        foreach($params as $key => $val){
            array_push($values,$val);
            $sql .= $key . " = ?, ";
        }
        $sql = substr($sql,0,(strlen($sql)-2));
        $sql .= " WHERE ";
        foreach($target as $key => $val){
            array_push($values,$val);
            $sql .= $key . " = ?, ";
        }
        $sql = substr($sql,0,(strlen($sql)-2));
        $types .= $target_types;
        //Comprueba que los datos tengan su tipo correspondiente
        if(strlen($types) != count($values)){
            return response(301);
        }
        
        $a_params = array();
        $a_params[] = & $types;
        for($i = 0; $i < count($values); $i++) {
            $a_params[] = & $values[$i];
        }
        if($query = $link->prepare($sql)){
            call_user_func_array(array($query,'bind_param'),$a_params);
            $query->execute();
            $query->close();
        }else{
            return response(300,sqlError($sql,$types,$values));
        }
        return response(200);
    }

    /**
     * Función para comprobar si un valor no es nulo.
     * 
     * @param mixed $value Valor a comprobar
     * @return boolean 
     */
    function notNull($value){
        if(is_string($value)){
            return $value != null && trim($value) != '';
        }
        return $value != null;
    }

    /**
     * Función para dar respuestas en json.
     * 
     * Función que genera la estructura de json para dar respuesta a las peticiones
     * recibidas siguiendo un estandar establecido
     * 
     * @param integer $code
     * @param mixed $data
     * @return array respuesta_json
     */
    function response($code, $data=null){
        $def_messages=array(
            "100" => "Sesion cerrada",
            "101" => "Sesion activa",
            "102" => "El correo ya se encuentra registrado",
            "103" => "Usuario no encontrado",
            "104" => "Empresa no registrada",
            "200" => "Hecho.",
            "201" => "Hecho. Faltan datos en la bd.",
            "300" => "Error al mandar la consulta a la bd.",
            "301" => "Los tipos y la cantidad de datos en la peticion no concuerdan.",
            "302" => "Campo nulo en la peticion.",
            "303" => "El producto ya se encuentra en el carrito",
            "304" => "No hay existencias suficientes para procesar la compra"
        );
        $arr = array(
            "status_code" => $code,
            "message" => $def_messages[$code],
            "data" => $data,
            "version" => "2.0.1"
        );
        return $arr;
    }
    
    function sqlError($sql,$types,$params){
        $error = array(
            "sql" => $sql,
            "types" => $types,
            "params" => $params,
        );
        return $error;
    }

?>