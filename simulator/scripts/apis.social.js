(function() {
	var social = {
		_$binded : null,
		_$bind : null,
		bind : function(opt, scb, fcb) {
			var self = this;

			if (!this._$bind) {
				this._$bind = globle.$scr.find('.comp-bind');
			}
			var btns = this._$bind.find("span");
			btns.eq(0).unbind().click(function() {
				self._$binded = true;
				self._$bind.hide();
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			});
			btns.eq(1).unbind().click(function() {
				self._$binded = false;
				self._$bind.hide();
				fcb && fcb({
					"result" : -2,
					"message" : "Cancel"
				});
			});

			this._$bind.find("#bindUserName").val("");
			this._$bind.find("#bindPassword").val("");

			this._$bind.find("h1").html(multi_language.text.socail.bind);
			this._$bind.find("p").html(opt.site);
			this._$bind.find("span").eq(0).html(multi_language.text.socail.login);
			this._$bind.find("span").eq(1).html(multi_language.text.common.cancel);
			this._$bind.show();
		},
		unbind : function(opt, scb, fcb) {
			var self = this;
			self._$binded = false;
			scb && scb({
				"result" : 0,
				"message" : "Success"
			});
		},
		isBound : function(opt, scb, fcb) {
			var self = this;
			if (self._$binded) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : true
				});
			} else {
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : false
				});
			}
		},
		_$shareTo : null,
		shareTo : function(opt, scb, fcb) {
			var self = this;
			if (!self._$shareTo) {
				self._$shareTo = globle.$scr.find('.comp-shareTo');
			}

			var shareFunction = function() {
				var btns = self._$shareTo.find("span");
				btns.eq(0).unbind().click(function() {
					self._$shareTo.hide();
					scb && scb({
						"result" : 0,
						"message" : "Success"
					});
				});
				btns.eq(1).unbind().click(function() {
					self._$shareTo.hide();
					fcb && fcb({
						"result" : -2,
						"message" : "Cancel"
					});
				});

				self._$shareTo.find("h1").html(multi_language.text.socail.share);
				self._$shareTo.find("p").html(opt.site);
				self._$shareTo.find("#shareContent").val(opt.content || "");
				self._$shareTo.find("span").eq(0).html(multi_language.text.common.ok);
				self._$shareTo.find("span").eq(1).html(multi_language.text.common.cancel);
				self._$shareTo.show();
			};

			if (!self._$binded) {
				self.bind({
					site : opt.site
				}, function(ret) {
					shareFunction();
				}, function(ret) {
					fcb && fcb({
						"result" : -2,
						"message" : "Cancel"
					});
				});
			} else {
				shareFunction();
			}
		},
		follow : function(opt, scb, fcb) {
			var self = this;

			if (!self._$binded) {
				self.bind({
					site : opt.site
				}, function(ret) {
					scb && scb({
						"result" : 0,
						"message" : "Success"
					});
				}, function(ret) {
					fcb && fcb({
						"result" : -2,
						"message" : "Cancel"
					});
				});
			} else {
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			}
		}
	};

	simulator.apis.social = social;
})();
