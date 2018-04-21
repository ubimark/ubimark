<?PHP
include_once("../php/funciones.php");
include("vendor/autoload.php");

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;


header("Content-type:application/json");

$key = $_POST['key'];
unset($_POST['key']);
$req = $_POST;

if(strcmp($key,"notificacion")==0){
    $title = "notificacion";
    $data = ["destino"=>$req['destino'],"notificacion"=>$req['Id_notificacion']];
    try{
    send($title,$data);
    }catch(Exception $e){echo json_encode($e);return;}
}else{
    echo json_encode(response(400));
    return;
}

echo json_encode(response(200));
return; 

function send($title,$data){
    $client_http = new Client(new Version2X('http://localhost:3001', [
        'headers' => [
            'X-My-Header: websocket rocks',
            'Authorization: Bearer 12b3c4d5e6f7g8h9i'
        ]
    ]));
    
    $client_https = new Client(new Version2X('https://localhost:3002', [
        'headers' => [
            'X-My-Header: websocket rocks',
            'Authorization: Bearer 12b3c4d5e6f7g8h9j'
        ],
        'context' => [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ]
    ]));

    $client_http -> initialize();
    $client_http -> emit($title,$data);
    $client_http -> close();

    $client_https -> initialize();
    $client_https -> emit($title,$data);
    $client_https -> close();
}




