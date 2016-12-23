/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.notification_detail = new $.am.Page({
		id : "notification_detail",

		init : function() {
		},
		backButtonOnclick : function() {
			$.am.changePage(amGloble.page.notification_list, "slideright", {
				"noRefresh" : from == "js" ? true : false,
				"idx" : offerIdx,
				"favStatus" : favStatus
			});
		},
		//before page show
		beforeShow : function(params) {
			//console.log(params);
			from = params.from;
			var that = this;
			var paras = params.detail;
			favStatus = false;

			offerIdx = 0;

			if (from == "js") {
//				ADB.trackAction("View one notification", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Notification Center",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Category" : "Special offer",
//						"Offer Number" : paras.offerNumber
//					}
//				});
				offerIdx = params.idx;

				this.generatePage(paras);
			} else if (from == "native") {
				var id = params.detail;
//				ADB.trackAction("Check one OS message", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Category" : "Special offer",
//						"Offer Number" : id
//					}
//				});
				console.log("offer number:" + id);
				var url;
				url = amGloble.setting.lang.host + "/servlet/rest/hotdeals/" + amGloble.setting.lang.site + "/hotdeal/" + id;
				amGloble.loading.show();
				$.ajax({
					url : url, //接口url
					type : "POST",
					contentType : "application/json",
					timeout : amGloble.setting.market.timeout || 30000,
					success : function(ret) {
						amGloble.loading.hide();
						var obj = JSON.parse(ret);
						if (obj.hotdeal)
							that.generatePage(obj.hotdeal);
					},
					error : function(ret) {
						amGloble.loading.hide();
						amGloble.msg(i18n.NOTIFICATIONS_ERRMSG1);
					}
				});
			}

			var data = amGloble.generateTrackData(
                "owner app:service:notification",
                "",
                "",
                "",
                "service:notification:detail",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackAction("owner app:service:notification:special offer:detail",data);

		},

		generatePage : function(paras) {
			if (localStorage) {
				favNotification = JSON.parse(localStorage.getItem("favNotification"));
				if (favNotification == null)
					favNotification = [];
			};
			var server = amGloble.setting.lang.host;
			var root = this.$.find(".am-body-inner");
			var detail_self = this;

			root.empty();
			detail_self.scrollview && detail_self.scrollview.refresh();
			detail_self.scrollview && detail_self.scrollview.scrollTo('top');

			this.$.find("#findDealerButton").remove();
			if (paras.offerImage != null) {
				var img = $("<img class='notificationDetailBanner' src='" + server + paras.offerImageThumbnail + "' width='100%'>");

				img.load(function() {
					//console.log("onload:"+img.data("idx"));
					//detail_self.scrollview && detail_self.scrollview.scrollTo('top');
					detail_self.scrollview && detail_self.scrollview.refresh();
				}).error(function() {
					//detail_self.scrollview && detail_self.scrollview.scrollTo('top');
					detail_self.scrollview && detail_self.scrollview.refresh();
				});
				img.appendTo(root);
			}
			var div = $("<div class='notificationDetailText'>");
      var isChina = (amGloble.setting.market.name=="China");
      if(isChina){
        div.text(new Date(paras.creationDate).format("yyyy-mm-dd")).appendTo(root);
      }
      else{
        div.text(new Date(paras.creationDate).format("dd mmm yyyy")).appendTo(root);
      }
			div = $("<div class='notificationDetailTitle'/>");
			div.text(paras.title).appendTo(root);
			div = $("<div class='notificationDetailText'/>");
			div.text(paras.headerText).appendTo(root);
			div = $("<div class='notificationDetailText'/>");
			var tmp = paras.description.replace(/\n/g, "").replace(/\r/g, "").split("||");
			var ul = $("<ul/>");
			for (var i = 0; i < tmp.length; i++) {
				ul.append("<li>" + tmp[i] + "</li>");
			}
			ul.appendTo(div);
			div.appendTo(root);
			div = $("<div class='notificationDetailText'/>");
                        var expiryTime = new Date(paras.expiryDate).getTime();
			if (expiryTime< 4099737600000) {
        if(isChina){
        div.text(i18n.NOTIFICATIONS_DETAIL_DUEDATE + new Date(paras.expiryDate).format("yyyy-mm-dd")).appendTo(root);
        }
        else{
        div.text(i18n.NOTIFICATIONS_DETAIL_DUEDATE + new Date(paras.expiryDate).format("dd mmm yyyy")).appendTo(root);
        }
			
                         }
			var currentTimestamp = new Date().getTime();
			if (paras.expiryDate < currentTimestamp)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_EXPIRED?i18n.NOTIFICATIONS_EXPIRED:"Expired")+"</div>").appendTo(root);
			else if (paras.expiryDate - currentTimestamp > 345600000 && paras.expiryDate - currentTimestamp <= 432000000)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_LAST_5_DAYS?i18n.NOTIFICATIONS_LAST_5_DAYS:"Last 5 days")+"</div>").appendTo(root);
			else if (paras.expiryDate - currentTimestamp > 259200000 && paras.expiryDate - currentTimestamp <= 345600000)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_LAST_4_DAYS?i18n.NOTIFICATIONS_LAST_4_DAYS:"Last 4 days")+"</div>").appendTo(root);
			else if (paras.expiryDate - currentTimestamp > 172800000 && paras.expiryDate - currentTimestamp <= 259200000)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_LAST_3_DAYS?i18n.NOTIFICATIONS_LAST_3_DAYS:"Last 3 days")+"</div>").appendTo(root);
			else if (paras.expiryDate - currentTimestamp > 86400000 && paras.expiryDate - currentTimestamp <= 172800000)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_LAST_2_DAYS?i18n.NOTIFICATIONS_LAST_2_DAYS:"Last 2 days")+"</div>").appendTo(root);
			else if (paras.expiryDate - currentTimestamp <= 86400000)
				$("<div class='notificationDetailTextRed'>"+(i18n.NOTIFICATIONS_LAST_1_DAY?i18n.NOTIFICATIONS_LAST_1_DAY:"Last 1 day")+"</div>").appendTo(root);
			var favourButton;
			if ($.inArray(paras.offerNumber, favNotification) == -1) {
				favourButton = $("<div class='am-clickable icon-unfavour'/>");
				favStatus = false;
			} else {
				favourButton = $("<div class='am-clickable favourButton'/>");
				favStatus = true;
			}
			favourButton.appendTo(root);
			$("<div class='am-clickable bottombutton am-placeholder' style='position: absolute; bottom:0px;' id='findDealerButton'>" + i18n.NOTIFICATIONS_DETAIL_FINDDEALER + "</div>").appendTo(root.parent().parent());
			this.$.find("#findDealerButton").unbind("vclick").vclick(function() {
				$.am.changePage(amGloble.page.dealer_listview, "slideleft");
			});
			favourButton.unbind("vclick").vclick(function() {
				if ($(this).hasClass("favourButton")) {
//					ADB.trackAction("Unfavor", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "Offer Detail Page",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Category" : "Special Offer",
//							"Offer Number" : paras.offerNumber,
//							"Flag" : "Unfavor"
//						}
//					});
					favNotification.splice($.inArray(paras.offerNumber, favNotification), 1);
					$(this).removeClass("favourButton").addClass("icon-unfavour");
					favStatus = false;

				} else {
//					ADB.trackAction("Favor", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "Offer Detail Page",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Category" : "Special Offer",
//							"Offer Number" : paras.offerNumber,
//							"Flag" : "Favor"
//						}
//					});
					favNotification.push(paras.offerNumber);
					$(this).removeClass("icon-unfavour").addClass("favourButton");
					favStatus = true;
				}
				if (localStorage) {
					localStorage.setItem("favNotification", JSON.stringify(favNotification));
				}
			});

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
