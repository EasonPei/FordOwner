(function() {

	var save = function() {
		simulator.storage.save();
	};
	var simfunc = {
		gerneral : {
			init : function() {
				var self = this;
				$("input[name='mode']").change(function() {
					self.setMode($(this).val());
				});
				$("input[name='lang']").change(function() {
					if (confirm(multi_language.text.regular.langTip + $(this).next().html())) {
						self.setLang($(this).val());
					};
				});

				this._$user = $("#user");

				this._$username = $("#username").change(function() {
					self.setUsername($(this).val());
				});
				this._$password = $("#password").change(function() {
					self.setPassword($(this).val());
				});
				this._$encodePwd = $("#encodePwd").change(function() {
					self.setEncodePwd($(this)[0].checked);
				});

				this._$login = $("#login").click(function() {
					self.login();
				});

				this._$clearCache = $("#clearCache").click(function() {
					self.clearCache();
				});
				this.$datapool = $("#datapool");

				$("#exportBtn").click(function() {
					self.$datapool.val(JSON.stringify(simulator.data));
				});
				$("#importBtn").click(function() {
					var json = self.$datapool.val();
					try {
						var data = JSON.parse(json);
					} catch(e) {
						alert(multi_language.text.errMsg.errData);
						return false;
					}
					if (!data.mode || !data.mobs || !data.srvs || !data.rsls) {
						alert(multi_language.text.errMsg.errData);
						return false;
					}

					if (confirm(multi_language.text.regular.importTip)) {
						simulator.data = data;
						save();
						location.reload();
					}
					return true;
				});
			},
			login : function() {
				var self = this;
				var username = $.trim(simulator.data.user);
				var password = $.trim(simulator.data.pswd);

				if (!username || !password) {
					alert(multi_language.text.regular.loginTip);
					return false;
				}

				var server = simulator.data.srvs[simulator.data.csrv];
				if (!server) {
					alert(multi_language.text.errMsg.setupServer);
					return false;
				}
				var masServicePath = "/emap/mobile/api/user/login";
				var url = "http://" + server.dom + ":" + server.por + masServicePath;

				var str = JSON.stringify({
					"compressed" : false,
					"encrypt" : false,
					"data" : {
						"urlParameter" : [],
						"inputData" : {
							"userName" : username,
							"password" : simulator.data.encd ? CryptoJS.SHA1(password).toString(CryptoJS.enc.Base64) : password,
							"deviceUUID" : "Simulator",
							"deviceType" : "phone",
							"deviceName" : "Simulator",
							"captcha" : "",
							"language" : "zh-cn",

						},
						"serviceName" : "login"
					}
				});

				str = encodeURIComponent(str);

				var option = {
					url : url,
					type : "POST",
					data : str,
					timeout : 20000,
					success : function(ret) {
						ret = JSON.parse(ret);
						if (ret.result == "0") {
							console.log(ret.responseData.sessionId);
							simulator.data.toke = ret.responseData.sessionId;
							simulator.data.thd = ret.responseData.customized ? true : false;
							simulator.data.thdToken = ret.responseData.customized ? ret.responseData.accessToken : undefined;
							self.render();
							save();
							simulator.apis.emapNotification.showInstantMessage({
								content : multi_language.text.regular.loginSuccess
							});
						} else {
							alert(ret.message);
						}
					},
					error : function(ret) {
						alert("Login failed!");
					}
				};
				$.ajax(option);
			},
			setMode : function(mode) {
				if (mode == 2 || mode == 1 || mode == 3) {
					simulator.data.mode = mode;
				} else {
					return false;
				}
				this.render();
				save();
				return true;
			},
			setLang : function(mode) {
				if (mode == "zh-CN" || mode == "en-US") {
					simulator.data.lang = mode;
				} else {
					return false;
				}
				save();
				location.reload();
				return true;
			},
			setUsername : function(text) {
				simulator.data.user = text.toString();
				this.render();
			},
			setPassword : function(text) {
				simulator.data.pswd = text.toString();
				this.render();
				save();
			},
			setEncodePwd : function(val) {
				simulator.data.encd = val;
				this.render();
				save();
			},
			clearCache : function() {
				if (confirm(multi_language.text.regular.clearCacheTip)) {
					localStorage.clear();
					alert(multi_language.text.regular.clearCacheSuccess);
					location.reload();
				}
			},
			render : function() {
				var data = simulator.data;
				//lang
				$("input[name='lang'][value=" + data.lang + "]").attr("checked", true);
				//mode
				$("input[name='mode'][value=" + data.mode + "]").attr("checked", true);
				//user
				$("#username").val(data.user);
				$("#password").val(data.pswd);
				if (data.encd) {
					$("#encodePwd").attr("checked", true);
				}
				$("#token").html(data.toke);
				if (data.mode == 1) {
					this._$user.show();
				} else {
					this._$user.hide();
				}
			},
		},
		mobilet : {
			init : function() {
				var self = this;
				this._$iframe = $("#mobilet");
				this._$ul = $("#mobiletList").delegate("li", "click", function() {
					self.open(self._$ul.find("li").index($(this)));
				}).delegate(".delete", "click", function() {
					if (confirm(multi_language.text.application.delTip)) {
						self.remove($(this).parent().data("item"));
					}
					return false;
				});
				this._$li = this._$ul.children(":first").remove();

				this._$addInput = $("#addMobilet input");
				$("#addMobilet .sim-button").click(function() {
					var path = $(this).prev().val();
					if (!$.trim(path)) {
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.application.addTip
						});
					}
					self.load(path);
				});
			},
			openUrl : function(url) {
				this._$iframe.attr("src", url);
			},
			open : function(idx, path) {
				idx = idx == null ? simulator.data.cmob : idx;
				var mob = simulator.data.mobs[idx];
				if (mob && mob.pat) {
					simulator.data.cmob = idx;
					this._$iframe.attr("src", mob.pat + (path || mob.idx));
					simulator.simui.hide();
					save();
				}
			},
			getMobiletById : function(id) {
				for (var i = 0; i < simulator.data.mobs.length; i++) {
					var item = simulator.data.mobs[i];
					if (item.mid == id) {
						return {
							m : item,
							i : i
						};
					}
				}
				return -1;
			},
			select : function(idx) {
				simulator.data.cmob = idx;
				save();
			},
			startApp : function(id) {
				var appid = this.getMobiletById(id);
				if (appid.i >= 0) {
					this.open(appid.i);
					return true;
				}
				return false;
			},
			close : function() {
				this._$iframe.attr("src", "");
			},
			refresh : function() {
				this.close();
				this.open();
			},
			load : function(url) {
				var self = this;
				var path = "file:///" + url + "/";
				$.ajax({
					url : path + "info.json",
					dataType : 'json',
					success : function(ret) {
						self._$addInput.val("");
						if (self.add({
							nam : ret.label,
							mid : ret.id,
							ver : ret.version,
							ico : ret.icon,
							pat : path,
							idx : ret.index
						})) {
							simulator.apis.emapNotification.showInstantMessage({
								content : multi_language.text.application.addSuccess
							});
							self.render();
						} else {
							simulator.apis.emapNotification.showInstantMessage({
								content : multi_language.text.application.addFailed
							});
						}
					},
					error : function(ret) {
						self._$addInput.val("");
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.application.addFailed
						});
					}
				});
			},
			add : function(item) {
				if (!item.mid) {
					return false;
				}
				for (var i = 0; i < simulator.data.mobs.length; i++) {
					if (simulator.data.mobs[i].mid == item.mid) {
						$.extend(simulator.data.mobs[i], item);
						save();
						return true;
					}
				};
				simulator.data.mobs.push(item);
				save();
				return true;
			},
			remove : function(item) {
				for (var i = 0; i < simulator.data.mobs.length; i++) {
					if (simulator.data.mobs[i] == item) {
						simulator.data.mobs.splice(i, 1);
						if (i == simulator.data.cmob) {
							simulator.data.cmob--;
						}
						this.render();
						save();
						return;
					}
				};
			},
			render : function() {
				var self = this;
				if (!this._$ul) {
					return;
				}
				var $ul = this._$ul.empty();
				$(simulator.data.mobs).each(function(i, item) {
					var $li = self._$li.clone(true, true);
					$li.find(".img").html('<img src="' + item.pat + item.ico + '" width="100%" height="100%">');
					$li.find(".info").html(item.nam);
					$li.data("item", item);
					$ul.append($li);
				});
			}
		},
		server : {
			init : function() {
				var self = this;
				this._$ul = $("#serverList").delegate("li", "click", function() {
					self.select(self._$ul.find("li").index($(this)));
					simulator.simui.hide();
				}).delegate(".delete", "click", function() {
					if (confirm(multi_language.text.server.delTip)) {
						self.remove($(this).parent().data("item"));
					}
					return false;
				});
				this._$li = this._$ul.children(":first").remove();

				this._$addInput = $("#addServer input");
				$("#addServer .sim-button").click(function() {
					var nam = $.trim(self._$addInput.filter(".servername").val());
					var add = $.trim(self._$addInput.filter(".serverip").val());

					if (!nam) {
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.server.addTip1
						});
						return;
					}
					if (!add) {
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.server.addTip2
						});
						return;
					}
					var p = new URLParser(add);

					if (self.add({
						nam : nam,
						dom : p.getHost(),
						por : p.getPort()
					})) {

						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.server.addSuccess
						});
					} else {

						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.server.addFailed
						});
					}

				});
			},
			select : function(i) {
				if (i >= 0 && i < simulator.data.srvs.length) {
					simulator.data.csrv = i;
					this.render();
					save();
				}
			},
			getIndexItem : function(item) {
				for (var i = 0; i < simulator.data.srvs.length; i++) {
					var t = simulator.data.srvs[i];
					if (t.dom + t.por == item.dom + item.por) {
						return i;
					}
				};
				return -1;
			},
			add : function(item) {
				item.port = item.port || "80";
				if (!item.nam || !item.dom) {
					return false;
				}
				for (var i = 0; i < simulator.data.srvs.length; i++) {
					var t = simulator.data.srvs[i];
					if (t.dom + t.por == item.dom + item.por) {
						return false;
					}
				};
				if (this._$addInput) {
					this._$addInput.val("");
				}
				simulator.data.srvs.push(item);
				this.render();
				save();
				return true;
			},
			remove : function(item) {
				for (var i = 0; i < simulator.data.srvs.length; i++) {
					if (simulator.data.srvs[i] == item) {
						simulator.data.srvs.splice(i, 1);
						if (i == simulator.data.csrv) {
							simulator.data.csrv--;
						}
						this.render();
						save();
						return;
					}
				};
			},
			render : function() {
				var self = this;
				if (!self._$ul) {
					return;
				}
				var $ul = this._$ul.empty();
				$(simulator.data.srvs).each(function(i, item) {
					var $li = self._$li.clone(true, true);
					$li.find(".name").html(item.nam);
					$li.find(".url").html(item.dom + ":" + (item.por || "80"));
					$li.data("item", item);
					if (i == simulator.data.csrv) {
						$li.addClass("selected");
					}
					$ul.append($li);
				});
			}
		},
		resolution : {
			init : function() {
				var self = this;
				this._iframe = $("#mobilet");
				this._$ul = $("#resolutionList").delegate("li", "click", function() {
					self.select(self._$ul.find("li").index($(this)));
					simulator.simui.hide();
				}).delegate(".delete", "click", function() {
					if (confirm(multi_language.text.server.delTip)) {
						self.remove($(this).parent().data("item"));
					}
					return false;
				});
				this._$li = this._$ul.children(":first").remove();

				this._$addInput = $("#addResulotion input");
				$("#addResulotion .sim-button").click(function() {
					var nam = self._$addInput.filter(".resname").val();
					var rsl = [self._$addInput.filter(".reswidth").val(), self._$addInput.filter(".resheight").val()];

					if (!$.trim(nam)) {
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.resolution.addTip1
						});
						return false;
					}

					if (!$.trim(rsl[0]) || !$.trim(rsl[1])) {
						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.resolution.addTip2
						});
						return false;
					}

					var ret = self.add({
						nam : nam,
						rsl : rsl
					});

					if (ret === true) {

						simulator.apis.emapNotification.showInstantMessage({
							content : multi_language.text.resolution.addSuccess
						});
					} else {

						simulator.apis.emapNotification.showInstantMessage({
							content : ret || multi_language.text.resolution.addFailed
						});
					}

				});
			},
			change : function() {
				var rsl = simulator.data.rsls[simulator.data.crsl].rsl;
				var w = rsl[0];
				var h = rsl[1];
				$("#mobilet").parent().css({
					width : w,
					height : h,
					"margin-left" : -w / 2,
					"margin-top" : -h / 2,
				});
			},
			select : function(i) {
				if (i >= 0 && i < simulator.data.rsls.length) {
					simulator.data.crsl = i;
					this.render();
					this.change();
					save();
				}
			},
			getIndexItem : function(item) {
				for (var i = 0; i < simulator.data.rsls.length; i++) {
					var tempItem = simulator.data.rsls[i];
					if (tempItem.rsl[0] == item.rsl[0] && tempItem.rsl[1] == item.rsl[1]) {
						return i;
					}
				};
				return -1;
			},
			add : function(item) {
				if (!item.nam || !item.rsl[0] || !item.rsl[1] || isNaN(parseInt(item.rsl[0])) || isNaN(parseInt(item.rsl[1]))) {
					return false;
				}
				if (item.rsl[0] < 300 || item.rsl[1] < 300) {
					return multi_language.text.server.addTip13;
				}
				if (item.rsl[0] > 1920 || item.rsl[1] > 1080) {
					return multi_language.text.server.addTip12;
				}

				if (this._$addInput) {
					this._$addInput.val("");
				}

				for (var i = 0; i < simulator.data.rsls.length; i++) {
					var tempItem = simulator.data.rsls[i];
					if (tempItem.rsl[0] == item.rsl[0] && tempItem.rsl[1] == item.rsl[1]) {
						tempItem.nam = item.nam;

						this.render();
						save();
						return true;
					}
				};

				simulator.data.rsls.push(item);
				this.render();
				save();
				return true;
			},
			remove : function(item) {
				for (var i = 0; i < simulator.data.rsls.length; i++) {
					if (simulator.data.rsls[i] == item) {
						simulator.data.rsls.splice(i, 1);
						if (i == simulator.data.crsl) {
							simulator.data.crsl--;
						}
						this.render();
						save();
						return;
					}
				};
			},
			render : function() {
				var self = this;
				if (!self._$ul) {
					return;
				}
				var $ul = this._$ul.empty();
				$(simulator.data.rsls).each(function(i, item) {
					var $li = self._$li.clone(true, true);
					$li.find(".name").html(item.nam);
					$li.find(".url").html('Width:<span class="highlight">' + item.rsl[0] + 'px</span>Height:<span class="highlight">' + item.rsl[1] + 'px</span>');
					$li.data("item", item);
					if (i == simulator.data.crsl) {
						$li.addClass("selected");
					}
					$ul.append($li);
				});
			}
		},
		eventManager : {
			init : function() {
				var self = this;
				new drag('eventManager', 'eventManagerHandler', true);
				this.$box = $("#eventManager");
				this.$eventType = $("#eventManager select");
				this.$data = $("#eventManager textarea");
				$("#eventManagerClose").click(function() {
					self.hide();
				});

				$("#eventManagerTrigger").click(function() {
					self.tigger();
				});
			},
			show : function() {
				this.$box.show();
			},
			hide : function() {
				this.$box.hide();
			},
			toggle : function() {
				this.$box.toggle();
			},
			tigger : function() {
				var type = this.$eventType.val();
				var data = this.$data.val();
				if (data) {
					try {
						data = JSON.parse(data);
					} catch(e) {
						alert("Data format error!");
						return;
					}
				} else {
					data = {};
				}
				console.log(type, data);
				globle.trigger(type, data);
			}
		}
	};
	window.simulator.simfunc = simfunc;

	//console.log("simfunc done;")
})();
