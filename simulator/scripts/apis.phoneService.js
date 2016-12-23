(function() {

	var pingServicePath = "/emap/mobile/api/common/ping";
	var phoneService = {

		_$dial : null,
		dail : function(opt, scb, fcb) {
			var self = this;
			if (!this._$dial) {
				this._$dial = globle.$scr.find('.comp-dial');
			}
			this._$dial.find('.close').unbind().click(function() {
				self._$dial.hide();
			});

			var image = this._$dial.find('img');
			image[0].src = 'images/dial.png';

			image.css("left", (this._$dial.width() - image.width()) / 2);

			this._$dial.find('#dialNumber').html(opt.number);

			this._$dial.show();

		},
		_$sms : null,
		sms : function(opt, scb, fcb) {
			console.log("sms", opt)
			var self = this;
			if (!this._$sms) {
				this._$sms = globle.$scr.find('.comp-sms');
				this._$sms.find('.return').unbind().click(function() {
					self._$sms.hide();
				});
			}
			this._$sms.find('#smsBody').val(opt.body || "");
			this._$sms.find('#smsNumber').val(opt.number ? opt.number.join(",") : "");
			this._$sms.show();
		},
		_$email : null,
		email : function(opt, scb, fcb) {
			console.log("email", opt);
			var self = this;
			if (!this._$email) {
				this._$email = globle.$scr.find('.comp-email');
				this._$email.find('.return').unbind().click(function() {
					self._$email.hide();
				});
			}

			var width = simulator.data.rsls[simulator.data.crsl].rsl[0];
			this._$email.find('.emailRowContent').width(width - 20);

			this._$email.find('#emailBody').val(opt.body || "");
			this._$email.find('#emailSubject').val(opt.subject || "");
			this._$email.find('#emailTo').val(opt.to ? opt.to.join(";") : "");
			this._$email.find('#emailCC').val(opt.cc ? opt.cc.join(";") : "");
			this._$email.find('#emailBCC').val(opt.bcc ? opt.bcc.join(";") : "");

			this._$email.show();
		},
		syncTime : function(opt, scb, fcb) {
			console.log("syncTime", opt);

			var server = simulator.data.srvs[simulator.data.csrv];
			if (!server) {
				alert(multi_language.text.errMsg.setupServer);
				return false;
			}
			var url = "http://" + server.dom + ":" + server.por + pingServicePath;

			var option = {
				url : url,
				type : "get",
				success : function(ret) {
					ret = JSON.parse(ret);
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : ret.responseData.timestampLong
					});
				},
				error : function(ret) {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				}
			};
			$.ajax(option);
		},
		isReachable : function(opt, scb, fcb) {
			console.log("log", opt);

			var server = simulator.data.srvs[simulator.data.csrv];
			if (!server) {
				alert(multi_language.text.errMsg.setupServer);
				return false;
			}
			var url = "http://" + server.dom + ":" + server.por + pingServicePath;

			var option = {
				url : url,
				type : "get",
				success : function(ret) {
					ret = JSON.parse(ret);
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : true
					});
				},
				error : function(ret) {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				}
			};
			$.ajax(option);
		},
		checkGPS:function(opt,scb,fcb){
			if(scb)
			   scb();
		}
	};

	simulator.apis.phoneService = phoneService;
})(); 