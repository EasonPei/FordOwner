/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

	amGloble.page.knowledge_ownerManual = new $.am.Page({
		id : "knowledge_ownerManual",
		manual_self : null,
		ownerManualStatus : {},
		downloadTask : null,

		init : function() {
			manual_self = this;
			downloadTask = "";
			this.$.find(".tabs div").eq(3).vclick(function() {

//				ADB.trackAction("Goto 'Indicator Icons'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Knowledge Center",
//					"Username" : amGloble.userinfo.username,
//
//				});

				$.am.changePage(amGloble.page.knowledge_indicatorIcons, "");
			});
			this.$.find(".tabs div").eq(4).vclick(function() {
				$.am.changePage(amGloble.page.knowledge_ownerManual, "");
			});
			this.$.find(".tabs div").eq(5).vclick(function() {
//				ADB.trackAction("Goto 'SYNC Phrasebook'", {
//					"Market" : amGloble.setting.lang.site,
//					"Language" : amGloble.setting.lang.code,
//					"Page" : "Knowledge Center",
//					"Username" : amGloble.userinfo.username,
//
//				});
				$.am.changePage(amGloble.page.knowledge_phasebook, "");
			});
			this.$.find(".tabs div").eq(6).vclick(function() {
				$.am.changePage(amGloble.page.knowledge_more, "");
			});

			this.backButtonOnclick = function () {
			    $.am.changePage(amGloble.page.getDashboardPage(), "slideright");
			};
		},
		//before page show
		beforeShow : function(paras) {
			var self = this;
			var loginBtn = this.$.find(".loginAlert-forlist");
			manual_self.$.find(".content_wrapper").empty();
			if (amGloble.userinfo.profile != null) {
				loginBtn.hide();
			} else {
				loginBtn.show().vclick(function() {
					$.am.changePage(amGloble.page.login_login, "slideleft");
				});
			}
			try {
				amGloble.api.getVehicle(function(ret) {
					console.log(ret);
					self.generatePage(ret);
				}, function(ret) {
					console.log(ret);
				});
			} catch(e) {

			}

			var data = amGloble.generateTrackData(
                "owner app:owner support:owner manual",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:owner support:manual",data);
			//var unread = amGloble.api.getUnreadNotificationNum();
		},
		generatePage : function(vehicles) {
			var page = this;
			var root = manual_self.$.find(".content_wrapper");
			var tmpstatus;
			if (localStorage) {
				tmpstatus = localStorage.getItem("ownerManualDownloadStatus");
			}
			if (tmpstatus != null)
				ownerManualStatus = JSON.parse(tmpstatus);
			else
				ownerManualStatus = {};

			if(amGloble.setting.lang.i18n == "en-th"){
				var div = $("<div class='block'/>");
				$("<h2>English Owner\’s Manual is currently available for specific models. For other models, you can still download the Thai version for reference.</h2></div>").appendTo(div);
				div.appendTo(root);
			}

			//root.empty();
			for (var i = 0; i < vehicles.length; i++) {
				var v = vehicles[i];
				var model = v.model;
				if(amGloble.setting.lang.modelcode && amGloble.setting.lang.modelcode[model]){
	              model = amGloble.setting.lang.modelcode[model];
	            }

	            var div = $("<div class='block'/>");
				$("<h2>" + v.vehiclename + "</h2>").appendTo(div);
				var item = $("<div class='item am-clickable'/>");
				$("<div class='icon icon_car'/>").appendTo(item);
				var text = $("<div class='text_block'/>");
				if (model == "Other Ford Vehicle") {
					$("<div class='name'>" + i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_UNAVAILABLE + "</div>").appendTo(text);
					$("<div class='progress'>" + i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_UNAVAILABLE_DETAIL + "</div>").appendTo(text);
					text.appendTo(item);
					item.appendTo(div);
					div.appendTo(root);
					continue;
				}
				$("<div class='name'>" + i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_MANUAL + "</div>").appendTo(text);
				$("<div class='progress' id='downloadprogress_" + i + "'/>").appendTo(text);
				text.appendTo(item);
				var oper = $("<div class='operation'/>");
				oper.appendTo(item);
				$("<div class='progressline' id='downloadprogressline_" + i + "'/>").appendTo(item);
				item.appendTo(div);
				div.appendTo(root);

				item.data("idx", i);
				item.data("vin", v.vin);
				item.unbind("vclick").vclick(function() {
					console.log("Open file");
					var idx = $(this).data("idx");
					var manual_idx = idx>100?(idx%100):0;
					var vin_idx = $(this).data("vin") + "_" + amGloble.setting.lang.code + "_" + manual_idx;
					var btn = $("#downloadbtn_" + idx);
					var vin = $(this).data("vin");
					if (btn.hasClass("finished") || btn.hasClass("restart am-clickable")) {
						if (localStorage) {
							var tmp = localStorage.getItem("ownerManualDownloadStatus");
							if (tmp == null) {
								return;
							} else {
								var status = JSON.parse(tmp);
								if (status[vin_idx] == null) {
									return;
								} else {
//									ADB.trackAction("View one manual", {
//										"Market" : amGloble.setting.lang.site,
//										"Language" : amGloble.setting.lang.code,
//										"Page" : "Owner Manual Page",
//										"Username" : amGloble.userinfo.username,
//										"Bussiness Data" : {
//											"Vehicle Model" : vehicles[idx].model,
//											"Manual Name" : "Owner Manual"
//										}
//
//									});
									var data = amGloble.generateTrackData(
						                    "owner app:owner support:owner manual",
						                    "",
						                    "",
						                    "",
						                    "owner support:owner:view larger",
						                    false,
						                    false,
						                    false,
						                    false,
						                    false);
						            amGloble.trackAction("owner app:owner support:manual:owner:pdf view large",data);

									var opt = {
										"filepath" : status[vin_idx].nativeURL
									};
									emap.openFile(opt, function() {
									}, function() {
										amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG1);
									});
								}
							}
						}

					}
				});
				manual_self.setButtonStatus(oper, i, v.vin);

				$.ajax({
					url : amGloble.setting.lang.host + "/servlet/rest/pts/ext/vin/" + amGloble.setting.lang.site + "/" + v.vin, //接口url
					type : "GET",
					contentType : "application/json",
					timeout : amGloble.setting.market.timeout || 30000,
					manual_idx : i,
					manual_div : div,
					manual_vin : v.vin,
					success : function(ret) {
						var obj = JSON.parse(ret);
						manuals = obj.manuals;
						if (manuals.length > 1) {
							for (var x = 1; x < manuals.length; x++) {
								var m_idx = (this.manual_idx+1)*100+x;
								var item = $("<div class='item am-clickable'/>");
								$("<div class='icon icon_car'/>").appendTo(item);
								var text = $("<div class='text_block'/>");
               var name = manuals[x].description;
               $("<div class='name'>" + ((name&&name.length>0)?name:i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_MANUAL) + "</div>").appendTo(text);
								$("<div class='progress' id='downloadprogress_" + m_idx + "'/>").appendTo(text);
								text.appendTo(item);
								var oper = $("<div class='operation'/>");
								oper.appendTo(item);
								$("<div class='progressline' id='downloadprogressline_" + m_idx + "'/>").appendTo(item);
								item.appendTo(this.manual_div);

								item.data("idx", m_idx);
								item.data("vin", this.manual_vin);
								item.unbind("vclick").vclick(function() {
									console.log("Open file");
									var idx = $(this).data("idx");
									var manual_idx = idx>100?(idx%100):0;
									var vin_idx = $(this).data("vin") + "_" + amGloble.setting.lang.code + "_" + manual_idx;
									var btn = $("#downloadbtn_" + idx);
									var vin = $(this).data("vin");
									if (btn.hasClass("finished") || btn.hasClass("restart am-clickable")) {
										if (localStorage) {
											var tmp = localStorage.getItem("ownerManualDownloadStatus");
											if (tmp == null) {
												return;
											} else {
												var status = JSON.parse(tmp);
												if (status[vin_idx] == null) {
													return;
												} else {
													var data = amGloble.generateTrackData(
										                    "owner app:owner support:owner manual",
										                    "",
										                    "",
										                    "",
										                    "owner support:owner:view larger",
										                    false,
										                    false,
										                    false,
										                    false,
										                    false);
										            amGloble.trackAction("owner app:owner support:manual:owner:pdf view large",data);

													var opt = {
														"filepath" : status[vin_idx].nativeURL
													};
													emap.openFile(opt, function() {
													}, function() {
														amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG1);
													});
												}
											}
										}

									}
								});
								manual_self.setButtonStatus(oper, m_idx, this.manual_vin);
								page.refresh();
							};
						}
					},
					error : function(ret) {

					}
				});
			}
		},
		setButtonStatus : function(oper, idx, vin) {
			var manual_idx = idx>100?(idx%100):0;
			var vin_idx = vin + "_" + amGloble.setting.lang.code + "_" + manual_idx;
			amGloble.api.checkOwnerManualDownloadStatus(vin_idx, function(ret) {
				var btn;
				if (ret) {
					var status = ownerManualStatus[vin_idx];
					$("#downloadprogress_" + idx).html(status.size + "   100%");
					btn = $("<div class='roundbutton finished disabled' id='downloadbtn_" + idx + "'/>");
					//btn.append($("<div class='button_icon'/>")).appendTo(oper);
				} else {
					btn = $("<div class='roundbutton download am-clickable' id='downloadbtn_" + idx + "'/>");
				}
				btn.append($("<div class='button_icon'/>")).appendTo(oper);
				btn.data("idx", idx);
				btn.unbind("vclick").vclick(function() {
					var idx = $(this).data("idx");
					//$(this).removeClass("am-clickable");
					if ($("#downloadbtn_" + idx).hasClass("finished") || $("#downloadbtn_" + idx).hasClass("restart")) {
						return false;
					}
					// else if ($("#downloadbtn_" + idx).hasClass("restart")) {
					// if (downloadTask != null && $.trim(downloadTask) != "") {
					// var opt = {
					// "objectId" : downloadTask
					// };
					// emap.cancelDirectDownload(opt, function(ret) {
					//
					// }, function(ret) {
					// });
					// if ($("#downloadbtn_" + idx).hasClass("restart"))
					// $("#downloadbtn_" + idx).removeClass("restart").addClass("download");
					// $("#downloadprogress_" + idx).html("0%");
					// $("#downloadprogressline_" + idx).width("0%");
					// return false;
					// }
					// }
					else if ($("#downloadbtn_" + idx).hasClass("download")) {

						amGloble.loading.show();
						$.ajax({
							url : amGloble.setting.lang.host + "/servlet/rest/pts/ext/vin/" + amGloble.setting.lang.site + "/" + vin, //接口url
							type : "GET",
							contentType : "application/json",
							timeout : amGloble.setting.market.timeout || 30000,
							success : function(ret) {
								amGloble.loading.hide();
								var obj = JSON.parse(ret);
								manuals = obj.manuals;
								if (manuals.length > 0) {

									if ($("#downloadbtn_" + idx).hasClass("download"))
										$("#downloadbtn_" + idx).removeClass("download").addClass("restart");
									$("#downloadbtn_" + idx).removeClass("am-clickable");
									var manual_idx = idx>100?(idx%100):0;
									manual_self.downloadManual(manuals[manual_idx].url, vin, idx);
								} else {
									amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG3);
									$("#downloadbtn_" + idx).addClass("am-clickable");
								}
							},
							error : function(ret) {
								amGloble.loading.hide();
								amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG3);
								$("#downloadbtn_" + idx).addClass("am-clickable");
							}
						});
						return false;
					}

				});
			});
		},
		downloadManual : function(url, vin, idx) {
			var data = amGloble.generateTrackData(
                    "owner app:owner support:owner manual",
                    "",
                    "",
                    "",
                    "owner support:owner:download",
                    false,
                    false,
                    false,
                    false,
                    false);
            amGloble.trackAction("owner app:owner support:manual:owner:pdf download",data);

			var size = 0;
			var calc = false;
			var manual_idx = idx>100?(idx%100):0;
			var vin_idx = vin + "_" + amGloble.setting.lang.code + "_" + manual_idx;
			opt = {
				"downloadUrl" : url,
				"filename" : vin_idx + ".pdf",
				"storePath" : "ownermanual"
			};
			downloadTask = vin_idx + ".pdf";
			emap.directDownload(opt, function(ret) {
				var progress = 0;
				if (ret.loaded != null) {

					progress = Math.floor((ret.loaded / ret.total) * 100);
					if (!calc) {
						size = ret.total;
						size = size / 1024;
						if (size > 1024)
							size = (size / 1024).toFixed(2) + "MB";
						else
							size = size.toFixed(2) + "KB";
						calc = true;
					}
					$("#downloadprogress_" + idx).html(size + "   " + progress + "%");
					$("#downloadprogressline_" + idx).width(progress + "%");
					if (progress == 100) {
						if ($("#downloadbtn_" + idx).hasClass("download"))
							$("#downloadbtn_" + idx).removeClass("download am-clickable").addClass("finished disabled");
						else if ($("#downloadbtn_" + idx).hasClass("restart"))
							$("#downloadbtn_" + idx).removeClass("restart am-clickable").addClass("finished disabled");
					}
				}
				if (ret.fullPath != null) {
					downloadTask = null;
					if (ownerManualStatus[vin_idx] == null)
						ownerManualStatus[vin_idx] = {
							"fullPath" : "",
							"nativeURL" : "",
							"size" : ""
						};
					ownerManualStatus[vin_idx].fullPath = ret.fullPath;
					ownerManualStatus[vin_idx].nativeURL = ret.nativeURL;
					ownerManualStatus[vin_idx].size = size;
					if (localStorage)
						localStorage.setItem("ownerManualDownloadStatus", JSON.stringify(ownerManualStatus));

				}
			}, function(ret) {
				//失败
				$("#downloadbtn_" + idx).addClass("am-clickable");
				if ($("#downloadbtn_" + idx).hasClass("restart"))
					$("#downloadbtn_" + idx).removeClass("restart").addClass("download");
				console.log(JSON.stringify(ret));
				if (ret.code == 5) {
					amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG4);
				} else {
					amGloble.msg(i18n.KNOWLEDGE_CENTRE_OWNERMANUAL_ERRMSG5);
				}
				$("#downloadbtn_" + idx).addClass("am-clickable");
			});

		},

		//after page show
		afterShow : function() {
		},
		//before page hide
		beforeHide : function() {
			// if (downloadTask != null && $.trim(downloadTask) != "") {
			// var opt = {
			// "objectId" : downloadTask
			// };
			// emap.cancelDirectDownload(opt, function(ret) {
			// }, function(ret) {
			// });
			// }

		},
		//after page hide
		afterHide : function() {
		}
	});

})();
