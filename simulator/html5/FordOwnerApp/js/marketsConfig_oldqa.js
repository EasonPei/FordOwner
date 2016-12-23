/*********************************
 Copyright, 2014 Ford Motor Company
 
 All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use.
 
 You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
 Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
 *********************************/

amGloble.marketList = [{
                       "name" : "Australia",
                       "code" : "AU",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "i18n" : "en-au",
                                  "site" : "FOA",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://wwwqa.dragonfly.ford.com/owner/forgetusername",
                                  "fgtpswd" : "https://wwwqa.dragonfly.ford.com/owner/forgot-password",
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
                                  "model" : ["Falcon FG","Falcon FG MKII","Falcon FG X","Escape ZD","Ranger PK","Ranger PX","EcoSport BK","Focus LW","Focus LW MKII","Focus XR5","Focus ST","Focus Cabriolet","Focus LV","Focus LV MKII","Mondeo MB","Mondeo MC","Mondeo MD","Fiesta ST","Fiesta WT","Fiesta WZ","Fiesta WS","Territory SY MKII","Territory SZ","Territory SZ MKII","Kuga TF","Kuga TF MKII","Kuga TE","Transit Custom","Transit VM","Transit VN"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/au.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249149152150&pagename=wrapper&site=FOA",
                                  "privacy" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249080829398&pagename=wrapper&site=FOA",
                                  "disclaimer" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249080829442&pagename=wrapper&site=FOA",
                                  "legal" : "https://www.ford.com.au/servlet/Satellite?c=DFYArticle&cid=1249152354242&pagename=wrapper&site=FOA"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "China",
                       "displayName" : "中国",
                       "code" : "CN",
                       "map" : "3",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "中文",
                                  "code" : "zh",
                                  "i18n" : "zh-cn",
                                  "site" : "CNEX",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.com.cn/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.cn/owner/forgot-password",
                                  "video" : "http://v.youku.com/v_show/id_XMTMyNDExNjE1Ng==.html?f=26047352&x",
                                  "sync" : "http://touch.ford.com.cn/sync-home",
                                  "ra" : [{
                                          "title" : "福特道路救援",
                                          "number" : "400-6501-668"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["福睿斯", "锐界", "金牛座", "致胜", "新蒙迪欧", "翼搏", "翼虎", "嘉年华", "新嘉年华", "福克斯", "经典福克斯", "新福克斯", "全新福克斯", "麦柯斯S-MAX", "锐界（进口）", "探险者（进口）", "嘉年华ST（进口）", "福克斯ST（进口）", "Mustang（进口）", "其他福特车型"],
                                  "modelcode" : {
                                  "福睿斯" : "Escort",
                                  "锐界" : "Edge",
                                  "金牛座" : "Taurus",
                                  "致胜" : "Mondeo",
                                  "新蒙迪欧" : "New Mondeo",
                                  "翼搏" : "EcoSport",
                                  "翼虎" : "Kuga",
                                  "嘉年华" : "Fiesta",
                                  "新嘉年华" : "New Fiesta",
                                  "福克斯" : "Focus",
                                  "经典福克斯" : "Focus Classic",
                                  "新福克斯" : "New Focus",
                                  "全新福克斯" : "All New Focus",
                                  "麦柯斯S-MAX" : "SMAX",
                                  "锐界（进口）" : "Edge Imported",
                                  "探险者（进口）" : "Explorer",
                                  "嘉年华ST（进口）" : "Fiesta ST",
                                  "福克斯ST（进口）" : "Focus ST",
                                  "Mustang（进口）" : "Mustang",
                                  "其他福特车型" : "Other Ford Vehicle"
                                  },
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/cn.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "fuyu" : "http://58.68.246.102",
                                  "t&clink" : "https://www.ford.com.cn/servlet/Satellite?c=DFYArticle&cid=1249172237668&pagename=wrapper&site=CNEX",
                                  "privacy" : "https://www.ford.com.cn/servlet/Satellite?c=DFYArticle&cid=1248948022498&pagename=wrapper&site=CNEX",
                                  "disclaimer" : "https://www.ford.com.cn/servlet/Satellite?c=DFYArticle&cid=1248947716676&pagename=wrapper&site=CNEX",
                                  "legal" : "https://www.ford.com.cn/servlet/Satellite?c=DFYArticle&cid=1249172226694&pagename=wrapper&site=CNEX"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification", "fuyu"]
                       }, {
                       "name" : "Thailand",
                       "code" : "TH",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "i18n" : "en-th",
                                  "site" : "FTHEN",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.co.th/en/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.th/en/owner/forgot-password",
                                  "video" : "http://www.soku.com/search_video/q_ford",
                                  "sync" : "https://www.ford.co.th/en/owner/sync-support?v=101",
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
                                  "model" : ["Escape 2009", "Everest 2012", "Focus 2010", "Focus 2012", "Ranger 2009", "Ranger 2011", "Territory 2012", "Fiesta 2010", "Fiesta 2013", "EcoSport 2013", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/th.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "privacy" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL"
                                  }, {
                                  "name" : "Thai",
                                  "code" : "th",
                                  "i18n" : "th-th",
                                  "site" : "FTH",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.co.th/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.th/owner/forgot-password",
                                  "video" : "http://www.soku.com/search_video/q_ford",
                                  "sync" : "https://www.ford.co.th/en/owner/sync-support?v=101",
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
                                  "model" : ["Escape 2009", "Everest 2012", "Focus 2010", "Focus 2012", "Ranger 2009", "Ranger 2011", "Territory 2012", "Fiesta 2010", "Fiesta 2013", "EcoSport 2013", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/th.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "privacy" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Indonesia",
                       "code" : "ID",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "i18n" : "en-id",
                                  "site" : "FMIEN",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.co.id/en/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.id/en/owner/forgot-password",
                                  "video" : "http://www.soku.com/search_video/q_ford",
                                  "sync" : "https://www.ford.co.id/en/owner/sync-support?v=101",
                                  "ra" : [{
                                          "title" : "Jakarta area",
                                          "number" : "0817 17 3673"
                                          }, {
                                          "title" : "Surabaya area",
                                          "number" : "0818 33 3673"
                                          },{
                                          "title" : "Denpasar area",
                                          "number" : "0817 977 3673"
                                          },{
                                          "title" : "Bandung area",
                                          "number" : "0817 20 3673"
                                          },{
                                          "title" : "Semarang area",
                                          "number" : " 0817 29 3673"
                                          },{
                                          "title" : "Medan area",
                                          "number" : "0819 89 3673"
                                          },{
                                          "title" : "Pekanbaru area",
                                          "number" : "0819 769 3673"
                                          },{
                                          "title" : "Makassar area",
                                          "number" : "0817 0366 3673"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : ["Quality Care Certified", "Vehicle", "Service", "Parts", "Used Car", "Body Repair"],
                                  "model" : ["Focus 2005", "Focus 2012", "Fiesta 2010", "Fiesta 2013", "Escape 2007", "Everest 2009", "Ranger 2009", "Ranger 2012", "All New Ecosport 2014", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/id.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "privacy" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL"
                                  }, {
                                  "name" : "Bahasa Indonesia",
                                  "code" : "id",
                                  "i18n" : "id-id",
                                  "site" : "FMI",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.co.id/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.co.id/owner/forgot-password",
                                  "video" : "http://www.soku.com/search_video/q_ford",
                                  "sync" : "https://www.ford.co.id/en/owner/sync-support?v=101",
                                  "ra" : [{
                                          "title" : "Jakarta area",
                                          "number" : "0817 17 3673"
                                          }, {
                                          "title" : "Surabaya area",
                                          "number" : "0818 33 3673"
                                          },{
                                          "title" : "Denpasar area",
                                          "number" : "0817 977 3673"
                                          },{
                                          "title" : "Bandung area",
                                          "number" : "0817 20 3673"
                                          },{
                                          "title" : "Semarang area",
                                          "number" : " 0817 29 3673"
                                          },{
                                          "title" : "Medan area",
                                          "number" : "0819 89 3673"
                                          },{
                                          "title" : "Pekanbaru area",
                                          "number" : "0819 769 3673"
                                          },{
                                          "title" : "Makassar area",
                                          "number" : "0817 0366 3673"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : ["Quality Care Certified", "Vehicle", "Service", "Parts", "Used Car", "Body Repair"],
                                  "model" : ["Focus 2005", "Focus 2012", "Fiesta 2010", "Fiesta 2013", "Escape 2007", "Everest 2009", "Ranger 2009", "Ranger 2012", "All New Ecosport 2014", "Other Ford Vehicle"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/id.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "privacy" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "Philippines",
                       "code" : "PH",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "i18n" : "en-ph",
                                  "site" : "FPH",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.com.ph/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.ph/owner/forgot-password",
                                  "video" : "https://www.youtube.com/watch?v=NduF4-nxJQg&list=PLmrv26fl7yVshxwqqFxg8p2CJmepRZ9QB",
                                  "sync" : "https://www.ford.com.ph/owner/sync-support?v=101",
                                  "ra" : [{
                                          "title" : "24-HOUR HOTLINE NUMBER ",
                                          "number" : "(02) 459-4723"
                                          }],
                                  "cc" : "1.0",
                                  "phrase" : "1.0",
                                  "indicator" : "1.0",
                                  "service" : [],
                                  "model" : ["Everest 2013", "EcoSport 2014", "Escape 2012", "Escape 2015", "Expedition 2015", "Explorer 2015", "Focus 2012", "Fiesta 2010", "Fiesta 2015", "Mustang 2011", "Mustang 2015", "Ranger 2012 4X2", "Ranger 2012 4X4", "Ranger 2014 4X2", "Ranger 2014 4X4", "Other Ford Vehicle"],
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
                       "code" : "VN",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 30000,
                       "langs" : [{
                                  "name" : "Vietnamese",
                                  "code" : "vi",
                                  "i18n" : "vi-vn",
                                  "site" : "FVN",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
                                  "fgtname" : "https://www.ford.com.vn/owner/forgetusername",
                                  "fgtpswd" : "https://www.ford.com.vn/owner/forgot-password",
                                  "video" : "http://www.soku.com/search_video/q_ford",
                                  "sync" : "http://www.ford.com.vn/owner/sync-support?sitetype=web&v=101&site=FVN",
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
                                  "service" : ["CPS Participating", "FPV Dealer", "New Cars", "Parts", "Service", "Used Cars", "Body Shop"],
                                  "model" : ["Ecosport", "Endeavour", "Fiesta", "Fiesta Classic", "Figo", "Fusion", "Ikon"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/vn.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "privacy" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730307&pagename=wrapper&site=FIPL"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }, {
                       "name" : "India",
                       "code" : "IN",
                       "map" : "2",
                       "androidver" : "1.0",
                       "iosver" : "1.0",
                       "timeout" : 60000,
                       "langs" : [{
                                  "name" : "English",
                                  "code" : "en",
                                  "i18n" : "en-in",
                                  "site" : "FIPL",
                                  "host" : "wwwqa.origin.akamaitest.dragonfly.ford.com",
                                  "lhhost" : "https://ssoqa.ford.com",
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
                                  "model" : ["All-New Endeavour", "Ecosport", "Endeavour", "Fiesta", "Fiesta Classic", "Figo", "Fusion", "Ikon"],
                                  "configUrl" : "http://apacvideo.ford.com.edgesuite.net/fordowners/Mobile-App/akamai/app/config/in.json",
                                  "cdn" : "http://apacvideo.ford.com.edgesuite.net/fordowners",
                                  "t&clink" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249149665504&pagename=wrapper&site=FIPL",
                                  "privacy" : "http://www.india.ford.com/privacy-disclaimer",
                                  "disclaimer" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249016730326&pagename=wrapper&site=FIPL",
                                  "legal" : "https://www.india.ford.com/servlet/Satellite?c=DFYArticle&cid=1249152353183&pagename=wrapper&site=FIPL"
                                  }],
                       "modules" : ["dealer", "callcenter", "roadAssist", "checklist", "knowledge", "recall", "notification"]
                       }];
