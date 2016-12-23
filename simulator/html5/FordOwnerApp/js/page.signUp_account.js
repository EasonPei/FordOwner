/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {
	amGloble.page.signUp_account = new $.am.Page({
	    id: "signUp_account",
	    init: function () {
	        

		    $("#signUp_account .useragreement :not(href)").vclick(
                function () {
                    var icon = $("#signUp_account .useragreement span.am-clickable");
                    var checked = icon.hasClass("icon-checked");

                    if (checked) {
                        icon.removeClass("icon-checked");
                        icon.addClass("icon-uncheck");
                    }
                    else {
                        icon.addClass("icon-checked");
                        icon.removeClass("icon-uncheck");
                    }
                }
                );

		    var page = this;
		    $("#signUp_account .am-clickable.bottombutton").vclick(
                function () {
                    if (!page.hasError()) {
                        //$.am.changePage(amGloble.page.signUp_vehicle, "slideleft");
                        page.takeError();

                    }
                }
                );

		    $("#signUp_account .nextbutton").vclick(
                function () {
                	
                    if (!page.hasError()) {
                       // $.am.changePage(amGloble.page.signUp_vehicle, "slideleft");
                       page.takeError();
                    }
                });

		    var test=null;
            // if (amGloble.setting) {
            //     test = amGloble.setting.registration.fields;
            // };

		    $("#signUp_account #username").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var username=$("#signUp_account #username").val().trim();
	                if (username) {
	                    var reg =new RegExp(test.username.reg);
				        if (!reg.test(username)) {
				            message = test.username.regmsg;
				            $("#signUp_account .error-message.name").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.name").text("");
				        	page.getError();
				        }
	                };  
	            });

		    $("#signUp_account #password").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var password=$("#signUp_account #password").val().trim();
	                if (password) {
	                    var reg =new RegExp(test.password.reg);
				        if (!reg.test(password)) {
				            message = test.password.regmsg;
				            $("#signUp_account .error-message.Password").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.Password").text("");
				        }
	                };  
	            });

		    $("#signUp_account #passwordconfirm").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var passwordconfirm=$("#signUp_account #passwordconfirm").val().trim();
	                if (passwordconfirm) {
	                    
				        if (passwordconfirm != $("#signUp_account #password").val().trim()) {
				            message = amGloble.setting.registration.equal.password_confirmation.eqmsg;
				            $("#signUp_account .error-message.confrim").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.confrim").text("");
				        }
	                };  
	            });

		    $("#signUp_account #email").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var email=$("#signUp_account #email").val().trim();
	                if (email) {
	                    var reg =new RegExp(test.email.reg);
				        if (!reg.test(email)) {
				            message = test.email.regmsg;
				            $("#signUp_account .error-message.Email").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.Email").text("");
				        }
	                };  
	            });

		    $("#signUp_account #firstname").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var firstname=$("#signUp_account #firstname").val().trim();
	                if (firstname) {
	                    var reg =new RegExp(test.firstname.reg);
				        if (!reg.test(firstname)) {
				            message = test.firstname.regmsg;
				            $("#signUp_account .error-message.First").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.First").text("");
				        }
	                };  
	            });

		    $("#signUp_account #lastname").blur(
		    	function () {
		    		test = amGloble.setting.registration.fields;
	            	var lastname=$("#signUp_account #lastname").val().trim();
	                if (lastname) {
	                    var reg =new RegExp(test.lastname.reg);
				        if (!reg.test(lastname)) {
				            message = test.lastname.regmsg;
				            $("#signUp_account .error-message.Last").html(message);
				            
				        }else{
				        	$("#signUp_account .error-message.Last").text("");
				        }
	                };  
	            });

		},
		//before page show
		beforeShow : function(paras) {
			var self = this;
			// if (amGloble.setting.market.name=="India"){
			// 	$(".useragreement p a:eq(1)").text("SYNC™ Device End User License Agreement");
			// }
			//placeholder
			$("#signUp_account #username").attr("placeholder",i18n.SIGNUP_ACCOUNT_USERNAME);
			$("#signUp_account #password").attr("placeholder",i18n.SIGNUP_ACCOUNT_PASSWORD);
			$("#signUp_account #passwordconfirm").attr("placeholder",i18n.SIGNUP_ACCOUNT_CONFIRM);
			$("#signUp_account #email").attr("placeholder",i18n.SIGNUP_ACCOUNT_EMAIL);
			$("#signUp_account #firstname").attr("placeholder",i18n.SIGNUP_ACCOUNT_FIRSTNAME);
			$("#signUp_account #lastname").attr("placeholder",i18n.SIGNUP_ACCOUNT_LASTNAME);

			$(".useragreement p a:eq(0)").click(
                function () {
                   emap.inAppBrowser({
						url : amGloble.setting.lang.privacy
					});
	                var data = amGloble.generateTrackData(
		                "owner app:register",
		                "",
		                "",
		                "",
		                "register:privacy statement",
		                false,
		                false,
		                false,
		                false,
		                false);
	            	amGloble.trackAction("owner app:register:privacy statement",data);
                }
                );
	        $(".useragreement p a:eq(1)").click(
                function () {
                   emap.inAppBrowser({
						url : amGloble.setting.lang.disclaimer
					});
                   	var data = amGloble.generateTrackData(
		                "owner app:register",
		                "",
		                "",
		                "",
		                "register:legal",
		                false,
		                false,
		                false,
		                false,
		                false);
	            	amGloble.trackAction("owner app:register:legal",data);
                }
            );

	        amGloble.api.checkBackendState();


			this.$.find(".keboardCover").show();

			var data = amGloble.generateTrackData(
                "owner app:register",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:register",data);
		},

		//after page show
		afterShow: function () {
			var self = this;
			this.$.find(".keboardCover").fadeOut(1000,function(){
					self.$.find(".keboardCover").hide();
				});
		},
		//before page hide
		beforeHide : function() {
			$("#signUp_account .error-message").text("");
		},
		//after page hide
		afterHide : function() {
		},

		hasError :  function()
		{  
			
		    var message = this.getValidationError();
		    var test= amGloble.setting.registration.fields;

		    var patt1=new RegExp(i18n.SIGNUP_ACCOUNT_ERRORUSERNAME);
		    var patt1b=new RegExp(test.username.regmsg);
		    if (message)
		    {
		    	if (patt1.test(message)||patt1b.test(message)) {
		        $("#signUp_account .error-message.name").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.name").text("");
		        return false;
		    }

		    
		    var patt2=new RegExp(i18n.SIGNUP_ACCOUNT_ERRORPASSWORD);
		    var patt2b=new RegExp(test.password.regmsg);

		    if (message)
		    {
		    	if (patt2.test(message)||patt2b.test(message)) {
		    	//$("#signUp_account .error-message").text("");
		        $("#signUp_account .error-message.Password").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.Password").text("");
		        return false;
		    }

		    var patt3=new RegExp(amGloble.setting.registration.equal.password_confirmation.eqmsg);
		    if (message)
		    {
		    	if (patt3.test(message)) {
		    		//$("#signUp_account .error-message").text("");
		            $("#signUp_account .error-message.confrim").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.confrim").text("");
		        return false;
		    }

		    var patt4=new RegExp(i18n.SIGNUP_ACCOUNT_ERROREMAIL);
		    var patt4b=new RegExp(test.email.regmsg);

		    
		    if (message)
		    {
		    	if (patt4.test(message)||patt4b.test(message)) {
		    		//$("#signUp_account .error-message").text("");
		        $("#signUp_account .error-message.Email").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.Email").text("");
		        return false;
		    }

		    var patt5=new RegExp(i18n.SIGNUP_ACCOUNT_ERRORFIRST);
		    var patt5b=new RegExp(test.firstname.regmsg);

		    if (message)
		    {
		    	if (patt5.test(message)||patt5b.test(message)) {
		    		//$("#signUp_account .error-message").text("");
		        $("#signUp_account .error-message.First").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.First").text("");
		        return false;
		    }

		    var patt6=new RegExp(i18n.SIGNUP_ACCOUNT_ERRORLAST);
		    var patt6b=new RegExp(test.lastname.regmsg);
		    if (message)
		    {
		    	if (patt6.test(message)||patt6b.test(message)) {
		    		//$("#signUp_account .error-message").text("");
		        $("#signUp_account .error-message.Last").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.Last").text("");
		        return false;
		    }

		    var patt8=new RegExp(i18n.SIGNUP_ACCOUNT_ERRORAGREEMENT);
		    if (message)
		    {
		    	if (patt8.test(message)) {
		    		//$("#signUp_account .error-message").text("");
		        $("#signUp_account .error-message.aggreement").html(message);
		        return true;
		        };
		    }
		    else
		    {
		        $("#signUp_account .error-message.aggreement").text("");
		        return false;
		    }

		},
		getValidationError: function () {
		    var message = "";
		    var obj = 
		    {
		        username: $("#username").val().trim(),
		        password: $("#password").val().trim(),
		        email: $("#email").val().trim(),
                firstname: $("#firstname").val().trim(),
                lastname: $("#lastname").val().trim(),
                legal_agreement: $("#signUp_account .useragreement span.am-clickable").hasClass("icon-checked"),
                terms_and_conditions: $("#signUp_account .useragreement span.am-clickable").hasClass("icon-checked"),
               // captcha: $("#captcha").val().trim(),
                preferred_language : amGloble.setting.lang.code,
		    };

		    var test= amGloble.setting.registration.fields;

		    if (!obj.username) {
		        message = i18n.SIGNUP_ACCOUNT_ERRORUSERNAME;
		        return message;
		    }else{
		    	var reg =new RegExp(test.username.reg);
		        if (!reg.test(obj.username)) {
		            message = test.username.regmsg;
		            return message;
		        }
		    }

		    if (!obj.password) {
		        message = i18n.SIGNUP_ACCOUNT_ERRORPASSWORD;
		        return message;
		    }
		    else
		    {
		        var reg =new RegExp(test.password.reg);
		        if (!reg.test(obj.password)) {
		            message = test.password.regmsg;
		            return message;
		        }

		        if (obj.password != $("#passwordconfirm").val().trim())
		        {
		            //message = i18n.SIGNUP_ACCOUNT_ERRORPWNOTEQUAL;
		            message = amGloble.setting.registration.equal.password_confirmation.eqmsg;
		            return message;
		        }
		    }

		    if (!obj.email) {
		        message = i18n.SIGNUP_ACCOUNT_ERROREMAIL;
		        return message;
		    }
		    else
		    {
		        var emailReg = new RegExp(test.email.reg);
		        if(!emailReg.test(obj.email))
		        {
		            message = test.email.regmsg;
		            return message;
		        }
		    }

		    if (!obj.firstname) {
		        message = i18n.SIGNUP_ACCOUNT_ERRORFIRST;
		        return message;
		    }else{
		    	var reg =new RegExp(test.firstname.reg);
		        if (!reg.test(obj.firstname)) {
		            message = test.firstname.regmsg;
		            return message;
		        }
		    }

		    if (!obj.lastname) {
		        message = i18n.SIGNUP_ACCOUNT_ERRORLAST;
		        return message;
		    }else{
		    	var reg =new RegExp(test.lastname.reg);
		        if (!reg.test(obj.lastname)) {
		            message = test.lastname.regmsg;
		            return message;
		        }
		    }

		    if(!obj.legal_agreement)
		    {
		        message = i18n.SIGNUP_ACCOUNT_ERRORAGREEMENT;
		        return message;
		    }

		    window.localStorage.signUpObj = JSON.stringify(obj);
		},
		getError: function () {
			//amGloble.loading.show(i18n.SIGNUP_ACCOUNT_VALID);
			$.ajax({
				url : amGloble.setting.lang.host + "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site="+ amGloble.setting.lang.site + "&type=username&username="+$("#username").val().trim(),
				type : "GET",
				dataType : "json",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				success : function(ret) {
					//amGloble.loading.hide();
					if (ret.valid == true) {
						//$.am.changePage(amGloble.page.signUp_vehicle, "slideleft");
					}else{
						//amGloble.msg(ret.message);
						$("#signUp_account .error-message").text("");
						$("#signUp_account .error-message.name").text(ret.message);
					};
					
				},
				error : function(ret) {
					//amGloble.loading.hide();
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
		takeError: function () {
			$.ajax({
				url : amGloble.setting.lang.host + "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site="+ amGloble.setting.lang.site + "&type=username&username="+$("#username").val().trim(),
				type : "GET",
				dataType : "json",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				success : function(ret) {
					//amGloble.loading.hide();
					if (ret.valid == true) {
						$.am.changePage(amGloble.page.signUp_vehicle, "slideleft");
					}else{
						//amGloble.msg(ret.message);
						$("#signUp_account .error-message").text("");
						$("#signUp_account .error-message.name").text(ret.message);
					};
					
				},
				error : function(ret) {
					//amGloble.loading.hide();
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


