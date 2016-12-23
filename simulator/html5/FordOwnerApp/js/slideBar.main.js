/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

amGloble.slideBar.main = new $.am.SlideBar({
	id : "slideBar_main",
	width : 175,
	init : function() {
		var self = this;

		this.scrollview = new $.am.ScrollView({
			$wrap : this.$.find(".am-slideBar-inner"),
			$inner : this.$.find(".slideBar-list"),
			direction : [false, true]
		});

		this.$.find("#slideBar_home").vclick(function() {
			var startPage = amGloble.page.dashboard_main;
			if(amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR"){
				startPage = amGloble.page.dashboard_main_skjp;
			}
			$.am.changePage(startPage, "");
			self.hide();
		});
		this.$.find("#slideBar_profile").vclick(function() {
			$.am.changePage(amGloble.page.profile_myVehicle, "");
			self.hide();
		});
		this.$.find("#slideBar_dealer").vclick(function() {
//			ADB.trackAction("Goto 'Dealer Locator'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			if(amGloble.setting.market.code == "KR"){
				emap.inAppBrowser({
			            url: "http://m.ford-korea.com/research/dealer-locate"
			        });
			}
			else{
				$.am.changePage(amGloble.page.dealer_listview, "");
			}
			self.hide();
		});
		this.$.find("#slideBar_calllcenter").vclick(function() {
//			ADB.trackAction("Goto 'Call Center'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			$.am.changePage(amGloble.page.contact_callCenter, "");
			self.hide();
		});
		this.$.find("#slideBar_assist").vclick(function() {
//			ADB.trackAction("Goto 'Roadside Assist'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			$.am.changePage(amGloble.page.contact_roadsideAssistance, "");
			self.hide();
		});
		this.$.find("#slideBar_checklist").vclick(function() {
			if (amGloble.userinfo.sessionid) {
			    //已登陆
			    if (amGloble.setting.market.code == "AU") {
			        if (amGloble.userinfo.sessionid == null){
			            $.am.changePage(amGloble.page.login_login, "slideleft");
			        }
			        else{
			            $.am.changePage(amGloble.page.service_checklist_au, "slideleft");
			        }
			    }
                else{
			        $.am.changePage(amGloble.page.service_checklist, "");
			    }
				
			} else {
				$.am.changePage(amGloble.page.login_login, "", {
					from : amGloble.page.service_checklist
				});
			}
			self.hide();
		});
		this.$.find("#slideBar_knowledgeCenter").vclick(function() {
			if (amGloble.setting.market.code == "JP"){
				$.am.changePage(amGloble.page.knowledge_indicatorIcons_JP, "");
				self.hide();
				return false;
			}
			$.am.changePage(amGloble.page.knowledge_indicatorIcons, "");
			self.hide();
			return false;
		});
		this.$.find("#slideBar_indicator").vclick(function() {

//			ADB.trackAction("Goto 'Indicator Icons'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			if (amGloble.setting.market.code == "JP"){
				$.am.changePage(amGloble.page.knowledge_indicatorIcons_JP, "");
				self.hide();
				return false;
			}

			$.am.changePage(amGloble.page.knowledge_indicatorIcons, "");
			self.hide();
			return false;
		});
		this.$.find("#slideBar_ownerManual").vclick(function() {
			if (amGloble.userinfo.sessionid) {
				//已登陆
//				ADB.trackAction("Goto 'Owner Manual'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Menu",
//					"Username" : amGloble.userinfo.username,
//
//				});
				$.am.changePage(amGloble.page.knowledge_ownerManual, "");
			} else {
				$.am.changePage(amGloble.page.login_login, "", {
					from : amGloble.page.knowledge_ownerManual
				});
			}
			self.hide();
			return false;
		});
		this.$.find("#slideBar_phasebook").vclick(function() {
//			ADB.trackAction("Goto 'SYNC Phrasebook'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			if (amGloble.setting.market.code == "JP"){
				$.am.changePage(amGloble.page.knowledge_phasebook_JP, "");
				self.hide();
				return false;
			}
			$.am.changePage(amGloble.page.knowledge_phasebook, "");
			self.hide();
			return false;
		});
		this.$.find("#slideBar_userGuider").vclick(function() {
//			ADB.trackAction("Goto 'SYNC Support'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu"
//				//"Username" : amGloble.userinfo.username,
//
//			});
			emap.inAppBrowser({
			    url: amGloble.setting.lang.sync
			});
			return false;
		});

		this.$.find("#slideBar_video").vclick(function() {
//			ADB.trackAction("Goto 'Ford How-to Videos'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu"
//				//"Username" : amGloble.userinfo.username,
//				//"Bussiness Data" : {
//				//	"Vehicle VIN " : amGloble.userinfo.profile.user_vehicles[0].vin,
//				//}
//
//			});

			emap.getConnectionInfo({}, function (ret) {
			    if (ret != "wifi") {
			        emap.alert({
			            caption: "",
			            description: i18n.KNOWLEDGE_CENTRE_WIFI_WARNING,
			            okCaption: i18n.KNOWLEDGE_CENTRE_WIFI_WARNING_OK
			        }, function () {
			            emap.inAppBrowser({
			                url: amGloble.setting.lang.video
			            });
			        });
			    }
			    else {
			        emap.inAppBrowser({
			            url: amGloble.setting.lang.video
			        });
			    }

			    emap.getConnectionInfo();
			});

			return false;
		});

		this.$.find("#slideBar_reecall").vclick(function() {
//			ADB.trackAction("Goto 'Recall Lookup'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Menu",
//				"Username" : amGloble.userinfo.username,
//
//			});
			$.am.changePage(amGloble.page.recall_main, "");
			self.hide();
		});

		this.$.find("#slideBar_notification").vclick(function() {
			$.am.changePage(amGloble.page.notification_list, "");
			self.hide();
		});

		this.$.find("#slideBar_setting").vclick(function() {
			$.am.changePage(amGloble.page.setting_main, "");
			self.hide();
		});
		this.$.find("#slideBar_fuyu").vclick(function() {
			if (amGloble.fyuserinfo.accessToken) {
				//已登陆
				$.am.changePage(amGloble.page.fuyu_dashboard, "");
			} else {
				$.am.changePage(amGloble.page.fuyu_login, "", {
					from : amGloble.page.fuyu_dashboard
				});
			}
			self.hide();
		});

	},
	beforeShow : function(data) {
		var modules = {};
		$.each(amGloble.setting.market.modules, function(i, item) {
			modules[item] = 1;
		});

		// console.log("beforeShow");
		if (amGloble.userinfo.profile && (amGloble.setting.market.code != "KR" && amGloble.setting.market.code != "JP")) {
			this.$.find("#slideBar_name").html(i18n.SLIDEBAR_TEXT0 + ", " + amGloble.userinfo.profile.firstname + " " + amGloble.userinfo.profile.lastname);
		} else {
			this.$.find("#slideBar_name").html(i18n.SLIDEBAR_TEXT0);
		}

		//hide this menu for AU only
		if (amGloble.setting.market.code == "IN" || amGloble.setting.market.code == "NZ" || amGloble.setting.market.code == "TH" || amGloble.setting.market.code == "PH" || amGloble.setting.market.code == "VN"){
			this.$.find("#slideBar_reecall").show();
		}
		else {
			this.$.find("#slideBar_reecall").hide();
		}

		if (modules.fuyu) {
			this.$.find("#slideBar_fuyu").show();
		} else {
			this.$.find("#slideBar_fuyu").hide();
		}
                                           
     if (amGloble.setting.market.code == "VN"){
       this.$.find("#slideBar_assist").hide();
     }

		if (amGloble.userinfo.sessionid) {
			//已登陆
			this.$.find("#slideBar_profile").removeClass("am-disabled");
			this.$.find("#slideBar_checklist").removeClass("am-disabled");
			this.$.find("#slideBar_notification").removeClass("am-disabled");
			//notification
			var notificationNum = amGloble.api.getUnreadNotificationNum();
			if (notificationNum) {
				this.$.find("#slideBar_notification .badge").html(notificationNum).show();
			} else {
				this.$.find("#slideBar_notification .badge").hide();
			}
		} else {
			this.$.find("#slideBar_profile").addClass("am-disabled");
			this.$.find("#slideBar_checklist").addClass("am-disabled");
			this.$.find("#slideBar_notification").addClass("am-disabled");
			this.$.find("#slideBar_notification .badge").hide();
		}

		if (amGloble.setting.market.code == "KR"){
			this.$.find("#slideBar_profile").hide();
			this.$.find("#slideBar_notification").hide();
			this.$.find("#slideBar_knowledgeCenter").hide();
			this.$.find("#slideBar_checklist").removeClass("am-disabled");
		}

		if (amGloble.setting.market.code == "JP"){
			this.$.find("#slideBar_profile").hide();
			this.$.find("#slideBar_assist").hide();
			this.$.find("#slideBar_checklist").hide();
			this.$.find("#slideBar_notification").hide();
			this.$.find("#slideBar_ownerManual").hide();
		}

	},
	afterShow : function(data) {
		// console.log("afterShow");
		this.scrollview.refresh();
	},
	beforeHide : function(data) {
		// console.log("beforeHide");
	},
	afterHide : function(data) {
		// console.log("afterHide");
	}
});
