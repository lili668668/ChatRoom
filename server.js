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

var res = "";

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
    res += '<div class="frame-right"><div class="me">' + xss(request.body.talk) + '</div></div>';
    res += '<div  class="frame-left"><div class="text">' + str + '</div></div>';
    response.write(res);
    response.write(content);
    response.end();

});
server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT')  )

});
