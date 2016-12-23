/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {

    amGloble.page.signUp_contact = new $.am.Page({
        id: "signUp_contact",

        init: function () {
            var page = this;
            $("#signUp_contact #title").parent().click(
                function () {
                    var list =amGloble.configlist.title_list;
                    amGloble.popupMenu(i18n.SIGNUP_CONTACT_USERTITLE, list, "name", function (ret) {
                        $("#signUp_contact #title").val(ret.name); 
                    });
                });

            $("#signUp_contact #state").parent().click(
                function () {
                    var list =amGloble.configlist.state_list;
                    amGloble.popupMenu(i18n.SIGNUP_CONTACT_STATE, list, "name", function (ret) {
                        $("#signUp_contact #state").val(ret.name);  
                    });
                });

            // finish
            $("#signUp_contact .selectblock1 .am-clickable").parent().click(
               function () {
                   var button = $(".am-clickable", this);
                   //button.removeClass("icon-uncheck");
                   //button.addClass("icon-checked");
                   if (button.hasClass("icon-checked")) {

                     $("#signUp_contact .moreselects").show();
                     $("#signUp_contact .selectblock2").show();
                     $("#signUp_contact .choosecontent").show();
                     $("#signUp_contact .selectblock1 .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .selectblock1 .am-clickable").addClass("icon-uncheck");
                     $("#signUp_contact .moreselects .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .moreselects .am-clickable").addClass("icon-uncheck");
                     $("#signUp_contact .selectblock2 .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .selectblock2 .am-clickable").addClass("icon-uncheck");
                     page.refresh();
                   }
                   else{
                      $("#signUp_contact .moreselects").hide();
                      $("#signUp_contact .selectblock2").hide();
                      $("#signUp_contact .choosecontent").hide();
                      $("#signUp_contact .selectblock1 .am-clickable").removeClass("icon-uncheck");
                     $("#signUp_contact .selectblock1 .am-clickable").addClass("icon-checked");
                   }
               }
               );

            $("#signUp_contact .selectblock2 .am-clickable").parent().click(
               function () {
                   var button = $(".am-clickable", this);
                   //button.removeClass("icon-uncheck");
                   //button.addClass("icon-checked");
                   //$("#signUp_contact .moreselects").hide();
                if (button.hasClass("icon-uncheck")) {
                     $("#signUp_contact .selectblock2 .am-clickable").removeClass("icon-uncheck");
                     $("#signUp_contact .selectblock2 .am-clickable").addClass("icon-checked");
                     $("#signUp_contact .moreselects .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .moreselects .am-clickable").addClass("icon-uncheck");
                     $("#signUp_contact .selectblock1 .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .selectblock1 .am-clickable").addClass("icon-uncheck");
                     page.refresh();
                   }
                   else{
                     $("#signUp_contact .selectblock2 .am-clickable").removeClass("icon-checked");
                     $("#signUp_contact .selectblock2 .am-clickable").addClass("icon-uncheck");

                   }
               });

            $("#signUp_contact .moreselects .am-clickable").parent().click(
               function () {
                   var button = $(".am-clickable", this);

                   if (button.hasClass("icon-uncheck")) {
                       button.removeClass("icon-uncheck");
                       button.addClass("icon-checked");
                      $("#signUp_contact .selectblock2 .am-clickable").removeClass("icon-checked");
                      $("#signUp_contact .selectblock2 .am-clickable").addClass("icon-uncheck");
                    }
                   else {
                       button.removeClass("icon-checked");
                       button.addClass("icon-uncheck");
                   }
               });
            // finish
            
        			$("#signUp_contact .am-clickable.bottombuttonblue").click(function() {
        				// call full register
        				var obj = window.localStorage.signUpObj;
        				if (obj.trim()) {
        					try {
        						obj = JSON.parse(obj);
        						if ( typeof obj == "string")
        							obj = new Object();
        					} catch (e) {
        						obj = new Object();
        					}
        				} else
        					obj = new Object();

//        				ADB.trackAction("Finish full registration", {
//        					"Market" : amGloble.setting.lang.site,
//        					"Language" : amGloble.setting.lang.code,
//        					"Page" : "Sign Up",
//        					"Username" : obj.username,
//        					"Bussiness Data" : {
//        						"Username" : obj.username,
//        						"Registration Type" : "Full"
//        					}
//        				});

        				if (!page.hasError()) {
                  //page.getError();
                  var data = amGloble.generateTrackData(
                          "owner app:register:contact details",
                          "",
                          "",
                          "",
                          "register:expand",
                          false,
                          false,
                          false,
                          false,
                          false);
                  amGloble.trackAction("owner app:register:contact details:expand",data);

                  $.am.changePage(amGloble.page.signUp_finish, "slideleft");
        				}
        			}); 
              // next
                   
        			$("#signUp_contact .nextbutton").click(function() {
        				// fast register
        				// page.getValidationError();
        				var obj = window.localStorage.signUpObj;

        				if (obj.trim()) {
        					try {
        						obj = JSON.parse(obj);
        						if ( typeof obj == "string")
        							obj = new Object();
        					} catch (e) {
        						obj = new Object();
        					}
        				} else
        					obj = new Object();

//        				ADB.trackAction("Skip full registration ", {
//        					"Market" : amGloble.setting.lang.site,
//        					"Language" : amGloble.setting.lang.code,
//        					"Page" : "Sign Up",
//        					"Username" : obj.username,
//        					"Bussiness Data" : {
//        						"Username" : obj.username,
//        						"Registration Type" : "Fast"
//        					}
//        				});

                $.am.changePage(amGloble.page.signUp_finish, "slideleft");

        			});

        			// skip

        			$("#signUp_contact .am-clickable.bottombuttongray").click(function() {
        				// fast register
        				// page.getValidationError();
        				var obj = window.localStorage.signUpObj;

        				if (obj.trim()) {
        					try {
        						obj = JSON.parse(obj);
        						if ( typeof obj == "string")
        							obj = new Object();
        					} catch (e) {
        						obj = new Object();
        					}
        				} else
        					obj = new Object();

//        				ADB.trackAction("Skip full registration ", {
//        					"Market" : amGloble.setting.lang.site,
//        					"Language" : amGloble.setting.lang.code,
//        					"Page" : "Sign Up",
//        					"Username" : obj.username,
//        					"Bussiness Data" : {
//        						"Username" : obj.username,
//        						"Registration Type" : "Fast"
//        					}
//        				});

                $.am.changePage(amGloble.page.signUp_finish, "slideleft");
        			});

            var message=null;
            var test=null;
            // if (amGloble.setting) {
            //   test=amGloble.setting.registration.fields;
            // };
            
//            $("#signUp_contact #nickname").blur(
//              function () {
//                test = amGloble.setting.registration.fields;
//                    var nickname=$("#signUp_contact #nickname").val().trim();
//                      if (nickname) {
//                          var reg =new RegExp(test.forum_nickname.reg);
//                    if (!reg.test(nickname)) {
//                        message = test.forum_nickname.regmsg;
//                        $("#signUp_contact .error-message.nickname").html(message);
//                        
//                    }else{
//                      $("#signUp_contact .error-message.nickname").text("");
//                      page.getError();
//                    }
//                      };  
//                  });  

            $("#signUp_contact #postcode").blur(
              function () {
                test = amGloble.setting.registration.fields;
                    var postcode=$("#signUp_contact #postcode").val().trim();
                      if (postcode) {
                          var reg =new RegExp(test.postal_code.reg);
                    if (!reg.test(postcode)) {
                        message = test.postal_code.regmsg;
                        $("#signUp_contact .error-message.postcode").html(message);
                        
                    }else{
                      $("#signUp_contact .error-message.postcode").text("");
                    }
                      };  
                  });

            $("#signUp_contact #mobile").blur(
              function () {
                test = amGloble.setting.registration.fields;
                    var min=$("#signUp_contact #mobile").val().trim();
                      if (min) {
                          var reg =new RegExp(test.min.reg);
                    if (!reg.test(min)) {
                        message = test.min.regmsg;
                        $("#signUp_contact .error-message.number").html(message);
                        
                    }else{
                      $("#signUp_contact .error-message.number").text("");
                    }
                      };  
                  });

            $("#signUp_contact #home").blur(
              function () {
                test = amGloble.setting.registration.fields;
                    var home=$("#signUp_contact #home").val().trim();
                      if (home) {
                          var reg =new RegExp(test.home_phone.reg);
                    if (!reg.test(home)) {
                        message = test.home_phone.regmsg;
                        $("#signUp_contact .error-message.number").html(message);
                        
                    }else{
                      $("#signUp_contact .error-message.number").text("");
                    }
                      };  
                  });

            $("#signUp_contact #work").blur(
              function () {
                test = amGloble.setting.registration.fields;
                    var work=$("#signUp_contact #work").val().trim();
                      if (work) {
                          var reg =new RegExp(test.work_phone.reg);
                    if (!reg.test(work)) {
                        message = test.work_phone.regmsg;
                        $("#signUp_contact .error-message.number").html(message);
                        
                    }else{
                      $("#signUp_contact .error-message.number").text("");
                    }
                      };  
                  });

        },
        //before page show
        beforeShow: function (paras) {
          var isVietnam = (amGloble.setting.market.code == "VN");
          if(isVietnam){
              this.$.addClass("Vietnam");
          }
          
          //placeholder
          $("#signUp_contact #title").attr("placeholder",i18n.SIGNUP_CONTACT_USERTITLE);
          //$("#signUp_contact #nickname").attr("placeholder",i18n.SIGNUP_CONTACT_NICKNAME);
          $("#signUp_contact #state").attr("placeholder",i18n.SIGNUP_CONTACT_STATE);
          $("#signUp_contact #postcode").attr("placeholder",i18n.SIGNUP_CONTACT_POSTCODE);
          $("#signUp_contact #mobile").attr("placeholder",i18n.SIGNUP_CONTACT_MOBILE);
          $("#signUp_contact #home").attr("placeholder",i18n.SIGNUP_CONTACT_HOME);
          $("#signUp_contact #work").attr("placeholder",i18n.SIGNUP_CONTACT_WORK);

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
                    },
                    error : function(ret) {
                        console.log(ret);
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
           };

          if (amGloble.setting.market.name!="Australia") {
            $("#signUp_contact #home").parent().hide();
            $("#signUp_contact #work").parent().hide();
          }else{
            $("#signUp_contact #home").parent().show();
            $("#signUp_contact #work").parent().show();
          };
            
            $("#signUp_contact .moreselects").hide();
            $("#signUp_contact .selectblock2").hide();
            $("#signUp_contact .choosecontent").hide();

          if(amGloble.setting.market.name=="Australia"||amGloble.setting.market.name=="Korea"||amGloble.setting.market.name=="China"||amGloble.setting.market.name=="Japan"){
            $("#signUp_contact .selectblock1").hide();
          }else{
            $("#signUp_contact .selectblock1").show();
          }

          var data = amGloble.generateTrackData(
              "owner app:register:contact details",
              "",
              "",
              "",
              "",
              false,
              false,
              false,
              false,
              false);
          amGloble.trackPage("owner app:register:contact details",data);

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

        hasError: function () {
            var message = this.getValidationError();
            var test= amGloble.setting.registration.fields;

            if (message)
            {
              if (message==i18n.SIGNUP_CONTACT_ERRORTITLE) {
                $("#signUp_contact .error-message").text("");
                $("#signUp_contact .error-message.title").text(message);
                return true;
//              }else if (message==i18n.SIGNUP_CONTACT_ERRORNICK||message==test.forum_nickname.regmsg) {
//                $("#signUp_contact .error-message").text("");
//                $("#signUp_contact .error-message.nickname").text(message);
//                return true;
              }else if (message==i18n.SIGNUP_CONTACT_ERRORSTATE) {
                $("#signUp_contact .error-message").text("");
                $("#signUp_contact .error-message.state").text(message);
                return true;
              }else if (message==i18n.SIGNUP_CONTACT_ERRORPOST||message==test.postal_code.regmsg) {
                $("#signUp_contact .error-message").text("");
                $("#signUp_contact .error-message.postcode").text(message);
                return true;
              }else if (message==i18n.SIGNUP_CONTACT_ERRORMOBILE||message==i18n.SIGNUP_CONTACT_ERRORNUMBER||message==test.min.regmsg||message==test.home_phone.regmsg||message==test.work_phone.regmsg) {
                $("#signUp_contact .error-message").text("");
                $("#signUp_contact .error-message.number").text(message);
                return true;
              }else if (message==i18n.SIGNUP_CONTACT_ERRORLEAST) {
                $("#signUp_contact .error-message").text("");
                $("#signUp_contact .error-message.selects").text(message);
                return true;
              }
            }
            else
            {
                $("#signUp_contact .error-message").text("");
                return false;
            }
        },

        getValidationError: function () {
          var test= amGloble.setting.registration.fields;
          var obj = window.localStorage.signUpObj;
            
            if (obj.trim()) {
                try {
                    obj = JSON.parse(obj);
                    if (typeof obj == "string") obj = new Object();
                }
                catch (e) {
                    obj = new Object();
                }
            }
            else
                obj = new Object();

              var titlecode = null;
              var title = $("#signUp_contact #title").val();
              for (var i = 0; i < amGloble.configlist.title_list.length; i++) {
                                if (title==amGloble.configlist.title_list[i].name) {
                                    titlecode=amGloble.configlist.title_list[i].value;
                                };
                            };

              var statecode = null;
              var state = $("#signUp_contact #state").val();
              for (var i = 0; i < amGloble.configlist.state_list.length; i++) {
                                if (state==amGloble.configlist.state_list[i].name) {
                                    statecode=amGloble.configlist.state_list[i].value;
                                };
                            };

            obj.title = titlecode;
             var mydate = new Date();
            //obj.forum_nickname = $("#signUp_contact #nickname").val().trim();
             obj.forum_nickname = obj.username + $.datepicker.formatDate('yymmdd', mydate) +
                                                 mydate.getHours().toString() +
                                                 mydate.getMinutes().toString() +
                                                 mydate.getSeconds().toString();
            obj.state = statecode;
            obj.postal_code = $("#signUp_contact #postcode").val().trim();
            obj.min = $("#signUp_contact #mobile").val().trim();
            obj.work_phone = $("#signUp_contact #work").val().trim();
            obj.home_phone = $("#signUp_contact #home").val().trim(); 

            if(amGloble.setting.market.code=="VN") {
              obj.postal_code = "1234";
            }

                                                 
          if(amGloble.setting.market.name=="Australia"||amGloble.setting.market.name=="Korea"||amGloble.setting.market.name=="China"||amGloble.setting.market.name=="Japan"){
              //
          }else{
            obj.offers_via_email = $("#signUp_contact .selectblock1 .am-clickable").hasClass("icon-checked");
            obj.news_and_announcements = $("#signUp_contact .moreselects .am-clickable").eq(0).hasClass("icon-checked");
            obj.special_offers_and_discounts = $("#signUp_contact .moreselects .am-clickable").eq(1).hasClass("icon-checked");
            obj.information_for_owners = $("#signUp_contact .moreselects .am-clickable").eq(2).hasClass("icon-checked");
            obj.event_activities_invitations = $("#signUp_contact .moreselects .am-clickable").eq(3).hasClass("icon-checked");
          }

           // obj.preferred_language = amGloble.setting.lang.code;

            window.localStorage.signUpObj = JSON.stringify(obj);

            if(amGloble.setting.market.name=="Australia"||amGloble.setting.market.name=="Korea"||amGloble.setting.market.name=="China"||amGloble.setting.market.name=="Japan"){
                    //  
            }else{
                if (obj.offers_via_email==false&&obj.news_and_announcements==false&&obj.special_offers_and_discounts==false&&obj.information_for_owners==false&&obj.event_activities_invitations==false&&$("#signUp_contact .selectblock2 .am-clickable").hasClass("icon-checked")==false) {
                  return i18n.SIGNUP_CONTACT_ERRORLEAST;
                }
            }

            

            if (!obj.title) {
                return i18n.SIGNUP_CONTACT_ERRORTITLE;
            }
//            if (!obj.forum_nickname) {
//                return i18n.SIGNUP_CONTACT_ERRORNICK;
//            }else{
//                var reg =new RegExp(test.forum_nickname.reg);
//                if (!reg.test(obj.forum_nickname)) {
//                    message = test.forum_nickname.regmsg;
//                    return message;
//                }
//            } 
            if (!obj.state) {
                return i18n.SIGNUP_CONTACT_ERRORSTATE;
            }
            if(amGloble.setting.market.code!="VN") {
              if (!obj.postal_code) {
                  return i18n.SIGNUP_CONTACT_ERRORPOST;
              }else{
                  var reg =new RegExp(test.postal_code.reg);
                  if (!reg.test(obj.postal_code)) {
                      message = test.postal_code.regmsg;
                      return message;
                  }
              }
            }
            
            if (amGloble.setting.market.name!="Australia") {
              if (!obj.min) {
                  return i18n.SIGNUP_CONTACT_ERRORMOBILE;
              }else{
                  var reg =new RegExp(test.min.reg);
                  if (!reg.test(obj.min)) {
                      message = test.min.regmsg;
                      return message;
                  }
              }

            }else{
              if (!obj.min && !obj.work_phone && !obj.home_phone) {
                  return i18n.SIGNUP_CONTACT_ERRORNUMBER;
              }else{
                if (obj.min) {
                  var reg =new RegExp(test.min.reg);
                  if (!reg.test(obj.min)) {
                      message = test.min.regmsg;
                      return message;
                  }
                };
                if (obj.home_phone) {
                  var reg =new RegExp(test.home_phone.reg);
                  if (!reg.test(obj.home_phone)) {
                      message = test.home_phone.regmsg;
                      return message;
                  }
                };
                if (obj.work_phone) {
                  var reg =new RegExp(test.work_phone.reg);
                  if (!reg.test(obj.work_phone)) {
                      message = test.work_phone.regmsg;
                      return message;
                  }
                };
              }

            };
        },

        submit: function (url) {
            //
        },
        getError: function () {
            $.ajax({
                url : amGloble.setting.lang.host + "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site="+ amGloble.setting.lang.site + "&type=nickname&forum_nickname="+$("#signUp_contact #nickname").val().trim(),
                type : "GET",
                dataType : "json",
                contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
                success : function(ret) {
                    if (ret.valid == true) {
                      //$.am.changePage(amGloble.page.signUp_finish, "slideleft");
                    }else{
                      $("#signUp_contact .error-message").text("");
                      $("#signUp_contact .error-message.nickname").text(ret.message);
                    };     
                },
                error : function(ret) {
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
