/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.profile_updateInfo = new $.am.Page({
		id : "profile_updateInfo",
		currentPWD : "",

		init: function (paras) {

		    var page = this;

		    $("#profile_updateInfo .nextbutton").vclick(
		        function () { 
		        	page.submit(); 
		        }
            );

		    $("#profile_updateInfo .rectButton").vclick(
                function () {
                    page.submit();
                }
            );

		    $("#profile_updateInfo #normalForm > div:eq(1) input").parent().click(
            function () {

            	var test = amGloble.setting.registration.fields;
				var reg =new RegExp(test.vehicle_vin_1.reg);
            	if(reg.test($("#profile_updateInfo #key").val())){

            		$("#profile_updateInfo #normalForm > div:eq(1) input").attr("readonly","true");
                   
	                var list = amGloble.setting.lang.model;
	              
	                var list2=[];
	                for (var i = 0; i < list.length; i++) {
	                    var obj= new Object;
	                    obj.title=list[i];
	                    obj.value=list[i];
	                    list2[i]=obj;
	                    obj=null;
	                };

	                amGloble.popupMenu(i18n.PROFILE_MYVEHICLE_VEHICLENAME, list2, "title", function (ret) {
                    $("#profile_updateInfo #normalForm > div:eq(1) input").val(ret.value);
                });
            }else{
            	$("#profile_updateInfo #normalForm > div:eq(1) input").removeAttr("readonly");
            	return;
            }

          });
		  
		},
		//before page show
		beforeShow: function (paras) {

            this.$.find(".keboardCover").show();
		    $("#profile_updateInfo #key").val(paras.key);

		    var isInverted = (amGloble.setting.lang.code == "th");

		    if(paras.key == "password"){
		    	$("#profile_updateInfo #normalForm").hide();
		    	$("#profile_updateInfo #passwordForm").show();

		    	if(isInverted){
		    		$("#profile_updateInfo #passwordForm > div:eq(0) label").html(paras.displayname + i18n.PROFILE_UPDATEINFO_CURRENT);
		    	}else{
		    		$("#profile_updateInfo #passwordForm > div:eq(0) label").html(i18n.PROFILE_UPDATEINFO_CURRENT + paras.displayname);
		    	}
		    	$("#profile_updateInfo #passwordForm > div:eq(0) input").val("");
			    currentPWD = paras.value;

			    if(isInverted){
			    	$("#profile_updateInfo #passwordForm > div:eq(1) label").html(paras.displayname + i18n.PROFILE_UPDATEINFO_NEW);
			    }else{
			    	$("#profile_updateInfo #passwordForm > div:eq(1) label").html(i18n.PROFILE_UPDATEINFO_NEW + paras.displayname);
			    }		    
			    $("#profile_updateInfo #passwordForm > div:eq(1) input").val("");

			    $("#profile_updateInfo #passwordForm > div:eq(2) label").html(i18n.PROFILE_UPDATEINFO_CONFIRMNEW + paras.displayname);
			    $("#profile_updateInfo #passwordForm > div:eq(2) input").val("");
		    }
		    else{
		    	$("#profile_updateInfo #normalForm").show();
		    	$("#profile_updateInfo #passwordForm").hide();

				if(isInverted){
		    		$("#profile_updateInfo #normalForm > div:eq(0) label").html(paras.displayname + i18n.PROFILE_UPDATEINFO_CURRENT);
		    	}else{
		    		$("#profile_updateInfo #normalForm > div:eq(0) label").html(i18n.PROFILE_UPDATEINFO_CURRENT + paras.displayname);
		    	}
		    	$("#profile_updateInfo #normalForm > div:eq(0) input").val(paras.value);

				if(isInverted){
			    	$("#profile_updateInfo #normalForm > div:eq(1) label").html(paras.displayname + i18n.PROFILE_UPDATEINFO_NEW);
			    }else{
			    	$("#profile_updateInfo #normalForm > div:eq(1) label").html(i18n.PROFILE_UPDATEINFO_NEW + paras.displayname);
			    }	
			    $("#profile_updateInfo #normalForm > div:eq(1) input").val("");

			    $("#profile_updateInfo #normalForm > div:eq(0) input").attr("readonly","readonly"); 
		    }

		    $("#profile_updateInfo .error").hide();
                                                   
        amGloble.api.checkBackendState();

		    var data = amGloble.generateTrackData(
                "owner app:profile:account:edit:"+paras.key,
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:profile:account:edit:"+paras.key,data);
		},

		//after page show
		afterShow : function() {
	       var self = this;
	       this.$.find(".keboardCover").fadeOut(1000,function(){
	            self.$.find(".keboardCover").hide();
	            });

	       $("#profile_myAccount .nextbutton").removeClass("am-clickable");
		},
		//before page hide
		beforeHide : function() {
			    
		},
		//after page hide
		afterHide : function() {
		},
		submit: function () {
			var updatekey = $("#profile_updateInfo #key").val();
			var data = amGloble.generateTrackData(
                    "owner app:profile:account:edit:"+updatekey,
                    "",
                    "",
                    "",
                    "profile:edit",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackAction("owner app:profile:account:edit:"+updatekey+":complete",data);

			if($("#profile_updateInfo #key").val() == "password"){
				//password
				if (!$("#profile_updateInfo #passwordForm > div:eq(1) input").val().trim())
			    {//
			        $("#profile_updateInfo .error").html(i18n.PROFILE_UPDATEINFO_ERRORNEWVALUE);
			        $("#profile_updateInfo .error").show();
			    }
			    else if (!$("#profile_updateInfo #passwordForm > div:eq(0) input").val().trim() || $("#profile_updateInfo #passwordForm > div:eq(0) input").val()!=currentPWD)
			    {
			        $("#profile_updateInfo .error").html(i18n.PROFILE_UPDATEINFO_ERRORPW);
			        $("#profile_updateInfo .error").show();
			    }
			    else if ($("#profile_updateInfo #passwordForm > div:eq(1) input").val() != $("#profile_updateInfo #passwordForm > div:eq(2) input").val())
			    {
			        $("#profile_updateInfo .error").html(i18n.PROFILE_UPDATEINFO_ERRORNOTEQUAL);
			        $("#profile_updateInfo .error").show();
			    }
			    else if ($("#profile_updateInfo #passwordForm > div:eq(0) input").val() == $("#profile_updateInfo #passwordForm > div:eq(1) input").val())
			    {
              $("#profile_updateInfo .error").html(i18n.PROFILE_UPDATEINFO_ERROSAMEPASSWORD?i18n.PROFILE_UPDATEINFO_ERROSAMEPASSWORD:i18n.PROFILE_UPDATEINFO_ERRORPW);
			        $("#profile_updateInfo .error").show();
			    }
			    else if (typeof $.am.history[$.am.history.length - 1] != "undefined") {
			        if (this.hasError()) {
				    		var paras = {
				            key: $("#profile_updateInfo #key").val(),
				            value: $("#profile_updateInfo #passwordForm > div:eq(1) input").val()
				        };

				        setTimeout(function(){
                            $.am.changePage($.am.history[$.am.history.length - 1], "back", paras);
                        },1000);
			    	};
			    }
			}
			else if ($("#profile_updateInfo #key").val() == "min" || $("#profile_updateInfo #key").val() == "work_phone" || $("#profile_updateInfo #key").val() == "home_phone") {
				//phone number
			        if (!$("#profile_updateInfo #normalForm > div:eq(1) input").val().trim())
			    {
			    	 var paras = {
			            key: $("#profile_updateInfo #key").val(),
			            value: ""
			        };

			        setTimeout(function(){
                            $.am.changePage($.am.history[$.am.history.length - 1], "back", paras);
                        },1000);

			    }
			    else if (typeof $.am.history[$.am.history.length - 1] != "undefined") {
			       if (this.hasError()) {
				    		var paras = {
				            key: $("#profile_updateInfo #key").val(),
				            value: $("#profile_updateInfo #normalForm > div:eq(1) input").val()
				        };

				        setTimeout(function(){
                            $.am.changePage($.am.history[$.am.history.length - 1], "back", paras);
                        },1000);
			    	};
			    }
			}
			else{
				if (!$("#profile_updateInfo #normalForm > div:eq(1) input").val().trim())
			    {
			    	 $("#profile_updateInfo .error").html(i18n.PROFILE_UPDATEINFO_ERRORNEWVALUE);
				     $("#profile_updateInfo .error").show();
			    }
			    else if (typeof $.am.history[$.am.history.length - 1] != "undefined") {
		    	
		    		if (this.hasError()) {
			    		if ($("#profile_updateInfo #key").val() == "forum_nickname") {
				    		this.getError();
				    	}else{
				    		var paras = {
					            key: $("#profile_updateInfo #key").val(),
					            value: $("#profile_updateInfo #normalForm > div:eq(1) input").val()
				            };
					        setTimeout(function(){
                            $.am.changePage($.am.history[$.am.history.length - 1], "back", paras);
                        },1000);
				    	} 
			    	} 
			    	
			    }
			}
    
		},
		hasError: function () {
			var test= amGloble.setting.registration.fields;
			var testValue=$("#profile_updateInfo #normalForm > div:eq(1) input").val().trim();
			var key=$("#profile_updateInfo #key").val();
			var message=null;
			var passwordValue=$("#profile_updateInfo #passwordForm > div:eq(1) input").val().trim();
			var confirmValue=$("#profile_updateInfo #passwordForm > div:eq(2) input").val().trim();

			if (key=="forum_nickname") {
				if (testValue){
	                var reg =new RegExp(test.forum_nickname.reg);
	                if (!reg.test(testValue)){
	                    message = test.forum_nickname.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;

	                }
	            }
			};

			if (key=="city") {
				if (testValue){
	                var reg =new RegExp(test.city.reg);
	                if (!reg.test(testValue)){
	                    message = test.city.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="street") {
				if (testValue){
	                var reg =new RegExp(test.street.reg);
	                if (!reg.test(testValue)){
	                    message = test.street.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="postal_code") {
				if (testValue){
	                var reg =new RegExp(test.postal_code.reg);
	                if (!reg.test(testValue)){
	                    message = test.postal_code.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="min") {
				if (testValue){
	                var reg =new RegExp(test.min.reg);
	                if (!reg.test(testValue)){
	                    message = test.min.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="work_phone") {
				if (testValue){
	                var reg =new RegExp(test.work_phone.reg);
	                if (!reg.test(testValue)){
	                    message = test.work_phone.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="home_phone") {
				if (testValue){
	                var reg =new RegExp(test.home_phone.reg);
	                if (!reg.test(testValue)){
	                    message = test.home_phone.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			if (key=="password") {
				if (passwordValue){
	                var reg =new RegExp(test.password.reg);
	                if (!reg.test(passwordValue)){
	                    message = test.password.regmsg;
	                    $("#profile_updateInfo .error").html(message);
				        $("#profile_updateInfo .error").show();
	                    return false;
	                }else{
	                	return true;
	                }
	            }
			};

			var test = amGloble.setting.registration.fields;
			var reg =new RegExp(test.vehicle_vin_1.reg);
			if (reg.test(key)) {
				return true;
			};


        },
        getError: function () {

            $.ajax({
                url : amGloble.setting.lang.host + "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site="+ amGloble.setting.lang.site + "&type=nickname&forum_nickname="+$("#profile_updateInfo #normalForm > div:eq(1) input").val().trim(),
                type : "GET",
                dataType : "json",
                contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
                success : function(ret) {
                    if (ret.valid == true) {
                        var paras = {
				            key: $("#profile_updateInfo #key").val(),
				            value: $("#profile_updateInfo #normalForm > div:eq(1) input").val()
			            };
				        setTimeout(function(){
                            $.am.changePage($.am.history[$.am.history.length - 1], "back", paras);
                        },1000);
                    }else{
                         //amGloble.msg(ret.message);
                        $("#profile_updateInfo .error").html(ret.message);
				        $("#profile_updateInfo .error").show();
                    };
                      
                    
                },
                error : function(ret) {
                    //amGloble.msg(ret.message);
                    $.am.changePage(amGloble.page.common_oops, "slideleft",
                    {
                        title: "",
                        message: ret.status.message,
                        detail: ret
                    });
                }
            });

        },

	});

})();
