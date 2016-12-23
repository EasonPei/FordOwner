//创建am命名空间
window.$ && (window.$.am = {});
$.am.supports = {
	CSS3DTransform : ( typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'))
};
$.am.components = [];
$.am.Component = function(e) {
	if ($.am.apiReady) {
		this.componentInit && this.componentInit();
	}
};
$.am.use2d = false;
$.am.getInnerHeight = function() {
	var h = window.innerHeight;
	return h < 400 ? 400 : h;
};
//fix JSON.parse bug
JSON.originalParse = JSON.parse;
JSON.parse = function(text) {
	try {
		return text ? JSON.originalParse(text) : text;
	} catch(e) {
		return text;
	}
};
//$ready事件做的事
$(function() {
	//解决atmobile的100%为0的bug
	var lasth = 0;
	var lastt = new Date().getTime();
	var timer = setInterval(function() {
		var thish = window.innerHeight;
		var thist = new Date().getTime();
		if (thish != lasth) {
			$.am.debug.log(thish);
			$("body").height(window.innerHeight);
			lasth = thish;
			lastt = thist;
		}
		if (thist - lastt > 1000) {
			$.am.debug.log("get height end");
			clearInterval(timer);
		}
	}, 100);
	//报错时打印到log
	window.onerror = function(msg, url, l) {
		$.am.debug.log(msg + "\n" + url + "\n" + l);
	};
	//解决触摸非input键盘不消失的问题
	$("body").bind("touchstart", function(e) {
		// $.am.debug.log("touches");
		if (!$(e.target).is("input") && !$(e.target).is("textarea")) {
			setTimeout(function() {
				$("input:focus, textarea:focus").blur();
			}, 100);
		}
	});
	$.am.page && $.am.page.init();
	$.am.events && $.am.events.init();
	$.am.debug && $.am.debug.init();
});
//api.ready做的事
emap.ready(function() {
	$.am.elements && $.am.elements.init();
	for (var i = 0; i < $.am.components.length; i++) {
		$.am.components[i].componentInit && $.am.components[i].componentInit();
	}
	$.am.apiReady = true;
	for (var i in $.am.pages) {
		$.am.pages[i].init && $.am.pages[i].init();
	}
	//console.log($.am.init);
	$.am.init && $.am.init();
	//android上的返回按钮

});
