(function (w, $) {

    var ScrollView = function (opt) {
        var self = this;
        $.extend(this, opt);

        var start;
        this.$wrap.addClass("am-touchable").bind({
            "vtouchstart": function (e, p) {
                if (!window.tuochStartHandled) {
                    //console.log("vtouchstart");
                    start = [p.x, p.y];
                    self._start();
                    return false;
                }
                else {
                    window.tuochStartHandled = null;
                }
            },
            "vtouchmove": function (e, p) {
                if (start) {
                    //console.log("vtouchmove");
                    self._move([p.x - start[0], p.y - start[1]]);
                    return false;
                }
            },
            "vtouchend": function (e, p) {
                if (start) {
                    //console.log("vtouchend");
                    self._end();
                    start = null;
                    return false;
                }
            }
        });

        this.direction = this.direction || [false, true];

        //开始的位置
        this._startPos = [0, 0];
        //当前的位置
        this._currentPos = [0, 0];
        //动画开始时的位置
        this._endPos = [0, 0];
        //当前滚动的速度
        this._speed = [0, 0];
        //上次计算的时间
        this._lastTimeStamp = null;
        //定时器
        this._timer = null;

        this.setMax();

        this.vt = [new MomentumTracker(), new MomentumTracker()];

    };
    //方法
    $.extend(ScrollView.prototype, {
        _start: function () {
            // console.log("start")
            //停止动画
            this._stopAnimation();
            //初始化下一次动作需要的属性
            $.extend(this._startPos, this._currentPos);
            this._speed = [0, 0];
        },
        _move: function (displacement) {
            // console.log("move", displacement)

            var nowTimeStamp = new Date();
            var dt = nowTimeStamp - this._lastTimeStamp;
            dt = dt < 10 ? 10 : dt;
            var newPos = [0, 0];
            var ds = [];
            var min = $.extend([], this._min);
            var max = $.extend([], this._max);

            for (var i = 0; i < this.direction.length; i++) {
                if (this.direction[i]) {

                    //当前时间
                    //新位置
                    newPos[i] = this._startPos[i] + displacement[i];
                    ds[i] = newPos[i] - this._currentPos[i];
                    //如果超过范围
                    if (newPos[i] > max[i]) {
                        newPos[i] = (newPos[i] + max[i]) / 2;
                    } else if (newPos[i] < min[i]) {
                        newPos[i] = (newPos[i] + min[i]) / 2;
                    }

                    //计算速度v = ds/dt
                    this._speed[i] = ds[i] / dt;
                    //保存新值
                    this._currentPos[i] = newPos[i];
                }
            }
            // console.log("move - " + ds + " - " + dt)
            this._lastTimeStamp = nowTimeStamp;

            //产生位置更新事件
            this._onupdate(newPos);
        },
        _end: function () {
            $.extend(this._endPos, this._currentPos);
            //设定动画开始i位置
            // console.log("end", this._speed)
            this._startAnimation();
        },
        _startAnimation: function () {
            var self = this;
            var min = $.extend([], this._min);
            var max = $.extend([], this._max);
            var startDisplacement = this._endPos;
            var startSpeed = $.extend([], this._speed);
            var vt = [];
            var direction = this.direction;

            for (var i = 0; i < direction.length; i++) {
                if (direction[i]) {
                    startSpeed[i] = (startSpeed[i] <= 0.4 && startSpeed[i] >= -0.4) ? 0 : startSpeed[i];

                    // console.log(startSpeed);
                    vt[i] = this.vt[i];
                    vt[i].start(startDisplacement[i], startSpeed[i], 2000, min[i], max[i]);
                }
            }

            this._timer = setInterval(function () {
                var done = [true, true];
                var p = [0, 0];
                for (var i = 0; i < direction.length; i++) {
                    if (direction[i]) {
                        p[i] = vt[i].update();
                        // console.log(p);
                        done[i] = vt[i].done();
                    }
                }

                self._onupdate(p);
                self._currentPos = p;

                // console.log(done);
                if (done[0] && done[1]) {
                    self._stopAnimation();
                }

            }, 10);

        },
        _stopAnimation: function () {
            this._timer && clearInterval(this._timer);
            this._timer = null;
            this.onScrollStop && this.onScrollStop();
        },
        _onupdate: function (pos) {
            //判断是否触碰上下边界
            //TODO 左右尚未实现
            if (pos[1] > this._max[1]) {

                if (!this.overtop) {
                    this.overtop = true;
                    this.touchTop();
                }

            } else if (pos[1] < this._min[1]) {

                if (!this.overbottom) {
                    this.overbottom = true;
                    this.touchBottom();
                }

            } else {

                this.overbottom && (this.overbottom = false);
                this.overtop && (this.overtop = false);

            }

            // $(".inner").css("top", pos);
            // this.$inner[0].style.webkitTransform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0," + pos[0] + "," + pos[1] + ",0, 1)";
            this.$inner.setTransformPos(pos, "xy", this.hasInput);
            // inner.style.webkitTransform = "translate3d(0," + pos + "px,0)";
            // $(".inner").css("-webkit-transform", "translate(0," + pos + "px)");
        },
        touchTop: function () {
            // console.log("touch top");
        },
        touchBottom: function () {
            // console.log("touch bottom");
        },
        scrollTo: function (pos) {
            var min = $.extend([], this._min);
            var max = $.extend([], this._max);

            switch (pos) {
                case "top":
                    pos = max;
                    break;
                case "bottom":
                    pos = min;
                    break;
                default:
            }
            // console.log("scrollTo",min,max,pos)
            this._stopAnimation();
            this._currentPos = pos;
            this._onupdate(pos);
        },
        refresh: function (cb) {
            if (this.isRefreshing) {
                // console.log("refresh() disable");
                return false;
            }
            // console.log("refresh() start");
            this.isRefreshing = true;
            var self = this;
            var last = [0, 0, 0, 0];
            var lastTime = 0;

            var timer = null;

            var step = function () {
                var now = new Date().getTime();
                var w = self.$inner.outerWidth(true);
                var h = self.$inner.outerHeight(true);
                var ow = self.$wrap.width();
                var oh = self.$wrap.height();

                if (w != last[0]) {
                    last[0] = w;
                    lastTime = now;
                }
                if (h != last[1]) {
                    last[1] = h;
                    lastTime = now;
                }
                if (ow != last[2]) {
                    last[2] = ow;
                    lastTime = now;
                }
                if (ow != last[3]) {
                    last[3] = ow;
                    lastTime = now;
                }
                // console.log(w, h, lastTime, now - lastTime);
                //检查时间
                if (now - lastTime > 150) {
                    self.isRefreshing = false;
                    // console.log("refresh() done");
                    self.setMax();
                    clearTimeout(timer);
                    timer = null;
                    cb && cb();
                } else {
                    setTimeout(step, 50);
                }
            };

            step();

        },
        setMax: function () {
            var dx = this.$wrap.width() - this.$inner.outerWidth(true);
            var dy = this.$wrap.height() - this.$inner.outerHeight(true);
            this._min = [dx > 0 ? 0 : dx, dy > 0 ? 0 : dy];
            this._max = [0, 0];
        }
    });

    $.am.ScrollView = ScrollView;

    //定义运动精灵
    var defaultConfig = {
        fps: 60, // Frames per second in msecs.
        direction: null, // "vertical", "horizontal", or null for both.

        scrollDuration: 2000, // Duration of the scrolling animation in msecs.
        overshootDuration: 150, // Duration of the overshoot animation in msecs.
        snapbackDuration: 300, // Duration of the snapback animation in msecs.

        moveThreshold: 100, // Time between mousemoves must not exceed this threshold.

        startEventName: "MomentumScroller.start",
        updateEventName: "MomentumScroller.update",
        stopEventName: "MomentumScroller.stop",

        eventType: ("ontouchend" in document) ? "touch" : "mouse", // Type of events to track. Switch to $.support.touch.

        showScrollBars: true
    };

    var tstates = {
        scrolling: 0,
        overshot: 1,
        snapback: 2,
        done: 3
    };

    var getCurrentTime = function () {
        return (new Date()).getTime();
    };
    var MomentumTracker = function () {
        this.easing = "easeOutQuad";
        this.reset();
    };

    $.extend(MomentumTracker.prototype, {
        start: function (pos, speed, duration, minPos, maxPos) {
            this.state = (pos < minPos || pos > maxPos) ? tstates.snapback : ((speed != 0) ? tstates.scrolling : tstates.done);

            this.pos = pos;
            this.speed = speed;
            this.duration = (this.state == tstates.snapback) ? defaultConfig.snapbackDuration : duration;
            this.minPos = minPos;
            this.maxPos = maxPos;

            this.fromPos = (this.state == tstates.snapback) ? this.pos : 0;
            this.toPos = (this.state == tstates.snapback) ? ((this.pos < this.minPos) ? this.minPos : this.maxPos) : 0;

            this.startTime = this.lastTime = getCurrentTime();
        },

        reset: function () {
            this.state = tstates.done;
            this.pos = 0;
            this.speed = 0;
            this.minPos = 0;
            this.maxPos = 0;
            this.duration = 0;
        },

        update: function () {
            var state = this.state;
            if (state == tstates.done)
                return this.pos;

            var duration = this.duration;
            var currentTime = getCurrentTime();
            var elapsed = currentTime - this.startTime;
            var dt = currentTime - this.lastTime;
            elapsed = elapsed > duration ? duration : elapsed;

            if (state == tstates.scrolling || state == tstates.overshot) {
                var dx = this.speed * (1 - $.easing[this.easing](elapsed / duration, elapsed, 0, 1, duration));

                var x = this.pos + dx * dt;

                var didOverShoot = (state == tstates.scrolling) && (x < this.minPos || x > this.maxPos);
                if (didOverShoot)
                    x = (x < this.minPos) ? this.minPos : this.maxPos;

                this.pos = x;

                if (state == tstates.overshot) {
                    if (elapsed >= duration) {
                        this.state = tstates.snapback;
                        this.fromPos = this.pos;
                        this.toPos = (x < this.minPos) ? this.minPos : this.maxPos;
                        this.duration = defaultConfig.snapbackDuration;
                        this.startTime = getCurrentTime();
                        elapsed = 0;
                    }
                } else if (state == tstates.scrolling) {
                    if (didOverShoot) {
                        this.state = tstates.overshot;
                        this.speed = dx / 2;
                        this.duration = defaultConfig.overshootDuration;
                        this.startTime = getCurrentTime();
                    } else if (elapsed >= duration)
                        this.state = tstates.done;
                }
            } else if (state == tstates.snapback) {
                if (elapsed >= duration) {
                    this.pos = this.toPos;
                    this.state = tstates.done;
                } else
                    this.pos = this.fromPos + ((this.toPos - this.fromPos) * $.easing[this.easing](elapsed / duration, elapsed, 0, 1, duration));
            }

            this.lastTime = currentTime;
            return this.pos;
        },

        done: function () {
            return this.state == tstates.done;
        },
        getPosition: function () {
            return this.pos;
        }
    });

})(window, jQuery);
