/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {


    amGloble.page.common_oops = new $.am.Page({
        id: "common_oops",

        init: function () {
            var self = this;

            this.$.find(".buttons li").vclick(function () {
               // var a=$.am.history;
                $.am.page.back();
                
            });

            this.$.find(".right.button").vclick(function () {
                $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
            });
        },
        //before page show
        beforeShow: function (paras) {
            //框架中如果第二次跳到同一个页面，会从history数组中删除第一次跳到这个页面的记录，而login_vehicle页面update失败后跳到oops界面在dashboard页面之前，所以会一直保存在数组中，下一次跳到oops界面之后，如果调用back（）函数则会跳到login_vehicle页面。
            //如果history数组中存在oops页面记录，则删除
            var oopsIndex
            var exsit=$.inArray(amGloble.page.common_oops, $.am.history)
            if ( exsit != -1  ) {
                oopsIndex = $.am.history.indexOf(amGloble.page.common_oops);
                $.am.history.splice(oopsIndex,1);
            };




            var title = null;
            var message = null;
            var detail = null;
            var self = this;

            amGloble.loading.hide();

            emap.getConnectionInfo({}, function (ret) {
                if (ret == "none" || ret == "unknown") {
                    title = i18n.ERROR_NOCONNECTION_TITLE;
                    message = i18n.ERROR_NOCONNECTION_MESSAGE;
                }

                if (title == null && paras && paras.detail && paras.detail.statusText == "timeout") {
                    title = i18n.ERROR_TIMEOUT_TITLE;
                    message = i18n.ERROR_TIMEOUT_MESSAGE;
                }
                                   
               if (title == null && paras && paras.detail && paras.detail == "timeout") {
               title = i18n.ERROR_TIMEOUT_TITLE;
               message = i18n.ERROR_TIMEOUT_MESSAGE;
               }
                
                 if (title == null && paras && paras.detail && paras.detail.statusText == "error") {
                    message = i18n.ERROR_HTTP_ERROR_MESSAGE;
                }

                if (title == null) {
                    if (paras) {
                        if (paras.title) {
                            title = paras.title;
                        } else {
                            title = i18n.ERROR_DEFAULT_TITLE;
                        }
                        if (paras.message) {
                            if(paras.message.status && paras.message.status.message){
                             message = paras.message.status.message;
                             }
                             else{
                              message = paras.message;
                             }
                        } else {
                            message = i18n.ERROR_DEFAULT_MESSAGE;
                        }
//                        if (paras.detail) {
//                            detail = paras.detail;
//                        } else {
//                            detail = null;
//                        }
                    }
                }

                self.$.find(".oopsfonts").html(title);
                self.$.find(".comments").html(message);
                self.$.find(".detail").html(detail);

                emap.getConnectionInfo();
            });
        },

        //after page show
        afterShow: function () { },
        //before page hide
        beforeHide: function () { },
        //after page hide
        afterHide: function () { }
    });


})();
