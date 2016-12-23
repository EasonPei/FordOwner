window.simulator = {
	exec : function(serviceName, actionName, option, successCallback, failedCallback) {
		this.apis[serviceName][actionName](option, successCallback, failedCallback);
	},
	data : {
		lang : "", //语言
		mode : 1, //模式 1-B2E 2-B2E
		user : "guoym", //用户名
		pswd : "123456", //密码
		toke : "sxdsa213sada23dase", //token
		encd : true, //密码是否加密
		//anym : 1, //是否匿名
		cmob : 0, //当前mobilet
		mobs : [],
		csrv : 0,
		srvs : [],
		crsl : 0,
		rsls : [{
			nam : "iPhone有系统栏",
			rsl : [320, 460]
		}, {
			nam : "iPhone无系统栏",
			rsl : [320, 480]
		}, {
			nam : "Galaxy S3",
			rsl : [400, 640]
		}, {
			nam : "Galaxy Note2",
			rsl : [400, 640]
		}, {
			nam : "iPad",
			rsl : [1024, 768]
		}],
	},
	storage : {
		_key : "emapSimulatorCfg",
		save : function() {
			var data = simulator.data;
			if (data) {
				window.localStorage.setItem(this._key, JSON.stringify(data));
			}
		},
		restore : function() {
			var ret = window.localStorage.getItem(this._key);
			if (ret) {
				ret = JSON.parse(ret);
				simulator.data = ret;
			}
		},
	},
	simui : {
		_$simui : $("#simulatorUI"),
		_$tabs : $('#simulatorUI .sim-tabbar li'),
		_$pages : $('#simulatorUI .sim-page'),
		select : function(n) {
			if (n >= 0 && n < this._$tabs.length) {
				this._$tabs.removeClass("selected").eq(n).addClass('selected');
				this._$pages.hide().eq(n).show();
			}
		},
		show : function(n) {
			this._$simui.show();
			if (n != null) {
				this.select(n);
			}
		},
		hide : function() {
			this._$simui.hide();
		},
		toggle : function(n) {
			this._$simui.toggle();
			if (n != null) {
				this.select(n);
			}
		},

		init : function() {
			var self = this;
			this._$tabs.click(function() {
				self.select(self._$tabs.index($(this)));
			});
			//快捷按钮
			$("#mainBtn0").click(function() {
				self.show(0);
			});
			$("#mainBtn1").click(function() {
				self.show(1);
			});
			$("#mainBtn2").click(function() {
				self.show(2);
			});
			$("#mainBtn3").click(function() {
				self.show(3);
			});
			$("#mainBtn4").click(function() {
				simulator.simfunc.eventManager.toggle();
			});

			$("#mainBtn10").click(function() {
				globle.trigger("backbutton");
			});
			$("#mainBtn11").click(function() {
				globle.trigger("menubutton");
			});
			$("#mainBtn12").click(function() {
				globle.trigger("searchbutton");
			});
			$("#mainBtn13").click(function() {
				globle.trigger("startcallbutton");
			});
			$("#mainBtn14").click(function() {
				globle.trigger("endcallbutton");
			});
			$("#mainBtn15").click(function() {
				globle.trigger("volumeupbutton");
			});
			$("#mainBtn16").click(function() {
				globle.trigger("volumedownbutton");
			});

			$("#uiclose").click(function() {
				self.hide();
			});

			//EventManager
		}
	},
	KeyValues : {
		Set : function(key, value) {
			this[key] = value;
		},
		Get : function(key) {
			return this[key];
		},
		Contains : function(key) {
			return this.Get(key) == null ? false : true;
		},
		Remove : function(key) {
			delete this[key];
		}
	}
};

$(function() {

	//debugger;

	//获取缓存
	simulator.storage.restore();

	var lang = simulator.data.lang;
	if (lang != "zh-CN" && lang != "en-US") {
		lang = navigator.language;
	}
	if (lang != "zh-CN" && lang != "en-US") {
		lang = "en-US";
	}

	multi_language.changeLanguage(lang, function() {
	}, function() {
		alert("语言切换失败");
	});

	var bootTs = window.localStorage.getItem("emapBootTs");

	var data = null;
	if (bootParam && bootParam.ts && bootParam.ts != bootTs) {
		data = bootParam;
		window.localStorage.setItem("emapBootTs", bootParam.ts);

		simulator.simfunc.server.add(data.serv);
		var servIndex = simulator.simfunc.server.getIndexItem(data.serv);
		simulator.simfunc.server.select(servIndex);

		simulator.simfunc.resolution.add(data.resl);
		var reslIndex = simulator.simfunc.resolution.getIndexItem(data.resl);
		simulator.simfunc.resolution.select(reslIndex);

		simulator.simfunc.mobilet.add(data.mobi);
		var mobiIndex = simulator.simfunc.mobilet.getMobiletById(data.mobi.mid).i;
		simulator.simfunc.mobilet.select(mobiIndex);
	}
	console.log(data);

	//画页面
	simulator.simui.init();
	simulator.simfunc.gerneral.init();
	simulator.simfunc.gerneral.render();
	simulator.simfunc.mobilet.init();
	simulator.simfunc.mobilet.render();
	simulator.simfunc.server.init();
	simulator.simfunc.server.render();
	simulator.simfunc.resolution.init();
	simulator.simfunc.resolution.render();
	simulator.simfunc.resolution.change();
	simulator.simfunc.eventManager.init();
	//打开mobilet
	simulator.simfunc.mobilet.open();

});
