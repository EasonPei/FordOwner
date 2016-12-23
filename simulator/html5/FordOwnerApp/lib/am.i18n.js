//1.不同语言用不同文件
//2.文件格式简单
//3.jquery mobile会对模板处理，是否能用
//4.有没有license
//5.用户体验

var i18nController = {
	defaultLanguage : "en-us", //默认语言
	currentLanguage : null, //当前语言
	_load_script : function(url, scb, ecb) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = url;
		script.onload = scb;
		script.onerror = ecb;
		// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		head.insertBefore(script, head.firstChild);
	},
	//加载语言文件 lanName:语言名 scb 成功回调 ecb 失败回调
	changeLanguage : function(lanName, scb, ecb) {
//		if (lanName == this.currentLanguage) {
//			return false;
//		}
		var self = this;

		try {
			var lang = JSON.parse(localStorage.getItem("fordOwenerApp_i18n_" + lanName));

			if (lang) {
				self.currentLanguage = lanName;
				window.i18n = lang;
				self.update();
				return;
			}
		} catch(ret) {

		}
		//载入语言文件
		this._load_script("i18n/" + lanName + ".js", function() {
			self.currentLanguage = lanName;
			self.update();
			scb && scb();
		}, ecb);

	},
	//更新页面语言显示
	update : function() {
		var self = this;
		$("*[i18n]").each(function(i, html) {
			var $this = $(this);
			var key = $this.attr("i18n").split(".");
			var r = window.i18n;
			while (key.length) {
				r = r[key.shift()];
			}

			if ($this.prop("tagName") == "INPUT" || $this.prop("tagName") == "TEXTAREA") {
				$this.prop("placeholder", r);
			} else {
				$this.html(r);
			}

		});
		$("*[i18nvalue]").each(function(i, html) {
			var $this = $(this);
			var key = $this.attr("i18nvalue").split(".");
			var r = window.i18n;
			while (key.length) {
				r = r[key.shift()];
			}
			$this.val(r);

		});
	}
};
