/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.profile_myVehicle = new $.am.Page({
        id: "profile_myVehicle",
        loaded: false,
        paras_saved: null,

        init: function () {
            this.$.find(".tabs > div").eq(2).vclick(function () {
                $.am.changePage(amGloble.page.profile_myAccount, "");
            });

            $("#profile_myVehicle .icon-add").parent().vclick(function () {
                var data = amGloble.generateTrackData(
                    "owner app:profile:vehicle info",
                    "",
                    "",
                    "",
                    "profile:add vehicle",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:profile:vehicle info:add",data);

                $.am.changePage(amGloble.page.signUp_vehicle, "slideleft", "addVehicle");
            });  
        },
        //before page show
        beforeShow: function (paras) {
            paras_saved=paras;
            this.renderVehicleList();
             $("#profile_myVehicle .am-header p").text(amGloble.userinfo.profile.firstname.toUpperCase() +" "+ amGloble.userinfo.profile.lastname.toUpperCase() + " "+ i18n.PROFILE_MYVEHICLE_TITLE);

            var data = amGloble.generateTrackData(
                "owner app:profile:vehicle info",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:profile:vehicle info",data);
        },
        renderVehicleList: function(){
            var page = this;
            if (amGloble.userinfo.sessionid) {
                var data =
                  {
                      username: amGloble.userinfo.username,
                      sessionid: amGloble.userinfo.sessionid
                  };

                var page = this;

                //if (!page.loaded)
                 {
                    amGloble.api.getVehicle(
                        function (ret) {
                            if (ret.length=="1") {
                                $(".am-clickable.roundbutton.icon-delete").hide();
                                
                            }else{
                                $(".am-clickable.roundbutton.icon-delete").show();

                            }

                            $("#profile_myVehicle .vehicel_info.nontemplate").remove();
                            $(ret).each(
                                function () {
                                    var template = $("#profile_myVehicle .vehicel_info.template:eq(0)");
                                    var newCopy = template.clone();
                                    newCopy.removeClass("template");
                                    newCopy.addClass("nontemplate");
     
                                    if (typeof paras_saved != "undefined" && this.vin == paras_saved.key) {
                                       // $(".vehiclename", newCopy).val(paras_saved.value);
                                       // this.vehiclename = paras_saved.value;

                                        var d_vehicles = amGloble.userinfo.profile.user_vehicles.slice(0);

                                        for (var i = 0; i < d_vehicles.length; i++) {

                                            if (d_vehicles[i].vin==paras_saved.key) {
                                                d_vehicles[i].vehicle_nickname=paras_saved.value;
                                            };

                                        };

                                        var obj =
                                        {
                                            username: amGloble.userinfo.username,
                                            user_vehicles: d_vehicles 
                                        };
                                        $(".vehiclename", newCopy).val(this.vehiclename);
                                        amGloble.loading.show();
                                        amGloble.api.updateProfile(obj,
                                            function(ret) {
                                                amGloble.loading.hide();

                                                if (ret.status.code=="success") {
                                                    amGloble.msg(i18n.COMMON_SUCC);
                                                    $(".vehiclename", newCopy).val(i18n.PROFILE_MYVEHICLE_MY+" "+paras_saved.value);
                                                    amGloble.userinfo.profile.user_vehicles=ret.user.user_vehicles;
                                                   
                                                }else{
                                                    $(".vehiclename", newCopy).val(i18n.PROFILE_MYVEHICLE_MY+" "+paras_saved.value);
                                                    setTimeout(function(){
                                                        $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                        {
                                                            title: "",
                                                            message: ret.status.message,
                                                            detail: ret
                                                        });
                                                    },1000);
                                                }
                                            }, function(ret) {
                                                amGloble.loading.hide();
                                                $(".vehiclename", newCopy).val(i18n.PROFILE_MYVEHICLE_MY+" "+paras_saved.value);
                                                setTimeout(function(){
                                                    $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                    {
                                                        title: "",
                                                        message: ret.status.message,
                                                        detail: ret
                                                    });
                                                },1000);
                                            }
                                        );
                                    }
                                    else {
                                        $(".vehiclename", newCopy).val(this.vehiclename);
                                    }

                                    $(".vehiclename", newCopy).attr("vin", this.vin);
                                    $(".vin", newCopy).val(this.vin);

                                    var baseImgUrl = "carphoto/" + amGloble.setting.market.code + "/";

                                    if (this.model) {
                                        var $img = $(".profile_image img", newCopy).hide().attr("src", baseImgUrl + this.model + ".jpg");
                                        $img.bind("load", function() {
                                            $(this).show();
                                        }).bind("error", function() {
                                            $(this).attr("src", baseImgUrl + "default.jpg");
                                        });
                                    } else {
                                        $(".profile_image img", newCopy).attr("src", baseImgUrl + "default.jpg");
                                    };

                                        
                                //servis2
                                      if(amGloble.setting.market.servis2code && amGloble.setting.market.servis2code.length>0){
                                          for (var sc=0 ; sc<amGloble.setting.market.servis2code.length ; sc++){
                                              var servis2code = amGloble.setting.market.servis2code[sc];
                                              var host = amGloble.setting.lang.host;//"https://wwwqamg4.dragonfly.ford.com";//amGloble.setting.lang.host
                                              var vin = this.vin;//"LVSHCAAEXCF853424";
                                              if(servis2code){
                                                  $.ajax({
                                                      url : host +"/servlet/rest/servis2/warranty/"+ servis2code +"/" + vin, //接口url
                                                      type : "GET",
                                                      dataType : "json",
                                                      contentType : "application/json",
                                                      timeout : amGloble.setting.market.timeout || 30000,
                                                      success : function(ret) {
                                                          try{
                                                              var info = ret[0];
                                                              var warranties = ret[0].warranties;
                                                              var items = "";
                                                              var today = new Date();
                                                              var expirySoonDate = new Date();
                                                              expirySoonDate.setDate(today.getDate()+90);
                                                              for (var idx in warranties) {
                                                                  var warranty = warranties[idx];
                                                                  console.log(warranty);
                                                                  var expiryDate = new Date(warranty.expiryDate.replace(" ","").replace(/-/g,"/"));
                                                                  if(!expiryDate || expiryDate=="Invalid Date" || expiryDate<today){
                                                                      continue;
                                                                  }
                                                                  var expirySoon = "";
                                                                  if (expiryDate<expirySoonDate) {
                                                                      expirySoon = "<span class=\"warning\" i18n=\"PROFILE_MYVEHICLE_EXPIRE\">Expire soon</span>";
                                                                  };
                                                                  var warrantyName = i18n.WARRANTY_FACTORY_PLAN?i18n.WARRANTY_FACTORY_PLAN:"Factory plan";
                                                                  if(warranty.type == "ESB"){
                                                                      warrantyName = i18n.WARRANTY_EXTENDED_SERVICE_PLAN?i18n.WARRANTY_EXTENDED_SERVICE_PLAN:"Extended Service Plan";
                                                                  }
                                                                  var warrantyExpireDate = i18n.WARRANTY_EXP_DATE?i18n.WARRANTY_EXP_DATE:"Warranty Exp. Date";
                                                                  warrantyExpireDate += (" - " + warranty.expiryDate);
                                                                  var warrantyEndMileage = i18n.WARRANTY_END_MILEAGE?i18n.WARRANTY_END_MILEAGE:"Warranty End Odometer";
                                                                  warrantyEndMileage += (" - " + warranty.endMileage + " ");
                                                                  warrantyEndMileage += i18n.WARRANTY_END_MILEAGE_UNIT?i18n.WARRANTY_END_MILEAGE_UNIT:"km";

                                                                  var item = "<li>\
                                                                      <div class=\"inputLine\">\
                                                                          <div class=\"inputLineLeftView\" id=\"warrantyNameField\"></div>\
                                                                          <input class=\"am-activable inputLineMiddle\" type=\"text\" readonly maxlength=\"20\" value=\"" + warrantyName + "\">\
                                                                      </div>\
                                                                      <div class=\"inputLine\">\
                                                                          <div class=\"inputLineLeftView\" id=\"warrantyServiceField\"></div>\
                                                                          <input class=\"am-activable inputLineMiddle\" type=\"text\" readonly maxlength=\"20\" value=\"" + warrantyExpireDate + "\">" + expirySoon + "\
                                                                      </div>\
                                                                      <div class=\"inputLine\">\
                                                                          <div class=\"inputLineLeftView\" id=\"warrantyExpireField\"></div>\
                                                                          <input class=\"am-activable inputLineMiddle\" type=\"text\" readonly maxlength=\"20\" value=\"" + warrantyEndMileage + "\">\
                                                                      </div>\
                                                                  </li>";
                                                                  items += item;     
                                                              }
                                                              if (items != "") {
                                                                  var $items = $(items);
                                                                  $("ul", newCopy).empty().html($items);
                                                                  page.refresh();
                                                              };
                                                          }catch(e){
                                                              console.error(ret);
                                                          }
                                                      },
                                                      error : function(ret) {
                                                          console.error(ret);
                                                      }
                                                  });
                                              }
                                          }
                                      }
                                        
                              //servis2 end
                              

                                    template.after(newCopy);

                                    $(".detail-list .inputLine:eq(0)", newCopy).vclick(
                                        function () {
                                            var input = $("input", $(this));
                                            var paras =
                                                {
                                                    key: input.attr("vin"),
                                                    displayname: i18n.PROFILE_MYVEHICLE_VEHICLENAME,
                                                    value: input.val()
                                                };
                                            $.am.changePage(amGloble.page.profile_updateInfo, "slideleft", paras);
                                        }
                                    );

                                    $(".detail-list .icon-delete", newCopy).vclick(
                                        function () {
                                            var input = $("input", $(this).parent().parent());
                                            var vin = input.attr("vin");
                                            var indexToRemove = -1;
                                            emap.confirm({
                                                caption : "",
                                                description : i18n.PROFILE_MYVEHICLE_DELETE,
                                                okCaption : i18n.PROFILE_MYVEHICLE_YES,
                                                cancelCaption : i18n.PROFILE_MYVEHICLE_CANCEL
                                            }, function(ret) {
                                                var data = amGloble.generateTrackData(
                                                    "owner app:profile:vehicle info",
                                                    "",
                                                    "",
                                                    "",
                                                    "profile:delete vehicle",
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false);
                                                amGloble.trackAction("owner app:profile:vehicle info:delete",data);
                                                
                                               var de_vehicles=[];
                                               for (var i = 0; i < amGloble.userinfo.profile.user_vehicles.length; i++) {
                                                var a= $.extend(true, {}, amGloble.userinfo.profile.user_vehicles[i]);
                                                de_vehicles.push(a);
                                               }
                                               //de_vehicles = amGloble.userinfo.profile.user_vehicles.slice(0);
                                              // de_vehicles = $.extend(true, {}, amGloble.userinfo.profile.user_vehicles);
                                                $(de_vehicles).each(
                                                    function(i){
                                                        if(this.vehicle_vin == vin){
                                                            indexToRemove = i;
                                                        }
                                                    }
                                                );
                                                if(indexToRemove!=-1){
                                                    de_vehicles.splice(indexToRemove , 1);
                                                }
                                               // amGloble.userinfo.profile.user_vehicles.isLoaded = null;
                                                for (var i = 0; i < de_vehicles.length; i++) {
                                                    delete de_vehicles[i].vehiclename;
                                                    delete de_vehicles[i].vin;
                                                    delete de_vehicles[i].imageurl;
                                                    delete de_vehicles[i].model;
                                                    delete de_vehicles[i].modelyear;
                                                    delete de_vehicles[i].loaded;

                                                };
                                                var obj =
                                                    {
                                                        username: amGloble.userinfo.username,
                                                        user_vehicles: de_vehicles
                                                        
                                                    };

                                                amGloble.loading.show();
                                                amGloble.api.updateProfile(obj,
                                                    function(ret) {
                                                        amGloble.loading.hide();
                                                        if (ret.status.code=="success") {
                                                            amGloble.userinfo.profile = ret.user;
                                                            amGloble.userinfo.profile.user_vehicles.isLoaded = null;
                                                            page.renderVehicleList();
                                                            page.refresh();
                                                        }else{
                                                           setTimeout(function(){
                                                            $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                                {
                                                                    title: "",
                                                                    message: ret.status.message,
                                                                    detail: ret
                                                                });
                                                            },1000);
                                                        }
                                                    }, function(ret) {
                                                        amGloble.loading.hide();
                                                        setTimeout(function(){
                                                            $.am.changePage(amGloble.page.common_oops, "slideleft",
                                                            {
                                                                title: "",
                                                                message: ret.status.message,
                                                                detail: ret
                                                            });
                                                        },1000);

                                                    }
                                                ); 

                                            }, function(ret) { 
                                            //fail 
                                            }); 
                                           // page.renderVehicleList();
                                        }
                                    );
                                    if (typeof paras_saved != "undefined" && paras_saved.key=="fromAccount") {
                                       return;
                                    }else{
                                       page.refresh(); 
                                    }
                                    
                                    page.scrollview.scrollTo("top");
                                }
                            );
                    },function(ret) {
                    console.log(ret);
                    setTimeout(function(){
                        $.am.changePage(amGloble.page.common_oops, "slideleft",
                        {
                            title: "",
                            message: "",
                            detail: ret
                        });
                    },1000);
                });

                    page.loaded = true;
                }
                //else 
                // {
                //     if (typeof paras != "undefined" && paras.key)
                //         $(".vehiclename[vin='" + paras.key + "']").val(paras.value);
                // }
            }
        },

        //after page show
        afterShow: function () {
            if (!amGloble.userinfo.sessionid) {
                $.am.changePage(amGloble.page.login_login, "");
                return;
            }

        },
        //before page hide
        beforeHide: function () {
            var vin=[];
            for (var i = 0; i < amGloble.userinfo.profile.user_vehicles.length; i++) {
                vin.push(amGloble.userinfo.profile.user_vehicles[i].vehicle_vin)
            };
            var vinString=vin.join();
            amGloble.tag.setItem("vin",vinString);
        },
        //after page hide
        afterHide: function () {
        }
    });

})();
