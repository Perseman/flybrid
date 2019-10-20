(function () {
    var Pipe = window.Pipe = function () {
        this.pipe_down = game.Rs.pipe_down;
        this.pipe_up = game.Rs.pipe_up;
        this.w = 52;
        this.h = 320;
        this.allHeight = game.myCanvas.height * 0.76;
        this.interSpace = 120;
        this.Height1 = 100 + parseInt(Math.random() * (this.h - 100));
        this.Height2 = this.allHeight - this.Height1 - this.interSpace;
        this.x = game.myCanvas.width;
        this.speed = 3;
        game.pipeArr.push(this);
    };

    Pipe.prototype.render = function () {
        //防止出现柱子空洞
        if (this.Height1 < 178) {
            this.Height1 = 178;
        }
        game.ctx.drawImage(this.pipe_down, 0, this.h - this.Height1, this.w, this.Height1, this.x, 0, this.w, this.Height1);
        game.ctx.drawImage(this.pipe_up, 0, 0, this.w, this.Height2, this.x, this.Height1 + this.interSpace, this.w, this.Height2);


    };
    Pipe.prototype.update = function () {
        this.x -= this.speed;
        var upPipeX = this.x;
        var upPipeY = this.Height1;
        var birdX = game.bird.x + 40;
        var birdY = game.bird.y + 13;
        var dowPipeY = this.Height1 + this.interSpace;
        var birdY2 = game.bird.y + 37;
        if (upPipeX < birdX && upPipeY > birdY && upPipeX + 52 > birdX) {
            // clearInterval(game.timer);
            game.FSM = 1;
        };
        if (upPipeX < birdX && dowPipeY < birdY2 && upPipeX + 52 > birdX) {
            // clearInterval(game.timer);
            game.FSM = 1;
        };
        if (game.FSM == 1) {
            this.speed = 0;
        };
        if (!this.flag && (this.x + 52 < game.bird.x)) {
            this.flag = true;
            game.score++;
        }
    };
})();