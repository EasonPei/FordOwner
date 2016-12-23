/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.firstUse_linkPage = new $.am.Page({
		id : "firstUse_linkPage",

		init : function() {
			this.$.find(".loginButton").vclick(function() {
				$.am.changePage(amGloble.page.login_login, "slideleft");
			});

			this.$.find(".signupButton").vclick(function() {
				$.am.changePage(amGloble.page.signUp_account, "slideleft");
			});

			this.$.find("#signUpLater").vclick(function() {
				$.am.changePage(amGloble.page.dashboard_main, "slideleft");
			});

			var h = window.innerHeight;
			var once = 0;

			this.topCarrousel = new $.am.Carrousel({
				id : "firstUse_wisard",
				height : h - 160,
				autoSwitch : 0,
				onchange : function(i) {
					this.$.find("ul:last li:eq(" + i + ")").addClass("selected").siblings().removeClass("selected");
					if(i!=0 && once == 0){
						var data = amGloble.generateTrackData(
	                        "owner app:introduction:benefits",
	                        "",
	                        "",
	                        "",
	                        "benefits:swipe",
	                        false,
	                        false,
	                        false,
	                        false,
	                        false);
	                    amGloble.trackAction("owner app:introduction:benefits:swipe",data);
	                    once = 1;
					}	
				}
			});

		},
		//before page show
		beforeShow : function(paras) {
			var isChina = (amGloble.setting.market.name=="China");
			if(isChina){
				this.$.find(".fordLogo").removeClass("fordLogo").addClass("fordLogoCN");
				this.$.find(".mainCarr .am-carrousel-inner").html('<li><img src="img/wizard/p1_cn.png"></li>\
                        <li><img src="img/wizard/p2_cn.png"></li>\
                        <li><img src="img/wizard/p3_cn.png"></li>\
                        <li><img src="img/wizard/p4_cn.png"></li>\
                        <li><img src="img/wizard/p5_cn.png"></li>');
			}
			else if(amGloble.setting.lang.i18n == "en-in"){
				this.$.find(".mainCarr .am-carrousel-inner").html('<li><img src="img/wizard/p1.png"></li>\
                        <li><img src="img/wizard/p2.png"></li>\
                        <li><img src="img/wizard/p3_r.png"></li>\
                        <li><img src="img/wizard/p4.png"></li>\
                        <li><img src="img/wizard/p5.png"></li>');
			}
			else if(amGloble.setting.lang.i18n == "id-id"){
				this.$.find(".mainCarr .am-carrousel-inner").html('<li><img src="img/wizard/p1_id.png"></li>\
                        <li><img src="img/wizard/p2_id.png"></li>\
                        <li><img src="img/wizard/p3_id.png"></li>\
                        <li><img src="img/wizard/p4_id.png"></li>\
                        <li><img src="img/wizard/p5_id.png"></li>');
			}
			else if(amGloble.setting.lang.i18n == "en-id"){
				this.$.find(".mainCarr .am-carrousel-inner").html('<li><img src="img/wizard/p1.png"></li>\
                        <li><img src="img/wizard/p2.png"></li>\
                        <li><img src="img/wizard/p3.png"></li>\
                        <li><img src="img/wizard/p4_id_en.png"></li>\
                        <li><img src="img/wizard/p5.png"></li>');
			}
			else if(amGloble.setting.lang.i18n == "th-th"){
				this.$.find(".mainCarr .am-carrousel-inner").html('<li class="wider"><img src="img/wizard/p1_th.png"></li>\
                        <li class="wider"><img src="img/wizard/p2_th.png"></li>\
                        <li class="wider"><img src="img/wizard/p3_th.png"></li>\
                        <li class="wider"><img src="img/wizard/p4_th.png"></li>\
                        <li class="wider"><img src="img/wizard/p5_th.png"></li>');
			}
			else if(amGloble.setting.lang.i18n == "vi-vn"){
				this.$.find(".mainCarr .am-carrousel-inner").html('<li class="wider"><img src="img/wizard/p1_vn.png"></li>\
                        <li class="wider"><img src="img/wizard/p2_vn.png"></li>\
                        <li class="wider"><img src="img/wizard/p3_vn.png"></li>\
                        <li class="wider"><img src="img/wizard/p4_vn.png"></li>\
                        <li class="wider"><img src="img/wizard/p5_vn.png"></li>');
			}
			this.topCarrousel.refresh();

			var data = amGloble.generateTrackData(
				"owner app:home",
				"",
				"",
				"",
				"",
				true,
				false,
				false,
				false,
				false);
			amGloble.trackPage("owner app:home",data);

			var data = amGloble.generateTrackData(
				"owner app:introduction:benefits",
				"",
				"",
				"",
				"",
				false,
				false,
				false,
				false,
				false);
			amGloble.trackPage("owner app:introduction:benefits",data);

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
