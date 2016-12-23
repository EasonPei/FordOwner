/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function() {

    amGloble.page.dealer_listview = new $.am.Page({
        id: "dealer_listview",

        init: function() {
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

            this.$.find(".round_tab > .map").vclick(function() {
                if (self._aFavListDatas == undefined || self._aFavListDatas.length == 0) {
                    amGloble.msg(i18n.DEALER_LOCATOR_NODETAULS);
                } else {
                    $.am.changePage(amGloble.page.dealer_mapview, "slideleft", {
                        "dealerDatas": self._aFavListDatas,
                        "index": 0
                    });
                }
            });

            this.$.find(".filterbutton").vclick(function() {
                var data = amGloble.generateTrackData(
                    "owner app:dealer locator:list",
                    "",
                    "",
                    "",
                    "dealer info:filter",
                    false,
                    false,
                    false,
                    false,
                    false);
                amGloble.trackAction("owner app:dealer locator:list:dealer info cta",data);
                self.$.find(".filterpopbox").toggle('normal');
            });

        },
        //before page show
        beforeShow: function(params) {
            var self = this;
            this._error = null;
            emap.checkGPS(null,
            function() {},
            function() {
                self._userPosition = {
                    latitude: null,
                    longitude: null
                };
            });

            var currentMap = amGloble.maps.currentMapDispatchRun();
            if(currentMap==0){
                //nomap, hide tabbar
                this.$.find(".round_tab").hide();
                //this.$.find(".filterbutton").hide();
                this.$.addClass("noMap");
            }

            if (params && params.noRefresh) {
                //self.showList();
                return;
            } else {
                self._aAllListDatas = null;
                self._aShowListDatas = null;
                self._aFavListDatas = null;
                this.$.find(".clas_dealerList").empty();

                if (params && params.searchUrl) {
                    if (amGloble.setting.lang.service && amGloble.setting.lang.service.length > 0) {
                        var ullist = self.$.find(".filterpopbox ul");
                        if (ullist.find("li").length == 1) {
                            $.each(amGloble.setting.lang.service,
                            function() {
                                ullist.append('<li class="am-clickable" data-filter="' + this + '"><p>' + this + '</p></li>');
                            });  
                        }
                    }

                    self.$.find(".filterpopbox li").off().vclick(function() {
                        console.log($(this).data("filter"));
                        self.$.find(".filterpopbox").toggle('normal');
                        self._filter = $(this).data("filter");
                        self.getDealerDatas(1);
                    });

                    self._searchUrl = null;
                    self._filter = null;
                    if (params && params.searchUrl) { //search
                        self._searchUrl = params.searchUrl;
                    }
                    self.getDealerDatas(1);
                } else {
                    emap.checkGPS(null,
                    function() {
                        self.dotheRealWork(params);
                    },
                    function() {
                        amGloble.loading.hide();
                        emap.alert({
                            caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                            description: i18n.DEALER_LOCATOR_GPS_ERROR,
                            okCaption: i18n.DEALER_LOCATOR_GPS_OK
                        },
                        function() {
                            self._searchUrl=null;
                            // self._noResult();
                        });

                    });
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
            }

            var data = amGloble.generateTrackData(
                "owner app:dealer locator:list",
                "",
                "",
                "",
                "",
                false,
                false,
                false,
                false,
                false);
            amGloble.trackPage("owner app:dealer locator:list",data);

        },
        dotheRealWork: function(params) {
            var self = this;
            emap.startBusy({
                caption: i18n.DEALER_LOCATOR_LOCATING,
                cancelable: true
            });
            var _createListByAddress = function(position, country) {
                self._userPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                if (country == "China" || country == "中国") {
                    //hardcode部分市场的坐标
                    self.getUserPosition();
                }

                amGloble.loading.hide();

                if (amGloble.setting.lang.service && amGloble.setting.lang.service.length > 0) {
                    var ullist = self.$.find(".filterpopbox ul");
                    if (ullist.find("li").length == 1) {
                        $.each(amGloble.setting.lang.service,
                        function() {
                            ullist.append('<li class="am-clickable" data-filter="' + this + '"><p>' + this + '</p></li>');
                        });
                    }
                }

                self.$.find(".filterpopbox li").off().vclick(function() {
                    console.log($(this).data("filter"));
                    self.$.find(".filterpopbox").toggle('normal');
                    self._filter = $(this).data("filter");
                    self.getDealerDatas(1);
                });

                self._searchUrl = null;
                self._filter = null;
                if (params && params.searchUrl) { //search
                    self._searchUrl = params.searchUrl;
                }
                self.getDealerDatas(1);
            };

            amGloble.maps.currentMapDispatchRun(function() {
                //amGloble.loading.hide();
                // var loc_none = {coords:{latitude:20,longitude:105}};
                // _createListByAddress(loc_none,amGloble.setting.market.name);
                // return;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        _createListByAddress(position,amGloble.setting.market.name);
                    },
                    function(error) {
                        amGloble.loading.hide();
                        self._noResult();
                    },
                    {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    });
                } else {
                    amGloble.loading.hide();

                    emap.alert({
                        caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                        description: i18n.DEALER_LOCATOR_GPS_ERROR,
                        okCaption: i18n.DEALER_LOCATOR_GPS_OK
                    },
                    function() {
                        self._noResult();
                    });
                }
            },
            function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var loc_Bing = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
                        amGloble.maps.currentAddress(loc_Bing,
                        function(address, country) {
                            _createListByAddress(position, country);
                        },
                        function() {
                            amGloble.loading.hide();
                            self._somethingWrong();
                        });

                    },
                    function(error) {
                    	//if(error.code==3)
                    	amGloble.loading.hide();
                        self._noResult();
                        // {amGloble.loading.hide();
                        // emap.alert({
                            // caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                            // description: i18n.DEALER_LOCATOR_GPS_ERROR,
                            // okCaption: i18n.DEALER_LOCATOR_GPS_OK
                        // },
                        // function() {
                            // self._noResult();
                        // });
                        //}
                    },
                    {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    });
                } else {
                    amGloble.loading.hide();

                    emap.alert({
                        caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                        description: i18n.DEALER_LOCATOR_GPS_ERROR,
                        okCaption: i18n.DEALER_LOCATOR_GPS_OK
                    },
                    function() {
                        self._noResult();
                    });
                }
            },
            function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var loc_Google = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        amGloble.maps.currentAddress(loc_Google,
                        function(address, country) {
                            _createListByAddress(position, country);
                        },
                        function() {
                            amGloble.loading.hide();
                            self._somethingWrong();
                        });
                    },
                    function(error) {
                    	// if(error.code==3)
                        // {
                        	// amGloble.loading.hide();
                        // emap.alert({
                            // caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                            // description: i18n.DEALER_LOCATOR_GPS_ERROR,
                            // okCaption: i18n.DEALER_LOCATOR_GPS_OK
                        // },
                        // function() {
                            // self._noResult();
                        // });
                        // }
                        amGloble.loading.hide();
                        self._noResult();
                    },
                    {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    });
                } else {
                    amGloble.loading.hide();

                    emap.alert({
                        caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                        description: i18n.DEALER_LOCATOR_GPS_ERROR,
                        okCaption: i18n.DEALER_LOCATOR_GPS_OK
                    },
                    function() {
                        self._noResult();
                    });
                }
            },
            function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        // var loc_Bing = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
                        // amGloble.maps.currentAddress(loc_Bing,
                        // function(address, country) {
                        //     _createListByAddress(position, country);
                        // },
                        // function() {
                        //     amGloble.loading.hide();
                        //     self._somethingWrong();
                        // });
                        _createListByAddress(position, "China");
                    },
                    function(error) {
                        //if(error.code==3)
                        amGloble.loading.hide();
                        self._noResult();
                        // {amGloble.loading.hide();
                        // emap.alert({
                            // caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                            // description: i18n.DEALER_LOCATOR_GPS_ERROR,
                            // okCaption: i18n.DEALER_LOCATOR_GPS_OK
                        // },
                        // function() {
                            // self._noResult();
                        // });
                        //}
                    },
                    {
                        maximumAge: 0,
                        timeout: 15000,
                        enableHighAccuracy: true
                    });
                } else {
                    amGloble.loading.hide();

                    emap.alert({
                        caption: i18n.DEALER_LOCATOR_GPS_ERROR_TITLE,
                        description: i18n.DEALER_LOCATOR_GPS_ERROR,
                        okCaption: i18n.DEALER_LOCATOR_GPS_OK
                    },
                    function() {
                        self._noResult();
                    });
                }
            },
            function() {
                amGloble.loading.hide();
                self._searchUrl = null;
                self._somethingWrong();

            });

        },
        //after page show
        afterShow: function() {
            if (this._error) {
                $.am.changePage(amGloble.page.common_oops, "slideleft", this._error);
            }

        },
        //before page hide
        beforeHide: function() {},
        //after page hide
        afterHide: function() {
            this.$.find(".filterpopbox").hide();
            //this._userPosition = undefined;
            //this._aAllListDatas = undefined;
        },
        _processing: false, _searchUrl: null, _filter: null, _userPosition: undefined, _aAllListDatas: undefined, _aFavListDatas: undefined, _aShowListDatas: undefined, _pageIndex: 0, _error: null,

        _setNewListDatas: function(datas) {
            var self = this;
            self._aShowListDatas = datas;

            // if(typeof self._userPosition == "undefined"){
            //     self._userPosition = {
            //             latitude: 0,
            //             longitude: 0
            //         };
            // }
            //get distance
            $.each(self._aShowListDatas,
            function(i, o) {
                self._aShowListDatas[i]["distance"] = " ";
                self._aShowListDatas[i]["uid"] = self._aShowListDatas[i].dealerCode + self._aShowListDatas[i].email;
                self._aAllListDatas.push(o);
            });

            amGloble.maps.currentMapDispatchRun(function() {},
            function() {
                $.each(self._aShowListDatas,
                function(i, o) {
                    if(typeof self._userPosition != "undefined"){
                        var loc1 = new Microsoft.Maps.Location(self._userPosition.latitude, self._userPosition.longitude);
                        var loc2 = new Microsoft.Maps.Location(o.latitudeLongitude.latitude, o.latitudeLongitude.longitude);
                        self.getDistance(o.uid, loc1, loc2, "km");
                        console.log(loc1+'&&&&&'+loc2)
                    }
                });
            },
            function() {
                $.each(self._aShowListDatas,
                function(i, o) {
                    if(typeof self._userPosition != "undefined"){
                        var loc1 = new google.maps.LatLng(self._userPosition.latitude, self._userPosition.longitude);
                        var loc2 = new google.maps.LatLng(o.latitudeLongitude.latitude, o.latitudeLongitude.longitude);
                        self.getDistanceByGoogleMap(o.uid, loc1, loc2, "km");
                    }
                });

            });

            if (datas && datas.length == 5 && (amGloble.setting.market.code!="JP")) {
                this.scrollview.touchBottom = function() {
                    if (self._processing == false) {
                        self.$.find(".am-loadmore").show();
                        self.pageIndex++;
                        self.getDealerDatas(self.pageIndex);
                    }
                };
            } else {
                this.scrollview.touchBottom = function() {
                    return false
                };
            }

        },

        getDealerDatas: function(pageNum) {
            var self = this;
            var currentMap = amGloble.maps.currentMap();
            if(currentMap==3){
                //use autonavi load dealer
                return self.getDealerDatasByAutoNavi(pageNum);
            }
            
            self.pageIndex = pageNum;
            self._processing = true;
            if (pageNum && pageNum == 1) {
                self._aAllListDatas = [];
                self._aFavListDatas = [];
                self.scrollview.scrollTo("top");
                emap.startBusy({
                    caption: i18n.COMMON_LOADING,
                    cancelable: true
                });
            }

            var params = {
                "page": pageNum,
                "pagesize": 5

            };
            if(amGloble.setting.market.code=="TH"){
                params.pagesize = 10;
            }

            if(amGloble.setting.market.code=="JP"){
                params = {};
            }
            if (self._filter) {
                params.authorisedFilter = self._filter;
            }

            if (!self._searchUrl) {
                //self.getUserPosition();
                params.lat = self._userPosition?self._userPosition.latitude:null;
                params.long = self._userPosition?self._userPosition.longitude:null;
                params.radius = 200;
            }

            var serverUrl = amGloble.setting.lang.host + "/servlet/rest/dealers/ext/" + amGloble.setting.lang.site + "/nearby";
            if (self._searchUrl) {
                serverUrl = self._searchUrl;
            }

//            ADB.trackAction("Switch 'List and Map'", {
//                "Market": amGloble.setting.lang.site,
//                "Language": amGloble.setting.lang.code,
//                "Page": "Dealer Locator ",
//                "Username": amGloble.userinfo.username,
//                "Bussiness Data": {
//                    "Search Condition": params,
//                    "View Type": "List View"
//                }
//            });

            $.ajax({
                url: serverUrl,
                //接口url
                type: "GET",
                data: params,
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                success: function(ret) {
                    console.log(ret);
                    var dealers = ret.dealers;
                    if(amGloble.setting.market.code=="JP" && (ret && ret.length>0)){
                        dealers = ret;
                    }
                    if(dealers&&dealers.length>0)
                    {
                        if(amGloble.setting.market.code=="TH"){
                            var dealers_i18n = [];
                            $.each(dealers,function(i,dealer){
                                var reg = new RegExp("[\\u0E00-\\u0E7F]+","g");
                            　　if(reg.test(dealer.dealershipName)){
                                    if(amGloble.setting.lang.i18n == "th-th"){
                                        dealers_i18n.push(dealer);
                                    }         
                            　　} 
                                else{
                                    if(amGloble.setting.lang.i18n == "en-th"){
                                        dealers_i18n.push(dealer);
                                    }
                                }   
                            });
                            dealers = dealers_i18n;
                        }
                        self._setNewListDatas(dealers);
                        self.showList();
                        self.$.find(".am-loadmore").hide();
                        amGloble.loading.hide();
                        self._processing = false;
                    }
                    else
                    {
                        amGloble.loading.hide();
                        self._noNearbyResult();
                    }
                },
                error: function(ret) {
                    amGloble.loading.hide();
                    self._processing = false;
                    self._error = {
                        message: ret.statusText,
                        detail: ret
                    };
                    $.am.changePage(amGloble.page.common_oops, "slideleft", self._error);

                }
            });
        },

        changeData: function(rawData){
            var self = this;
            var resultData = [];
            $.each(rawData, function(i, item) {
                if (!self._filter || item.DealerAffiliation == self._filter) {
                    var latitudeLongitude = {
                        "latitude" : item._location.lat,
                        "longitude" : item._location.lng
                    };
                    var newItem = {
                        "abn": "",
                        "addressLine1": item._address,
                        "addressLine2": null,
                        "articleId": null,
                        "authorised": item.DealerNewVehicle,
                        "award": null,
                        "city": null,
                        "cityOrder": null,
                        "consumerURL": null,
                        "country": null,
                        "dealerCategory": item.DealerAffiliation,
                        "dealerCode": item.DealerID,
                        "dealerInfo": "37016#@#37016#@#Metro Ford",
                        "dealerOrder": null,
                        "dealershipName": item._name,
                        "email": "",
                        "fax": item.Fax,
                        "formatedSpecialities": "",
                        "fullXtimeParticipant": "N",
                        "function": null,
                        "latitudeLongitude": latitudeLongitude,
                        "liveChat": "",
                        "localDealerCode": item.DealerID,
                        "mobileURL": null,
                        "name": item._name,
                        "nameplates": "Array[0]",
                        "pageId": null,
                        "partsBusinessHours": "Object",
                        "partsOpeningTimeComments": "",
                        "partsPhone": "",
                        "phoneNumber1": item.PrimaryPhone,
                        "phoneNumber2": "",
                        "pma": null,
                        "postcode": item.PostCode,
                        "salesBusinessHours": "Object",
                        "salesDealerFlag": "N",
                        "salesOpeningTimeComments": "",
                        "serviceBusinessHours": "Object",
                        "serviceOpeningTimeComments": "M-SAT",
                        "servicePhone": "",
                        "social": "",
                        "specialities": "Array[0]",
                        "state": null,
                        "website": "",
                    };
                    resultData.push(newItem);   
                }
            });
            return resultData;
        },

        getDealerDatasByAutoNavi: function(pageNum) {
            var self = this;

            self.pageIndex = pageNum;
            self._processing = true;
            if (pageNum && pageNum == 1) {
                self._aAllListDatas = [];
                self._aFavListDatas = [];
                self.scrollview.scrollTo("top");
                emap.startBusy({
                    caption: i18n.COMMON_LOADING,
                    cancelable: true
                });
            }

            var params = {
                "page": pageNum,
                "pagesize": 5

            };
            // if (self._filter) {
            //     params.authorisedFilter = self._filter;
            // }

            if (!self._searchUrl) {
                //self.getUserPosition();
                params.lat = self._userPosition?self._userPosition.latitude:null;
                params.long = self._userPosition?self._userPosition.longitude:null;
                params.radius = 200;
            }

            var serverUrl = "";
            if (self._searchUrl) {
                serverUrl = self._searchUrl;
            }

//            ADB.trackAction("Switch 'List and Map'", {
//                "Market": amGloble.setting.lang.site,
//                "Language": amGloble.setting.lang.code,
//                "Page": "Dealer Locator ",
//                "Username": amGloble.userinfo.username,
//                "Bussiness Data": {
//                    "Search Condition": params,
//                    "View Type": "List View"
//                }
//            });

            amGloble.page.dealer_mapview._theMapObj = amGloble.page.dealer_mapview._theMapObj || amGloble.page.dealer_mapview._GetMap();
            if (self._searchUrl) {
                amGloble.page.dealer_mapview._theMapObj.searchDealersByProperties(
                    50,
                    function(data){
                        console.log(data);
                        if(data.length>0)
                        {
                            var newData = self.changeData(data);
                            self._setNewListDatas(newData);
                            self.showList();
                            self.$.find(".am-loadmore").hide();
                            amGloble.loading.hide();
                            self._processing = false;
                        }
                        else
                        {
                            amGloble.loading.hide();
                            self._noResult();
                        }
                    },
                    self._searchUrl,
                    null
                );
            }
            else{
                amGloble.page.dealer_mapview._theMapObj.searchDealersByDistance(
                    {lat: params.lat, lng: params.long}, 
                    50, 
                    25, 
                    function(data){
                        console.log(data);
                        if(data.length>0)
                        {
                            var newData = self.changeData(data);
                            self._setNewListDatas(newData);
                            self.showList();
                            self.$.find(".am-loadmore").hide();
                            amGloble.loading.hide();
                            self._processing = false;
                        }
                        else
                        {
                            amGloble.loading.hide();
                            self._noNearbyResult();
                        }
                    },
                    {},
                    null
                );
            }

            

            // $.ajax({
            //     url: serverUrl,
            //     //接口url
            //     type: "GET",
            //     data: params,
            //     dataType: "json",
            //     contentType: "application/json",
            //     timeout: amGloble.setting.market.timeout || 30000,
            //     success: function(ret) {
            //         console.log(ret);
            //         if(ret.dealers&&ret.dealers.length>0)
            //         {self._setNewListDatas(ret.dealers);
            //         self.showList();
            //         self.$.find(".am-loadmore").hide();
            //         amGloble.loading.hide();
            //         self._processing = false;
            //         }
            //         else
            //         {
            //         	amGloble.loading.hide();
            //         	self._noNearbyResult();
            //         }
            //     },
            //     error: function(ret) {
            //         amGloble.loading.hide();
            //         self._processing = false;
            //         self._error = {
            //             message: ret.statusText,
            //             detail: ret
            //         };
            //         $.am.changePage(amGloble.page.common_oops, "slideleft", self._error);

            //     }
            // });
        },

        getUserPosition: function() {
            var self = this;
            if (amGloble.setting.market.code == "IN") {
                self._userPosition = {
                    "latitude": 28.608280,
                    "longitude": 77.200813
                };
            }
        },

        //unit = "mi" or "km"
        //usage : this.getDistance(dealerCode,(new Microsoft.Maps.Location(-35.116698, 145.91319)) , this._aAllPositions[i],"km");
        getDistance: function(uid, loc1, loc2, unit) {
            var self = this;
            var routeRequest = "http://dev.virtualearth.net/REST/v1/Routes?wp.0=" + loc1.latitude + "," + loc1.longitude + "&wp.1=" + loc2.latitude + "," + loc2.longitude + "&distanceUnit=" + unit + "&optmz=distance&output=json&key=" + amGloble.maps.bingMapKey;

            var sample = $.ajax({
                url: routeRequest,
                //url
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                timeout: amGloble.setting.market.timeout || 30000,
                async: true,
                success: function(ret) {
                    //distance
                    //var distance = ret.resourceSets[0].resources[0].travelDistance + ret.resourceSets[0].resources[0].distanceUnit;
                    var distance = ret.resourceSets[0].resources[0].travelDistance.toFixed(1) + unit;
                    console.log("Distance : " + distance);
                    $.each(self._aShowListDatas,
                    function(i, o) {
                        if (o.uid == uid) {
                            self._aShowListDatas[i]["distance"] = distance;
                            //listView
                            self.$.find(".clas_dealerList > .list-item[data-uid='" + uid + "']").find("div.distance").html(distance);
                            //mapView
                            amGloble.page.dealer_mapview.$.find(".clas_dealerInfo > .list-item[data-uid='" + uid + "']").find("div.distance").html(distance);
                            //detail
                            amGloble.page.dealer_detail.$.find(".clas_dealerDetail .distance[data-uid='" + uid + "']").html(distance);
                            return false;
                        }
                    });
                },
                error: function(ret) {
                    console.log(ret);
                }
            });
        },
        getDistanceByGoogleMap: function(uid, loc1, loc2, unit) {
            var self = this;
            var directionsService = new google.maps.DirectionsService();
            var request = {
                origin: loc1,
                destination: loc2,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request,
            function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var distance = result.routes[0].legs[0].distance.text;
                    console.log(distance);
                    $.each(self._aShowListDatas,
                    function(i, o) {
                        if (o.uid == uid) {
                            self._aShowListDatas[i]["distance"] = distance;
                            //listView
                            self.$.find(".clas_dealerList > .list-item[data-uid='" + uid + "']").find("div.distance").html(distance);
                            //mapView
                            amGloble.page.dealer_mapview.$.find(".clas_dealerInfo > .list-item[data-uid='" + uid + "']").find("div.distance").html(distance);
                            //detail
                            amGloble.page.dealer_detail.$.find(".clas_dealerDetail .distance[data-uid='" + uid + "']").html(distance);
                            return false;
                        }
                    });
                }
            });
        },

        showList: function() {
            var self = this;
            var currentMap = amGloble.maps.currentMapDispatchRun();

            if (amGloble.userinfo.profile && amGloble.userinfo.profile.username) {
                var userName = amGloble.userinfo.profile.username;
            }

            var favDealer = JSON.parse(localStorage.getItem("favorite_dealer"));
            if (favDealer && favDealer.userName != userName) {
                favDealer = null;
            }

            if ((self._aAllListDatas == null || self._aAllListDatas.length == 0) && (self._searchUrl != null || favDealer == null)) {
                self._noResultFound();
            } else {
                var aListDatas = [];

                if (favDealer) {
                    for (var i = 0; i < self._aAllListDatas.length; i++) {
                        if (self._aAllListDatas[i].uid == favDealer.dealerInfo.uid) {
                            favDealer.dealerInfo = self._aAllListDatas[i];
                        } else {
                            aListDatas.push(self._aAllListDatas[i]);
                        }
                    }
                    aListDatas.unshift(favDealer.dealerInfo);
                } else {
                    aListDatas = self._aAllListDatas
                }
                self._aFavListDatas = aListDatas;

                var items = "";
                for (var i = 0,
                len = aListDatas.length; i < len; i = i + 1) {
                    var clasFav = "";
                    if (favDealer && aListDatas[i].uid == favDealer.dealerInfo.uid) {
                        clasFav = "favourate";
                    }

                    var category = '';

                    if (aListDatas[i].dealerCategory) {
                        category = aListDatas[i].dealerCategory
                    };

                    items += '<div class="list-item ' + clasFav + '" data-uid="' + aListDatas[i].uid + '">\
                    <div class="favour-tag"></div>\
                    <div class="distance-bullet">\
                        <div class="number ' + category + '">' + (i + 1) + '</div>\
                        '+(currentMap==0?'':'<div class="distance">' + aListDatas[i].distance + '</div>\
                    ')+'</div>\
                    <div class="locator-detail">\
                        <div class="title">' + aListDatas[i].dealershipName + '</div>\
                        <div class="buttons">\
                            '+((aListDatas[i].phoneNumber1 == null || aListDatas[i].phoneNumber1.length == 0)?'':'<div class="button am-clickable clas_callDealer" data-phone="' + aListDatas[i].phoneNumber1 + '">\
                                <div class="roundbutton icon-phone"></div>\
                                <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_CALL + '</div>\
                            </div>\
                            ')+((amGloble.setting.market.code == "JP" || aListDatas[i].email == null)?'':'<div class="button am-clickable dealerEmail" data-email="' + aListDatas[i].email + '">\
                                <div class="roundbutton icon-email"></div>\
                                <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_EMAIL + '</div>\
                            </div>\
                            ')+(currentMap==0?'':'<div class="button am-clickable clas_dealerPositionBtn" data-index="' + i + '">\
                                <div class="roundbutton icon-map"></div>\
                                <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_MAP + '</div>\
                            </div>\
                            ')+'<div class="button am-clickable clas_dealerDetailBtn" data-index="' + i + '">\
                                <div class="roundbutton icon-info"></div>\
                                <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_DETAILS + '</div>\
                            </div>\
                        </div>\
                        <div class="details">\
                            <span class="contact">' + (aListDatas[i].phoneNumber1?aListDatas[i].phoneNumber1.split('|')[0]:'') + (aListDatas[i].email?('  |  ' + aListDatas[i].email.split(/\||,|;/g)[0]):'') + '</span>\
                            <br />\
                           <span class="address">' + (aListDatas[i].addressLine1?(aListDatas[i].addressLine1 + ', '):'') + (aListDatas[i].city?(aListDatas[i].city + ', '):'') + (aListDatas[i].state?(aListDatas[i].state + ', '):'') + (aListDatas[i].country?(aListDatas[i].country + ', '):'') + (aListDatas[i].postcode?aListDatas[i].postcode:'') + '</span>\
                        </div>\
                    </div>\
                </div>';
                }
                if (items != "") {
                    var $items = $(items);
                    //call dealer
                    $items.find("div.clas_callDealer").off().vclick(function() {
                        var phoneNum = ($(this).data().phone).toString().replace(/-|\s/g, "");
                        var phoneList = phoneNum.split('|');

                        var data = amGloble.generateTrackData(
                            "owner app:dealer locator:list",
                            "",
                            "",
                            "",
                            "dealer info:phone",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:dealer locator:list:dealer info cta",data);

                        if (phoneList.length > 1) {
                            var list = [];
                            for (var i = 0; i < phoneList.length; i++) {
                                list.push({
                                    phoneNumber: phoneList[i]
                                });
                            }
                            amGloble.popupMenu(i18n.DEALER_LOCATOR_VOICE_CALL, list, "phoneNumber",
                            function(ret) {
                                emap.dail({
                                    "number": ret.phoneNumber,
                                    "autoDial": false
                                },
                                function(ret) {
                                    console.log("scb", ret);
                                },
                                function(ret) {
                                    console.log("fcb", ret);
                                });
                            });
                        } else {
                            emap.dail({
                                "number": phoneNum,
                                "autoDial": false
                            },
                            function(ret) {
                                console.log("scb", ret);
                            },
                            function(ret) {
                                console.log("fcb", ret);
                            });
                        }
                    });

                    $items.find("div.dealerEmail").off().vclick(function() {
                        var email = ($(this).data().email);
                        var emailList = email.split(/\||,|;/g);

                        var data = amGloble.generateTrackData(
                            "owner app:dealer locator:list",
                            "",
                            "",
                            "",
                            "dealer info:email",
                            false,
                            false,
                            false,
                            false,
                            false);
                        amGloble.trackAction("owner app:dealer locator:list:dealer info cta",data);

                        if (emailList.length > 1) {
                            var list = [];
                            for (var i = 0; i < emailList.length; i++) {
                                list.push({
                                    email: emailList[i]
                                });
                            }
                            amGloble.popupMenu(i18n.DEALER_LOCATOR_ACTION_EMAIL, list, "email",
                            function(ret) {
                                emap.email({
                                    to: [ret.email]
                                },
                                function(ret) {
                                    console.log("scb", ret);
                                },
                                function(ret) {
                                    console.log("fcb", ret);
                                });
                            });
                        } else {
                            emap.email({
                                to: [email]
                            },
                            function(ret) {
                                console.log("scb", ret);
                            },
                            function(ret) {
                                console.log("fcb", ret);
                            });
                        }

                    });

                    //show dealer detail
                    $items.find("div.clas_dealerDetailBtn").off().vclick(function() {
                        var index = $(this).data().index;
                        var params = {
                            "dealerDatas": aListDatas,
                            "index": index
                        };
                        if (aListDatas[index] != undefined) {
                            var data = amGloble.generateTrackData(
                                "owner app:dealer locator:list",
                                "",
                                "",
                                "",
                                "dealer info:detail",
                                false,
                                false,
                                false,
                                false,
                                false);
                            amGloble.trackAction("owner app:dealer locator:list:dealer info cta",data);
                            $.am.changePage(amGloble.page.dealer_detail, "slideleft", params);
                        } else {
                            amGloble.msg(i18n.DEALER_LOCATOR_DEALERMISSING);
                        }
                    });
                    //show dealer position
                    $items.find("div.clas_dealerPositionBtn").off().vclick(function() {
                        var index = $(this).data().index;
                        var params = {
                            "dealerDatas": aListDatas,
                            "index": index
                        };
                        if (aListDatas[index] != undefined) {
                            $.am.changePage(amGloble.page.dealer_mapview, "slideleft", params);
                        } else {
                            amGloble.msg(i18n.DEALER_LOCATOR_DEALERMISSING);
                        }
                    });

                    //add list items
                    self.$.find(".clas_dealerList").empty().html($items);
                    self.scrollview && self.scrollview.refresh();
                }
            }
        },

        _noResultFound: function() {
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
            
            var self = this;

            var html = '<div class="noresultblock"><span class="icon-warnblack"></span><p>' + i18n.DEALER_SEARCH_NORESULT_TEXT + '</p></div>';

            if (self._searchUrl) {
                html += '<ul class="actionButtons"><li class="am-clickable marginright1 cancel">' + i18n.DEALER_SEARCH_NORESULT_CANCEL + '</li><li class="am-clickable searchAgain">' + i18n.DEALER_SEARCH_NORESULT_SEARCH + '</li></ul>';
            }
            var obj = $(html);
            obj.find(".cancel").vclick(function() {
                self._searchUrl = null;
                self.getDealerDatas(1);

            });

            obj.find(".searchAgain").vclick(function() {
                if(amGloble.setting.market.code == "JP"){
                    $.am.changePage(amGloble.page.dealer_search_JP, "slideleft");
                    return;
                }
                $.am.changePage(amGloble.page.dealer_search, "slideleft");
            });

            this.$.find(".clas_dealerList").html(obj);
            self.scrollview && self.scrollview.refresh() && self.scrollview.scrollTo("top");
        },
        _somethingWrong: function() {
            var self = this;

            var html = '<div class="noresultblock"><span class="icon-warnblack"></span><p>' + i18n.DEALER_SEARCH_SOMETHING_WRONG + '</p></div>';

            var obj = $(html);

            this.$.find(".clas_dealerList").html(obj);
            self.scrollview && self.scrollview.refresh() && self.scrollview.scrollTo("top");
        },
        _noResult: function() {
            var self = this;

            var html = '<div class="noresultblock"><span class="icon-warnblack"></span><p>' + i18n.DEALER_SEARCH_NORESULT_SHORT_TEXT + '</p></div>';

            var obj = $(html);

            this.$.find(".clas_dealerList").html(obj);
            self.scrollview && self.scrollview.refresh() && self.scrollview.scrollTo("top");
        },
        _noNearbyResult: function() {
            var self = this;

            var html = '<div class="noresultblock"><span class="icon-warnblack"></span><p>' + i18n.DEALER_SEARCH_NO_NEARBY + '</p></div>';

            var obj = $(html);

            this.$.find(".clas_dealerList").html(obj);
            self.scrollview && self.scrollview.refresh() && self.scrollview.scrollTo("top");
                                                  
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