(function() {
	/*
	 * @param {Object} target 目标对象。
	 * @param {Object} source 源对象。
	 * @param {boolean} deep 是否复制(继承)对象中的对象。
	 * @returns {Object} 返回继承了source对象属性的新对象。
	 */
	var extend = function(target, /*optional*/source, /*optional*/deep) {
		target = target || {};
		var i = 0;
		if ( typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
			source = {};
		while (i <= 2) {
			option = i === 1 ? target : source;
			if (option != null) {
				for (var name in option) {
					var src = target[name], copy = option[name];
					if (target === copy)
						continue;
					if (deep && copy && typeof copy === 'object' && !copy.nodeType)
						target[name] = extend(src || (copy.length != null ? [] : {}), copy, deep);
					else if (copy !== undefined)
						target[name] = copy;
				}
			}
			i++;
		}
		return target;
	};

	var globle = {
		$mobilet : $("#mobilet")[0].contentWindow,
		$scr : $("#scr"),
		trigger : function(type, paras) {
			globle.$mobilet.cordova.fireDocumentEvent(type, {
				"emapContent" : paras
			});
		}
	};

	var masServicePath = "/emap/mobile/api/services/invoke";
	var masStreamServicePath = "/emap/mobile/api/services/invokeStream";

	var apis = {
		testService : {
			triggerEvent : function(opt, scb, fcb) {
				globle.trigger(opt.type, opt.paras);
			}
		},
		webService : {
			execServiceConnector : function(opt, scb, fcb) {
				var server = simulator.data.srvs[simulator.data.csrv];
				if (!server) {
					alert(multi_language.text.errMsg.setupServer);
					return false;
				}
				var url = "http://" + server.dom + ":" + server.por + masServicePath;

				var str = JSON.stringify({
					"sessionId" : simulator.data.mode == "1" ? simulator.data.toke : "",
					"compressed" : "false",
					"encrypt" : "false",
					"data" : opt.data,
					"audit" : {
						"deviceUUID" : "Simulator",
						"userName" : simulator.data.mode == "1" ? simulator.data.user : "",
						"mobiId" : simulator.data.mobs[simulator.data.cmob].mid
					}
				});
				str = encodeURIComponent(str);

				var option = {
					url : url,
					type : "POST",
					data : str,
					timeout : opt.timeOut,
					success : function(ret) {
						ret = JSON.parse(ret);
						if (ret.result != 0 && ret.result != "0") {
							fcb && fcb({
								"result" : parseInt(ret.result),
								"message" : ret.message,
								"content" : ret.responseData
							});
						} else {
							scb && scb({
								"result" : 0,
								"message" : ret.message,
								"content" : ret.responseData
							});
						}
					},
					error : function(ret) {
						fcb({
							"result" : -1,
							"message" : "Failed"
						});
					}
				};
				$.ajax(option);
			}
		},
		storage : {
			persistProperty : function(opt, scb, fcb) {
				window.localStorage.setItem(opt.key, opt.value);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			readProperty : function(opt, scb, fcb) {
				var ret = window.localStorage.getItem(opt.key);
				if (ret) {
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : ret
					});
				} else {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				}
			},
			removeProperty : function(opt, scb, fcb) {
				var ret = window.localStorage.removeItem(opt.key);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			saveRuntime : function(opt, scb, fcb) {
				simulator.KeyValues.Set(opt.key, opt.value);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			loadRuntime : function(opt, scb, fcb) {
				if (simulator.KeyValues.Contains(opt.key)) {
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : simulator.KeyValues.Get(opt.key)
					});
				} else {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				}
			}
		},
		camera : {
			_$getPicture : null,
			capturePic : null,
			hideCamera : null,
			cameraGetPicture : function(opt, scb, fcb, onplay) {
				var self = this;
				if (!this._$getPicture) {
					this._$getPicture = globle.$scr.find('.comp-cameraGetPicture');
				}
				self._$getPicture.find('#selectPic').hide();

				var option = {
					quality : 75,
					destinationType : 0,
					//sourceType : 1,
					allowEdit : true,
					encodingType : 0,
					targetWidth : 100,
					targetHeight : 100,
					mediaType : 0,
					correctOrientation : true,
					saveToPhotoAlbum : false,
					cameraDirection : 0,
					showCapture : 1
				};

				extend(option, opt, true);

				var video = this._$getPicture.find("#video")[0];
				var canvas = this._$getPicture.find("#canvas")[0];
				var context = canvas.getContext("2d");
				var localStream = null;
				var hasCamera = true;

				var compWidth = this._$getPicture.width();
				var compHeight = this._$getPicture.height();

				var curtainWidth = 300;
				var curtainHeight = 200;

				canvas.width = curtainWidth;
				canvas.height = curtainHeight;

				$(canvas).width(curtainWidth);
				$(canvas).height(curtainHeight);

				$(canvas).css("left", (compWidth - curtainWidth) / 2);
				$(canvas).css("top", (compHeight - curtainHeight) / 2);

				var videoObj = {
					"video" : true
				};

				var toDouble = function toDouble(number) {
					if (number < 10) {
						return "0" + number;
					} else
						return "" + number;
				};

				var upDate = function upDate() {
					var date = new Date();
					var str = toDouble(date.getHours()) + ":" + toDouble(date.getMinutes()) + ":" + toDouble(date.getSeconds());

					context.clearRect(0, 0, curtainWidth, curtainHeight);
					context.fillStyle = "green";
					context.fillRect(0, 0, curtainWidth, curtainHeight);
					context.stroke();

					context.fillStyle = "#ffffff";
					context.font = "40px Arial";
					context.textBaseline = "middle";
					context.textAlign = "center";
					context.fillText(str, curtainWidth / 2, curtainHeight / 2);
				};

				var t = null;
				var errBack = function(error) {
					hasCamera = false;
					self._$getPicture.find('#selectPic').show();

					$(video).hide();
					$(canvas).show();
					t = setInterval(upDate, 1000);
					upDate();
				};

				video.addEventListener("loadedmetadata", function() {
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
				});

				$(video).show();
				$(canvas).hide();

				if (onplay) {
					video.addEventListener("onplaying", onplay);
				}

				if (navigator.getUserMedia) {
					navigator.getUserMedia(videoObj, function(stream) {
						localStream = stream;
						video.src = stream;
						video.play();
						if (onplay) {
							onplay();
						}

					}, errBack);
				} else if (navigator.webkitGetUserMedia) {
					navigator.webkitGetUserMedia(videoObj, function(stream) {
						localStream = stream;
						video.src = window.webkitURL.createObjectURL(stream);
						video.play();
						if (onplay) {
							onplay();
						}
					}, errBack);
				}

				if (option.showCapture == 0) {
					this._$getPicture.find('#capture').hide();
				}
				this._$getPicture.find('#selectPic').unbind().click(function() {
					simulator.apis.nativeUI.selectPicture({
						returnIncludeImageType : 1
					}, function(ret) {
						if (t != null) {
							clearInterval(t);
						}
						var img = new Image();
						img.src = ret;
						img.onload = function() {
							var x = 0;
							var y = 0;
							var width = 0;
							var height = 0;

							if (img.width / img.height > curtainWidth / curtainHeight) {
								width = curtainWidth;
								height = (width / img.width) * img.height;
								x = 0;
								y = (curtainHeight - height) / 2;
							} else {
								height = curtainHeight;
								width = (height / img.height) * img.width;
								y = 0;
								x = (curtainWidth - width) / 2;
							}

							context.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
							context.beginPath();
							if (onplay) {
								onplay();
							}
						};
					}, function() {
					});
				});
				this._$getPicture.find('#capture').unbind().click(function() {

					if (t != null) {
						clearInterval(t);
					}
					if (option.destinationType == 0) {
						if (hasCamera) {
							canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
						} else {
							context.drawImage(canvas, 0, 0, curtainWidth, curtainHeight);
						}

						var imgData = canvas.toDataURL(option.encodingType == 0 ? "image/jpeg" : "image/png");
						if (localStream != null) {
							video.pause();
							localStream.stop();
							video.src = "";
						}

						self._$getPicture.hide();

						if (option.encodingType == 0) {
							imgData = imgData.replace("data:image/jpeg;base64,", "");
						} else {
							imgData = imgData.replace("data:image/png;base64,", "");
						}

						scb && scb(imgData);
					} else {
						if (localStream != null) {
							video.pause();
							localStream.stop();
							video.src = "";
						}
						self._$getPicture.hide();
						scb && scb("src/icon.png");
					}
				});

				this.capturePic = function() {
					canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
					return canvas.toDataURL(option.encodingType == 0 ? "image/jpeg" : "image/png");
				};

				this._$getPicture.find('.close').unbind().click(function() {
					if (localStream != null) {
						video.pause();
						localStream.stop();
						video.src = "";
					}

					self._$getPicture.hide();
					fcb && fcb("closed by user");
				});

				this.hideCamera = function() {
					if (localStream != null) {
						video.pause();
						localStream.stop();
						video.src = "";
					}

					self._$getPicture.hide();
				};

				this._$getPicture.show();
			}
		},
		appManager : {
			startApp : function(opt, scb, fcb) {
				var startMobilet = simulator.simfunc.mobilet.getMobiletById(opt.appId);
				if (startMobilet == -1) {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				} else {
					simulator.simfunc.mobilet.open(startMobilet.i, opt.indexPage);
					scb && scb({
						"result" : 0,
						"message" : "Success"
					});
				}
			},
			stopApp : function(opt, scb, fcb) {
				var startMobilet = simulator.simfunc.mobilet.getMobiletById(opt.appId);
				if (startMobilet == -1) {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				} else {
					simulator.simui.show(1);
					scb && scb({
						"result" : 0,
						"message" : "Success"
					});
				}
			},
			stopAll : function(opt, scb, fcb) {
				simulator.simui.show(1);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			switchApp : function(opt, scb, fcb) {
				var mob = simulator.simfunc.mobilet.getMobiletById(opt.appName).m;
				simulator.simfunc.mobilet.openUrl(mob.pat + opt.page);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			appReady : function(opt, scb) {
				this.getMetadata(opt, scb);
				globle.trigger("resume");
			},
			getMetadata : function(opt, scb) {
				scb && scb({
					"result" : 0,
					"message" : "",
					"content" : {
						"device" : {
							"platform" : "",
							"name" : "",
							"uuid" : "",
							"version" : ""
						},
						"userInfo" : {
							"userName" : simulator.data.user,
							"customized" : simulator.data.thd,
							"accessToken" : simulator.data.thdToken,
							"offline" : simulator.data.mode == 3
						},
						"container" : {
							"version" : "",
							"sourceRoot" : ""
						},
						"app" : {
							"id" : simulator.data.mobs[simulator.data.cmob].mid,
							"label" : simulator.data.mobs[simulator.data.cmob].nam,
							"version" : simulator.data.mobs[simulator.data.cmob].ver,
							"description" : "",
							"minVersion" : "",
							"containerVer" : "",
							"minContainerVer" : ""
						}
					}
				});
			}
		},
		accountManager : {
			logout : function(opt, scb, fcb) {
				simulator.simui.show(0);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			}
		},
		emapInAppBrowser : {
			popupWebsite : function(opt, scb, fcb) {
				apis.nativeUI.popupWebsite(opt, scb, fcb);
			},
		},
		securityService : {
			encrypt : function(opt, scb, fcb) {
				var enData = base64Coder.base64encode(base64Coder.utf16to8(opt.data));

				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : enData
				});
			},
			decrypt : function(opt, scb, fcb) {
				var deData = base64Coder.utf8to16(base64Coder.base64decode(opt.data));

				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : deData
				});
			},
			storePwd:function(opt,scb,fcb){
				window.localStorage.setItem(opt.name, opt.pwd);
				scb && scb({
					"result" : 0,
					"message" : "Success",
				});
				
			},
			getPwd:function(opt,scb,fcb){
				var ret = window.localStorage.getItem(opt.name);
				if (ret) {
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : ret
					});
				} else {
					fcb && fcb({
						"result" : 1,
						"message" : "Failed"
					});
				}
			}
		},
		diagnose : {
			log : function(opt, scb, fcb) {
				console.log("log", opt);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			}
		},
		eventTracker : {
			logEvent : function(opt, scb, fcb) {
				console.log("logEvent", opt);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			}
		},
		cordova : {
			getPicture : function(opt, scb, fcb) {
				if (opt.sourceType == 0) {
					simulator.apis.nativeUI.selectPicture(opt, scb, fcb);
				} else {
					simulator.apis.camera.cameraGetPicture(opt, scb, fcb);
				}
			},
			beep : function(opt, scb, fcb) {
				var audioBeep = $("#audioBeep");
				var playCount = 0;

				var play = function() {
					playCount++;
					audioBeep[0].src = "images/iphone.mp3";
					audioBeep[0].play();
				};

				audioBeep.unbind().bind("ended", function() {
					if (playCount < opt.times) {
						play();
					}
				});
				if (playCount < opt.times) {
					play();
				}
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			vibrate : function(opt, scb, fcb) {
				simulator.apis.emapNotification.showInstantMessage({
					content : "vibrate...",
					duration : opt.time
				}, null, null);
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			}
		},
		pushNotification : {
			_$IsDeviceRegisted : null,
			registerDevice : function(opt, scb, fcb) {
				console.log("registerDevice", opt);
				this._$IsDeviceRegisted = true;
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			unregisterDevice : function(opt, scb, fcb) {
				console.log("unregisterDevice", opt);
				this._$IsDeviceRegisted = false;
				scb && scb({
					"result" : 0,
					"message" : "Success"
				});
			},
			getRegisterStatus : function(opt, scb, fcb) {
				console.log("unregisterDevice", opt);
				var tempContent = this._$IsDeviceRegisted ? 1 : 0;
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : tempContent
				});
			}
		},
		ADBMobile_PhoneGap : {
			trackState : function(opt, scb, fcb) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
				});
			},
			trackAction : function(opt, scb, fcb) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
				});
			},
			
		},
	};
	window.simulator.apis = apis;
	window.globle = globle;
	window.globle.extend = extend;

	//console.log("apis done;")
})();
