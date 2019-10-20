(function () {
    var Game = window.Game = function (cn) {
        this.myCanvas = document.getElementById(cn.canvasid);
        this.ctx = this.myCanvas.getContext("2d");
        this.RJsonUrl = cn.RJsonUrl;
        this.init();
        this.FNO = 0;
        this.FSM = 0;
        var self = this;
        this.score = 0;


        this.loadAllSourse(function () {
            self.start();
            self.bindEvent();
        });
    };
    Game.prototype.init = function () {
        var wdW = document.documentElement.clientWidth;
        var wdH = document.documentElement.clientHeight;
        if (wdW > 414) {
            wdW = 414;
        } else if (wdW < 320) {
            wdW = 320;
        }
        if (wdH > 812) {
            wdH = 812;
        } else if (wdH < 500) {
            wdH = 500;
        }
        this.myCanvas.width = wdW;
        this.myCanvas.height = wdH;
    };
    Game.prototype.loadAllSourse = function (callback) {
        this.Rs = {};
        var self = this;
        var alReadyLoad = 0;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // console.log(xhr.responseText);

                var robj = JSON.parse(xhr.responseText);
                console.log(robj);
                for (var i = 0; i < robj.images.length; i++) {
                    self.Rs[robj.images[i].name] = new Image();
                    // console.log(self.Rs[robj.images[i].name] );

                    self.Rs[robj.images[i].name].src = robj.images[i].url;
                    // console.log( self.Rs[robj.images[i].name].src);

                    self.Rs[robj.images[i].name].onload = function () {
                        alReadyLoad++;
                        // console.log(alReadyLoad);

                        self.ctx.clearRect(0, 0, self.myCanvas.width, self.myCanvas.height);
                        var txt =
                            "正在加载" + alReadyLoad + "/" + robj.images.length + "请稍等";
                        self.ctx.textAlign = "center";
                        self.ctx.font = "20px 微软雅黑";
                        self.ctx.fillText(txt,
                            self.myCanvas.width / 2,
                            self.myCanvas.height / 2);
                        if (alReadyLoad == robj.images.length) {
                            callback();
                        }
                    };
                }
                console.log(self.Rs);
            }
        };
        xhr.open("GET", self.RJsonUrl, true);
        xhr.send();
    };
    Game.prototype.start = function () {
        var self = this;
        this.bg = new background();
        this.land = new Land();
        this.bird = new Bird();
        this.pipeArr = [];

        this.timer = setInterval(function () {


            self.ctx.clearRect(0, 0, self.myCanvas.width, self.myCanvas.height);

            self.bg.update();
            self.bg.render();

            self.land.update();
            self.land.render();



            for (var i = 0; i < self.pipeArr.length; i++) {
                self.pipeArr[i].update();
                self.pipeArr[i].render();
            };
            self.FNO++;
            if (self.FNO % 120 === 0) {
                new Pipe();
            };
            self.bird.update();
            self.bird.render();



            self.ctx.textAlign = "left";
            self.ctx.font = "16px 微软雅黑";
            self.ctx.fillStyle = "#000";
            self.ctx.fillText("当前是第" + self.FNO + "帧.我是YYP", 10, 20);
            self.ctx.fillStyle = "red";
            self.ctx.font = "18px 微软雅黑";
            self.ctx.fillText("你的分数是:" + self.score, 10, 40);

        }, 20)
    }
    Game.prototype.bindEvent = function () {
        var self = this;
        self.myCanvas.onmousedown = function () {
            self.bird.flyHigh();
        }
    }

})();