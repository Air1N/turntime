let password = "";
let passwords = ["113", "412"];

while (window.password != passwords[turn]) {
  alarm.play();

  window.password = prompt("Enter your password " + people[!turn ? 1 : 0]);
  alert("Nope! Try again");
}
