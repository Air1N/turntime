var socket = io();

let time = 0;

function update() {
    time++;
    socket.emit('timeup', time);
}

setInterval(update, 1000);