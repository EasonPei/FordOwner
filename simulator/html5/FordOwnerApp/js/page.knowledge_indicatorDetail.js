/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.knowledge_indicatorDetail = new $.am.Page({
        id: "knowledge_indicatorDetail",
        indicatorDetailImg: {},

        init: function () {
            var self = this;

             //var innerView = self.$.find(".am-body-inner");
             //innerView.on("swipeleft", function (e) {
             //    if (self.pageparas) {
             //        if (self.pageparas.showIndex != self.pageparas.indicators.length - 1) {
             //            var showIndex = self.pageparas.showIndex + 1;
             //            if (self.pageparas.indicators[showIndex].model == null) {
             //                self.pageparas.indicators[showIndex].model = self.pageparas.indicators[self.pageparas.showIndex].model;
             //            }

             //            self.beforeShow({ indicators: self.pageparas.indicators, showIndex: showIndex });
             //        }
             //    }
             //}).on("swiperight", function (e) {
             //    if (self.pageparas) {
             //        if (self.pageparas.showIndex != 0) {
             //            var showIndex = self.pageparas.showIndex - 1;
             //            if (self.pageparas.indicators[showIndex].model == null) {
             //                self.pageparas.indicators[showIndex].model = self.pageparas.indicators[self.pageparas.showIndex].model;
             //            }
             //            self.beforeShow({ indicators: self.pageparas.indicators, showIndex: showIndex });
             //        }
             //    }
             //});
        },
        //before page show
        beforeShow: function (paras) {
            this.pageparas = paras;

            //console.log(JSON.stringify(paras));
            var showIndicator = paras.indicators[paras.showIndex];

            $("#iconDetalTitle").text(showIndicator.name);
            $("#iconDetalImg").css("background-image", "none").nextAll("div").remove();

            if (showIndicator.detail && showIndicator.detail.description && showIndicator.detail.description.length > 0) {
                var inner = this.$.find(".am-body-inner");
                $.each(showIndicator.detail.description, function () {
                    var currentObj = this;
                    var content = "";
                    if (currentObj.meaning) {
                        content = '<div class="indicatorDetailSubtitle indicatorDetailOrangeIcon">' + i18n.INDICATOR_MEANING + '</div>';
                        content += '<div class="indicatorDetailText">' + currentObj.meaning.replace(/\n/ig, "<br/>") + '</div>';
                    }

                    if (currentObj.shoulddo) {
                        content += '<div class="indicatorDetailSubtitle indicatorDetailGreenIcon">' + i18n.INDICATOR_SHOULD_DO + '</div>';
                        content += '<div class="indicatorDetailText">' + currentObj.shoulddo.replace(/\n/ig, "<br/>") + '</div>';
                    }
                    if (content.length>0) {
                        inner.append(content);
                    }
                });

            }
            //$("#shouldText").text(paras.detail.should);
            this.getIndicatorDetailImg(showIndicator);

            this.scrollview && this.scrollview.refresh();
            this.scrollview && this.scrollview.scrollTo('top');
        },
        getIndicatorDetailImg: function (indicatorStruct) {
            var indicatorFile;
            var self = this;
            if (localStorage) {
                indicatorImgFile = localStorage.getItem("indicatorDetailImg");
            }
            if (indicatorImgFile == null) {
                indicatorDetailImg = {};
                self.downloadIndicatorImage(indicatorStruct.model, indicatorStruct.detail.detailImg);
            } else {
                indicatorDetailImg = JSON.parse(indicatorImgFile);
                if (indicatorDetailImg[indicatorStruct.detail.detailImg] != null) {
                    var tmp = indicatorDetailImg[indicatorStruct.detail.detailImg];
                    var opt = [tmp.fullPath];
                    cordova.exec(function (ret) {
                        if (ret) {
                            $("#iconDetalImg").css("background-image", "url(" + tmp.nativeURL + ")");
                        } else {
                            self.downloadIndicatorImage(indicatorStruct.model, indicatorStruct.detail.detailImg);
                        }
                    }, function () {
                    }, "File", "testFileExists", opt);
                } else {
                    self.downloadIndicatorImage(indicatorStruct.model, indicatorStruct.detail.detailImg);
                }
            }

        },
        downloadIndicatorImage: function (model, fileName) {
            var server = amGloble.setting.lang.cdn + "/Mobile-App/akamai/app/indicator/" + amGloble.setting.market.code + "/" + model + "/" + amGloble.setting.lang.code + "/Detail icons/";
            if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[model]){
              server = (server).replace(model, amGloble.setting.lang.modelcode[model]);
            }
            var opt = {
                "downloadUrl": (server + fileName).replace(/[ ]/g, "%20"),
                "filename": model + "_" + fileName,
                "storePath": "indicatorDetail"
            };
            //amGloble.loading.show();
            emap.directDownload(opt, function (ret) {
                if (ret.fullPath != null) {
                    //amGloble.loading.hide();
                    if (indicatorDetailImg[fileName] == null) {
                        indicatorDetailImg[fileName] = {
                            "fullPath": "",
                            "nativeURL": ""
                        };
                        indicatorDetailImg[fileName].fullPath = ret.fullPath;
                        indicatorDetailImg[fileName].nativeURL = ret.nativeURL;
                    }
                    $("#iconDetalImg").css("background-image", "url(" + ret.nativeURL + ")");
                    if (localStorage) {
                        localStorage.setItem("indicatorDetailImg", JSON.stringify(indicatorDetailImg));
                    }

                }
            }, function (ret) {
                //amGloble.loading.hide();

            });
            //$("#iconDetalImg").css("background-image", "url(" + server + "/" + fileName + ")");
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

        pageparas: null
    });

})();
