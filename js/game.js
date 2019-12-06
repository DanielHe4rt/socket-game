let moment = require('moment');

class Game {
    constructor() {
        this.players = [];
        this.worldWidth = 1200;
        this.worldHeight = 800;
    }

    getGameData() {
        let players = [];
        for (let i in this.players) {
            let gamePlayer = this.players[i];
            let gameData = gamePlayer.getPosition();
            if(gamePlayer.lastMessage){
                if(gamePlayer.lastMessage.timestamp > moment().unix()){
                    gameData.message = {
                        id: gamePlayer.player.id,
                        message: gamePlayer.lastMessage.message,
                    };
                }

            }
            players.push(gameData);
        }

        return players;
    }

    checkIfPlayerCollides(mainPlayer, movement) {
        let collide = false;
        let players = this.players.filter(player => {
            return player !== mainPlayer
        });
        players.map(player => {
            if (mainPlayer.player.x + movement.x == player.player.x &&
                mainPlayer.player.y + movement.y == player.player.y
            ) {
                collide = true;
            }
        });
        return collide;
    }
}

module.exports = Game;
