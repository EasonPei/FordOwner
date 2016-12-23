/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.dashboard_main_skjp = new $.am.Page({
		id : "dashboard_main_skjp",

		init : function() {
			var self = this;

			var w = window.innerWidth > 500 ? 500 : window.innerWidth;

			this.backButtonOnclick = function() {
				try {
					emap.bringToBack();
				} catch(e) {
				}
			};

			this.$loginBlock = this.$.find("#dashboard_loginBlock");

			//var $btns = this.$.find(".mainMenu td");
			this.$.find("#td0").vclick(function() {
//				ADB.trackAction("Goto 'Dealer Locator'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Dashboard",
//					"Username" : amGloble.userinfo.username,
//
//				});
				if(amGloble.setting.market.code == "KR"){
					emap.inAppBrowser({
				            url: "http://m.ford-korea.com/research/dealer-locate"
				        });
				}
				else{
					$.am.changePage(amGloble.page.dealer_listview, "slideleft");
				}
			});
			this.$.find("#td1").vclick(function() {
//				ADB.trackAction("Goto 'Call Center'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Dashboard",
//					"Username" : amGloble.userinfo.username,
//
//				});
				$.am.changePage(amGloble.page.contact_callCenter, "slideleft");
			});
			this.$.find("#td2").vclick(function() {
//				ADB.trackAction("Goto 'Roadside Assist'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Dashboard",
//					"Username" : amGloble.userinfo.username,
//
//				});
				$.am.changePage(amGloble.page.contact_roadsideAssistance, "slideleft");
			});
			this.$.find("#td2_1").vclick(function() {
				$.am.changePage(amGloble.page.knowledge_indicatorIcons_JP, "slideleft");
			});
			this.$.find("#td3").vclick(function() {
			    self.toCheckListPage();
			});
			this.$.find("#td3_1").vclick(function() {
			    $.am.changePage(amGloble.page.knowledge_phasebook_JP, "slideleft");
			});
			this.$.find("#td4").vclick(function() {
				$.am.changePage(amGloble.page.knowledge_indicatorIcons_KR, "slideleft");
			});
			this.$.find("#td4_1").vclick(function() {
				//how to video
//				ADB.trackAction("Goto 'Ford How-to Videos'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Dashboard"
//					//"Username" : amGloble.userinfo.username,
//					//"Bussiness Data" : {
//					//	"Vehicle VIN " : amGloble.userinfo.profile.user_vehicles[0].vin,
//					//}
//
//				});

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
			});
			this.$.find("#td5").vclick(function() {
				emap.inAppBrowser({
				    url: amGloble.setting.lang.sync
				});
			});

			this.$dealer = this.$.find("#td0");

		},

		toCheckListPage : function() {
			if (amGloble.setting.market.code == "AU") {
				$.am.changePage(amGloble.page.service_checklist_au, "slideleft");
			}
			else if(amGloble.setting.market.code == "KR"){
				$.am.changePage(amGloble.page.service_checklist_KR, "slideleft", {
						vin : ""
					});
			}
			 else {
				var userVehicles = amGloble.userinfo.profile.user_vehicles;
                userVehicles = $.grep(userVehicles, function(vehicle){
                    var model = vehicle.model;
                    if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[model]){
                        model = amGloble.setting.lang.modelcode[model];
                    }
                    return model != "Other Ford Vehicle";
                });

                if (userVehicles.length > 0) {
                	$.am.changePage(amGloble.page.service_checklist, "slideleft", {
						vin : self.vin
					});
                }
                else{
					emap.alert({
						caption : i18n.CHECKLIST_TITLE,
						description : i18n.CHECKLIST_NOT_AVAILABLE_FOR_YOUR_MODEL?i18n.CHECKLIST_NOT_AVAILABLE_FOR_YOUR_MODEL:"Sorry, the Service Checklist is not available for your ford model.",
						okCaption : i18n.CHECKLIST_OK?i18n.CHECKLIST_OK:"OK"
					}, function() {
					});
                }
				
			}
		},
		//before page show
		beforeShow : function(paras) {
			var self = this;

            var isJapan = (amGloble.setting.market.code == "JP");
            if(isJapan){
                this.$.addClass("Japan");
            }
            var isKorea = (amGloble.setting.market.code == "KR");
            if(isKorea){
                this.$.addClass("Korea");
            }

			this.$loginBlock.show();
			this.$dealer.find("img").attr("src", "img/dashboard/menuIcon1.png");
			this.$dealer.find(".title").html(i18n.DASHBOARD_MAIN_DEALERLOCATOR);
			amGloble.tag.closePNS();

			if(isKorea){
                amGloble.userinfo = JSON.parse("{\"username\":\"fordguest\",\"password\":\"\",\"sessionid\":\"fake session\",\"profile\":{\"city\":\"\",\"email\":\"\",\"event_activities_invitations\":false,\"firstname\":\"\",\"forum_nickname\":\"\",\"information_for_owners\":false,\"is_partial_profile\":false,\"lastname\":\"\",\"legal_agreement\":true,\"min\":\"\",\"news_and_announcements\":false,\"offers_via_email\":false,\"postal_code\":\"\",\"preferred_language\":\"ko\",\"special_offers_and_discounts\":false,\"state\":\"00\",\"street\":\"street\",\"terms_and_conditions\":true,\"title\":\" 0002\",\"user_vehicles\":[{\"primary_vehicle_id\":\"Y\",\"vehicle_nickname\":\"Ford Vehicle\",\"vehicle_vin\":\"Ford_Vehicle\",\"vehiclename\":\"Ford Vehicle\",\"vin\":\"Ford_Vehicle\",\"imageurl\":null,\"model\":\"Ford Vehicle\",\"modelyear\":\"2015\",\"loaded\":true}],\"username\":\"fordguest\"}}");
            }
            else if(isJapan){
            	amGloble.userinfo = JSON.parse("{\"username\":\"fordguest\",\"password\":\"\",\"sessionid\":\"fake session\",\"profile\":{\"city\":\"\",\"email\":\"\",\"event_activities_invitations\":false,\"firstname\":\"\",\"forum_nickname\":\"\",\"information_for_owners\":false,\"is_partial_profile\":false,\"lastname\":\"\",\"legal_agreement\":true,\"min\":\"\",\"news_and_announcements\":false,\"offers_via_email\":false,\"postal_code\":\"\",\"preferred_language\":\"ja\",\"special_offers_and_discounts\":false,\"state\":\"00\",\"street\":\"street\",\"terms_and_conditions\":true,\"title\":\" 0002\",\"user_vehicles\":[{\"primary_vehicle_id\":\"Y\",\"vehicle_nickname\":\"Ford Vehicle\",\"vehicle_vin\":\"Ford_Vehicle\",\"vehiclename\":\"Ford Vehicle\",\"vin\":\"Ford_Vehicle\",\"imageurl\":null,\"model\":\"Ford Vehicle\",\"modelyear\":\"2015\",\"loaded\":true}],\"username\":\"fordguest\"}}");
            }
			  
      
			var baseImgUrl = "carphoto/" + amGloble.setting.market.code + "/";
			self.$.find(".loginBlock img").attr("src", baseImgUrl + "default.jpg");

			var data = amGloble.generateTrackData(
				"owner app:dashboard",
				"",
				"",
				"",
				"",
				true,
				false,
				false,
				false,
				false);
			amGloble.trackPage("owner app:dashboard",data);
		},

		//after page show
		afterShow : function() {
			amGloble.api.checkVersionUpdate();
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		}
	});

})();
