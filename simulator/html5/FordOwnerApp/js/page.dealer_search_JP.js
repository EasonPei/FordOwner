/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.dealer_search_JP = new $.am.Page({
        id: "dealer_search_JP",
        restServiePrefix: null,
        state_list: [
            {
                "name":"北海道",
                "cities":[
                    {"name":"北海道"}
                ]
            },
            {
                "name":"東北",
                "cities":[
                    {"name":"青森県"},
                    {"name":"宮城県"},
                    {"name":"福島県"}
                ]
            },
            {
                "name":"関東",
                "cities":[
                    {"name":"茨城県"},
                    {"name":"栃木県"},
                    {"name":"埼玉県"},
                    {"name":"千葉県"},
                    {"name":"東京都"},
                    {"name":"神奈川県"}
                ]
            },
            {
                "name":"甲信越",
                "cities":[
                    {"name":"山梨県"},
                    {"name":"長野県"},
                    {"name":"新潟県"}
                ]
            },
            {
                "name":"北陸",
                "cities":[
                    {"name":"富山県"}
                ]
            },
            {
                "name":"中部",
                "cities":[
                    {"name":"静岡県"},
                    {"name":"愛知県"},
                    {"name":"岐阜県"},
                    {"name":"三重県"}
                ]
            },
            {
                "name":"近畿",
                "cities":[
                    {"name":"滋賀県"},
                    {"name":"京都府"},
                    {"name":"大阪府"},
                    {"name":"兵庫県"}
                ]
            },
            {
                "name":"中国",
                "cities":[
                    {"name":"岡山県"},
                    {"name":"広島県"},
                    {"name":"山口県"}
                ]
            },
            {
                "name":"四国",
                "cities":[
                    {"name":"徳島県"},
                    {"name":"香川県"},
                    {"name":"愛媛県"}
                ]
            },
            {
                "name":"九州",
                "cities":[
                    {"name":"福岡県"},
                    {"name":"鹿児島県"}
                ]
            }
        ],
        city_list: [],
        init: function () {
            var self = this;
            this.$.find(".bottombutton").vclick(function () {

                var locationCodeCity = self.$.find("#locationCodeCity").val();
                var locationCode = self.$.find("#locationCode").val();
                var dealernameCode = self.$.find("#dealernameCode").val();
                self.verificationArgs(locationCode, locationCodeCity, dealernameCode);
            });

            this.$.find("#locationCode").parent().click(
                function () {
                    var list = self.state_list;
                    amGloble.popupMenu(i18n.SIGNUP_CONTACT_STATE, list, "name", function (ret) {
                        self.$.find("#locationCode").val(ret.name); 
                        self.$.find("#locationCodeCity").val("");
                        self.city_list = ret.cities; 
                        self.disabledControlInput(self.$.find("#dealernameCode"), self.$.find("#locationCode"));
                    });
                }
            );

            this.$.find("#locationCodeCity").parent().click(
                function () {
                    var list = self.city_list;
                    if(list && list.length>0){
                        amGloble.popupMenu(i18n.DEALER_SEARCH_LABEL_LOCATION_CITY, list, "name", function (ret) {
                            self.$.find("#locationCodeCity").val(ret.name); 
                            self.disabledControlInput(self.$.find("#dealernameCode"), self.$.find("#locationCode"));
                        });             
                    }

                }
            );

            this.$.find("#locationCode").bind('input propertychange', function () {

                self.disabledControlInput(self.$.find("#dealernameCode"),
						$(this));
            });

            this.$.find("#dealernameCode").bind('input propertychange', function () {
                self.disabledControlInput(self.$.find("#locationCode"),$(this));
                self.disabledControlInput(self.$.find("#locationCodeCity"),$(this));
            });

        },
        backButtonOnclick: function () {
            $.am.changePage($.am.history[$.am.history.length - 1], "slideright", { noRefresh: true });
        },
        disabledControlInput: function (disableInput, EnableInput) {
            if ($(EnableInput).val().length > 0) {
                $(disableInput).val("");
            } else {
                //$(disableInput).removeAttr("disabled");
            }
        },
        //before page show
        beforeShow: function (paras) {
            this.city_list = [];
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
            var locationCodeCity = self.$.find("#locationCodeCity");
            var dealernameCode = self.$.find("#dealernameCode");
            locationCode.val("");
            locationCodeCity.val("");
            dealernameCode.val("");
            locationCode.removeAttr("disabled");
            locationCodeCity.removeAttr("disabled");
            dealernameCode.removeAttr("disabled");

        },
        verificationArgs: function (regionC, locationC, dealernameC) {
            var isEmptyValue = true;
            var self = this;
            var gotoUrl = "";
//             ADB.trackAction("Search", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Search Dealer",
//					"Username" : amGloble.userinfo.username,
//					"Bussiness Data" : {
//						"Location": locationC,
//                        "region": regionC,
//						"Dealer Name":dealernameC
//					}
//				});
            if (self.isNotEmpty(locationC)) {
                if (self.isNotEmpty(dealernameC)) {

                } else {
                    gotoUrl = "city/" + locationC;
                    self.getDealerList(gotoUrl)
                }
            } else if (self.isNotEmpty(regionC)) {
                if (self.isNotEmpty(dealernameC)) {

                } else {
                    gotoUrl = "region/" + regionC;
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
                var searchUrl = this.restServiePrefix = amGloble.setting.lang.host + "/servlet/rest/dealers/" + amGloble.setting.lang.site + "/" + gotoUrl;
                $.am.changePage(amGloble.page.dealer_listview, "slideright", { searchUrl: searchUrl });               
            }
        }
    });
})();