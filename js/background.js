(function () {
    var background = window.background = function () {
        this.image = game.Rs.bg_day;
        this.y = game.myCanvas.height * 0.76 - 396;
        this.w = 288;
        this.h = 512;
        this.x = 0;
        this.speed = 1;
    };

    background.prototype.render = function () {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        game.ctx.fillStyle = "#4ec0ca";
        game.ctx.fillRect(0, 0, game.myCanvas.width, this.y);
        game.ctx.fillStyle = "#5ee270";
        game.ctx.fillRect(0, this.y + this.h, game.myCanvas.width, game.myCanvas.height - this.y - this.h);
    };
    background.prototype.update = function () {
        this.x -= this.speed;

        if (this.x < -this.w) {
            this.x = 0;
        }
        if (game.FSM == 1) {
            this.speed = 0;
        };
    };
})();