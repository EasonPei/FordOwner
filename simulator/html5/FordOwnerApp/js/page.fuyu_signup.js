/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.fuyu_signup = new $.am.Page({
		id : "fuyu_signup",

		init : function() {
			$(".fuyu_signup .useragreement p a").click(
                function () {
                    amGloble.popup.privacyPolicy.enableInnerClose = true;
                    amGloble.popup.privacyPolicy.show();
                }
                );
			$("#fuyu_signup .useragreement span.am-clickable").vclick(
                function () {
                    var icon = $(this);
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
		    $("#fuyu_signup .am-clickable.nextbutton").vclick(
                function () {
                    $("#fuyu_signup .error-message").text("");
                    page.hasError();

                }
                );

		},
		//before page show
		beforeShow : function(paras) {
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
            var password = $("#fuyu_signup #password").val().trim();
            var confirmPassword = $("#fuyu_signup #passwordconfirm").val().trim();


		    var obj = 
		    {
		        vname: $("#fuyu_signup #username").val().trim(),
		        vpassword: $.md5(password),
		        vconfirmPassword:  $.md5(confirmPassword),
		        vemail: $("#fuyu_signup #email").val().trim(),

		    };

            $.ajax({
                url : amGloble.setting.lang.fuyu+"/club_mobile/user/addUserForApp.htm",
                type : "POST",
                dataType : "json",
                contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
                data : JSON.stringify(obj),

                success : function(ret) {

                    var responseCode = ret.responseCode;
                    var accessToken = ret.accessToken;

                    if(responseCode=="0000000"){
                        amGloble.fyuserinfo.username = $("#fuyu_signup #username").val().trim();
                        amGloble.fyuserinfo.accessToken = accessToken;
                        amGloble.fyuserinfo.password = $("#fuyu_signup #password").val().trim();
                        $.am.changePage(amGloble.page.fuyu_vin, "slideleft");
                        $("#fuyu_signup .error-message").text("");
                    }else if(responseCode=="0000001"){
                    	 $("#fuyu_signup .error-message.name").text("用户名为空");
                    }else if(responseCode=="0000002"){
                    	 $("#fuyu_signup .error-message.name").text("用户名长度不符合");
                    }else if(responseCode=="0000003"){
                    	 $("#fuyu_signup .error-message.name").text("用户名不正确");
                    }else if(responseCode=="0000004"){
                    	 $("#fuyu_signup .error-message.password").text("密码为空");
                    }else if(responseCode=="0000005"){
                    	 $("#fuyu_signup .error-message.password").text("密码长度不符合");
                    }else if(responseCode=="0000006"){
                    	 $("#fuyu_signup .error-message.confirm").text("确认密码为空");
                    }else if(responseCode=="0000007"){
                    	 $("#fuyu_signup .error-message.confirm").text("确认密码长度不符合");
                    }else if(responseCode=="0000008"){
                    	 $("#fuyu_signup .error-message.confirm").text("两次密码不一致");
                    }else if(responseCode=="0000009"){
                    	 $("#fuyu_signup .error-message.email").text("邮箱为空");
                    }else if(responseCode=="0000010"){
                    	 $("#fuyu_signup .error-message.email").text("邮箱不符合");
                    }else if(responseCode=="0000011"){
                    	 $("#fuyu_signup .error-message.email").text("邮箱已经被使用");
                    }else if(responseCode=="0000012"){
                    	 $("#fuyu_signup .error-message.name").text("用户名已存在");
                    }else if(responseCode=="0000020"){
                    	 $("#fuyu_signup .error-message.system").text("系统错误");
                    }
                    	

                    
                },
                error : function(ret) {
                    console.log(ret);
                }
            });

		},


	});

})();
