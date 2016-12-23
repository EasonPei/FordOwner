/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.service_createReminder = new $.am.Page({
        id: "service_createReminder",

        init: function () {
            var self = this;

            this.$.find(".datepicker").datepicker({
                minDate: 0,
                onSelect: function (date) {
                    self.selectDate = date;
                }
            });


            this.$.find(".rectButton").vclick(function () {
                var serviceReminder = JSON.parse(localStorage.getItem("service_reminder"));
                var userName = null;
                if (amGloble.userinfo.sessionid && amGloble.userinfo.profile) {
                    userName = amGloble.userinfo.profile.username
                }
                var validate = true;

                var vehicle = self.$.find(".inputLine .inputLineMiddle");
                if (!vehicle.text()) {
                    validate = false;
                    amGloble.msg(i18n.CREATE_REMINDER_CHOOSEPLEASE)
                }

                var vehicleVin = vehicle.data("vehicleVin");
                if (serviceReminder) {
                    $.each(serviceReminder, function () {
                        if (this.userName == userName && this.date == self.selectDate && this.vin == vehicleVin) {
                            if (self.pageParas && self.pageParas.editReminder) {
                                if (this.id != self.pageParas.editReminder.id) {
                                    validate = false;
                                    amGloble.msg(i18n.CREATE_REMINDER_EXIST)
                                }
                            } else {
                                validate = false;
                                amGloble.msg(i18n.CREATE_REMINDER_EXIST)
                            }
                        }
                    })
                }
                if (validate) {

                    var data = amGloble.generateTrackData(
                        "owner app:service:scheduler:reminder",
                        "",
                        "",
                        "",
                        "service:scheduler:save",
                        false,
                        false,
                        false,
                        false,
                        false);
                    amGloble.trackAction("owner app:service:scheduler:reminder:edit:save",data);

                    if (!serviceReminder) {
                        serviceReminder = [];
                    }
                   
                    if (self.pageParas && self.pageParas.editReminder) {
                        $.each(serviceReminder, function (index, val) {
                            if (this.id == self.pageParas.editReminder.id) {
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
                    }
                    var reminderId = (new Date()).getTime().toString();
                    var reminderTitle = i18n.DASHBOARD_MAIN_MID2 + " - " + vehicle.text();
                    var reminderNote = self.$.find(".noteInput").val();

                    serviceReminder.push({
                        id: reminderId,
                        date: self.selectDate,
                        userName: userName,
                        vehicle: vehicle.text(),
                        vin: vehicleVin,
                        title: reminderTitle,
                        note: reminderNote
                    });
                    localStorage.setItem("service_reminder", JSON.stringify(serviceReminder));

                    if (window.plugins) {
                        var startDate = new Date(self.selectDate);
                        startDate.setHours(9);
                        var endDate = new Date(self.selectDate);
                        endDate.setHours(12);
//                        ADB.trackAction("Save creation of reminder", {
//                            "Market": amGloble.setting.lang.site,
//                            "Language": amGloble.setting.lang.code,
//                            "Page": "Create Reminder",
//                            "Username": amGloble.userinfo.username,
//                            "Bussiness Data": {
//                                "Reminder Date": startDate.format("dd mmm yyyy"),
//
//                            }
//                        });

                        if (window.plugins.calendar) {
                            window.plugins.calendar.createEvent(reminderTitle, "", reminderNote, startDate, endDate);
                        }

                        if (window.plugins.notification) {
                            window.plugin.notification.local.add({
                                id: reminderId,
                                date: startDate,
                                message: reminderNote,
                                title: reminderTitle
                            });
                        }
                    }

                    var popReminder = $("#popup_reminder").show();

                    popReminder.find(".rectButton").off().vclick(function () {
                        var data = amGloble.generateTrackData(
                            "owner app:service:scheduler:reminder:create",
                            "",
                            "",
                            "",
                            "service:scheduler:confirm",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:service:scheduler:reminder:create:confirm",data);
                    
                        self.$.fadeOut(500, function () {
                            popReminder.hide();
                            $.am.changePage(amGloble.page.service_reminderList, "slideleft");
                        })
                        // popReminder.hide();

                    });

                }

            });

            
                
                this.$.find(".inputLine.inputLineDropDown").vclick(function () {
                    if (amGloble.setting && amGloble.setting.market.code == "AU") {
                    if (self.vehicleInfo) {
                        amGloble.popupMenu("My Vehicles", self.vehicleInfo, "vehiclename", function (ret) {
                            self.$.find(".inputLine .inputLineMiddle").text(ret.vehiclename).data("vehicleVin", ret.vehicle_vin);
                        });
                    }
                   }
                });
            
        },
        //before page show
        beforeShow: function (paras) {
            var self = this;
            this.pageParas = paras;

            var isChina = (amGloble.setting.market.name=="China");
            if(isChina){
                this.$.find(".datepicker").datepicker("setRegional", { // Default regional settings
                    closeText: "关闭", // Display text for close link
                    currentText: "今天", // Display text for current month link
                    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月",
                        "七月", "八月", "九月", "十月", "十一月", "十二月"], // Names of months for drop-down and formatting
                    monthNamesShort: ["1", "2", "3", "4", "5", "6",
                        "7", "8", "9", "10", "11", "12"], // For formatting
                    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], // For formatting
                    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"], // For formatting
                    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"], // Column headings for days starting at Sunday
                });
            }

            this.selectDate = (new Date()).format("mm/dd/yyyy");
            this.$.find(".datepicker").datepicker("setDate", this.selectDate);

            this.$.find(".noteInput").val("");

            if(amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR"){
                    this.$.find(".noteTitle").hide();
                    this.$.find(".noteInput").hide();
                }

            if (amGloble.userinfo.profile == null) {
                $.am.changePage(amGloble.page.login_login, "slideleft");
            } else {
                var vehicleText = self.$.find(".inputLine .inputLineMiddle")
                if (amGloble.userinfo.sessionid && amGloble.userinfo.profile && amGloble.userinfo.profile.user_vehicles) {
                    self.vehicleInfo = amGloble.userinfo.profile.user_vehicles;

                    if (paras) {
                        if (paras.vehicleVin) {
                            $.each(self.vehicleInfo, function () {
                                if (this.vehicle_vin == paras.vehicleVin) {
                                    vehicleText.text(this.vehiclename).data("vehicleVin", this.vehicle_vin);
                                }
                            })
                        } else if (paras.editReminder) {
                            self.selectDate = paras.editReminder.date;
                            this.$.find(".datepicker").datepicker("setDate", paras.editReminder.date);
                            vehicleText.text(paras.editReminder.vehicle);
                            self.$.find(".noteInput").val(paras.editReminder.note);
                        }
                    }
                    else if (amGloble.setting.market.code == "AU") {
                        vehicleText.text(self.vehicleInfo[0].vehiclename).data("vehicleVin", self.vehicleInfo[0].vehicle_vin);
                        self.$.find(".inputLine .inputLineRightView").show();
                    }
                }
            }

            var data = amGloble.generateTrackData(
                "owner app:service:scheduler:reminder:create",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:service:scheduler:reminder:create",data);
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

        selectDate: null,

        pageParas: null,

        vehicleInfo: null
    });

})();