/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.fuyu_login = new $.am.Page({
		id : "fuyu_login",
		backButtonOnclick : function() {
			$.am.changePage(amGloble.page.getDashboardPage(), "slideright");
		},
		init : function() {
			var self = this;

			this.$username = this.$.find("#fyusername").blur(function() {
				amGloble.fyuserinfo.username = $(this).val();
			});
			this.$password = this.$.find("#fypassword").blur(function() {
				amGloble.fyuserinfo.password = $(this).val();
			});

			this.$.find("#fyLoginButton").vclick(function() {
				self.login();
			});

			this.$.find("#fyCreateAccountBtn").vclick(function() {

			});

			this.$.find("#fyForgetusername").vclick(function() {
				emap.inAppBrowser({
					url : amGloble.setting.lang.fgtname
				});
			});
			this.$.find("#fyForgetpassword").vclick(function() {
				emap.inAppBrowser({
					url : amGloble.setting.lang.fgtpswd
				});
			});
			this.$.find(".fontlink").vclick(function() {
				$.am.changePage(amGloble.page.fuyu_signup, "slideleft");
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

			if (paras && paras.username && paras.password) {
				this.$username.val(paras.username);
				this.$password.val(paras.password);
				amGloble.fyuserinfo.username = paras.username;
				amGloble.fyuserinfo.password = paras.password;
			} else {
				this.$username.val("");
				this.$password.val("");
			}

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

		login : function() {
			var self = this;
			amGloble.fyuserinfo.username = self.$username.val();
			amGloble.fyuserinfo.password = self.$password.val();
			if (!amGloble.fyuserinfo.username) {
				amGloble.msg("请输入用户名");
				return;
			}

			if (!amGloble.fyuserinfo.password) {
				amGloble.msg("请输入密码");
				return;
			}
			
//			ADB.trackAction("登录", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Login",
//				"Username" : amGloble.userinfo.username,
//				"Bussiness Data" : {
//					"Username" : amGloble.userinfo.username,
//					"福域用户名":amGloble.fyuserinfo.username
//				}
//			});

			amGloble.loading.show();
			amGloble.api.fuyuLogin(function(ret) {
				amGloble.loading.hide();
				$.am.changePage(self.from || amGloble.page.dashboard_main, "slideleft");
			}, function(ret) {
				amGloble.loading.hide();
				var msg = ret.message || ret.responseJSON && ret.responseJSON.error;
				if (msg) {
				amGloble.msg(msg);
				} else {
					$.am.changePage(amGloble.page.common_oops, "slideleft", {
						message : "",
						detail : ""
					});
				}
			});
		},
	});

})();
