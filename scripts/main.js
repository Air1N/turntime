var socket = io();

let time = 0;
let turn = true;

function update() {
    time++;
    
    if (time > 30 * 60) {
        time = 0;
        turn != turn;
    }
    
    socket.emit('timeup', time);
}

socket.on('loadFile', function(data) {
    time = data[0];
    turn = data[1];
});

setInterval(update, 1000);