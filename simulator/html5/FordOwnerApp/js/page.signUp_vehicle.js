/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {
	
	
    amGloble.page.signUp_vehicle = new $.am.Page({
        id : "signUp_vehicle",
        page_type : "signUp_vehicle",
        alreadyAddVechicle : false,

        init: function () {
            $("#signUp_vehicle .how-findvin").click(
                function () {
                    amGloble.popup.findVin.enableInnerClose = true;
                    amGloble.popup.findVin.show();

                    if(page_type == "signUp_vehicle" ){
                        var data = amGloble.generateTrackData(
                            "owner app:register:vehicle info",
                            "",
                            "",
                            "",
                            "register:popup:find vin",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:register:vehicle info:find vin",data);
                    }
                    else{
                        var data = amGloble.generateTrackData(
                            "owner app:profile:vehicle info",
                            "",
                            "",
                            "",
                            "profile:popup:find vin",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:profile:vehicle info:find vin",data);
                    }
                     
                }
            );                                
                                                 
            var page = this;
            $("#signUp_vehicle .lasticonli .am-clickable.icon-scan").click(
                function () {
                    if (typeof emap != "undefined") {
                       

                       var data = amGloble.generateTrackData(
                                                             (page_type == "signUp_vehicle"?"owner app:register:vehicle info":"owner app:profile:vehicle info"),
                                                             "",
                                                             "",
                                                             "",
                                                             "scan:vin",
                                                             false,
                                                             false,
                                                             false,
                                                             false,
                                                             false)
                       amGloble.trackAction("vin scan",data);

                        emap.barcode({
                            mode: 3
                        }, function success(ret) {
                            //ret
                            //{
                            //    "result" : 0,
                            //    "message" : "Success",
                            //    "content" : "http://www.163.com"
                            //}

                            $("#vin").val(ret.content);

                        }, function error(ret) {
                                     if(ret.result == -5){
                                     //权限受限
                                      amGloble.msg(i18n.SIGNUP_VEHICLE_DEVICE);
                                     }
                                     else{
                                      amGloble.msg(i18n.SIGNUP_VEHICLE_SCANERROR);
                                     }

                            
                            $("#vin").val("");
                        });
                    }
                    else{
                            amGloble.msg(i18n.SIGNUP_VEHICLE_DEVICE);
                        }
                   }
                );

            $("#signUp_vehicle #vehiclename").parent().parent().click
            (
                function () {
                  var list = amGloble.setting.lang.model;
                  var list2=[];
                  for (var i = 0; i < list.length; i++) {
                    var obj= new Object;
                    obj.title=list[i];
                    obj.value=list[i];
                    list2[i]=obj;
                    obj=null;
                  };
                    amGloble.popupMenu(i18n.SIGNUP_VEHICLE_NAME, list2, "title", function (ret) {
                        $("#signUp_vehicle #vehiclename").val(ret.value);
                    });
                }
            );
            
            $("#signUp_vehicle .signup-vcswitch .am-clickable").click(
                function () {

                        var button = $(this);
                        $(".focused", button.parent()).removeClass("focused");
                        button.addClass("focused");

                        var id = button.attr("id");
                        var input = $("#signUp_vehicle .formline input[name='vin']");
                        if(id == "signup-vcswitch11") // Manual input
                        {
                            input.removeAttr("readonly");
                            $("#signUp_vehicle .lasticonli").hide();

                            if(page_type == "signUp_vehicle" ){
                                var data = amGloble.generateTrackData(
                                    "owner app:register:vehicle info",
                                    "",
                                    "",
                                    "",
                                    "register:manual vin",
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                                amGloble.trackAction("owner app:register:vehicle info:manual vin",data);
                            }
                            else {
                                var data = amGloble.generateTrackData(
                                    "owner app:profile:vehicle info",
                                    "",
                                    "",
                                    "",
                                    "profile:manual vin",
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                                amGloble.trackAction("owner app:profile:vehicle info:manual vin",data);
                            }
                        }
                        else
                        {
                            input.attr("readonly", "readonly");
                            $("#signUp_vehicle .lasticonli").show();

                            if(page_type == "signUp_vehicle" ){
                                var data = amGloble.generateTrackData(
                                    "owner app:register:vehicle info",
                                    "",
                                    "",
                                    "",
                                    "register:scan vin",
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                                amGloble.trackAction("owner app:register:vehicle info:scan vin",data);
                            }
                            else {
                                var data = amGloble.generateTrackData(
                                    "owner app:profile:vehicle info",
                                    "",
                                    "",
                                    "",
                                    "profile:scan vin",
                                    false,
                                    false,
                                    false,
                                    false,
                                    false);
                                amGloble.trackAction("owner app:profile:vehicle info:scan vin",data);
                            }
                        } 
                });

            $("#signUp_vehicle .bottombutton").vclick(
                function () {
                    if(page_type == "signUp_vehicle" ){
                        if(!page.hasError())
                        {
                            //$.am.changePage(amGloble.page.signUp_contact, "slideleft");
                            page.getError();
                        }
                    }                        
                    else{
                        if(!page.hasError())
                        {
                            var v_obj = new Object();

                            v_obj.vehicle_nickname = $("#signUp_vehicle #vehiclename").val().trim();
                            v_obj.vehicle_vin = $("#vin").val().trim().toUpperCase();

                            var exist = contains();
                            function contains() { 
                              for (var i = 0; i < amGloble.userinfo.profile.user_vehicles.length; i++) {
                                
                                if (amGloble.userinfo.profile.user_vehicles[i].vin==v_obj.vehicle_vin) {
                                    return true;
                                };
                            };
                              return false; 
                            }
                            if (exist) {
                                amGloble.msg(i18n.SIGNUP_VEHICLE_ERRORVINEXSIT);
                                return;
                            };

                            $("#signUp_vehicle .bottombutton").removeClass("am-clickable");

                            $.ajax({
                                url : amGloble.setting.lang.host +"/servlet/rest/ownerapp/"+ amGloble.setting.lang.site +"/ext/info/" + v_obj.vehicle_vin,
                                type : "GET",
                                dataType : "json",
                                contentType : "application/json",
								timeout : amGloble.setting.market.timeout || 30000,
                                //data : JSON.stringify(data),
                                success : function(ret) {

                                    var status = ret.status;

                                    if(!status){
                                        amGloble.userinfo.profile.user_vehicles.push(v_obj);
                                        amGloble.userinfo.profile.user_vehicles.isLoaded = null;
                                        alreadyAddVechicle = true;
                                        var obj =
                                            {
                                                username: amGloble.userinfo.username,
                                                user_vehicles: amGloble.userinfo.profile.user_vehicles    
                                            };
                                        amGloble.loading.show();
                                        amGloble.api.updateProfile(obj,
                                            function(ret) {
                                                amGloble.loading.hide();
                                                //amGloble.msg(ret.status.code);
                                                if (ret.status.code=="success") {
                                                    amGloble.msg(i18n.COMMON_SUCC);
                                                    $.am.changePage(amGloble.page.profile_myVehicle, "back");
                                                    $("#signUp_vehicle .bottombutton").addClass("am-clickable");
                                                }else{
                                                     amGloble.msg(ret.status.code);
                                                     amGloble.userinfo.profile.user_vehicles.splice(-1 , 1);
                                                     $("#signUp_vehicle .bottombutton").addClass("am-clickable");
                                                     $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                        {
                                                            title: "",
                                                            message: ret,
                                                            detail: ret
                                                        });
                                                }
                                            }, function(ret) {
                                                amGloble.loading.hide();
                                               // amGloble.msg("update failed");
                                                amGloble.userinfo.profile.user_vehicles.splice(-1 , 1);
                                                $("#signUp_vehicle .bottombutton").addClass("am-clickable");
                                                $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                    {
                                                        title: "",
                                                        message: ret,
                                                        detail: ret
                                                    });
                                            }
                                        );
                                    }else{
                                        $.am.changePage(amGloble.page.common_oops, "slideleft",
                                        {
                                            title: "",
                                            message: "",
                                            detail: ret
                                        });
                                    }
                                    
                                },
                                error : function(ret) {
                                    console.log(ret);
                                    //var messageDisplay = $("#signUp_vehicle .error-message");
                                    //messageDisplay.show();
                                   // messageDisplay.text(i18n.SIGNUP_VEHICLE_DATA);
                                    $("#signUp_vehicle .bottombutton").addClass("am-clickable");
                                    $.am.changePage(amGloble.page.common_oops, "slideleft",
                                        {
                                            title: "",
                                            message: "",
                                            detail: ret
                                        });
                                }
                            });
                        }
                    }
                });

            $("#signUp_vehicle .nextbutton").click(
                function () {
                    if(page_type == "signUp_vehicle" ){
                        if(!page.hasError())
                        {
                            //$.am.changePage(amGloble.page.signUp_contact, "slideleft");
                            page.getError();
                        }
                    }                        
                    
                });

            var message=null;
            var test=null;
            // if (amGloble.setting) {
            //     test = amGloble.setting.registration.fields;
            // };

            $("#signUp_vehicle #vin").blur(
                function () {
                    test = amGloble.setting.registration.fields;
                    var vin=$("#signUp_vehicle #vin").val().trim();
                    if (vin) {
                        var reg =new RegExp(test.vehicle_vin_1.reg);
                        if (!reg.test(vin)) {
                            message = test.vehicle_vin_1.regmsg;
                            $("#signUp_vehicle .error-message").html(message);
                            $("#signUp_vehicle .error-message").show();
                        }else{
                            $("#signUp_vehicle .error-message").html("");
                            $("#signUp_vehicle .error-message").hide();
                        }
                    };  
                });
		},

        //before page show
        beforeShow: function (paras) {
            //placeholder
            $("#signUp_vehicle #vehiclename").attr("placeholder",i18n.SIGNUP_VEHICLE_SELECT);
            $("#signUp_vehicle #vin").attr("placeholder",i18n.SIGNUP_VEHICLE_VINCODE);

            var page = this;

            if(typeof paras != "undefined" && paras == "addVehicle"||amGloble.userinfo.sessionid){
                //addVehicle
                $("#signUp_vehicle .signup-savedvehicle").hide();
                $("#signUp_vehicle .addvehicle").hide();
                $("#signUp_vehicle .nextbutton").hide();
                $("#signUp_vehicle .am-clickable.bottombutton").html(i18n.SIGNUP_VEHICLE_ADD);
                $("#signUp_vehicle .am-header p").html(i18n.SIGNUP_VEHICLE_ADDTITLE);
                page_type = "add_vehicle";
                
                $("#signUp_vehicle #vehiclename").val("");
                $("#vin").val("");
            }
            else{
                //signUp Vehicle
                $("#signUp_vehicle .signup-savedvehicle").hide();
                $("#signUp_vehicle .addvehicle").hide();
                $("#signUp_vehicle .nextbutton").show();
                $("#signUp_vehicle .am-clickable.bottombutton").html(i18n.SIGNUP_VEHICLE_NEXT);
                $("#signUp_vehicle .am-header p").html(i18n.SIGNUP_VEHICLE_SIGN);
                page_type = "signUp_vehicle";

                var data = amGloble.generateTrackData(
                    "owner app:register:vehicle info",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackPage("owner app:register:vehicle info",data);
            }
            
            alreadyAddVechicle = false;

            $("#signUp_vehicle .error-message").text("");
            $("#signUp_vehicle .bottombutton").addClass("am-clickable");
                                                 
            amGloble.api.checkBackendState();
        },

        //after page show
        afterShow : function() {
        },
        //before page hide
        beforeHide : function() {
        },
        //after page hide
        afterHide : function() {
        },

        hasError :  function()
        {  
            var message = this.getValidationError();
            var messageDisplay = $("#signUp_vehicle .error-message");

            if (message)
            {
                messageDisplay.show();
                messageDisplay.text(message);
                return true;
            }
            else
            {
                messageDisplay.hide();
                messageDisplay.text("");
                return false;
            }
        },

        getValidationError: function () {
            var test= amGloble.setting.registration.fields;

            if(page_type == "signUp_vehicle" ){
                var obj = window.localStorage.signUpObj;            
                if (obj.trim()) {
                    try
                    {
                        obj = JSON.parse(obj);
                        if (typeof obj == "string") obj = new Object();
                    }
                    catch (e)
                    {
                        obj = new Object();
                    }
                }
                else
                    obj = new Object();

                var message = "";

                obj.vehicle_nickname_1 = $("#signUp_vehicle #vehiclename").val().trim();
                obj.vehicle_vin_1 = $("#vin").val().trim();

                if (!obj.vehicle_nickname_1) {
                    message = i18n.SIGNUP_VEHICLE_ERRORVEHICLENAME;
                    return message;
                }
                if (!obj.vehicle_vin_1) {
                    message = i18n.SIGNUP_VEHICLE_ERRORVIN;
                    return message;
                }else{
                    var reg =new RegExp(test.vehicle_vin_1.reg);
                    if (!reg.test(obj.vehicle_vin_1)) {
                        message = test.vehicle_vin_1.regmsg;
                        return message;
                    }
                }

                window.localStorage.signUpObj = JSON.stringify(obj);
            }
            else{
                if(alreadyAddVechicle)
                    return;

                var obj = new Object();

                var message = "";

                obj.vehicle_nickname = $("#signUp_vehicle #vehiclename").val().trim();
                obj.vehicle_vin = $("#vin").val().trim();

                if (!obj.vehicle_nickname) {
                    message = i18n.SIGNUP_VEHICLE_ERRORVEHICLENAME;
                    return message;
                }
                if (!obj.vehicle_vin) {
                    message = i18n.SIGNUP_VEHICLE_ERRORVIN;
                    return message;
                }else{
                    var reg =new RegExp(test.vehicle_vin_1.reg);
                    if (!reg.test(obj.vehicle_vin)) {
                        message = test.vehicle_vin_1.regmsg;
                        return message;
                    }
                }

            }
        },
        getError: function () {
           // amGloble.loading.show(i18n.SIGNUP_VEHICLE_VALID);
            $.ajax({
                url : amGloble.setting.lang.host + "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site="+ amGloble.setting.lang.site + "&type=vin&vehicle_vin_1="+$("#vin").val().trim(),
                type : "GET",
                dataType : "json",
                contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
                success : function(ret) {
                   // amGloble.loading.hide();
                    if (ret.valid == true) {
                        $.am.changePage(amGloble.page.signUp_contact, "slideleft");
                    }else{
                        //amGloble.msg(ret.message);
                        
                        $("#signUp_vehicle .error-message").text(ret.message);
                        $("#signUp_vehicle .error-message").show();
                    };
                    
                },
                error : function(ret) {
                  //  amGloble.loading.hide();
                    //amGloble.msg(ret.message);
                    $.am.changePage(amGloble.page.common_oops, "slideleft",
                    {
                        title: "",
                        message: "",
                        detail: ret
                    });
                }
            });

        },

    });
})(); 