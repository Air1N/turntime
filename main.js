var socket = io();

var time = 0;
let people = ["Sandra", "Jayna"]//, "Aliah"];
var turn = 0;
let passwords = ["113", "412"];
var alarm = new Audio("./alarm.wav");
var turns = [0, 0, 0];
let minutes = 0.1;

function update() {
    if (time > minutes * 60) {
        alarm.play();
        
        while (password != passwords[turn]) {
            password = confirm("Enter your password");
        }
        
        socket.emit("passwordAccepted");
        
        time = 0;
    }
    
    timeleft.innerHTML = Math.floor((minutes * 60 - time) / 60) + ":" + (minutes * 60 - time) % 60;
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

window.onbeforeunload = function(e) {
    return "Would you really like to close your browser?";
}
