/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	var mapping = [];
	// couponList页面
	amGloble.page.indexPage = new $.am.Page({
		id : "indexPage",
		backButtonOnclick : function() {
			emap.logout();
		},

		init : function() {
			/*
			mapping.push({
				name : "firstUse_selectRegion",
				page : amGloble.page.firstUse_selectRegion
			});
			mapping.push({
				name : "firstUse_linkPage",
				page : amGloble.page.firstUse_linkPage
			});
			mapping.push({
				name : "login_login",
				page : amGloble.page.login_login
			});
			mapping.push({
				name : "signUp_account",
				page : amGloble.page.signUp_account
			});
			mapping.push({
				name : "signUp_vehicle",
				page : amGloble.page.signUp_vehicle
			});
			mapping.push({
				name : "signUp_contact",
				page : amGloble.page.signUp_contact
			});
			mapping.push({
				name : "dashboard_main",
				page : amGloble.page.dashboard_main
			});
			mapping.push({
				name : "profile_myVehicle",
				page : amGloble.page.profile_myVehicle
			});
			mapping.push({
				name : "profile_myAccount",
				page : amGloble.page.profile_myAccount
			});
			mapping.push({
				name : "profile_updateInfo",
				page : amGloble.page.profile_updateInfo
			});
			//2nd
			
			mapping.push({
				name : "contact_callCenter",
				page : amGloble.page.contact_callCenter
			});
			mapping.push({
				name : "contact_roadsideAssistance",
				page : amGloble.page.contact_roadsideAssistance
			});
			mapping.push({
				name : "notification_list",
				page : amGloble.page.notification_list
			});
			mapping.push({
				name : "notification_detail",
				page : amGloble.page.notification_detail
			});
			mapping.push({
				name : "knowledge_indicatorIcons",
				page : amGloble.page.knowledge_indicatorIcons
			});
			mapping.push({
				name : "knowledge_indicatorDetail",
				page : amGloble.page.knowledge_indicatorDetail
			});
			mapping.push({
				name : "knowledge_ownerManual",
				page : amGloble.page.knowledge_ownerManual
			});
			
			//3rd
			mapping.push({
				name : "knowledge_phasebook",
				page : amGloble.page.knowledge_phasebook
			});
			mapping.push({
				name : "knowledge_more",
				page : amGloble.page.knowledge_more
			});
			mapping.push({
				name : "dealer_listview",
				page : amGloble.page.dealer_listview
			});
			mapping.push({
				name : "dealer_mapview",
				page : amGloble.page.dealer_mapview
			});
			mapping.push({
				name : "dealer_search",
				page : amGloble.page.dealer_search
			});
			mapping.push({
				name : "dealer_detail",
				page : amGloble.page.dealer_detail
			});
			mapping.push({
				name : "service_checklist",
				page : amGloble.page.service_checklist
			});
			mapping.push({
				name : "service_reminderList",
				page : amGloble.page.service_reminderList
			});
			mapping.push({
				name : "service_createReminder",
				page : amGloble.page.service_createReminder
			});
			mapping.push({
				name : "service_reminderDetail",
				page : amGloble.page.service_reminderDetail
			});
			mapping.push({
				name : "setting_main",
				page : amGloble.page.setting_main
			});
			mapping.push({
				name : "setting_about",
				page : amGloble.page.setting_about
			});
			mapping.push({
				name : "setting_qrcode",
				page : amGloble.page.setting_qrcode
			});
			mapping.push({
				name : "recall_main",
				page : amGloble.page.recall_main
			});
			mapping.push({
				name : "common_reload",
				page : amGloble.page.common_reload
			});
			mapping.push({
				name : "common_oops",
				page : amGloble.page.common_oops
			});
			mapping.push({
				name : "common_noResult",
				page : amGloble.page.common_noResult
			});
			*/
			
			mapping.push({
				name : "fuyu_login",
				page : amGloble.page.fuyu_login
			});
			mapping.push({
				name : "fuyu_signup",
				page : amGloble.page.fuyu_signup
			});
			mapping.push({
				name : "fuyu_vin",
				page : amGloble.page.fuyu_vin
			});
			mapping.push({
				name : "fuyu_dashboard",
				page : amGloble.page.fuyu_dashboard
			});
			mapping.push({
				name : "fuyu_coupon",
				page : amGloble.page.fuyu_coupon
			});
			mapping.push({
				name : "fuyu_repair",
				page : amGloble.page.fuyu_repair
			});

			this.$ul = this.$.find("#mainList_list").delegate("li", "vclick", function() {

				var idx = $(this).index();
				$.am.changePage(mapping[idx].page, "slideleft");

			});

		},
		//before page show
		beforeShow : function(paras) {
			var $ul = this.$.find("#mainList_list").empty();
			$.each(mapping, function(i, item) {
				$ul.append('<li class="am-clickable">' + item.name + '<span class="arrow"></span></li>');
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
