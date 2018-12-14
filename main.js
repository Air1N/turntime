var socket = io();

var time = 0;
let people = ["Sandra", "Jayna"]//, "Aliah"];
var turn = 0;
var alarm = new Audio("./alarm.wav");
var turns = [0, 0, 0];
let minutes = 45;

function update() {
    if (time > minutes * 60) {
        alarm.play();
    }
    
    timeleft.innerHTML = Math.floor((1800 - time) / 60) + ":" + (1800 - time) % 60;
    whosturn.innerHTML = people[turn] + " (" + turn + ")";
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
