/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.login_login = new $.am.Page({
		id : "login_login",
		backButtonOnclick : function() {
			$.am.changePage(amGloble.page.getDashboardPage(), "slideright");
		},
		init : function() {
			var self = this;

			this.$username = this.$.find("#usernameField").next().blur(function() {
				amGloble.userinfo.username = $(this).val();
			}).focus(function() {
				self.hideMsg();
			});
			this.$password = this.$.find("#passwordField").next().blur(function() {
				amGloble.userinfo.password = $(this).val();
			}).focus(function() {
				self.hideMsg();
			});

			this.$.find("#loginButton").vclick(function() {
				self.login();
			});

			this.$.find("#createAccountBtn").vclick(function() {
				$.am.changePage(amGloble.page.signUp_account, "slideleft");
			});

			this.$.find("#forgetusername").vclick(function() {
				emap.inAppBrowser({
					url : amGloble.setting.lang.fgtname
				});

				var data = amGloble.generateTrackData(
	                "owner app:login:forgot username",
	                "",
	                "",
	                "",
	                "",
	                false,
	                false,
	                false,
	                false,
	                false);
	            amGloble.trackPage("owner app:login:forgot username",data);
			});
			this.$.find("#forgetpassword").vclick(function() {
				emap.inAppBrowser({
					url : amGloble.setting.lang.fgtpswd
				});

				var data = amGloble.generateTrackData(
	                "owner app:login:forgot password",
	                "",
	                "",
	                "",
	                "",
	                false,
	                false,
	                false,
	                false,
	                false);
	            amGloble.trackPage("owner app:login:forgot password",data);
			});
		},
		//before page show
		beforeShow : function(paras) {
			if (paras && paras == "back") {
				return;
			}

			var self = this;
			if (paras && paras.from) {
				this.from = paras.from;
			} else {
				this.from = null;
			}

			this.$username.attr("placeholder",i18n.SIGNUP_ACCOUNT_USERNAME);
			this.$password.attr("placeholder",i18n.SIGNUP_ACCOUNT_PASSWORD);

			if (paras && paras.username && paras.password) {
				this.$username.val(paras.username);
				this.$password.val(paras.password);
				amGloble.userinfo.username = paras.username;
				amGloble.userinfo.password = paras.password;
			} else {
				this.$username.val("");
				this.$password.val("");
				this.hideMsg();
			}

			amGloble.api.checkBackendState();

            var data = amGloble.generateTrackData(
                "owner app:login",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:login",data);

		},

		//after page show
		afterShow : function(paras) {
			var self = this;
			if (paras && paras.username && paras.password) {
				self.login();
			}
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		},

		showMsg : function(msg, index) {
			if(msg){
				var isChina = (amGloble.setting.market.name=="China");
				if(isChina){
					msg = msg.replace("Cannot log in - password doesn't match","无法登录，用户名或者密码错误。");
					msg = msg.replace("Cannot log in - No such user","无法登录，用户名不存在。");
					msg = msg.replace("Cannot log in","无法登录");				
				}
			}
			if (index) {
				this.$.find("#login_errorMsg1").html(msg || "").show();
			} else {
				this.$.find("#login_errorMsg").html(msg || "").show();
			}
		},
		hideMsg : function() {
			this.$.find("#login_errorMsg1").hide();
			this.$.find("#login_errorMsg").hide();
		},

		login : function() {
			var self = this;
			amGloble.userinfo.username = self.$username.val();
			amGloble.userinfo.password = self.$password.val();
			if (!amGloble.userinfo.username) {
				this.showMsg(i18n.LOGIN_LOGIN_NAMEPLEASE, 1);
				return;
			}

			if (!amGloble.userinfo.password) {
				this.showMsg(i18n.LOGIN_LOGIN_PASSWORDPLEASE);
				return;
			}

			amGloble.loading.show();
//			ADB.trackAction("Login", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Login",
//				"Username" : amGloble.userinfo.username,
//				"Bussiness Data" : {
//					"Username" : amGloble.userinfo.username
//				}
//			});
			amGloble.EAIStatusCheck(function() {
				var lhhost = amGloble.setting.lang.lhhost ? amGloble.setting.lang.lhhost : "";
				var option = {
					"lhhost" : lhhost,
					"host" : amGloble.setting.lang.host,
					"grant_type" : "password",
					"username" : amGloble.userinfo.username,
					"password" : amGloble.userinfo.password
				};
				amGloble.loading.show();
				emap.getLHCookie(option, function(ret) {
					console.log(JSON.stringify(ret));

					localStorage.setItem("fordOwenerApp_username", amGloble.userinfo.username);
					emap.storePwd({
						name : amGloble.userinfo.username,
						pwd : amGloble.userinfo.password
					}, function(ret) {
					}, function(ret) {
					});
					amGloble.userinfo.sessionid = "fake session";
					amGloble.api.getprofile(function(ret) {

						amGloble.loading.hide();
						if (self.checkModelEmpty()) {
							$.am.changePage(amGloble.page.login_vehicle, "slideleft");
						} else {
							$.am.changePage(self.from || amGloble.page.dashboard_main, "slideleft");
						}
					}, function(ret) {
						amGloble.loading.hide();
						//amGloble.msg(ret.statusText);
						$.am.changePage(amGloble.page.common_oops, "slideleft", {
							message : "",
							detail : ret
						});

					});
				}, function(ret) {
					amGloble.userMigrationCheck(amGloble.userinfo.username);
				});
			}, function() {
				self.originLogin();
			});

		},
		originLogin : function() {
			var self = this;
			amGloble.api.login(function(ret) {
				amGloble.api.getprofile(function(ret) {

					// amGloble.api.getVehicle(function(ret) {
					amGloble.loading.hide();

					if (self.checkModelEmpty()) {
						$.am.changePage(amGloble.page.login_vehicle, "slideleft");
					} else {
						$.am.changePage(self.from || amGloble.page.dashboard_main, "slideleft");
					}

					// }, function(ret) {
					// amGloble.loading.hide();
					// amGloble.msg(ret);
					// });
				}, function(ret) {
					amGloble.loading.hide();
					//amGloble.msg(ret.statusText);
					$.am.changePage(amGloble.page.common_oops, "slideleft", {
						message : "",
						detail : ret
					});

				});
			}, function(ret) {
				amGloble.loading.hide();
				var msg = ret.message || ret.responseJSON && ret.responseJSON.error;
				if (msg) {
					self.showMsg(msg);
				} else {
					$.am.changePage(amGloble.page.common_oops, "slideleft", {
						message : "",
						detail : ret
					});
				}

			});
		},
		checkModelEmpty : function() {

			var user_vehicles = amGloble.userinfo.profile.user_vehicles.slice(0);

			var hadEmpty = false;

			$.each(user_vehicles, function(i, item) {
				if (amGloble.findInModel(item.vehicle_nickname) == -1) {
					hadEmpty = true;
					return false;
				}
			});
			return hadEmpty;
		}
	});

})();
