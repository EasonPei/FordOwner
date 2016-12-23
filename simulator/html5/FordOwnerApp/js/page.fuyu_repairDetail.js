/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.fuyu_repairDetail = new $.am.Page({
        id: "fuyu_repairDetail",

        init: function () {
            var self = this;

            this.$.find(".mainTab li").vclick(function () {
                var mainTab = self.$.find(".mainTab li");
                mainTab.filter(".selected").removeClass("selected");
                $(this).addClass("selected");
                var index = mainTab.index(this);
                self.$.find(".tabContent.active").removeClass("active");
                self.$.find(".tabContent").eq(index).addClass("active");
                var catgory=["Basic","Repair Part","Labor","Sale Part","Addition"];
//                ADB.trackAction("Check different information", {
//						"Market" : amGloble.setting.lang.site,
//						"Language" : amGloble.setting.lang.code,
//						"Page" : "FUYU Maintenance Record",
//						"Username" : amGloble.userinfo.username,
//						"Bussiness Data" : {
//							"Maintenance Record Category" : catgory[index]
//						}
//					});
            });
        },
        //before page show
        beforeShow: function (paras) {
            var self = this;

            if (amGloble.fyuserinfo && amGloble.fyuserinfo.accessToken && paras && paras.vin) {
                var serverUrl = amGloble.setting.lang.fuyu + "/club_mobile/carhistory/carHistoryDetailForApp.htm";
                $.ajax(serverUrl, {
                    data: JSON.stringify({ "vname": amGloble.fyuserinfo.username, "vaccessToken": amGloble.fyuserinfo.accessToken, "vvin": paras.vin, "vrepairId": paras.repairId }),
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
                            if (data.carInfo) {
                                var tdlist = self.$.find(".carInfo td");
                                for (var prop in data.carInfo) {
                                    if (typeof (data.carInfo[prop]) != "function") {
                                        var showText = data.carInfo[prop];
                                        if (prop.indexOf("Fee") > 0) {
                                            showText += " 元";
                                        }

                                        tdlist.filter("." + prop).text(showText);
                                    }
                                }
                            }

                            if (data.repairPartInfo) {
                                var repairPartInfo = self.$.find(".repairPartInfo ul").empty();
                                if (data.repairPartInfo instanceof Array) {
                                    $.each(data.repairPartInfo, function () {
                                        var content = '<li><div class="left">x' + this.npartNum + '</div><div class="middle"><div class="line1">' + this.vpartName + '</div>'
                                        + '<div class="line2">配件代码  ' + this.vpartCode + '</div></div><div class="right">' + this.npartSaleFee + '<sup class="small">￥</sup></div></li>';
                                        repairPartInfo.append(content);
                                    });
                                }
                                else {
                                    var content = '<li><div class="left">x' + data.repairPartInfo.npartNum + '</div><div class="middle"><div class="line1">' + data.repairPartInfo.vpartName + '</div>'
                                        + '<div class="line2">配件代码  ' + data.repairPartInfo.vpartCode + '</div></div><div class="right">' + data.repairPartInfo.npartSaleFee + '<sup class="small">￥</sup></div></li>';
                                    repairPartInfo.append(content);
                                }
                            }

                            if (data.laborInfo) {
                                var laborInfo = self.$.find(".laborInfo ul").empty();
                                if (data.laborInfo instanceof Array) {
                                    $.each(data.laborInfo, function () {
                                        var content = '<li><div class="middle"><div class="line1">' + this.vitemName + '</div><div class="line2"><div class="detailItem">项目代码 ' + this.vitemCode + '</div><div class="detailItem">工时单价 '
                                          + this.nitemCost + '</div><br><div class="detailItem">工时数量 ' + this.nlaborHour + '</div>折扣系数  ' + this.ndiscountRate + '</div>'
                                          + '</div><div class="right">' + this.nlaborFee + '<sup class="small">￥</sup></div></li>';
                                        laborInfo.append(content);
                                    });
                                }
                                else {
                                    var content = '<li><div class="middle"><div class="line1">' + data.laborInfo.vitemName + '</div><div class="line2"><div class="detailItem">项目代码 ' + data.laborInfo.vitemCode + '</div><div class="detailItem">工时单价 '
                                          + data.laborInfo.nitemCost + '</div><br><div class="detailItem">工时数量 ' + data.laborInfo.nlaborHour + '</div>折扣系数  ' + data.laborInfo.ndiscountRate + '</div>'
                                          + '</div><div class="right">' + data.laborInfo.nlaborFee + '<sup class="small">￥</sup></div></li>';
                                    laborInfo.append(content);
                                }

                            }

                            if (data.salePartInfo) {
                                var salePartInfo = self.$.find(".salePartInfo ul").empty();
                                if (data.salePartInfo instanceof Array) {
                                    $.each(data.salePartInfo, function () {
                                        var content = '<li><div class="left">x' + this.npartNum + '</div><div class="middle"><div class="line1">' + this.vpartName + '</div>'
                                           + '<div class="line2">配件代码  ' + this.vpartCode + '</div></div><div class="right">' + this.npartSaleFee + '<sup class="small">￥</sup></div></li>';
                                        salePartInfo.append(content);
                                    });
                                }
                                else {
                                    var content = '<li><div class="left">x' + data.salePartInfo.npartNum + '</div><div class="middle"><div class="line1">' + data.salePartInfo.vpartName + '</div>'
                                          + '<div class="line2">配件代码  ' + data.salePartInfo.vpartCode + '</div></div><div class="right">' + data.salePartInfo.npartSaleFee + '<sup class="small">￥</sup></div></li>';
                                    salePartInfo.append(content);
                                }
                            }

                            if (data.additionInfo) {
                                var additionInfo = self.$.find(".additionInfo ul").empty();
                                if (data.additionInfo instanceof Array) {
                                    $.each(data.additionInfo, function () {
                                        var content = '<li><div class="middle"><div class="line1">' + this.vitemName + '</div><div class="line2"><div class="detailItem">项目代码 ' + this.vitemType + '</div>附加项目代码 '
                                            + this.vitemCode + '</div></div><div class="right">' + this.nadditionFee + '<sup class="small">￥</sup></div></li>';
                                        additionInfo.append(content);
                                    });
                                }
                                else {
                                    var content = '<li><div class="middle"><div class="line1">' + data.additionInfo.vitemName + '</div><div class="line2"><div class="detailItem">项目代码 ' + data.additionInfo.vitemType + '</div>附加项目代码 '
                                           + data.additionInfo.vitemCode + '</div></div><div class="right">' + data.additionInfo.nadditionFee + '<sup class="small">￥</sup></div></li>';
                                    additionInfo.append(content);
                                }
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
                    },
                    error : function(ret) {
                        amGloble.loading.hide();
                        console.log(ret);
                        
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
