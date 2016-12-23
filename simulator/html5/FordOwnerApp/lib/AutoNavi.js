//v1.0.7
	
	function AutoNaviAPI(config){

		var	imagePath = "img/dealerlocator/";
		var	dealerTableKey = config.dealerKey;
		var	autocompleteServiceURL = config.autocompleteCallbackURL;
		var	autocompleteCallback = config.autocompleteCallbackName;
		var markerImages = config.markerImages || {};
		var markerImagesAttribute = config.markerImagesAttribute;
		var countryBounds = config.countryBounds;
		
		var	autocompleteDealerList = [];
		var dealerSearchPolygon = [];
		var punctuationRegex = /[\!"#\$%&'\(\)\*\+`\-\.\/\:;\<\=\>\?@\[\\\]\^_'\{\|\}~]/g;
		
		//Set up dealer table
		if(autocompleteServiceURL) {
			jsonpRequest(autocompleteServiceURL);
		}

		window[autocompleteCallback] = function(dealers) {
			autocompleteDealerList = dealers;
		};
		
		//Set up the dealer search polygon.
		if(countryBounds) {
		
			for(var i = 0; i < countryBounds.length; i++) {
				if(countryBounds[i].lat && countryBounds[i].lng) {			
					var boundsPoint = new AMap.LngLat(countryBounds[i].lng, countryBounds[i].lat);			
					dealerSearchPolygon.push(boundsPoint);
				}
			}
		
			if(!(countryBounds[0].lat === countryBounds[countryBounds.length-1].lat && countryBounds[0].lng === countryBounds[countryBounds.length-1].lng)) {
				var closingBoundsPoint = new AMap.LngLat(countryBounds[0].lng, countryBounds[0].lat);	
				bounds.push(closingBoundsPoint);
			}
		}
		else{
			var arr2 = new Array();				
			//lat: 56.875638 lng 146.50546  //north east
			//lat: 9.237021  lng 72.589445  //south west									
			arr2.push(new AMap.LngLat(146.50546, 56.875638));  //ne (east, north);
			arr2.push(new AMap.LngLat(146.50546, 9.237021 ));  //ne (east, south);
			arr2.push(new AMap.LngLat(72.589445, 9.237021 ));  //sw (west, south);
			arr2.push(new AMap.LngLat(72.589445, 56.875638));  //sw (west, north);
			arr2.push(new AMap.LngLat(146.50546, 56.875638));  //ne (east, north);
			dealerSearchPolygon = arr2;
		}	

       /**
		* Creates an autoNaviMap object. Wraps an AMap.Map object, also contains list of markers
        * @param {String} element: the ID of the HTML element to place the map in
        * @param {Object} options: a set of options. 
        */
		function autonaviMap(element, options){
			var startCenter = new AMap.LngLat(options.center.lng, options.center.lat);
			this.map = new AMap.Map(element, {
				center: startCenter, 
				level: options.zoom,
				dragEnable:true,
	        	zoomEnable:true} );
			this.markers = [];
            this.dealers = [];
			this.autoCompleteTimeout = null;
		}	


	   /**
		* Reverse geo-codes a co-ordinate and uses the output in the callback function        
        * @param {number} lat: the latitidue of the co-ordinate
		* @param {number} lng: the longitude of the co-ordinate
        * @param {function} callback: the function the reverse-geocoded string will be given to. 
        */
        autonaviMap.prototype.reverseGeocode = function(latlng, callback) {

            var MGeocoder;

			this.map.plugin(["AMap.Geocoder"], function() {      

				MGeocoder = new AMap.Geocoder({ radius: 1000,extensions: "all"});

                MGeocoder.getAddress(new AMap.LngLat(latlng.lng, latlng.lat), function(status, result){

					if(status === 'complete' && result.info === 'OK'){
					
						callback(result.regeocode.formattedAddress);      
						
					}					
                });
			});
		};

	   /**
		* Geo-codes a string and uses the output in the callback function        
        * @param {string} location: the location, eg: "北京市海淀区苏州街"
        * @param {function} callback: the callback function (should be able to deal with an array). 
        */
		autonaviMap.prototype.geocodeLocation = function(location, callBack) {
		    var MGeocoder;
            var locations = [];

		    AMap.service(["AMap.Geocoder"], function() {        
		        MGeocoder = new AMap.Geocoder({
		            //city:"010", 	//Default, national
		            radius:1000 	//Default is 500
                });

		        MGeocoder.getLocation(location, function(status, result){

		        	if(status === 'complete' && result.info === 'OK'){

						var resultStr="";
		    			var geocode = new Array();
		    			geocode = result.geocodes;  
						
            			for (var i = 0; i < geocode.length; i++) {

							var addressComps = [];
							var testObj = geocode[i].addressComponent;

							for (var key in testObj) {
    							if (testObj.hasOwnProperty(key)) {
        							var val = testObj[key];

                        			if(val){
										addressComps.push({long_name: val, types: key});
									}
    							}
							}

							locations.push({
                                lat: 			geocode[i].location.getLat(), 
								lng:  			geocode[i].location.getLng(),
								description: 	geocode[i].formattedAddress,
                                types:			[geocode[i].level],
                                address_components: addressComps
                            });
		    			} 
                        callBack(locations);
		        	}
		        });
		    });
		}  


	   /**
		* Creates a GuxMarker and adds it to the map marker list.        
        * @param {Object} latlng: the location as a pair of numbers"
		* @param {String} infoWindowContent: content to put into the marker's pop up window, if applicable
        */
		autonaviMap.prototype.addGuxMarker = function(latlng, label, infoWindowContent, callBack, images){
			var marker = new autonaviMarker(this, new AMap.LngLat(latlng.lng, latlng.lat), label, infoWindowContent, callBack, images);
			this.markers.unshift(marker);
			return marker;
		};
		

	   /**
	    * Adds a new listener
		*/
		autonaviMap.prototype.addListener = function(target, event, handler){
			return AMap.event.addListener(target, event, handler);		
		};

		
	   /**
	    * Removes a specified listener
		*/
		autonaviMap.prototype.removeListener = function(listener){
			AMap.event.removeListener(listener);
		};
		
		
	   /**
	    * Triggers the given event
		*/
		autonaviMap.prototype.trigger = function(instance, event){
			AMap.event.trigger(instance, event);
		};
		
		
	   /**
		* Creates a basic marker object directly from AutoNavi api and returns it.        
        * @param {Object} latlng: the location of the marker as a pair of numbers
	    * @return {AMap.Marker} newMarker: the simple marker
        */
		autonaviMap.prototype.addMarker = function(latlng){
			var newMarker = new AMap.Marker({map: this.map, position: new AMap.LngLat(latlng.lng, latlng.lat), icon: imagePath + "0.png"});	
			return newMarker;
		};



	   /**
	    * Given an index, selects the marker at that location in the list		
	    * @param {number} index: the location in the marker array of the desired marker
		*/
		autonaviMap.prototype.selectMarker = function(index){
			this.markers[index].select();
		};


	   /**
	    * Given an index, deselects the marker at that location in the list	
	    * @param {number} index: the location in the marker array of the desired marker
		*/	
		autonaviMap.prototype.deselectMarker = function(index){
			this.markers[index].deselect();
		};



	   /**
	    * Deselects all markers. Also hides any open info-windows.
		*/	
		autonaviMap.prototype.deselectMarkers = function(){
			for(var i = 0; i < this.markers.length; i++){

				this.markers[i].hideInfoWindow();
				this.markers[i].deselect();
			}
		};

		
		/**
		 * Clears all dealers.
		 */
		autonaviMap.prototype.clearDealers = function(){			
			this.map.clearMap();
			this.markers = [];
		};


	   /**
	    * Returns the center point of the map.
		* @return: {Object} the latitude and longitude, as a pair of numbers
		*/	
		autonaviMap.prototype.getCenter = function(){
			var x = this.map.getCenter();			
			return {lat: x.getLat(), lng: x.getLng() };
		};	


	   /**
		* Sets the center point of the map 
		* @param {Object} latlng: the desired center of the map as a pair of numbers
		*/
		autonaviMap.prototype.setCenter = function(latlng){
			var x = new AMap.LngLat(latlng.lng, latlng.lat);
			this.map.setCenter(x);
		}
		

	   /**
	    * Returns the zoom level of the map
		* @return: {number} a numeric representation of the map level.
		* 0 is the most zoomed out, 15 in the most zoomed in.
		*/	
		autonaviMap.prototype.getZoom = function(){
			return (this.map.getZoom()-3);
		}

		
	   /**
	    * Sets the map zoom level.
		* @param {number} zoomLevel: the desired map level.
		* 0 is the most zoomed out, 15 is the most zoomed in.
		*/	
		autonaviMap.prototype.setZoom = function(zoomLevel){
		
			zoomLevel += 3;
		
			if(zoomLevel > 18){
				zoomLevel = 18;
			}
			if(zoomLevel < 3){
				zoomLevel = 3;
			}			
			this.map.setZoom(zoomLevel);
		}

		
	   /**
		* Sets / Pans the desired new map center point
		* @param {Object} latlng: the desired center of the map as a pair of numbers
		* @TODO: TEST VS SETCENTER 
		*/
		autonaviMap.prototype.panTo = function(latlng){
			var x = new AMap.LngLat(latlng.lng, latlng.lat);
			this.map.panTo(x);
		}

		
	   /**
		* Returns the map bounds as a pair of co-ordinates (north-east, and south-west)
		* @return {Object} an object of two lat-lng objects
		*/
		autonaviMap.prototype.getBounds = function(){
			var bounds = this.map.getBounds();
			var ne = bounds.getNorthEast();
			var sw = bounds.getSouthWest();
			return{ ne: {lat: ne.getLat(), lng: ne.getLng()}, sw: {lat: sw.getLat(), lng: sw.getLng()}  };
		}


	   /**
		* Find a list of dealers having searched by distance and search options. Passes dealers into callBack function.
		* @param {Object} origin: a lat / lng object specifying where to place the center of the search
		* @param {number} radius: int value representing radius of search in KM.
		* @param {number} limit: int value representing number of dealers to return. Null returns all relevant dealers.
		* @param {Object} matchParameters: A set of key:value pairs (Strings) that are used for exact-matching AND-based filtering.
		* 				OR_CLAUSES: An optional array of match Params for OR searching.
		* @param {object} containsParameters: A set of ket:value pairs (String) that are used for AND-based substring filtering.
		* @param callBack: function to deal with the dealer data.
		*/
        autonaviMap.prototype.searchDealersByDistance = function(origin, radius, limit, callBack, matchParameters, containsParameters){
            var arr = new Array();    
			var center = new AMap.LngLat(origin.lng, origin.lat);
			var self = this;
   			var search; 
			var matchParamString = '';
			var keyWordString = '';
			var matchORClauses;
			var matchNOTClauses = [];
			var numResults;
			
	
			//Seperate OR_CLAUSES for later use.
			if(matchParameters['OR_CLAUSES']){
				matchORClauses = matchParameters['OR_CLAUSES'];
				delete matchParameters['OR_CLAUSES'];
			}
			
			//Build up match param string for initial filtering of results autoNavi-side.
			for (var filtVal in matchParameters) {
				if (matchParameters.hasOwnProperty(filtVal)) {												
					if (filtVal.indexOf('!') == -1){
														
						if(matchParamString != ''){
							matchParamString += " + ";
						}				
						matchParamString += filtVal + ':' + matchParameters[filtVal];
					
					} else if (filtVal.indexOf('!') === 0){
					
						var x = {};					
						x[filtVal.slice(1)] = matchParameters[filtVal];
						
						matchNOTClauses.push(x);											
					}														
				}
			}
			
			//keywords uses containsParams, filter uses matchParams.
            var searchOptions = {
				orderBy:'_distance:ASC',
                keywords: '',					
				filter: matchParamString,
				pageSize: 100				
   			};

      		AMap.service(["AMap.CloudDataSearch"], function() {     

        		search = new AMap.CloudDataSearch(dealerTableKey, searchOptions);

				//Search using the previous options.
        		search.searchNearBy(center, (radius * 1000), function(status, result){
	
            		if(status === 'complete' && result.info === 'OK'){
															
						var returnedDealers = filterListByContainsSubString(result.datas, containsParameters);
						
						if(matchORClauses){
							returnedDealers = filterListByOrClauseMatches(returnedDealers, matchORClauses);
						}
						
						if(matchNOTClauses){
							returnedDealers = filterListByNotClauseMatches(returnedDealers, matchNOTClauses);
						} 
						
						if(returnedDealers.length > 0){
						
							if(!limit){
								numResults = returnedDealers.length;	
							} else {
								if(limit > returnedDealers.length){
									numResults = returnedDealers.length;
								} else {
									numResults = limit;
								}
							}
						
							for(var i = 0; i < numResults; i++){
							
								var dealer = returnedDealers[i];
								
								dealer.location = {
									lat: dealer._location.lat,
									lng: dealer._location.lng
								};
								
								dealer.distance = dealer._distance;
							
								arr.push(dealer);		
							}
							
							callBack(arr);
						}
            		}
            		else{
            			callBack([]);
            		}
        		});
    		});
        };
	
		//TODO: There is duplicate code prior to search. Consider putting into a seperate method.
        autonaviMap.prototype.searchDealersByProperties = function(limit, callBack , matchParameters, containsParameters){
            var arr = new Array();    		
			var self = this;
   			var search; 
			var matchParamString = '';
			var keyWordString = '';
			var matchORClauses;
			var matchNOTClauses = [];
			var numResults;
			
			//Seperate OR_CLAUSES for later use.
			if(matchParameters['OR_CLAUSES']){
				matchORClauses = matchParameters['OR_CLAUSES'];
				delete matchParameters['OR_CLAUSES'];
			}

			if(matchParameters['KEYWORD']){
				keyWordString = matchParameters['KEYWORD'];
				delete matchParameters['KEYWORD'];
			}
			
			//Build up match param string for initial filtering of results autoNavi-side.
			for (var filtVal in matchParameters) {
				if (matchParameters.hasOwnProperty(filtVal)) {												
					if (filtVal.indexOf('!') == -1){
														
						if (matchParamString != ''){
							matchParamString += " + ";
						}				
						matchParamString += filtVal + ':' + matchParameters[filtVal];
					
					} else if (filtVal.indexOf('!') === 0){
					
						var x = {};					
						x[filtVal.slice(1)] = matchParameters[filtVal];
						
						matchNOTClauses.push(x);											
					}														
				}
			}
			
									
			//keywords uses containsParams, filter uses matchParams.
            var searchOptions = {
				//orderBy:'_id:ASC',
                keywords: keyWordString,					
				filter: matchParamString,
				pageSize: 100
   			};
							
      		AMap.service(["AMap.CloudDataSearch"], function() {     
								
					var searchOptions = {
						orderBy:'_id:ASC',
						keywords: keyWordString,					
						filter: matchParamString,
						pageSize: 100
					};
				
					search = new AMap.CloudDataSearch(dealerTableKey, searchOptions);

					search.searchInPolygon(dealerSearchPolygon, function(status, result){
		
						if(status === 'complete' && result.info === 'OK'){
						
							
							var returnedDealers = filterListByContainsSubString(result.datas, containsParameters);							
														
							if(matchORClauses){
								returnedDealers = filterListByOrClauseMatches(returnedDealers, matchORClauses);
							} 
															
							if(matchNOTClauses){
								returnedDealers = filterListByNotClauseMatches(returnedDealers, matchNOTClauses);
							}
																				
							if(returnedDealers.length > 0){
							
								if(!limit){
									numResults = returnedDealers.length;	
								} else {
									if(limit > returnedDealers.length){
										numResults = returnedDealers.length;
									} else {
										numResults = limit;
									}
								}
							
								for(var i = 0; i < numResults; i++){									
									var dealer = returnedDealers[i];
								
									dealer.location = {
										lat: dealer._location.lat,
										lng: dealer._location.lng
									};
							
									arr.push(dealer);		
								}	
							}
							callBack(arr);							
						}
						else{
	            			callBack([]);
	            		}													
					});									
    		});
        };	

	
		autonaviMap.prototype.autoComplete = function(text, limit, callback, type){
		
			var predictions = { dealers: [], locations: [] };		
			var searchDealers = type.indexOf('dealers') !== -1;			//True if not -1 (in text) false otherwise.
			var searchLocations = type.indexOf('locations') !== -1;
			var delay = 300;
		
			if(this.autocompleteTimeout) {
				clearTimeout(this.autocompleteTimeout);
			}
		
			this.autocompleteTimeout = setTimeout(function() {
		
				//if type is only 'dealers', or type is neither
				if(( searchDealers && !searchLocations ) || (!searchDealers && !searchLocations) ){
				
					var dealerMatches = [];
					var dealerMatch;
				
					//for dealers in autoComplete
					for (var i = 0; i < autocompleteDealerList.length; i++) {
					
						if(autocompleteMatch(autocompleteDealerList[i].n, text) !== -1) {
					
							dealerMatch = {
								DealerName: autocompleteDealerList[i].n,
								EntityID: autocompleteDealerList[i].e
							};
							
							if(autocompleteMatch(autocompleteDealerList[i].n, text) === 0) {
								//if exact match, add to start of array
								dealerMatches.splice(0, 0, dealerMatch);
							} else {
								//if partial match, add to end of array
								dealerMatches.push(dealerMatch);
							}
						}
					};
					predictions.dealers = dealerMatches.slice(0, limit);
				} 
				
				if((!searchDealers && searchLocations ) || (!searchDealers && !searchLocations) ){
				
					AMap.service(["AMap.Autocomplete"], function() {
						
						var autoOptions = { city: "" };
						auto = new AMap.Autocomplete(autoOptions);
						
						auto.search(text, function(status, result){
						
							if(status === 'complete' && result.info === 'OK'){
														
								var placeMatches = [];
								var placeMatch;
															
								for(var i = 0; i < result.tips.length; i++){
									
									var placeInf = result.tips[i];
										
									placeMatch = {
										placeId: placeInf.id,
										placeName: placeInf.name
									}
								
									placeMatches.push(placeMatch); 							
								}
									
								predictions.locations = placeMatches.slice(0, limit);
									
								callback(predictions);																
							} 
						});        		        
					});
				}
				
				if(( searchDealers && !searchLocations )) {
					callback(predictions);
				}
			}, delay);
		};
			
	   /**
		* Alters the bounds of the map (if applicable) based on a list of bounds.
        * If the bounds are outside the bounds of the current zoom-level, the map
        * will zoom out until all points fit. Likewise, if all points are can within
        * the map bounds at a higher level of zoom, the map will zoom in.
		* @param {Object Array} boundArray : An array of co-ordinates. 
		* Array must be of length 2 or longer.
		*/
		autonaviMap.prototype.setBounds = function(boundArray){

			//Bounds must be of length 2, or (greater with first + last elements equal)
			if(boundArray.length >= 2 ){
				
				var neLat = 0;
				var neLng = 0;
				var swLat = 0;
				var swLng = 0;

				for(var i = 0; i < boundArray.length; i++){
					neLat += boundArray[i].lat;
					neLng += boundArray[i].lng;
				}

				//Use size of array to get average points to function as starting values
				neLat = neLat / boundArray.length;
				neLng = neLng / boundArray.length;
				swLat = neLng;
				swLng = neLng;		

				for(var i = 0; i < boundArray.length; i++){

					var x = new AMap.LngLat(boundArray[i].lng, boundArray[i].lat);

					if(x.lat > neLat){
						neLat = x.lat;
					}
					if(x.lat < swLat){
						swLat = x.lat;
					}
					if(x.lng > neLng){
						neLng = x.lng;
					}
					if(x.lng < swLng){
						swLng = x.lng;
					}			
				}
				var newBounds = new AMap.Bounds(new AMap.LngLat(swLng, swLat), new AMap.LngLat(neLng, neLat));
				this.map.setBounds(newBounds);
			}
		}

	   /**
		* Constructor for the autonaviMarker object.     
        * @param {Object} m: the map
		* @param {AMap.LatLng} pos: the location of the marker
        * @param {String} infoWindowContent: text content for the marker popup, if applicable
		* @param callback: the callback function.
        */
		function autonaviMarker(m, pos, label, infoWindowContent, callback, images){	
		
			this.inactiveImage = images && images.inactive ? images.inactive : 'icon_location.png';
			this.activeImage = images && images.active ? images.active : 'icon_location.png';
			this.marker = new AMap.Marker({
				map: m.map, 
				position: pos, 
				icon: imagePath + 'icon_location.png', 
				selected: false,
				 content: infoWindowContent,
				 offset:new AMap.Pixel(0,0)

				
			});	
			// this.label = label;
			// this.content = infoWindowContent;
			// this.window = new autonaviInfoWindow(infoWindowContent, pos);
			this.callback = callback;
			var self = this;
			
			// if(this.infoWindowContent != ''){
			
			// 	m.addListener(this.marker, 'click', function(){
			// 		m.deselectMarkers();
			// 		self.showInfoWindow();
			// 		self.select();
			// 	});
			// }
			
			if(this.callback){
				m.addListener(this.marker, 'click', function(){														
					self.callback();
				});
			}						
		}
		
	   /**
		* Selects the marker
		*/
		autonaviMarker.prototype.select = function(){
			this.marker.selected = true;
			this.marker.setContent('<div class="map-marker"><img src="' + imagePath + this.activeImage + '"><span class="marker-label">' + this.label + '</span></div>');

		};

	   /**
		* Deselects the specified marker
		*/
		autonaviMarker.prototype.deselect = function(){
			this.marker.selected = false;
			this.marker.setContent('<div class="map-marker"><img src="' + imagePath + this.inactiveImage + '"><span class="marker-label">' + this.label + '</span></div>');

		};
		

	   /**
        * Gets the marker position as an object
        * @return lat and lng, as a co-ordinate pair
        */ 
		autonaviMarker.prototype.getPosition = function(){
			var x = this.marker;
			return{ lat: x.lat, lng: x.lng };
		};


	   /**
        * Opens the infoBox pertaining to the marker.
        */
		autonaviMarker.prototype.showInfoWindow = function(){
			this.window.infoBox.open(this.marker.getMap(), this.marker.getPosition());
		};


	   /**
        * Opens the infoBox pertaining to the marker.
        */
		autonaviMarker.prototype.hideInfoWindow = function(){
			this.window.infoBox.close();
		};

		
	   /**
       	* Constructor for the autoNavi InfoWindow wrapper object
        */
		function autonaviInfoWindow(windowContent, pos){		
			this.infoBox = new AMap.InfoWindow({ content:	'<div class="info-window">' + windowContent + '</div>',
												 offset: new AMap.Pixel(200, 180),
												 isCustom:  true, 
												 autoMove:	true,
												 position: 	pos});			
		};

		
	   /**
		* This function takes an array of dealer objects and adds pushpin markers for each dealer to the map. 
		* Any previously displayed pushpins will be cleared from the map before the new markers are displayed.
		* @param {Array} dealers: the dealers array
		*/
		autonaviMap.prototype.displayDealers = function(dealers){
			this.clearDealers();
			var dealerList = dealers;
			for(var i = 0; i < dealerList.length; i++){
				this.addGuxMarker({lat: dealerList[i]._location.lat, lng: dealerList[i]._location.lng}, (i+1).toString(), dealerList[i].infoWindowMarkup, dealerList[i].callback, markerImages[dealerList[i][markerImagesAttribute]]);
			}
		};

		
		autonaviMap.prototype.getDirectionsMobileURL = function(destination, origin){
		
			var start,
			    end,
				blankParams;
		
			start = origin ? 'saddr=' + origin.lng + ',' + origin.lat : '';
			end =  '&daddr=' + destination.lng + ',' + destination.lat;
			blankParams = '&saddr_lonlat=&daddr_lonlat=&maddr=&sort=&addPassing=remove'
		
			return 'http://m.amap.com/navigation/carmap/' + start + end + blankParams; 
		
		};
		
		
		autonaviMap.prototype.getDirectionsURL = function(destination, origin) {
			
			var start,
				end;

			start = origin ? 'from[name]=' + origin.lng + ',' + origin.lat + '&from[lnglat]=' + origin.lng + ',' + origin.lat + '&from[id]=from&' : '';
			end = 'to[name]=' + destination.lng + ',' + destination.lat + '&to[lnglat]=' + destination.lng + ',' + destination.lat;

			return 'http://ditu.amap.com/?type=car&policy=5&to[id]=to&' + start + end;
		};

		autonaviMap.prototype.getAddressDirectionsURL = function(destinationDealer, addressFormat, origin) {
			var start,
				end,
				addressLines = [];

			start = origin ? 'from[name]=' + origin.description + '&from[lnglat]=' + origin.lng + ',' + origin.lat + '&from[id]=from&' : '';
			end = 'to[name]=' + destinationDealer._address + '&to[lnglat]=' + destinationDealer.location.lng + ',' + destinationDealer.location.lat;

			return 'http://ditu.amap.com/?type=car&policy=5&to[id]=to&' + start + end;
		};

		function autocompleteMatch(dealerName, searchString) {
			searchString = searchString.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			dealerName = dealerName.toLowerCase().replace(punctuationRegex, '').replace(/\s+/g, ' ').replace(/./g, characterFolding);
			return dealerName.indexOf(searchString);
		}
	
	
		function characterFolding(character) {
			var characterMap = {
				//'\u0049': '\u0131',
				'\u00B5': '\u03BC',
				'\u00DF': '\u0073\u0073',
				'\u0130': '\u0069\u0307',
				//'\u0130': '\u0069',
				'\u0149': '\u02BC\u006E',
				'\u017F': '\u0073',
				'\u01F0': '\u006A\u030C',
				'\u0345': '\u03B9',
				'\u0390': '\u03B9\u0308\u0301',
				'\u03B0': '\u03C5\u0308\u0301',
				'\u03C2': '\u03C3',
				'\u03D0': '\u03B2',
				'\u03D1': '\u03B8',
				'\u03D5': '\u03C6',
				'\u03D6': '\u03C0',
				'\u03F0': '\u03BA',
				'\u03F1': '\u03C1',
				'\u03F5': '\u03B5',
				'\u0587': '\u0565\u0582',
				'\u1E96': '\u0068\u0331',
				'\u1E97': '\u0074\u0308',
				'\u1E98': '\u0077\u030A',
				'\u1E99': '\u0079\u030A',
				'\u1E9A': '\u0061\u02BE',
				'\u1E9B': '\u1E61',
				'\u1E9E': '\u0073\u0073',
				'\u1F50': '\u03C5\u0313',
				'\u1F52': '\u03C5\u0313\u0300',
				'\u1F54': '\u03C5\u0313\u0301',
				'\u1F56': '\u03C5\u0313\u0342',
				'\u1F80': '\u1F00\u03B9',
				'\u1F81': '\u1F01\u03B9',
				'\u1F82': '\u1F02\u03B9',
				'\u1F83': '\u1F03\u03B9',
				'\u1F84': '\u1F04\u03B9',
				'\u1F85': '\u1F05\u03B9',
				'\u1F86': '\u1F06\u03B9',
				'\u1F87': '\u1F07\u03B9',
				'\u1F88': '\u1F00\u03B9',
				'\u1F89': '\u1F01\u03B9',
				'\u1F8A': '\u1F02\u03B9',
				'\u1F8B': '\u1F03\u03B9',
				'\u1F8C': '\u1F04\u03B9',
				'\u1F8D': '\u1F05\u03B9',
				'\u1F8E': '\u1F06\u03B9',
				'\u1F8F': '\u1F07\u03B9',
				'\u1F90': '\u1F20\u03B9',
				'\u1F91': '\u1F21\u03B9',
				'\u1F92': '\u1F22\u03B9',
				'\u1F93': '\u1F23\u03B9',
				'\u1F94': '\u1F24\u03B9',
				'\u1F95': '\u1F25\u03B9',
				'\u1F96': '\u1F26\u03B9',
				'\u1F97': '\u1F27\u03B9',
				'\u1F98': '\u1F20\u03B9',
				'\u1F99': '\u1F21\u03B9',
				'\u1F9A': '\u1F22\u03B9',
				'\u1F9B': '\u1F23\u03B9',
				'\u1F9C': '\u1F24\u03B9',
				'\u1F9D': '\u1F25\u03B9',
				'\u1F9E': '\u1F26\u03B9',
				'\u1F9F': '\u1F27\u03B9',
				'\u1FA0': '\u1F60\u03B9',
				'\u1FA1': '\u1F61\u03B9',
				'\u1FA2': '\u1F62\u03B9',
				'\u1FA3': '\u1F63\u03B9',
				'\u1FA4': '\u1F64\u03B9',
				'\u1FA5': '\u1F65\u03B9',
				'\u1FA6': '\u1F66\u03B9',
				'\u1FA7': '\u1F67\u03B9',
				'\u1FA8': '\u1F60\u03B9',
				'\u1FA9': '\u1F61\u03B9',
				'\u1FAA': '\u1F62\u03B9',
				'\u1FAB': '\u1F63\u03B9',
				'\u1FAC': '\u1F64\u03B9',
				'\u1FAD': '\u1F65\u03B9',
				'\u1FAE': '\u1F66\u03B9',
				'\u1FAF': '\u1F67\u03B9',
				'\u1FB2': '\u1F70\u03B9',
				'\u1FB3': '\u03B1\u03B9',
				'\u1FB4': '\u03AC\u03B9',
				'\u1FB6': '\u03B1\u0342',
				'\u1FB7': '\u03B1\u0342\u03B9',
				'\u1FBC': '\u03B1\u03B9',
				'\u1FBE': '\u03B9',
				'\u1FC2': '\u1F74\u03B9',
				'\u1FC3': '\u03B7\u03B9',
				'\u1FC4': '\u03AE\u03B9',
				'\u1FC6': '\u03B7\u0342',
				'\u1FC7': '\u03B7\u0342\u03B9',
				'\u1FCC': '\u03B7\u03B9',
				'\u1FD2': '\u03B9\u0308\u0300',
				'\u1FD3': '\u03B9\u0308\u0301',
				'\u1FD6': '\u03B9\u0342',
				'\u1FD7': '\u03B9\u0308\u0342',
				'\u1FE2': '\u03C5\u0308\u0300',
				'\u1FE3': '\u03C5\u0308\u0301',
				'\u1FE4': '\u03C1\u0313',
				'\u1FE6': '\u03C5\u0342',
				'\u1FE7': '\u03C5\u0308\u0342',
				'\u1FF2': '\u1F7C\u03B9',
				'\u1FF3': '\u03C9\u03B9',
				'\u1FF4': '\u03CE\u03B9',
				'\u1FF6': '\u03C9\u0342',
				'\u1FF7': '\u03C9\u0342\u03B9',
				'\u1FFC': '\u03C9\u03B9',
				'\uFB00': '\u0066\u0066',
				'\uFB01': '\u0066\u0069',
				'\uFB02': '\u0066\u006C',
				'\uFB03': '\u0066\u0066\u0069',
				'\uFB04': '\u0066\u0066\u006C',
				'\uFB05': '\u0073\u0074',
				'\uFB06': '\u0073\u0074',
				'\uFB13': '\u0574\u0576',
				'\uFB14': '\u0574\u0565',
				'\uFB15': '\u0574\u056B',
				'\uFB16': '\u057E\u0576',
				'\uFB17': '\u0574\u056D'
			};
			return characterMap[character] || character;
		}
		
		function filterListByContainsSubString(test, containsParameters){
			
			var dealers = [];
			
			for(var i = 0; i < test.length; i++){	
					
				var currentDealer = test[i];
				var addDealer = true;
					
				for(var containsKey in containsParameters) {
			
					if(!currentDealer[containsKey]){
						addDealer = false;
					}
			
					//if you don't have the value, false;
					if(currentDealer[containsKey] && currentDealer[containsKey].indexOf(containsParameters[containsKey]) == -1){
						addDealer = false;
					}
				}
					
				if(addDealer){
					dealers.push(currentDealer);
				}
			}
			return dealers;
		}
			
		function filterListByOrClauseMatches(test, matchORClauses){
			
			var dealers = [];
			
			//For each dealer
			for(var i = 0; i < test.length; i++){
				var currentDealer = test[i];
				var addDealer = true;	
				
				//For each OR_CLAUSE
				for(var j = 0; j < matchORClauses.length; j++){				
					var currentClause = matchORClauses[j];
					var dealerHasClause = false;			

					//For each Key-value pair in the clause
					
					for(var containsKey in currentClause){				
						
						if(currentDealer[containsKey] || currentDealer[containsKey.slice(1)]  ){
						
							if(containsKey.indexOf('!') != 0){
							
								if(currentDealer[containsKey] === currentClause[containsKey]){
									dealerHasClause = true;		
								}
								
							} else {				
							
								var slicedKey = containsKey.slice(1);						
							
								if(currentDealer[slicedKey] !== currentClause[containsKey]){
									dealerHasClause = true;		
								}
							}
						}
					}
					if(dealerHasClause == false){
						addDealer = false;
					}
				}
				if(addDealer == true){
					dealers.push(currentDealer);
				}
			}
			return dealers;	
		}
		
		function filterListByNotClauseMatches(test, matchNOTClauses){
		
			var dealers = [];
			
			for(var i = 0; i < test.length; i++){
			
				var currentDealer = test[i];
				var addDealer = true;
				
				for(var j = 0; j < matchNOTClauses.length; j++){
				
					for(var containsKey in matchNOTClauses[j]){
							
						if(currentDealer[containsKey]){
												
							if(currentDealer[containsKey] == matchNOTClauses[j][containsKey]){
						
								addDealer = false;					
							}
						}
					}
				}
				
				if(addDealer == true){
					dealers.push(currentDealer);
				}
			}
			return dealers;
		}
		
		//Return for the API object
		return {map: autonaviMap };		
	}
