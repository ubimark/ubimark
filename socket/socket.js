var socket = require('socket.io'),
    express = require('express'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{colorize:true,timestamp:true});

var app = express();
var app2 = express();
var http_server = http.createServer(app).listen(3001,function(){
    logger.info("SocketIO => Escuchando en puerto 3001");
});

var https_server = https.createServer({
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt'),
    rejectUnauthorized: false
},app2).listen(3002,function(){
    logger.info("SocketIO => Escuchando en puerto 3002");
}); 


function emitNewOrder(http_server,x){
    var tipo = x;
    var io = socket.listen(http_server,{pingTimeout: 7000, pingInterval: 10000});
    logger.info(x + " Working!!");
    io.sockets.on('connection',function(socket){
        socket.on('notificacion',function(data){
            logger.info("Mensaje enviado tipo: " +data.tipo);
            io.emit("notificacion",data);
        });
        socket.on("connect",function(data){
            logger.info("Conectado");
            io.emit("login",data);
        });
    });
}
emitNewOrder(http_server,"http");
emitNewOrder(https_server,"Https");