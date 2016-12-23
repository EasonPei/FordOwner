/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.contact_roadsideAssistance = new $.am.Page({
		id : "contact_roadsideAssistance",

		init : function() {
			var self = this;

			this.$ul = this.$.find(".vehicelList");
			this.$li = this.$ul.children(":first").remove();

			this.$myVehicle = this.$.find("#assisMyVehicle").hide();
			this.$myPos = this.$.find("#assisMyPosition").hide();

			this.$serviceList = this.$.find(".serviceList");
			this.$sli = this.$serviceList.children("ul:first").remove();
			this.$serviceList.on("vclick", ".hourservice", function() {
				var data = amGloble.generateTrackData(
                    "owner app:service:roadside assistance",
                    "",
                    "",
                    "",
                    "service:phone:roadside assistance",
                    false,
                    false,
                    false,
                    false,
                    false)
            	amGloble.trackAction("owner app:service:roadside assistance:phone",data);

				emap.dail({
					"number" : $(this).find(".hsphonenumber").html(),
					"autoDial" : false
				});
			});

		},
		//before page show
		beforeShow : function(paras) {
			var self = this;
			self.$myVehicle.hide();
			self.renderService();
			if (amGloble.userinfo.sessionid) {
				//已登陆
				//
				amGloble.api.getVehicle(function(ret) {
					console.log(ret);
					if (ret && ret.length) {
						self.$ul.empty();
						$.each(ret, function(i, item) {
							var $li = self.$li.clone(true, true);
							$li.find(".midetail-number").html(i + 1);
							$li.find(".name").html(item.vehiclename);
							$li.find(".vin").html(i18n.CONTACT_ROADSIDEASSISTANCE_VINNO + item.vin);
							self.$ul.append($li);
						});
						self.$myVehicle.show();

					} else {
						self.$myVehicle.hide();
					}
				}, function(ret) {
					console.log(ret);
					self.$myVehicle.hide();
				});

			} else {
				self.$myVehicle.hide();
			}

			//根据用户位置通过不同地图api获得用户的地址和国家
			amGloble.maps.currentMapDispatchRun(function() {
				//todo google map
			}, function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var loc_Bing = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
						amGloble.maps.currentAddress(loc_Bing, function(address, country) {
							self.$myPos.show().find(".addressText").html(address);
							//alert(country);
						});
					}, function() {
						self.$myPos.show().find(".addressText").html(i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6);
						emap.alert({
							caption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6,
							description : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT7,
							okCaption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT8
						}, function() {
						});
					}, {
						maximumAge : 0,
						timeout : 15000,
						enableHighAccuracy : true
					});
				} else {
					console.log(' Browser doesnt support geolocation !');
				}
			}, function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var loc_Google = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						amGloble.maps.currentAddress(loc_Google, function(address, country) {
							self.$myPos.show().find(".addressText").html(address);
							//alert(country);
						});
					}, function() {
						self.$myPos.show().find(".addressText").html(i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6);
						emap.alert({
							caption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6,
							description : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT7,
							okCaption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT8
						}, function() {
						});
					}, {
						maximumAge : 0,
						timeout : 15000,
						enableHighAccuracy : true
					});
				} else {
					console.log(' Browser doesnt support geolocation !');
				}
			}, function() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var loc_autoNavi = {lat: position.coords.latitude, lng: position.coords.longitude};
						amGloble.maps.currentAddress(loc_autoNavi, function(address, country) {
							self.$myPos.show().find(".addressText").html(address);
							//alert(country);
						});
					}, function() {
						self.$myPos.show().find(".addressText").html(i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6);
						emap.alert({
							caption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT6,
							description : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT7,
							okCaption : i18n.CONTACT_ROADSIDEASSISTANCE_TEXT8
						}, function() {
						});
					}, {
						maximumAge : 0,
						timeout : 15000,
						enableHighAccuracy : true
					});
				} else {
					console.log(' Browser doesnt support geolocation !');
				}
			});

			var data = amGloble.generateTrackData(
                    "owner app:service:roadside assistance",
                    "",
                    "",
                    "",
                    "",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackPage("owner app:service:roadside assistance",data);
		},
		renderService : function() {
			var $ul = this.$serviceList.empty();
			var self = this;
			$.each(amGloble.setting.lang.ra, function(i, item) {
				var $li = self.$sli.clone(true, true);
				$li.find(".hstitle").html(item.title);
				$li.find(".hsphonenumber").html(item.number);
				$ul.append($li);
			});
		},

		//after page show
		afterShow : function() {
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
		}
	});

})();
