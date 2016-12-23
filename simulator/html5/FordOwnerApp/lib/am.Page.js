/**
 * $.am.Page.js
 * @description  1.定义一个page对象
 *---------------------------------------------------------------------------
 * @ 目录:
 * 1. sns
 *
 *---------------------------------------------------------------------------
 * @version		0.1
 * @author		shu.wu@hp.com
 * @lastEdit		2012-7-4
 *
 */
(function(window, $) {

	$.fn.setTransformPos = function(pos, d, hasInput) {
		//$("input:focus").blur();

		var opt;

		if (hasInput && $.am.use2d) {

			switch(d) {
				case "x":
					opt = 'translate(' + pos + 'px, 0)';
					// this.parent().scrollLeft(-pos)
					//this[0].style.left = pos+"px";
					break;
				case "y":
					opt = 'translate(0,' + pos + 'px)';
					// this.parent().scrollTop(-pos)
					// this[0].style.top = pos + "px";
					break;
				case "xy":
					opt = 'translate(' + pos[0] + 'px,' + pos[1] + 'px)';
					break;
			}
			this[0].style.transform = opt;
			this[0].style.webkitTransform = opt;
		} else {

			switch(d) {
				case "x":
					opt = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + pos + ', 0, 0, 1)';
					break;
				case "y":
					opt = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' + pos + ', 0, 1)';
					break;
				case "z":
					opt = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, ' + pos + ')';
					break;
				case "xy":
					opt = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + pos[0] + "," + pos[1] + ', 0, 1)';
					break;
			}
			this[0].style.transform = opt;
			this[0].style.webkitTransform = opt;
		}

		return this;
	};

	$.fn.animateTranslate3d = function(cPos, tPos, d, t, cb) {
		//console.log(cPos+" | "+tPos+" | "+d+" | "+t);
		var ot = new Date().getTime();
		var _this = this;
		this.doAnimateTranslate3d = function() {
			var nt = new Date().getTime();
			var step = nt - ot;
			var nPos = cPos + (tPos - cPos) * step / t;
			_this.setTransformPos(nPos, d);
			if (step >= t) {
				_this.setTransformPos(tPos, d);
				//setTimeout(function(){
				cb && cb();
				//},300);
			} else {
				setTimeout(function() {
					_this.doAnimateTranslate3d();
				}, 10);
			}
		};
		this.doAnimateTranslate3d();
	};
	$.am.pages = {};
	//当前活动的page
	var activePage = null;
	//存放显示的page历史记录的堆栈
	$.am.history = [];
	$.am.getActivePage = function() {
		return activePage;
	};
	/**
	 * 1. Page类,用于创建一个Page对象
	 * @class
	 * @param [string]    opt.id
	 * @return [object]	 产生的Page对象
	 * @description  1.
	 *
	 * @example
	 */
	var Page = function(e) {

		// this.id = e.id;
		$.extend(this, e);
		$.am.pages[e.id] = this;
		$.am.components.push(this);
		$.am.Component.call(this, e);
	};
	Page.prototype = {
		componentInit : function() {
			var self = this;
			this.$ = $("#" + this.id);
			var $wrap = this.$.children(".am-body-wrap");
			var $inner = $wrap.children(".am-body-inner");
			if ($wrap.length && $inner.length) {
				this.scrollview = new $.am.ScrollView({
					$wrap : $wrap,
					$inner : $inner,
					direction : [false, !this.disableScroll],
					hasInput : this.hasInput
				});
			}
			this.$header = this.$.children(".am-header");
			this.$footer = this.$.children(".am-footer");
			this.$body = this.$.children(".am-body-wrap");

			this.$backButton = this.$header.find(".am-backbutton");
			if (this.$backButton.length > 0) {
				this.$backButton.addClass("am-clickable").vclick(function() {
					self.backButtonOnclick ? self.backButtonOnclick() : $.am.page.back();
				});
			}
		},
		setBodyHeight : function(wh) {

			var h1 = 0;
			var h2 = 0;
			this.$body.prevAll(":visible").each(function() {
				var $this = $(this);
				if ($(this).css("position") == "absolute") {
					return;
				}
				h1 += $(this).outerHeight(true);
			});
			// console.log("setBodyHeight", h1);
			this.$body.nextAll(":visible").each(function() {
				if ($(this).css("position") == "absolute" && !$(this).hasClass("am-placeholder")) {
					return;
				}
				h2 += $(this).outerHeight(true);
			});
			var $tab = $("div.am-tab:visible");
			if ($tab.length > 0) {
				h2 += $tab.outerHeight();
			}
			// console.log("setBodyHeight", h2);
			this.$body.css({
				"top" : h1,
				"bottom" : h2
			});
			this.scrollview && this.scrollview.refresh();

		},
		changeToMe : function(animation, para) {
			$.am.changePage(this, animation, para);
		},
		refresh : function() {
			this.setBodyHeight($.am.getInnerHeight());
		},
		setStatus : function(status, text) {
			var $page = this.$.removeClass("am-status-loading am-status-error am-status-empty");
			switch(status) {
				case "loading":
					$page.addClass("am-status-loading");
					break;
				case "error":
					$page.addClass("am-status-error");
					break;
				case "empty":
					$page.addClass("am-status-empty");
					break;
				case "normal":
				default:

			}

		},
		
		bindImgs : function($imgs, sync) {
			if (!this._$imgs) {
				this._$imgs = $imgs;
			} else {
				var arrDom = [];
				this._$imgs.each(function() {
					arrDom.push(this);
				});
				$imgs.each(function() {
					arrDom.push(this);
				});
				this._$imgs = $(arrDom);
			}
			this.sync = sync;

			var _this = this;
			this.scrollview.onScrollStop = function() {
				_this._showActiveImgs();
			};
		},
		unbindImgs : function() {
			this._$imgs = undefined;
			this._rendered = [];
			this.sync = undefined;
			this.scrollview.onScrollStop = undefined;
			return this;
		},
		_rendered : [],
		_showActiveImgs : function() {
			if (!this._$imgs || this._$imgs.length < 1) {
				return;
			}
			this.arrImgs = [];
			var yMin = this.scrollview.$wrap.offset().top;
			var yMax = this.scrollview.$wrap.height();
			for (var i = 0; i < this._$imgs.length; i++) {
				var pos = this._$imgs.eq(i).parent().offset().top - yMin;
				var h = this._$imgs.eq(i).parent().height();
				//console.log(pos);
				if (!this._rendered[i] && pos > -h && pos < yMax) {
					if (this.sync) {
						this.arrImgs.push(this._$imgs.eq(i));
					} else {
						this._$imgs.eq(i).getPicture(this._$imgs.eq(i).attr("picId"));
					}
					this._rendered[i] = true;
				}
			}

			if (this.arrImgs.length > 0) {
				this._renderImgCount = 0;
				this._renderImgSync();
			}
		},
		_renderImgSync : function() {
			var obj = this.arrImgs[this._renderImgCount], _this = this;
			if (obj) {
				if (obj.attr("picId")) {
					$.am.debug.log("_renderImgSync:" + obj.attr("picId"));
					obj.getPicture(obj.attr("picId"), function() {
						_this._renderImgCount++;
						_this._renderImgSync();
					}, function() {
						_this._renderImgCount++;
						_this._renderImgSync();
					});
				} else {
					setTimeout(function() {
						_this._renderImgCount++;
						_this._renderImgSync();
					}, 50);
				}
			} else {

				$.am.debug.log("_renderImgSync: no picId");
			}
		}
	};
	$.am.Page = Page;

	var showClassName, hideClassName, width, height, hideObj, animating = false, param;
	var afterPageShowCall = function(a, b) {
		setTimeout(function() {
			a.setBodyHeight(height);
			animating = false;
			a.backButtonClick && ($.am.backButtonClick = a.backButtonClick);
			b.$.css({
				"display" : "none"
			});
			if (b && typeof (b.afterHide) == 'function') {
				b.afterHide && b.afterHide();
			}
			if (a && typeof (a.afterShow) == 'function') {
				a.afterShow && a.afterShow(param);
			}
		}, 200);
	};
	/**
	 * 显示Page
	 * @function
	 * @private
	 * @param e {jQuery} 需要显示的jQuery对象
	 * @param c {jQuery} 需要隐藏的jQuery对象
	 * @param p {boolean} 隐藏的方向
	 */
	var _showPage = function(e, c, p, cb) {
		if (p) {
			c.setTransformPos(0, "x");
			e.setTransformPos(width, "x");
			$.am.page.$app.animateTranslate3d(0, -width, "x", 200, function() {
				$.am.page.$app.setTransformPos(0, "x");
				e.setTransformPos(0, "x");
				c.setTransformPos(5000, "x");
				cb && cb();
			});
		} else {
			c.setTransformPos(width, "x");
			$.am.page.$app.setTransformPos(-width, "x");
			$.am.page.$app.animateTranslate3d(-width, 0, "x", 200, function() {
				$.am.page.$app.setTransformPos(0, "x");
				c.setTransformPos(5000, "x");
				cb && cb();
			});
			e.setTransformPos(0, "x");
		}
	};
	/**
	 * ChangePage
	 *@function
	 *@param [object] obj     必须  需要显示的page对象
	 *@param [string] animate 可选  动画执行方式 [slideup / slidedown / slideleft / slideright]
	 *@return
	 *@description 1.
	 */
	$.am.changePage = function(obj, animate, para) {
		if (!activePage) {
			activePage = obj;
			obj.$.show().setTransformPos(0, "x");
			if (obj.beforeShow && typeof (obj.beforeShow) == 'function') {
				obj.beforeShow();
			}
			obj.setBodyHeight($.am.getInnerHeight());
			if (obj.afterShow && typeof (obj.afterShow) == 'function') {
				obj.afterShow();
			}
			return;
		}
		if (animating)
			return;
		if (obj == activePage)
			return;
		param = para;

	    //call befor
		if (activePage && typeof (activePage.beforeHide) == 'function') {
		    if (activePage.beforeHide(obj)) {
		        return;
		    }
		}
		if (obj.beforeShow && typeof (obj.beforeShow) == 'function') {
		    obj.beforeShow(param);
		}
		animating = true;
		width = $.am.page.$app.width();
		height = $.am.getInnerHeight();
		this.animateType = animate;
		//get the jQuery obj
		var $showPage = obj.$;
		var $hidePage = activePage ? activePage.$ : null;
		this.history.push(activePage);
		var isInHistory = this.history.indexOf(obj);
		if (isInHistory != -1) {
			this.history.splice(isInHistory);
		}
		$showPage.show();
		// show
		if (!$hidePage) {
			$showPage.show();
		} else {
			//excuse animate
			switch (animate) {
                case 'slideup':
                    setTimeout(function () {
                        $showPage.css({
                            'z-index': '1'
                        });
                        $showPage.setTransformPos(0, "x");
                        $showPage.setTransformPos(height, "y");
                        $showPage.animateTranslate3d(height, 0, "y", 200, function () {
                            $showPage.css({
                                'z-index': '0'
                            });
                            $hidePage.setTransformPos(5000, "x");
                            afterPageShowCall(obj, hideObj);
                        });
                    }, 200);
                    break;
                case 'slidedown':
                    setTimeout(function () {
                        $showPage.setTransformPos(0, "x");
                        $hidePage.css({
                            'z-index': '1'
                        }).setTransformPos(0, "y").animateTranslate3d(0, height, "y", 200, function () {
                            $hidePage.setTransformPos(0, "y").setTransformPos(5000, "x");
                            afterPageShowCall(obj, hideObj);
                        });
                    }, 200);
                    break;
				case 'popup':
					setTimeout(function() {
						$showPage.css({
							'z-index' : '1'
						}).setTransformPos(0, "x").setTransformPos(100, "z").animateTranslate3d(100, 1, "z", 300, function() {
							$showPage.css({
								'z-index' : '0'
							});
							$hidePage.setTransformPos(5000, "x");
							afterPageShowCall(obj, hideObj);
						});
					}, 200);
					break;
				case 'popdown':
					setTimeout(function() {
						$hidePage.css({
							'z-index' : '1'
						}).setTransformPos(1, "z").animateTranslate3d(1, 100, "z", 300, function() {
							$hidePage.setTransformPos(1, "z").setTransformPos(5000, "x");
							afterPageShowCall(obj, hideObj);
						});
						$showPage.setTransformPos(0, "x");
					}, 200);
					break;
				case 'slideleft':
					setTimeout(function() {
						_showPage($showPage, $hidePage, true, function() {
							afterPageShowCall(obj, hideObj);
						});
					}, 200);
					break;
				case 'slideright':
					setTimeout(function() {
						_showPage($showPage, $hidePage, false, function() {
							afterPageShowCall(obj, hideObj);
						});
					}, 200);
					break;
				default:
					$hidePage.setTransformPos(5000, "x");
					$showPage.setTransformPos(0, "x");
					obj.backButtonClick && ($.am.backButtonClick = obj.backButtonClick);
					//hideObj = activePage;
					//activePage = obj;
					afterPageShowCall(obj, activePage);
					break;
			}
		}
		//change activePage
		hideObj = activePage;
		activePage = obj;

	};

	$.am.page = {
		init : function() {
			this.$app = $("div.am-app");
			height = $.am.getInnerHeight();
		},
		back : function(animation) {
			animation = animation || "slideright";
			if ($.am.history.length > 0) {
				$.am.changePage($.am.history[$.am.history.length - 1], animation, "back");
			};
		}
	};
})(window, jQuery);
