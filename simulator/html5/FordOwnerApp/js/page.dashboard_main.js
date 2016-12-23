/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.dashboard_main = new $.am.Page({
		id : "dashboard_main",

		init : function() {
			var self = this;

			var w = window.innerWidth > 500 ? 500 : window.innerWidth;

			this.backButtonOnclick = function() {
				try {
					emap.bringToBack();
				} catch(e) {
				}
			};

			this.topCarrousel = new $.am.Carrousel({
				id : "dashboard_topCarrousel",
				height : w / 640 * 485,
				autoSwitch : 0,
				onchange : function(i) {
					var item = this.$inner.find("li").eq(i).data("item");
					self.vin = item.vin;
					this.$.find("ul:last li:eq(" + i + ")").addClass("selected").siblings().removeClass("selected");
					var data = amGloble.generateTrackData(
								"owner app:dashboard:menu",
								item.modelyear,
								item.model,
								"",
								"home:menu swipe",
								true,
								false,
								false,
								false,
								false);
					amGloble.trackAction("owner app:dashboard:menu:swipe:"+item.model,data);
				}
			});

			this.$loginBlock = this.$.find("#dashboard_loginBlock");
			this.$topCarrousel = this.$.find("#dashboard_topCarrousel");
			this.$ul = this.$topCarrousel.find("ul.am-carrousel-inner");
			this.$li = this.$ul.children("li:first").remove();
			this.$li.on("vclick", ".notification", function() {
				$.am.changePage(amGloble.page.notification_list, "slideleft");
			});
			this.$li.on("vclick", ".reminder", function() {
				var $this = $(this);
				var reminder = $this.data("reminder");
				if (reminder) {
					$.am.changePage(amGloble.page.service_reminderDetail, "slideleft", {
						showReminder : reminder
					});
				} else {
					self.toCheckListPage();
				}
			});
			this.$dots = this.$ul.next();

			this.$loginBtn = this.$.find(".loginBtn").vclick(function() {
				$.am.changePage(amGloble.page.login_login, "slideleft");
			});
			this.$signUpBtn = this.$.find(".signUpBtn").vclick(function() {
				$.am.changePage(amGloble.page.signUp_account, "slideleft");
			});

			//var $btns = this.$.find(".mainMenu td");
			this.$.find("#td0").vclick(function() {
//				ADB.trackAction("Goto 'Dealer Locator'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Dashboard",
//					"Username" : amGloble.userinfo.username,
//
//				});
				$.am.changePage(amGloble.page.dealer_listview, "slideleft");
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
			this.$.find("#td3").vclick(function() {
			    if (amGloble.userinfo.sessionid) {
			        //已登陆
				    self.toCheckListPage();
				} else {
					$.am.changePage(amGloble.page.login_login, "slideleft");
				}
			});
			this.$.find("#td4").vclick(function() {
				$.am.changePage(amGloble.page.knowledge_indicatorIcons, "slideleft");
			});
			this.$.find("#td5").vclick(function() {
				amGloble.slideBar.main.show();
			});

			this.$dealer = this.$.find("#td0");

		},

		toCheckListPage : function() {
			var self = this;
			if (amGloble.setting.market.code == "AU") {
				$.am.changePage(amGloble.page.service_checklist_au, "slideleft");
			} else {
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

			var isVietnam = (amGloble.setting.market.code == "VN");
            if(isVietnam){
                this.$.addClass("Vietnam");
            }

			if (amGloble.userinfo.sessionid) {
				//已登陆

				this.$ul.empty();
				this.$dots.empty();
				//

				amGloble.api.getVehicle(function(ret) {
					console.log(ret);
					$.each(ret, function(i, item) {
						var $li = self.$li.clone(true, true);

						var baseImgUrl = "carphoto/" + amGloble.setting.market.code + "/";

						if (this.model) {
							var $img = $li.find(".background img").hide().attr("src", baseImgUrl + item.model + ".jpg");
							$img.bind("load", function() {
								$(this).show();
							}).bind("error", function() {
								$(this).attr("src", baseImgUrl + "default.jpg");
							});
						} else {
							$li.find(".background img").attr("src", baseImgUrl + "default.jpg");
						};
						$li.find(".name").html(item.vehiclename);
						$li.find(".vinNo").html("VIN NO. " + item.vin);

						self.$ul.append($li);
						self.$dots.append("<li></li>");

						//reminder
						var $reminder = $li.find(".reminder");
						var reminder = amGloble.api.getClosestReminder(item.vin);
						$reminder.data("reminder", reminder);
						if (reminder) {
							$reminder.find(".line2").hide();
							$reminder.find(".line3").show();
							var date = new Date(reminder.date);
							$reminder.find(".line3 .left").html(date.format("dd"));
							var isEnglish = (amGloble.setting.lang.i18n.indexOf("en") >= 0)
							 if(isEnglish){
							  $reminder.find(".line3 .right").html(date.format("mmm") + "<br>" + date.format("yyyy"));
							 }
							 else{
							  $reminder.find(".line3 .right").html(date.format("mm") + "<br>" + date.format("yyyy"));
							 }
							
						} else {
							$reminder.find(".line2").show();
							$reminder.find(".line3").hide();
							if(amGloble.setting.market.code == "TH"){
                				$reminder.find(".line2").hide();
                			}
							// $reminder.find(".line3 .left").html(0);
						}
						$reminder.find(".line1").html(i18n.DASHBOARD_MAIN_MID2);
						$reminder.find(".line2").html(i18n.DASHBOARD_MAIN_MID3);

						$li.data("item", item);

						if( i==0 ){
							var data = amGloble.generateTrackData(
								"owner app:dashboard:menu",
								item.modelyear,
								item.model,
								"",
								"",
								true,
								false,
								false,
								false,
								false);
							amGloble.trackPage("owner app:dashboard:menu:"+item.model,data);
						}

					});

					//notification
					var $notification = self.$ul.find(".notification");
					var notificationNum = amGloble.api.getUnreadNotificationNum();
					if (notificationNum) {
						$notification.find(".line1").addClass("icon1s");
						$notification.find(".line3 .left").html(notificationNum);
					} else {
						$notification.find(".line1").removeClass("icon1s");
						$notification.find(".line3 .left").html(0);
					}
					$notification.find(".line1").html(i18n.DASHBOARD_MAIN_MID1);

					self.topCarrousel.refresh();
				}, function(ret) {
					amGloble.loading.hide()
				});

				this.$loginBlock.hide();
				this.$topCarrousel.show();

				//favor
				var favor = JSON.parse(localStorage.getItem("favorite_dealer"));
				if (favor) {
					this.$dealer.find("img").attr("src", "img/dashboard/menuIcon1-2.png");
					this.$dealer.find(".title").html(favor.dealerInfo.dealershipName);
				} else {
					this.$dealer.find("img").attr("src", "img/dashboard/menuIcon1.png");
					this.$dealer.find(".title").html(i18n.DASHBOARD_MAIN_DEALERLOCATOR);
				}
				amGloble.tag.registerTag();

				// var data = amGloble.generateTrackData(
    //     		"owner app:dashboard:menu:<nameplate>",
    //     		"",
    //     		"",
    //     		"",
    //     		"",
    //     		"logInfo",
    //     		"",
    //     		"",
    //     		"",
    //     		"");
    //     		amGloble.trackPage("owner app:dashboard:menu:<nameplate>",data);

			} else {
				this.$loginBlock.show();
				this.$topCarrousel.hide();

				this.$dealer.find("img").attr("src", "img/dashboard/menuIcon1.png");
				this.$dealer.find(".title").html(i18n.DASHBOARD_MAIN_DEALERLOCATOR);
				amGloble.tag.closePNS();

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

			}

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
