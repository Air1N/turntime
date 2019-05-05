var socket = io();

var time = 0;
let people = ["Sandra", "Jayna"]//, "Aliah"];
var turn = 0;

var alarm = new Audio("./alarm.wav");
var turns = [0, 0, 0];
let minutes = 0.1;

function update() {
    if (time > minutes * 60) {
        alarm.play();
        
        var popup = window.open('epass.js', 'ENTER PASSWORD!', 'resizable,width=480=height=575');
        popup.focus();
        
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
