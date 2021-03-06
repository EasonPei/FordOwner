﻿/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.fuyu_repair = new $.am.Page({
        id: "fuyu_repair",

        init: function () {
            this.$.find(".right.button").vclick(function () {
                $.am.changePage(amGloble.page.fuyu_dashboard, "slideright");
            });
        },
        //before page show
        beforeShow: function (paras) {
            var self = this;

            if (amGloble.userinfo && amGloble.userinfo.profile) {
                var serverUrl = amGloble.setting.lang.fuyu + "/club_mobile/carhistory/carHistoryListForApp.htm";
                $.ajax(serverUrl, {
                    data: JSON.stringify({ "vname": amGloble.fyuserinfo.username, "vaccessToken": amGloble.fyuserinfo.accessToken }),
                    cache: false,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
					timeout : amGloble.setting.market.timeout || 30000,
                    beforeSend: function () {
                        amGloble.loading.show();
                    },
                    success: function (data) {
                        amGloble.loading.hide();

                        if (data && data.responseCode == "0000000") {
                            if (data.carInfoList && data.carInfoList.length > 0) {
                                var contentWrapper = self.$.find(".content_wrapper").empty();
                                $.each(data.carInfoList, function () {
                                    var carInfo = this;
                                    var item = ' <div class="list-item am-clickable"><div class="title-item"><div class="icon icon-vehicle"></div><div class="center">'
                                        + '<div class="line1">' + carInfo.carType + '</div><div class="line2"><span class="light">VIN</span> ' + carInfo.vin + ' ' + carInfo.carColor
                                        + '</div></div><div class="button"></div></div></div>';
                                    var itemObj = $(item).vclick(function () {
                                        $.am.changePage(amGloble.page.fuyu_repairList, "slideleft", carInfo);
                                    });
                                    contentWrapper.append(itemObj);
                                });
                            }

                            self.scrollview && self.scrollview.refresh();
                        }
                        else {
                            if (data.responseCode == "000001") {
                                amGloble.msg("登录会话超时");
                            }
                            else if (data.responseCode == "0000099") {
                                amGloble.msg("用户未登录");
                            }
                            else if (data.responseCode == "0000020") {
                                amGloble.msg("系统错误");
                            }
                            else if (data.responseCode == "0000003") {
                                amGloble.msg("非车主无权限访问");
                            }
                        }
                    }
                });
            }
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
