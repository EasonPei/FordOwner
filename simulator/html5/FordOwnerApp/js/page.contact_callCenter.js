/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.contact_callCenter = new $.am.Page({
		id : "contact_callCenter",

		init : function() {
			this.$ul = this.$.find(".mainList");
			this.$li = this.$ul.children(":first").remove();

			this.$ul.on("vclick", ".callCenterPhoneNumber", function() {
//				ADB.trackAction("Call 'Call Center'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Call Center",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Call Name" : $(this).parent().find('.callCenterTitle').text(),
//						"Call Number" : $(this).html()
//					}
//				});

				var data = amGloble.generateTrackData(
                    "owner app:service:call center",
                    "",
                    "",
                    "",
                    "service:phone:call center",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:service:call center:phone",data);

				emap.dail({
					"number" : $(this).html(),
					"autoDial" : false
				});
			});

			this.$ul.on("vclick", ".callCenterEmail", function() {
				emap.email({
					"to" : [$(this).html()]
				});

				var data = amGloble.generateTrackData(
                    "owner app:service:call center",
                    "",
                    "",
                    "",
                    "service:phone:call center",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:service:call center:email",data);
			});

			this.$ul.on("vclick", ".callCenterTwitter", function() {
				emap.openUrl({
					"url" : $(this).attr("url")
				});

				var data = amGloble.generateTrackData(
                    "owner app:service:call center",
                    "",
                    "",
                    "",
                    "service:phone:call center",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:service:call center:twitter",data);
			});

			this.$ul.on("vclick", ".callCenterFacebook", function() {
				emap.openUrl({
					"url" : $(this).attr("url")
				});

				var data = amGloble.generateTrackData(
                    "owner app:service:call center",
                    "",
                    "",
                    "",
                    "service:phone:call center",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:service:call center:facebook",data);
			});
		},
		//before page show
		beforeShow : function(paras) {
			var data = amGloble.generateTrackData(
                    "owner app:service:call center",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackPage("owner app:service:call center",data);
		},

		//after page show
		afterShow : function() {
			this.getData();
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		},

		render : function() {
			var self = this;
			var data = amGloble.callCenters;
			var $ul = this.$ul.empty();

			$.each(data, function(i, item) {
				var $li = self.$li.clone(true, true);
				$li.find(".callCenterTitle").html(item.name);
				if(item.phone){
					if(item.phone.indexOf("@")>=0){
						$li.find(".callCenterPhoneNumber").attr("class","callCenterEmail").html(item.phone);
					}
					else{
						$li.find(".callCenterPhoneNumber").html(item.phone);
					}
				}
				else if(item.email){
					$li.find(".callCenterPhoneNumber").attr("class","callCenterEmail am-clickable").html(item.email);
				}
				else if(item.twitter){
					$li.find(".callCenterPhoneNumber").attr("class","callCenterTwitter am-clickable").attr("url",item.twitter_url).html(item.twitter);
				}
				else if(item.facebook){
					$li.find(".callCenterPhoneNumber").attr("class","callCenterFacebook am-clickable").attr("url",item.facebook_url).html(item.facebook);
				}
				
				$li.find(".callCenterDetail").html(item.desc);
				$ul.append($li);
			});
		},

		getData : function() {
			var self = this;
			var localdata = localStorage.getItem("fordOwenerApp_callcenters");

			if (localdata) {
				amGloble.callCenters = JSON.parse(localdata);
				this.render();

				$.ajax({
					url : amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/call/" + amGloble.setting.market.code + "/" + amGloble.setting.lang.code + "/callcenter.json", //接口url
					type : "GET",
					dataType : "json",
					timeout : amGloble.setting.market.timeout || 30000,
					success : function(ret) {
						amGloble.callCenters = ret;
						localStorage.setItem("fordOwenerApp_callcenters", JSON.stringify(ret));
					},
					error : function(ret) {
					}
				});

			} else {
				// var a = "http://apacvideo.ford.com.edgesuite.net/Mobile-App/akamai/app/call/AU/en/callcenter.json"

				amGloble.loading.show();

				$.ajax({
					url : amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/call/" + amGloble.setting.market.code + "/" + amGloble.setting.lang.code + "/callcenter.json", //接口url
					type : "GET",
					dataType : "json",
					timeout : amGloble.setting.market.timeout || 30000,
					success : function(ret) {
						amGloble.loading.hide();
						amGloble.callCenters = ret;
						localStorage.setItem("fordOwenerApp_callcenters", JSON.stringify(ret));
						self.render();
					},
					error : function(ret) {
						amGloble.loading.hide();
						$.am.changePage(amGloble.page.common_oops, "slideleft",{
                            title: "",
                            message: "",
                            detail: ret
                        });
					}
				});
			}

		}
	});

})();
