/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.profile_myAccount = new $.am.Page({
        id: "profile_myAccount",

        init: function () {
            var page = this;

            this.$.find(".tabs > div").eq(1).vclick(function () {
                if (amGloble.userProfileEdit.profile_edited) {
                    emap.confirm({
                        caption : "",
                        description : i18n.PROFILE_MYACCOUNT_LEAVEPAGE,
                        okCaption : i18n.PROFILE_MYACCOUNT_YES,
                        cancelCaption : i18n.PROFILE_MYACCOUNT_CANCEL
                    }, function(ret) {
                        var paras = {
                            key: "fromAccount"
                        };
                        $.am.changePage(amGloble.page.profile_myVehicle, "",paras);
                        amGloble.userProfileEdit.clear();
                    }, function(ret) {  
                    }); 

                }else{
                    var paras = {
                            key: "fromAccount"
                        };
                    $.am.changePage(amGloble.page.profile_myVehicle, "",paras);
                };  
            });

            $("#profile_myAccount .am-backbutton-account").click(
                function () {
                    if (amGloble.userProfileEdit.profile_edited) {
                        emap.confirm({
                            caption : "",
                            description : i18n.PROFILE_MYACCOUNT_LEAVEPAGE,
                            okCaption : i18n.PROFILE_MYACCOUNT_YES,
                            cancelCaption : i18n.PROFILE_MYACCOUNT_CANCEL
                        }, function(ret) {
                            $.am.changePage(amGloble.page.dashboard_main, "");
                            amGloble.userProfileEdit.clear();
                        }, function(ret) {
                            //amGloble.slideBar.main.hide(); 
                            //$.am.changePage(amGloble.page.dashboard_main, ""); 
                        }); 

                    }else{
                        $.am.changePage(amGloble.page.dashboard_main, "");
                                
                    };
            });

            $("#profile_myAccount .inputLine.updatable").vclick(
                function () {
                    var input = $("input", $(this));
                    var paras =
                        {
                            key: input.attr("id"),
                            displayname: input.attr("placeholder"),
                            value: input.val()
                        };
                    $.am.changePage(amGloble.page.profile_updateInfo, "slideleft", paras);
                });

            $("#profile_myAccount #title").parent().click(
                function () {
                    var list =amGloble.configlist.title_list;
                    amGloble.popupMenu(i18n.SIGNUP_CONTACT_USERTITLE, list, "name", function (ret) {
                        $("#profile_myAccount #title").val(ret.name);
                        amGloble.userProfileEdit.needUpdate("title",ret.value);
                    });
                }
                );

            $("#profile_myAccount #state").parent().click(
                function () {
                    var list =amGloble.configlist.state_list;
                    amGloble.popupMenu(i18n.SIGNUP_CONTACT_STATE, list, "name", function (ret) {
                        $("#profile_myAccount #state").val(ret.name);
                        amGloble.userProfileEdit.needUpdate("state",ret.value);
                    });
                }
                );

            $("#profile_myAccount .selectblock1 .am-clickable").parent().click(
               function () {
                
                   var button = $(".am-clickable", this);
                   if (button.hasClass("icon-checked")) {
                       $("#profile_myAccount .moreselects").show();
                       $("#profile_myAccount .selectblock2").show();
                       $("#profile_myAccount .choosecontent").show();
                       $("#profile_myAccount .selectblock1 .am-clickable").removeClass("icon-checked");
                       $("#profile_myAccount .selectblock1 .am-clickable").addClass("icon-uncheck");
                       $("#profile_myAccount .moreselects .am-clickable").removeClass("icon-checked");
                       $("#profile_myAccount .moreselects .am-clickable").addClass("icon-uncheck");
                       $("#profile_myAccount .selectblock2 .am-clickable").removeClass("icon-checked");
                       $("#profile_myAccount .selectblock2 .am-clickable").addClass("icon-uncheck");
                       page.refresh();

                        var data = amGloble.generateTrackData(
                            "owner app:profile:account",
                            "",
                            "",
                            "",
                            "profile:expand:offers_via_email",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:profile:account:expand",data);
                   }
                   else{
                        $("#profile_myAccount .moreselects").hide();
                        $("#profile_myAccount .selectblock2").hide();
                        $("#profile_myAccount .choosecontent").hide();
                        $("#profile_myAccount .selectblock1 .am-clickable").removeClass("icon-uncheck");
                        $("#profile_myAccount .selectblock1 .am-clickable").addClass("icon-checked");
                        $("#profile_myAccount .selectblock2 .am-clickable").removeClass("icon-checked");
                       $("#profile_myAccount .selectblock2 .am-clickable").addClass("icon-uncheck");
                   }
               }
               );

            $("#profile_myAccount .selectblock2 .am-clickable").parent().click(
                function () {
                var button = $(".am-clickable", this);
                if (button.hasClass("icon-uncheck")) {
                   $("#profile_myAccount .selectblock2 .am-clickable").removeClass("icon-uncheck");
                   $("#profile_myAccount .selectblock2 .am-clickable").addClass("icon-checked");

                   $("#profile_myAccount .moreselects .am-clickable").removeClass("icon-checked");
                   $("#profile_myAccount .moreselects .am-clickable").addClass("icon-uncheck");

                   $("#profile_myAccount .selectblock1 .am-clickable").removeClass("icon-checked");
                   $("#profile_myAccount .selectblock1 .am-clickable").addClass("icon-uncheck");
                   page.refresh();

                   var data = amGloble.generateTrackData(
                        "owner app:profile:account",
                        "",
                        "",
                        "",
                        "profile:expand:not_offers_via_email",
                        false,
                        false,
                        false,
                        false,
                        false);
                    amGloble.trackAction("owner app:profile:account:expand",data);
                }else{
                   $("#profile_myAccount .selectblock2 .am-clickable").removeClass("icon-checked");
                   $("#profile_myAccount .selectblock2 .am-clickable").addClass("icon-uncheck");
               }
            }
            );

            $("#profile_myAccount .moreselects .am-clickable").parent().click(
                function () {
                    var button = $(".am-clickable", this);
                    if (button.hasClass("icon-uncheck")) {
                        button.removeClass("icon-uncheck");
                        button.addClass("icon-checked");
                        $("#profile_myAccount .selectblock2 .am-clickable").removeClass("icon-checked");
                        $("#profile_myAccount .selectblock2 .am-clickable").addClass("icon-uncheck");
                    }else {
                           button.removeClass("icon-checked");
                           button.addClass("icon-uncheck");
                    }
                }
                );

            $("#profile_myAccount .nextbutton").vclick(
                function () {
                    amGloble.loading.show();
                    amGloble.api.login(function (ret) {
                        //成功 ret传回的值是sessionid
                        if (page.hasError()) {
                            page.submit();
                        }else{
                            amGloble.loading.hide();
                        };
                    }, function (ret) {
                        //失败
                        amGloble.loading.hide();
                       // $.am.changePage(amGloble.page.login_login, "");
                       $.am.changePage(amGloble.page.common_oops, "slideleft",
                        {
                            title: "",
                            message: "",
                            detail: ret
                        });
                    });
                }
            );

            $("#profile_myAccount .rectButton").click(
                function () {
                    amGloble.loading.show();
                    amGloble.api.login(function (ret) {
                        //成功 ret传回的值是sessionid
                        if (page.hasError()) {
                            page.submit();
                        }else{
                            amGloble.loading.hide();
                        };
                    }, function (ret) {
                        //失败
                        amGloble.loading.hide();
                        //$.am.changePage(amGloble.page.login_login, "");
                        $.am.changePage(amGloble.page.common_oops, "slideleft",
                        {
                            title: "",
                            message: "",
                            detail: ret
                        });
                    });
                }
            );
        },
        //before page show
        beforeShow: function (paras) {
            var isVietnam = (amGloble.setting.market.code == "VN");
            if(isVietnam){
                this.$.addClass("Vietnam");
            }
            
            //placeholder
            $("#profile_myAccount #title").attr("placeholder",i18n.PROFILE_MYACCOUNT_TITLE);
            $("#profile_myAccount #forum_nickname").attr("placeholder",i18n.PROFILE_MYACCOUNT_NICKNAMEDEFAULT);
            $("#profile_myAccount #state").attr("placeholder",i18n.PROFILE_MYACCOUNT_STATE);
            $("#profile_myAccount #city").attr("placeholder",i18n.PROFILE_MYACCOUNT_CITY);
            $("#profile_myAccount #street").attr("placeholder",i18n.PROFILE_MYACCOUNT_STREET);
            $("#profile_myAccount #postal_code").attr("placeholder",i18n.PROFILE_MYACCOUNT_POSTCODE);
            $("#profile_myAccount #min").attr("placeholder",i18n.PROFILE_MYACCOUNT_MOBILENUMBER);
            $("#profile_myAccount #home_phone").attr("placeholder",i18n.PROFILE_MYACCOUNT_HOMENUMBER);
            $("#profile_myAccount #work_phone").attr("placeholder",i18n.PROFILE_MYACCOUNT_WORKNUMBER);
            $("#profile_myAccount #password").attr("placeholder",i18n.SIGNUP_ACCOUNT_PASSWORD);


            
            if (amGloble.configlist.state_list==null || amGloble.configlist.title_list==null) {
                $.ajax({
                    url : amGloble.setting.lang.host + "/servlet/rest/owner/ext/" + amGloble.setting.lang.site + "/profileconfig",
                    type : "GET",
                    dataType : "json",
                    contentType : "application/json",
					timeout : amGloble.setting.market.timeout || 30000,
                    success : function(ret) {
                        amGloble.configlist.state_list = ret.state;
                        amGloble.configlist.title_list = ret.title;
                        var titlename = null;
                        if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["title"]) {

                            for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                                if (amGloble.userProfileEdit.profile_edited["title"]==amGloble.configlist.title_list[i].value) {
                                    titlename=amGloble.configlist.title_list[i].name;
                                };
                            };
                            $("#profile_myAccount #title").val(titlename);
                        }else{
                            for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                                if (amGloble.userinfo.profile.title==amGloble.configlist.title_list[i].value) {
                                    titlename=amGloble.configlist.title_list[i].name;
                                };
                            };
                            $("#profile_myAccount #title").val(titlename);
                        };
                        var statename = null;
                        if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["state"]) {

                            for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                                if (amGloble.userProfileEdit.profile_edited["state"]==amGloble.configlist.state_list[i].value) {
                                    statename=amGloble.configlist.state_list[i].name;
                                };
                            };
                            $("#profile_myAccount #state").val(statename);
                        }else{
                            for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                                if (amGloble.userinfo.profile.state==amGloble.configlist.state_list[i].value) {
                                    statename=amGloble.configlist.state_list[i].name;
                                };
                            };
                            $("#profile_myAccount #state").val(statename);
                        };
                    },
                    error : function(ret) {
                        console.log(ret);
                       // fcb && fcb(ret);
                       setTimeout(function(){
                            $.am.changePage(amGloble.page.common_oops, "slideleft",
                            {
                                title: "",
                                message: "",
                                detail: ret
                            });
                        },1000);
                    }
                });
           }else{
             var titlename = null;
                        if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["title"]) {
                            for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                                if (amGloble.userProfileEdit.profile_edited["title"]==amGloble.configlist.title_list[i].value) {
                                    titlename=amGloble.configlist.title_list[i].name;
                                };
                            };
                            $("#profile_myAccount #title").val(titlename);
                        }else{
                            for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                                if (amGloble.userinfo.profile.title==amGloble.configlist.title_list[i].value) {
                                    titlename=amGloble.configlist.title_list[i].name;
                                };
                            };
                            $("#profile_myAccount #title").val(titlename);
                        };
                        var statename = null;
                        if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["state"]) {

                            for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                                if (amGloble.userProfileEdit.profile_edited["state"]==amGloble.configlist.state_list[i].value) {
                                    statename=amGloble.configlist.state_list[i].name;
                                };
                            };
                            $("#profile_myAccount #state").val(statename);
                        }else{
                           for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                                if (amGloble.userinfo.profile.state==amGloble.configlist.state_list[i].value) {
                                    statename=amGloble.configlist.state_list[i].name;
                                };
                            };
                            $("#profile_myAccount #state").val(statename);
                        };
            };

            if (amGloble.userinfo.sessionid) {
                if (paras) {
                    if (paras.key=="password") {
                        var obj =
                        {
                           username: $("#profile_myAccount #username").val(),
                            password: paras.value,
                            old_password: amGloble.userinfo.password,
                        };
                        amGloble.loading.show();
                        amGloble.api.updateProfile(obj,
                            function(ret) {
                                amGloble.loading.hide();
                                //amGloble.msg(ret.status.code);
                                if (ret.status.code=="success") {
                                    amGloble.popup.saveOk.enableInnerClose = true;
                                    amGloble.popup.saveOk.show();
                                    amGloble.userinfo.password = paras.value;
                                    localStorage.setItem("fordOwenerApp_password", amGloble.userinfo.password);
                                    $("#profile_myAccount #"+paras.key).val(paras.value);
                                }else{
                                   // amGloble.msg(ret.status.code);
                                   $.am.changePage(amGloble.page.common_oops, "slideleft",
                                    {
                                        title: "",
                                        message: ret,
                                        detail: ret.status.message
                                    });
                                };
                            }, function(ret) {
                                //amGloble.msg(ret);
                                amGloble.loading.hide();
                                $.am.changePage(amGloble.page.common_oops, "slideleft",
                                    {
                                        title: "",
                                        message: ret,
                                        detail: ret
                                    });
                            }
                        );
                    }
                    else{
                        $("#profile_myAccount #"+paras.key).val(paras.value);
                        $("#profile_myAccount #"+paras.key).focus();
                        //todo save
                        amGloble.userProfileEdit.needUpdate(paras.key,paras.value);
                    }
                }

                //todo use userProfileEdit first
                $("#profile_myAccount #username").val(amGloble.userinfo.username);
                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["password"]) {
                    $("#profile_myAccount #password").val(amGloble.userProfileEdit.profile_edited.password);
                }else{
                    $("#profile_myAccount #password").val(amGloble.userinfo.password);
                };

                $("#profile_myAccount #email").val(amGloble.userinfo.profile.email);
                $("#profile_myAccount #firstname").val(amGloble.userinfo.profile.firstname);
                $("#profile_myAccount #lastname").val(amGloble.userinfo.profile.lastname);

                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["forum_nickname"]) {
                    $("#profile_myAccount #forum_nickname").val(amGloble.userProfileEdit.profile_edited.forum_nickname);
                }else{
                    $("#profile_myAccount #forum_nickname").val(amGloble.userinfo.profile.forum_nickname);
                };
        
                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["city"]) {
                    $("#profile_myAccount #city").val(amGloble.userProfileEdit.profile_edited.city);
                }else{
                    $("#profile_myAccount #city").val(amGloble.userinfo.profile.city);
                };
                
                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["street"]) {
                    $("#profile_myAccount #street").val(amGloble.userProfileEdit.profile_edited.street);
                }else{
                    $("#profile_myAccount #street").val(amGloble.userinfo.profile.street);
                };

                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["postal_code"]) {
                    $("#profile_myAccount #postal_code").val(amGloble.userProfileEdit.profile_edited.postal_code);
                }else{
                    $("#profile_myAccount #postal_code").val(amGloble.userinfo.profile.postal_code);
                };
                amGloble.tag.setItem("postcode",amGloble.userinfo.profile.postal_code);

                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["min"] != null) {
                    $("#profile_myAccount #min").val(amGloble.userProfileEdit.profile_edited.min);
                }else{
                    $("#profile_myAccount #min").val(amGloble.userinfo.profile.min);
                };

                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["work_phone"] != null) {
                    $("#profile_myAccount #work_phone").val(amGloble.userProfileEdit.profile_edited.work_phone);
                }else{
                    $("#profile_myAccount #work_phone").val(amGloble.userinfo.profile.work_phone);
                };
                
                if (amGloble.userProfileEdit.profile_edited && amGloble.userProfileEdit.profile_edited["home_phone"] != null) {
                    $("#profile_myAccount #home_phone").val(amGloble.userProfileEdit.profile_edited.home_phone);
                }else{
                    $("#profile_myAccount #home_phone").val(amGloble.userinfo.profile.home_phone);
                };
                 
                $("#profile_myAccount .am-header p").text(amGloble.userinfo.profile.firstname.toUpperCase() +" "+ amGloble.userinfo.profile.lastname.toUpperCase() + " "+ i18n.PROFILE_MYVEHICLE_TITLE);
               
                $("#profile_myAccount .moreselects").hide();
                $("#profile_myAccount .choosecontent").hide();

                if(amGloble.setting.market.name=="Australia"||amGloble.setting.market.name=="Korea"||amGloble.setting.market.name=="China"||amGloble.setting.market.name=="Japan"){
                      $("#profile_myAccount .selectblock1").hide();
                      $("#profile_myAccount .moreselects").hide();
                      $("#profile_myAccount .selectblock2").hide();
                      $("#profile_myAccount .choosecontent").hide();
                      $("#profile_myAccount .contactcontent").hide();

                }else{

                    if (amGloble.userinfo.profile.offers_via_email){
                        if ($("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-uncheck")) {
                            $("#profile_myAccount .selectblock1 .am-clickable").click();
                        };
                        $("#profile_myAccount .moreselects").hide();
                        $("#profile_myAccount .choosecontent").hide(); 
                        $("#profile_myAccount .selectblock2").hide();
                    }  

                    if(!amGloble.userinfo.profile.offers_via_email&&!amGloble.userinfo.profile.news_and_announcements&&!amGloble.userinfo.profile.special_offers_and_discounts&&!amGloble.userinfo.profile.information_for_owners&&!amGloble.userinfo.profile.event_activities_invitations){
                        $("#profile_myAccount .moreselects").show();
                        $("#profile_myAccount .choosecontent").show();
                        $("#profile_myAccount .selectblock2").show();
                        if ($("#profile_myAccount .selectblock2 .am-clickable").hasClass("icon-uncheck")) {
                            $("#profile_myAccount .selectblock2 .am-clickable").click();
                        };
                    }               

                    if (!amGloble.userinfo.profile.offers_via_email&&amGloble.userinfo.profile.news_and_announcements){
                        $("#profile_myAccount .moreselects").show();
                        $("#profile_myAccount .choosecontent").show();
                        $("#profile_myAccount .selectblock2").show();
                        if ($("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-uncheck")) {
                            $("#profile_myAccount .moreselects .am-clickable").eq(0).click();

                        };
                    }
                    
                    if (!amGloble.userinfo.profile.offers_via_email&&amGloble.userinfo.profile.special_offers_and_discounts){
                        $("#profile_myAccount .moreselects").show();
                        $("#profile_myAccount .choosecontent").show();
                        $("#profile_myAccount .selectblock2").show();
                        if ($("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-uncheck")) {
                            $("#profile_myAccount .moreselects .am-clickable").eq(1).click();
                        };
                    }

                    if (!amGloble.userinfo.profile.offers_via_email&&amGloble.userinfo.profile.information_for_owners){
                        $("#profile_myAccount .moreselects").show();
                        $("#profile_myAccount .choosecontent").show();
                        $("#profile_myAccount .selectblock2").show();
                        if ($("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-uncheck")) {
                            $("#profile_myAccount .moreselects .am-clickable").eq(2).click();
                        };
                    }

                    if (!amGloble.userinfo.profile.offers_via_email&&amGloble.userinfo.profile.event_activities_invitations){
                        $("#profile_myAccount .moreselects").show();
                        $("#profile_myAccount .choosecontent").show();
                        $("#profile_myAccount .selectblock2").show();
                        if ($("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-uncheck")) {
                            $("#profile_myAccount .moreselects .am-clickable").eq(3).click();
                        };
                    }
                };

                if (amGloble.setting.market.name!="Australia") {
                    $("#profile_myAccount #home_phone").parent().hide();
                    $("#profile_myAccount #work_phone").parent().hide();
                    $("#profile_myAccount .commentsLine").hide();

                }else{
                    $("#profile_myAccount #home_phone").parent().show();
                    $("#profile_myAccount #work_phone").parent().show();
                    $("#profile_myAccount .commentsLine").show();
                };
            }

            var data = amGloble.generateTrackData(
                "owner app:profile:account",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:profile:account",data);
        },

        //after page show
        afterShow: function () {
            if (!amGloble.userinfo.sessionid) {
                $.am.changePage(amGloble.page.login_login, "");
                return;
            }
            
            setTimeout(function(){
                $("#profile_myAccount .nextbutton").addClass("am-clickable");
            },1000);
        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        },

        submit: function () {
                var a;
                if(amGloble.setting.market.name=="Australia"||amGloble.setting.market.name=="Korea"||amGloble.setting.market.name=="China"||amGloble.setting.market.name=="Japan"){
                    if (amGloble.userProfileEdit.profile_edited) {
                        amGloble.userProfileEdit.profile_edited["username"] = $("#profile_myAccount #username").val();
                        a=amGloble.userProfileEdit.profile_edited;
                        
                    }else{
                        a= new Object();
                        
                    };
                  }else{
                    //other market
                    if (amGloble.userProfileEdit.profile_edited) {
                        amGloble.userProfileEdit.profile_edited["username"] = $("#profile_myAccount #username").val();
                        a=amGloble.userProfileEdit.profile_edited;
                        if (amGloble.userinfo.profile.offers_via_email == $("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-checked")&&amGloble.userinfo.profile.news_and_announcements == $("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-checked")&&amGloble.userinfo.profile.special_offers_and_discounts == $("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-checked")&&amGloble.userinfo.profile.information_for_owners == $("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-checked")&&amGloble.userinfo.profile.event_activities_invitations == $("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-checked")) {
                            //
                        }else{
                            a.offers_via_email = $("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-checked");
                            a.news_and_announcements = $("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-checked");
                            a.special_offers_and_discounts = $("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-checked");
                            a.information_for_owners = $("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-checked");
                            a.event_activities_invitations = $("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-checked");
                        };
                    }else{
                        a= new Object();
                        a.username = $("#profile_myAccount #username").val();
                         if (amGloble.userinfo.profile.offers_via_email == $("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-checked")&&amGloble.userinfo.profile.news_and_announcements == $("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-checked")&&amGloble.userinfo.profile.special_offers_and_discounts == $("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-checked")&&amGloble.userinfo.profile.information_for_owners == $("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-checked")&&amGloble.userinfo.profile.event_activities_invitations == $("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-checked")) {
                            //
                        }else{
                            a.offers_via_email = $("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-checked");
                            a.news_and_announcements = $("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-checked");
                            a.special_offers_and_discounts = $("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-checked");
                            a.information_for_owners = $("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-checked");
                            a.event_activities_invitations = $("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-checked");
                        };
                    };

                    if (a.offers_via_email===false&&a.news_and_announcements==false&&a.special_offers_and_discounts==false&&a.information_for_owners==false&&a.event_activities_invitations==false&&$("#profile_myAccount .selectblock2 .am-clickable").hasClass("icon-checked")==false) {
                        amGloble.msg(i18n.PROFILE_MYACCOUNT_LEAST);
                        amGloble.loading.hide();
                        return;
                    };
                  }


                
            

                


            amGloble.userinfo.username = $("#profile_myAccount #username").val();
            amGloble.userinfo.password = $("#profile_myAccount #password").val();
            amGloble.userinfo.profile.email = $("#profile_myAccount #email").val();
            amGloble.userinfo.profile.firstname = $("#profile_myAccount #firstname").val();
            amGloble.userinfo.profile.lastname = $("#profile_myAccount #lastname").val();
          //amGloble.userinfo.profile.title = $("#profile_myAccount #title").val();
            amGloble.userinfo.profile.forum_nickname = $("#profile_myAccount #forum_nickname").val();
          //amGloble.userinfo.profile.state = $("#profile_myAccount #state").val();
            amGloble.userinfo.profile.city = $("#profile_myAccount #city").val();
            amGloble.userinfo.profile.street = $("#profile_myAccount #street").val();
            amGloble.userinfo.profile.postal_code = $("#profile_myAccount #postal_code").val();
            amGloble.tag.setItem("postcode",amGloble.userinfo.profile.postal_code);
            amGloble.userinfo.profile.min = $("#profile_myAccount #min").val();
            amGloble.userinfo.profile.work_phone = $("#profile_myAccount #work_phone").val();
            amGloble.userinfo.profile.home_phone = $("#profile_myAccount #home_phone").val();
            amGloble.userinfo.profile.offers_via_email = $("#profile_myAccount .selectblock1 .am-clickable").hasClass("icon-checked");
            amGloble.userinfo.profile.news_and_announcements = $("#profile_myAccount .moreselects .am-clickable").eq(0).hasClass("icon-checked");
            amGloble.userinfo.profile.special_offers_and_discounts = $("#profile_myAccount .moreselects .am-clickable").eq(1).hasClass("icon-checked");
            amGloble.userinfo.profile.information_for_owners = $("#profile_myAccount .moreselects .am-clickable").eq(2).hasClass("icon-checked");
            amGloble.userinfo.profile.event_activities_invitations = $("#profile_myAccount .moreselects .am-clickable").eq(3).hasClass("icon-checked");

            var titlecode = null;
              var title = $("#profile_myAccount #title").val();
              for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                    if (title==amGloble.configlist.title_list[i].name) {
                        titlecode=amGloble.configlist.title_list[i].value;
                    };
                };

              var statecode = null;
              var state = $("#profile_myAccount #state").val();
              for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                    if (state==amGloble.configlist.state_list[i].name) {
                        statecode=amGloble.configlist.state_list[i].value;
                    };
                };
            amGloble.userinfo.profile.title = titlecode;
            amGloble.userinfo.profile.state = statecode;
                                                    
            var data = amGloble.generateTrackData(
                "owner app:profile:account",
                "",
                "",
                "",
                "profile:save",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackAction("owner app:profile:account:save",data);
            
            amGloble.api.updateProfile(a,
                function(ret) {
                    amGloble.loading.hide();
                   // amGloble.msg(ret.status.code);
                    if (ret.status.code=="success") {
                        amGloble.popup.saveOk.enableInnerClose = true;
                        amGloble.popup.saveOk.show();
                        amGloble.userProfileEdit.clear();
                    }else{
                       // amGloble.msg(ret.status.code);
                       amGloble.userProfileEdit.clear();

                      amGloble.api.getprofile();
                       $.am.changePage(amGloble.page.common_oops, "slideleft",
                        {
                            title: "",
                            message: ret,
                            detail: ret
                        });
                    };
                }, function(ret) {
                    amGloble.loading.hide();
                   // amGloble.msg(ret);
                   amGloble.userProfileEdit.clear();
                  amGloble.api.getprofile();
                    $.am.changePage(amGloble.page.common_oops, "slideleft",
                        {
                            title: "",
                            message: ret,
                            detail: ret
                        });
                }
            );
        },
        hasError: function () {
            var message = this.getValidationError();
            if (message) {
                amGloble.msg(message);
                return false;
            }
            else {
                return true;
            }
        },
        getValidationError: function () {
            var test= amGloble.setting.registration.fields;
            var message=null;
            if (!$("#profile_myAccount #min").val().trim() && !$("#profile_myAccount #work_phone").val().trim() && !$("#profile_myAccount #home_phone").val().trim()) {
                message = i18n.PROFILE_MYACCOUNT_ATLEAST;
                return message;
            }

            if ($("#profile_myAccount #forum_nickname").val().trim())
            {
                var reg =new RegExp(test.forum_nickname.reg);
                if (!reg.test($("#profile_myAccount #forum_nickname").val().trim())){
                    message = test.forum_nickname.regmsg;
                    return message;
                }
            }

            if ($("#profile_myAccount #postal_code").val().trim())
            {
                var reg =new RegExp(test.postal_code.reg);
                if (!reg.test($("#profile_myAccount #postal_code").val().trim())){
                    message = test.postal_code.regmsg;
                   // message = "It must be in 6 digits.";
                    return message;
                }
            }

            if ($("#profile_myAccount #city").val().trim())
            {
                var reg =new RegExp(test.city.reg);
                if (!reg.test($("#profile_myAccount #city").val().trim())){
                    message = test.city.regmsg;
                    return message;
                }
            }

            if ($("#profile_myAccount #street").val().trim()){
                var reg =new RegExp(test.street.reg);
                if (!reg.test($("#profile_myAccount #street").val().trim())){
                    message = test.street.regmsg;
                    return message;
                }
            }

            if (amGloble.setting.market.name!="Australia") {
              
                  var reg =new RegExp(test.min.reg);
                  if (!reg.test($("#profile_myAccount #min").val().trim())) {
                      message = test.min.regmsg;
                      //message = "It must be 10 digits, starting with 7 or 8 or 9 (7-9).";
                      return message;
                  }
            }else{
                if ($("#profile_myAccount #min").val().trim()) {
                  var reg =new RegExp(test.min.reg);
                  if (!reg.test($("#profile_myAccount #min").val().trim())) {
                      message = test.min.regmsg;
                      //message = "It must be 10 digits, starting with 7 or 8 or 9 (7-9).";
                      return message;
                  }
                };
                if ($("#profile_myAccount #work_phone").val().trim()) {
                  var reg =new RegExp(test.work_phone.reg);
                  if (!reg.test($("#profile_myAccount #work_phone").val().trim())) {
                      message = test.work_phone.regmsg;
                      return message;
                  }
                };
                if ($("#profile_myAccount #home_phone").val().trim()) {
                  var reg =new RegExp(test.home_phone.reg);
                  if (!reg.test($("#profile_myAccount #home_phone").val().trim())) {
                      message = test.home_phone.regmsg;
                      return message;
                  }
                };
            };

        }


    });

})();
