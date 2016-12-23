/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.fuyu_vin = new $.am.Page({
		id : "fuyu_vin",

		init : function() {
			$("#fuyu_vin .how-findvin").click(function() {
				amGloble.popup.findVin.enableInnerClose = true;
				amGloble.popup.findVin.show();
			});
			var page = this;
			$("#fuyu_vin .lasticonli .am-clickable.icon-scan-china").click(function() {

				if ( typeof emap != "undefined") {

					emap.barcode({
						mode : 3
					}, function success(ret) {
						//ret
						//{
						//    "result" : 0,
						//    "message" : "Success",
						//    "content" : "http://www.163.com"
						//}

						$("#vin").val(ret.content);

					}, function error(ret) {

						amGloble.msg("Scan error.");
						$("#vin").val("");
					});
				} else {
					amGloble.msg("The device doesn't support emap.");
				}
			});

			$("#fuyu_vin .smswitch .am-clickable").click(function() {
				var button = $(this);
				$(".focused", button.parent()).removeClass("focused");
				button.addClass("focused");

				var id = button.attr("id");
				var input = $("#fuyu_vin .formcontent input[name='vin']");
				if (id == "smswitch11")// Manual input
				{
					input.removeAttr("readonly");
					$("#fuyu_vin .lasticonli").hide();
				} else {
					input.attr("readonly", "readonly");
					$("#fuyu_vin .lasticonli").show();
				}

			});

			$("#fuyu_vin .nextbutton").vclick(function() {
				$("#fuyu_vin .error-message").text("");
				page.hasError();

			});

		},
		//before page show
		beforeShow : function(paras) {
			var self = this;
			if (paras && paras.from) {
				this.from = paras.from;
			} else {
				this.from = null;
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
		},

		hasError : function() {

			var self = this;

			var obj = {
				vname : $("#fuyu_vin #username").val().trim(),
				vmobile : $("#fuyu_vin #mobilenumber").val().trim(),
				vvin : $("#fuyu_vin #vin").val().trim(),
				vaccessToken : amGloble.fyuserinfo.accessToken,

			};

			$.ajax({
				url : amGloble.setting.lang.fuyu+"/club_mobile/member/carOwnerAuthenForApp.htm",
				type : "POST",
				dataType : "json",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				data : JSON.stringify(obj),

				success : function(ret) {

//					ADB.trackAction("完成认证", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "Registration",
//						"Username" : amGloble.fyuserinfo.username,
//						"Bussiness Data" : {
//							"Username" : amGloble.fyuserinfo.username,
//							"福域用户名" : obj.vname,
//							"Vehicle VIN" : obj.vvin
//						}
//					});

					var responseCode = ret.responseCode;

					if (responseCode == "0000000") {
						$("#fuyu_vin .error-message").text("");
						if(self.from){
							$.am.changePage(amGloble.page.fuyu_dashboard, "slideright");
						}
						else{
							$.am.changePage(amGloble.page.fuyu_login, "slideleft", {
								username : amGloble.fyuserinfo.username,
								password : amGloble.fyuserinfo.password,
								from : amGloble.page.fuyu_dashboard
							});
						}
					} else if (responseCode == "0000099") {
						$("#fuyu_vin .error-message.system").text("用户未登录");
					} else if (responseCode == "0000001") {
						$("#fuyu_vin .error-message.system").text("登录会话超时");
					} else if (responseCode == "0000003") {
						$("#fuyu_vin .error-message.vin").text("vin码已经被认证过");
					} else if (responseCode == "0000004") {
						$("#fuyu_vin .error-message.phone").text("手机号不正确");
					} else if (responseCode == "0000005") {
						$("#fuyu_vin .error-message.name").text("姓名不正确");
					} else if (responseCode == "0000006") {
						$("#fuyu_vin .error-message.phone").text("手机和姓名都不正确");
					} else if (responseCode == "0000007") {
						$("#fuyu_vin .error-message.vin").text("vin未传送到dms系统或者是vin码不存在");
					} else if (responseCode == "0000020") {
						$("#fuyu_vin .error-message.system").text("系统错误");
					}

				},
				error : function(ret) {
					console.log(ret);
				}
			});

		},
	});

})();
