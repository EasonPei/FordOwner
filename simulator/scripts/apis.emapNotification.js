(function() {
	var emapNotification = {

		_isIMShowing : false,
		_$instantMessage : null,
		showInstantMessage : function(opt, scb, fcb) {
			var self = this;
			var option = {
				content : '',
				duration : 3000
			};
			globle.extend(option, opt, true);
			if (!this._$instantMessage) {
				this._$instantMessage = globle.$scr.find('.comp-instantMessage');
			}
			if (opt && !this._isIMShowing) {
				this._$instantMessage.find("span").html(option.content || "");
				this._$instantMessage.show();
				self._isIMShowing = true;
				setTimeout(function() {
					self._$instantMessage.find("span").html("");
					self._$instantMessage.hide();
					self._isIMShowing = false;
				}, option.duration);
			}
		},

		_$messageBox : null,
		showMessageBox : function(opt, scb, fcb) {
			var self = this;
			var option = {
				caption : '',
				description : '',
				okCaption : 'OK'
			};
			globle.extend(option, opt, true);

			if (!this._$messageBox) {
				this._$messageBox = globle.$scr.find('.comp-messageBox');
			}
			var btns = this._$messageBox.find("span");
			btns.eq(0).unbind().click(function() {
				self._$messageBox.hide();
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			});

			this._$messageBox.find("h1").html(option.caption || "");
			this._$messageBox.find("p").html(option.description || "");
			this._$messageBox.find("span").eq(0).html(option.okCaption || "");
			this._$messageBox.show();

		},

		_$confirm : null,
		confirm : function(opt, scb, fcb) {
			var self = this;
			var option = {
				caption : '',
				description : '',
				okCaption : 'OK',
				cancelCaption : 'Cancel'
			};
			globle.extend(option, opt, true);

			if (!this._$confirm) {
				this._$confirm = globle.$scr.find('.comp-confirm');
			}
			var btns = this._$confirm.find("span");
			btns.eq(0).unbind().click(function() {
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
				self._$confirm.hide();
			});
			btns.eq(1).unbind().click(function() {
				fcb && fcb({
					"result" : -2,
					"message" : "Cancel"
				});
				;
				self._$confirm.hide();
			});

			this._$confirm.find("h1").html(option.caption || "");
			this._$confirm.find("p").html(option.description || "");
			this._$confirm.find("span").eq(0).html(option.okCaption || "");
			this._$confirm.find("span").eq(1).html(option.cancelCaption || "");
			this._$confirm.show();
		},
		addEvent : function(opt, scb, fcb) {
			console.log("addEvent", opt);
			scb && scb({
				"result" : 0,
				"message" : "Success"
			});
		},
		removeEvent : function(opt, scb, fcb) {
			console.log("removeEvent", opt);
			scb && scb({
				"result" : 0,
				"message" : "Success"
			});
		}
	};

	simulator.apis.emapNotification = emapNotification;
})(); 