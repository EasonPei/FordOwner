//Emap cordova.js on Simulator

window.cordova = {
	exec : function(successCallback, failedCallback, serviceName, actionName, optionArr) {
		console.log(serviceName, actionName, JSON.stringify(optionArr[0]))
		parent.simulator.exec(serviceName, actionName, optionArr[0], successCallback, failedCallback);
	},
	fireDocumentEvent : function(type, data) {
		var evt = document.createEvent('Events');
		evt.initEvent(type, false, false);
		if (data) {
			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					evt[i] = data[i];
				}
			}
		}
		document.dispatchEvent(evt);
	}
}


window.onload = function() {
	var ev = document.createEvent('HTMLEvents');
	ev.initEvent('deviceready', false, false);
	document.dispatchEvent(ev)
}
//cordova提供的接口模拟
navigator.notification = {
	beep : function(times) {
		cordova.exec(null, null, "cordova", "beep", [{
			times : times
		}])
	},
	vibrate : function(time) {
		cordova.exec(null, null, "cordova", "vibrate", [{
			time : time
		}])
	}
}
navigator.camera = {
	getPicture : function(scb, fcb, opt) {
		cordova.exec(scb, fcb, "cordova", "getPicture", [opt])
	}
}

navigator.accelerometer = {
	getCurrentAcceleration : function(scb, fcb, opt) {
		setTimeout(function() {
			scb && scb({
				"x" : 0,
				"y" : 0,
				"z" : 0,
				"timestamp" : new Date().getTime()
			})
		}, 1)
	}
}

navigator.compass = {
	getCurrentHeading : function(scb, fcb, opt) {
		setTimeout(function() {
			scb && scb({
				"magneticHeading" : 0,
				"trueHeading" : 0,
				"headingAccuracy" : 0,
				"timestamp" : new Date().getTime()
			})
		}, 1)
	}
}

window.device = {
	name : "",
	platform : "",
	uuid : "",
	version : "4.0",
	webModel : true
}