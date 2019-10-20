(function () {
    var Bird = window.Bird = function () {
        this.bird0_0 = game.Rs.bird0_0;
        this.bird0_1 = game.Rs.bird0_1;
        this.bird0_2 = game.Rs.bird0_2;
        this.imageArr = [game.Rs.bird0_0, game.Rs.bird0_1, game.Rs.bird0_2];
        this.wing = 0;
        this.states = 'A';
        this.y = 100;
        this.x = 100;
        this.speed = 1;
        this.upspeed = 2;
        this.f = 0;
        this.angle = 0;
    }
    Bird.prototype.flyHigh = function () {
        this.states = 'B';
        this.f = 0;
    }
    Bird.prototype.update = function () {
        if (game.FNO % 10 === 0) {
            this.wing = ++this.wing % 3;
        }
        if (game.FSM === 1) {
            this.y += this.speed * 5;
            if (this.y > game.myCanvas.height * 0.76 - 37) {
                this.y = game.myCanvas.height * 0.76 - 37;
            }
            this.f++;
            this.angle = this.f;
            return;
        }
        if (this.states == 'A') {
            this.y += this.speed;
            this.f++;
            this.angle = this.f / 300;
        } else if (this.states == 'B') {
            this.y -= this.upspeed;
            this.f++;
            this.angle = -(45 - this.f) / 300;

            if (this.f > 10) {
                this.f = 0;
                this.states = 'A';


            }

        }


    }
    Bird.prototype.render = function () {
        game.ctx.save();
        game.ctx.translate(this.x + 18, this.y + 18);
        game.ctx.rotate(this.angle);
        game.ctx.drawImage(this.imageArr[this.wing], -24, -24);
        game.ctx.restore();

    }
})();