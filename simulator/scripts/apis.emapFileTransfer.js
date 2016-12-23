(function() {
	var masServicePath = "/emap/mobile/api/services/invoke";
	var masStreamServicePath = "/emap/mobile/api/services/invokeStream";

	var emapFileTransfer = {
		threads : {},
		download : function(opt, scb, fcb) {

			var server = simulator.data.srvs[simulator.data.csrv];
			if (!server) {
					alert(multi_language.text.errMsg.setupServer);
				return false;
			}
			var url = "http://" + server.dom + ":" + server.por + masStreamServicePath;

			var opt2 = {
				"sessionId" : "",
				"compressed" : "false",
				"encrypt" : "false",
				"data" : opt.data,
				"audit" : {
					"deviceUUID" : "Simulator",
					"userName" : simulator.data.mode == "1" ? simulator.data.user : "",
					"mobiId" : simulator.data.mobs[simulator.data.cmob].mid
				}
			};

			var r = url + "?reqJson=" + JSON.stringify(opt2);

			this.threads[opt.threadId] = {
				st : new Date().getTime(),
				timer : setTimeout(function() {
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : {
							"filename" : r
						}
					});
				}, 20000)
			};
		},
		upload : function(opt, scb, fcb) {
			this.threads[opt.threadId] = {
				st : new Date().getTime(),
				timer : setTimeout(function() {
					scb && scb({
						"result" : 0,
						"message" : "Success",
						"content" : {
							"fileId" : "audioId-1234"
						}
					});
				}, 3000)
			};
		},
		getDownloadProgress : function(opt, scb, fcb) {
			if (opt.threadId == null || !this.threads[opt.threadId]) {
				fcb && fcb();
				//return false;
			}
			var st = this.threads[opt.threadId].st;
			var p = (new Date().getTime() - st) / 20000;
			scb && scb({
				"result" : 0,
				"message" : "Success",
				"content" : p
			});
		},
		getUploadProgress : function(opt, scb, fcb) {
			if (opt.threadId == null || !this.threads[opt.threadId]) {
				fcb && fcb();
				//return false;
			}
			var st = this.threads[opt.threadId].st;
			var p = (new Date().getTime() - st) / 3000;
			scb && scb({
				"result" : 0,
				"message" : "Success",
				"content" : p
			});
		},
		cancelDownload : function(opt, scb, fcb) {
			clearTimeout(this.threads[opt.threadId].timer);
			delete this.threads[opt.threadId];
			scb && scb({
				"result" : 0,
				"message" : "Success"
			});
		},
		cancelUpload : function(opt, scb, fcb) {
			clearTimeout(this.threads[opt.threadId].timer);
			delete this.threads[opt.threadId];
			scb && scb({
				"result" : 0,
				"message" : "Success"
			});
		},
		deleteDownloadedFile : function(opt, scb, fcb) {
		}
	};

	simulator.apis.emapFileTransfer = emapFileTransfer;
})(); 