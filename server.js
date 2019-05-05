var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = process.env.PORT || 80;

var time = 0;
var people = 2;
var turn = 0;
var minutes = 0.1;

function loadFiles() {
    fs.readFile(__dirname + '/time.txt', 'utf8', function(err, data) {
        if (err) console.error(err);
        
        data = data.split('||');
        
        if (data[1] == "null\n") data[1] = Math.floor(Math.random() * people);
        turn = data[1]
        
        io.emit('loadFile', data);
    });
}

function writeFile() {
    fs.writeFile(__dirname + '/time.txt', time + "||" + turn, function(err) {
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
    
    if (time > minutes * 60) {
      if (password == passwords[turn]) {
        time = 0;
        turn++;
        if (turn == people) turn = 0;
      }
    }
    
    io.emit('timeup', {time: time, turn: turn});
}

setInterval(timeup, 1000);

http.listen(port, function() {
    console.log('listening on *:' + (port).toString());
});

app.use('/', express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
