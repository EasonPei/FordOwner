/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.setting_main = new $.am.Page({
		id : "setting_main",

		init : function() {
			var $lis = this.$.find("ul > li");
			$lis.eq(0).vclick(function() {
				$.am.changePage(amGloble.page.setting_about, "slideleft");
			});
			$lis.eq(5).vclick(function() {
				var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "owner support:"+"qr share",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:owner support:settings:"+"qr share",data);

				$.am.changePage(amGloble.page.setting_qrcode, "slideleft");
			});
			$lis.eq(6).vclick(function() {
				var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "owner support:"+"logout",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:owner support:settings:"+"logout",data);

				emap.confirm({
					caption : "",
					description : i18n.SETTING_MAIN_DESCRIBTION,
					okCaption : i18n.SETTING_MAIN_CANCEL,
					cancelCaption : i18n.SETTING_MAIN_LOGOUT
				}, function(ret) {

				}, function(ret) {
					amGloble.logout();
				});

			});

			$lis.eq(1).click(function() {
				//	amGloble.popup.disclaimer.enableInnerClose = true;
				//    amGloble.popup.disclaimer.show();
				var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "owner support:"+"legal",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:owner support:settings:"+"legal",data);

				emap.inAppBrowser({
					url : amGloble.setting.lang.legal
				});
			});

			//$lis.eq(2).click(function () {
			//	amGloble.popup.privacyPolicy.enableInnerClose = true;
			//   amGloble.popup.privacyPolicy.show();
			// emap.inAppBrowser({
			//url : amGloble.setting.lang.privacy
			//});

			// });

			//push notification

			$("#setting_main .floatright").vclick(function() {
				var icon = $(this);
				var checked = icon.hasClass("switchbutton-on");
				if (checked) {
					icon.removeClass("switchbutton-on");
					icon.addClass("switchbutton-off");
					//amGloble.setting.notification = false;
					//amGloble.saveSettings();
					amGloble.tag.setItem("setting", "OFF")
				} else {
					icon.removeClass("switchbutton-off");
					icon.addClass("switchbutton-on");
					//amGloble.setting.notification = true;
					// amGloble.saveSettings();
					amGloble.tag.setItem("setting", "ON")
				}

				var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "owner support:"+"push notifications",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:owner support:settings:"+"push notifications",data);
			});

			$lis.eq(3).vclick(function() {
				var $this = $(this);

				amGloble.loadSettings();

				if (amGloble.setting.market.code == "TH" || amGloble.setting.market.code == "ID") {
					amGloble.popupMenu(i18n.SETTING_MAIN_LANGUAGE, amGloble.setting.market.langs, "name", function(ret) {
						$this.find("input").val(ret.name);
						
						if(ret.i18n != amGloble.setting.lang.i18n){
							window.localStorage.setItem("fordOwenerApp_lang", ret.i18n);
							amGloble.tag.setItem("language", ret.code);
							amGloble.setting.lang = ret;
							amGloble.saveSettings();
							location.reload();
						}

					});
				};

			});

		},
		//before page show
		beforeShow : function(paras) {
			if (!(amGloble.setting.market.code == "TH" || amGloble.setting.market.code == "ID")) {
				$("#setting_main .button-arrow-down").hide();

			} else {
				$("#setting_main .button-arrow-down").show();
			}
			$("#setting_main input").val(amGloble.setting.market.langs[0].name);
			var $lis = this.$.find("ul > li");
			if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "th-th") {
				$lis.eq(3).find("input").val("ภาษาไทย");
			};
			if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "id-id") {
				$lis.eq(3).find("input").val("Bahasa Indonesia");
			};

			if (amGloble.userinfo.sessionid) {
				$lis.eq(4).show();
				$lis.eq(6).show();
			} else {
				$lis.eq(4).hide();
				$lis.eq(6).hide();

			}
                                             
       if ((amGloble.setting.market.code == "KR" || amGloble.setting.market.code == "JP")) {
           $lis.eq(4).hide();
           $lis.eq(6).hide();
       
       }

			var pns = amGloble.tag.data.current.setting;
			if (pns == "ON") {
				$("#setting_main .floatright").removeClass("switchbutton-off");
				$("#setting_main .floatright").addClass("switchbutton-on");
			} else {
				$("#setting_main .floatright").removeClass("switchbutton-on");
				$("#setting_main .floatright").addClass("switchbutton-off");
			}
                                             

			$lis.eq(2).hide();

			var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackPage("owner app:owner support:settings",data);

		},

		//after page show
		afterShow : function() {
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		}
	});

})();
