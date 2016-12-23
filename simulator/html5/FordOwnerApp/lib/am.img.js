(function() {
	var _name = "RF_img_";
	var _serviceName = "RF_general_downloadPic";
	var _threadId = 0;

	var _downloadedList = {};
	var _downloadingList = {};

	var _runCallbacks = function(id, ret) {
		var cbs = _downloadingList[id].callbacks;
		for (var i = 0; i < cbs.length; i++) {
			cbs[i](ret);
		};
	};
	var _saveData = function(id, value) {
		window.localStorage.setItem(_name + id, value);
	};
	var _getData = function(id) {
		return window.localStorage.getItem(_name + id);
	};
	var _removeData = function(id, type) {
		// $.am.debug.log("remove" + id);
		var id2 = type ? id + "_" + type : id;
		delete _downloadedList[id2];
		window.localStorage.removeItem(_name + id2);
	};
	var getPicture = function(id, cb, type) {
		var id2 = type ? id + "_" + type : id;
		if (id == null) {
			cb && cb({
				error : 1,
				data : "Download failed!"
			});
			return;
		}
		//在cache中检索到
		var filename = _downloadedList[id2];

		// $.am.debug.log("cache:" + filename + ":" + id);

		if (filename) {
			//callback
			cb && cb({
				type : 2, //local
				error : 0,
				data : $.am.relativePath ? atMobile.app.sourceRoot + filename : filename
			});
			return;
		}

		//在storage中检索到
		filename = _getData(id2);
		if (filename) {
			//save in cache
			_downloadedList[id2] = filename;
			//callback
			cb && cb({
				type : 1, //local
				error : 0,
				data : $.am.relativePath ? atMobile.app.sourceRoot + filename : filename
			});
			return;
		}

		var item = _downloadingList[id2];
		if (item) {
			//add callback to callbacks array
			item.callbacks.push(cb);
			return;
		}

		//add download
		//add info to downloading list, status is 1
		var down = _downloadingList[id2] = {
			threadId : _threadId++,
			filename : "",
			callbacks : [cb]
		};

		//start download
		atMobile.download.download({
			threadId : down.threadId,
			serviceName : _serviceName,
			url : "./images2/1.jpg",
			inputData : {
				picId : id,
				type : type
			}
		}, function(ret) {
			//成功时
			if ( typeof ret == "string") {
				ret = JSON.parse(ret);
			}

			var filename = $.am.relativePath ? ret.responseData.relativePath : ret.responseData.filename;

			// $.am.debug.log(filename)

			//转移到cache和storage
			_downloadedList[id2] = filename;
			_saveData(id2, filename);
			//callbacks
			_runCallbacks(id2, {
				error : 0,
				data : $.am.relativePath ? atMobile.app.sourceRoot + filename : filename
			});
			//删除downloading列表中
			delete _downloadingList[id2];
		}, function(ret) {
			//失败时
			//callbacks
			_runCallbacks(id2, {
				error : 1,
				data : "Download failed!"
			});
			//删除downloading列表中
			delete _downloadingList[id2];
		});
	};

	$.am.preloadImgs = function(id) {
		getPicture(id);
	};
	$.fn.getPicture = function(id, scb, fcb, type) {
		var self = this;
		var getOnce = function() {
			getPicture(id, function(ret) {
				if (!ret.error) {
					self.unbind().bind({
						"load" : function() {
							// $.am.debug.log("img loaded");
							self.show();
							scb && scb.call(self);
						},
						"error" : function() {
							// $.am.debug.log("clear" + ret.type);
							_removeData(id, type);
							if (ret.type) {
								getOnce();
							}
						}
					});
					self.attr("src", ret.data);
				} else {
					$.am.debug.log("img download error");
					fcb && fcb.call(self);
				}
			}, type);
		};
		getOnce();
		return this;
	};
})();
