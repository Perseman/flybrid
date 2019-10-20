(function () {
    var Land = window.Land = function () {
        this.image = game.Rs.land;
        this.y = game.myCanvas.height * 0.76;
        this.w = 336;
        this.h = 112;
        this.x = 10;
        this.speed = 3;

    };

    Land.prototype.render = function () {
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        game.ctx.fillStyle = "#ded895";
        game.ctx.fillRect(0, this.y + this.h, game.myCanvas.width, game.myCanvas.height - this.y - this.h);
    };
    Land.prototype.update = function () {
        this.x -= this.speed;

        if (this.x < -this.w) {
            this.x = 0;
        }
        if (game.FSM == 1) {
            this.speed = 0;
        };
    };
})();