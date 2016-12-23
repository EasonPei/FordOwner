/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.service_checklist_KR = new $.am.Page({
        id: "service_checklist_KR",

        init: function () {
        },
        //before page show
        beforeShow: function (paras) {
            var self = this;
            self.paras = paras;
        },

        //after page show
        afterShow: function () {
            var self = this;
            this._error = null;

            var userVehicles = amGloble.userinfo.profile.user_vehicles;
            self.getCheckList(userVehicles);

            // if (amGloble.userinfo.sessionid == null) {
            //     amGloble.loading.hide();
            //     $.am.changePage(amGloble.page.login_login, "");
            //     return;
            // }
            // else {
            //     amGloble.loading.show(i18n.COMMON_LOADING);
            //     if (amGloble.userinfo.profile && amGloble.userinfo.profile.user_vehicles) {
            //         var userVehicles = amGloble.userinfo.profile.user_vehicles;

            //         userVehicles = $.grep(userVehicles, function(vehicle){
            //             var model = vehicle.model;
            //             if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[model]){
            //                 model = amGloble.setting.lang.modelcode[model];
            //             }
            //             return model != "Other Ford Vehicle";
            //         });

            //         if (userVehicles.length > 0) {
            //             var validateModel = true;
            //             var vehicleLoaded = 0;

            //             $.each(userVehicles, function () {
            //                 if (this.model == null) {
            //                     validateModel = false;
            //                 }
            //             });

            //             if (validateModel == false) {
            //                 amGloble.api.getVehicle(function () {
            //                     vehicleLoaded++;
            //                     if (vehicleLoaded == userVehicles.length) {
            //                         self.getCheckList(userVehicles);
            //                     }
            //                 }, function () {
            //                     $.am.changePage(amGloble.page.common_oops, "slideleft",{
            //                         title: "",
            //                         message: "",
            //                         detail: ret
            //                     });
            //                 });
            //             }
            //             else {
            //                 self.getCheckList(userVehicles);
            //             }

            //         }
            //     }
            // }
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        },

        showCheckList: null,
        _error: null,

        getCheckList: function (userVehicles) {
            var self = this;
            var checkListData = [];
            var processCount = -1;

            var url = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/checklist/" + amGloble.setting.market.code + "/Ford%20Vehicle/" + amGloble.setting.lang.code + "/rules.json";
            $.ajax(url, {
                dataType: "json",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function (data) {
                    var ajaxObj = this;
                    processCount++;
                    var ruleData = data;
                    var maintenanceList = [];
                    $.each(ruleData.maintenanceService, function () {
                        var thisObj = this;
                        maintenanceList.push({
                            engineType: thisObj.engineType,
                            checkPoint: 1
                        });
                    });


                    checkListData[0] = {
                        vehicleData: userVehicles[0],
                        ruleData: ruleData,
                        maintenanceList: maintenanceList
                    };

                    if (processCount == userVehicles.length - 1) {
                        var storageData = JSON.parse(localStorage.getItem("service_checklist"));
                        if (checkListData) {
                            $.each(checkListData, function (index, val) {
                                var cdata = this;

                                var dataExist = false;
                                if (!storageData) {
                                    storageData = [];
                                } else {
                                    $.each(storageData, function () {
                                        if (cdata.userName == this.userName && cdata.vehicleData.vehicle_vin == this.vehicleData.vehicle_vin) {
                                            checkListData[index].maintenanceList = this.maintenanceList;
                                            dataExist = true;
                                        }
                                    });
                                }

                                if (!dataExist) {
                                    storageData.push(cdata);
                                }
                            });
                        }

                        localStorage.setItem("service_checklist", JSON.stringify(storageData));

                        if (checkListData.length > 0) {
                            self.generateChecklistPages(checkListData);
                            var showIndex = 0;
                            if (self.paras && self.paras.vin) {
                                $.each(checkListData, function (index) {
                                    if (this.vehicleData.vehicle_vin == self.paras.vin) {
                                        showIndex = index;

                                        var data = amGloble.generateTrackData(
                                                    "owner app:service:scheduler",
                                                    this.vehicleData.modelyear,
                                                    this.vehicleData.model,
                                                    "",
                                                    "",
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false);
                                        amGloble.trackPage("owner app:service:scheduler:"+this.vehicleData.model,data);
                                    }
                                });
                            }

                            self.showCheckList = "service_checklist" + showIndex;
                            $.am.changePage(amGloble.page[self.showCheckList], "");
                        }
                    }
                },
                error: function (ret) {
                    self._error = { message: ret.statusText, detail: ret };
                    $.am.changePage(amGloble.page.common_oops, "slideleft", self._error);
                },
                index: i
            });
        },

        generateChecklistPages: function (checklistData) {
            $.each(checklistData, function (index, val) {
                var pageId = "service_checklist" + index;
                var vehicleData = this.vehicleData;
                var ruleData = this.ruleData;
                var maintenanceList = this.maintenanceList;

                var pageHtml = '<div class="am-page service_checklist" id="' + pageId + '" data-vin="' + vehicleData.vin + '"><div class="am-header"><span href="#" class="am-clickable am-backbutton left button"></span>' + '<p>' + i18n.CHECKLIST_TITLE + '</p></div><div class="am-body-wrap"><div class="am-body-inner"><div class="title">' + vehicleData.vehiclename;
                if (index != 0) {
                    pageHtml += '<div class="am-clickable prevButton"></div>';
                }
                if (index != checklistData.length - 1) {
                    pageHtml += '<div class="am-clickable nextButton"></div>';
                }
                pageHtml += '<div><ul id="serviceTab"></ul></div></div></div><div class="am-clickable rectButton">' + i18n.CHECKLIST_REMINDER_BUTTON + '</div></div></div>';

                $("#service_checklist").after(pageHtml);

                amGloble.page[pageId] = new $.am.Page({
                    id: pageId,

                    init: function () {
                        var self = this;

                        var serviceTab = self.$.find("#serviceTab");
                        var title = self.$.find(".title");
                        var tabWidth = 100 / self.ruleData.maintenanceService.length;
                        $.each(self.ruleData.maintenanceService, function (index, value) {
                            var currentMaintenance = this;

                            var checkValue = 1;
                            $.each(maintenanceList, function () {
                                if (this.engineType == currentMaintenance.engineType) {
                                    checkValue = this.checkPoint;
                                }
                            });

                            if (index == 0) {
                                var data = amGloble.generateTrackData(
                                    "owner app:service:scheduler:"+this.engineType,
                                    vehicleData.modelyear,
                                    vehicleData.model,
                                    "",
                                    "",
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                                amGloble.trackPage("owner app:service:scheduler:"+this.engineType+":"+vehicleData.model,data);
                            };

                            serviceTab.append('<li class="am-clickable ' + (index == 0 ? 'selected' : '') + '" style="width:' + tabWidth + '%"><div>' + this.engineType + '</div></li>');
                            var serviceDetailHtml = '<div class="serviceTabContent ' + (index == 0 ? 'active' : '') + '" data-engine-type="' + this.engineType + '">'
                             + '<div class="logoView"><div class="checkpoint_subtract"></div><div class="checkpoint_add"></div><div class="distance">10</div><div class="distance2">K</div>' + '<div class="subtitle">' + i18n.CHECKLIST_MAINTANCE_LABEL
                             + '</div></div><div class="progressBar">' + '<input class="sliderBar" min="1" max="' + this.serviceDetail.length + '" value="' + checkValue + '" data-highlight="true" />' + '</div>';

                           if (currentMaintenance.hasOwnProperty("notes")) {
                             serviceDetailHtml += '<div class="cost"><div class="totalCost">';
                             if(i18n.CHECKLIST_TOTAL_COST){
                               serviceDetailHtml += '' + i18n.CHECKLIST_TOTAL_COST + ':<span class="price"></span>';
                             }
                             else{
                               serviceDetailHtml += '&nbsp;<span class="price"></span>';
                             }
                               serviceDetailHtml += '</div></div>';
                           }                            

                            serviceDetailHtml += '<div class="listContainer"><ul class="checklist"></ul>';

                            if (currentMaintenance.hasOwnProperty("notes")) {
                                serviceDetailHtml += '<ul class="notes"></ul>';
                            }

                            serviceDetailHtml += '</div></div>';

                            title.after(serviceDetailHtml);
                        });

                        serviceTab.find("li").vclick(function () {
                            serviceTab.find("li.selected").removeClass("selected");
                            var currentTab = $(this).addClass("selected").text();

                            var data = amGloble.generateTrackData(
                                    "owner app:service:scheduler:"+currentTab,
                                    "",
                                    "",
                                    "",
                                    "service:"+currentTab,
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                            amGloble.trackAction("owner app:service:scheduler"+currentTab,data);

                            self.$.find(".serviceTabContent.active").removeClass("active");
                            self.$.find(".serviceTabContent[data-engine-type='" + currentTab + "']").addClass("active");

                            self.resizeListContainer();
                        });

                        this.backButtonOnclick = function () {
                            $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
                        };

                        this.$.find(".rectButton").vclick(function () {
                            $.am.changePage(amGloble.page.service_reminderList, "slideleft", {
                                vehicleVin: vehicleData.vehicle_vin
                            });
                        });

                        this.$.find(".nextButton").vclick(function () {
                            var id = $(this).closest(".service_checklist").attr("id");
                            var index = parseInt(id.charAt(id.length - 1));
                            var pageId = "service_checklist" + (index + 1);
                            $.am.changePage(amGloble.page[pageId], "slideleft");
                        });
                        this.$.find(".prevButton").vclick(function () {
                            var id = $(this).closest(".service_checklist").attr("id");
                            var index = parseInt(id.charAt(id.length - 1));
                            var pageId = "service_checklist" + (index - 1);
                            $.am.changePage(amGloble.page[pageId], "slideright");
                        });

                        this.$.find(".checkpoint_subtract").vclick(function () {
                            var currentContent = $(this).closest(".serviceTabContent");
                            var sliderInput = currentContent.find(".ui-slider input.sliderBar.ui-slider-input");
                            var changeValue = parseInt(sliderInput.val()) - 1;
                            sliderInput.val(changeValue);
                            currentContent.find(".sliderBar").slider("refresh");
                            var param = { target: sliderInput[0] };
                            refreshServiceItems(param);
                            
                        });

                        this.$.find(".checkpoint_add").vclick(function () {
                            var currentContent = $(this).closest(".serviceTabContent");
                            var sliderInput = currentContent.find(".ui-slider input.sliderBar.ui-slider-input");
                            var changeValue = parseInt(sliderInput.val()) + 1;
                            sliderInput.val(changeValue);
                            currentContent.find(".sliderBar").slider("refresh");
                            var param = { target: sliderInput[0] };
                            refreshServiceItems(param);
                        });



                        var refreshServiceItems = function (event, ui) {
                            var sliderVal = event.target.value - 1;
                            var currentContent = $(event.target).closest(".serviceTabContent");
                            var currentTab = currentContent.attr("data-engine-type");

                            $.each(self.ruleData.maintenanceService, function (index, value) {
                                if (this.engineType == currentTab) {
                                    var detail = this.serviceDetail[sliderVal];
                                    var mileage = detail.mileage;

                                    if( (typeof event.type == "undefined") || (event.type == "slidestop") ){
                                        var data = amGloble.generateTrackData(
                                                "owner app:service:scheduler:change mileage",
                                                "",
                                                "",
                                                "",
                                                "service:change mileage",
                                                false,
                                                false,
                                                false,
                                                false,
                                                false);
                                        amGloble.trackAction("owner app:service:scheduler:change mileage",data);
                                    }

                                    currentContent.find(".distance").text(mileage);

                                    if (detail.hasOwnProperty("laborCost") && detail.totalCost) {
                                   currentContent.find(".cost .totalCost .price").text((i18n.CURRENCY_UNIT?i18n.CURRENCY_UNIT:"₹")+" "+ detail.totalCost);
                                    }


                                    var checklist = currentContent.find(".checklist");
                                    checklist.empty();
                                    $.each(detail.serviceItems, function (index, value) {
                                        var itemContent = '<li><div class="idx">' + (index + 1) + '</div><div class="item">' + value + '</div>';
                                        if (detail.partsCost && detail.partsCost[index]) {
                                            itemContent += '<span class="price">'+(i18n.CURRENCY_UNIT?i18n.CURRENCY_UNIT:"₹")+' ' + detail.partsCost[index] + '</span>';
                                        }
                                        itemContent += '</li>';

                                        checklist.append(itemContent);
                                    });
                                    if (this.hasOwnProperty("notes") && i18n.CHECKLIST_LABOR_COST) {
                                        var laborCost = detail.laborCost || 0;
                                        checklist.append('<li><div class="idx">&nbsp</div><div class="item">' + i18n.CHECKLIST_LABOR_COST + ':</div><span class="price">'+(i18n.CURRENCY_UNIT?i18n.CURRENCY_UNIT:"₹")+' ' + laborCost + '</span></li>');
                                    }

                                    var notesContainer = currentContent.find(".notes").empty();
                                    if (this.hasOwnProperty("notes")) {
                                        var notes = "";
                                        if (this.notes) {
                                            notes += '<li><div class="title">' + (i18n.CHECKLIST_NOTE?(i18n.CHECKLIST_NOTE+':'):"") + '</div><div class="content">' + this.notes.replace("\n", "<br/>") + '</div></li>';
                                        }
                                        if(i18n.CHECKLIST_DISCLAIMERS){
                                            notes += '<li><div class="title">' + i18n.CHECKLIST_DISCLAIMERS + ':</div><div class="content">' + i18n.CHECKLIST_DISCLAIMERS_CONTENT + '</div></li>';
                                        }
                                    }
                                    notesContainer.append(notes);

                                }
                            });

                            self.resizeListContainer();
                            self.scrollview && self.scrollview.refresh();
                        };

                        this.$.find(".sliderBar").slider({
                            stop: refreshServiceItems,
                            create: refreshServiceItems
                        });

                        this.$.find(".menubutton").vclick(function () {
                            amGloble.slideBar.main.show();
                        });
                    },
                    //before page show
                    beforeShow: function (paras) {
                        amGloble.loading.hide();

                        if (typeof paras == "undefined") {
                            var data = amGloble.generateTrackData(
                                "owner app:service:scheduler",
                                vehicleData.modelyear,
                                vehicleData.model,
                                "",
                                "service:change vehicle",
                                true,
                                false,
                                false,
                                false,
                                false);
                            amGloble.trackAction("owner app:service:scheduler:"+vehicleData.model,data);
                        };
                    },

                    //after page show
                    afterShow: function () {
                        this.resizeListContainer();
                    },
                    //before page hide
                    beforeHide: function () {
                        var self = this;
                        var vin = $("#" + this.id).data().vin;

                        var maintenanceList = [];
                        this.$.find("#serviceTab li").each(function () {
                            var thisObj = $(this);
                            var checkVal = self.$.find(".serviceTabContent[data-engine-type='" + thisObj.text() + "'] a.ui-slider-handle").attr("title");

                            maintenanceList.push({
                                engineType: thisObj.text(),
                                checkPoint: checkVal
                            });

                        });

                        var checklistData = JSON.parse(localStorage.getItem("service_checklist"));
                        if (checklistData) {
                            $.each(checklistData, function () {
                                if (this.vehicleData.vehicle_vin == vin) {
                                    this.maintenanceList = maintenanceList;
                                }
                            });
                        }
                        localStorage.setItem("service_checklist", JSON.stringify(checklistData));
                    },
                    //after page hide
                    afterHide: function () {
                    },

                    resizeListContainer: function () {
                        var listContainer = this.$.find(".serviceTabContent.active .listContainer");
                        listContainer.removeAttr("style");
                        var rectButton = this.$.find(".rectButton");
                        var showHeight = rectButton[0].offsetTop - listContainer[0].offsetTop - 30;
                        if (listContainer.height() < showHeight) {
                            listContainer.height(showHeight);
                        } else {
                            listContainer.height(listContainer.height() + 45);
                        }
                    },

                    ruleData: ruleData,
                    vehicleVin: vehicleData.vehicle_vin
                });

                amGloble.page[pageId].componentInit();
                amGloble.page[pageId].init();
            });
        }
    });
})();