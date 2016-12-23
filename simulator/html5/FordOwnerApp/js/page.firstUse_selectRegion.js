/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.firstUse_selectRegion = new $.am.Page({
        id: "firstUse_selectRegion",

        init: function () {
            var self = this;

            this.$dropbox = this.$.find("#firstUse_selectRegion_select").vclick(function () {
                var $this = $(this);
                amGloble.popupMenuWithDefaultKey("Select your region", amGloble.marketList, "displayName", "name", function (ret) {
                    $this.find(".inputLineMiddle").html(ret.displayName?ret.displayName:ret.name);
                    self.currentMarket = ret;
                    self.renderLangList();
                });
            });

            this.$lang = this.$.find(".selectList");
            this.$lang.on("vclick", "li", function () {
                self.selectLang($(this).index());
            });
            this.$li = this.$lang.children("li:first").remove();

            this.$.find(".rectButton").vclick(function () {
                var setting = {
                    market: self.currentMarket,
                    lang: self.currentLang,
                    registration: amGloble.registration[self.currentLang.site || "FOA"] || amGloble.registration["FOA"],
                    notification: true //allow push notification
                };
                amGloble.setting = setting;
                amGloble.api.updateLang(function() {
                                        var lang = setting.lang.i18n;
                                        i18nController.changeLanguage(lang);
                                        
                                        amGloble.tag.setItem("setting", "ON");
                                        amGloble.tag.setItem("market", setting.market.code);
                                        amGloble.tag.setItem("language", setting.lang.code);
                                        
                                        $.am.changePage(amGloble.page.firstUse_tc, "slideleft", setting);
                                        });
                
            });

        },
        //before page show
        beforeShow: function (paras) {
            var self = this;
            var getPosition = function (position) {
                if(typeof Microsoft != "undefined" && typeof Microsoft.Maps != "undefined"){
                    var loc_Bing = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
                    amGloble.maps.currentAddress(loc_Bing, function (address, country) {
                        amGloble.loading.hide();
                        $.each(amGloble.marketList, function (i, item) {
                            if (country == item.name) {
                                console.log(item);
                                self.$dropbox.find(".inputLineMiddle").html(item.displayName?item.displayName:item.name);
                                self.currentMarket = item;
                                self.renderLangList();
                                return false;
                            }
                        });

                        console.log(country);
                    });
                }
                else{
                    amGloble.loading.hide();
                }
            };

            var showError = function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        amGloble.msg(i18n.FIRSTUSE_SELECTREGION_TEXT10);
                        amGloble.loading.hide();
                        break;
                    case error.POSITION_UNAVAILABLE:
                        navigator.geolocation.getCurrentPosition(getPosition, showErrorLow, {
                            maximumAge: 0,
                            timeout: 30000,
                            enableHighAccuracy: false
                        });
                        break;
                        //case error.TIMEOUT:
                        //navigator.geolocation.getCurrentPosition(getPosition, showErrorLow, { maximumAge: 0, enableHighAccuracy: false });
                        //break;
                }
            };

            var showErrorLow = function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        amGloble.msg(i18n.FIRSTUSE_SELECTREGION_TEXT10);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        amGloble.msg(i18n.FIRSTUSE_SELECTREGION_TEXT9);
                        break;
                    case error.TIMEOUT:
                        amGloble.msg(i18n.FIRSTUSE_SELECTREGION_TEXT12);
                        break;
                }
                amGloble.loading.hide();
            };

            var doLocating = function () {
                var self = this;
                emap.getConnectionInfo({}, function (ret) {
                    if (ret == "none" || ret == "unknown") {
                        emap.alert({
                            caption: i18n.FIRSTUSE_SELECTREGION_TEXT5,
                            description: i18n.FIRSTUSE_SELECTREGION_TEXT6,
                            okCaption: i18n.FIRSTUSE_SELECTREGION_TEXT7
                        }, function () {
                            emap.logout();
                        });
                    } else {

                        if (amGloble.marketList.length == 1) {

                            var item = amGloble.marketList[0];

                            self.$dropbox.find(".inputLineMiddle").html(item.displayName?item.displayName:item.name);
                            self.currentMarket = item;
                            self.renderLangList();

                        } else {

                            //amGloble.loading.show("Locating...");
                            emap.startBusy({
                                caption: i18n.DEALER_LOCATOR_LOCATING,
                                cancelable: true
                            });

                            amGloble.maps.currentMapDispatchRun(function () {
                                amGloble.loading.hide();
                            }, function () {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(getPosition, showError, {
                                        maximumAge: 0,
                                        enableHighAccuracy: true
                                    });
                                } else {
                                    amGloble.loading.hide();
                                    amGloble.msg(i18n.FIRSTUSE_SELECTREGION_TEXT11);
                                }
                            });
                        }
                    }
                });
            };
            emap.checkGPS(null,
                doLocating,
                function () {
                    emap.alert({
                        caption: i18n.FIRSTUSE_SELECTREGION_TEXT8,
                        description: i18n.FIRSTUSE_SELECTREGION_TEXT9,
                        okCaption: i18n.FIRSTUSE_SELECTREGION_TEXT7
                    });
                });

            var data = amGloble.generateTrackData(
                "owner app:region",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:region",data);
        },

        //after page show
        afterShow: function () {},
        //before page hide
        beforeHide: function () {},
        //after page hide
        afterHide: function () {},

        renderLangList: function () {
            var self = this;
            var data = this.currentMarket;
            var $ul = this.$lang.empty().show();
            $.each(data.langs, function (i, item) {
                var $li = self.$li.clone(true, true);
                if (data.langs.length > 1) {
                    $li.find(".inputLineLeftView").html(i + 1);
                } else {
                    $li.find(".inputLineLeftView").hide();
                }
                $li.find(".inputLineMiddle").html(item.displayName?item.displayName:item.name);

                $li.data("item", item);
                $ul.append($li);
            });
            this.selectLang(0);
                                                        
//          var setting = {
//          market: self.currentMarket,
//          lang: self.currentLang,
//          registration: amGloble.registration[self.currentLang.site || "FOA"] || amGloble.registration["FOA"],
//          notification: true //allow push notification
//          };
//          amGloble.setting = setting;
//          amGloble.api.updateLang(function() {
//          var lang = setting.lang.i18n;
//          i18nController.changeLanguage(lang);
//          
//          });

        },
        selectLang: function (idx) {
            var $lis = this.$lang.children();
            $lis.removeClass("inputLineCheck");
            this.currentLang = $lis.eq(idx).addClass("inputLineCheck").data("item");
                                                        
//              var setting = {
//              market: self.currentMarket,
//              lang: self.currentLang,
//              registration: amGloble.registration[self.currentLang.site || "FOA"] || amGloble.registration["FOA"],
//              notification: true //allow push notification
//              };
//              amGloble.setting = setting;
//              amGloble.api.updateLang(function() {
//              var lang = setting.lang.i18n;
//              i18nController.changeLanguage(lang);
//              
//              
//              });
        }
    });

})();