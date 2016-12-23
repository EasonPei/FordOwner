(function() {
    var mediaService = {
        none : 0,
        playing : 1,
        paused : 2,
        ended : 3,
        
        _$audioPlay: null,
        _$audioPlayStatus : 0,
        playSRC : "images/duck.mp3",        
        play : function(opt, scb, fcb) {
            console.log("play", opt);
            var self = this;
            if (!self._$audioPlay) {
                    self._$audioPlay = $("#audioPlay");
            }
            if (self._$audioPlayStatus == self.paused) {
                self._$audioPlay[0].play(); 
            }
            else {
                self._$audioPlay[0].src = self.playSRC;           
                self._$audioPlay[0].play();        
            }
            self._$audioPlayStatus = self.playing;
            scb && scb({
                    "result" : 0, //0 成功 1失败
                    "message" : "Success" //信息
            });            
                  
            self._$audioPlay.unbind().bind("ended", function () {
                self._$audioPlayStatus = self.ended;
                globle.trigger("emap_audioended", {});                
            });
        },
        pause : function(opt, scb, fcb) {
            console.log("pause", opt);
            var self = this;
            if (!self._$audioPlay) {
                    self._$audioPlay = $("#audioPlay");
            }
            if ( self._$audioPlayStatus == self.ended
                || self._$audioPlayStatus == self.none) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            self._$audioPlay[0].pause();
            self._$audioPlayStatus = self.paused;
            scb && scb({
                    "result" : 0, //0 成功 1失败
                    "message" : "Success" //信息
            });
        },
        stop : function(opt, scb, fcb) {
            console.log("stop", opt);
            var self = this;
            if (!self._$audioPlay) {
                    self._$audioPlay = $("#audioPlay");
            }
            self._$audioPlay[0].src= "";
            self._$audioPlay[0].play();
            self._$audioPlayStatus = self.none;
            scb && scb({
                    "result" : 0, //0 成功 1失败
                    "message" : "Success" //信息
            });
        },
        getPlayerStatus : function(opt, scb, fcb) {
            console.log("getPlayerStatus", opt);
            var self = this; 
           
            scb && scb({
                    "result" : 0, 
                    "message" : "Success",
                    "content" : self._$audioPlayStatus
            });
        },         
        getDuration : function(opt, scb, fcb) {
            console.log("getDuration", opt);
            var self = this; 
            
            if (!self._$audioPlay) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }             
            scb && scb({
                    "result" : 0, 
                    "message" : "Success",
                    "content" : self._$audioPlay[0].duration * 1000                    
            });
        },
        getCurrentPosition : function(opt, scb, fcb) {
            console.log("getCurrentPosition", opt);
            var self = this; 
            
            if (!self._$audioPlay) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }             
            scb && scb({
                    "result" : 0, 
                    "message" : "Success",
                    "content" : self._$audioPlay[0].currentTime * 1000                    
            });
        },
        setVolume : function(opt, scb, fcb) {
            console.log("setVolume", opt);
            var self = this; 
            
            if (!self._$audioPlay) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
             if (isNaN(opt.volume)) {                
                 fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
            if (opt.volume <0 || opt.volume > 100) {                
                 fcb && fcb({
                    "result": -2,
                    "message": "volume value is out of range"                    
                });
                return;
            }
            self._$audioPlay[0].volume = opt.volume / 100;
            scb && scb({
                    "result" : 0, 
                    "message" : "Success"                    
            });
        },        
        seekTo : function(opt, scb, fcb) {
            console.log("seekTo", opt);
            var self = this; 
            
            if (!self._$audioPlay) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
             if (isNaN(opt.position)) {                
                 fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
             if (opt.position < 0) {                
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
            if (self._$audioPlay[0].duration * 1000 < opt.position){
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            
            self._$audioPlay[0].currentTime = opt.position / 1000;
            scb && scb({
                    "result" : 0, 
                    "message" : "Success"                    
            });
        },
        photoToAlbum : function(opt, scb, fcb) {
            console.log("photoToAlbum", opt);            
             scb && scb({
                    "result" : 0,
                    "message" : "Success"                    
            });
        },
        getImageMeta : function(opt, scb, fcb) {
            console.log("getImageMeta", opt);            
             scb && scb({
                "result" : 0,
                "message" : "Success",
                "content" : {
                    "width" : 123, 
                    "height" : 123, 
                    "size" : 12321342, 
                    "lastModifiedTime" : 1372256612240 
                }
            });
        },
        getImageBase64 : function(opt, scb, fcb) {
            console.log("getImageBase64", opt);            
             scb && scb({
                "result" : 0,
                "message" : "Success",
                "content" : {
                    "width" : 123, 
                    "height" : 123, 
                    "size" : 12321342, 
                    "lastModifiedTime" : 1372256612240 
                }
            });
        },
        resizeImage : function(opt, scb, fcb) {
            console.log("resizeImage", opt);            
            scb && scb({
               "result" : 0,
               "message" : "Success",
               "content" : {
                    "path" : "file:///D:/file/1xxx.jpg"
               }
            });
        },
        trimImage : function(opt, scb, fcb) {
            console.log("trimImage", opt);            
            scb && scb({
               "result" : 0,
               "message" : "Success",
               "content" : {
                    "path" : "file:///D:/file/1xxx.jpg"
               }
            });
        },
        rotateImage : function(opt, scb, fcb) {
            console.log("rotateImage", opt);            
            scb && scb({
               "result" : 0,
               "message" : "Success",
               "content" : {
                    "path" : "file:///D:/file/1xxx.jpg"
               }
            });
        }
    };
    
    simulator.apis.mediaService = mediaService;
})();