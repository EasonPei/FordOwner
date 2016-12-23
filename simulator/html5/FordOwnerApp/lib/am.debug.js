$.am.debug = {
	enable : false,
	init : function() {
		this.enable = (window.localStorage.getItem("kfcmos_debug") == "open");
	},
	show : function() {
		var self = this;
		if (this.div) {
			return;
		}
		this.div = $('<div id="am-consolediv" class="am-clickable" style="word-break: break-all; position: absolute; z-index: 1000; background: rgba(0,0,0,0.5); width: 80%; height: 100px; top: 45px; right:0px; color: white; font-size: 9px; overflow: hidden;"></div>');
		this.div.vclick(function() {
			self.hide();
		});
		$("body").append(this.div);
	},
	hide : function() {
		if (this.div) {
			this.div.remove();
			delete this.div;
		}
	},
	log : function(msg) {
		if (!this.enable) {
			return false;
		}
		if (!this.div) {
			this.show();
		}
		var date = new Date();
		this.div.prepend(date.getMinutes() + ":" + date.getSeconds() + " " + msg + "<br>");
	},
	checkErr : function(service, ret) {
		var errorMsg = false;
		var isTimeout = 0;
		if (!ret || typeof (ret) != "object") {
			this.log(service + ":err:ret invalid");
		} else if (ret.result != 0) {
			this.log(service + ":err:result=" + ret.result);
			if (ret.result > 500) {
				isTimeout = 1;
			}
		} else if ( typeof (ret.responseData) != "object") {
			this.log(service + ":err:responseData invalid");
		} else if (ret.responseData.errorCode) {
			this.log(service + ":err:errorCode exist");
			if (ret.responseData.errorMsg) {
				errorMsg = ret.responseData.errorMsg;
			}
		}
		var errHash = [{
			"placeOrder" : {
				"errCode" : "ERR01001",
				"errName" : "Fail to place order",
				"errMsg" : errorMsg || ""
			},
			"checkOrder" : {
				"errCode" : "ERR01003",
				"errName" : "Fail to sync order",
				"errMsg" : errorMsg || ""
			},
			"login" : {
				"errCode" : "ERR01005",
				"errName" : "Fail to login",
				"errMsg" : errorMsg || ""
			},
			"getDataStatus" : {
				"errCode" : "ERR01007",
				"errName" : "Fail to get server time",
				"errMsg" : errorMsg || ""
			},
			"regInfo" : {
				"errCode" : "ERR01008",
				"errName" : "Fail to save user info",
				"errMsg" : errorMsg || ""
			},
			"getMenu" : {
				"errCode" : "ERR01010",
				"errName" : "Fail to get menu",
				"errMsg" : errorMsg || ""
			}
		}, {
			//超时错误
			"placeOrder" : {
				"errCode" : "ERR01002",
				"errName" : "Timeout when placing order",
				"errMsg" : errorMsg || ""
			},
			"checkOrder" : {
				"errCode" : "ERR01004",
				"errName" : "Sync order timeout",
				"errMsg" : errorMsg || ""
			},
			"login" : {
				"errCode" : "ERR01006",
				"errName" : "Login timeout",
				"errMsg" : errorMsg || ""
			},
			"getDataStatus" : null,
			"regInfo" : {
				"errCode" : "ERR01009",
				"errName" : "Saving user info timeout",
				"errMsg" : errorMsg || ""
			},
			"getMenu" : {
				"errCode" : "ERR01011",
				"errName" : "Get menu timeout",
				"errMsg" : errorMsg || ""
			}
		}];
		try {
			var opt = errHash[isTimeout][service];
			if (opt) {
				this.log("postLog:" + JSON.stringify(opt));
				atMobile.sys.postLog(opt, function(ret) {
				}, function(ret) {
				});
			}
		} catch(e) {
			this.log("postLog:err:" + e);
		}

		return errorMsg;
	},
	postLog : function() {
	}
};
