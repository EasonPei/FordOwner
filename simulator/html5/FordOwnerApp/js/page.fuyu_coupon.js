/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.fuyu_coupon = new $.am.Page({
		id : "fuyu_coupon",

		init : function() {
			var self = this;

			this.$.find(".coupontabs li").vclick(function() {
				var coupontabs = self.$.find(".coupontabs li");
				coupontabs.filter(".active").removeClass("active");
				$(this).addClass("active");
				var index = coupontabs.index(this);
				self.$.find("ul.coupons.active").removeClass("active");
				self.$.find("ul.coupons").eq(index).addClass("active");
				var category = ["Available Coupon", "Usage Record", "Expired Coupon"];
//				ADB.trackAction("Check different coupon", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "FUYU Coupon Account",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Coupon Category" : category[index],
//						"福域用户名" : amGloble.fyuserinfo.username
//					}
//				});

				self.scrollview && self.scrollview.refresh();
			});

			this.$.find(".right.button").vclick(function() {
				$.am.changePage(amGloble.page.fuyu_dashboard, "slideright");
			});
		},
		//before page show
		beforeShow : function(paras) {
			var self = this;

			self.$.find(".icon-specialoffer-orange").text("0");
			self.$.find(".icon-ok-green").text("0");
			self.$.find(".icon-warnred").text("0");

			if (amGloble.fyuserinfo) {
				var data = paras;

				if (data && data.responseCode == "0000000") {
					if (data.availableElec && data.availableElec.length > 0) {
						self.$.find(".icon-specialoffer-orange").text(data.availableElec.length);
						var useablecoupons = self.$.find(".useablecoupons").empty();
						$.each(data.availableElec, function() {
							var item = '<li><div class="couponinfo1"><p class="cnumber"></p><p class="iconline"></p><p class="cname">' + this.dealName + '</p>' + '</div><span class="couponvalue">' + this.amount + '</span><div class="couponinfo2"><span class="usetime">' + this.validBeginDate + ' 至 ' + this.validEndDate + '</span><span class="sheetnumber">¥' + this.usedAmount + '已用+<em>¥' + this.unusedAmount + '</em>未用</span></div></li>';
							useablecoupons.append(item);
						});
					}
					if (data.usedElec && data.usedElec.length > 0) {
						self.$.find(".icon-ok-green").text(data.usedElec.length);
						var usedcoupons = self.$.find(".usedcoupons").empty();
						$.each(data.usedElec, function() {
							var item = '<li><div class="couponinfo1"><p class="cnumber"></p><p class="icon-finished"></p><p class="cname">券号 ' + this.accountId + '</p>' + '</div><span class="couponvalue">' + this.usedAmount + '</span><div class="couponinfo2"><span class="usetime">使用时间 ' + this.usedDate + '</span><span class="sheetnumber">工单号 ' + this.roNo + '</span></div></li>';
							usedcoupons.append(item);
						});
					}
					if (data.failureElec && data.failureElec.length > 0) {
						self.$.find(".icon-warnred").text(data.failureElec.length);
						var disablecoupons = self.$.find(".disablecoupons").empty();
						$.each(data.failureElec, function() {
							var item = ' <li><div class="couponinfo1"><p class="cnumber"></p><p class="icon-warnred2"></p><p class="cname">' + this.dealName + '</p>' + '</div><span class="couponvalue">' + this.amount + '</span><div class="couponinfo2"><span class="usetime">' + this.status + '</span><span class="sheetnumber">¥' + this.usedAmount + '已用+¥' + this.unusedAmount + '未用</span></div></li>';
							disablecoupons.append(item);
						});
					}
					self.scrollview && self.scrollview.refresh();
				} else {
					if (data.responseCode == "000001") {
						amGloble.msg("登录会话超时");
					} else if (data.responseCode == "0000099") {
						amGloble.msg("用户未登录");
					} else if (data.responseCode == "0000020") {
						amGloble.msg("系统错误");
					} else if (data.responseCode == "0000003") {
						amGloble.msg("非车主无权限访问");
					}
				}

			}
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
