/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.knowledge_phasebook_JP = new $.am.Page({
        id: "knowledge_phasebook_JP",
        // phraseBookJP_self : null,
        // phraseBook : null,
        // downloaStorageInfo : {},
        // soundDownloadStorageInfo : {},
        playing: false,

        init: function () {
            phraseBookJP_self = this;
            this.$.find(".tabs div").eq(2).vclick(function () {
//                ADB.trackAction("Goto 'Indicator Icons'", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Knowledge Center",
//                    "Username": amGloble.userinfo.username,
//
//                });

                $.am.changePage(amGloble.page.knowledge_indicatorIcons_JP, "");
            });
            this.$.find(".tabs div").eq(3).vclick(function () {
                $.am.changePage(amGloble.page.knowledge_phasebook_JP, "");
            });
            this.$.find(".tabs div").eq(4).vclick(function () {
                $.am.changePage(amGloble.page.knowledge_more_JP, "");
            });

            this.backButtonOnclick = function () {
                $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
            };
        },
        //before page show
        beforeShow: function (paras) {
            this.error = null;
            //this.generatephraseBookPage();
            playing = false;
            var soundFile;
            m_code = amGloble.setting.market.code;
            l_code = amGloble.setting.lang.code;
            p_server = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/phrase/";
            if (localStorage) {
                soundFile = localStorage.getItem("soundDownload");
            }
            if (soundFile != null) {
                soundDownloadStorageInfo = JSON.parse(soundFile);
            } else
                soundDownloadStorageInfo = {};


            if (phraseBookJP_self.isNeedToDownload()) {
                phraseBookJP_self.clearResources();
                phraseBookJP_self.updateVersionInfo();
            }

            this.getphraseBookConfig();

            var data = amGloble.generateTrackData(
                "owner app:owner support:sync phrasebook",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:owner support:sync phrasebook",data);
        },

        getphraseBookConfig: function () {
            var self = this;

            var phraseBookFile = JSON.parse(localStorage.getItem("phrasebook_config"));
            var store_name = l_code + "_phrasebook";
            if (phraseBookFile == null || phraseBookFile[store_name] == null) {
                self.downloadphraseBookConfigFile();
            } else {
                var configContent = phraseBookFile[store_name];
                var opt = [configContent.fullPath];
                cordova.exec(function (ret) {
                    if (ret) {
                        var entry = new FileEntry(configContent.name, configContent.fullPath, new FileSystem(configContent.filesystemName));
                        var option = [entry.toURL(), "UTF-8", 0, -1];
                        cordova.exec(self.generatephraseBookPage, function () {
                        }, "File", "readAsText", option);
                    }
                    else {
                        self.downloadphraseBookConfigFile();
                    }
                }, function () {
                }, "File", "testFileExists", opt);
            }

            //var serverConfig = p_server + m_code + "/" + l_code + "/phrasebook.json";
            //$.ajax({
            //    url: serverConfig,
            //    dataType: "json",
            //    timeout: amGloble.setting.market.timeout || 30000,
            //    success: function (data) {
            //        var indicatorData = JSON.stringify(data);
            //        self.generatephraseBookPage(indicatorData);
            //    },
            //    error: function (ret) {
            //        $.am.changePage(amGloble.page.common_oops, "slideleft", { message: ret.statusText, detail: ret });
            //    }
            //});

        },
        downloadphraseBookConfigFile: function () {
            var self = phraseBookJP_self;
            var opt = {
                "downloadUrl": p_server + m_code + "/" + l_code + "/phrasebook.json",
                "filename": m_code + l_code + ".json",
                "storePath": "phrasebook"
            };
            //amGloble.loading.show();
            emap.directDownload(opt, function (ret) {
                if (ret.nativeURL != null) {
                    //amGloble.loading.hide();

                    var localConfig = JSON.parse(localStorage.getItem("phrasebook_config"));
                    var store_name = l_code + "_phrasebook";
                    if (localConfig == null) {
                        localConfig = {};
                    }
                    if (localConfig[store_name] == null) {
                        localConfig[store_name] = ret;
                    }
                    localStorage.setItem("phrasebook_config", JSON.stringify(localConfig));

                    var entry = new FileEntry(ret.name, ret.fullPath, new FileSystem(ret.filesystemName));
                    //console.log(entry.toURL());
                    var option = [entry.toURL(), "UTF-8", 0, -1];
                    cordova.exec(self.generatephraseBookPage, function () {
                    }, "File", "readAsText", option);

                }
            }, function (ret) {
                self.error = ret;
            });
        },

        generatephraseBookPage: function (ret) {
            var self = this;
            //console.log(ret.length);
            //ret = ret.replace(/\n/g, " ").replace(/\t/g, " ").replace(/\r/g, " ");
            //ret = "{\"phraseBook\":[{\"category\":\"General\",\"icon\":\"general.png\",\"item\":[{\"title\":\"SYNC\",\"text\":\"Takeyoutothemainmenu\",\"audio\":\"pb_gen1_0101_sync.mp3\"},{\"title\":\"Help\",\"text\":\"Givesyouvoicecommandsyoucanuseinthe\",\"audio\":\"pb_gen1_0102_help.mp3\"},{\"title\":\"Cancel\",\"text\":\"CancelwhatyouaskSYNCtodo\",\"audio\":\"pb_gen1_0103_cancel.mp3\"},{\"title\":\"VoiceSettings\",\"text\":\"Changethelevelofvoiceinteractionandfeedback\",\"audio\":\"pb_gen1_0104_voice_settings.mp3\"},{\"title\":\"InteractionModeStandard\",\"text\":\"Changethelevelofvoiceinteractionandfeedback\",\"audio\":\"pb_gen1_0102_help.mp3\"},{\"title\":\"InteractionModeStandard\",\"text\":\"Lessvoiceinteractionandmoretoneprompts\",\"audio\":\"pb_gen1_0103_cancel.mp3\"}]},{\"category\":\"TextMessages\",\"icon\":\"text.png\",\"item\":[{\"title\":\"Help\",\"text\":\"Givesyouvoicecommandsyoucanuseinthe\",\"audio\":\"pb_gen1_0102_help.mp3\"},{\"title\":\"Cancel\",\"text\":\"CancelwhatyouaskSYNCtodo\",\"audio\":\"pb_gen1_0103_cancel.mp3\"}]}]}";

            phraseBook = JSON.parse(ret).phraseBook;
            //console.log(ret);
            var root = phraseBookJP_self.$.find(".content_wrapper");
            root.empty();
            var imgs = [];
            var indicatorDownloadStatus;
            for (var i = 0; i < phraseBook.length; i++) {
                var div;
                //if (i == 0)
                //    div = $("<div class='list-item  extend'/>");
                //else
                div = $("<div class='list-item '/>");
                var title = $("<div class='title-item am-clickable'/>");
                var img = $("<div class='icon'/>");
                img.appendTo(title);
                img.data("idx", i);
                imgs.push(img);
                $("<div class='title'>" + phraseBook[i].category + "</div>").appendTo(title);
                $("<div class='button'/>").appendTo(title);
                title.appendTo(div);
                var submenu = $("<div class='subMenu'/>");
                $("<div class='arrow-gray-up'/>").appendTo(submenu);
                var subitem = phraseBook[i].item;
                for (var k = 0; k < subitem.length; k++) {
                    var menuitem = $("<div class='menu-item'/>");
                    var text = $("<div class='text'/>");
                    $("<div class='title'>" + subitem[k].title + "</div>").appendTo(text);
                    $("<div class='desc'>" + subitem[k].text + "</div>").appendTo(text);
                    text.appendTo(menuitem);
                    var sound = $("<div class='am-clickable sound'/>");
                    sound.data("idx1", i);
                    sound.data("idx2", k);
                    sound.appendTo(menuitem);
                    menuitem.appendTo(submenu);
                    sound.unbind("vclick").vclick(function () {
                        if (playing)
                            retrun;
                        if ($(this).hasClass("on"))
                            return;
                        var idx1 = $(this).data("idx1");
                        var idx2 = $(this).data("idx2");
                        var name = phraseBook[idx1].item[idx2].audio;
                        // if (name == "audio/help.mp3")
                        // name = "pb_gen1_0102_help.mp3";
                        // else if (name == "audio/main.mp3")
                        // name = "pb_gen1_0101_sync.mp3";
                        // else if (name == "audio/cancel.mp3")
                        // name = "pb_gen1_0103_cancel.mp3";
                        // else if (name == "audio/voice_settings.mp3")
                        // name = "pb_gen1_0104_voice_settings.mp3";
                        //console.log();

//                        ADB.trackAction("Play one phrase audio", {
//                            "Market": amGloble.setting.lang.site,
//                            "Language": amGloble.setting.lang.code,
//                            "Page": "SYNC Phrasebook Page",
//                            "Username": amGloble.userinfo.username,
//                            "Bussiness Data": {
//                                "Phrase  Category": phraseBook[idx1].category,
//                                "Phrase Name": phraseBook[idx1].item[idx2].title
//                            }
//                        });

                        var $this = $(this);
                        if (name instanceof Array) {
                            $.each(name, function () {
                                var soundName = this;
                                var storeName = (l_code + "_" + soundName).replace(" ", "");

                                if (soundDownloadStorageInfo[storeName] != null) {
                                    phraseBookJP_self.checkSoundExist(soundDownloadStorageInfo[storeName].fullPath, soundDownloadStorageInfo[storeName].nativeURL, $this);
                                } else {
                                    phraseBookJP_self.downloadSound($this);
                                }
                            });
                        }
                        else {
                            var storeName = (l_code + "_" + name).replace(" ", "");
                            if (soundDownloadStorageInfo[storeName] != null) {
                                phraseBookJP_self.checkSoundExist(soundDownloadStorageInfo[storeName].fullPath, soundDownloadStorageInfo[storeName].nativeURL, $this);
                            } else {
                                phraseBookJP_self.downloadSound($this);
                            }
                        }
                    });
                }

                if (amGloble.setting.market.code == "JP") {
                    if (phraseBook[i].category == "一般") {
                        submenu.append("<div class='disclaimer'>" + i18n.PHRASE_GENERAL_DISCLAIMER + "</div>" + "<div class='disclaimer'>" + i18n.PHRASE_TEXT_DISCLAIMER + "</div>");
                    } else if (phraseBook[i].category == "音楽メディア – Bluetooth<SUP>®</SUP> 経由") {
                        submenu.append("<div class='disclaimer'>" + i18n.PHRASE_GENERAL_DISCLAIMER + "</div>" + "<div class='disclaimer'>" + i18n.PHRASE_TEXT_DISCLAIMER + "</div>");
                    }
                   else {
                        submenu.append("<div class='disclaimer'>" + i18n.PHRASE_TEXT_DISCLAIMER + "</div>");
                   }
                }

                submenu.appendTo(div);
                div.appendTo(root);
                title.unbind("vclick").vclick(function () {
                    var listItem = $(this).parent();

                    if (listItem.hasClass("extend")) {
                        listItem.removeClass("extend");
                        phraseBookJP_self.scrollview.scrollTo(listItem.data("offsetPos"));
                    }
                    else {
                        var extendItem = listItem.parent().parent().find(".list-item.extend").removeClass("extend");
                        if (extendItem.length > 0) {
                            phraseBookJP_self.scrollview.scrollTo(extendItem.data("offsetPos"));
                        }

                        listItem.data("offsetPos", phraseBookJP_self.scrollview._currentPos);
                        listItem.addClass("extend");

                        var wrap = $("#knowledge_phasebook .am-body-wrap");
                        if (listItem.height() > wrap.height()) {
                            phraseBookJP_self.scrollview.scrollTo([0, -listItem[0].offsetTop]);
                        }
                        else if (listItem[0].offsetTop + listItem.height() > wrap.height()) {
                            var moveOffset = listItem[0].offsetTop + listItem.height() - wrap.height();
                            phraseBookJP_self.scrollview.scrollTo([0, -moveOffset]);
                        }

                        var data = amGloble.generateTrackData(
                            "owner app:owner support:sync phrasebook",
                            "",
                            "",
                            "",
                            "sync:expand:"+$(this).find(".title").html().toLowerCase(),
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:owner support:sync phrasebook:expand",data);
                    }


                    //phraseBookJP_self.scrollview && phraseBookJP_self.scrollview.scrollTo('top');
                    phraseBookJP_self.scrollview && phraseBookJP_self.scrollview.refresh();
                });

            }
            if (localStorage) {
                pbIconDownloadStatus = localStorage.getItem("pbIconDownloadStatus");
            }
            if (pbIconDownloadStatus == null) {
                downloaStorageInfo = {};
                downloadTaskNum = imgs.length;
                for (var i = 0; i < imgs.length; i++) {
                    phraseBookJP_self.downloadPBIcon(imgs[i]);
                }
            } else {
                downloaStorageInfo = JSON.parse(pbIconDownloadStatus);
                console.log(downloaStorageInfo);
                downloadTaskNum = imgs.length;
                for (var i = 0; i < imgs.length; i++) {
                    var image = imgs[i];
                    var idx = image.data("idx");
                    //console.log(indicators[idx].img);
                    var storeName = (l_code + "_" + phraseBook[idx].icon).replace(" ", "");

                    if (downloaStorageInfo[storeName] != null) {
                        var filepath = downloaStorageInfo[storeName].fullPath;
                        var nativeUrl = downloaStorageInfo[storeName].nativeURL;
                        phraseBookJP_self.checkImageExist(filepath, nativeUrl, image);
                    } else {
                        phraseBookJP_self.downloadPBIcon(image);
                    }
                }
            }
            phraseBookJP_self.scrollview && phraseBookJP_self.scrollview.scrollTo('top');
            phraseBookJP_self.scrollview && phraseBookJP_self.scrollview.refresh();
        },
        downloadPBIcon: function (img) {
            var server = p_server + m_code + "/" + l_code + "/img/";
            var idx = img.data("idx");
            var storeName = (l_code + "_" + phraseBook[idx].icon).replace(" ", "");

            var opt = {
                "downloadUrl": encodeURI(server + phraseBook[idx].icon),
                "filename": storeName,
                "storePath": "phrasebook"
            };
            //amGloble.loading.show();
            emap.directDownload(opt, function (ret) {
                if (ret.fullPath != null) {
                    //amGloble.loading.hide();
                    if (downloaStorageInfo[storeName] == null) {
                        downloaStorageInfo[storeName] = {
                            "fullPath": "",
                            "nativeURL": ""
                        };
                        downloaStorageInfo[storeName].fullPath = ret.fullPath;
                        downloaStorageInfo[storeName].nativeURL = ret.nativeURL;
                    }
                    img.css("background-image", "url(" + ret.nativeURL + ")");
                    phraseBookJP_self.downloadTaskFinish();

                }
            }, function (ret) {
                //amGloble.loading.hide();
                phraseBookJP_self.downloadTaskFinish();
            });

        },
        downloadSound: function (btn) {
            var server = p_server + m_code + "/" + l_code + "/audio/";
            var idx1 = btn.data("idx1");
            var idx2 = btn.data("idx2");
            var name = phraseBook[idx1].item[idx2].audio;
            // if (name == "audio/help.mp3")
            // name = "pb_gen1_0102_help.mp3";
            // else if (name == "audio/main.mp3")
            // name = "pb_gen1_0101_sync.mp3";
            // else if (name == "audio/cancel.mp3")
            // name = "pb_gen1_0103_cancel.mp3";
            // else if (name == "audio/voice_settings.mp3")
            // name = "pb_gen1_0104_voice_settings.mp3";

            if (name instanceof Array) {
                $.each(name, function () {
                    var soundName = this;
                    var storeName = (l_code + "_" + soundName).replace(" ", "");
                    var opt = {
                        "downloadUrl": encodeURI(server + soundName),
                        "filename": storeName,
                        "storePath": "phrasebooksound"
                    };
                    amGloble.loading.show();
                    emap.directDownload(opt, function (ret) {
                        if (ret.fullPath != null) {
                            console.log(JSON.stringify(ret));
                            amGloble.loading.hide();
                            if (soundDownloadStorageInfo[storeName] == null) {
                                soundDownloadStorageInfo[storeName] = {
                                    "fullPath": "",
                                    "nativeURL": ""
                                };
                                soundDownloadStorageInfo[storeName].fullPath = ret.fullPath;
                                soundDownloadStorageInfo[storeName].nativeURL = ret.nativeURL;
                                if (localStorage) {
                                    localStorage.setItem("soundDownload", JSON.stringify(soundDownloadStorageInfo));
                                    //console.log(JSON.stringify(downloaStorageInfo));
                                }
                            }
                            // phraseBook
                            // img.css("background-image", "url(" + ret.nativeURL + ")");
                            phraseBookJP_self.play(ret.nativeURL.replace("file://", ""), btn);

                        }
                    }, function (ret) {
                        amGloble.loading.hide();
                        amGloble.msg(i18n.KNOWLEDGE_CENTRE_PHRASEWBOOK_ERRMSG1);
                    });
                });
            }
            else {
                var storeName = (l_code + "_" + name).replace(" ", "");
                var opt = {
                    "downloadUrl": encodeURI(server + name),
                    "filename": storeName,
                    "storePath": "phrasebooksound"
                };
                amGloble.loading.show();
                emap.directDownload(opt, function (ret) {
                    if (ret.fullPath != null) {
                        console.log(JSON.stringify(ret));
                        amGloble.loading.hide();
                        if (soundDownloadStorageInfo[storeName] == null) {
                            soundDownloadStorageInfo[storeName] = {
                                "fullPath": "",
                                "nativeURL": ""
                            };
                            soundDownloadStorageInfo[storeName].fullPath = ret.fullPath;
                            soundDownloadStorageInfo[storeName].nativeURL = ret.nativeURL;
                            if (localStorage) {
                                localStorage.setItem("soundDownload", JSON.stringify(soundDownloadStorageInfo));
                                //console.log(JSON.stringify(downloaStorageInfo));
                            }
                        }
                        // phraseBook
                        // img.css("background-image", "url(" + ret.nativeURL + ")");
                        phraseBookJP_self.play(ret.nativeURL.replace("file://", ""), btn);

                    }
                }, function (ret) {
                    amGloble.loading.hide();
                    amGloble.msg(i18n.KNOWLEDGE_CENTRE_PHRASEWBOOK_ERRMSG1);
                });
            }
        },
        downloadTaskFinish: function () {
            //console.log(downloadTaskNum);
            downloadTaskNum--;
            if (downloadTaskNum <= 0) {
                if (localStorage) {
                    localStorage.setItem("pbIconDownloadStatus", JSON.stringify(downloaStorageInfo));
                    //console.log(JSON.stringify(downloaStorageInfo));
                }
            }
        },
        checkImageExist: function (filepath, nativeUrl, img) {
            var opt = [filepath];
            cordova.exec(function (ret) {
                if (ret) {
                    img.css("background-image", "url(" + nativeUrl + ")");
                    phraseBookJP_self.downloadTaskFinish();
                } else {
                    phraseBookJP_self.downloadPBIcon(img);
                }
            }, function () {
            }, "File", "testFileExists", opt);

        },
        checkSoundExist: function (filepath, nativeUrl, btn) {
            var opt = [filepath];
            cordova.exec(function (ret) {
                if (ret) {
                    phraseBookJP_self.play(nativeUrl.replace("file://", ""), btn);
                } else {
                    phraseBookJP_self.downloadSound(btn);
                }
            }, function () {
            }, "File", "testFileExists", opt);

        },
        play: function (path, btn) {
            var data = amGloble.generateTrackData(
                "owner app:owner support:sync phrasebook",
                "",
                "",
                "",
                "sync:command:"+btn.parent().find(".title").html().toLowerCase(),
                false,
                false,
                false,
                false,
                false);
            amGloble.trackAction("owner app:owner support:sync phrasebook:expand:command",data);

            var opt = {
                "path": decodeURIComponent(path)
            };
            emap.play(opt, function (ret) {
                //btn.removeClass("am-clickable");
                playing = true;
                btn.addClass("on");
            }, function (ret) {
                playing = false;
                amGloble.msg(i18n.KNOWLEDGE_CENTRE_PHRASEWBOOK_ERRMSG2);
                if (btn.hasClass("on"))
                    btn.removeClass("on");
            });
            //绑定事件
            emap.bind("emap_audioended", function (ret) {
                if (btn.hasClass("on"))
                    btn.removeClass("on");
                emap.unbind("emap_audioended");
                playing = false;
                //self.stoped();
            });
            emap.bind("emap_audioerror", function (ret) {
                if (btn.hasClass("on"))
                    btn.removeClass("on");
                emap.unbind("emap_audioerror");
                playing = false;
                //self.stoped();
            });
            emap.bind("emap_audiopaused", function (ret) {
                if (btn.hasClass("on"))
                    btn.removeClass("on");
                emap.unbind("emap_audiopaused");
                playing = false;
                //self.paused();
            });

        },

        //after page show
        afterShow: function () {
            if (this.error) {
                $.am.changePage(amGloble.page.common_oops, "slideleft");
            }
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        },

        error: null,

        isNeedToDownload: function () {
            var self = this;
            var result = true;

            var localVersion = JSON.parse(localStorage.getItem("resource_version"));
            if (localVersion != null) {
                var storeName = amGloble.setting.market.code + "_version";
                var resourceVer = localVersion[storeName];

                if (resourceVer != null) {
                    $.each(resourceVer.phrasebook, function () {
                        if (this.lang == amGloble.setting.lang.code) {
                            if (this.ver.current == this.ver.latest) {
                                result = false;
                            }
                        }
                    });
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

                if (resourceVer != null) {
                    $.each(resourceVer.phrasebook, function () {
                        if (this.lang == amGloble.setting.lang.code) {
                            this.ver.current = this.ver.latest;
                        }
                    });
                }
                localStorage.setItem("resource_version", JSON.stringify(localVersion));
            }
        },

        clearResources: function () {
            var download = JSON.parse(localStorage.getItem("pbIconDownloadStatus"));
            if (download != null) {
                var firstObj = download[Object.getOwnPropertyNames(download)[0]];

                if(firstObj != null){
                    var iconPath = firstObj.fullPath.substring(0, firstObj.fullPath.lastIndexOf("/"));
                    console.log("icon path: " + iconPath);

                    var entry = new FileEntry('icon', iconPath, new FileSystem("persistent"));
                    var option = [entry.toURL()];
                    cordova.exec(function () { }, function () { }, "File", "removeRecursively", option);


                    var soundPath = iconPath.substring(0, iconPath.lastIndexOf("/")) + "/phrasebooksound";
                    console.log("sound path: " + soundPath);

                    entry = new FileEntry('sound', soundPath, new FileSystem("persistent"));
                    option = [entry.toURL()];
                    cordova.exec(function () { }, function () { }, "File", "removeRecursively", option);
                }
            }

            localStorage.removeItem("pbIconDownloadStatus");
            localStorage.removeItem("soundDownload");

            var phraseBookFile = JSON.parse(localStorage.getItem("phrasebook_config"));
            var store_name = l_code + "_phrasebook";
            if (phraseBookFile != null && phraseBookFile[store_name] != null) {
                phraseBookFile[store_name] = null;
            }
        }
    });

})();
