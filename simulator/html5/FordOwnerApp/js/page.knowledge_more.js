/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.knowledge_more = new $.am.Page({
        id: "knowledge_more",

        init: function () {
            this.$.find(".tabs div").eq(3).vclick(function () {
//                ADB.trackAction("Goto 'Indicator Icons'", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Knowledge Center",
//                    "Username": amGloble.userinfo.username,
//
//                });

                $.am.changePage(amGloble.page.knowledge_indicatorIcons, "");
            });
            this.$.find(".tabs div").eq(4).vclick(function () {
//                ADB.trackAction("Goto 'Owner Manual'", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Knowledge Center",
//                    "Username": amGloble.userinfo.username,
//
//                });
                $.am.changePage(amGloble.page.knowledge_ownerManual, "");
            });
            this.$.find(".tabs div").eq(5).vclick(function () {
//                ADB.trackAction("Goto 'SYNC Phrasebook'", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Knowledge Center",
//                    "Username": amGloble.userinfo.username,
//
//                });
                $.am.changePage(amGloble.page.knowledge_phasebook, "");
            });
            this.$.find(".tabs div").eq(6).vclick(function () {
                $.am.changePage(amGloble.page.knowledge_more, "");
            });

            this.backButtonOnclick = function () {
                $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
            };
        },
        //before page show
        beforeShow: function (paras) {



            if (amGloble.setting && amGloble.setting.lang) {
                console.log(amGloble.setting.lang);
                this.$.find(".list-item:eq(0)").unbind("vclick").vclick(function () {
//                    ADB.trackAction("Goto 'SYNC Support'", {
//                        "Market": amGloble.setting.lang.site,
//                        "Language": amGloble.setting.lang.code,
//                        "Page": "Knowledge Center",
//                        "Username": amGloble.userinfo.username,
//
//                    });
                    var data = amGloble.generateTrackData(
                        "owner app:owner support:more",
                        "",
                        "",
                        "",
                        "exit:sync support",
                        false,
                        false,
                        false,
                        false,
                        false);
                    amGloble.trackAction("referral:exit",data);

                    emap.inAppBrowser({
                        url: amGloble.setting.lang.sync
                    });

                });
                this.$.find(".list-item:eq(1)").unbind("vclick").vclick(function () {
                    console.log(amGloble.setting.lang.video);
//                    ADB.trackAction("Goto 'Ford How-to Videos'", {
//                        "Market": amGloble.setting.lang.site,
//                        "Language": amGloble.setting.lang.code,
//                        "Page": "Knowledge Center",
//                        "Username": amGloble.userinfo.username,
//
//                    });
                    var data = amGloble.generateTrackData(
                        "owner app:owner support:more",
                        "",
                        "",
                        "",
                        "exit:video",
                        false,
                        false,
                        false,
                        false,
                        false);
                    amGloble.trackAction("referral:exit",data);

                    emap.getConnectionInfo({}, function (ret) {
                        if ( ret != "wifi") {
                            emap.alert({
                                caption: "",
                                description: i18n.KNOWLEDGE_CENTRE_WIFI_WARNING,
                                okCaption: i18n.KNOWLEDGE_CENTRE_WIFI_WARNING_OK
                            }, function () {
                                emap.inAppBrowser({
                                    url: amGloble.setting.lang.video
                                });
                            });
                        }
                        else {
                            emap.inAppBrowser({
                                url: amGloble.setting.lang.video
                            });
                        }

                        emap.getConnectionInfo();
                    });

                });
            }

            var data = amGloble.generateTrackData(
                    "owner app:owner support:more",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackPage("owner app:owner support:more",data);
        },

        //after page show
        afterShow: function () {
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        }
    });

})();
