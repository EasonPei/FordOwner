(function() {
    var recordService = {
        
        none : 0,
        recording : 1,
        _$audioRecord: 0,
        _$audioRecordStartTime: null,        
        startAudioRecord : function(opt, scb, fcb) {
            console.log("startAudioRecord", opt);
            var self = this;             
            self._$audioRecord = self.recording;
            self._$audioRecordStartTime = new Date().getTime();
            scb && scb({
                "result" : 0, 
                "message" : "Success" 
            });
        },
        stopAudioRecord : function(opt, scb, fcb) {
            console.log("stopAudioRecord", opt);
            var self = this;             
            self._$audioRecord = self.none;
            scb && scb({
                "result" : 0, 
                "message" : "Success", 
                "content" : {
                    "path" : "file:///E:/audio/" + new Date().getTime() + ".mp3", 
                    "duration" : 16000
                }
            });
        },
        getAudioRecorderDuration : function(opt, scb, fcb) {
            var self = this; 
            if (self._$audioRecord == self.none) {
                fcb && fcb({
                    "result": 1,
                    "message": "Failed"                    
                });
                return;
            }
            scb && scb({
                "result" : 0, 
                "message" : "Success", 
                "content" : new Date().getTime() - self._$audioRecordStartTime
            });
        },
        getAudioRecorderStatus : function(opt, scb, fcb) {
            var self = this;  
            scb && scb({
                "result" : 0, 
                "message" : "Success", 
                "content" : self._$audioRecord
            });
        }   
    };
    
    simulator.apis.recordService = recordService;
})();


