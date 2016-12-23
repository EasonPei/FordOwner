function drag() {
	return this.init.apply(this, arguments)
};

drag.prototype = {
	init : function(container, handler, isLimit) {
		this.o = document.getElementById(container);
		this.h = document.getElementById(handler);
		this._x = this._y = 0;
		this.limit = isLimit;
		this._move = this.bind(this, this.move);
		this._end = this.bind(this, this.end);
		this.addEvent(this.h, 'mousedown', this.bind(this, this.start));
	},

	start : function(e) {
		var ev = e || window.event;
		this._x = ev.clientX - this.o.offsetLeft;
		this._y = ev.clientY - this.o.offsetTop;
		this.addEvent(document, 'mousemove', this._move);
		this.addEvent(document, 'mouseup', this._end);
		ev.preventDefault && ev.preventDefault();
		this.h.setCapture && this.h.setCapture();
	},

	move : function(e) {
		var ev = e || window.event, l = ev.clientX - this._x, t = ev.clientY - this._y;
		if (!!this.limit) {
			var maxX = document.documentElement.clientWidth - this.o.offsetWidth, maxY = document.documentElement.clientHeight - this.o.offsetHeight;
			l = l < 0 ? 0 : l;
			l = l > maxX ? maxX : l;
			t = t < 0 ? 0 : t;
			t = t > maxY ? maxY : t;
		}
		this.o.style.left = l + 'px';
		this.o.style.top = t + 'px';
	},

	end : function() {
		this.removeEvent(document, 'mousemove', this._move);
		this.removeEvent(document, 'mouseup', this._end);
		this.h.releaseCapture && this.h.releaseCapture();
	},

	addEvent : function(o, e, fn) {
		return o.attachEvent ? o.attachEvent('on' + e, fn) : o.addEventListener(e, fn, false);
	},

	removeEvent : function(o, e, fn) {
		return o.detachEvent ? o.detachEvent('on' + e, fn) : o.removeEventListener(e, fn, false);
	},

	bind : function(o, fn) {
		return function() {
			return fn.apply(o, arguments);
		}
	}
}