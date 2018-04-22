var socket = io();

var time = 0;
var turn = true;

function update() {
    time++;
    
    if (time > 30 * 60) {
        time = 0;
        turn != turn;
    }
    
    timeleft.innerHTML = "TIME LEFT: " + Math.floor((1800 - time) / 60) + ":" + (1800 - time) % 60;
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