/*************@EMAP lib ****************/

(function() {

	//通讯对象
	var c = {
		_cbs : {},
		//调用container接口
		exec : function(serviceName, actionName, option, successCallback, failedCallback) {
			cordova.exec(successCallback, failedCallback, serviceName, actionName, [option]);
		},
		trigger : function(type, data) {
			var evt = document.createEvent('Events');
			evt.initEvent(type, false, false);
			evt.emapContent = data;
			document.dispatchEvent(evt);
		},
		//bind事件处理函数
		bind : function(type, handler) {
			if ( typeof handler != "function") {
				return false;
			}
			var cbs = this._cbs;
			if (cbs[type]) {
				var tcbs = cbs[type];
				for (var i = 0; i < tcbs.length; i++) {
					if (tcbs[i] == handler) {
						return false;
					};
				};

				cbs[type].push(handler);
			} else {
				cbs[type] = [handler];
			}
			document.addEventListener(type, handler, false);
		},
		unbind : function(type, handler) {
			var cbs = this._cbs;
			if (!cbs[type]) {
				return false;
			}
			if ( typeof handler != "function") {
				var tcbs = cbs[type];
				for (var i in tcbs) {
					document.removeEventListener(type, tcbs[i], false);
				};
				delete cbs[type];
			} else {
				var tcbs = cbs[type];
				for (var i = 0; i < tcbs.length; i++) {
					if (tcbs[i] == handler) {
						document.removeEventListener(type, handler, false);
						tcbs.splice(i, 1);
						i--;
					};
				};
			}
		}
	};

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
					var src = target[name],
					    copy = option[name];
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

	//BASE
	var apiBase = {
		trigger : function(type, data) {
			return c.trigger(type, data);
		},
		bind : function(type, handler) {
			return c.bind(type, handler);
		},
		unbind : function(type, handler) {
			return c.unbind(type, handler);
		},
		ready : function(handler) {
			return c.bind("emap_ready", handler);
		},
		meta : {}
	};

	//emap插件列表
	var apiPlugin = {
		//AppManager
		getMetadata : ["appManager", "getMetadata"],
		startApp : ["appManager", "startApp"],
		stopAll : ["appManager", "stopAll"],
		stopApp : ["appManager", "stopApp"],
		logout : ["appManager", "logout"],
		appReady : ["appManager", "appReady"],
		setOrientation : ["appManager", "setOrientation"],
		bringToBack:["appManager","bringToBack"],

		//Webservice
		execConnector : ["webService", "execServiceConnector"],
		downloadFile : ["emapFileTransfer", "download"],
		directDownload : ["emapFileTransfer", "directDownload"],
		cancelDownload : ["emapFileTransfer", "cancelDownload"],
		cancelDirectDownload : ["emapFileTransfer", "cancelDirectDownload"],
		getDownloadProgress : ["emapFileTransfer", "getDownloadProgress"],
		uploadFile : ["emapFileTransfer", "upload"],
		cancelUpload : ["emapFileTransfer", "cancelUpload"],
		getUploadProgress : ["emapFileTransfer", "getUploadProgress"],
		deleteFile : ["emapFileSystem", "deleteFile"],

		//NativeUI
		startBusy : ["nativeUI", "startBusy"],
		stopBusy : ["nativeUI", "stopBusy"],
		msg : ["emapNotification", "showInstantMessage"],
		alert : ["emapNotification", "showMessageBox"],
		confirm : ["emapNotification", "confirm"],
		popupMenu : ["nativeUI", "showPopupMenu"],
		comboBox : ["nativeUI", "showComboBox"],
		openUrl : ["nativeUI", "openUrl"],
		inAppBrowser : ["emapInAppBrowser", "popupWebsite"],
		datePicker : ["nativeUI", "datePicker"],
		timePicker : ["nativeUI", "timePicker"],
		barcode : ["nativeUI", "readBarcode"],
		searchList : ["nativeUI", "openSearchList"],
		multiLevelList : ["nativeUI", "showMultiLevelList"],
		viewFile : ["nativeUI", "viewFile"],
		map : ["nativeUI", "showMap"],

		//Media
		play : ["mediaService", "play"],
		stop : ["mediaService", "stop"],
		pause : ["mediaService", "pause"],
		getPlayingPosition : ["mediaService", "getCurrentPosition"],
		getPlayingDuration : ["mediaService", "getDuration"],
		seekTo : ["mediaService", "seekTo"],
		setVolume : ["mediaService", "setVolume"],
		getPlayerStatus : ["mediaService", "getPlayerStatus"],
		startRecord : ["recordService", "startAudioRecord"],
		stopRecord : ["recordService", "stopAudioRecord"],
		getRecorderDuration : ["recordService", "getAudioRecorderDuration"],
		getRecorderStatus : ["recordService", "getAudioRecorderStatus"],
		getImageMeta : ["mediaService", "getImageMeta"],
		imageResize : ["mediaService", "resizeImage"],
		imageTrim : ["mediaService", "trimImage"],
		imageRotate : ["mediaService", "rotateImage"],
		photoToAlbum : ["mediaService", "photoToAlbum"],

		//PhoneService
		dail : ["phoneService", "dail"],
		sms : ["phoneService", "sms"],
		email : ["phoneService", "email"],
		isReachable : ["phoneService", "isReachable"],
		syncTime : ["phoneService", "syncTime"],
		imei : ["phoneService", "imei"],
		imsi : ["phoneService", "imsi"],
		addEvent : ["emapNotification", "addEvent"],
		removeEvent : ["emapNotification", "removeEvent"],
		checkGPS:["phoneService","checkGPS"],

		//System
		encrypt : ["securityService", "encrypt"],
		decrypt : ["securityService", "decrypt"],
		storePwd : ["securityService", "storePwd"],
		getPwd : ["securityService", "getPwd"],
    getLHCookie : ["securityService", "getLHCookie"],
		log : ["diagnose", "log"],
		logEvent : ["eventTracker", "logEvent"],
		registerPush : ["pushNotification", "registerDevice"],
		unregisterPush : ["pushNotification", "unregisterDevice"],

		//Storage
		persistProperty : ["storage", "persistProperty"],
		readProperty : ["storage", "readProperty"],
		removeProperty : ["storage", "removeProperty"],
		saveRuntime : ["storage", "saveRuntime"],
		loadRuntime : ["storage", "loadRuntime"],

		//Social
		snsBind : ["social", "bind"],
		snsUnbind : ["social", "unbind"],
		snsIsBound : ["social", "isBound"],
		snsShareTo : ["social", "shareTo"],
		snsFollow : ["social", "follow"],

		//OpenFile
		openFile : ["openFile", "openFile"],
		
		//PNS
		regPNS : ["pns", "regPNS"],		
		unRegPNS : ["pns", "unRegPNS"],
		
		//
		getConnectionInfo : ["NetworkStatus", "getConnectionInfo"]
	};

	//emap 使用cordova插件的接口列表
	var apiCordova = {
		getPicture : function(opt, scb, fcb) {

			var option = extend({
				quality : 50,
				destinationType : 0,
				sourceType : 1,
				allowEdit : true,
				encodingType : 0,
				mediaType : 0,
				correctOrientation : true,
				saveToPhotoAlbum : false,
				cameraDirection : 0
			}, opt);

			navigator.camera.getPicture(function(imageData) {
				if (!option.destinationType) {
					imageData = "data:image/jpeg;base64," + imageData;
				}
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : imageData
				});
			}, function(message) {
				fcb && fcb({
					"result" : -1,
					"message" : message
				});
			}, option);

		},
		getCurrentPosition : function(opt, scb, fcb) {
			var option = extend({
				maximumAge : 0,
				timeout : 10000,
				enableHighAccuracy : false
			}, opt);
			navigator.geolocation.getCurrentPosition(function(position) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : position
				});
			}, function(error) {
				fcb && fcb({
					"result" : -1,
					"message" : error.message
				});
			}, option);
		},
		getCurrentAcceleration : function(opt, scb, fcb) {
			navigator.accelerometer.getCurrentAcceleration(function(acceleration) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : acceleration
				});
			}, function(error) {
				fcb && fcb({
					"result" : -1,
					"message" : "Failed"
				});
			});
		},
		getCurrentHeading : function(opt, scb, fcb) {
			navigator.compass.getCurrentHeading(function(heading) {
				scb && scb({
					"result" : 0,
					"message" : "Success",
					"content" : heading
				});
			}, function(error) {
				fcb && fcb({
					"result" : -1,
					"message" : "Failed"
				});
			});
		},
		createContact : function() {
		},
		findContact : function() {
		},
		beep : function(opt, scb, fcb) {
			navigator.notification.beep(opt.times);
		},
		vibrate : function(opt, scb, fcb) {
			navigator.notification.vibrate(opt.time);
		}
	};

	//BASE
	var emap = {};

	//将Cordova api扩展到emap上
	extend(emap, apiBase);
	//将Cordova api扩展到emap上
	extend(emap, apiCordova);
	//将Plugin api扩展到emap上
	var createApi = function(api) {
		return function(option, successCallback, failedCallback) {
			c.exec(api[0], api[1], option, successCallback, failedCallback);
		};
	};
	for (i in apiPlugin) {
		emap[i] = createApi(apiPlugin[i]);
	}

	//全局命名
	window.emap = emap;

	//启动时获取meta
	c.bind('deviceready', function() {
		emap.appReady({}, function(ret) {
			if (ret && ret.result == 0 && ret.content) {
				extend(emap.meta, ret.content);
				c.trigger("emap_ready");
			}
		}, function(ret) {
			alert("deviceReady接口调用失败, 程序无法启动");
		});
	}, false);

})();
