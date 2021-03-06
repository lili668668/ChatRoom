var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var bodyparser = require('body-parser');
var cc = require('config-multipaas');

var compbot = require('./js/compbot.js');

var app = express();
var server = http.createServer(app);
var io = socketio(server);
var config = cc();

var people_counter = 0;
var name;

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );

app.get('/', function(request,response){
    response.sendFile(__dirname + "/register.html");
});

app.get('/chat', function(request,response){
    if (request.query.name === '' || request.query.name === undefined) {
        response.sendFile(__dirname + "/register.html");
        return false;
    } else {
        people_counter = people_counter + 1;
        console.log("up");
        name = request.query.name;
        response.sendFile(__dirname + "/index.html");
        return true;
    }
});

io.on('connection', function(socket){
    var allClient = [];
    var allName = [];
    socket.on('message', function(msg){
        socket.broadcast.emit('message', msg.name + " : " + msg.msg);
        var bot = compbot.res(msg.msg);
        if (bot) {
            io.emit('bot', "蒽蒽：" + bot);
        }
    });	

    socket.on('disconnect', function(){
        people_counter = people_counter - 1;
        var i = allClient.indexOf(socket);
        allClient.splice(i ,1);
        console.log("down");
        io.emit('info', allName.splice(i ,1) + "下線，目前線上" + people_counter + "人");
    });

    socket.emit('name', name);
    allClient.push(socket);
    allName.push(name);
    io.emit('info', name + "上線，目前線上" + people_counter + "人");

});

server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT')  )
});

server.listen("8080", "127.0.0.1", function () {
    console.log( "Listening on " + "8080" + ", port " + "127.0.0.1"  );
});
