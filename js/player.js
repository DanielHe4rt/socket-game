class Player {
    constructor(game, socket) {
        this.game = game;
        this.player = socket;
        this.player.x = 100;
        this.player.y = 100;
    }

    getPosition() {
        return {x: this.player.x, y: this.player.y};
    }

    move(data) {
        if (this.validateMovement(data)) {
            this.setPosition(data);
        }
    }

    setPosition(data) {
        this.player.x += data.x;
        this.player.y += data.y;
    }

    validateMovement(data) {
        if (this.player.x + data.x >= this.game.worldWidth || (this.player.x + data.x < 0)) {
            return false;
        }
        if ((this.player.y + data.y >= this.game.worldHeight) || (this.player.y + data.y < 0)) {
            return false;
        }
        return true;
    }


}

module.exports = Player;
