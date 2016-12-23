(function() {
    var NetworkStatus = {
        
        getConnectionInfo : function(opt, scb, fcb) {
        	scb && scb("3g");
        }   
    };
    
    simulator.apis.NetworkStatus = NetworkStatus;
})();


