/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {
	amGloble.page.notification_list = new $.am.Page({
		id : "notification_list",
		init : function() {
			var self = this;
			var input = this.$.find('input');

			this.$.find(".filterbutton").vclick(function() {
				// if(this.$.find(".filterpopbox").is(":hidden"))
				// this.$.find(".filterpopbox").show();
				self.$.find(".filterpopbox").toggle('normal');
				self.$.find(".searchpopbox").hide();
			});
			this.$.find(".searchbutton").vclick(function() {
				// if(this.$.find(".filterpopbox").is(":hidden"))
				// this.$.find(".filterpopbox").show();
				self.$.find(".searchpopbox").toggle('normal');
				self.$.find(".filterpopbox").hide();

				var data = amGloble.generateTrackData(
	                "owner app:service:notification",
	                "",
	                "",
	                "",
	                "service:notification:search",
	                false,
	                false,
	                false,
	                false,
	                false);
	            amGloble.trackAction("owner app:service:notification:search",data);
			});
			this.$.find(".filterpopbox li").vclick(function() {
				console.log($(this).data("filter"));
				self.$.find(".filterpopbox").toggle('normal');
				self.generateFilterList($(this).data("filter"));
			});
			this.scrollview.touchBottom = function() {
				console.log("bbbbn");
				if (!self._isLoading && !allLoad) {
					size = pageSize;
					self.generateNotificationListPage();
					amGloble.msg(i18n.NOTIFICATIONS_LOADNEXT);
				} else {
					amGloble.msg(i18n.NOTIFICATIONS_ALLPAGE);
				}

			};

			searchArray = [];
			input.bind('input propertychange', function() {
				var val = input.val();
				var tmpArray = [];
				if ($.trim(val) == "") {
					var resultList = self.$.find(".searchresults");
					resultList.empty();
					return false;
				}
				for (var i = 0; i < searchArray.length; i++) {
					if (searchArray[i].value.toLowerCase().indexOf(val.toLowerCase()) != -1)
						tmpArray.push(searchArray[i]);
					if (tmpArray.length > 4)
						break;
				}
				self.generateSearchResult(tmpArray, val);
			});
			this.$.find(".icon-clear").vclick(function() {
				input.val("");
				var resultList = self.$.find(".searchresults");
				resultList.empty();
				return false;
			});
			this.backButtonOnclick = function() {
				$.am.changePage(amGloble.page.getDashboardPage(), "slideright");
			};

		},
		//before page show
		beforeShow : function(paras) {
			self = this;
			ajaxError = false;

			if (paras && paras.noRefresh != undefined) {
				if (paras.noRefresh) {
					//self.generateNotificationListPage("All");
					var idx = paras.idx;
					var favStatus = paras.favStatus;
					var favBtn = $("#favBtn_" + idx);
					if (favBtn.hasClass("icon-unfavour") && favStatus)
						favBtn.removeClass("icon-unfavour").addClass("icon-favour");
					else if (favBtn.hasClass("icon-favour") && !favStatus)
						favBtn.removeClass("icon-favour").addClass("icon-unfavour");
					return;

				}
			}

			//hide this menu for AU only
			if (amGloble.setting.market.code != "AU"){
				this.$.find("#filter_recall").show();
			}
			else {
				this.$.find("#filter_recall").hide();
			}

			displayDeals = [];
			displayRecalls = [];
			dealsIdx = 0;
			recallsIdx = 0;
			size = 0;
			pageSize = 5;
			allLoad = false;
			if (localStorage) {
				favNotification = JSON.parse(localStorage.getItem("favNotification"));
				readedNotification = JSON.parse(localStorage.getItem("readedNotification"));
				favRecall = JSON.parse(localStorage.getItem("favRecall"));
				readedRecall = JSON.parse(localStorage.getItem("readedRecall"));
				if (favNotification == null)
					favNotification = [];
				if (readedNotification == null)
					readedNotification = [];
				if (favRecall == null)
					favRecall = [];
				if (readedRecall == null)
					readedRecall = [];
			};
			amGloble.loading.show();
			var vins = "";
			if (amGloble.userinfo.profile.user_vehicles.length == 1)
				vins = amGloble.userinfo.profile.user_vehicles[0].vin;
			else
				for (var i = 0; i < amGloble.userinfo.profile.user_vehicles.length; i++) {
					if (i == 0)
						vins = vins + amGloble.userinfo.profile.user_vehicles[i].vin;
					else
						vins = vins + "!" + amGloble.userinfo.profile.user_vehicles[i].vin;
				}
			var url;
			if (amGloble.setting.lang.site == "FOA" && $.trim(amGloble.userinfo.profile.postal_code) != "") {
				url = amGloble.setting.lang.host + "/servlet/rest/ownerapp/" + amGloble.setting.lang.site + "/offerandrecall/location/" + amGloble.userinfo.profile.postal_code + "/vin/" + vins;

			} else
				url = amGloble.setting.lang.host + "/servlet/rest/ownerapp/" + amGloble.setting.lang.site + "/offerandrecall/vin/" + vins;

			$.ajax({
				url : url, //接口url
				type : "POST",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				success : function(ret) {
					amGloble.loading.hide();
					var obj = JSON.parse(ret);
					if (obj.hotdeals)
						hotdeals = obj.hotdeals;
					else
						hotdeals = [];
					recalls = [];
					if (obj.recallList && obj.recallList.length > 0) {

						for (var i = 0; i < obj.recallList.length; i++) {
							var r = obj.recallList[i];
							if (r.items && r.items.length > 0) {
								$.merge(recalls, r.items);
							}
						}

					}
					// if (obj.recalls && obj.recalls.items)
					// recalls = obj.recalls.items;
					// else
					// recalls = [];
					if (hotdeals.length == 0 && recalls.length == 0)
						amGloble.msg(i18n.NOTIFICATIONS_ERRMSG2);
					else
						self.generateFilterList("All");
				},
				error : function(ret) {
					amGloble.loading.hide();
					//amGloble.msg();
					ajaxError = true;
					$.am.changePage(amGloble.page.common_oops, "slideleft", i18n.NOTIFICATIONS_ERRMSG1);
				}
			});

			var data = amGloble.generateTrackData(
                "owner app:service:notification",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:service:notification",data);

		},

		//after page show
		afterShow : function() {
			if (ajaxError)
				$.am.changePage(amGloble.page.common_oops, "slideleft", i18n.NOTIFICATIONS_ERRMSG1);

		},
		//before page hide
		beforeHide : function() {
			this.$.find(".filterpopbox").hide();
			this.$.find(".searchpopbox").hide();
		},
		//after page hide
		afterHide : function() {
		},
		generateFilterList : function(filter) {
			displayDeals = [];
			displayRecalls = [];
			dealsIdx = 0;
			recallsIdx = 0;
			size = pageSize;
			allLoad = false;
			var root = this.$.find(".am-body-inner");
			//console.log("height:" + root.height())
			//var self = this;
			root.empty();
			self.scrollview && self.scrollview.refresh();
			self.scrollview && self.scrollview.scrollTo('top');
			searchArray = [];
			allNotification = [];
			allRecall = [];
			if (filter == "All") {
				displayDeals = hotdeals;
				displayRecalls = recalls;
			} else if (filter == "Special") {
				displayDeals = hotdeals;
				displayRecalls = [];
			} else if (filter == "Recall") {
				displayDeals = [];
				displayRecalls = recalls;
			} else if (filter == "Fav") {

				for (var i = 0; i < hotdeals.length; i++) {
					if ($.inArray(hotdeals[i].offerNumber, favNotification) != -1)
						displayDeals.push(hotdeals[i]);
				}
				for (var i = 0; i < recalls.length; i++) {
					if ($.inArray(recalls[i].fsaNumber, favRecall) != -1)
						displayRecalls.push(recalls[i]);
				}
			} else if (filter == "Unread") {

				for (var i = 0; i < hotdeals.length; i++) {
					if ($.inArray(hotdeals[i].offerNumber, readedNotification) == -1)
						displayDeals.push(hotdeals[i]);
				}
				for (var i = 0; i < recalls.length; i++) {
					if ($.inArray(recalls[i].fsaNumber, readedRecall) == -1)
						displayRecalls.push(recalls[i]);
				}
			}

			var data = amGloble.generateTrackData(
                "owner app:service:notification",
                "",
                "",
                "",
                "service:notification:"+filter,
                false,
                false,
                false,
                false,
                false);
            amGloble.trackAction("owner app:service:notification:"+filter,data);

			self.generateNotificationListPage();
		},
		generateSearchResult : function(result, filter) {
			var resultList = this.$.find(".searchresults");
			resultList.empty();
			for (var i = 0; i < result.length; i++) {
				var li = $("<li class='am-clickable'/>");
				$("<span class='icon-specialoffer'></span>").appendTo(li);
				//console.log(result[i].value.replace(new RegExp(filter,"gm"), "<em>" + filter + "</em>"));
				li.append("<p style='display:block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis'>" + result[i].value.replace(new RegExp(filter, "gmi"), function(match) {
					//console.log(match)
					return "<em>" + match + "</em>";
				}) + "</p>");
				li.appendTo(resultList);
				li.data("idx", result[i].idx);
				li.unbind("vclick").vclick(function() {
					var idx = $(this).data("idx");
					if ($.inArray(hotdeals[idx].offerNumber, readedNotification) == -1) {
						readedNotification.push(hotdeals[idx].offerNumber);
						localStorage.setItem("readedNotification", JSON.stringify(readedNotification));
					}
					$("#newitem_" + hotdeals[idx].offerNumber).remove();
					$.am.changePage(amGloble.page.notification_detail, "slideleft", {
						"detail" : hotdeals[idx],
						"pageObj" : self,
						"from" : "js",
						"idx" : idx
					});
				});
			}

		},
		refreshPageAfterImageLoad : function() {
			needLoadImg--;
			//console.log(needLoadImg);
			if (needLoadImg <= 0) {
				console.log("Refresh page");
				self.scrollview && self.scrollview.refresh();
				//self.scrollview && self.scrollview.scrollTo('top');

			}

		},
		generateNotificationListPage : function() {
			var root = this.$.find(".am-body-inner");
			//console.log("height:" + root.height())
			//var self = this;
			// root.empty();
			// searchArray = [];
			// allNotification = [];
			// allRecall = [];
			var server = amGloble.setting.lang.host;
			var currentTimestamp = new Date().getTime();
			var k = 0;
			needLoadImg = 0;
			var imgs = [];
			// for (var i = 0; i < hotdeals.length; i++) {
			// if (hotdeals[i].offerImage != null) {
			// // if ($.inArray(hotdeals[i].offerImage, needLoadImgArray) == -1)
			// // needLoadImgArray.push(hotdeals[i].offerImage);
			// needLoadImg++;
			// }
			// }
			//needLoadImg=needLoadImgArray.length;

			for (dealsIdx; dealsIdx < displayDeals.length && size > 0; dealsIdx++) {
				var hotdeal = displayDeals[dealsIdx];
				if (hotdeal.offerNumber.indexOf("hd-") == 0)
					continue;
				allNotification.push(hotdeal.offerNumber);
				searchArray[searchArray.length] = {
					"value" : hotdeal.title+"<br/>"+hotdeal.headerText,
					"idx" : dealsIdx
				};
				if (dealsIdx > 0)
					$("<div class='blackbuleline'></div>").appendTo(root);

				if (hotdeal.offerImageThumbnail != null) {
					var img = $("<img width='100%'/>");
					img.load(function() {
						//console.log("onload:"+img.data("idx"));
						self.refreshPageAfterImageLoad();
					}).error(function() {
						self.refreshPageAfterImageLoad();
					});

					$("<div class='noticepic'/>").append(img).appendTo(root);
					img.data("idx", dealsIdx);
					img.unbind("vclick").vclick(function() {
						var idx = $(this).data("idx");

						console.log(hotdeals[idx].offerNumber);
						if ($.inArray(hotdeals[idx].offerNumber, readedNotification) == -1) {
							readedNotification.push(hotdeals[idx].offerNumber);
							$("#newitem_" + hotdeals[idx].offerNumber).remove();

							if (localStorage) {
								localStorage.setItem("readedNotification", JSON.stringify(readedNotification));
							}
						}

						$.am.changePage(amGloble.page.notification_detail, "slideleft", {
							"detail" : hotdeals[idx],
							"pageObj" : self,
							"from" : "js",
							"idx" : idx
						});

					});
					imgs.push(img);

				}
				var section = $("<section/>");
				var time = $("<time/>");
				var expiryTime = new Date(hotdeal.expiryDate).getTime();
        		var isChina = (amGloble.setting.market.name=="China");
				if (expiryTime < 4099737600000) {
					if (expiryTime < currentTimestamp)
            			$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_EXPIRED?i18n.NOTIFICATIONS_EXPIRED:"Expired")+"</span>").appendTo(time);
					else if (expiryTime - currentTimestamp > 345600000 && expiryTime - currentTimestamp <= 432000000)
						$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_LAST_5_DAYS?i18n.NOTIFICATIONS_LAST_5_DAYS:"Last 5 days")+"</span>").appendTo(time);
					else if (expiryTime - currentTimestamp > 259200000 && expiryTime - currentTimestamp <= 345600000)
						$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_LAST_4_DAYS?i18n.NOTIFICATIONS_LAST_4_DAYS:"Last 4 days")+"</span>").appendTo(time);
					else if (expiryTime - currentTimestamp > 172800000 && expiryTime - currentTimestamp <= 259200000)
						$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_LAST_3_DAYS?i18n.NOTIFICATIONS_LAST_3_DAYS:"Last 3 days")+"</span>").appendTo(time);
					else if (expiryTime - currentTimestamp > 86400000 && expiryTime - currentTimestamp <= 172800000)
						$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_LAST_2_DAYS?i18n.NOTIFICATIONS_LAST_2_DAYS:"Last 2 days")+"</span>").appendTo(time);
					else if (expiryTime - currentTimestamp <= 86400000)
						$("<span class='lastdays'>"+(i18n.NOTIFICATIONS_LAST_1_DAY?i18n.NOTIFICATIONS_LAST_1_DAY:"Last 1 day")+"</span>").appendTo(time);
					//time.append(new Date(hotdeal.expiryDate).format("dd mmm yyyy")).appendTo(section);
				} else {
					time.append("").appendTo(section);
				}

				if ($.inArray(hotdeal.offerNumber, readedNotification) == -1)
					$("<span class='newitem' id='newitem_" + hotdeal.offerNumber + "'></span>").appendTo(time);
				if(isChina){
					time.append(new Date(hotdeal.creationDate).format("yyyy-mm-dd")).appendTo(section);
				}
				else{
					time.append(new Date(hotdeal.creationDate).format("dd mmm yyyy")).appendTo(section);
				}
				
				$("<title>" + hotdeal.title + "</title>").appendTo(section);
				$("<p style='display:block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis'>" + hotdeal.headerText + "</p>").appendTo(section);
				var footer = $("<footer/>");
				if ($.inArray(hotdeal.offerNumber, favNotification) == -1)
					$("<span class='am-clickable lasticon icon-unfavour' id='favBtn_" + dealsIdx + "'></span>").appendTo(footer);
				else
					$("<span class='am-clickable lasticon icon-favour' id='favBtn_" + dealsIdx + "'></span>").appendTo(footer);
				$("<span class='firsticon icon-specialoffer'></span>").appendTo(footer);
				
				if (expiryTime < 4099737600000) {
					footer.append(i18n.NOTIFICATIONS_SPECIAL).appendTo(section);
				}else{
					footer.append(i18n.NOTIFICATIONS_NEWS).appendTo(section);
				}
				section.data("idx", dealsIdx);
				section.data("type", 1);
				section.appendTo(root);
				size--;

			}
			// if (size > 0)
				// for (recallsIdx; recallsIdx < displayRecalls.length && size > 0; recallsIdx++) {
					// var recall = displayRecalls[recallsIdx];
					// allRecall.push(recall.fsaNumber);
					// // searchArray[searchArray.length] = {
					// // "value" : recall.fsaDescription,
					// // "idx" : i
					// // };\
					// if (displayDeals.length > 0)
						// $("<div class='blackbuleline'></div>").appendTo(root);
					// else if (recallsIdx > 0)
						// $("<div class='blackbuleline'></div>").appendTo(root);
					// var section = $("<section/>");
					// var time = $("<time/>");
					// // if (hotdeal.expiryDate - currentTimestamp > 86400000 && hotdeal.expiryDate - currentTimestamp <= 172800000)
					// // $("<span class='lastdays'>Last 2 days</span>").appendTo(time);
					// // else if (hotdeal.expiryDate - currentTimestamp <= 86400000)
					// // $("<span class='lastdays'>Last 1 day</span>").appendTo(time);
					// if ($.inArray(recall.fsaNumber, readedRecall) == -1)
						// $("<span class='newitem' id='newitem_" + recall.fsaNumber + "'></span>").appendTo(time);
					// time.append(recall["recall date"]).appendTo(section);
					// $("<title>" + recall.fsaNumber + "</title>").appendTo(section);
					// $("<p style='display:block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis'>" + recall.fsaDescription + "</p>").appendTo(section);
					// var footer = $("<footer/>");
					// if ($.inArray(recall.fsaNumber, favRecall) == -1)
						// $("<span class='am-clickable lasticon icon-unfavour'></span>").appendTo(footer);
					// else
						// $("<span class='am-clickable lasticon icon-favour'></span>").appendTo(footer);
					// $("<span class='firsticon icon-recall'></span>").appendTo(footer);
					// footer.append(i18n.NOTIFICATIONS_RECALL).appendTo(section);
					// section.data("idx", recallsIdx);
					// section.data("type", 2);
					// section.appendTo(root);
					// size--;
// 
				// }

			this.$.find("section").unbind("vclick").vclick(function() {
				var idx = $(this).data("idx");
				var type = $(this).data("type");
				if (type != 1) {
//					ADB.trackAction("View one notification", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "Notification Center",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Category" : "Recall",
//							"Recall Number" : displayRecalls[idx].fsaNumber
//						}
//					});
				}
				if ($(this).find(".newitem").length > 0) {
					//console.log(hotdeals[idx].offerNumber);

					if (type == 1) {
						readedNotification.push(displayDeals[idx].offerNumber);
						$("#newitem_" + displayDeals[idx].offerNumber).remove();
					} else {
						readedRecall.push(displayRecalls[idx].fsaNumber);
						$("#newitem_" + displayDeals[idx].fsaNumber).remove();
					}
					if (localStorage) {
						localStorage.setItem("readedNotification", JSON.stringify(readedNotification));
						localStorage.setItem("readedRecall", JSON.stringify(readedRecall));
					}
				}
				if (type == 1)

					$.am.changePage(amGloble.page.notification_detail, "slideleft", {
						"detail" : displayDeals[idx],
						"pageObj" : self,
						"from" : "js",
						"idx" : idx
					});

			});
			this.$.find("section .lasticon").unbind("vclick").vclick(function() {
				var section = $(this).parent().parent();
				var idx = section.data("idx");
				var type = section.data("type");
				if ($(this).hasClass("icon-favour")) {

					$(this).removeClass("icon-favour").addClass("icon-unfavour");
					if (type == 1) {
//						ADB.trackAction("Unfavor", {
//							"Market" : amGloble.setting.lang.site,
//							"Language" : amGloble.setting.lang.code,
//							"Page" : "Notification Center",
//							"Username" : amGloble.userinfo.username,
//							"Bussiness Data" : {
//								"Category" : "Special Offer",
//								"Offer Number" : displayDeals[idx].offerNumber,
//								"Flag" : "Unfavor"
//							}
//						});
						favNotification.splice($.inArray(displayDeals[idx].offerNumber, favNotification), 1);
					} else {
//						ADB.trackAction("Unfavor", {
//							"Market" : amGloble.setting.lang.site,
//							"Language" : amGloble.setting.lang.code,
//							"Page" : "Notification Center",
//							"Username" : amGloble.userinfo.username,
//							"Bussiness Data" : {
//								"Category" : "Recall",
//								"Recall Number" : displayRecalls[idx].fsaNumber,
//								"Flag" : "Unfavor"
//							}
//						});
						favRecall.splice($.inArray(displayRecalls[idx].fsaNumber, favRecall), 1);
					}
				} else if ($(this).hasClass("icon-unfavour")) {

					$(this).removeClass("icon-unfavour").addClass("icon-favour");
					if (type == 1) {
//						ADB.trackAction("Favor", {
//							"Market" : amGloble.setting.lang.site,
//							"Language" : amGloble.setting.lang.code,
//							"Page" : "Notification Center",
//							"Username" : amGloble.userinfo.username,
//							"Bussiness Data" : {
//								"Category" : "Special Offer",
//								"Offer Number" : displayDeals[idx].offerNumber,
//								"Flag" : "Favor"
//							}
//						});
						favNotification.push(displayDeals[idx].offerNumber);
					} else {
//						ADB.trackAction("Favor", {
//							"Market" : amGloble.setting.lang.site,
//							"Language" : amGloble.setting.lang.code,
//							"Page" : "Notification Center",
//							"Username" : amGloble.userinfo.username,
//							"Bussiness Data" : {
//								"Category" : "Recall",
//								"Recall Number" : displayRecalls[idx].fsaNumber,
//								"Flag" : "Favor"
//							}
//						});
						favRecall.push(displayRecalls[idx].fsaNumber);
					}
				}
				if (localStorage) {
					localStorage.setItem("favNotification", JSON.stringify(favNotification));
					localStorage.setItem("favRecall", JSON.stringify(favRecall));
				}
				//console.log(hotdeals[idx].offerNumber);
				return false;
			});
			if (localStorage) {
				localStorage.setItem("allNotification", JSON.stringify(allNotification));
				localStorage.setItem("allRecall", JSON.stringify(allRecall));
			}
			// self.scrollview && self.scrollview.scrollTo('top');
			// self.scrollview && self.scrollview.refresh();
			needLoadImg = imgs.length;
			if (needLoadImg > 0)
				for (var i = 0; i < imgs.length; i++) {
					//img.attr("src", server + hotdeal.offerImage);
					var idx = imgs[i].data("idx");
					imgs[i].attr("src", server + displayDeals[idx].offerImageThumbnail);
				}
			else {
				self.scrollview && self.scrollview.refresh();
				//self.scrollview && self.scrollview.scrollTo('top');

			}
			if (size > 0)
				allLoad = true;
			else if (recallsIdx == displayRecalls.length && dealsIdx == displayDeals.length)
				allLoad = true;
			else
				allLoad = false;
		},
	});

})();
