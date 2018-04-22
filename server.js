var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 80;

var time = 0;
var turn = true;

function loadFiles() {
    fs.readFile(__dirname + '/time.txt', 'utf8', function(err, data) {
        data = data.split('||');

        io.emit('loadFile', data);
    });
}

function writeFile() {
    fs.writeFile(__dirname + '/time.txt', time + "||" + turn, function(err) {
        console.log("The file was saved!");
    });
}

io.on('connection', function(socket) {
    loadFiles();
    
    console.log("loaded");
    
    socket.on('timeup', function(t) {
        time = t.time;
        turn = t.turn;
    });

    socket.once('disconnect', function() {
        writeFile();
    });
});

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});

app.use('/', express.static(__dirname + '/'));
app.get('/', function(request, response) {
  response.render('./index.html');
});