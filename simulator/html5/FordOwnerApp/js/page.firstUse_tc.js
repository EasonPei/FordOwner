/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.firstUse_tc = new $.am.Page({
		id : "firstUse_tc",

		init : function() {
			var self = this;

			this.$.find(".useragreement span.icon-uncheck").vclick(function() {
				var $this = $(this);
				$this.toggleClass("icon-checked");
				if ($this.hasClass("icon-checked")) {
					self.$btn.removeClass("am-disabled");
				} else {
					self.$btn.addClass("am-disabled");
				}
			});

			this.$btn = this.$.find(".rectButton").vclick(function() {

				amGloble.setting = self.setting;
				amGloble.saveSettings();

				// if (amGloble.setting.lang.i18n != "en-in") {
				// window.localStorage.setItem("fordOwenerApp_lang", amGloble.setting.lang.i18n);
				// amGloble.api.updateLang(function () {
				// var lang = amGloble.setting.lang.i18n;
				// i18nController.changeLanguage(lang);
				//
				// amGloble.tag.setItem("setting", "ON");
				// amGloble.tag.setItem("market", amGloble.setting.market.code);
				// amGloble.tag.setItem("language", amGloble.setting.lang.code);
				//
				// $.am.changePage(amGloble.page.firstUse_linkPage, "slideleft");
				// });
				// }
				// else
				// {
				// amGloble.tag.setItem("setting", "ON");
				// amGloble.tag.setItem("market", amGloble.setting.market.code);
				// amGloble.tag.setItem("language", amGloble.setting.lang.code);
				//
				// $.am.changePage(amGloble.page.firstUse_linkPage, "slideleft");
				// }
				window.localStorage.setItem("fordOwenerApp_lang", amGloble.setting.lang.i18n);
				amGloble.api.updateLang(function() {
					var lang = amGloble.setting.lang.i18n;
					i18nController.changeLanguage(lang);

					amGloble.tag.setItem("setting", "ON");
					amGloble.tag.setItem("market", amGloble.setting.market.code);
					amGloble.tag.setItem("language", amGloble.setting.lang.code);

					//$.am.changePage(amGloble.page.firstUse_linkPage, "slideleft");
				});


				var startPage = amGloble.page.firstUse_linkPage;
				if(amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR"){
					startPage = amGloble.page.dashboard_main_skjp;
				}

				//load config from akamai
				amGloble.loading.show();
				amGloble.api.getConfig(function(code, ret) {
					if (!code) {
						$.extend(true, amGloble.setting.market, ret);
						$.each(amGloble.setting.market.langs, function(i, item) {
							if (item.code == amGloble.setting.lang.code) {
								amGloble.setting.lang = item;
								return false;
							}
						});
						amGloble.saveSettings();
					}

					//成功则覆盖本地

					if (amGloble.userinfo.username && amGloble.userinfo.password) {
						amGloble.api.login(function(ret) {
							amGloble.api.getprofile(function(ret) {
								amGloble.loading.hide();
								console.log(ret);
								if (amGloble.page.login_login.checkModelEmpty()) {
									$.am.changePage(amGloble.page.login_vehicle, "");
								} else {
									$.am.changePage(startPage, "");
								}

							}, function(ret) {
								amGloble.loading.hide();
								$.am.changePage(startPage, "");
							});
						}, function(ret) {
							amGloble.loading.hide();
							$.am.changePage(startPage, "");
						});
					} else {
						amGloble.loading.hide();
						$.am.changePage(startPage, "");
					}

					//FUYU
					if (amGloble.fyuserinfo.username && amGloble.fyuserinfo.password) {
						amGloble.api.fuyuLogin();
					}
				});





			});

			// this.$.find(".useragreement span.link2").vclick(function() {
			// emap.inAppBrowser({
			// url : amGloble.setting.lang.disclaimer
			// });
			// });

		},
		//before page show
		beforeShow : function(paras) {
			var self = this;
			
			this.setting = paras;

			this.$.find(".useragreement span.link1").vclick(function() {
				emap.inAppBrowser({
					url : self.setting.lang['t&clink']
				});

				var data = amGloble.generateTrackData(
	                "owner app:terms",
	                "",
	                "",
	                "",
	                "home:popup:privacy statement",
	                false,
	                false,
	                false,
	                false,
	                false);
            	amGloble.trackAction("owner app:terms:privacy statement",data);
            
			});

			// if (amGloble.page.firstUse_tc.setting.market.code == "IN") {
			// this.$.find(".useragreement span.link1").html("Terms & Conditions and Privacy Statement");
			// } else {
			// this.$.find(".useragreement span.link1").html("Terms & Conditions");
			// }

			var data = amGloble.generateTrackData(
                "owner app:terms",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:terms",data);
		},

		//after page show
		afterShow : function() {
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
			amGloble.api.getRegistration(function(ret) {
				console.log(ret);
				amGloble.setting.registration = ret;
				amGloble.saveSettings();
				// amGloble.msg(ret.status.code);
			}, function(ret) {
				amGloble.msg(ret.status.code);
			});
		}
	});

})();
