<?php
    header("Content-type:application/json");
    include("conectar.php");
    include("funciones.php");
    //Se obtinen los datos a actualizar
    $birth=$_POST['birthday'];
    $sexo=$_POST['sexo'];
    $id_usuario=$_COOKIE['Id'];
    //Se actualizan los datos
    if($query=$enlace->prepare("UPDATE usuario SET nacimiento = ?, sexo = ? WHERE Id_usuario = ?")){
        $query->bind_param("ssi",$birth,$sexo,$id_usuario);
        $query->execute();
        $query->close();
    }else{
        echo json_encode(response(300));
        return;
    }
    echo json_encode(response(200));
?>