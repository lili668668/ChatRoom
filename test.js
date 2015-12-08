var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var cc = require('config-multipaas');

var compbot = require('./js/compbot.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);
var config = cc();

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get('/', function(request,response){
    response.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    socket.on('message', function(msg){
        socket.broadcast.emit('message', msg);
        io.emit('bot', compbot.res(msg));
    });
});

server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT')  )
});

server.listen("8080", "127.0.0.1", function () {
    console.log( "Listening on " + "8080" + ", port " + "127.0.0.1"  );
});