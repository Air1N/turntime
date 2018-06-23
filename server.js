var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 80;

var time = 0;
var people = ["Sandra", "Jayna", "Aliah"];
var turn = 0;

function loadFiles() {
    fs.readFile(__dirname + '/time.txt', 'utf8', function(err, data) {
        if (err) console.error(err);
        
        data = data.split('||');
        turn = data[1];
        
        io.emit('loadFile', data);
    });
    
    if (turn == "null\n") turn = Math.floor(Math.random() * people.length);
}

function writeFile() {
    fs.writeFile(__dirname + '/time.txt', time + "||" + turn + "||" + first, function(err) {
        if (err) console.error(err);
        
        console.log("The file was saved!");
    });
}

io.on('connection', function(socket) {
    loadFiles();

    socket.once('disconnect', function() {
        writeFile();
    });
});

function timeup() {
    time++;

    io.emit('timeup', {time: time, turn: turn});
    
    if (time > 1800) {
      time = 0;
      turn++;
      if (turn == 3) turn = 0;
    }
}

setInterval(timeup, 1000);

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});

app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
