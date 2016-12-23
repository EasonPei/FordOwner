/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.login_vehicle = new $.am.Page({
		id : "login_vehicle",

		init : function() {
			var self = this;

			this.$prev = this.$header.find(".left").vclick(function() {
				self.prev();
			});
			this.$next = this.$header.find(".right").vclick(function() {
				self.next();
			});
			this.$bottomBtn = this.$.find(".bottombutton").vclick(function() {
				self.next();
			});

			this.$vincode = this.$.find("#login_vehicle_vincode");
			this.$model = this.$.find("#login_vehicle_model");
			this.$modelInput = this.$model.find("input");

			this.$model.vclick(function() {
				var list = amGloble.setting.lang.model;

				var list2 = [];
				for (var i = 0; i < list.length; i++) {
					var obj = new Object;
					obj.title = list[i];
					obj.value = list[i];
					list2[i] = obj;
					obj = null;
				};
				amGloble.popupMenu(i18n.SIGNUP_VEHICLE_NAME, list2, "title", function(ret) {
					self.$modelInput.val(ret.value);
					var v = self.vehicles[self.currIdx];
					v.vehicle_nickname = ret.value;
					// v.vehiclename = "My " + ret.value;
					// v.model = ret.value;
				});
			});
		},

		//before page show
		beforeShow : function(paras) {
			// amGloble.userinfo.profile.user_vehicles.push({
			// primary_vehicle_id : "Y",
			// vehicle_nickname : "213",
			// vehicle_vin : "1ZVBP8EN8A5110658"
			// });
      $("#login_vehicle #vehiclename").attr("placeholder",i18n.SIGNUP_VEHICLE_SELECT);
			this.currIdx = 0;
			this.vehicles = amGloble.userinfo.profile.user_vehicles.slice(0);
			this.render();
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
		render : function() {

			if (this.currIdx == 0) {
				this.$prev.hide();
			} else {
				this.$prev.show();
			}

			var vehicle = this.vehicles[this.currIdx];
			this.$vincode.html(vehicle.vehicle_vin);
			if (amGloble.findInModel(vehicle.vehicle_nickname) == -1) {
				this.$modelInput.val("");
			} else {
				this.$modelInput.val(vehicle.vehicle_nickname);
			}
		},
		next : function() {
			if (!this.$modelInput.val()) {
				amGloble.msg(i18n.LOGIN_VEHICLE_SELECTTIP || "Please select a model.");
				return false;
			}

			if (this.currIdx >= amGloble.userinfo.profile.user_vehicles.length - 1) {
				//submit
				this.saveProfile();
			} else {
				this.currIdx++;
				this.render();
			}

		},
		prev : function() {
			if (this.currIdx <= 0) {
				//submit
			} else {
				this.currIdx--;
				this.render();
			}
		},
		saveProfile : function() {

			var obj = {
				username : amGloble.userinfo.username,
				user_vehicles : this.vehicles
			};
			amGloble.loading.show();
			amGloble.api.updateProfile(obj, function(ret) {
				amGloble.loading.hide();
				amGloble.msg(ret.status.code);
				if (ret.status.code == "success") {
					$.am.changePage(amGloble.page.dashboard_main, "slideleft");
					$("#signUp_vehicle .bottombutton").addClass("am-clickable");
				} else {
					$.am.changePage(amGloble.page.common_oops, "slideleft", {
						title : "",
						message : ret,
						detail : ret
					});
				}
			}, function(ret) {
				amGloble.loading.hide();
				$.am.changePage(amGloble.page.common_oops, "slideleft", {
					title : "",
					message : ret,
					detail : ret
				});
			});

		}
	});
})();
