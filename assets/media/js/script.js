$('.menu_btn').click(function () {
	$('body').toggleClass('menu_open');
}) /*====================================== Search class*/

$(function () {
	$('.selectpicker').selectpicker();
}); /*====================================== Lang*/

var wrapperMenu = document.querySelector('.menu_btn');
wrapperMenu.addEventListener('click', function () {
	wrapperMenu.classList.toggle('open');
}) /*===================================== Effect button menu*/


$(document).ready(function () {
	$(function () {
		var element = $('#sub_bg_area');
		element.addClass('show-logo').css("overflow-y", "hidden");
		setTimeout(function () {
			element.removeClass('show-logo');
		}, 5000);
		$('#sub_bg_area').delay(4000).queue(function () {
			$(this).addClass("show-logo1");
		});

	}); /*==============================================* Loadpage*/


	$('#sub_bg_area .sub_bg').delay(100).animate({
		'opacity': '1'
	}, 4000);
	
	$('#sub_bg_area .title_slider').delay(200).animate({
		'opacity': '1'
	}, 1000);
	
	$('.s_tit_wrap').delay(200).animate({
		'bottom': '0'
	}, 1000);
	
	$('.menu_align').delay(200).animate({
		'top': '0'
	}, 1000);
	
	$('.wrap_button_menu').delay(100).animate({
		'top': '0'
	}, 600);
	
			  
   $('.flashy-design').delay(200).animate({
		'display': 'none'
	}, 1000);

});

$(".nav-list .nav-item-inner-heading").each(function () {
	var item = $(this).html();
	$(this).append('<span class="hover">' + item + '</span>');
});

$(".nav-list li").hover(function () {
		$(this).addClass("active")
	},
	function () {
		$(this).removeClass("active")
	})

$(window).scroll(function () {
	if ($(this).scrollTop() > 800) {
		$('body').addClass('position_f');
	} else {
		$('body').removeClass('position_f');
	}
}); /*====================================== Menu position*/

! function (t) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
	var e = -1,
		o = -1,
		n = function (t) {
			return parseFloat(t) || 0
		},
		a = function (e) {
			var o = 1,
				a = t(e),
				i = null,
				r = [];
			return a.each(function () {
				var e = t(this),
					a = e.offset().top - n(e.css("margin-top")),
					s = r.length > 0 ? r[r.length - 1] : null;
				null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a
			}), r
		},
		i = function (e) {
			var o = {
				byRow: !0,
				property: "height",
				target: null,
				remove: !1
			};
			return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
		},
		r = t.fn.matchHeight = function (e) {
			var o = i(e);
			if (o.remove) {
				var n = this;
				return this.css(o.property, ""), t.each(r._groups, function (t, e) {
					e.elements = e.elements.not(n)
				}), this
			}
			return this.length <= 1 && !o.target ? this : (r._groups.push({
				elements: this,
				options: o
			}), r._apply(this, o), this)
		};
	r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
		r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
			var s = i(o),
				h = t(e),
				l = [h],
				c = t(window).scrollTop(),
				p = t("html").outerHeight(!0),
				u = h.parents().filter(":hidden");
			return u.each(function () {
					var e = t(this);
					e.data("style-cache", e.attr("style"))
				}), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
					var e = t(this),
						o = e.css("display");
					"inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
						display: o,
						"padding-top": "0",
						"padding-bottom": "0",
						"margin-top": "0",
						"margin-bottom": "0",
						"border-top-width": "0",
						"border-bottom-width": "0",
						height: "100px",
						overflow: "hidden"
					})
				}), l = a(h), h.each(function () {
					var e = t(this);
					e.attr("style", e.data("style-cache") || "")
				})), t.each(l, function (e, o) {
					var a = t(o),
						i = 0;
					if (s.target) i = s.target.outerHeight(!1);
					else {
						if (s.byRow && a.length <= 1) return void a.css(s.property, "");
						a.each(function () {
							var e = t(this),
								o = e.attr("style"),
								n = e.css("display");
							"inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
							var a = {
								display: n
							};
							a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
						})
					}
					a.each(function () {
						var e = t(this),
							o = 0;
						s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"))
					})
				}), u.each(function () {
					var e = t(this);
					e.attr("style", e.data("style-cache") || null)
				}), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
				this
		}, r._applyDataApi = function () {
			var e = {};
			t("[data-match-height], [data-mh]").each(function () {
				var o = t(this),
					n = o.attr("data-mh") || o.attr("data-match-height");
				n in e ? e[n] = e[n].add(o) : e[n] = o
			}), t.each(e, function () {
				this.matchHeight(!0)
			})
		};
	var s = function (e) {
		r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
			r._apply(this.elements, this.options)
		}), r._afterUpdate && r._afterUpdate(e, r._groups)
	};
	r._update = function (n, a) {
		if (a && "resize" === a.type) {
			var i = t(window).width();
			if (i === e) return;
			e = i;
		}
		n ? o === -1 && (o = setTimeout(function () {
			s(a), o = -1
		}, r._throttle)) : s(a)
	}, t(r._applyDataApi);
	var h = t.fn.on ? "on" : "bind";
	t(window)[h]("load", function (t) {
		r._update(!1, t)
	}), t(window)[h]("resize orientationchange", function (t) {
		r._update(!0, t)
	})
});
/*------------- Script equal height------------*/


(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var VERSION = "1.0.0",
		PLUGIN_NS = 'scollswith_plugin';
	var defaults = {
		dummy_attr: 'data-sidebar-dummy',
		bottom_dummy_attr: 'data-sidebar-bottom',
		attr_value: null,
		margin_top: 0,
		fixedClass: 'fixed',
		minWidth: 200,
	};

	$.fn.scrollsWith = function (method) {
		var $this = $(this),
			plugin = $this.data(PLUGIN_NS);

		//Check if we are already instantiated and trying to execute a method
		if (plugin && typeof method === 'string') {
			if (plugin[method]) {
				return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.scollsWith');
			}
		}
		//Else update existing plugin with new options hash
		else if (plugin && typeof method === 'object') {
			plugin['option'].apply(plugin, arguments);
		}

		//Else not instantiated and trying to pass init object (or nothing)
		else if (!plugin && (typeof method === 'object' || !method)) {
			return init.apply(this, arguments);
		}

		return $this;
	};

	$.fn.scrollsWith.version = VERSION;


	$.fn.scrollsWith.defaults = defaults;

	function init(options) {

		if (!options) {
			options = {};
		}

		//pass empty object so we dont modify the defaults
		options = $.extend({}, $.fn.scrollsWith.defaults, options);

		//For each element instantiate the plugin
		return this.each(function () {
			var $this = $(this);

			//Check we havent already initialised the plugin
			var plugin = $this.data(PLUGIN_NS);

			if (!plugin) {
				plugin = new scrollsWith(this, options);
				$this.data(PLUGIN_NS, plugin);

			}
		});
	}

	function scrollsWith(element, options) {
		var me = this;

		var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		//take a local/instacne level copy of the options - should make it this.options really...
		var options = $.extend({}, options);

		var data = {
			max_top: 0,
			max_bottom: 0,
			left: 0,
			width: 0,
			fixed: false,
			enable_fixed: false,
		};

		//jQuery wrapped element for this instance
		var $element = $(element);
		var $dummy = null;
		var $dummy_bottom = null;

		var event_resize = function () {
			var scrollTop = $(window).scrollTop();

			$(window).off('scroll.' + uid);
			if ($(window).width() > options.minWidth && $(window).height() > $element.height() + (2 * options.margin_top)) {
				$(window).on('scroll.' + uid, function () {
					scoll_event();
				});
				data.enable_fixed = true;
			} else {
				data.enable_fixed = false;
			}

			//offset bilden
			data.max_top = $dummy.offset().top;
			data.left = $dummy.offset().left;
			data.width = $dummy.width();

			data.max_bottom = $dummy_bottom.offset().top + $dummy_bottom.height();
			scoll_event();
		};

		var scoll_event = function () {
			var scrollTop = $(window).scrollTop();

			//sidebar positionieren
			if (!data.enable_fixed) {
				//wenn fixed aber auflösung zu klein, dann lösen
				if (data.fixed) {
					console.log("unfix sidebar");
					$element.removeClass(options.fixedClass);
					$element.removeAttr("style");
					data.fixed = false;
				}
				return;
			} else if (data.fixed && data.max_top - options.margin_top > scrollTop) {
				//lösen
				console.log("unfix sidebar");
				$element.removeClass(options.fixedClass);
				$element.removeAttr("style");
				data.fixed = false;
				return;
			} else if (!data.fixed && data.max_top - options.margin_top < scrollTop) {
				//fixen
				console.log("fix sidebar");
				$element.addClass(options.fixedClass);
				data.fixed = true;
			} else if (!data.fixed) {
				return;
			}

			//positionieren
			$element.css({
				position: 'fixed',
				top: options.margin_top,
				left: data.left,
				width: data.width
			});

			if (data.max_bottom - scrollTop < $element.height() + options.margin_top) {
				$element.css({
					top: data.max_bottom - scrollTop - $element.height()
				});
			}
		};

		var construct = function () {

			options.attr_value = options.attr_value || $element.attr("id");

			$dummy = $("[" + options.dummy_attr + "='" + options.attr_value + "']");
			$dummy_bottom = $("[" + options.bottom_dummy_attr + "='" + options.attr_value + "']");

			if ($dummy.length == 0 || $dummy_bottom.length == 0) {
				console.log("element for scollsWith not available");
				return;
			}

			$(window).on('resize.' + uid, function () {
				event_resize();
			});
			$(window).on('orientationchange.' + uid, function () {
				event_resize();
			});
			event_resize();
		};

		//init
		construct();
	}

}));

