/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

window.amGloble = {
    page: {
        getDashboardPage: function () {
            var startPage = amGloble.page.dashboard_main;
            if (amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR") {
                startPage = amGloble.page.dashboard_main_skjp;
            }
            return startPage;
        }
    },
    slideBar: {},
    popup: {},
    msg: function (msg) {
        emap.msg({
            content: msg
        });
    },
    api: {
        checkBackendState: function (cb) {
            var pre_diagnosis = "on";
            if (typeof amGloble.setting != "undefined" && typeof amGloble.setting.market != "undefined" && typeof amGloble.setting.market.pre_diagnosis != "undefined") {
                pre_diagnosis = amGloble.setting.market.pre_diagnosis;
            }
            if(pre_diagnosis == "on"){
                $.ajax({
                    url: amGloble.getHttpsUrl() + "/servlet/rest/owner/login", //接口url
                    type: "POST",
                    data: "username=" + "fakeUser" + "&password=" + "fakePassword",
                    dataType: "json",
                    contentType: "multipart/form-data",
                    timeout: amGloble.setting.market.timeout || 20000,
                    success: function (ret) {
                    },
                    error: function (ret) {
                        if(ret.status != 401)
                        {
                            emap.alert({
                                caption: "",
                                description: i18n.BACKEND_SYSTEM_NOT_AVAILABLE?i18n.BACKEND_SYSTEM_NOT_AVAILABLE:"The backend system is currently under maintenance. Please try again later.",
                                okCaption: i18n.FIRSTUSE_SELECTREGION_TEXT7
                            }, function () {
                                cb && cb();
                            });
                        }
                    }
                });
            }       
        },
        getConfig: function (cb) {
            $.ajax({
                url: amGloble.setting.lang.configUrl, //接口url
                type: "GET",
                dataType: "text",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function (ret) {
                    try {
                        //ret = JSON.stringify(eval('(' + ret + ')'));
                        ret = eval('(' + ret + ')');
                        cb && cb(0, ret);
                    } catch (e) {
                        console.error("Failed to JSON.stringify(config): " + e);
                        cb && cb(1);
                    }
                    //ret = eval('(' + ret + ')');

                },
                error: function (ret) {
                    cb && cb(1);
                }
            });
        },
        login: function (scb, fcb) {
            $.ajax({
                url: amGloble.getHttpsUrl() + "/servlet/rest/owner/login", //接口url
                type: "POST",
                data: "username=" + amGloble.userinfo.username + "&password=" + amGloble.userinfo.password,
                dataType: "json",
                contentType: "multipart/form-data",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function (ret) {
                    if (ret.status == "success") {
                        localStorage.setItem("fordOwenerApp_username", amGloble.userinfo.username);
                        emap.storePwd({
                            name: amGloble.userinfo.username,
                            pwd: amGloble.userinfo.password
                        }, function (ret) {
                        }, function (ret) {
                        });
                        amGloble.userinfo.sessionid = "fake session";
                        scb && scb();
                    } else {
                        fcb && fcb({
                            status: 1,
                            message: ret.status.responseMessage || "login failed"
                        });
                        // amGloble.msg("Plename.");

                    }
                },
                error: function (ret) {
                    // amGloble.msg(ret.responseJSON.error);
                    fcb && fcb(ret);
                }
            });
        },
        getprofile: function (scb, fcb) {
            $.ajax({
                url: amGloble.getHttpsUrl() + "/servlet/rest/owner/ext/" + amGloble.setting.lang.site + "/getprofile", //接口url
                //url : "https://wwwqa.akamai.dragonfly.ford.com/servlet/rest/owner/ext/" + amGloble.setting.lang.site + "/getprofile",

                type: "POST",
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                // beforeSend : function(xhr) {
                // xhr.setRequestHeader("Cookie", "PD-S-SESSION-ID=0_45CV7AuYSMQ1gIZEfdTjRYrbvllLvmqJ72tRHiCqe5eEZnVPAW8=_AAAAAAE=_cRabbQ4AiRPDU/N/zIaZdXmqSRg=; Domain=*; Path=/; Secure");
                // xhr.withCredentials = true;
                // },
                success: function (ret) {
                    if (ret.status && ret.status.code == "success") {

                        amGloble.userinfo.profile = ret.user;
                        scb && scb(ret.sessionid);
                    } else {
                        fcb && fcb(ret.status.message || "error");
                    }
                },
                error: function (ret) {
                    console.log(ret);
                    fcb && fcb(ret.status.message || "error");
                }
            });
        },
        fuyuLogin: function (scb, fcb) {
            $.ajax({
                url: amGloble.setting.lang.fuyu + "/club_mobile/authen/loginForApp.htm", //接口url
                type: "POST",
                data: JSON.stringify({
                    "vname": amGloble.fyuserinfo.username,
                    "vpassword": $.md5(amGloble.fyuserinfo.password)
                }),
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function (ret) {
                    if (ret.responseCode && ret.responseCode == "0000000") {
                        localStorage.setItem("fordOwenerApp_fyusername", amGloble.fyuserinfo.username);
                        localStorage.setItem("fordOwenerApp_fypassword", amGloble.fyuserinfo.password);
                        amGloble.fyuserinfo.accessToken = ret.accessToken;
                        amGloble.fyuserinfo.isOwner = ret.isOwner;
                        scb && scb(ret.sessionid);
                    } else {
                        fcb && fcb(ret);
                    }
                },
                error: function (ret) {
                    console.log(ret);
                    fcb && fcb(ret);
                }
            });
        },

        checkOwnerManualDownloadStatus: function (vin, cb) {
            var tmp;
            if (localStorage) {
                tmp = localStorage.getItem("ownerManualDownloadStatus");
                if (tmp == null) {
                    cb && cb(false);
                    return;
                } else {
                    var status = JSON.parse(tmp);
                    if (status[vin] == null) {
                        cb(false);
                        return;
                    } else {
                        var opt = [status[vin].fullPath];
                        cordova.exec(function (ret) {
                            if (ret) {
                                cb && cb(true);
                            } else {
                                cb && cb(false);
                            }
                        }, function () {
                        }, "File", "testFileExists", opt);
                    }
                }
            } else {
                cb && cb(false);
                return;
            }
        },
        getUnreadNotificationNum: function () {
            if (localStorage) {
                var allNotification = localStorage.getItem("allNotification");
                var readedNotification = localStorage.getItem("readedNotification");
                var allRecall = localStorage.getItem("allRecall");
                var readedRecall = localStorage.getItem("readedRecall");
                if (allNotification == null && allRecall == null)
                    return 1;
                allNotification == null ? allNotification = [] : allNotification = JSON.parse(allNotification);
                readedNotification == null ? readedNotification = [] : readedNotification = JSON.parse(readedNotification);
                allRecall == null ? allRecall = [] : allRecall = JSON.parse(allRecall);
                readedRecall == null ? readedRecall = [] : readedRecall = JSON.parse(readedRecall);
                var num = allNotification.length + allRecall.length - readedNotification.length - readedRecall.length;
                return num > 0 ? num : 0;
            } else
                return 1;
        },
        checkVersionUpdate: function () {
            $.ajax({
                url: amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/ver/" + amGloble.setting.market.code + "/update.json",
                type: "GET",
                dataType: "text",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function (ret) {
                    try {
                        //ret = JSON.stringify(eval('(' + ret + ')'));
                        var updateInfo = eval('(' + ret + ')');
                        //console.log(updateInfo);
                        var nextCheckDate = new Date(JSON.parse(localStorage.getItem("fordOwenerApp_nextVersionCheckDate")));
                        if (nextCheckDate) {
                            var today = new Date();
                            if (today < nextCheckDate) {
                                console.log("version check delay");
                                return;
                            }
                        }

                        emap.getMetadata({}, function (ret) {
                            console.log(ret);
                            var device = ret.content.device.platform;
                            var dname = ret.content.device.name;
                            if (device && (device.indexOf("iPhone") > -1 || device.indexOf("iPad") > -1 || device.indexOf("iPod") > -1 || (device.indexOf("Simulator") > -1 && dname.indexOf("iPhone") > -1)  )) {
                                updateInfo = updateInfo["ios"];
                            }
                            else {
                                updateInfo = updateInfo["android"];
                            }
                            var version = ret.content.container.version;
                            var latestVersion = updateInfo.latestVersion;
                            var needUpdate = function (currVer, promoteVer) {
                                currVer = currVer ? currVer.replace(/[vV]/, "") : "0.0.0";
                                promoteVer = promoteVer ? promoteVer.replace(/[vV]/, "") : "0.0.0";
                                if (currVer == promoteVer) return false;
                                var currVerArr = currVer.split(".");
                                var promoteVerArr = promoteVer.split(".");
                                var len = Math.max(currVerArr.length, promoteVerArr.length);
                                for (var i = 0; i < len; i++) {
                                    var proVal = ~~promoteVerArr[i],
                                        curVal = ~~currVerArr[i];
                                    if (proVal < curVal) {
                                        return false;
                                    } else if (proVal > curVal) {
                                        return true;
                                    }
                                }
                                return false;
                            };
                            if (needUpdate(version, latestVersion)) {
//                                amGloble.popup.versionUpdate.updateInfo = updateInfo;
//                                amGloble.popup.versionUpdate.show();
                                 var self = this;
                                 var updateInfo_i18n = updateInfo.i18n[amGloble.setting.lang.i18n];
                                 emap.confirm({
                                              caption : updateInfo_i18n.updateTitle,
                                              description : updateInfo_i18n.updateContent,
                                              okCaption : updateInfo_i18n.updateNowButton,
                                              cancelCaption : updateInfo_i18n.updateCancelButton
                                              }, function() {
                                                emap.openUrl({"url":updateInfo.updateURL});
                                              }, function() {
                                                if (localStorage) {
                                                  var nextCheckDate = new Date();
                                                  nextCheckDate.setDate(nextCheckDate.getDate()+3);
                                                  localStorage.setItem("fordOwenerApp_nextVersionCheckDate", JSON.stringify(nextCheckDate));
                                                }
                                              });
                            }
                            else {
                                console.log("do not need update");
                            }
                        }, function (ret) {
                            console.log(ret);
                        });
                    } catch (e) {
                        console.error("Failed to JSON.stringify(config): " + e);
                    }

                },
                error: function (ret) {
                    console.error("Failed to checkVersionUpdate : " + ret);
                }
            });


            // var updateInfo = {
            // 	"ios" : {
            // 		"latestVersion":"1.95.10",
            // 		"i18n":{
            // 			"zh-cn" : {
            // 				"updateTitle":"发现iOS新版本！",
            // 				"updateContent":"1.0更新内容<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能",
            //                 "updateNowButton":"立即更新",
            //                 "updateCancelButton":"稍后提醒"
            // 			},
            // 			"id-id" : {
            // 				"updateTitle":"发现新版本-日文",
            // 				"updateContent":"1.0更新内容<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能",
            //                 "updateNowButton":"立即更新",
            //                 "updateCancelButton":"稍后提醒"
            // 			}
            // 		},
            //               "updateURL":"http://www.sina.com"
            //           },
            //           "android" : {
            // 		"latestVersion":"1.95.10",
            // 		"i18n":{
            // 			"zh-cn" : {
            // 				"updateTitle":"发现Android新版本！",
            // 				"updateContent":"1.0更新内容<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能",
            //                 "updateNowButton":"立即更新",
            //                 "updateCancelButton":"稍后提醒"
            // 			},
            // 			"id-id" : {
            // 				"updateTitle":"发现新版本-日文",
            // 				"updateContent":"1.0更新内容<br />\
            // 							    1. 更新用户体验<br />\
            // 							    2. 增加查看保修记录功能",
            //                 "updateNowButton":"立即更新",
            //                 "updateCancelButton":"稍后提醒"
            // 			}
            // 		},
            //               "updateURL":"http://www.sina.com"
            //           }
            //          };

            //          var nextCheckDate = new Date(JSON.parse(localStorage.getItem("fordOwenerApp_nextVersionCheckDate")));
            //          if (nextCheckDate) {
            // 	var today = new Date();
            // 	if(today<nextCheckDate){
            // 		console.log("version check delay");
            // 		return;
            // 	}
            //          }

            // emap.getMetadata({}, function(ret) {
            // 	console.log(ret);
            // 	var device = ret.content.device.name;
            // 	if (device && (device.indexOf("iPhone") > -1 || device.indexOf("iPad") > -1  ) ) {
            // 		updateInfo = updateInfo["ios"];
            // 	}
            // 	else{
            // 		updateInfo = updateInfo["android"];
            // 	}
            // 	var version = ret.content.container.version;
            // 	var latestVersion = updateInfo.latestVersion;
            // 	var needUpdate=function(currVer,promoteVer){
            // 	    currVer = currVer?currVer.replace(/[vV]/,""):"0.0.0";
            // 	    promoteVer = promoteVer?promoteVer.replace(/[vV]/,""):"0.0.0";
            // 	    if(currVer==promoteVer) return false;
            // 	    var currVerArr = currVer.split(".");
            // 	    var promoteVerArr = promoteVer.split(".");
            // 	    var len = Math.max(currVerArr.length,promoteVerArr.length);
            // 	    for(var i=0;i<len;i++){
            // 	        var proVal = ~~promoteVerArr[i],
            // 	            curVal = ~~currVerArr[i];
            // 	        if(proVal<curVal){
            // 	            return false;
            // 	        }else if(proVal>curVal){
            // 	            return true;
            // 	        }
            // 	    }
            // 	    return false;
            // 	};
            // 	if( needUpdate(version, latestVersion) ){
            // 		amGloble.popup.versionUpdate.updateInfo = updateInfo;
            // 		amGloble.popup.versionUpdate.show();
            // 	}
            // 	else{
            // 		console.log("do not need update");
            // 	}
            // }, function(ret) {
            // 	console.log(ret);
            // });
        },
        updateProfile: function (obj, scb, fcb) {
            $.ajax({
                url: amGloble.getHttpsUrl() + "/servlet/rest/owner/ext/" + amGloble.setting.lang.site + "/profileupdateext",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                data: JSON.stringify(obj),

                success: function (ret) {
                    scb && scb(ret);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                    fcb && fcb(errorThrown);
                }
            });
        },
        getRegistration: function (scb, fcb) {

            $.ajax({
                url: amGloble.setting.lang.host + "/servlet/ContentServer?pagename=Foundation/CS/UserProfileValidationDispatcher&site=" + amGloble.setting.lang.site + "&action=registration",
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,

                success: function (ret) {
                    scb && scb(ret);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                    fcb && fcb(errorThrown);
                }
            });
        },

        getVehicle: function (scb, fcb) {

            if (typeof amGloble.userinfo == "undefined" || typeof amGloble.userinfo.profile == "undefined" || amGloble.userinfo.profile == null) {
                if (fcb)
                    fcb({
                        message: "Profile not loaded"
                    });
                else if (scb)
                    scb();
                return;
            }

            if (amGloble.userinfo.profile != null && amGloble.userinfo.profile.user_vehicles != null && typeof amGloble.userinfo.profile.user_vehicles.isLoaded != "undefined" && amGloble.userinfo.profile.user_vehicles.isLoaded != null) {
                scb && scb(amGloble.userinfo.profile.user_vehicles);
                return;
            }

            if ($(amGloble.userinfo.profile.user_vehicles).size() == 0) {
                scb && scb(amGloble.userinfo.profile.user_vehicles);
                return;
            }

            var data = {
                username: amGloble.userinfo.username,
                sessionid: amGloble.userinfo.sessionid
            };
            amGloble.loading.show();

            $(amGloble.userinfo.profile.user_vehicles).each(function () {
                var v = this;

                $.ajax({
                    url: amGloble.setting.lang.host + "/servlet/rest/ownerapp/" + amGloble.setting.lang.site + "/ext/info/" + this.vehicle_vin,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    timeout: amGloble.setting.market.timeout || 30000,
                    //data : JSON.stringify(data),

                    success: function (ret) {
                        v.vehiclename = i18n.PROFILE_MYVEHICLE_MY + " " + v.vehicle_nickname;
                        v.vin = ret.vin;
                        v.imageurl = ret.imageurl;
                        v.model = v.vehicle_nickname;
                        v.modelyear = ret.modelyear;
                        v.loaded = true;
                        var vs = amGloble.userinfo.profile.user_vehicles;

                        for (var i = 0; i < vs.length; i++) {
                            if (typeof vs[i].loaded == "undefined" || vs[i].loaded != true)
                                return;
                        }

                        amGloble.userinfo.profile.user_vehicles.isLoaded = true;
                        amGloble.loading.hide();

                        if (scb)
                            scb(amGloble.userinfo.profile.user_vehicles);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(errorThrown);
                        amGloble.loading.hide();

                        fcb && fcb(errorThrown);
                    }
                });
            });
        },

        getClosestReminder: function (vehicleVin) {
            var closestReminder = null;
            if (amGloble.userinfo.sessionid && amGloble.userinfo.profile) {
                var userName = amGloble.userinfo.profile.username;
                var reminders = JSON.parse(localStorage.getItem("service_reminder"));
                var currentDate = (new Date()).setHours(0, 0, 0, 0);

                if (reminders) {
                    $.each(reminders, function () {
                        if (this.userName == userName && this.vin == vehicleVin) {
                            var reminderDate = new Date(this.date);
                            if (closestReminder != null) {
                                var closestDate = new Date(closestReminder.date);
                            }
                            if (reminderDate >= currentDate && (closestDate == null || reminderDate < closestDate)) {
                                closestReminder = this;
                            }
                        }
                    });
                }
            }
            return closestReminder;
        },
        updateLang: function (scb) {

            $.ajax({
                url: amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/lang/" + amGloble.setting.lang.i18n + ".json",
                type: "GET",
                dataType: "text",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                beforeSend: function () {
                    amGloble.loading.show("Loading...");
                },
                success: function (ret) {

                    try {
                        ret = JSON.stringify(eval('(' + ret + ')'));
                        //ret = eval('(' + ret + ')')
                        localStorage.setItem("fordOwenerApp_i18n_" + amGloble.setting.lang.i18n, ret);
                    } catch (e) {
                        console.error("Failed to JSON.stringify(i18n): " + e);
                    }
                    if (scb) {
                        scb();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error(errorThrown);
                },
                complete: function () {
                    amGloble.loading.hide();
                }
            });
        }
    },
    loading: {
        show: function (e) {
            emap.startBusy(e ? {
                caption: e
            } : {});
        },
        hide: function () {
            emap.stopBusy();
        }
    },
    popupMenu: function (title, items, keyName, cb) {
        var opt = {
            title: title,
            items: []
        };

        $.each(items, function (i, item) {
            opt.items.push({
                "caption": item[keyName],
            });
        });

        emap.popupMenu(opt, function (ret) {
            cb && cb(items[ret.content]);
        }, function (ret) {
        });

    },
    popupMenuWithDefaultKey: function (title, items, keyName, defaultKeyName, cb) {
        var opt = {
            title: title,
            items: []
        };

        $.each(items, function (i, item) {
            if (item[keyName]) {
                opt.items.push({
                    "caption": item[keyName],
                });
            } else {
                opt.items.push({
                    "caption": item[defaultKeyName],
                });
            }

        });

        emap.popupMenu(opt, function (ret) {
            cb && cb(items[ret.content]);
        }, function (ret) {
        });

    },
    saveSettings: function (ret) {
        localStorage.setItem("fordOwenerApp_settings", JSON.stringify(this.setting));
    },
    loadSettings: function (ret) {
        var setting = localStorage.getItem("fordOwenerApp_settings");
        if (setting) {
            amGloble.setting = JSON.parse(setting);
            return true;
        } else {
            return false;
        }
    },

    userinfo: {
        username: null,
        password: null,
        sessionid: null,
        profile: null
    },

    configlist: {
        state_list: null,
        title_list: null

    },
    userProfileEdit: {
        profile_edited: null,
        needUpdate: function (key, value) {
            if (!amGloble.userProfileEdit.profile_edited) {
                amGloble.userProfileEdit.profile_edited = new Object();
            }
            amGloble.userProfileEdit.profile_edited[key] = value;

        },
        clear: function () {
            amGloble.userProfileEdit.profile_edited = null;

        }
    },
    fyuserinfo: {
        username: null,
        password: null,
        accessToken: null,
        isOwner: null
    },
    logout: function () {
        localStorage.removeItem("fordOwenerApp_username");
        amGloble.userinfo = {
            username: null,
            password: null,
            sessionid: null,
            profile: null
        };
        $.am.changePage(amGloble.page.dashboard_main, "slideleft");
    },
    deviceInfo: {
        uuid: null,
        version: null,
        platform: null,
        model: null
    },
    maps: {
        bingMap: false,
        googleMap: false,
        autoNaviMap: false,
        bingMapKey: "AjfiPJJCCzRcx3L-DmwmJtzDxRP6ELYA5xbt78c8JNdtRMsDjmhLeWoYIj5rbgEj",
        googleMapKey: "AIzaSyDWcQPmVJwL9LAR715vYnraRkXvSCd32sc", //"AIzaSyCCt8CScWEKjxK16A-xV21oMUYg9bohH9U",
        autoNaviMapKey: "1891d0f847c0a210a88015fdd4c3bc46",
        initBingMap: function (scb, fcb) {
            var self = this;
            $.ajax({
                url: "http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0",
                dataType: "script",
                timeout: 30000,
                success: function () {
                    self.bingMap = true;
                    if (scb) {
                        setTimeout(scb, 1000);
                    }
                },
                error: function (jqxhr, settings, exception) {
                    console.log("load map api exception : " + exception);
                    amGloble.loading.hide();
                    if (fcb)
                        fcb();
                }
            });
        },
        initGoogleMap: function (scb, fcb) {
            setTimeout(function () {
                if (!window.google || !window.google.maps) {
                    //handle script not loaded
                    console.log("load map api exception : timeout");
                    if (fcb)
                        fcb();
                    this.initGoogleMapSCB = null;
                }
            }, 15000);
            // if(this.initGoogleMapSCB){
            // 	alert("error scb already exist"+scb);
            // }
            this.initGoogleMapSCB = scb;
            var self = this;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://maps.googleapis.com/maps/api/js?key" + amGloble.maps.googleMapKey + "&sensor=TRUE&language=" + amGloble.setting.lang.code +"&callback=amGloble.maps.initGoogleMapCallback";
            document.body.appendChild(script);

            // $.ajax({
            // 	url: "http://maps.googleapis.com/maps/api/js?key"+amGloble.maps.googleMapKey+"&sensor=TRUE",
            // 	dataType: "script",
            // 	timeout: 30000,
            // 	success: function(){
            //           	$.getScript("lib/markerwithlabel_1.1.9.js");
            // 		// var add_script = document.createElement("script");
            // 		// add_script.type = "text/javascript";
            // 		// add_script.src = "lib/markerwithlabel_1.1.9.js";
            // 		// document.body.appendChild(add_script);
            //           	self.googleMap = true;
            //           	if(scb)
            //           		setTimeout(scb,1000);
            //           },
            //           error: function (jqxhr, settings, exception) {
            //               console.log("load map api exception : " + exception);
            //               if(fcb)
            //               	fcb();
            //           }
            // });
        },
        initGoogleMapSCB: null,
        initGoogleMapCallback: function () {
            if (!amGloble.maps.googleMap) {
                var script2 = document.createElement("script");
                script2.type = "text/javascript";
                script2.src = "lib/markerwithlabel_1.1.9.js";
                document.body.appendChild(script2);
                amGloble.maps.googleMap = true;
            }
            if (amGloble.maps.initGoogleMapSCB)
                setTimeout(function () {
                    if (amGloble.maps.initGoogleMapSCB) {
                        amGloble.maps.initGoogleMapSCB();
                        amGloble.maps.initGoogleMapSCB = null;
                    }
                }, 1000);
            // var mapOptions = {
            // 	zoom: 8,
            // 	center: new google.maps.LatLng(-34.397, 150.644),
            // 	mapTypeId: google.maps.MapTypeId.ROADMAP
            // }
            // var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        },
        initAutoNaviMap: function (scb, fcb) {
            var self = this;
            $.ajax({
                url: "http://webapi.amap.com/maps?v=1.3&key=" + amGloble.maps.autoNaviMapKey,
                dataType: "script",
                timeout: 30000,
                success: function () {
                    var script2 = document.createElement("script");
                    script2.type = "text/javascript";
                    script2.src = "lib/AutoNavi.js";
                    document.body.appendChild(script2);
                    self.autoNaviMap = true;
                    if (scb) {
                        setTimeout(scb, 1000);
                    }
                },
                error: function (jqxhr, settings, exception) {
                    console.log("load autoNaviMap api exception : " + exception);
                    amGloble.loading.hide();
                    if (fcb)
                        fcb();
                }
            });
        },
        currentMapDispatchRun: function (nomap, bingmap, googlemap, autonavimap, fcb) {
            //no map 0 ; bing map 1 ; google map 2
            //default google
            var currentMap = 1;
            if (typeof amGloble.setting != "undefined" && typeof amGloble.setting.market != "undefined" && typeof amGloble.setting.market.map != "undefined") {
                currentMap = amGloble.setting.market.map;
            }
            if (typeof amGloble.setting != "undefined" && typeof amGloble.setting.market != "undefined" && amGloble.setting.market.code == "VN") {
                currentMap = 2;
            }
            var self = this;

            //currentMap = 3;

            if (currentMap == 3) {
                if (this.autoNaviMap) {
                    if (autonavimap)
                        autonavimap();
                } else {
                    self.initAutoNaviMap(autonavimap, fcb);
                    currentMap = -1;
                }

            } else if (currentMap == 2) {
                if (this.googleMap) {
                    if (googlemap)
                        googlemap();
                } else {
                    self.initGoogleMap(googlemap, fcb);
                    currentMap = -1;
                }

            } else if (currentMap == 1) {
                if (this.bingMap) {
                    if (bingmap)
                        bingmap();
                } else {
                    self.initBingMap(bingmap, fcb);
                    currentMap = -1;
                }
            } else {
                if (nomap)
                    nomap();
            }

            return currentMap;
        },
        currentMapRun: function (anymap, fcb) {
            var self = this;
            return self.currentMapDispatchRun(anymap, anymap, anymap, anymap, fcb);

        },
        currentMap: function () {
            return this.currentMapRun();
        },
        currentAddress: function (loc, scb, fcb) {
            this.currentMapDispatchRun(function () {
                //todo no map
            }, function () {
                var locationRequest = "http://dev.virtualearth.net/REST/v1/Locations/" + loc.latitude + "," + loc.longitude + "?o=json&key=" + amGloble.maps.bingMapKey;
                var sample = $.ajax({
                    url: locationRequest, //url
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    async: true,
                    timeout: 30000,
                    success: function (ret) {
                        //distance
                        //var distance = ret.resourceSets[0].resources[0].travelDistance + ret.resourceSets[0].resources[0].distanceUnit;
                        var country = ret.resourceSets[0].resources[0].address.countryRegion;
                        var address = ret.resourceSets[0].resources[0].address.formattedAddress;
                        if (scb) {
                            scb(address, country);
                        }
                        ;
                    },
                    error: function (ret) {
                        console.log(ret);
                    }
                });
            }, function () {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': loc
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var address = results[0].formatted_address;
                            var country = "";
                            var components = results[0].address_components;
                            $.each(components, function (i, component) {
                                if (component.types[0] == "country") {
                                    country = component.long_name;
                                }
                            })
                            if (scb) {
                                scb(address, country);
                            }
                            ;
                        }
                    } else {
                        if (fcb)
                            fcb();
                        else
                            alert("Geocoder failed due to: " + status);
                    }
                });
            }, function () {
                var api = new AutoNaviAPI({
                    imagePath: "/content/gux_content/",
                    dealerKey: '55adb0c7e4b0a76fce4c8dd6',
                    autocompleteCallbackURL: '',
                    autocompleteCallbackName: ''
                });
                var map = new api.map(document.getElementById('mapDivHidden'), {
                    center: {
                        lat: 39.909231,
                        lng: 116.397428
                    },
                    zoom: 6
                });
                map.reverseGeocode(loc, scb);
            });
        }
    },
    tag: {
        data: {
            saved: {},
            current: {}
        },
        setItem: function (key, value) {
            if (key == "language") {
                value = "lang_" + value;
            } else if (key == "market") {
                value = "country_" + value;
            } else if (key == "postcode") {
                value = "pcode_" + value;
            }

            this.data.current[key] = value;
            this.save();

        },
        registerTag: function () {
            var self = this;
            var tags = [];

            var saved = JSON.stringify(this.data.saved);
            var current = JSON.stringify(this.data.current);
            if (amGloble.userinfo.sessionid && saved !== current) {
                $.each(this.data.current, function (i, item) {
                    console.log(i, item);
                    tags.push(item);
                });
                emap.regPNS({
                    tags: tags,
                    isChina: this.data.current.market == "country_CN"
                }, function (ret) {
                    if (ret.content) {
                        console.log("PNS ON");
                    } else {
                        console.log("PNS OFF");
                    }
                    self.saved();
                }, function (ret) {
                    console.log("Reg PNS Failed");
                });
            }

        },
        closePNS: function () {
            emap.regPNS({
                tags: ["OFF"],
                isChina: this.data.current.market == "country_CN"
            }, function (ret) {
                if (ret.content) {
                    console.log("PNS ON");
                } else {
                    console.log("PNS OFF");
                }
            }, function (ret) {
                console.log("Reg PNS Failed");
            });
        },
        restore: function () {
            $.extend(true, this.data, JSON.parse(localStorage.getItem("fordOwenerApp_tagdata")));
        },
        save: function () {
            localStorage.setItem("fordOwenerApp_tagdata", JSON.stringify(this.data));
        },
        saved: function () {
            this.data.saved = $.extend(true, {}, this.data.current);
        }
    },
    getHttpsUrl: function () {
        if (amGloble.setting && amGloble.setting.lang.host) {
            return amGloble.setting.lang.host.replace("http://", "https://");
        } else {
            return "";
        }
    },
    findInModel: function (modelName) {
        var models = amGloble.setting.lang.model;
        var find = -1;
        $.each(models, function (i, item) {
            if (item == modelName) {
                find = i;
                return false;
            }
        });
        return find;
    },

    changeLanguage: function () {
        $.am.debug.enable = false;

        amGloble.loadSettings();
        amGloble.tag.restore();
        //切换语言

        if (amGloble.setting && amGloble.setting.lang.i18n) {
            var lang = amGloble.setting.lang.i18n;
        } else {
            var lang = "en-in";
        }

        if (localStorage.fordOwenerApp_lang) {
            var lang = localStorage.fordOwenerApp_lang;
        }

        i18nController.changeLanguage(lang, function () {
            //alert("语言切换失败");

            if (localStorage.fordOwenerApp_lang) {

                var obj = {
                    username: localStorage.fordOwenerApp_username,
                    preferred_language: lang.slice(0, 2)
                };

                if (amGloble.setting) {
                    amGloble.api.updateProfile(obj, function (ret) {
                        amGloble.loading.hide();
                        // amGloble.msg(ret.status.code);
                    }, function (ret) {
                        amGloble.loading.hide();

                        //amGloble.msg(ret);
                    });

                }
                ;

            }
        }, function () {
            amGloble.msg("Failed to change language.");
        });
    },
    EAIStatusCheck: function (cb1, cb2) {
        $.ajax({
            url: amGloble.setting.lang.host + "/servlet/rest/owner/migration/site-status/" + amGloble.setting.lang.site, //接口url
            timeout: amGloble.setting.market.timeout || 30000,
            success: function (ret) {
                if (ret.authentication == "lh") {
                    cb1 & cb1();
                } else if (ret.authentication == "dfy") {
                    cb2 & cb2();
                } else {
                    var message = ret.message ? ret.message : "Owner's site is currently under maintenance, please come back again after a few days.";
                    $.am.changePage(amGloble.page.common_oops, "slideleft", {
                        message: message,
                        detail: ""
                    });
                }

            },
            failed: function (ret) {
                cb2 & cb2();
            }
        });
    },
    userMigrationCheck: function (username) {
        var message = i18n.LH_LOGIN_ERROR_COMMON;
        $.ajax({
            url: amGloble.setting.lang.host + "/servlet/rest/owner/migration/user-status/" + username, //接口url
            timeout: amGloble.setting.market.timeout || 30000,
            success: function (ret) {
                if (ret.statusCode != null && ret.statusCode != "") {
                    if (ret.statusCode == "IA") {
                        message = i18n.LH_LOGIN_ERROR_IA;
                    } else if (ret.statusCode == "FM") {
                        message = i18n.LH_LOGIN_ERROR_FM;
                    } else if (ret.statusCode == "PI") {
                        message = i18n.LH_LOGIN_ERROR_PI;
                    }
                }
                $.am.changePage(amGloble.page.common_oops, "slideleft", {
                    message: message,
                    detail: ""
                });

            },
            failed: function (ret) {
                $.am.changePage(amGloble.page.common_oops, "slideleft", {
                    message: message,
                    detail: ""
                });
            }
        });
    },
    trackPage: function (pageName, data) {
        ADB.trackState(pageName.toLowerCase(), data);
    },
    trackAction: function (actionName, data) {
        ADB.trackAction(actionName.toLowerCase(), data);
    },
    generateTrackData: function (pageName, modelYear, namePlate, tool, actionName, logInfo,evt11, evt12, evt14, evt43) {//loginfo,evt11, evt12, evt14, evt43 都是bool类型，代表是否记录该值
        var country = "undefined";
        if (amGloble.setting && amGloble.setting.market.code) {
            country = amGloble.setting.market.code.toLowerCase();
        };
        var logStatus = amGloble.userinfo.profile ? "logged in" : "logged out";
        var device = amGloble.deviceInfo.platform ? amGloble.deviceInfo.platform.toLowerCase() : "simulator";
        var lang_code = amGloble.setting ? (amGloble.setting.lang.code3 ? amGloble.setting.lang.code3 : amGloble.setting.lang.code) : "undefined";
        var opt = {
            eVar4: lang_code,
            eVar11: pageName,
            eVar12: modelYear,
            eVar14: "ford-" + country,
            eVar15: "ford owners app",
            eVar16: namePlate?namePlate.toLowerCase():namePlate,
            eVar42: logStatus,
            eVar48: tool,
          
            prop4: lang_code,
            prop5: actionName,
            prop11: pageName,
            prop12: modelYear,
            prop14: "ford-" + country,
            prop15: "ford owners app",
            prop16: namePlate?namePlate.toLowerCase():namePlate,
            prop37: device + ":1.08",
            prop48: tool,
            prop54: "ui:" + device + ":phone"
        }
        if (tool == "" || tool == null) {
            delete opt["eVar48"];
            delete opt["prop48"];
        }
        if (namePlate == "" || namePlate == null) {
            delete opt["eVar16"];
            delete opt["prop16"];
        }
        if (modelYear == "" || modelYear == null) {
            delete opt["eVar12"];
            delete opt["prop12"];
        }
        if(actionName==""||actionName==null)
        {
            delete opt["sProp5"];
            delete opt["prop5"];
        }
        if(!logInfo)
            delete opt["eVar42"];
        if (evt11)
            opt.events = "event11";
        if (evt12){
            if (opt.events) {
                opt.events += ",event12";
            }
            else{
                opt.events = "event12"; 
            }
        }
        if (evt14){
            if (opt.events) {
                opt.events += ",event14";
            }
            else{
                opt.events = "event14"; 
            }
        }
        if (evt43){
            if (opt.events) {
                opt.events += ",event43";
            }
            else{
                opt.events = "event43"; 
            }
        }
        return opt;
    }
};

$(function () {
    amGloble.changeLanguage();
});

$.am.init = function () {

    //绑定跳转到notification事件


    var data = amGloble.generateTrackData(
        "owner app:load",
        "",
        "",
        "",
        "",
        true,
        false,
        false,
        false,
        false);
    amGloble.trackPage("owner app:load",data);

    emap.bind('gotonotification', function (ret) {
        //console.log(ret.id);
        if (!amGloble.userinfo.sessionid) {
            amGloble.msg(i18n.COMMON_LOGIN_FIRST);
            return;
        }
        var opt = {
            "detail": ret.id,
            "from": "native"
        };
        if ($.am.getActivePage() != amGloble.page.notification_detail)
            $.am.changePage(amGloble.page.notification_detail, "slideleft", opt);
        else
            amGloble.page.notification_detail.beforeShow(opt);

    }, false);

    //加载地图
    // amGloble.maps.initBingMap();
    // amGloble.maps.initGoogleMap();

    //绑定所有页面的menubutton
    $(".menubutton").vclick(function () {
        amGloble.slideBar.main.show();
    });

    //绑定backbutton
    emap.bind("backbutton", function (ret) {
        var cPage = $.am.getActivePage();
        cPage.backButtonOnclick ? cPage.backButtonOnclick() : $.am.page.back();
    });
    try {
        cordova.exec(function (ret) {
            console.log(JSON.stringify(ret));
            amGloble.deviceInfo.uuid = ret.uuid;
            amGloble.deviceInfo.version = ret.version;
            amGloble.deviceInfo.platform = ret.platform;
            amGloble.deviceInfo.model = ret.model;
        }, function () {
        }, "Device", "getDeviceInfo", []);
    } catch (exception) {

    }

    //失败跳过

    //恢复localdata
    amGloble.userinfo.username = localStorage.getItem("fordOwenerApp_username");
    emap.getPwd({
        name: amGloble.userinfo.username
    }, function (ret) {
        amGloble.userinfo.password = ret.content;
    }, function (ret) {
    });

    amGloble.fyuserinfo.username = localStorage.getItem("fordOwenerApp_fyusername");
    emap.getPwd({
        name: amGloble.fyuserinfo.username
    }, function (ret) {
        amGloble.fyuserinfo.password = ret.content;
    }, function (ret) {
    });

    if (!amGloble.setting) {

        // $.ajax({
        // url : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/prod/marketsConfig.json",
        // type : "GET",
        // dataType : "json",
        // contentType : "application/json",
        // timeout : 30000,
        // success : function(ret) {
        // if ( typeof (ret) == "string")
        // ret = JSON.parse(ret);
        // amGloble.marketList = ret;
        // var startPage = amGloble.page.firstUse_selectRegion;
        // // var startPage = amGloble.page.login_vehicle;
        // $.am.changePage(startPage, "");
        // },
        // error : function(XMLHttpRequest, textStatus, errorThrown) {
        // var startPage = amGloble.page.firstUse_selectRegion;
        // // var startPage = amGloble.page.login_vehicle;
        // $.am.changePage(startPage, "");
        // }
        // });
        var startPage = amGloble.page.firstUse_selectRegion;
        // var startPage = amGloble.page.login_vehicle;
        $.am.changePage(startPage, "");

    } else {
        var startPage = amGloble.page.dashboard_main;
        if (amGloble.setting.market.code == "JP" || amGloble.setting.market.code == "KR") {
            startPage = amGloble.page.dashboard_main_skjp;
        }
        //load config

        amGloble.loading.show();
        amGloble.api.updateLang(amGloble.changeLanguage);
        amGloble.api.getConfig(function (code, ret) {
            if (!code) {
                $.extend(true, amGloble.setting.market, ret);
                $.each(amGloble.setting.market.langs, function (i, item) {
                    if (item.code == amGloble.setting.lang.code) {
                        amGloble.setting.lang = item;
                        return false;
                    }
                });
                amGloble.saveSettings();
            }

            //成功则覆盖本地

            if (amGloble.userinfo.username && amGloble.userinfo.password) {
                amGloble.EAIStatusCheck(function () {
                    var lhhost = amGloble.setting.lang.lhhost ? amGloble.setting.lang.lhhost : "";
                    var option = {
                        "lhhost": lhhost,
                        "host": amGloble.setting.lang.host,
                        "grant_type": "password",
                        "username": amGloble.userinfo.username,
                        "password": amGloble.userinfo.password
                    };
                    amGloble.loading.show();
                    emap.getLHCookie(option, function (ret) {
                        console.log(JSON.stringify(ret));

                        localStorage.setItem("fordOwenerApp_username", amGloble.userinfo.username);
                        emap.storePwd({
                            name: amGloble.userinfo.username,
                            pwd: amGloble.userinfo.password
                        }, function (ret) {
                        }, function (ret) {
                        });
                        amGloble.userinfo.sessionid = "fake session";
                        amGloble.api.getprofile(function (ret) {
                            amGloble.loading.hide();
                            console.log(ret);
                            if (amGloble.page.login_login.checkModelEmpty()) {
                                $.am.changePage(amGloble.page.login_vehicle, "");
                            } else {
                                $.am.changePage(startPage, "");
                            }

                        }, function (ret) {
                            amGloble.loading.hide();
                            $.am.changePage(startPage, "");
                        });
                    }, function (ret) {
                        amGloble.loading.hide();
                        $.am.changePage(startPage, "");
                    });
                }, function () {
                    amGloble.api.login(function (ret) {
                        amGloble.api.getprofile(function (ret) {
                            amGloble.loading.hide();
                            console.log(ret);
                            if (amGloble.page.login_login.checkModelEmpty()) {
                                $.am.changePage(amGloble.page.login_vehicle, "");
                            } else {
                                $.am.changePage(startPage, "");
                            }

                        }, function (ret) {
                            amGloble.loading.hide();
                            $.am.changePage(startPage, "");
                        });
                    }, function (ret) {
                        amGloble.loading.hide();
                        $.am.changePage(startPage, "");
                    });
                });

            } else {
                amGloble.loading.hide();
                $.am.changePage(startPage, "");
            }

            //FUYU
            if (amGloble.fyuserinfo.username && amGloble.fyuserinfo.password) {
                amGloble.api.fuyuLogin();
            }
        });

        //更新Registration

        amGloble.api.getRegistration(function (ret) {
            console.log(ret);
            amGloble.loading.hide();
            amGloble.setting.registration = ret;
            amGloble.saveSettings();
            // amGloble.msg(ret.status.code);
        }, function (ret) {
            //amGloble.msg(ret.status.code);
            amGloble.loading.hide();
        });
    }

};
