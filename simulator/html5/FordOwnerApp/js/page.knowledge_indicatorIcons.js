/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.knowledge_indicatorIcons = new $.am.Page({
        id: "knowledge_indicatorIcons",
        // indicators : [],
        // indicator_self : null,
        // //nameArray : [],
        // downloaStorageInfo : {},
        // downloadTaskNum : 0,
        // m_code:"",
        // model:"",
        // l_code:"",
        // i_server:"http://apacvideo.ford.com.edgesuite.net/Mobile-App/akamai/app/indicator/",

        init: function () {
            this.$.find(".tabs div").eq(3).vclick(function () {
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

            this.$.find(".indicatoricon").vclick(function () {
                $.am.changePage(amGloble.page.knowledge_indicatorDetail, "slideleft");
            });

            this.backButtonOnclick = function () {
                $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
            };
        },
        //before page show
        beforeShow: function (paras) {
            this.error = null;
            indicatorPage = this;
            var self = this;
            var loginBtn = this.$.find(".loginAlert-forlist");
            var commontitle = this.$.find(".commoniconslabel");
            var specialtitle = this.$.find(".inputLineDropDown");

            self.getResourceVersion();

            if (amGloble.userinfo.profile != null) {
                loginBtn.hide();
                commontitle.hide();
                specialtitle.show();

                if (amGloble.userinfo.profile.user_vehicles != null) {

                    if (self.currentModel != null) {
                        var existModel = false;
                        $.each(amGloble.userinfo.profile.user_vehicles, function () {
                            if (self.currentModel == this.model) {
                                existModel = true;
                                self.$.find("input").val(this.vehiclename);
                            }
                        });

                        if (existModel == false) {
                            self.currentModel = null;
                        }
                    }

                    if (self.currentModel == null || self.currentModel == "common") {
                        self.currentModel = amGloble.userinfo.profile.user_vehicles[0].model;
                        self.$.find("input").val(amGloble.userinfo.profile.user_vehicles[0].vehiclename);
                    }

                    if (amGloble.userinfo.profile.user_vehicles.length > 1) {
                        var list = [];

                        for (var i = 0; i < amGloble.userinfo.profile.user_vehicles.length; i++) {
                            list.push({
                                title: amGloble.userinfo.profile.user_vehicles[i].vehiclename,
                                value: i,
                                v2: 1
                            });
                        }
                        this.$.find(".inputLineRightView").show();
                        this.$.find(".inputLineRightView").unbind("vclick").vclick(function () {

                            amGloble.popupMenu(i18n.PROFILE_MYVEHICLE_VEHICLE, list, "title", function (ret) {
                                self.$.find("input").val(ret.title);
                                self.currentModel = amGloble.userinfo.profile.user_vehicles[ret.value].model;
                                self.getIndicatorConfigure();
                            });
                        });
                    } else {
                        this.$.find(".inputLineRightView").hide();
                    }
                } else {
                    self.currentModel = "common";
                    this.$.find("input").val(i18n.KNOWLEDGE_CENTRE_ALLICONS);
                    //loginBtn.show();
                    //commontitle.show();
                    //specialtitle.hide();
                    // loginBtn.vclick(function() {
                    // $.am.changePage(amGloble.page.login_login, "slideleft");
                    // });
                }

            } else {
                self.currentModel = "common";
                this.$.find("input").val(i18n.KNOWLEDGE_CENTRE_ALLICONS);
                loginBtn.show();
                commontitle.show();
                specialtitle.hide();
                loginBtn.vclick(function () {
                    $.am.changePage(amGloble.page.login_login, "slideleft");
                });
            }
            this.getIndicatorConfigure();

            var data = amGloble.generateTrackData(
                "owner app:owner support",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:owner support",data);
            //this.test();
        },

        //after page show
        afterShow: function () {
//            if (this.error) {
//                $.am.changePage(amGloble.page.common_oops, "slideleft");
//            }
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        },

        currentModel: null,
        downloaStorageInfo: null,
        downloadTaskNum: null,
        indicators: null,
        error: null,

        getIndicatorConfigure: function () {
            var self = this;

            if (self.isNeedToDownload() == true) {
                self.clearResources();
                self.updateVersionInfo();
            }

            var indicatorFile = JSON.parse(localStorage.getItem("indicator_config"));
            var storeName = (self.currentModel + "_" + amGloble.setting.lang.code).replace(/[ ]/g, "") + "_indicator";
            if (indicatorFile == null || indicatorFile[storeName] == null) {
                self.downloadIndicatorConfigFile();
            } else {
                var configContent = indicatorFile[storeName];
                var opt = [configContent.fullPath];
                cordova.exec(function (ret) {
                    if (ret) {
                        var entry = new FileEntry(configContent.name, configContent.fullPath, new FileSystem(configContent.filesystemName));
                        var option = [entry.toURL(), "UTF-8", 0, -1];
                        cordova.exec(self.generateIndicatorPage, function () {
                        }, "File", "readAsText", option);
                    }
                    else {
                        self.downloadIndicatorConfigFile();
                    }
                }, function () {
                }, "File", "testFileExists", opt);
            }
            //var serverConfig = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/indicator/" + amGloble.setting.market.code + "/" + self.currentModel + "/" + amGloble.setting.lang.code + "/indicator.json";
            //$.ajax({
            //    url: serverConfig,
            //    dataType: "json",
            //    timeout: amGloble.setting.market.timeout || 30000,
            //    success: function (data) {
            //        var indicatorData = JSON.stringify(data);
            //        self.generateIndicatorPage(indicatorData);
            //    },
            //    error: function (ret) {
            //        $.am.changePage(amGloble.page.common_oops, "slideleft", { message: ret.statusText, detail: ret });
            //    }
            //});
        },

        downloadIndicatorConfigFile: function () {
            var self = this;
            var serverConfig = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/indicator/" + amGloble.setting.market.code + "/" + self.currentModel + "/" + amGloble.setting.lang.code + "/indicator.json";
            var filePrefix = (self.currentModel + "_" + amGloble.setting.lang.code).replace(/[ ]/g, "");
            if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[self.currentModel]){
                serverConfig = (serverConfig).replace(self.currentModel, amGloble.setting.lang.modelcode[self.currentModel]);
                filePrefix = (filePrefix).replace(self.currentModel, amGloble.setting.lang.modelcode[self.currentModel]).replace(/[ ]/g, "_");
            }
            var opt = {
                "downloadUrl": (serverConfig).replace(/[ ]/g, "%20"),
                "filename": filePrefix + ".json",
                "storePath": "indicator"
            };
            //amGloble.loading.show();
            emap.directDownload(opt, function (ret) {
                self.updateVersionInfo();
                if (ret.nativeURL != null) {
                    //amGloble.loading.hide();

                    var localConfig = JSON.parse(localStorage.getItem("indicator_config"));
                    var store_name = filePrefix + "_indicator";
                    if (localConfig == null) {
                        localConfig = {};
                    }
                    if (localConfig[store_name] == null) {
                        localConfig[store_name] = ret;
                    }

                    localStorage.removeItem("indicator_config");
                    localStorage.setItem("indicator_config", JSON.stringify(localConfig));

                    var entry = new FileEntry(ret.name, ret.fullPath, new FileSystem(ret.filesystemName));
                    //console.log(entry.toURL());
                    var option = [entry.toURL(), "UTF-8", 0, -1];
                    cordova.exec(self.generateIndicatorPage, function () {
                    }, "File", "readAsText", option);
                }
                else {
                    //self.error = ret;
                }
            }, function (ret) {
                self.error = ret;
            });
        },

        downloadIndicatorImage: function (img) {
            var self = this;
            var server = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/indicator/" + amGloble.setting.market.code + "/" + self.currentModel + "/" + amGloble.setting.lang.code + "/List icons/";

            var idx = img.data("idx");
            var storeName = (self.currentModel + "_" + amGloble.setting.lang.code + "_" + self.indicators[idx].img).replace(" ", "");
            if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[self.currentModel]){
                server = (server).replace(self.currentModel, amGloble.setting.lang.modelcode[self.currentModel]);
                //filePrefix = (filePrefix).replace(self.currentModel, amGloble.setting.lang.modelcode[self.currentModel]).replace(/[ ]/g, "_");
            }
            var opt = {
                "downloadUrl": (server + self.indicators[idx].img).replace(/[ ]/g, "%20"),
                "filename": storeName,
                "storePath": "indicator"
            };
            //amGloble.loading.show();
            emap.directDownload(opt, function (ret) {
                if (ret.fullPath != null) {
                    //console.log(ret);
                    //amGloble.loading.hide();

                    if (self.downloaStorageInfo[storeName] == null) {
                        self.downloaStorageInfo[storeName] = {
                            "fullPath": "",
                            "nativeURL": ""
                        };
                    }
                    self.downloaStorageInfo[storeName].fullPath = ret.fullPath;
                    self.downloaStorageInfo[storeName].nativeURL = ret.nativeURL;

                    img.css("background-image", "url(" + ret.nativeURL + ")");
                    self.downloadTaskFinish();

                }
            }, function (ret) {
                //amGloble.loading.hide();
                self.downloadTaskFinish();
            });

        },
        downloadTaskFinish: function () {
            var self = this;
            //console.log(downloadTaskNum);
            self.downloadTaskNum--;
            if (self.downloadTaskNum <= 0) {
                if (localStorage) {
                    localStorage.setItem("indicatorDownloadStatus", JSON.stringify(self.downloaStorageInfo));
                    //console.log(JSON.stringify(downloaStorageInfo));
                }
            }
        },
        checkImageExist: function (filepath, nativeUrl, img) {
            var self = this;
            var opt = [filepath];
            cordova.exec(function (ret) {
                if (ret) {
                    img.css("background-image", "url(" + nativeUrl + ")");
                    self.downloadTaskFinish();
                } else {
                    self.downloadIndicatorImage(img);
                }
            }, function () {
            }, "File", "testFileExists", opt);

        },
        generateIndicatorPage: function (rdata) {
            var self = indicatorPage;
            //console.log(ret.length);

            var indicators = JSON.parse(rdata).indicators;
            self.indicators = indicators;
            //console.log(ret);
            var imgs = [];
            var icons = self.$.find(".icons");
            icons.empty();
            var iconline;
            for (var i = 0; i < indicators.length; i++) {
                if (i % 3 == 0) {
                    iconline = $("<div class='iconline'/>");
                    iconline.appendTo(icons);
                }
                var div = $("<div class='indicatoricon'/>");
                var img = $("<div class='am-clickable roundbutton'/>");
                img.appendTo(div);
                img.data("idx", i);
                imgs[imgs.length] = img;
                var d = $("<div class='desc'/>").text(indicators[i].name);
                d.appendTo(div);
                //$("<div class='desc'>test</div>").appendTo(div);
                div.appendTo(iconline);
                img.unbind("vclick");
                if (amGloble.userinfo.sessionid && amGloble.userinfo && amGloble.userinfo.username) {
                    img.vclick(function () {
                        var idx = $(this).data("idx");
//                        ADB.trackAction("view one indicator", {
//                            "Market": amGloble.setting.lang.site,
//                            "Language": amGloble.setting.lang.code,
//                            "Page": "Indicator Decoder Page",
//                            "Username": amGloble.userinfo.username,
//                            "Bussiness Data": {
//                                "Vehicle Model": self.currentModel,
//                                "Indicator Name": indicators[idx].name
//                            }
//
//                        });
                        var data = amGloble.generateTrackData(
                                "owner app:owner support",
                                "",
                                "",
                                "",
                                "owner support:"+self.currentModel+":"+indicators[idx].name,
                                false,
                                false,
                                false,
                                false,
                                false);
                        amGloble.trackAction("owner app:owner support:detail:"+self.currentModel,data);
                        indicators[idx].model = self.currentModel;
                        $.am.changePage(amGloble.page.knowledge_indicatorDetail, "slideleft", { indicators: indicators, showIndex: idx });
                    });
                }
            }
            self.scrollview && self.scrollview.refresh();

            self.downloaStorageInfo = JSON.parse(localStorage.getItem("indicatorDownloadStatus"));
            if (self.downloaStorageInfo == null) {
                self.downloaStorageInfo = {};
                self.downloadTaskNum = imgs.length;
                for (var i = 0; i < imgs.length; i++) {
                    self.downloadIndicatorImage(imgs[i]);
                }
            }
            else {
                // console.log(self.downloaStorageInfo);
                self.downloadTaskNum = imgs.length;
                for (var i = 0; i < imgs.length; i++) {
                    var image = imgs[i];
                    var idx = image.data("idx");
                    // console.log(indicators[idx].img);
                    var storeImg = (self.currentModel + "_" + amGloble.setting.lang.code + "_" + indicators[idx].img).replace(" ", "");

                    if (self.downloaStorageInfo[storeImg] != null) {
                        var filepath = self.downloaStorageInfo[storeImg].fullPath;
                        var nativeUrl = self.downloaStorageInfo[storeImg].nativeURL;
                        self.checkImageExist(filepath, nativeUrl, image);
                    } else {
                        self.downloadIndicatorImage(image);
                    }
                }
            }
        },

        getResourceVersion: function () {
            if (amGloble.resourceUpdated == null || amGloble.resourceUpdated == false) {
                var serverVersion = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/ver/" + amGloble.setting.market.code + "/version.json";
                $.ajax({
                    url: serverVersion,
                    dataType: "json",
                    timeout: amGloble.setting.market.timeout || 30000,
                    success: function (data) {
                        if (data) {
                            var localVersion = JSON.parse(localStorage.getItem("resource_version"));
                            var storeName = amGloble.setting.market.code + "_version";
                            var resourceVer;
                            if (localVersion == null) {
                                localVersion = {};
                                resourceVer = { phrasebook: [], indicator: [] };
                            } else {
                                if (typeof (localVersion[storeName]) == "undefined") {
                                    resourceVer = { phrasebook: [], indicator: [] };
                                } else {
                                    resourceVer = localVersion[storeName];
                                }
                            }
                            if (data.phrasebook) {
                                $.each(data.phrasebook, function (index) {
                                    var currentObj = this;
                                    if (resourceVer.phrasebook[index] == null) {
                                        resourceVer.phrasebook.push({ lang: currentObj.lang, ver: { current: null, latest: currentObj.ver } });
                                    }
                                    else {
                                        resourceVer.phrasebook[index].current = resourceVer.phrasebook.latest;
                                        resourceVer.phrasebook[index].latest = currentObj.ver;
                                    }
                                });
                            }

                            if (data.indicator) {
                                $.each(data.indicator, function (index) {
                                    var currentObj = this;
                                    if (resourceVer.indicator[index] == null) {
                                        var newobj = { model: currentObj.model, info: [] };
                                        $.each(currentObj.info, function () {
                                            var currentinfo = this;
                                            newobj.info.push({ lang: currentinfo.lang, ver: { current: null, latest: currentinfo.ver } });
                                        });
                                        resourceVer.indicator.push(newobj);

                                    }
                                    else {
                                        $.each(currentObj.info, function (innerIndex) {
                                            resourceVer.indicator[index].info[innerIndex].current = resourceVer.indicator[index].info[innerIndex].latest;
                                            resourceVer.indicator[index].info[innerIndex].latest = this.ver;
                                        });
                                    }
                                });
                            }
                            localVersion[storeName] = resourceVer;
                            localStorage.setItem("resource_version", JSON.stringify(localVersion));
                            amGloble.resourceUpdated = true;
                        }

                    }
                });
            }
        },

        isNeedToDownload: function () {
            var self = this;
            var result = true;

            var localVersion = JSON.parse(localStorage.getItem("resource_version"));
            if (localVersion != null) {
                var storeName = amGloble.setting.market.code + "_version";
                var resourceVer = localVersion[storeName];

                if (resourceVer != null) {
                    if (resourceVer && resourceVer.indicator) {
                        $.each(resourceVer.indicator, function () {
                            if (this.model.toLowerCase() == self.currentModel.toLowerCase()) {
                                $.each(this.info, function () {
                                    if (this.lang == amGloble.setting.lang.code) {
                                        if (this.ver.current == this.ver.latest) {
                                            result = false;
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            }

            return result;
        },

        updateVersionInfo: function () {
            var self = this;

            var localVersion = JSON.parse(localStorage.getItem("resource_version"));
            if (localVersion != null) {
                var storeName = amGloble.setting.market.code + "_version";
                var resourceVer = localVersion[storeName];

                if (resourceVer && resourceVer.indicator) {
                    $.each(resourceVer.indicator, function () {
                        if (this.model.toLowerCase() == self.currentModel.toLowerCase()) {
                            $.each(this.info, function () {
                                if (this.lang == amGloble.setting.lang.code) {
                                    this.ver.current = this.ver.latest;
                                }
                            });
                        }
                    });
                }
                localStorage.setItem("resource_version", JSON.stringify(localVersion));
            }
        },

        clearResources: function () {
            var download = JSON.parse(localStorage.getItem("indicatorDownloadStatus"));
            if (download && download.length) {
                var firstObj = download[Object.getOwnPropertyNames(download)[0]];
                var indicatorPath = firstObj.fullPath.substring(0, firstObj.fullPath.lastIndexOf("/"));
                console.log("indicator path: " + indicatorPath);

                var entry = new FileEntry('indicator', indicatorPath, new FileSystem("persistent"));
                var option = [entry.toURL()];
                cordova.exec(function () { }, function () { }, "File", "removeRecursively", option);


                var detailPath = indicatorPath.substring(0, indicatorPath.lastIndexOf("/")) + "/indicatorDetail";
                console.log("indicatorDetail path: " + detailPath);

                entry = new FileEntry('indicatorDetail', detailPath, new FileSystem("persistent"));
                option = [entry.toURL()];
                cordova.exec(function () { }, function () { }, "File", "removeRecursively", option);
            }


            localStorage.removeItem("indicatorDownloadStatus");
            localStorage.removeItem("indicatorDetailImg");

            var indicatorFile = JSON.parse(localStorage.getItem("indicator_config"));
            var storeName = (self.currentModel + "_" + amGloble.setting.lang.code).replace(/[ ]/g, "") + "_indicator";
            if (indicatorFile != null && indicatorFile[storeName] != null) {
                indicatorFile[storeName] = null;
            }
        }
    });

})();
