/**
* 1. Slider类,用于创建一个Slider对象
* @class
* @param [string]    	opt.id			必需						Carrousel控件ID
* @param [int]			opt.nPos		必需						当前位置
* @param [int]			opt.minPos  	必需						最小X坐标
* @param [int]			opt.maxPos  	必需						最大X坐标
* @param [int]			opt.onchange  	可选						callback
* @return [object]	 产生的Slider对象
* @description  1.
*
* @example
*/
$.am.Slider = function(e){
	this.id=e.id;
	this.nPos = this.pos=e.pos;
	this.minPos = e.minPos;
	this.maxPos = e.maxPos;
	this.onchange = e.onchange;
	$.am.components.push(this);
	$.am.Component.call(this,e);
}
$.am.Slider.prototype = {
	componentInit : function(){
		this.$ = $("#"+this.id);
		this.$.setTransformPos(this.pos,"x");
		var _this = this;
		this.$.bind({
			"vtouchstart" : function(event,position){
				_this.start(position.x);
				return false;
			},
			"vtouchmove" : function(event, position){
				_this.move(position.x);
				return false;
			},
			"vtouchend" : function(event, position){
				_this.end(position.x);
				return false;
			}
		});
	},
	start : function(e){
		this.startPos = e;
	},
	move : function(e){
		this.endPos = e;
		var m = e-this.startPos;
		if((m<0 && this.pos+m>this.minPos) || m>0 && this.pos < this.maxPos-m){
			this.nPos=this.pos+m;
			this.$.setTransformPos(this.nPos,"x");
		}
	},
	end : function(e){
		var m = this.endPos-this.startPos, hw = (this.maxPos-this.minPos)/2;
		if(m && m > hw){
			this._goto(this.maxPos);
		}else if(m && m < -hw){
			this._goto(this.minPos);
		}else{
			this._goto(this.pos);
		}
		this.endPos = 'undefined';
	},
	toggle : function(){
		if(this.nPos == this.maxPos){
			this._goto(this.minPos);
		}else{
			this._goto(this.maxPos);
		}
	},
	_goto : function(end, time){
		this.$.animateTranslate3d(this.nPos,end,"x",time || 200);
		this.nPos=this.pos=end;
		this.onchange && this.onchange(this.nPos);
	}
}




