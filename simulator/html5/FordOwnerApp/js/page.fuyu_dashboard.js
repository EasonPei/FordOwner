/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.fuyu_dashboard = new $.am.Page({
		id : "fuyu_dashboard",

		init : function() {
			var self = this;
			this.$couponBtn = this.$.find(".couponBtn").vclick(function() {
//				ADB.trackAction("Goto ‘FUYU Coupon Account’", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "FUYU Dashboard",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Coupon Category" : "Available Coupon",
//						"福域用户名" : amGloble.fyuserinfo.username
//					}
//				});
				$.am.changePage(amGloble.page.fuyu_coupon, "slideleft", self.couponData);
			});

			this.$ul = this.$.find(".recordList");
			this.$li = this.$ul.children(":first").remove();
			this.$li2 = this.$li.find(".subList > .menu-item:first").remove();

			this.$ul.on("vclick", ".title-item", function() {
				$(this).parent().toggleClass("extend");
				var p=$(this).parent();
				if (p.hasClass("extend")) {
//					ADB.trackAction("View 'Dealer Maintenance List'", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "FUYU Dashboard",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Vehicle VIN" : p.find(".menu-item").data("data").vin
//						}
//					});
				}
				self.refresh();
			});

			this.$ul.on("vclick", ".menu-item", function() {
				var $this = $(this);
				var data = $this.data("data");
//				ADB.trackAction("Goto 'FUYU Maintenance Record'", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "FUYU Dashboard",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Maintenance Record Category" :"Basic"
//						}
//					});
				$.am.changePage(amGloble.page.fuyu_repairDetail, "slideleft", data);

			});

			this.$.find(".right.button").vclick(function() {
				amGloble.fyuserinfo.accessToken = null;
				amGloble.fyuserinfo.isOwner = null;
				$.am.changePage(amGloble.page.fuyu_login, "slideright", {
					from : amGloble.page.fuyu_dashboard
				});

			});

			this.$.find(".addVin").vclick(function() {
				$.am.changePage(amGloble.page.fuyu_vin, "slideleft", {
					from : amGloble.page.fuyu_dashboard
				});
			});
		},
		//before page show
		beforeShow : function(paras) {
			if (paras == "back") {
				return false;
			}
			var $tips = this.$couponBtn.find(".line2");
			$tips.eq(0).html(0);
			$tips.eq(1).html(0);
			$tips.eq(2).html(0);
			var $ul = this.$ul.empty();
		},

		//after page show
		afterShow : function(paras) {
			var self = this;
			if (paras == "back") {
				return false;
			}
			this.getCoupon(function() {
				self.getRecord();
			});
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		},
		getCoupon : function(scb, fcb) {
			var self = this;
			amGloble.loading.show();
			$.ajax({
				url : amGloble.setting.lang.fuyu+"/club_mobile/elec/elecListForApp.htm", //接口url
				type : "POST",
				data : JSON.stringify({
					"vname" : amGloble.fyuserinfo.username,
					"vaccessToken" : amGloble.fyuserinfo.accessToken
				}),
				dataType : "json",
				timeout : amGloble.setting.market.timeout || 30000,
				contentType : "application/json",
				success : function(ret) {
					amGloble.loading.hide();
					console.log(ret);
					if (ret.responseCode && ret.responseCode == "0000000") {
						self.couponData = ret;
						self.renderCoupon(ret);
						scb && scb();
					} else {
						self.couponData = null;
						self.renderCoupon();
						fcb && fcb();
					}
				},
				error : function(ret) {
					amGloble.loading.hide();
					console.log(ret);
					self.couponData = null;
					self.renderCoupon();
					fcb && fcb(ret);
				}
			});
		},
		getRecord : function(scb, fcb) {
			var self = this;
			amGloble.loading.show();
			$.ajax({
				url : amGloble.setting.lang.fuyu+"/club_mobile/carhistory/carHistoryListForApp.htm", //接口url
				type : "POST",
				data : JSON.stringify({
					"vname" : amGloble.fyuserinfo.username,
					"vaccessToken" : amGloble.fyuserinfo.accessToken
				}),
				dataType : "json",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				success : function(ret) {
					amGloble.loading.hide();
					// ret = {
					// "responseCode" : "0000000",
					// "carInfoList" : [{
					// "carType" : "福克斯两厢1.8MT",
					// "vin" : "WERUIOOJJUSDFSADFAE",
					// "carColor" : "黄色",
					// "carRepairs" : [{
					// "vsstName" : "安徽亚特",
					// "nbalanceFee" : "323",
					// "vrepairDate" : "2014-11-01",
					// "repairId" : "1"
					// }, {
					// "vsstName" : "安徽亚特",
					// "nbalanceFee" : "623",
					// "vrepairDate" : "2014-11-01",
					// "repairId" : "2"
					// }]
					// }, {
					// "carType" : "福克斯两厢1.8AT",
					// "vin" : "WERUIOOJJUSDFSADFAO",
					// "carColor" : "黄色",
					// "carRepairs" : [{
					// "vsstName" : "安徽亚特",
					// "nbalanceFee" : "133",
					// "vrepairDate" : "2014-11-01",
					// "repairId" : "3"
					// }, {
					// "vsstName" : "安徽亚特",
					// "nbalanceFee" : "823",
					// "vrepairDate" : "2014-11-01",
					// "repairId" : "4"
					// }]
					// }]
					// };
					console.log(ret);
					if (ret.responseCode && ret.responseCode == "0000000") {
						self.recordData = ret;
						self.renderRecord(ret);
						scb && scb();
					} else {
						self.recordData = null;
						self.renderRecord();
						fcb && fcb();
					}
				},
				error : function(ret) {
					amGloble.loading.hide();
					console.log(ret);
					self.recordData = null;
					self.renderRecord();
					fcb && fcb(ret);
				}
			});
		},
		renderCoupon : function(data) {
			var $tips = this.$couponBtn.find(".line2");
			if(data){
				$tips.eq(0).html(data.availableElec.length || 0);
				$tips.eq(1).html(data.usedElec.length || 0);
				$tips.eq(2).html(data.failureElec.length || 0);
			}
			this.refresh();
		},
		renderRecord : function(data) {
			var self = this;
			var $ul = this.$ul.empty();
			if (data.carInfoList && data.carInfoList.length) {
				$.each(data.carInfoList, function(i, item) {
					var $li = self.$li.clone(true, true);
					$li.find(".data_carType").html(item.carType);
					$li.find(".data_vin").html('<span class="light">VIN</span> ' + item.vin + " " + item.carColor);

					var totalTimes = 0;
					var amount = 0;
					var $ul2 = $li.find(".subList").empty();
					if (item.carRepairs && item.carRepairs.length) {
						$.each(item.carRepairs, function(j, itemj) {
							itemj.vin = item.vin;
							var $li2 = self.$li2.clone(true, true);
							$li2.find(".title").html(itemj.vsstName);
							$li2.find(".date").html(itemj.vrepairDate);
							$li2.find(".price").html(itemj.nbalanceFee + '<span class="small">￥</span>');

							totalTimes++;
							amount += itemj.nbalanceFee * 1;

							$li2.data("data", itemj);
							$ul2.append($li2);
						});
					}

					$li.find(".data_totalTimes").html(totalTimes);
					$li.find(".data_amount").html(amount);

					$ul.append($li);
				});
			}

			this.refresh();
		}
	});

})();
