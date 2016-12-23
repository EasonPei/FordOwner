(function() {
	var pns = {
		regPNS : function(opt, scb, fcb) {
			console.log("regPNS: " + JSON.stringify(opt));
			scb && scb({
				content : true
			});
		},
		unRegPNS : function(opt, scb, fcb) {

		}
	};

	simulator.apis.pns = pns;
})();

