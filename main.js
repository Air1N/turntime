var socket = io();

var time = 0;
var turn = true;

function update() {
    time++;
    
    if (time > 5) {
        time = 0;
        turn != turn;
    }
    
    timeleft.innerHTML = "TIME LEFT: " + Math.floor((5 - time) / 60) + ":" + (5 - time) % 60;
    if (turn) {
        whosturn.innerHTML = "Sandra";
    } else {
        whosturn.innerHTML = "Jayna";
    }
    socket.emit('timeup', { time: time, turn: turn });
}

socket.on('loadFile', function(data) {
    time = data[0];
    turn = data[1];
});

setInterval(update, 1000);