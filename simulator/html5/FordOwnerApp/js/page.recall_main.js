/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.recall_main = new $.am.Page({
		id : "recall_main",

		init : function() {
		},
		//before page show
		beforeShow : function(paras) {
			self = this;
			if (amGloble.userinfo.profile != null) {
				if (amGloble.userinfo.profile.user_vehicles.isLoaded) {
					this.$.find(".am-body-inner").empty();
					this.generateRecallPage();

				} else
					try {
						amGloble.api.getVehicle(function(ret) {
							self.$.find(".am-body-inner").empty();
							self.generateRecallPage();

						}, function(ret) {
							var root = self.$.find(".am-body-inner");
							root.empty();
							var ul = $("<ul class='functionlist'/>");
							ul.appendTo(root);
							self.generateRecallSearchPart(ul);
						});
					} catch(e) {
						var root = self.$.find(".am-body-inner");
						root.empty();
						var ul = $("<ul class='functionlist'/>");
						ul.appendTo(root);
						self.generateRecallSearchPart(ul);

					}
			} else {
				var root = self.$.find(".am-body-inner");
				root.empty();
				var ul = $("<ul class='functionlist'/>");
				ul.appendTo(root);
				self.generateRecallSearchPart(ul);
			}

			var data = amGloble.generateTrackData(
                    "owner owner app:owner support:recall",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackPage("owner app:owner support:recall",data);
		},

		//after page show
		afterShow : function() {
		},
		//before page hide
		beforeHide : function() {

		},
		//after page hide
		afterHide : function() {
		},
		generateRecallPage : function() {
			var root = this.$.find(".am-body-inner");
			var vehicles = amGloble.userinfo.profile.user_vehicles;
			var ul = $("<ul class='functionlist'/>");
			for (var i = 0; i < vehicles.length; i++) {
				var v = vehicles[i];
				var li = $("<li class='am-clickable'/>");
				$("<span class='lasticon'/>").appendTo(li);
				$("<span class='firsticon icon-vehicle'/>").appendTo(li);
				$("<p>" + v.vehiclename + "</p>").appendTo(li);
				li.appendTo(ul);
				li.data("idx", i);
			}
			ul.appendTo(root);
			self.generateRecallSearchPart(ul);

		},
		generateRecallSearchPart : function(ul) {
			var li = $("<li class='am-clickable noborder'/>");
			$("<span class='lasticon'/>").appendTo(li);
			$("<span class='firsticon'/>").append("VIN").appendTo(li);
      $("<p>"+(i18n.RECALL_FIND_BY_VIN?i18n.RECALL_FIND_BY_VIN:"Find by VIN")+"</p>").appendTo(li);
			li.appendTo(ul);
			var div = $("<div class='findvin-detail'/>");
			var dl = $("<dl class='smswitch'/>");
			$("<dd id='smswitch10' class='focused am-clickable'>" + i18n.RECALL_LOOKUP_SCAN + "<span class='arrow-bluegray-down'></span></dd>").appendTo(dl);
			$("<dd id='smswitch11' class='am-clickable'>" + i18n.RECALL_LOOKUP_INPUT + "<span ></span></dd>").appendTo(dl);
			dl.appendTo(div);
			dl = $("<dl class='formline-lasticon'/>");
			$("<dd class='lasticonli'><span class='am-clickable icon-scan'></span></dd>").appendTo(dl);
			$("<dd class='iconli'>VIN</dd>").appendTo(dl);
                                            $("<dd class='inputli'><input name='' type='text' placeholder='" + (i18n.SIGNUP_VEHICLE_VINCODE?i18n.SIGNUP_VEHICLE_VINCODE:"VIN code") + "'></dd>").appendTo(dl);
			dl.appendTo(div);
			$("<div class='am-clickable how-findvin'>" + i18n.RECALL_LOOKUP_HOWTOFINDVIN + "</div>").appendTo(div);
			$("<div class='am-clickable bluebutton'>" + i18n.RECALL_LOOKUP_SEARCH + "</div>").appendTo(div).unbind("vclick").vclick(function() {
				var input = li.find(".inputli input");
				var val = input.val();
				var reg = /^[A-Za-z0-9]*$/;
				if ($.trim(val) == "") {
					amGloble.msg(i18n.RECALL_LOOKUP_ERRMSG1);
					return false;
				}else if ($.trim(val).length != 17 || !reg.test($.trim(val))) {
					amGloble.msg(i18n.RECALL_LOOKUP_ERRMSG3);
					return false;
				}else {
					li.parent().find(".mymustang-detail").remove();
					li.parent().find(".norecall").remove();
					amGloble.loading.show();

					var data = amGloble.generateTrackData(
	                    "owner owner app:owner support:recall",
	                    "",
	                    "",
	                    "",
	                    "recall:search",
	                    false,
	                    false,
	                    false,
	                    false,
	                    false);
            		amGloble.trackAction("owner owner app:owner support:recall:search",data);

					$.ajax({
						url : amGloble.setting.lang.host + "/servlet/rest/gcamp/process/" + amGloble.setting.lang.site + "/" + val, //接口url
						type : "GET",
						contentType : "application/json",
						timeout : amGloble.setting.market.timeout || 30000,
						success : function(ret) {
							amGloble.loading.hide();
							//ret = "{\"items\":[{\"fsaDescription\":\"LFSA FOR EXTERNAL INTERFACE TESTING\",\"fsaNumber\":\"14S39E\",\"recall date\":\"2014-12-06T06:38:43Z\"},{\"fsaDescription\":\"LFSA FOR EXTERNAL INTERFACE TESTING\",\"fsaNumber\":\"15S39F\",\"recall date\":\"2014-12-05T13:24:53Z\"}],\"status\":{\"errNumber\":\"00\",\"responseMessage\":\"Data not Found\"}}";
							var content = JSON.parse(ret);

							var result;
							if (content.status.errNumber == "00" && content.items.length > 0)
								result = self.generateRecallResult(content.items, val);
							else {
								result = self.generateNoResult();
							}
							li.append(result);

						},
						error : function(ret) {
							amGloble.loading.hide();
							result = self.generateNoResult();
							li.append(result);

						}
					});
					return false;
				}
			});
			div.appendTo(li);
			div.hide();
			li.find("input").attr("readonly", "readonly");
			ul.find("li").unbind("vclick").vclick(function() {
				$(this).parent().find(".mymustang-detail").remove();
				$(this).parent().find(".norecall").remove();
				if ($(this).find(".lasticon").hasClass("button-arrow-down")) {
					$(this).find(".lasticon").removeClass("button-arrow-down");
					$(this).find("div").first().hide();
					self.scrollview && self.scrollview.refresh();
					return false;
				} else {
					if ($(this).hasClass("noborder")) {
						$(this).parent().find(".lasticon").removeClass("button-arrow-down");
						$(this).parent().find("li div").first().hide();
						$(this).find(".lasticon").addClass("button-arrow-down");
						$(this).find("div").first().show();
						$(this).find("input").val("");
						self.scrollview && self.scrollview.refresh();
						return false;
					} else {
						var idx = $(this).data("idx");
						amGloble.loading.show();
						var li_self = $(this);
						
						var item = amGloble.userinfo.profile.user_vehicles[idx];
						var data = amGloble.generateTrackData(
								"owner owner app:owner support:recall",
								item.modelyear,
								item.model,
								"",
								"recall:expand:vehicle",
								false,
								false,
								false,
								false,
								false);
						amGloble.trackAction("owner owner app:owner support:recall:"+item.model,data);

						$.ajax({
							url : amGloble.setting.lang.host + "/servlet/rest/gcamp/process/" + amGloble.setting.lang.site + "/" + amGloble.userinfo.profile.user_vehicles[idx].vin, //接口url
							type : "GET",
							contentType : "application/json",
							timeout : amGloble.setting.market.timeout || 30000,
							success : function(ret) {
								amGloble.loading.hide();
								//ret = "{\"items\":[{\"fsaDescription\":\"LFSA FOR EXTERNAL INTERFACE TESTING\",\"fsaNumber\":\"14S39E\",\"recall date\":\"2014-12-06T06:38:43Z\"},{\"fsaDescription\":\"LFSA FOR EXTERNAL INTERFACE TESTING\",\"fsaNumber\":\"15S39F\",\"recall date\":\"2014-12-05T13:24:53Z\"}],\"status\":{\"errNumber\":\"00\",\"responseMessage\":\"Data not Found\"}}";
								var content = JSON.parse(ret);

								li_self.parent().find(".mymustang-detail").remove();
								li_self.parent().find(".norecall").remove();
								li_self.parent().find(".lasticon").removeClass("button-arrow-down");
								li_self.parent().find("li div").first().hide();
								li_self.find(".lasticon").addClass("button-arrow-down");

								var result;
								if (content.status.errNumber == "00" && content.items.length > 0)
									result = self.generateRecallResult(content.items, amGloble.userinfo.profile.user_vehicles[idx].vin);
								else {
									result = self.generateNoResult();
								}
								li_self.append(result);
								li_self.find("div").first().show();

							},
							error : function(ret) {
								amGloble.loading.hide();
								li_self.parent().find(".lasticon").removeClass("button-arrow-down");
								li_self.parent().find("li div").first().hide();
								li_self.find(".lasticon").addClass("button-arrow-down");
								li_self.find("div").first().show();
								result = self.generateNoResult();
								li_self.append(result);
								li_self.find("div").first().show();
							}
						});
						return false;
					}
				}

			});
			li.find(".how-findvin").unbind("vclick").vclick(function() {
				amGloble.popup.findVin.enableInnerClose = true;
				amGloble.popup.findVin.show();
				self.scrollview && self.scrollview.refresh();

				var data = amGloble.generateTrackData(
                    "owner owner app:owner support:recall",
                    "",
                    "",
                    "",
                    "recall:popup:find vin",
                    false,
                    false,
                    false,
                    false,
                    false);
            	amGloble.trackAction("owner owner app:owner support:recall:find vin",data);
				return false;
			});
			ul.find("li div").first().unbind("vclick").vclick(function() {
				return false;
			});
			li.find(".smswitch .am-clickable").unbind("vclick").vclick(function() {
				var button = $(this);
				$(".focused", button.parent()).removeClass("focused");
				button.addClass("focused");
				button.parent().find(".arrow-bluegray-down").removeClass("arrow-bluegray-down");
				button.find("span").addClass("arrow-bluegray-down");

				var id = button.attr("id");
				var input = li.find(".inputli input");
				input.val("");
				var category = "scan";
				if (id == "smswitch11")// Manual input
				{
					input.removeAttr("readonly");
					li.find(".icon-scan").hide();
					category = "manual";
				} else {
					input.attr("readonly", "readonly");
					li.find(".icon-scan").show();
				}
				self.scrollview && self.scrollview.refresh();

				var data = amGloble.generateTrackData(
                    "owner owner app:owner support:recall",
                    "",
                    "",
                    "",
                    "recall:"+category+" vin",
                    false,
                    false,
                    false,
                    false,
                    false);
            	amGloble.trackAction("owner owner app:owner support:recall:"+category+" vin",data);
				return false;

			});
			li.find(".icon-scan").unbind("vclick").vclick(function() {
				if ( typeof emap != "undefined") {
                                                    
          var data = amGloble.generateTrackData(
                                                "owner owner app:owner support:recall",
                                                "",
                                                "",
                                                "",
                                                "scan:vin",
                                                false,
                                                false,
                                                false,
                                                false,
                                                false);
          amGloble.trackAction("vin scan",data);

					emap.barcode({
						mode : 3
					}, function success(ret) {

						li.find("input").val(ret.content);

					}, function error(ret) {
						if (ret.result == -5) {
							//权限受限
							amGloble.msg(i18n.SIGNUP_VEHICLE_DEVICE);
						} else {
							amGloble.msg(i18n.SIGNUP_VEHICLE_SCANERROR);
						}

						li.find("input").val("");
					});
				} else {
					amGloble.msg(i18n.SIGNUP_VEHICLE_DEVICE);
				}

				return false;
			});
		},
		generateRecallResult : function(recalls, vin) {
			var div = $("<div class='mymustang-detail'/>");
			var r = $("<div class='recalls'/>");
			$("<div class='warnblock'/>").html("<span class='icon-warning'></span>" + recalls.length + " recalls found").appendTo(r);
			for (var i = 0; i < recalls.length; i++) {
				$("<fieldset/>").html("<legend>" + recalls[i].fsaNumber + "</legend>" + recalls[i].fsaDescription).appendTo(r);
				if (i == recalls.length - 1)
					$("<span class='arrow-gray-down'/>").appendTo(r);
				else
					$("<div class='borderbottomline'/>").appendTo(r);

			}
			r.appendTo(div);
			var btn = $("<div class='am-clickable bluebutton'>" + i18n.NOTIFICATIONS_DETAIL_FINDDEALER + "</div>");
			btn.appendTo(div);
			$("<div class='comments'>" + i18n.RECALL_LOOKUP_DEALER_COMMENTS + "</div>").appendTo(div);
			div.unbind("vclick").vclick(function() {
				return false;
			});
			btn.unbind("vclick").vclick(function() {
//				ADB.trackAction("Find Dealer", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Recall Lookup",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Vehicle VIN " : vin,
//					}
//
//				});

				$.am.changePage(amGloble.page.dealer_listview, "slideleft");
				return false;
			});
			self.scrollview && self.scrollview.refresh();
			return div;

		},
		generateNoResult : function() {
			var div = $("<div class='norecall' />");
			$("<span class='icon-okgreen'/>").appendTo(div);
			$("<div>" + i18n.RECALL_LOOKUP_NORESULT_COMMENTS + "</div>").appendTo(div);
			div.unbind("vclick").vclick(function() {
				return false;
			});
			self.scrollview && self.scrollview.refresh();
			return div;
		}
	});

})();
