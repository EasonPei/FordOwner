/*********************************
 Copyright, 2014 Ford Motor Company

 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.

 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.

 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

(function() {

	amGloble.page.dealer_mapview = new $.am.Page({
		id : "dealer_mapview",

		init : function() {
			var self = this;

			this.backButtonOnclick = function() {
				$.am.changePage(amGloble.page.getDashboardPage(), "slideright");
			};

			this.$header.find(".searchbutton").vclick(function() {
        if(amGloble.setting.market.code == "JP"){
        $.am.changePage(amGloble.page.dealer_search_JP, "slideleft");
        return;
        }
				$.am.changePage(amGloble.page.dealer_search, "slideleft");
			});
			this.$.find(".round_tab > .list").vclick(function() {
				$.am.changePage(amGloble.page.dealer_listview, "slideright", {
					"noRefresh" : true
				});
			});

			this.$.find(".clas_dealerInfo > .left").vclick(function() {
				if (self._thisIndex > 0 && self._aShowListDatas && self._aShowListDatas.length > 0) {
					self._thisIndex = parseInt(self._thisIndex, 10) - 1;
					self._dealerLocatorMoveToCenter(self._thisIndex);
				}
			});
			this.$.find(".clas_dealerInfo > .right").vclick(function() {
				if (self._aShowListDatas && self._aShowListDatas.length > 0 && self._thisIndex < (self._aShowListDatas.length - 1)) {
					self._thisIndex = parseInt(self._thisIndex, 10) + 1;
					self._dealerLocatorMoveToCenter(self._thisIndex);
				}
			});
			//call dealer
			self.$.find("div.clas_callDealer").vclick(function() {
				var phoneNum = ($(this).data().phone).toString().replace(/-|\s/g, "");
				var phoneList = phoneNum.split('|');

				var data = amGloble.generateTrackData(
                    "owner app:dealer locator:map",
                    "",
                    "",
                    "",
                    "dealer info:phone",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:dealer locator:map:dealer info cta",data);

				if (phoneList.length > 1) {
					var list = [];
					for (var i = 0; i < phoneList.length; i++) {
						list.push({
							phoneNumber : phoneList[i]
						});
					}
					amGloble.popupMenu(i18n.DEALER_LOCATOR_VOICE_CALL, list, "phoneNumber", function(ret) {
						emap.dail({
							"number" : ret.phoneNumber,
							"autoDial" : false
						}, function(ret) {
							console.log("scb", ret);
						}, function(ret) {
							console.log("fcb", ret);
						});
					});
				} else {
					emap.dail({
						"number" : phoneNum,
						"autoDial" : false
					}, function(ret) {
						console.log("scb", ret);
					}, function(ret) {
						console.log("fcb", ret);
					});
				}
			});

			self.$.find("div.dealerEmail").vclick(function() {
				var email = ($(this).data().email);
				var emailList = email.split(/\||,|;/g);

				var data = amGloble.generateTrackData(
                    "owner app:dealer locator:map",
                    "",
                    "",
                    "",
                    "dealer info:email",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:dealer locator:map:dealer info cta",data);

				if (emailList.length > 1) {
					var list = [];
					for (var i = 0; i < emailList.length; i++) {
						list.push({
							email : emailList[i]
						});
					}
					amGloble.popupMenu(i18n.DEALER_LOCATOR_ACTION_EMAIL, list, "email", function(ret) {
						emap.email({
							to : [ret.email],
						}, function(ret) {
							console.log("scb", ret);
						}, function(ret) {
							console.log("fcb", ret);
						});
					});
				} else {
					emap.email({
						to : [email],
					}, function(ret) {
						console.log("scb", ret);
					}, function(ret) {
						console.log("fcb", ret);
					});
				}

			});

			//show dealer detail
			self.$.find("div.clas_dealerDetailBtn").vclick(function() {
				var index = parseInt($(this).attr("data-index"));
				var params = {
					"index" : index,
					"dealerDatas" : self._aShowListDatas
				};
				if (index !== "" && self._aShowListDatas[index] != undefined) {
					var data = amGloble.generateTrackData(
                        "owner app:dealer locator:map",
                        "",
                        "",
                        "",
                        "dealer info:detail",
                        false,
                        false,
                        false,
                        false,
                        false);
                    amGloble.trackAction("owner app:dealer locator:map:dealer info cta",data);
					$.am.changePage(amGloble.page.dealer_detail, "slideleft", params);
				} else {
					amGloble.msg("Dealer detail missing!");
				}
			});

			this.$.find(".filterbutton").vclick(function() {
				var data = amGloble.generateTrackData(
                    "owner app:dealer locator:map",
                    "",
                    "",
                    "",
                    "dealer info:filter",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:dealer locator:map:dealer info cta",data);
				self.$.find(".filterpopbox").toggle('normal');
			});

			var map = null;
			var directionsManager = null;
			var dealerLocatorLocationList = null;
		},

		//before page show
		beforeShow : function(params) {
			var self = this;

//			ADB.trackAction("Switch 'List and Map'", {
//				"Market" : amGloble.setting.lang.site,
//				"Language" : amGloble.setting.lang.code,
//				"Page" : "Dealer Locator ",
//				"Username" : amGloble.userinfo.username,
//				"Bussiness Data" : {
//					"Search Condition" : null,
//					"View Type" : "Map View"
//				}
//			});

			if (amGloble.setting.lang.service && amGloble.setting.lang.service.length > 0) {
				var ullist = this.$.find(".filterpopbox ul");
				if (ullist.find("li").length == 1) {
					$.each(amGloble.setting.lang.service, function() {
						ullist.append('<li class="am-clickable" data-filter="' + this + '"><p>' + this + '</p></li>');
					});
				}
			}

			var isChina = (amGloble.setting.market.name=="China");
            if(isChina){
                var ullist = self.$.find(".filterpopbox ul");
                if (ullist.find("li").length == 1) {
                    ullist.append('<li class="am-clickable" data-filter="category1"><p class="category1">长安福特经销商和进口车</p></li>');
                    ullist.append('<li class="am-clickable" data-filter="category2"><p class="category2">长安福特经销商</p></li>');
                    ullist.append('<li class="am-clickable" data-filter="category3"><p class="category3">江铃福特经销商</p></li>');
                }
            }

			this.$.find(".filterpopbox li").off().vclick(function() {
				console.log($(this).data("filter"));
				self.$.find(".filterpopbox").toggle('normal');

				amGloble.page.dealer_listview._filter = $(this).data("filter");
				amGloble.page.dealer_listview.getDealerDatas(1);

				var intervalId = setInterval(function() {
					if (amGloble.page.dealer_listview._processing == false) {
						self._thisIndex = 0;
						self._aShowListDatas = amGloble.page.dealer_listview._aFavListDatas;
						if (self._aShowListDatas && self._aShowListDatas.length > 0) {
							amGloble.maps.currentMapRun(self.loadMapView);
							self.$.find("#mapDiv,.clas_dealerInfo").show();
							self.$.find(".noresultblock").remove();
						} else {
							self._noResultFound();
						}

						clearInterval(intervalId);
					}
				}, 1000);
			});
			//this.GetMap();

			if (params && params.hasOwnProperty("index")) {
				self._thisIndex = params.index
			}
			if (params && params.dealerDatas) {
				self._aShowListDatas = params.dealerDatas;
				self._showDealerInfo(0);
				
			}

			var data = amGloble.generateTrackData(
                "owner app:dealer locator:map",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:dealer locator:map",data);

		},

		//after page show
		afterShow : function() {
			var self = this;

			if (self._aShowListDatas) {
				amGloble.maps.currentMapRun(self.loadMapView);
				self.$.find("#mapDiv,.clas_dealerInfo").show();
				self.$.find(".noresultblock").remove();
			} else {
				self._noResultFound();
			}

			var container = this.$.find(".am-touchable");
			var map = this.$.find(".am-body-inner>.map");
			map.height(container.height() * 0.65);
			var dealerInfo = this.$.find(".clas_dealerInfo");
			var listItem = dealerInfo.find(".list-item");
			dealerInfo.height(listItem[0].offsetHeight);
			this.scrollview && this.scrollview.refresh();
		},
		//before page hide
		beforeHide : function() {
		},
		//after page hide
		afterHide : function() {
			this.$.find(".filterpopbox").hide();
		},

		_aShowListDatas : undefined,
		_thisIndex : undefined,

		GetMap : function() {
			// Initialize the map
			map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
				credentials : amGloble.maps.bingMapKey,
				showScalebar : false,
				showMapTypeSelector : false,
				showDashboard : false,
				//for test
				//center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9
			});
			//this.dealerLocatorLoaded();

			//显示多个点
			dealerLocatorLocationList = new Array();
			dealerLocatorLocationList.push(new Microsoft.Maps.Location(47.592, -122.332));
			dealerLocatorLocationList.push(new Microsoft.Maps.Location(47.622, -122.312));
			dealerLocatorLocationList.push(new Microsoft.Maps.Location(47.512, -122.322));
			dealerLocatorLocationList.push(new Microsoft.Maps.Location(47.529, -122.352));
			dealerLocatorLocationList.push(new Microsoft.Maps.Location(47.595, -122.292));
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				callback : this.dealerLocatorLoaded
			});
			//查讯
			//Microsoft.Maps.loadModule('Microsoft.Maps.Search',  { callback:this.searchModuleLoaded });

			//通过当前位置获得address
			// Microsoft.Maps.loadModule('Microsoft.Maps.Search',  { callback:function(){
			// 	// Initialize the location provider
			// 	var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
			// 	 // Get the user's current location
			// 	 geoLocationProvider.getCurrentPosition({successCallback:amGloble.page.dealer_mapview.displayCenter});
			// } });

		},

		displayCenter : function(args) {
			// Display the user location when the geo location request returns
			alert(i18n.DEALER_LOCATOR_USERLOCATIONIS + args.center);
			var searchManager = new Microsoft.Maps.Search.SearchManager(map);
			var reverseGeocodeRequest = {
				location : args.center,
				count : 10,
				callback : amGloble.page.dealer_mapview.reverseGeocodeCallback,
				errorCallback : amGloble.page.dealer_mapview.displayError
			};
			searchManager.reverseGeocode(reverseGeocodeRequest);
		},

		themesModuleLoaded : function() {
			// Load the map using the Bing theme style.
			map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
				credentials : amGloble.maps.bingMapKey,
				center : new Microsoft.Maps.Location(47.5, -122.3),
				zoom : 9,
				theme : new Microsoft.Maps.Themes.BingTheme()
			});

		},

		dealerLocatorMoveToCenter : function(i) {
			// Center the map on the location
			map.setView({
				center : dealerLocatorLocationList[i],
				zoom : 10
			});

		},

		dealerLocatorLoaded : function() {
			// Define the pushpin location
			//var loc = new Microsoft.Maps.Location(47.592, -122.332);
			$.each(dealerLocatorLocationList, function(i, loc) {
				var pin = new Microsoft.Maps.Pushpin(loc);
				map.entities.push(pin);
			})
			// for (var loc in dealerLocatorLocationList) {
			// 	var pin = new Microsoft.Maps.Pushpin(loc);
			// 	map.entities.push(pin);
			// };
			// Add a pin to the map

			// Center the map on the location
			map.setView({
				center : dealerLocatorLocationList[0],
				zoom : 10
			});

		},

		searchModuleLoaded : function() {
			//Address check coordinates
			var searchManager = new Microsoft.Maps.Search.SearchManager(map);
			var geocodeRequest = {
				where : "Redmond, WA",
				count : 10,
				callback : amGloble.page.dealer_mapview.geocodeCallback,
				errorCallback : amGloble.page.dealer_mapview.displayError
			};
			searchManager.geocode(geocodeRequest);
			//Coordinate to check the address
			var reverseGeocodeRequest = {
				location : new Microsoft.Maps.Location(47.5, -121.5),
				count : 10,
				callback : amGloble.page.dealer_mapview.reverseGeocodeCallback,
				errorCallback : amGloble.page.dealer_mapview.displayError
			};
			searchManager.reverseGeocode(reverseGeocodeRequest);
		},

		geocodeCallback : function(geocodeResult, userData) {
			alert("The first geocode result is " + geocodeResult.results[0].name + ".");
			var pin = new Microsoft.Maps.Pushpin(geocodeResult.results[0].location);
			map.entities.push(pin);
			// Center the map on the location
			map.setView({
				center : geocodeResult.results[0].location,
				zoom : 10
			});
		},

		reverseGeocodeCallback : function(result, userData) {
			alert("The first result is " + result.name + ".");
		},

		//unit = "mi" or "km"
		//usage : this.getDistance((new Microsoft.Maps.Location(-35.116698, 145.91319)) , this._aAllPositions[i],"km");
		getDistance : function(loc1, loc2, unit) {
			var routeRequest = "http://dev.virtualearth.net/REST/v1/Routes?wp.0=" + loc1.latitude + "," + loc1.longitude + "&wp.1=" + loc2.latitude + "," + loc2.longitude + "&distanceUnit=" + unit + "&optmz=distance&output=json&key=" + amGloble.maps.bingMapKey;

			var sample = $.ajax({
				url : routeRequest, //url
				type : "GET",
				dataType : "json",
				contentType : "application/json",
				timeout : amGloble.setting.market.timeout || 30000,
				success : function(ret) {
					//distance
					console.log("Distance : " + ret.resourceSets[0].resources[0].travelDistance + ret.resourceSets[0].resources[0].distanceUnit);
				},
				error : function(ret) {
					console.log(ret);
				}
			});
		},

		displayError : function(e) {
			// Display the error message
			alert(e);

			// If the error is a disambiguation error, display the results.
			// if (e.responseCode == Microsoft.Maps.Directions.RouteResponseCode.waypointDisambiguation)
			// {
			//    DisplayDisambiguation();
			// }
		},
		loadMapView : function() {
			amGloble.page.dealer_mapview._theMapObj = amGloble.page.dealer_mapview._theMapObj || amGloble.page.dealer_mapview._GetMap();
			amGloble.page.dealer_mapview._showAllPositions();
		},
		_theMapObj : undefined,
		_GetMap : function() {
			var currentMap = amGloble.maps.currentMap();
			var map = null;
			if (currentMap == 2) {
				//google
				var mapOptions = {
					center : new google.maps.LatLng(-34.397, 150.644),
					zoom : 13,
					zoomControlOptions : {
						style : google.maps.ZoomControlStyle.SMALL,
						position : google.maps.ControlPosition.TOP_RIGHT
					},
					mapTypeControl : false,
					streetViewControl : false,
					mapTypeId : google.maps.MapTypeId.ROADMAP
				};
				map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
				document.getElementById("mapDiv").addEventListener('touchstart', function(e) {
					e.stopPropagation();
				});
				document.getElementById("mapDiv").addEventListener('mousedown', function(e) {
					e.stopPropagation();
				});
				if(amGloble.setting.market.code == "VN"){
					map.setOptions({
	                    styles: [
	                        {
	                            "featureType": "poi",
	                            "elementType": "labels",
	                            "stylers": [
	                                { "visibility": "off" }
	                            ]
	                        },{
	                            "featureType": "poi.attraction",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.government",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.medical",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.park",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.place_of_worship",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.school",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "poi.sports_complex",
	                            "stylers": [
	                                { "visibility": "on" }
	                            ]
	                        },{
	                            "featureType": "water",
	                            "elementType": "geometry",
	                            "stylers": [
	                                { "invert_lightness": true},
	                                { "visibility": "simplified"},
	                                { "color": "#97a1e8"}
	                            ]
	                        },{
	                            "featureType": "water",
	                            "elementType": "labels",
	                            "stylers": [
	                                { "visibility": "simplified"},
	                                { "invert_lightness": true},
	                                { "color": "#97a1e8"}
	                            ]
	                        }
	                    ]
	                });
				}
				
			} else if (currentMap == 1) {
				//bing
				map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
					credentials : amGloble.maps.bingMapKey,
					showScalebar : false,
					showMapTypeSelector : false,
					showDashboard : false,
					//for test
					//center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9
				});
			} else if (currentMap == 3) {
				//autonavi map
				api = new AutoNaviAPI({imagePath: "/content/gux_content/", dealerKey: '55adb0c7e4b0a76fce4c8dd6', autocompleteCallbackURL: '', autocompleteCallbackName: ''});
        		map = new api.map(document.getElementById('mapDiv'),
        		 {center: {lat: 39.909231, lng: 116.397428}, zoom: 6});
        		document.getElementById("mapDiv").addEventListener('touchstart', function(e) {
					e.stopPropagation();
				});
				document.getElementById("mapDiv").addEventListener('mousedown', function(e) {
					e.stopPropagation();
				});
			}
			return map;
		},
		_getUserCurrentPosition : function(callback) {
			var self = this;
			var currentMap = amGloble.maps.currentMap();
			if (currentMap == 2) {
				//google
			} else if (currentMap == 1) {
				//bing
				self._theMapObj = self._theMapObj || self._GetMap();
				// Initialize the location provider
				var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(self._theMapObj);
				// Get the user's current location
				geoLocationProvider.getCurrentPosition({
					successCallback : function(res) {
						console.log(res);
						if (callback && typeof (callback) == "function") {
							callback(res);
						}
					}
				});
			}
		},
		_aAllPositions : undefined,
		_showAllPositions : function() {
			//show some locations
			var self = this;
			self._aAllPositions = new Array();
			var currentMap = amGloble.maps.currentMap();
			if (currentMap == 2) {
				//google
				for (var i = 0,
				    len = self._aShowListDatas.length; i < len; i = i + 1) {
					self._aAllPositions.push(new google.maps.LatLng(self._aShowListDatas[i].latitudeLongitude.latitude, self._aShowListDatas[i].latitudeLongitude.longitude));
				}
				self._dealerLocatorLoaded(self._thisIndex);
			} else if (currentMap == 1) {
				//bing
				for (var i = 0,
				    len = self._aShowListDatas.length; i < len; i = i + 1) {
					self._aAllPositions.push(new Microsoft.Maps.Location(self._aShowListDatas[i].latitudeLongitude.latitude, self._aShowListDatas[i].latitudeLongitude.longitude));
				}

				Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
					callback : function() {
						self._dealerLocatorLoaded(self._thisIndex);
					}
				});
			}
			else if (currentMap == 3) {
				//autonavi
				for (var i = 0,
				    len = self._aShowListDatas.length; i < len; i = i + 1) {
					self._aAllPositions.push({"lat":self._aShowListDatas[i].latitudeLongitude.latitude,
					 "lng":self._aShowListDatas[i].latitudeLongitude.longitude});
				}

				self._dealerLocatorLoaded(self._thisIndex);
				// Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
				// 	callback : function() {
				// 		self._dealerLocatorLoaded(self._thisIndex);
				// 	}
				// });
			}

		},
		_dealerLocatorMoveToCenter : function(i) {
			// Center the map on the location
			var currentMap = amGloble.maps.currentMap();
			if (currentMap == 2) {
				//google
				this._theMapObj.setCenter(this._aAllPositions[i]);
			} else if (currentMap == 1) {
				//bing
				this._theMapObj.setView({
					center : this._aAllPositions[i],
					zoom : 10
				});
			} else if (currentMap == 3) {
				//autonavi
				this._theMapObj.setCenter(this._aAllPositions[i]);
				this._theMapObj.setZoom(12);
			}

			this._showDealerInfo(i);
		},
        _aGoogleMapMarkers : undefined,                                 
		_dealerLocatorLoaded : function(i) {
			var self = this;
			// Define the pushpin location
			var currentMap = amGloble.maps.currentMap();
			if (currentMap == 2) {
				//google
				if(typeof self._aGoogleMapMarkers == "undefined"){
					self._aGoogleMapMarkers = [];
				}
				$.each(self._aGoogleMapMarkers, function(i, marker){
					marker.setMap(null);
				})
				self._aGoogleMapMarkers = [];
				$.each(self._aAllPositions, function(i, loc) {
					var marker = new MarkerWithLabel({
						position : loc,
						map : self._theMapObj,
						icon : "img/dealerlocator/icon_location.png",
						//title: (i + 1).toString(),
						labelContent : (i + 1).toString(),
						labelAnchor : new google.maps.Point(9, 45),
						labelClass : "dealer_mapview_labels", // the CSS class for the label
						labelInBackground : false
					});
					self._aGoogleMapMarkers.push(marker);
				})
				self._dealerLocatorMoveToCenter(i);
			} else if (currentMap == 1) {
				self._theMapObj.entities.clear();
				//bing
				$.each(self._aAllPositions, function(i, loc) {
					var pin = new Microsoft.Maps.Pushpin(loc, {
						text : (i + 1).toString()
					});
					self._theMapObj.entities.push(pin);
				})
				// Center the map on the location
				//self._theMapObj.setView({center: this._aAllPositions[0], zoom: 10});
				self._dealerLocatorMoveToCenter(i);
			} else if (currentMap == 3) {
				self._theMapObj.clearDealers();
				//autonavi
				$.each(self._aAllPositions, function(i, loc) {
					var oItemDatas = self._aShowListDatas[i];
					var category = oItemDatas.dealerCategory? oItemDatas.dealerCategory: '';
					var m =document.createElement("div");
					m.className ="dealer_mapview_autonavi_labels_"+category;//设置了样式类名，页面style标签中要定义名为label的样式类
					var n =document.createElement("span");
					n.innerHTML = (i + 1).toString();//要显示的文本标注的内容
					m.appendChild(n);
					self._theMapObj.addGuxMarker(loc,null, m, null);
				})
				// Center the map on the location
				self._dealerLocatorMoveToCenter(i);
			}
		},
		_showDealerInfo : function(i) {
			var self = this;
			var oItemDatas = self._aShowListDatas[i];
			var number = "",
				category = "",
			    distance = "",
			    title = "",
			    contact = "",
			    address = "",
			    dealerCode = "",
			    phoneNum = "",
			    email = "";
			if (oItemDatas) {
				number = i + 1;
				category = oItemDatas.dealerCategory? oItemDatas.dealerCategory: '';
				distance = oItemDatas.distance ? oItemDatas.distance : '';
				title = oItemDatas.dealershipName;
				contact = oItemDatas.phoneNumber1.split('|')[0] + (oItemDatas.email?('  |  ' + oItemDatas.email.split(/\||,|;/g)[0]):'');
				address = oItemDatas.addressLine1 + ', ' + (oItemDatas.city?(oItemDatas.city + ', '):'') + (oItemDatas.state?(oItemDatas.state + ', '):'') + (oItemDatas.country?(oItemDatas.country + ', '):'') + oItemDatas.postcode;
				dealerCode = oItemDatas.dealerCode;
				phoneNum = oItemDatas.phoneNumber1;
				email = oItemDatas.email?oItemDatas.email:'';
			}

			self.$.find(".clas_dealerInfo > .list-item").attr("data-uid", uid);
			self.$.find(".clas_dealerInfo .distance-bullet > .number").html(number);
			self.$.find(".clas_dealerInfo .distance-bullet > .number").removeClass("category1").removeClass("category2").removeClass("category3");
			if (category) {
                self.$.find(".clas_dealerInfo .distance-bullet > .number").addClass(category); 
            };
			self.$.find(".clas_dealerInfo .distance-bullet > .distance").html(distance);
			self.$.find(".clas_dealerInfo .locator-detail > .title").html(title);
			self.$.find(".clas_dealerInfo .locator-detail .clas_callDealer").data("phone", phoneNum);
			if(amGloble.setting.market.code == "JP" || email==''){
				self.$.find(".clas_dealerInfo .locator-detail .dealerEmail").hide();
			}
			else{
				self.$.find(".clas_dealerInfo .locator-detail .dealerEmail").show();
			}
			self.$.find(".clas_dealerInfo .locator-detail .dealerEmail").data("email", email);
			self.$.find(".clas_dealerInfo .locator-detail .clas_dealerDetailBtn").attr("data-index", i);
			self.$.find(".clas_dealerInfo .locator-detail .contact").html(contact);
			self.$.find(".clas_dealerInfo .locator-detail .address").html(address);

			var uid = oItemDatas && oItemDatas.uid;
			self._showFavtag(uid);
		},
		_showFavtag : function(uid) {
			var $info = this.$.find(".clas_dealerInfo > .list-item");
			if (amGloble.userinfo.profile && amGloble.userinfo.profile.username) {
				var userName = amGloble.userinfo.profile.username;
			}
			var favDealer = JSON.parse(localStorage.getItem("favorite_dealer"));

			if (favDealer && favDealer.userName == userName && favDealer.dealerInfo.uid == uid) {
				$info.addClass("favourate");
			} else {
				$info.removeClass("favourate");
			}
		},

		_noResultFound : function() {
			var self = this;
			var html = '<div class="noresultblock"><span class="icon-warnblack"></span><p>' + i18n.DEALER_SEARCH_NORESULT_TEXT + '</p></div>';
			this.$.find(".am-body-inner>.map").append(html);
			this.$.find("#mapDiv,.clas_dealerInfo").hide();
			this.refresh();

			var data = amGloble.generateTrackData(
                "owner app:dealer locator:search:no results",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:dealer locator:search:no results",data);
		}
	});

})();
