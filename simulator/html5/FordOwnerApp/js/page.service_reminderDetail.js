/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {


    amGloble.page.service_reminderDetail = new $.am.Page({
        id: "service_reminderDetail",

        init: function () {
            var self = this;

            this.$.find(".editButton").vclick(function () {
                var data = amGloble.generateTrackData(
                    "owner app:service:scheduler:reminder",
                    "",
                    "",
                    "",
                    "service:scheduler:edit",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:service:scheduler:reminder:edit",data);

                if (self.pageParas && self.pageParas.showReminder) {
                    $.am.changePage(amGloble.page.service_createReminder, "slideleft", { editReminder: self.pageParas.showReminder });
                }
            });

            this.$.find(".deleteButton").vclick(function () {
                var data = amGloble.generateTrackData(
                    "owner app:service:scheduler:reminder",
                    "",
                    "",
                    "",
                    "service:scheduler:delete",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:service:scheduler:reminder:delete",data);

                emap.confirm({
                    caption: "",
                    description: i18n.SERVICE_REMINDER_DELETE_DESCRIPTION,
                    okCaption: i18n.SERVICE_REMINDER_DELETE_YES,
                    cancelCaption: i18n.SERVICE_REMINDER_DELETE_NO
                }, function (ret) {
                    if (self.pageParas && self.pageParas.showReminder) {
                        var serviceReminder = JSON.parse(localStorage.getItem("service_reminder"));
                        if (serviceReminder) {
                            $.each(serviceReminder, function (idx, val) {
                                if (this.id == self.pageParas.showReminder.id) {
                                    serviceReminder.splice(idx, 1);

                                    if (window.plugins) {
                                        if (window.plugins.calendar) {
                                            var sdate = new Date(this.date);
                                            sdate.setHours(9);
                                            var edate = new Date(this.date);
                                            edate.setHours(12);
                                            window.plugins.calendar.deleteEvent(this.title, "", this.note, sdate, edate);
                                        }

                                        if (window.plugins.notification) {
                                            window.plugin.notification.local.cancel(this.id);
                                        }
                                    }
                                }
                            });
                        }
                        localStorage.setItem("service_reminder", JSON.stringify(serviceReminder));

                        $.am.changePage(amGloble.page.service_reminderList, "slideleft");
                    }
                });
            });

            this.$.find(".rectButton").vclick(function () {
                if(amGloble.setting.market.code == "KR"){
                   emap.inAppBrowser({
                        url: "http://m.ford-korea.com/research/dealer-locate"
                    });
                   return; 
                }
                $.am.changePage(amGloble.page.dealer_listview, "slideleft");
            });

        },
        //before page show
        beforeShow: function (paras) {
            var selft = this;
            if (paras && paras != 'back') {
                this.pageParas = paras;
            }

            if (paras && paras.showReminder) {
                var showDate = new Date(paras.showReminder.date);
                var currentDate = (new Date()).setHours(0, 0, 0, 0);
                if (showDate < currentDate) {
                    this.$.find(".editButton").hide();
                 }else{
                    this.$.find(".editButton").show();
                 }
              var isChina = (amGloble.setting.market.name=="China");
               if(isChina){
                 this.$.find(".reminderDetailDate").text(showDate.format("yyyy-mm-dd"));
               }
               else{
                 this.$.find(".reminderDetailDate").text(showDate.format("dd mmm yyyy"));
               }

               if(amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR"){
                    this.$.find("#myCar").hide();
                    this.$.find("#myVin").hide();
                    this.$.find("#myDetail").hide();
                    //this.$.find(".rectButton").hide();
                }
                
                this.$.find("#myCar").text(paras.showReminder.vehicle);
                this.$.find("#myVin").text(paras.showReminder.vin);
                this.$.find("#myDetail").html(paras.showReminder.note.replace("\n", "<br/>"));

                var reminderDetailNote = this.$.find(".reminderDetailNote");

                if (amGloble.userinfo.sessionid && amGloble.userinfo.profile && amGloble.userinfo.profile.user_vehicles) {
                    var userVehicles = amGloble.userinfo.profile.user_vehicles;
                    $.each(userVehicles, function () {
                        if (this.vin == paras.showReminder.vin) {
                           var model = this.model;
                           reminderDetailNote.text((i18n.SERVICE_REMINDER_TIPS?i18n.SERVICE_REMINDER_TIPS:reminderDetailNote.text()).replace("{model}", model));
                           reminderDetailNote.text(reminderDetailNote.text().replace("{车型}", model));
                        }
                    });

                }

            }

            var data = amGloble.generateTrackData(
                "owner app:service:scheduler:reminder:detail",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:service:scheduler:reminder:detail",data);
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

        pageParas: null
    });


})();