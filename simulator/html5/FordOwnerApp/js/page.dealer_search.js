/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.dealer_search = new $.am.Page({
        id: "dealer_search",
        restServiePrefix: null,
        init: function () {
            var self = this;
            this.$.find(".bottombutton").vclick(function () {

                var locationCode = self.$.find("#locationCode").val();
                var dealernameCode = self.$.find("#dealernameCode").val();
                self.verificationArgs(locationCode, dealernameCode);
            });
            this.$.find("#locationCode").bind('input propertychange', function () {

                self.disabledControlInput(self.$.find("#dealernameCode"),
						$(this));
            });

            this.$.find("#dealernameCode").bind('input propertychange', function () {
                self.disabledControlInput(self.$.find("#locationCode"),
						$(this));
            });

        },
        backButtonOnclick: function () {
            $.am.changePage($.am.history[$.am.history.length - 1], "slideright", { noRefresh: true });
        },
        disabledControlInput: function (disableInput, EnableInput) {
            if ($(EnableInput).val().length > 0) {
                $(disableInput).attr("disabled", "disabled");
            } else {
                $(disableInput).removeAttr("disabled");
            }
        },
        //before page show
        beforeShow: function (paras) {
            this.ClearControlValue();
            var data = amGloble.generateTrackData(
                "owner app:dealer locator:search",
                "",
                "",
                "event:find dealer-start",
                "dealership:manual search",
                false,
                false,
                false,
                false,
                true);
            amGloble.trackPage("owner app:dealer locator:search",data);
        },
        //after page show
        afterShow: function () {
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {

        },
        ClearControlValue: function () {
            var self = this;
            var locationCode = self.$.find("#locationCode");
            var dealernameCode = self.$.find("#dealernameCode");
            locationCode.val("");
            dealernameCode.val("");
            locationCode.removeAttr("disabled");
            dealernameCode.removeAttr("disabled");

        },
        verificationArgs: function (locationC, dealernameC) {
            var isEmptyValue = true;
            var self = this;
            var gotoUrl = "";
            var isChina = (amGloble.setting.market.name=="China");
//             ADB.trackAction("Search", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Search Dealer",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Location": locationC,
//						"Dealer Name":dealernameC
//					}
//				});
             if(isChina){
                if(self.isNotEmpty(dealernameC)){
                    gotoUrl = dealernameC;
                }
                if (self.isNotEmpty(locationC)) {
                    locationC = locationC.replace('市','')+"市";
                    if(self.isNotEmpty(gotoUrl))
                        gotoUrl += " ";
                    gotoUrl += locationC;
                } 
                if(self.isNotEmpty(gotoUrl)){
                    self.getDealerList(gotoUrl);
                }
                else {
                    self.MessageTip(i18n.DEALER_SEARCH_ERROR_EMPTY);
                }
                
             }
             else{
                if (self.isNotEmpty(locationC)) {
                    if (self.isNotEmpty(dealernameC)) {

                    } else {
                        gotoUrl = "location/" + locationC;
                        self.getDealerList(gotoUrl)
                    }
                } else {
                    if (self.isNotEmpty(dealernameC)) {
                        gotoUrl = "name/" + dealernameC;
                        self.getDealerList(gotoUrl);
                    } else {
                        self.MessageTip(i18n.DEALER_SEARCH_ERROR_EMPTY);
                    }
                }
             }

        },
        isNotEmpty: function (arg) {
            if (arg == "" || arg == undefined || arg == null) {
                return false;
            } else {
                return true;
            }
        },
        MessageTip: function (message) {
            amGloble.msg(message);
        },
        getDealerList: function (gotoUrl) {
            var self = this;
            var isChina = (amGloble.setting.market.name=="China");
            if(isChina){
                $.am.changePage(amGloble.page.dealer_listview, "slideright", { searchUrl: {KEYWORD:gotoUrl}}); 
            }else{
                var searchUrl = this.restServiePrefix = amGloble.setting.lang.host + "/servlet/rest/dealers/ext/" + amGloble.setting.lang.site + "/" + gotoUrl;
                $.am.changePage(amGloble.page.dealer_listview, "slideright", { searchUrl: searchUrl });               
            }
        }
    });
})();