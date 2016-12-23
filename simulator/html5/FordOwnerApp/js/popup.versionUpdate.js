/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

    amGloble.popup.versionUpdate = new $.am.Popup({
	    id: "popup_versionUpdate",
	    updateInfo: {},
		init : function() {
            
		},
		beforeShow : function(option) {
			var self = this;
			self.disableQuickClose = true;
			var updateInfo_i18n = self.updateInfo.i18n[amGloble.setting.lang.i18n];
			if(!updateInfo_i18n){
				updateInfo_i18n = self.updateInfo.i18n[Object.keys(self.updateInfo.i18n)[0]];
			}

			self.$.find(".poptitle").html(updateInfo_i18n.updateTitle);
			self.$.find(".popcontent").html(updateInfo_i18n.updateContent);
			self.$.find("#cancel").html(updateInfo_i18n.updateCancelButton);
			self.$.find("#updateNow").html(updateInfo_i18n.updateNowButton);

			self.$.find("#cancel").vclick(function() {
				self.$.fadeOut(500,function(){
					self.hide();
				})
				if (localStorage) {
					var nextCheckDate = new Date();
            		nextCheckDate.setDate(nextCheckDate.getDate()+3);
					localStorage.setItem("fordOwenerApp_nextVersionCheckDate", JSON.stringify(nextCheckDate));
				}
			});

			self.$.find("#updateNow").vclick(function() {
				self.$.fadeOut(500,function(){
					self.hide();
				})
				emap.openUrl({"url":self.updateInfo.updateURL});
			});
                                                  
      emap.confirm({
                 caption : updateInfo_i18n.updateTitle,
                 description : updateInfo_i18n.updateContent,
                 okCaption : updateInfo_i18n.updateNowButton,
                 cancelCaption : updateInfo_i18n.updateCancelButton
                 }, function() {
                 });
		},
		afterShow : function() {
		},
		beforeHide : function(data) {
		}
	});

})();
