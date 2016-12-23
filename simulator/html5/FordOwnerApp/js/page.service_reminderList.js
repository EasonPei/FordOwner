/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {


    amGloble.page.service_reminderList = new $.am.Page({
        id: "service_reminderList",

        init: function () {
            var self = this;
            this.backButtonOnclick = function () {
                var backPage = $.am.history[$.am.history.length - 1];
                if (backPage.id == "service_reminderDetail") {
                    $.am.history.pop();
                }

                if (amGloble.setting.market.code == "AU") {
                    $.am.changePage(amGloble.page.service_checklist_au, "slideright");
                } else {
                    $.am.changePage(amGloble.page.service_checklist, "slideright", { vin: self.pageParas.vehicleVin });
                }
            };
        },
        //before page show
        beforeShow: function (paras) {
            var self = this;
            if (paras && paras != 'back') {
                this.pageParas = paras;
            }

            var serviceReminder = JSON.parse(localStorage.getItem("service_reminder"));
            if (serviceReminder) {
                serviceReminder.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });

                var availableReminder = this.$.find(".reminderAvailable").empty();
                var overdueReminder = this.$.find(".reminderOverdue").empty();
                var overdueDiv = this.$.find(".Overdue").hide();
                var currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                if (amGloble.userinfo.sessionid && amGloble.userinfo.profile) {
                    var userName = amGloble.userinfo.profile.username;
                }

                var isChina = (amGloble.setting.market.name=="China");
                $.each(serviceReminder, function () {
                    if (this.userName == userName /*&& this.vin == self.pageParas.vehicleVin*/) {
                        var thisDate = new Date(this.date);
                        if (thisDate >= currentDate) {
                           if(isChina){
                             var availableHtml = '<li data-id="' + this.id + '">' + thisDate.format("yyyy-mm-dd");
                           }
                           else{
                             var availableHtml = '<li data-id="' + this.id + '">' + thisDate.format("dd mmm yyyy");
                           }
                       
                            if (self.isDuplicateDate(this.userName, this.date, serviceReminder)) {
                                availableHtml += '<div class="vehicleName">' + this.vehicle + '</div>';
                            }
                            availableHtml += '<div class="editable"><div class="am-clickable editButton"></div><div class="am-clickable deleteButton"></div></div></li>'
                            availableReminder.append(availableHtml);
                        }
                        else {
                           if(isChina){
                             var overdueHtml = '<li data-id="' + this.id + '">' + thisDate.format("yyyy-mm-dd");
                           }
                           else{
                             var overdueHtml = '<li data-id="' + this.id + '">' + thisDate.format("dd mmm yyyy");
                           }
                       
                            if (self.isDuplicateDate(this.userName, this.date, serviceReminder)) {
                                overdueHtml += '<div class="vehicleName">' + this.vehicle + '</div>';
                            }
                            overdueHtml += '<div class="editable"><div class="am-clickable deleteButton"></div></div></li>'
                            overdueDiv.show();
                            overdueReminder.append(overdueHtml);
                        }
                    }
                });

                self.scrollview && self.scrollview.refresh();
            }

            //reminder action
            var action = 0;
            this.$.find(".createReminderBtn").off().vclick(function () {
                $.am.changePage(amGloble.page.service_createReminder, "slideleft", self.pageParas);
            });
            this.$body.find("li").on("swipeleft", function (e) {
                action = 1;
                var $target = $(e.target);
                if ($target.hasClass("vehicleName")) {
                    $target = $target.closest("li");
                }
                self.$body.find(".editable, .editButton, .deleteButton").animate({ width: "0px" });

                $target.find(".editable").animate({ width: "100px" });
                $target.find(".editButton, .deleteButton").animate({ width: "40px" });
            }).on("swiperight", function (e) {
                action = 1;
                var $target = $(e.target);
                if ($target.hasClass("vehicleName")) {
                    $target = $target.closest("li");
                }
                $target.find(".editable, .editButton, .deleteButton").animate({ width: "0px" });
            }).vclick(function (event) {
                var $target = $(event.target);
                if ($target.hasClass("vehicleName")) {
                    $target = $target.closest("li");
                }
                if (action == 0 && !$target.hasClass("editButton") && !$target.hasClass("deleteButton")) {
                    var thisObj = $(this);
                    var reminderObj;
                    $.each(serviceReminder, function () {
                        if (this.id == thisObj.attr("data-id")) {
                            reminderObj = this;
                        }
                    });
                    if (reminderObj) {
                        $.am.changePage(amGloble.page.service_reminderDetail, "slideleft", { showReminder: reminderObj });
                    }

                }
                else {
                    action = 0;
                }
            });

            this.$.find(".editButton").off().vclick(function (event) {
                action = 2
                var thisObj = $(this).closest("li");
                var reminderObj;
                $.each(serviceReminder, function () {
                    if (this.id == thisObj.attr("data-id")) {
                        reminderObj = this;
                    }
                });
                if (reminderObj) {
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

                    window.setTimeout(function () {
                        $.am.changePage(amGloble.page.service_createReminder, "slideleft", { editReminder: reminderObj });
                    }, 200);
                }
            });

            this.$.find(".deleteButton").off().vclick(function (event) {
                action = 3;
                var thisObj = $(this).closest("li");

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
                    $.each(serviceReminder, function (index, val) {
                        if (this.id == thisObj.attr("data-id")) {
                            serviceReminder.splice(index, 1);

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

                    localStorage.setItem("service_reminder", JSON.stringify(serviceReminder));
                    thisObj.remove();

                }, function (ret) {
                    //fail 
                });
            });

            var data = amGloble.generateTrackData(
                "owner app:service:scheduler:reminder",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:service:scheduler:reminder",data);
        },

        //after page show
        afterShow: function () {
        },
        //before page hide
        beforeHide: function () {
            this.$body.find(".editable, .editButton, .deleteButton").animate({ width: "0px" });
        },
        //after page hide
        afterHide: function () {

        },
        isDuplicateDate: function (userName, date, list) {
            var count = 0;
            $.each(list, function () {
                if (this.userName == userName && this.date == date) {
                    count++;
                }
            });
            return count > 1;
        },
        pageParas: null
    });


})();