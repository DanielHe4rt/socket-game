var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
let moment = require('moment');



let Game = require("./js/game");
let Player = require("./js/player");
let game = new Game();
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/main.js", function(req, res) {
  res.sendFile(__dirname + "/main.js");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

io.on("connect", function(socket) {
  const gamePlayer = new Player(game, socket);
  game.players.push(gamePlayer);

  console.log(gamePlayer.player.id, " user connected");
  socket.on("movement", data => {
    game.players.map(player => {
      if (player == gamePlayer) {
        let collides = game.checkIfPlayerCollides(gamePlayer,data);
        if(collides) {
          return false;
        }
        gamePlayer.move(data)
      }
    });
  });
  socket.on('chatting', data => {
    data.timestamp = moment().add(4,'s').unix();
    gamePlayer.lastMessage = data
  });

  socket.on("disconnect", function() {
    game.players = game.players.filter(player => {
      return player !== gamePlayer;
    });
    console.log("players: ", game.players.length);
    console.log("user disconnected");
  });

  setInterval(() => {
    let positions = game.getGameData();
    io.emit("positions", positions);
  }, 100);
});
