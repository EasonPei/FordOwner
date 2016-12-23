/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {
	
	
	amGloble.page.setting_about = new $.am.Page({
		id : "setting_about",

		init : function() {
			var self = this;
			this.$.find(".right").vclick(function() {
			$.am.changePage(amGloble.page.setting_main, "");
		    });

		    this.$.find(".bottombutton").vclick(function() {
			//amGloble.msg("Version "+amGloble.setting.market.androidver);
			emap.inAppBrowser({
				url : amGloble.setting.lang.updateurl
			});
			
		    });

		},
		//before page show
		beforeShow : function(paras) {
			this.$.find(".bottombutton").hide();
			var isChina = (amGloble.setting.market.name=="China");
			if(isChina){
				this.$.find(".logo").removeClass("logo").addClass("logo_cn");
			}
			else{
				if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "th-th") {
					this.$.find(".logo").removeClass("logo").addClass("logo_th");
				};
				if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "id-id") {
					this.$.find(".logo").removeClass("logo").addClass("logo_id");
				};
				if (localStorage.fordOwenerApp_lang && (localStorage.fordOwenerApp_lang == "en-id" || localStorage.fordOwenerApp_lang == "en-th")) {
					this.$.find(".logo").removeClass("logo").addClass("logo_idth_en");
				};
		        if(amGloble.setting.market.code=="KR" || amGloble.setting.market.code=="JP"){
		          this.$.find(".logo").removeClass("logo").addClass("logo_idth_en");
		        }
				if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "vi-vn") {
					this.$.find(".logo").removeClass("logo").addClass("logo_vn");
				};
			}
			emap.getMetadata({}, function(ret) {
				console.log(ret);
				amGloble.deviceInfo.version = ret.content.container.version;
         if (localStorage.fordOwenerApp_lang && localStorage.fordOwenerApp_lang == "th-th") {
             $(".version").html("<p class=\"subtitle\">ข้อมูลรถฟอร์ดของคุณในที่เดียว<\p><br>"+i18n.SETTING_ABOUT_VERSION+amGloble.deviceInfo.version);
                       return;
         };
				$(".version").html(i18n.SETTING_ABOUT_VERSION+amGloble.deviceInfo.version);

			}, function(ret) {
				console.log(ret);
			}); 

			var data = amGloble.generateTrackData(
                    "owner app:owner support:settings",
                    "",
                    "",
                    "",
                    "owner support:settings:update",
                    false,
                    false,
                    false,
                    false,
                    false)
            amGloble.trackAction("owner app:owner support:settings:about:update",data);

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