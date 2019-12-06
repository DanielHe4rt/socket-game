var socket = io();
var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");

let moveSpeed = 100;

document.getElementById('chat').addEventListener('submit', event => {
  event.preventDefault();
  let msg = document.getElementById('message').value
  socket.emit('chatting', {message: msg})
});

socket.on("positions", function(gameData) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i in gameData) {
    let data = gameData[i];
    ctx.fillRect(data.x, data.y, 100, 100);
    if(data.message){
      ctx.font = "12px Georgia";
      ctx.fillText(data.message.id + ": " + data.message.message, data.x - 50 , data.y - moveSpeed / 2);
      console.log(data.message.id)
    }
  }
});

document.addEventListener("keypress", event => {
  const keyName = event.key;
  console.log(keyName);
  switch (event.key) {
    case "w":
    case "W":
      socket.emit("movement", { x: 0, y: -moveSpeed });
      break;
    case "s":
    case "S":
      socket.emit("movement", { x: 0, y: moveSpeed });
      break;
    case "a":
    case "A":
      socket.emit("movement", { x: -moveSpeed, y: 0 });
      break;
    case "d":
    case "D":
      socket.emit("movement", { x: moveSpeed, y: 0 });
      break;
  }
});
