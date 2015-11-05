var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var cc = require('config-multipaas');

var app = express();
var server = http.createServer(app);

var content = fs.readFileSync('form.html');

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );

app.get('/', function(request,response){
    response.writeHeader(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
});

app.post('/',function(request,response){
    var res = require('./basic-response.js');
    var str = res.res(request.body.test);
    response.writeHeader(200,{'Content-Type':'text/html'});
    response.write(content);
    response.write(str);
    response.end();
    
});

server.listen(config.get('PORT'), config.get('IP'), function () {
  console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT') )
});
