(function() {
	var securityService = {
		storePwd : function(opt, scb, fcb) {
			if (opt.name) {
				localStorage.setItem("emap_securityService_" + opt.name, opt.pwd);
				scb && scb();
			} else {
				fcb && fcb();
			}
		},
		getPwd : function(opt, scb, fcb) {
			if (opt.name) {
				scb && scb({
					content : localStorage.getItem("emap_securityService_" + opt.name)
				});
			} else {
				fcb && fcb();
			}
		}
	};

	simulator.apis.securityService = securityService;
})();

