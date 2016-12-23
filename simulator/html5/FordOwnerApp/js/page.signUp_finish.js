/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {
  
  
  amGloble.page.signUp_finish = new $.am.Page({
    id : "signUp_finish",

    init : function() {
        var page = this;

        $("#signUp_finish .am-clickable.picrefresh").click(
            function () {
                var a=$("#signUp_finish .captcha")
                a.remove();
                $("#signUp_finish .am-clickable.picrefresh").append(a.clone());
        });

        $("#signUp_finish .am-clickable.bottombutton").vclick(
            function () {
                if (page.hasError()) {
                    page.submit();
                }
                
            }
        );

        $("#signUp_finish .inputli input").keydown(
            function () {
                $("#signUp_finish .am-clickable.bottombutton").css("background","#2d96cd");   
        });

        $("#signUp_finish .inputli input").blur(
            function () {
                if (!$("#signUp_finish .inputli input").val().trim()) {
                    $("#signUp_finish .am-clickable.bottombutton").css("background","#888686");   
                };
        });
    },
    //before page show
    beforeShow : function(paras) {
      //placeholder
      $("#signUp_finish #captcha").attr("placeholder",i18n.SIGNUP_FINISH_INPUT);
      
        $(".signUp_finish #captchaImg").attr("src",amGloble.setting.lang.host +"/servlet/captcha.png");
        $(".signUp_finish .error-message").text("");
    },

    //after page show
    afterShow : function() {
    },
    //before page hide
    beforeHide : function() {
    },
    //after page hide
    afterHide : function() {
        $("#signUp_finish .error-message").text("");
    },
    hasError: function () {
        if (!$(".signUp_finish #captcha").val().trim()){
                 $(".signUp_finish .error-message").text(i18n.SIGNUP_FINISH_INVALID);
                 return false;
        }else{
            $(".signUp_finish .error-message").text("");
                 return true;
        }

    },
    submit: function () {
        var url = null;
        var obj = window.localStorage.signUpObj;
        obj = JSON.parse(obj);
        obj.captcha = $(".signUp_finish #captcha").val().trim(),
        window.localStorage.signUpObj = JSON.stringify(obj);
        if (obj.forum_nickname) {
            url = amGloble.getHttpsUrl() +"/servlet/rest/owner/ext/"+ amGloble.setting.lang.site +"/profilecreate";
        }else{
            url = amGloble.getHttpsUrl() +"/servlet/rest/owner/ext/"+ amGloble.setting.lang.site +"/partialprofilecreate";
        }
        var userInfo = JSON.parse(window.localStorage.signUpObj);
        amGloble.loading.show();

          $.ajax({
              url: url,
              type: "POST",
              dataType: "json",
              contentType: "application/json",
              timeout : amGloble.setting.market.timeout || 30000,
              data: window.localStorage.signUpObj,

              success: function (ret) {
                  // set login
                  amGloble.loading.hide();
                    if (ret.status.code=="success") {

                        var data = amGloble.generateTrackData(
                                "owner app:register:signup finish",
                                "",
                                "",
                                "event:registered",
                                "register complete",
                                false,
                                false,
                                false,
                                true,
                                true);
                        amGloble.trackAction("owner app:register:signup finish:complete",data);

                        amGloble.tag.setItem("vin",window.localStorage.signUpObj.vehicle_vin_1);

                        $.am.changePage(amGloble.page.login_login, "slideleft", {
                            username: userInfo.username,
                            password: userInfo.password,
                            from: amGloble.page.dashboard_main
                        });

                    }else{
                             //amGloble.msg(ret.message);
                           
                            $(".signUp_finish .error-message").text(ret.status.message);

                            var a=$("#signUp_finish .captcha")
                            a.remove();
                            $("#signUp_finish .am-clickable.picrefresh").append(a.clone());
                    };
              },
              error: function (ret) {
                amGloble.loading.hide();
                $.am.changePage(amGloble.page.common_oops, "slideleft",
                  {
                      title: "",
                      message: "",
                      detail: ret
                  }
                );
          }
        }
      );      
    },

  });

})(); 