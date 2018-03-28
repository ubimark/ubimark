<?PHP
    header("Content-Type:application/json");
    include("funciones.php");
    $path = basename($_POST['path']);
    $sess = $_POST['session'];
    $band = $sess == 1;
    $sess_required['required'] = file("required.ubi",FILE_IGNORE_NEW_LINES |FILE_SKIP_EMPTY_LINES);
    $sess_required['no_required'] = file("norequired.ubi",FILE_IGNORE_NEW_LINES |FILE_SKIP_EMPTY_LINES);
    $i = strpos($path,'?');
    if(!notNull($path)){
        $path="/";

    }
    if(in_array($path, $sess_required['required'])){
        if($band){
            echo json_encode(response(107));
        }else{
            echo json_encode(response(106,$path));
        }
    }else if(in_array($path, $sess_required['no_required'])){
        echo json_encode(response(107));
    }else{
        echo json_encode(response(108,$path));
    }
?>