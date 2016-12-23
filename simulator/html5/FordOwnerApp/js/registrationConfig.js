/*********************************
Copyright, 2014 Ford Motor Company 
 
All rights, including copyright and database right, in the application and its contents, are owned by or licensed to Ford, or otherwise used by Ford as permitted by applicable law or the copyright holder. You may not copy, reproduce, republish, download, post, broadcast or transmit any text, images, graphic, logo, button, icon, image and their selection and arrangement thereof for any commercial or public purpose without prior written permission from Ford or the copyright holder. You may not reverse engineer, decompile, translate,  disassemble or attempt to discover any source code and software or underlying ideas or algorithms of the application nor permit others to reverse engineer, decompile or disassemble the source code and software,  except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not distribute, copy, make modifications to or create derivative works based on the source code and software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation or to the extent as may be permitted by the licensing terms governing use of any open source components included with the source code and software. You may not adapt, alter or create any of the material or information in this application or use it for any other purpose other than for your personal non-commercial use. 
 
You agree to use this application only for lawful purposes. You agree to be responsible for and assume the risk to the following: (i) any use of the application while driving an automobile or other vehicle in violation of applicable law or otherwise driving in an unsafe manner presents a significant risk of distracted driving and should not be attempted under any circumstances; and (ii) use of the application may cause you to incur additional charges from your wireless service provider.
 
Ford reserves the right to use for its own purposes any material submitted to the application, including text and images, either on the application or in any other form, including for publicity purposes. Ford reserves the right to monitor submissions to the application and to edit or reject any submissions. Without prejudice to any other rights, Ford may terminate this license if you fail to comply with the terms and conditions of this license.
*********************************/

amGloble.registration = {
	"FOA" : {
		"fields" : {
			"username" : {
				"regmsg" : "Between 1 and 60 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"email" : {
				"regmsg" : "It must contain @ and .",
				"reg" : "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
				"required" : "true"
			},
			"password" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"password_confirmation" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"forum_nickname" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"vehicle_nickname_1" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"title" : {
				"regmsg" : "Your title is not a valid title!",
				"reg" : "^[^<\\>&;]{0,10}$",
				"required" : "true"
			},
			"vehicle_vin_1" : {
				"regmsg" : "Your VIN is invalid. Please check your VIN and try again.",
				"reg" : "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
				"required" : "true"
			},
			"firstname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"lastname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"country" : {
				"regmsg" : "Your country name is not a valid country name!",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"min" : {
				"regmsg" : "It must be in 10 digits, starting with 0 (zero).",
				"reg" : "^0[0-9]{9}$",
				"required" : "true"
			},
			"street" : {
				"regmsg" : "Between 2 and 128 characters, It can’t contain <>&",
				"reg" : "^[^<\\>&;]{2,128}$",
				"required" : "true"
			},
			"exterior_number" : {
				"regmsg" : "UserProfile/Validation/ExteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/ExteriorNumberReg",
				"required" : "true"
			},
			"interior_number" : {
				"regmsg" : "UserProfile/Validation/InteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/InteriorNumberReg",
				"required" : "false"
			},
			"municipality" : {
				"regmsg" : "UserProfile/Validation/MunicipalityInvalidMessage",
				"reg" : "UserProfile/Validation/MunicipalityReg",
				"required" : "true"
			},
			"suburb" : {
				"regmsg" : "UserProfile/Validation/SuburbInvalidMessage",
				"reg" : "UserProfile/Validation/SuburbReg",
				"required" : "false"
			},
			"postal_code" : {
				"regmsg" : "It must be in 4 digits.",
				"reg" : "^[0-9]{4}$",
				"required" : "true"
			},
			"state" : {
				"regmsg" : "Your state is not a valid state!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "true"
			},
			"city" : {
				"regmsg" : "Your city is not a valid city!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "false"
			},
			"work_phone" : {
				"regmsg" : "It must be in 10 digits, starting with 0 (zero).",
				"reg" : "^0[0-9]{9}$",
				"required" : "false"
			},
			"home_phone" : {
				"regmsg" : "It must be in 10 digits, starting with 0 (zero).",
				"reg" : "^0[0-9]{9}$",
				"required" : "false"
			}
		},
		"ajax" : {
			"username" : {
				"data" : "username",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=username"
			},
			"forum_nickname" : {
				"data" : "forum_nickname",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=nickname"
			},
			"vehicle_vin_1" : {
				"data" : "vehicle_vin_1",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FOA&type=vin"
			}
		},
		"equal" : {
			"password_confirmation" : {
				"eqmsg" : "Passwords do not match. Please try again.",
				"target" : "password"
			},
			"min_confirmation" : {
				"eqmsg" : "Mobile Phone Number and Mobile Phone Number confirmation do not match.",
				"target" : "min"
			}
		},
		"accept" : {
			"terms_and_conditions" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			},
			"legal_agreement" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			}
		}
	},
	"FIPL" : {
		"fields" : {
			"username" : {
				"regmsg" : "Between 1 and 60 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"email" : {
				"regmsg" : "It must contain @ and.",
				"reg" : "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
				"required" : "true"
			},
			"password" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"password_confirmation" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"forum_nickname" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"vehicle_nickname_1" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"title" : {
				"regmsg" : "Your title is not a valid title!",
				"reg" : "^[^<\\>&;]{0,10}$",
				"required" : "true"
			},
			"vehicle_vin_1" : {
				"regmsg" : "Your VIN is invalid. Please check your VIN and try again.",
				"reg" : "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
				"required" : "true"
			},
			"firstname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"lastname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"country" : {
				"regmsg" : "Your country name is not a valid country name!",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"min" : {
				"regmsg" : "It must be 10 digits, starting with seven to nine (7-9).",
				"reg" : "^[7-9]{1}\\d{9}$",
				"required" : "true"
			},
			"street" : {
				"regmsg" : "Between 2 and 128 characters, It can’t contain <>&",
				"reg" : "^[^<\\>&;]{2,128}$",
				"required" : "true"
			},
			"exterior_number" : {
				"regmsg" : "UserProfile/Validation/ExteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/ExteriorNumberReg",
				"required" : "true"
			},
			"interior_number" : {
				"regmsg" : "UserProfile/Validation/InteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/InteriorNumberReg",
				"required" : "false"
			},
			"municipality" : {
				"regmsg" : "UserProfile/Validation/MunicipalityInvalidMessage",
				"reg" : "UserProfile/Validation/MunicipalityReg",
				"required" : "true"
			},
			"suburb" : {
				"regmsg" : "UserProfile/Validation/SuburbInvalidMessage",
				"reg" : "UserProfile/Validation/SuburbReg",
				"required" : "false"
			},
			"postal_code" : {
				"regmsg" : "It must be in 6 digits.",
				"reg" : "^[0-9]{6}$",
				"required" : "true"
			},
			"state" : {
				"regmsg" : "Your state is not a valid state!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "true"
			},
			"city" : {
				"regmsg" : "Your city is not a valid city!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "false"
			},
			"work_phone" : {
				"regmsg" : "It must be in 10 digits, starting with 0 (zero). eg. 0386126809",
				"reg" : "^0\\d{9}$",
				"required" : "false"
			},
			"home_phone" : {
				"regmsg" : "It must be in 10 digits, starting with 0 (zero).",
				"reg" : "^0\\d{9}$",
				"required" : "false"
			}
		},
		"ajax" : {
			"username" : {
				"data" : "username",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FIPL&type=username"
			},
			"forum_nickname" : {
				"data" : "forum_nickname",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FIPL&type=nickname"
			},
			"vehicle_vin_1" : {
				"data" : "vehicle_vin_1",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FIPL&type=vin"
			}
		},
		"equal" : {
			"password_confirmation" : {
				"eqmsg" : "Passwords do not match. Please try again.",
				"target" : "password"
			},
			"min_confirmation" : {
				"eqmsg" : "MIN and MIN confirmation do not match.",
				"target" : "min"
			}
		},
		"accept" : {
			"terms_and_conditions" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			},
			"legal_agreement" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			}
		}
	},
	"FNZ" : {
		"fields" : {
			"username" : {
				"regmsg" : "Between 1 and 60 characters. Only letters, numbers and hyphenation are valid.",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"email" : {
				"regmsg" : "It must contain @ and .",
				"reg" : "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
				"required" : "true"
			},
			"password" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"password_confirmation" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"forum_nickname" : {
				"regmsg" : "Between 1 and 30 characters. Only letters, numbers and hyphenation are valid",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"vehicle_nickname_1" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&;@",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"title" : {
				"regmsg" : "Your title is not a valid title!",
				"reg" : "^[^<\\>&;]{0,10}$",
				"required" : "true"
			},
			"vehicle_vin_1" : {
				"regmsg" : "The VIN you have entered is invalid. Pleasecheck your VIN and try again.",
				"reg" : "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
				"required" : "true"
			},
			"firstname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"lastname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"country" : {
				"regmsg" : "Your country name is not a valid country name!",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"min" : {
				"regmsg" : "It must be in 9-15 digits.",
				"reg" : "^0\\d{8,9}$",
				"required" : "true"
			},
			"street" : {
				"regmsg" : "Between 2 and 28 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{2,128}$",
				"required" : "false"
			},
			"exterior_number" : {
				"regmsg" : "UserProfile/Validation/ExteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/ExteriorNumberReg",
				"required" : "true"
			},
			"interior_number" : {
				"regmsg" : "UserProfile/Validation/InteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/InteriorNumberReg",
				"required" : "false"
			},
			"municipality" : {
				"regmsg" : "UserProfile/Validation/MunicipalityInvalidMessage",
				"reg" : "UserProfile/Validation/MunicipalityReg",
				"required" : "true"
			},
			"suburb" : {
				"regmsg" : "UserProfile/Validation/SuburbInvalidMessage",
				"reg" : "UserProfile/Validation/SuburbReg",
				"required" : "false"
			},
			"postal_code" : {
				"regmsg" : "It must be in 4 digits.",
				"reg" : "^[0-9]{4}$",
				"required" : "true"
			},
			"state" : {
				"regmsg" : "Your state is not a valid state!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "true"
			},
			"city" : {
				"regmsg" : "Your city is not a valid city!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "false"
			},
			"work_phone" : {
				"regmsg" : "It must be in 9 digits.",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			},
			"home_phone" : {
				"regmsg" : "It must be in 9 digits.",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			}
		},
		"ajax" : {
			"username" : {
				"data" : "username",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FNZ&type=username"
			},
			"forum_nickname" : {
				"data" : "forum_nickname",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FNZ&type=nickname"
			},
			"vehicle_vin_1" : {
				"data" : "vehicle_vin_1",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FNZ&type=vin"
			}
		},
		"equal" : {
			"password_confirmation" : {
				"eqmsg" : "Passwords do not match. Please try again.",
				"target" : "password"
			},
			"min_confirmation" : {
				"eqmsg" : "Mobile phone number and confirmation do not match.",
				"target" : "min"
			}
		},
		"accept" : {
			"terms_and_conditions" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			},
			"legal_agreement" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			}
		}
	},
	"FTH" : {
		"fields" : {
			"username" : {
				"regmsg" : "ต้องมี 1-60 ตัวอักษร และห้ามมีสัญลักษณ์ <>&",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"email" : {
				"regmsg" : "อีเมลล์ต้องมี @ และ .",
				"reg" : "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
				"required" : "true"
			},
			"password" : {
				"regmsg" : "รหัสผ่านต้องมี 6-20 ตัวอักษร โดยต้องมีตัวหนังสืออักษรอย่างน้อย 1 ตัว และ ตัวเลข 1 ตัว และห้ามมีสัญลักษณ์ <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"password_confirmation" : {
				"regmsg" : "รหัสผ่านต้องมี 6-20 ตัวอักษร โดยต้องมีตัวหนังสืออักษรอย่างน้อย 1 ตัว และ ตัวเลข 1 ตัว และห้ามมีสัญลักษณ์ <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"forum_nickname" : {
				"regmsg" : "ต้องมีตัวอักษรระหว่างประมาณ 1 - 30 ตัวอักษร และห้ามมี <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"vehicle_nickname_1" : {
				"regmsg" : "ต้องมีตัวอักษรระหว่างประมาณ 1 - 30 ตัวอักษร และห้ามมี <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"title" : {
				"regmsg" : "คำนำหน้าของคุณไม่ถูกต้อง",
				"reg" : "^[^<\\>&;]{0,10}$",
				"required" : "true"
			},
			"vehicle_vin_1" : {
				"regmsg" : "หมายเลขตัวถัง (VIN) ไม่ถูกต้อง หรือ ไม่สามารถใช้งานกับระบบช่วยเหลือ SYNC®<\/sup> ได้",
				"reg" : "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
				"required" : "true"
			},
			"firstname" : {
				"regmsg" : "ต้องมีตัวอักษรระหว่างประมาณ 1 - 128 ตัวอักษร และห้ามมี <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"lastname" : {
				"regmsg" : "ต้องมีตัวอักษรระหว่างประมาณ 1 - 128 ตัวอักษร และห้ามมี <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"country" : {
				"regmsg" : "ชื่อประเทศไม่ถูกต้อง",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"min" : {
				"regmsg" : "เบอร์มือถือต้องมีตัวเลข 10 หลัก",
				"reg" : "^[0-9]{10}$",
				"required" : "true"
			},
			"street" : {
				"regmsg" : "ต้องมีตัวอักษรระหว่างประมาณ 2 - 128 ตัวอักษร และห้ามมี <>&",
				"reg" : "^[^<\\>&;]{2,128}$",
				"required" : "true"
			},
			"exterior_number" : {
				"regmsg" : "UserProfile/Validation/ExteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/ExteriorNumberReg",
				"required" : "true"
			},
			"interior_number" : {
				"regmsg" : "UserProfile/Validation/InteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/InteriorNumberReg",
				"required" : "false"
			},
			"municipality" : {
				"regmsg" : "UserProfile/Validation/MunicipalityInvalidMessage",
				"reg" : "UserProfile/Validation/MunicipalityReg",
				"required" : "true"
			},
			"suburb" : {
				"regmsg" : "UserProfile/Validation/SuburbInvalidMessage",
				"reg" : "UserProfile/Validation/SuburbReg",
				"required" : "false"
			},
			"postal_code" : {
				"regmsg" : "รหัสไปรษณีย์ต้องมีตัวเลข 5 หลักหน่วย",
				"reg" : "^[0-9]{5}$",
				"required" : "true"
			},
			"state" : {
				"regmsg" : "ชื่อจังหวัดของคุณไม่ถูกต้อง",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "true"
			},
			"city" : {
				"regmsg" : "ชื่อประเทศของคุณไม่ถูกต้อง",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "false"
			},
			"work_phone" : {
				"regmsg" : "หมายเลขโทรศัพท์ที่ทำงานของคุณไม่ถูกต้อง",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			},
			"home_phone" : {
				"regmsg" : "หมายเลขโทรศัพท์บ้านของคุณไม่ถูกต้อง",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			}
		},
		"ajax" : {
			"username" : {
				"data" : "username",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTH&type=username"
			},
			"forum_nickname" : {
				"data" : "forum_nickname",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTH&type=nickname"
			},
			"vehicle_vin_1" : {
				"data" : "vehicle_vin_1",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTH&type=vin"
			}
		},
		"equal" : {
			"password_confirmation" : {
				"eqmsg" : "การยืนยันรหัสผ่านไม่ตรงกับรหัสผ่านที่ระบุไว้",
				"target" : "password"
			},
			"min_confirmation" : {
				"eqmsg" : "การยืนยันหมายเลขโทรศัพท์มือถือไม่ตรงกับหมายเลขที่ระบุ",
				"target" : "min"
			}
		},
		"accept" : {
			"terms_and_conditions" : {
				"acpmsg" : "กรุณาเลือกในช่องว่าง ถ้าคุณต้องการลงทะเบียน"
			},
			"legal_agreement" : {
				"acpmsg" : "กรุณาเลือกในช่องว่าง ถ้าคุณยอมรับในข้อตกลงทางกฎหมายสำหรับผู้ใช้งาน"
			}
		}
	},
	"FTHEN" : {
		"fields" : {
			"username" : {
				"regmsg" : "Between 1 and 60 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"email" : {
				"regmsg" : "It must contain @ and .",
				"reg" : "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{2,})+|\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])$",
				"required" : "true"
			},
			"password" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"password_confirmation" : {
				"regmsg" : "Between 6 and 20 characters, contain at least 1 letter and 1 number. It can’t contain <>&",
				"reg" : "^(?=.*\\d+)(?=.*[a-zA-Z])[^<\\>&;]{6,20}$",
				"required" : "true"
			},
			"forum_nickname" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"vehicle_nickname_1" : {
				"regmsg" : "Between 1 and 30 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,30}$",
				"required" : "true"
			},
			"title" : {
				"regmsg" : "Your title is not a valid title!",
				"reg" : "^[^<\\>&;]{0,10}$",
				"required" : "true"
			},
			"vehicle_vin_1" : {
				"regmsg" : "Your VIN is invalid or your vehicle doesn’t support SYNC®<\/sup>",
				"reg" : "^[0-9a-hA-Hj-nJ-NpPr-zR-Z]{17}$",
				"required" : "true"
			},
			"firstname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"lastname" : {
				"regmsg" : "Between 1 and 128 characters. It can’t contain <>&",
				"reg" : "^[^<\\>&;]{1,128}$",
				"required" : "true"
			},
			"country" : {
				"regmsg" : "Your country name is not a valid country name!",
				"reg" : "^[^<\\>&;]{1,60}$",
				"required" : "true"
			},
			"min" : {
				"regmsg" : "It must be in 10 digits.",
				"reg" : "^[0-9]{10}$",
				"required" : "true"
			},
			"street" : {
				"regmsg" : "Between 2 and 128 characters, It can’t contain <>&",
				"reg" : "^[^<\\>&;]{2,128}$",
				"required" : "true"
			},
			"exterior_number" : {
				"regmsg" : "UserProfile/Validation/ExteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/ExteriorNumberReg",
				"required" : "true"
			},
			"interior_number" : {
				"regmsg" : "UserProfile/Validation/InteriorNumberInvalidMessage",
				"reg" : "UserProfile/Validation/InteriorNumberReg",
				"required" : "false"
			},
			"municipality" : {
				"regmsg" : "UserProfile/Validation/MunicipalityInvalidMessage",
				"reg" : "UserProfile/Validation/MunicipalityReg",
				"required" : "true"
			},
			"suburb" : {
				"regmsg" : "UserProfile/Validation/SuburbInvalidMessage",
				"reg" : "UserProfile/Validation/SuburbReg",
				"required" : "false"
			},
			"postal_code" : {
				"regmsg" : "It must be in 5 digits.",
				"reg" : "^[0-9]{5}$",
				"required" : "true"
			},
			"state" : {
				"regmsg" : "Your province is not a valid province!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "true"
			},
			"city" : {
				"regmsg" : "Your city is not a valid city!",
				"reg" : "^[^<\\>&;]{0,30}$",
				"required" : "false"
			},
			"work_phone" : {
				"regmsg" : "It must be in 9 digits.",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			},
			"home_phone" : {
				"regmsg" : "It must be in 9 digits.",
				"reg" : "^[0-9]{9}$",
				"required" : "false"
			}
		},
		"ajax" : {
			"username" : {
				"data" : "username",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTHEN&type=username"
			},
			"forum_nickname" : {
				"data" : "forum_nickname",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTHEN&type=nickname"
			},
			"vehicle_vin_1" : {
				"data" : "vehicle_vin_1",
				"url" : "/servlet/ContentServer?pagename=DFY/UserProfile/JSON&site=FTHEN&type=vin"
			}
		},
		"equal" : {
			"password_confirmation" : {
				"eqmsg" : "Passwords do not match. Please try again.",
				"target" : "password"
			},
			"min_confirmation" : {
				"eqmsg" : "MIN and MIN confirmation do not match.",
				"target" : "min"
			}
		},
		"accept" : {
			"terms_and_conditions" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			},
			"legal_agreement" : {
				"acpmsg" : "Please tick this box if you wish to register!"
			}
		}
	}
};
