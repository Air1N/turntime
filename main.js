var socket = io();

var time = 0;
let people = ["Sandra", "Jayna", "Aliah"];
var turn = 0;
var alarm = new Audio("./alarm.wav");

function update() {
    if (time > 1800) {
        //alarm.play();
    }
    
    timeleft.innerHTML = Math.floor((1800 - time) / 60) + ":" + (1800 - time) % 60;
    whosturn.innerHTML = "Turn: " + turn;
}

socket.on('loadFile', function(data) {
    time = data[0];
    turn = data[1];
});

socket.on('timeup', function(t) {
    time = t.time;
    turn = t.turn;
    update();
});
