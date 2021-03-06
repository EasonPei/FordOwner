/*********************************
 Copyright, 2014 Ford Motor Company
 
 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.
 
 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

amGloble.marketList = [{
                       "name" : "Australia",
                       "code" : "AU",
                       "servis2code" : ["AUS"],
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "code3" : "eng",
                                  "i18n" : "en-au",
                                  "site" : "FOA",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://www.ford.com.au/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.au/owner/forgot-password",
                                  "video" : "http://www.youtube.com/playlist?list=PLMBR9HEIqwEHq75CBpGMyp0AgxqbyF5mX",
                                  "sync" : "https://www.ford.com.au/owner/sync-support?v=101",
                                  "ra" : [{
                                          "title" : "24-Hour Service",
                                          "number" : "1800-13-3673"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Falcon FG","Falcon FG MKII","Falcon FG X","Escape ZD","Ranger PK","Ranger PX","EcoSport BK","Focus LW","Focus LW MKII","Focus XR5","Focus ST","Focus Cabriolet","Focus LV","Focus LV MKII","Mondeo MB","Mondeo MC","Mondeo MD","Fiesta ST","Fiesta WT","Fiesta WZ","Fiesta WS","Territory SY MKII","Territory SZ","Territory SZ MKII","Kuga TF","Kuga TF MKII","Kuga TE","Transit Custom","Transit VM","Transit VN","Everest","Focus LZ","Mustang","PX Ranger MKII","Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/au.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249149152150&pagename=wrapper&site=FOA",
                                  "privacy" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249080829398&pagename=wrapper&site=FOA",
                                  "disclaimer" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249080829442&pagename=wrapper&site=FOA",
                                  "legal" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249152354242&pagename=wrapper&site=FOA"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "ประเทศไทย",
                       "code" : "TH",
                       "servis2code" : ["THA"],
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "code3" : "eng",
                                  "i18n" : "en-th",
                                  "site" : "FTHEN",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://www.ford.co.th/en/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.th/en/owner/forgot-password",
                                  "video" : " https://www.youtube.com/playlist?list=PLmrv26fl7yVvucpStlM4hcCmvaQ6_Lje1",
                                  "sync" : "https://www.ford.co.th/owner#popsync=show",
                                  "ra" : [{
                                          "title" : "Ford Roadside Assistance (Toll-free)",
                                          "number" : "1800-222-000"
                                          }, {
                                          "title" : "Ford Roadside Assistance (Mobile)",
                                          "number" : "1401-222-000 "
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Everest 2013", "EcoSport 2014", "Escape 2012", "Escape 2015", "Expedition 2015", "Explorer 2015", "Focus 2012", "Fiesta 2010", "Fiesta 2015", "Mustang 2011", "Mustang 2015", "Ranger 2012 4X2", "Ranger 2012 4X4", "Ranger 2014 4X2", "Ranger 2014 4X4", "Everest 2015", "Ranger 2015", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/th.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1249170928085&pagename=wrapper&site=FTHEN",
                                  "privacy" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1248958931963&pagename=wrapper&site=FTHEN",
                                  "disclaimer" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1248958931971&pagename=wrapper&site=FTHEN",
                                  "legal" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1249170918416&pagename=wrapper&site=FTHEN"
                                  }, {
                                  "name" : "ภาษาไทย",
                                  "code" : "th",
                                  "code3" : "tha",
                                  "i18n" : "th-th",
                                  "site" : "FTH",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://www.ford.co.th/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.th/owner/forgot-password",
                                  "video" : " https://www.youtube.com/playlist?list=PLmrv26fl7yVvucpStlM4hcCmvaQ6_Lje1",
                                  "sync" : "https://www.ford.co.th/owner#popsync=show",
                                  "ra" : [{
                                          "title" : "การติดต่อขอใช้บริการ (โทรฟรี)",
                                          "number" : "1800-222-000"
                                          }, {
                                          "title" : "การติดต่อขอใช้บริการ (โทรจากมือถือกด)",
                                          "number" : "1401-222-000 "
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Everest 2013", "EcoSport 2014", "Escape 2012", "Escape 2015", "Expedition 2015", "Explorer 2015", "Focus 2012", "Fiesta 2010", "Fiesta 2015", "Mustang 2011", "Mustang 2015", "Ranger 2012 4X2", "Ranger 2012 4X4", "Ranger 2014 4X2", "Ranger 2014 4X4", "Everest 2015", "Ranger 2015", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/th.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1249170928085&pagename=wrapper&site=FTHEN",
                                  "privacy" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1248962458869&pagename=wrapper&site=FTH",
                                  "disclaimer" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1248962458996&pagename=wrapper&site=FTH",
                                  "legal" : "https://www.ford.co.th/servlet/Satellite?c=DFYArticle&cid=1249170918416&pagename=wrapper&site=FTHEN"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Philippines",
                       "code" : "PH",
                       "servis2code" : ["PHL"],
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "code3" : "eng",
                                  "i18n" : "en-ph",
                                  "site" : "FPH",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://www.ford.com.ph/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.ph/owner/forgot-password",
                                  "video" : "https://www.youtube.com/playlist?list=PLmrv26fl7yVshxwqqFxg8p2CJmepRZ9QB",
                                  "sync" : "https://www.ford.com.ph/owner/sync-support?v=101",
                                  "ra" : [{
                                          "title" : "24-HOUR HOTLINE NUMBER ",
                                          "number" : "(02) 459-4723"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Fiesta 2010", "Fiesta 2013", "Focus 2012", "Focus 2015", "EcoSport 2014", "Ranger 4X2 2012", "Ranger 4X4 2012", "Ranger 4X2 2015", "Ranger 4X4 2015", "Everest 2015", "Mustang 2012", "Mustang 2014", "Escape 2014", "Explorer 2011", "Explorer 2015", "Expedition 2010", "Expedition 2014", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/ph.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "http://www.ford.com.ph/servlet/Satellite?c=DFYArticle&cid=1249164829930&pagename=wrapper&site=FPH",
                                  "privacy" : "https://www.ford.com.ph/servlet/Satellite?c=DFYArticle&cid=1248964792680&pagename=wrapper&site=FPH",
                                  "disclaimer" : "https://www.ford.com.ph/servlet/Satellite?c=DFYArticle&cid=1248964795208&pagename=wrapper&site=FPH",
                                  "legal" : "http://www.ford.com.ph/servlet/Satellite?c=DFYArticle&cid=1249164694218&pagename=wrapper&site=FPH"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Vietnam",
                       "displayName" : "Việt Nam",
                       "code" : "VN",
                       "servis2code" : ["VTM"],
                       "map" : "0",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "Tiếng Việt",
                                  "code" : "vi",
                                  "code3" : "vie",
                                  "i18n" : "vi-vn",
                                  "site" : "FVN",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://www.ford.com.vn/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.vn/owner/forgot-password",
                                  "video" : "https://www.youtube.com/playlist?list=PLmrv26fl7yVuLOBz5bz5aATOk8ttBXsfW",
                                  "sync" : "https://www.ford.com.vn/owner#popsync=show",
                                  "ra" : [{
                                          "title" : "24-Hour Service",
                                          "number" : "1800-209-7400"
                                          }, {
                                          "title" : "24-Hour Service",
                                          "number" : "1800-103-7400"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["EcoSport 2014", "Escape 2008", "Escape 2010", "Everest 2009", "Everest 2012", "Everest 2013", "Everest 2016", "Fiesta 2011", "Fiesta 2013", "Fiesta 2015", "Focus 2009", "Focus 2010", "Focus 2012", "Focus 2015", "Mondeo 2009", "Mondeo 2011", "Ranger 2009", "Ranger 2012", "Ranger 2015", "Transit 2009", "Transit 2011", "Transit 2013", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/vn.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "http://www.ford.com.vn/servlet/Satellite?c=DFYArticle&cid=1249170763064&pagename=wrapper&site=FVN",
                                  "privacy" : "https://www.ford.com.vn/servlet/Satellite?c=DFYArticle&cid=1248978825030&pagename=wrapper&site=FVN",
                                  "disclaimer" : "https://www.ford.com.vn/servlet/Satellite?c=DFYArticle&cid=1248977273095&pagename=wrapper&site=FVN",
                                  "legal" : "http://www.ford.com.vn/servlet/Satellite?c=DFYArticle&cid=1249170769672&pagename=wrapper&site=FVN"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "India",
                       "code" : "IN",
                       "servis2code" : ["IND"],
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 60000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "code3" : "eng",
                                  "i18n" : "en-in",
                                  "site" : "FIPL",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "https://sso.ford.com",
                                  "fgtname" : "https://wwwedu.dragonfly.ford.com/owner/forgetusername?sitetype=web&site=FIPL",
                                  "fgtpswd" : "https://wwwedu.dragonfly.ford.com/owner/forgot-password?sitetype=web&site=FIPL",
                                  "video" : "https://www.youtube.com/playlist?list=PLmrv26fl7yVuacVV2GB_BtMOQ37_eYry6",
                                  "sync" : "http://www.india.ford.com/owner/sync-support?sitetype=web&v=101&site=FIPL",
                                  "ra" : [{
                                          "title" : "24-Hour Service",
                                          "number" : "1800-209-7400"
                                          }, {
                                          "title" : "24-Hour Service",
                                          "number" : "1800-103-7400"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : ["Service","New Cars","Used Cars"],
                                  "model" : ["Fiesta", "Fiesta Classic", "EcoSport", "Figo", "Endeavour", "Ikon", "Fusion", "All-New Figo", "Figo Aspire", "All-New Endeavour", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/in.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249149665504&pagename=wrapper&site=FIPL",
                                  "privacy" : "http://www.india.ford.com/privacy-disclaimer",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730326&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249152353183&pagename=wrapper&site=FIPL"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Korea",
                       "displayName" : "대한민국",
                       "code" : "KR",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "한국어",
                                  "code" : "ko",
                                  "code3" : "kor",
                                  "i18n" : "ko-kr",
                                  "site" : "FKR",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "",
                                  "fgtname" : "",
                                  "fgtpswd" : "",
                                  "video" : "",
                                  "sync" : "",
                                  "ra" : [{
                                          "title" : "24시간 긴급출동 서비스",
                                          "number" : "080-300-3673"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/kr.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "http://www.ford-korea.com/servlet/Satellite?c=DFYArticle&cid=1249185959749&pagename=wrapper&site=FKR",
                                  "privacy" : "",
                                  "disclaimer" : "",
                                  "legal" : "http://www.ford-korea.com/servlet/Satellite?c=DFYArticle&cid=1249185959749&pagename=wrapper&site=FKR"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Japan",
                       "displayName" : "日本",
                       "code" : "JP",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "日本語",
                                  "code" : "ja",
                                  "code3" : "jpn",
                                  "i18n" : "ja-jp",
                                  "site" : "FJP",
                                  "host" : "https://wwwqa.dfyservicesa.ford.com",
                                  "lhhost" : "",
                                  "fgtname" : "",
                                  "fgtpswd" : "",
                                  "video" : "https://www.youtube.com/playlist?list=PLmrv26fl7yVvvdUkbN84JRKwx20xg3f4U",
                                  "sync" : "http://www.ford.co.jp/owner#popsync=show",
                                  "ra" : [{
                                          "title" : "24-Hour Service",
                                          "number" : "1800-209-7400"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : [],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/jp.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.ford.co.jp/servlet/Satellite?c=DFYArticle&cid=1249185934975&pagename=wrapper&site=FJP",
                                  "privacy" : "",
                                  "disclaimer" : "",
                                  "legal" : "https://www.ford.co.jp/servlet/Satellite?c=DFYArticle&cid=1249185934975&pagename=wrapper&site=FJP"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }];
