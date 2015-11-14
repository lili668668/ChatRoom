var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var cc = require('config-multipaas');
var xss = require('xss');
var $ = require('jquery');

var app = express();
var server = http.createServer(app);
var config = cc();

var content = fs.readFileSync('index.html');

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );
app.use('/css', express.static('css'));

app.get('/', function(request,response){
    response.writeHeader(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
});

app.post('/',function(request,response){
    var compbot = require('./js/compbot.js');
    var str = compbot.res(xss(request.body.talk));
    response.writeHeader(200,{'Content-Type':'text/html'});
    response.write(content);
    str = '<div class="text">' + str + '</div>';
    //    response.write(str);
    response.end();
    $("body").append(str);

});

server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
