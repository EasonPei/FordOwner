URLParser = function(url) {

	this._fields = {
		'Username' : 4,
		'Password' : 5,
		'Port' : 7,
		'Protocol' : 2,
		'Host' : 6,
		'Pathname' : 8,
		'URL' : 0,
		'Querystring' : 9,
		'Fragment' : 10
	};

	this._values = {};
	this._regex = null;
	this.version = 0.1;
	this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
	for (var f in this._fields) {
		this['get' + f] = this._makeGetter(f);
	}

	if ( typeof url != 'undefined') {
		this._parse(url);
	}
}
URLParser.prototype.setURL = function(url) {
	this._parse(url);
}

URLParser.prototype._initValues = function() {
	for (var f in this._fields) {
		this._values[f] = '';
	}
}

URLParser.prototype._parse = function(url) {
	this._initValues();
	var r = this._regex.exec(url);
	if (!r)
		throw "DPURLParser::_parse -> Invalid URL";

	for (var f in this._fields)
	if ( typeof r[this._fields[f]] != 'undefined') {
		this._values[f] = r[this._fields[f]];
	}
}
URLParser.prototype._makeGetter = function(field) {
	return function() {
		return this._values[field];
	}
}