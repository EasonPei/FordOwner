(function () {

    var nativeUI = {
        setAttribute: function () {
        },
        _$busy: globle.$scr.find('.comp-busyview'),
        _isBusy: false,
        startBusy: function (opt, scb, fcb) {
            var self = this;
            if (!this._isBusy) {
                this._$busy.find("#busyviewText").html(opt.caption);
                this._$busy.show();
                this._isBusy = true;

                var closeButton = this._$busy.find(".sim-button");
                closeButton.unbind().click(function () {
                    self.stopBusy();
                    fcb && fcb({
                        "result": -2,
                        "message": "User cancel"
                    });
                });
                if (opt.cancelable) {
                    closeButton.show();
                } else {
                    closeButton.hide();
                }
            }
        },
        stopBusy: function (opt, scb, fcb) {
            if (this._isBusy) {
                this._$busy.hide();
                this._isBusy = false;
            }
        },
        _$popupWebsite: null,
        popupWebsite: function (opt, scb, fcb) {
            var self = this;
            if (!this._$popupWebsite) {
                //init
                this._$popupWebsite = globle.$scr.find('.comp-popupWebsite');
            }
            this._$popupWebsite.find('.close').unbind().click(function () {
                self._$popupWebsite.hide();
            });
            this._$popupWebsite.find("#popupWebsiteIframe").attr("src", opt.url);
            this._$popupWebsite.show();
        },
        openUrl: function (opt, scb, fcb) {
            nativeUI.popupWebsite(opt, scb, fcb);
        },
        _$selectPicture: null,
        selectPicture: function (opt, scb, fcb) {
            var option = {
                quality: 75,
                destinationType: 0,
                //sourceType : 1,
                allowEdit: true,
                encodingType: 0,
                targetWidth: 100,
                targetHeight: 100,
                mediaType: 0,
                correctOrientation: true,
                saveToPhotoAlbum: false,
                cameraDirection: 0,
		returnIncludeImageType : 0
            };
            globle.extend(option, opt, true);

            var self = this;
            if (!this._$selectPicture) {
                this._$selectPicture = globle.$scr.find('.comp-selectPicture');
            }

            var input = this._$selectPicture.find("#input")[0];

            var btns = this._$selectPicture.find("span");
            btns.eq(0).unbind().click(function () {
                if (option.destinationType == 1) {
                    fcb && fcb("Not surport!");
                    self._$selectPicture.hide();
                    return;
                }

                var file = input.files[0];
                if (!/image\/\w+/.test(file.type)) {
					alert(multi_language.text.errMsg.imgType);
                } else {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        var imgData = this.result;
			if (option.returnIncludeImageType == 0) {			
			    if (option.encodingType == 0) {
				imgData = imgData.replace("data:image/jpeg;base64,", "");
			    } else {
				imgData = imgData.replace("data:image/png;base64,", "");
			    }
			}

                        scb && scb(imgData);
                        self._$selectPicture.hide();
                    };
                }
            });
            btns.eq(1).unbind().click(function () {
                fcb && fcb("closed by user");
                self._$selectPicture.hide();
            });
            this._$selectPicture.show();
        },
        readQRcode: function () {

        },       
        _$comboBox: null,
        showPopupMenu: function (opt, scb, fcb) {
            console.log(opt);
            var self = this;

            if (!this._$comboBox) {
                this._$comboBox = globle.$scr.find(".comp-showComboBox");
            }

            var html = [];
            $(opt.items).each(function (i, item) {
                html.push("<li>" + item.caption + "</li>");
            });
            this._$comboBox.find("ul").html(html.join(""));
            this._$comboBox.show();
            this._$comboBox.find("li").unbind().bind("click", function () {
                var idx = self._$comboBox.find("li").index($(this));
                self._$comboBox.hide();
                //eval('globle.$mobilet.' + opt.items[idx].action);
                //return false;
                scb && scb({
                    "result": 0,
                    "message": "Success",
                    "content": idx
                });
            });

            this._$comboBox.find("span").unbind().click(function () {
                fcb && fcb({
                    "result": -2,
                    "message": "Canceled by user"
                });
                self._$comboBox.hide();
            });
        },
        showComboBox: function (opt, scb, fcb) {
            var self = this;
            if (!this._$comboBox) {
                this._$comboBox = globle.$scr.find(".comp-showComboBox");
            }

            var html = [];
            $(opt.items).each(function (i, item) {
                html.push("<li>" + item.caption + "</li>");
            });
            this._$comboBox.find("ul").html(html.join(""));
            this._$comboBox.show();
            this._$comboBox.find("li").unbind().bind("click", function () {
                var idx = self._$comboBox.find("li").index($(this));
                console.log(opt.items[idx]);
                scb && scb({
                    "result": 0,
                    "message": "Success",
                    "content": idx
                });
                self._$comboBox.hide();
                return false;
            });

            this._$comboBox.find("span").unbind().click(function () {
                fcb && fcb({
                    "message": "Canceled by user",
                    "result": -2
                });
                self._$comboBox.hide();
            });
        },
        _$datePicker: null,
        datePicker: function (opt, scb, fcb) {
            console.log(opt);
            if (!this._$datePicker) {
                this._$datePicker = $('<input style="display:none" />').appendTo("body").mobiscroll().date({
                    theme: 'ios',
                    display: 'bottom',
                    mode: 'scroller',
                    dateOrder: 'mmD ddyy'
                });
            }
            this._$datePicker.mobiscroll("option", {
                minDate: opt.minDate ? new Date(new Number(opt.minDate)) : parseDate("1900-01-01"),
                maxDate: opt.maxDate ? new Date(new Number(opt.maxDate)) : parseDate("2099-12-31"),
                onSelect: function (ret) {
                    scb && scb({
                        result: 0,
                        message: 'Success',
                        content: new Date(ret).getTime()
                    });
                },
                onCancel: function () {
                    fcb && fcb({
                        result: -2,
                        message: "cancel"
                    });
                }
            }).mobiscroll("setDate", opt.selected ? new Date(new Number(opt.selected)) : new Date(), true).mobiscroll('show');
        },
        _$timePicker: null,
        timePicker: function (opt, scb, fcb) {
            console.log(opt);
            if (!this._$timePicker) {
                this._$timePicker = $('<input style="display:none" />').appendTo("body").mobiscroll().time({
                    theme: 'ios',
                    display: 'bottom',
                    mode: 'scroller',
                    timeFormat: "HH:ii",
                    timeWheels: "HH:ii"
                });
            }
            this._$timePicker.mobiscroll("option", {
                onSelect: function (ret) {
                    scb && scb({
                        result: 0,
                        message: 'Success',
                        content: Date.parse('2000-01-01 ' + ret)
                    });
                },
                onCancel: function () {
                    fcb && fcb({
                        result: -2,
                        message: "cancel"
                    });
                }
            }).mobiscroll("setDate", opt.selected ? new Date(new Number(opt.selected)) : new Date(), true).mobiscroll('show');
        },
        _$barcode: null,
        readBarcode: function (opt, scb, fcb) {
            var self = this;    
	   
	    var timer = null;
	    
	    simulator.apis.camera.cameraGetPicture({
		quality : 20,
		destinationType : 0,					
		allowEdit : true,
		encodingType : 1,
		showCapture : 0
		},
	    null,
	    function(ret) {
		if (timer) {
		    clearInterval(timer);
		}
		
		fcb && fcb({
		    "result": -2,
		    "message": "closed by user"
		});
	    },
	    function () {	
		var handler = function()
		{		    
		    qrcode.callback = function(a){			
			console.log("callback:" + a );
			
			if (a == "error decoding QR Code") {
			    return;
			}
			
			clearInterval(timer);
			simulator.apis.camera.hideCamera();			
			scb && scb({
			    "result": 0,
			    "message": "Success",
			    "content": a
			});			
			return;
		    };
		    var imageData = simulator.apis.camera.capturePic();
		    //var imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+AQMAAADY7TfLAAAABlBMVEUAAAD///+l2Z/dAAAAtUlEQVRIib2U0Q3EMAhDkRggI2V1RsoAkTiwq/TuPz5UVfT9WLgGs65pI3zZW7eBZ+YimNWqwLJu8bS+Emz7CxjpUgALCb48vQwYh/r6zcdlkKg94mk0oMbK1SN2k2EaALEoxoBvDai4bcN7JOIgAaXmSEGpOzxVAKRgclOhLAFMAZS5qRJwoo1/ZSLwrGmnL2y0hRLA85mBEUMK+uT09kw1OBZKACx0LmseTy8DxqEEeXI04AMvrQ9RiB0begAAAABJRU5ErkJggg==";
		    
		    console.log(imageData);		    
		    qrcode.decode(imageData);
		};
		console.log("setInterval start");
		timer = setInterval(handler , 2000);
		console.log("setInterval");
	    });	    	    
        },
        _$map: null,
        _$allmap: null,
        showMap: function (opt, scb, fcb) {
            var self = this;
            if (!this._$map) {
                this._$map = globle.$scr.find('.comp-map');
            }

            var point = new BMap.Point(opt.longitude, opt.latitude);
            if (!this._$allmap) {
                this._$allmap = new BMap.Map("allmap");               		
            }
	    
	    this._$allmap.centerAndZoom(point, 15);
	    this._$allmap.enableScrollWheelZoom();
	    
	    var marker1 = new BMap.Marker(point);  
		this._$allmap.addOverlay(marker1);
		
	    if (opt.label) {
		var infoWindow1 = new BMap.InfoWindow(opt.label);		
				   
		marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
		
		
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent('click', true, false);
		marker1.dispatchEvent(evObj);
	    }	

            //this._$allmap.setCenter(point);

            scb && scb({
                "result": 0,
                "message": "Success"
            });

            this._$map.find('.close').unbind().click(function () {
                self._$map.hide();
            });
            this._$map.show();
        },
        viewFile: function (opt, scb, fcb) {
            simulator.apis.emapNotification.showMessageBox({ caption: 'File Path', description: opt.path }, null, null);
            scb && scb({
                "result": 0,
                "message": "Success"
            });
        },
	
	_$searchList : null,	
        openSearchList: function (opt, scb, fcb) {
	    var self = this;
            if (!this._$searchList) {
                this._$searchList = globle.$scr.find('.comp-search');
            }	    
	    this._$searchList.find('.return').unbind().click(function () {
                self._$searchList.hide();
		fcb && fcb({
		    "result": -2,
		    "message": "User cancel"
		});		
            });
	    
	    this._$searchList.find('input').val('');
	    this._$searchList.find('input').bind("input",function() {		
		var val = $.trim($(this).val()).toUpperCase();				
		_renderList(val);
	    });
	    
	    this._$searchList.find('#searchTitleText').html(opt.title);
	    
	    for (i in opt.items) {
		opt.items[i].index = i;		
	    }
	    
	    var tempHeight = this._$searchList.height() - 80;
	    this._$searchList.find('.searchGroup').height(tempHeight);	    
	    
	    var sortData = _sort(opt.items);	    	   	   
	    
	    var _renderList = function(key){
		var data = null;
		if (key) {
		    data = $(sortData).filter(function (i, item) {
			
			var searchKey = item["key"];			
			if (!searchKey) {			
			    searchKey = item["text"];
			}
			
			if (searchKey.toUpperCase().search(key) >= 0) {
			    return true;
			}
		        return false;
		    });
		} else {
		    data = $(sortData);
		}
		
		var lgn = "";	    		
		var dl = self._$searchList.find('dl');
		dl.empty();
			
		data.each(function(i, item) {
		    var $dt = $('<dt></dt>');
		    var $dd = $('<dd class=\'am-clickable\'></dd>');
		    
		    var groupByValue =item["groupBy"];
		    if (!groupByValue) {
			//groupByValue = item["text"];
			groupByValue = "#";
		    }
		    var gn = groupByValue.toUpperCase().charAt(0);
		    if (alpha(gn) == false)
		    {
			gn = "#";
		    }
		    if (!lgn || lgn != gn) {
			    $dt.html(gn).appendTo(dl);
		    }
		    lgn = gn;
		    
		    $dd.html(item.text);
		    $dd.data("item", item);
		    dl.append($dd);
		    
		    $dd.unbind().bind("click", function() {		
			var data = $(this).data("item");
			
			self._$searchList.hide();
			
			scb && scb({
				"result": 0,
				"message": "Success",
				"content" : parseInt(item.index)
			});
			return false;
		    });	
		});
	   };
	    
	     _renderList();
	    
	    this._$searchList.show();
        }
    };

    function parseDate(input, format) {
        format = format || 'yyyy-mm-dd';        
        var parts = input.match(/(\d+)/g), i = 0, fmt = {};        
        format.replace(/(yyyy|dd|mm)/g, function (part) {
            fmt[part] = i++;
        });

        return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
    }
    
    function alpha(check)
    {
	return ((('a'<=check) && (check<='z')) || (('A'<=check) && (check<='Z')))
    }

    var _sort = function(data) {	
	return data.sort(function asc(x, y) {
		var xValue = x["groupBy"];
		if (!xValue) {
		    //xValue = x["text"];
		    xValue = "#";
		}
		if (alpha(xValue.toUpperCase().charAt(0))== false)
		{
		    xValue = "#";
		}		
		var a = xValue.toUpperCase().charCodeAt(0);
		
		
		var yValue = y["groupBy"];
		if (!yValue) {
		    //yValue = y["text"];
		    yValue = "#";
		}
		if (alpha(yValue.toUpperCase().charAt(0))== false)
		{
		    yValue = "#";
		}
		var b = yValue.toUpperCase().charCodeAt(0);
		
		return a - b;
	});
    };
    

    simulator.apis.nativeUI = nativeUI;
})();
