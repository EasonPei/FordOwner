/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

(function () {


    amGloble.page.dealer_detail = new $.am.Page({
        id: "dealer_detail",

        init: function () {
        },
        backButtonOnclick: function () {
            $.am.changePage($.am.history[$.am.history.length - 1], "slideright", { "noRefresh": true });
        },
        //before page show
        _selIndex: undefined,
        _selObjDatas: undefined,
        loadMapView: function () {
            amGloble.page.dealer_detail._theMap = amGloble.page.dealer_detail._theMap || amGloble.page.dealer_detail.GetMap();
            var oDealerDetail = amGloble.page.dealer_detail._selObjDatas;
            var lat = oDealerDetail.latitudeLongitude.latitude;
            var long = oDealerDetail.latitudeLongitude.longitude;
            amGloble.page.dealer_detail._showLocation(lat, long);
        },
        beforeShow: function (params) {
            //this.pageParams = params;
            if (params && params == 'back') {
                return;
            }

            var currentMap = amGloble.maps.currentMapDispatchRun();
            if(currentMap==0){
                //nomap, hide tabbar
                this.$.addClass("noMap");
            }

            this._alocation = undefined;
            this._selIndex = undefined;
            this._selObjDatas = undefined;
            this.$.find(".clas_dealerDetail").off().empty();

            var self = this;
            self.scrollview.scrollTo("top");//go to top
            self._selIndex = params.index;
            var oDealerDetail = params.dealerDatas[params.index];
            self._selObjDatas = oDealerDetail;
            //map
            // self._theMap = self._theMap || self.GetMap();
            // var lat = oDealerDetail.latitudeLongitude.latitude;
            // var long = oDealerDetail.latitudeLongitude.longitude;
            // self._showLocation(lat, long);
            //amGloble.maps.currentMapRun(self.loadMapView);

            //info
            var isChina = (amGloble.setting.market.name=="China");
            var isTH = (amGloble.setting.market.code == "TH");
            var isJP = (amGloble.setting.market.code == "JP");
            var addressLine=oDealerDetail.addressLine2?oDealerDetail.addressLine1+" "+oDealerDetail.addressLine2:oDealerDetail.addressLine1;
            var phoneList = oDealerDetail.phoneNumber1.split('|');
            var emailList = oDealerDetail.email?oDealerDetail.email.split(/\||,|;/g):null;

            var businessTime = oDealerDetail.salesBusinessHours.Monday;
            if(businessTime && businessTime.length>=10){
                businessTime = (i18n.DEALER_SALES_HOURS_UNTIL?i18n.DEALER_SALES_HOURS_UNTIL:"Sales Open until ")+oDealerDetail.salesBusinessHours.Monday.substr(7,2)+":"+oDealerDetail.salesBusinessHours.Monday.substr(9,2);
            }
            else{
                businessTime = "";
            }

            var detail = '<div class="favour-tag clas_none"></div><div class="title">' + oDealerDetail.dealershipName + '<span class="distance" data-uid="' + oDealerDetail.uid + '">' + oDealerDetail.distance + '</span></div>\
                        <ul class="details">\
                            '+((oDealerDetail.phoneNumber1 == null || oDealerDetail.phoneNumber1.length == 0)?'':'<li class="line">\
                                <div class="icon phone-gray"></div>\
                                <div class="am-clickable clas_callDealer" data-phone="' + oDealerDetail.phoneNumber1 + '"><span>' + oDealerDetail.phoneNumber1 + '<span></div>\
                            </li>\
                            ')+((isJP || emailList == null)?'':'<li class="line">\
                                <div class="icon email-gray"></div>\
                                <div class="am-clickable clas_emailDealer"><span>' + oDealerDetail.email + '<span></div>\
                            </li>\
                            ')+'<li class="line">\
                                <div class="icon location-gray"></div>\
                                 <span>'+ addressLine + ', ' + (oDealerDetail.city?(oDealerDetail.city + ', '):'') + (oDealerDetail.state?(oDealerDetail.state + ', '):'') + (oDealerDetail.country?(oDealerDetail.country + ', '):'') + oDealerDetail.postcode +'</span>\
                            </li>\
                            <li class="line">\
                                <div class="icon fax-gray"></div>\
                                <span>'+ oDealerDetail.fax + '</span>\
                            </li>\
                            ' + 
                            (isChina?'':'<li class="line">\
                                <div class="icon abn-gray"></div>\
                                <span>'+ oDealerDetail.abn + '</span>\
                            </li>\
                            <li class="line">\
                                <div class="icon mouse-gray"></div>\
                                <span class="am-clickable clas_visitWebUrl">'+ oDealerDetail.website + '</span>\
                            </li>') + 
                            '<li class="line">\
                                <div class="icon time-gray"></div>\
                                <span class="">'+ businessTime + '</span>\
                            </li>' +
                        '</ul>\
                        ' + (isTH?'':'<div class="services">\
                            <div class="title">' + i18n.DEALER_LOCATOR_DETAIL_SERVICES + '</div>\
                            <p>' + oDealerDetail.authorised + '</p>\
                        </div>\
                        ') + '<div class="buttons">\
                            '+((oDealerDetail.phoneNumber1  == null || oDealerDetail.phoneNumber1.length == 0)?'':'<div class="column">\
                                <div class="button am-clickable clas_callDealer" data-phone="'+ oDealerDetail.phoneNumber1 + '">\
                                    <div class="roundbutton icon-phone"></div>\
                                    <div class="button-text">'+ i18n.DEALER_LOCATOR_ACTION_CALL +'</div>\
                                </div>\
                            </div>\
                            ')+((isJP || emailList == null)?'':'<div class="column">\
                                <div class="button am-clickable dealerEmail" data-email="' + oDealerDetail.email + '">\
                                    <div class=" roundbutton icon-email"></div>\
                                    <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_EMAIL + '</div>\
                                </div>\
                            </div>\
                        ')+(isJP ?'':'<div class="column am-clickable clas_setFavTagBtn" data-uid="' + oDealerDetail.uid + '">\
                                <div class="button">\
                                    <div class="roundbutton icon-star"></div>\
                                    <div class="button-text">' + i18n.DEALER_LOCATOR_ACTION_FAV + '</div>\
                                </div>\
                            </div>\
                        ')+'</div>\
                        <div class="clear"></div>';

            var $detail = $(detail);

            var phoneContainer = $detail.find(".line .clas_callDealer");
            if (phoneList.length > 1) {
                phoneContainer.empty();
                $.each(phoneList, function (index) {
                    phoneContainer.append("<span>" + this + "</span>");
                    if (index != phoneList.length - 1) {
                        phoneContainer.append("<br/>");
                    }
                });
            }
            phoneContainer.find("span").off().vclick(function () {
                var phoneNumber = $(this).text().replace(/-|\s/g, "");
//                ADB.trackAction("Call, Email, Website", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Dealer Detail",
//                    "Username": amGloble.userinfo.username,
//                    "Bussiness Data": {
//                        "Dealer Number": phoneNumber,
//                        "Dealer Name": oDealerDetail.dealershipName,
//                        "Contact Way": "Call"
//                    }
//                });
                emap.dail({
                    "number": phoneNumber,
                    "autoDial": false
                }, function (ret) {
                    console.log("scb", ret);
                }, function (ret) {
                    console.log("fcb", ret);
                });
            });

            var emailContainer = $detail.find(".line .clas_emailDealer");
            if (emailList && emailList.length > 1) {
                emailContainer.empty();
                $.each(emailList, function (index) {
                    emailContainer.append("<span>" + this + "</span>");
                    if (index != emailList.length - 1) {
                        emailContainer.append("<br/>");
                    }
                });
            }
            emailContainer.find("span").off().vclick(function () {
                var email = $(this).text();
//                ADB.trackAction("Call, Email, Website", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Dealer Detail",
//                    "Username": amGloble.userinfo.username,
//                    "Bussiness Data": {
//                        "Dealer Number": email,
//                        "Dealer Name": oDealerDetail.dealershipName,
//                        "Contact Way": "Email"
//                    }
//                });
                emap.email({
                    to: [email]
                }, function (ret) {
                    console.log("scb", ret);
                }, function (ret) {
                    console.log("fcb", ret);
                });
            });

            //visit Web Url
            $detail.find(".clas_visitWebUrl").vclick(function () {
                var theUrl = $.trim(self._selObjDatas.website);
                theUrl = theUrl.indexOf("http://") == 0 ? theUrl : "http://" + theUrl;
//                ADB.trackAction("Call, Email, Website", {
//                    "Market": amGloble.setting.lang.site,
//                    "Language": amGloble.setting.lang.code,
//                    "Page": "Dealer Detail",
//                    "Username": amGloble.userinfo.username,
//                    "Bussiness Data": {
//                        "Dealer Number": theUrl,
//                        "Dealer Name": oDealerDetail.dealershipName,
//                        "Contact Way": "Website"
//                    }
//                });
                emap.openUrl({
                    url: theUrl
                });
            });
            //call dealer
            $detail.find(".button.clas_callDealer").vclick(function () {
                var phoneNum = ($(this).data().phone).toString().replace(/-|\s/g, "");
                var phoneList = phoneNum.split('|');

                if (phoneList.length > 1) {
                    var list = [];
                    for (var i = 0; i < phoneList.length; i++) {
                        list.push({ phoneNumber: phoneList[i] });
                    }
                    amGloble.popupMenu(i18n.DEALER_LOCATOR_VOICE_CALL, list, "phoneNumber", function (ret) {
//                        ADB.trackAction("Call, Email, Website", {
//                            "Market": amGloble.setting.lang.site,
//                            "Language": amGloble.setting.lang.code,
//                            "Page": "Dealer Detail",
//                            "Username": amGloble.userinfo.username,
//                            "Bussiness Data": {
//                                "Dealer Number": ret.phoneNumber,
//                                "Dealer Name": oDealerDetail.dealershipName,
//                                "Contact Way": "Call"
//                            }
//                        });
                        emap.dail({
                            "number": ret.phoneNumber,
                            "autoDial": false
                        }, function (ret) {
                            console.log("scb", ret);
                        }, function (ret) {
                            console.log("fcb", ret);
                        });
                    });
                }
                else {
//                    ADB.trackAction("Call, Email, Website", {
//                        "Market": amGloble.setting.lang.site,
//                        "Language": amGloble.setting.lang.code,
//                        "Page": "Dealer Detail",
//                        "Username": amGloble.userinfo.username,
//                        "Bussiness Data": {
//                            "Dealer Number": phoneNum,
//                            "Dealer Name": oDealerDetail.dealershipName,
//                            "Contact Way": "Call"
//                        }
//                    });
                    emap.dail({
                        "number": phoneNum,
                        "autoDial": false
                    }, function (ret) {
                        console.log("scb", ret);
                    }, function (ret) {
                        console.log("fcb", ret);
                    });
                }
            });

            $detail.find(".dealerEmail").off().vclick(function () {
                var email = ($(this).data().email);
                var emailList = email.split(/\||,|;/g);

                if (emailList.length > 1) {
                    var list = [];
                    for (var i = 0; i < emailList.length; i++) {
                        list.push({ email: emailList[i] });
                    }
                    amGloble.popupMenu(i18n.DEALER_LOCATOR_ACTION_EMAIL, list, "email", function (ret) {
//                        ADB.trackAction("Call, Email, Website", {
//                            "Market": amGloble.setting.lang.site,
//                            "Language": amGloble.setting.lang.code,
//                            "Page": "Dealer Detail",
//                            "Username": amGloble.userinfo.username,
//                            "Bussiness Data": {
//                                "Dealer Number": ret.email,
//                                "Dealer Name": oDealerDetail.dealershipName,
//                                "Contact Way": "Email"
//                            }
//                        });
                        emap.email({
                            to: [ret.email]
                        }, function (ret) {
                            console.log("scb", ret);
                        }, function (ret) {
                            console.log("fcb", ret);
                        });
                    });
                }
                else {
//                    ADB.trackAction("Call, Email, Website", {
//                        "Market": amGloble.setting.lang.site,
//                        "Language": amGloble.setting.lang.code,
//                        "Page": "Dealer Detail",
//                        "Username": amGloble.userinfo.username,
//                        "Bussiness Data": {
//                            "Dealer Number": email,
//                            "Dealer Name": oDealerDetail.dealershipName,
//                            "Contact Way": "Email"
//                        }
//                    });
                    emap.email({
                        to: [email]
                    }, function (ret) {
                        console.log("scb", ret);
                    }, function (ret) {
                        console.log("fcb", ret);
                    });
                }
            });


            if (amGloble.userinfo.profile && amGloble.userinfo.profile.username) {
                var userName = amGloble.userinfo.profile.username;
            }
            // set favorite tag
            $detail.find(".clas_setFavTagBtn").off().vclick(function () {
                var uid = $(this).data().uid;
                var storedFav = JSON.parse(localStorage.getItem("favorite_dealer"));

                if (storedFav && storedFav.userName == userName && storedFav.dealerInfo.uid == uid) {
                    self.$.find(".clas_dealerDetail > div.favour-tag").hide();
                    $detail.find(".clas_setFavTagBtn .roundbutton").removeClass("icon-star").addClass("icon-unfavour");
                    localStorage.setItem("favorite_dealer", null);
                }
                else {
                    self.$.find(".clas_dealerDetail > div.favour-tag").show();
                    $detail.find(".clas_setFavTagBtn .roundbutton").removeClass("icon-unfavour").addClass("icon-star");
                    var favDealer = { userName: userName, dealerInfo: self._selObjDatas };
                    localStorage.setItem("favorite_dealer", JSON.stringify(favDealer));
                }
                amGloble.page.dealer_listview.showList();
            });

            var storedFav = JSON.parse(localStorage.getItem("favorite_dealer"));
            if (storedFav && storedFav.userName == userName && storedFav.dealerInfo.uid == self._selObjDatas.uid) {
                $detail.removeClass("clas_none");
                $detail.find(".clas_setFavTagBtn .roundbutton").removeClass("icon-unfavour").addClass("icon-star");
            }
            else {
                $detail.find(".clas_setFavTagBtn .roundbutton").removeClass("icon-star").addClass("icon-unfavour");
            }

            if (amGloble.setting.lang && amGloble.setting.market.code == "IN") {
                $detail.find(".abn-gray").parent().remove();
            }

            self.$.find(".clas_dealerDetail").html($detail);
        },

        //after page show
        afterShow: function () {
            var self = this;
            amGloble.maps.currentMapRun(self.loadMapView);

        },
        //before page hide
        beforeHide: function () {
        },
        //after page hide
        afterHide: function () {
        },
        _theMap: undefined,
        GetMap: function () {
            // Initialize the map
            var map = null;
            var currentMap = amGloble.maps.currentMap();
            if (currentMap == 2) {
                //google
                var mapOptions = {
                    center: new google.maps.LatLng(-34.397, 150.644),
                    zoom: 13,
                    zoomControlOptions: {
                        style:google.maps.ZoomControlStyle.SMALL,
                        position:google.maps.ControlPosition.TOP_RIGHT
                    },
                    mapTypeControl: false,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("id_detail_mapDiv"),
                    mapOptions);
                document.getElementById("id_detail_mapDiv").addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                });
                document.getElementById("id_detail_mapDiv").addEventListener('mousedown', function (e) {
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
            }
            else if (currentMap == 1) {
                //bing
                map = new Microsoft.Maps.Map(
                    document.getElementById("id_detail_mapDiv"),
                    {
                        credentials: amGloble.maps.bingMapKey,
                        showScalebar: false,
                        showMapTypeSelector: false,
                        showDashboard: false
                        //for test
                        //center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9
                    }
                );
            }
            else if (currentMap == 3) {
                //autonavi map
                api = new AutoNaviAPI({imagePath: "/content/gux_content/", dealerKey: '55adb0c7e4b0a76fce4c8dd6', autocompleteCallbackURL: '', autocompleteCallbackName: ''});
                map = new api.map(document.getElementById('id_detail_mapDiv'),
                 {center: {lat: 39.909231, lng: 116.397428}, zoom: 6});
                document.getElementById("id_detail_mapDiv").addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                });
                document.getElementById("id_detail_mapDiv").addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                });
            }
            return map;
        },
        _aLocation: undefined,
        _aGoogleMapMarkers : undefined,
        _showLocation: function (lat, long) {//show one location
            var self = this;
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
                var pos = new google.maps.LatLng(lat, long);
                var marker = new MarkerWithLabel({
                    position: pos,
                    map: self._theMap,
                    icon: "img/dealerlocator/icon_location.png",
                    labelContent: (self._selIndex + 1).toString(),
                    labelAnchor: new google.maps.Point(9, 45),
                    labelClass: "dealer_mapview_labels", // the CSS class for the label
                    labelInBackground: false
                });
                self._aGoogleMapMarkers.push(marker);
                this._theMap.setCenter(pos);
            }
            else if (currentMap == 1) {
                //bing
                self._aLocation = new Array();
                self._aLocation.push(new Microsoft.Maps.Location(lat, long));//(47.592, -122.332));
                Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: function () { self._dealerLocatorLoaded(); } });
            }
            else if (currentMap == 3) {
                self._theMap.clearDealers();
                var category = self._selObjDatas.dealerCategory? self._selObjDatas.dealerCategory: '';
                //autonavi
                var m =document.createElement("div");
                m.className ="dealer_mapview_autonavi_labels_"+category;//设置了样式类名，页面style标签中要定义名为label的样式类
                var n =document.createElement("span");
                n.innerHTML = (self._selIndex + 1).toString();//要显示的文本标注的内容
                m.appendChild(n);
                self._theMap.addGuxMarker({"lat":lat,"lng":long},null, m, null);
                // Center the map on the location
                this._theMap.setCenter({"lat":lat,"lng":long});
                this._theMap.setZoom(12);
           }
        },
        _dealerLocatorLoaded: function () {
            var self = this;
            $.each(self._aLocation, function (i, loc) {
                var pin = new Microsoft.Maps.Pushpin(loc, { text: (self._selIndex + 1).toString() });
                self._theMap.entities.push(pin);
            });
            // Center the map on the location
            self._theMap.setView({ center: self._aLocation[0], zoom: 10 });

        }
    });


})();