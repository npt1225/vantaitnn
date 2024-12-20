(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },
    
        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
    
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if ( orgEvent.wheelDelta ) {
            delta = orgEvent.wheelDelta/120;
        }
        if ( orgEvent.detail     ) {
            delta = -orgEvent.detail/3;
        }
        deltaY = delta;
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }
        if ( orgEvent.wheelDeltaY !== undefined ) {
            deltaY = orgEvent.wheelDeltaY/120;
        }
        if ( orgEvent.wheelDeltaX !== undefined ) {
            deltaX = -1*orgEvent.wheelDeltaX/120;
        }
        args.unshift(event, delta, deltaX, deltaY);
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
})(jQuery);

(function ($) {
    function _ClassyScroll(c, s) {
        this.container = $(c);
        this.settings = s;
        this.timer = 0;
        this.before = {
            'v': 0,
            'h': 0
        };
        this.touch = {};
        this.pressed = 0;
        this.vslider = $('<div/>', {
            'class': 'scrollbar-handle'
        });
        this.vpath = $('<div/>', {
            'class': 'scrollbar-path-vertical'
        });
        this.hslider = $('<div/>', {
            'class': 'scrollbar-handle'
        });
        this.hpath = $('<div/>', {
            'class': 'scrollbar-path-horizontal'
        });
        this.sliders = this.vslider.add(this.hslider);
        this.container.css({
            'overflow': 'hidden',
            'position': 'relative'
        }).contents().filter(this.settings.contentFilter).wrapAll('<div class="scrollbar-content"></div>');
        this.content = this.container.children('.scrollbar-content').css({
            'top': 0,
            'left': 0,
            'position': 'relative',
            'float': 'left'
        });
        if (this.settings.scroll == 'horizontal') {
            this.container.prepend(this.hpath.append(this.hslider))
        }
        else if (this.settings.scroll == 'vertical') {
            this.container.prepend(this.vpath.append(this.vslider))
        }
        else {
            this.container.prepend(this.vpath.append(this.vslider), this.hpath.append(this.hslider))
        }
        this.vpath.add(this.hpath).css({
            'z-index': this.settings.zIndex,
            'display': 'none'
        });
        this.vslider.css({
            'height': this.settings.sliderSize,
            'opacity': this.settings.sliderOpacity
        });
        this.hslider.css({
            'width': this.settings.sliderSize,
            'opacity': this.settings.sliderOpacity
        });
        if (this.settings.sliderOpacity) {
            this.sliders.hover(this.fixFn(function () {
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1)
            }), this.fixFn(function () {
                if (!this.pressed) {
                    this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
                }
            }))
        }
        this.init();
        this.pathSize();
        this.bindEvent($(window), 'load', function () {
            setTimeout(this.fixFn(this.checkScroll), 10)
        });
        if (this.settings.lazyCheckScroll > 0) {
            setInterval(this.fixFn(this.checkScroll), this.settings.lazyCheckScroll)
        }
    }
    _ClassyScroll.prototype.checkScroll = function () {
        this.vtrack = this.vpath.height() - this.vslider.height();
        this.htrack = this.hpath.width() - this.hslider.width();
        this.vdiff = this.content.height() - this.container.height();
        this.hdiff = this.content.width() - this.container.width();
        if (!this.settings.autoHide) return;
        if (this.vdiff > 0) {
            this.vpath.fadeIn(this.settings.autoHideTime)
        }
        else {
            this.vpath.fadeOut(this.settings.autoHideTime)
        }
        if (this.hdiff > 0) {
            this.hpath.fadeIn(this.settings.autoHideTime)
        }
        else {
            this.hpath.fadeOut(this.settings.autoHideTime)
        }
    };
    _ClassyScroll.prototype.pathSize = function () {
        var a = parseInt(this.settings.pathPadding, 10);
        this.vpath.css({
            'top': a + 'px',
            'height': this.container.height() - 2 * a + 'px'
        });
        this.hpath.css({
            'left': a + 'px',
            'width': this.container.width() - 2 * a + 'px'
        })
    };
    _ClassyScroll.prototype.scroll = function (v, h, e) {
        var a = 0;
        var b = 0;
        if (v < 0) {
            v = 0
        }
        if (v > this.vtrack) {
            v = this.vtrack
        }
        this.vslider.css('top', v + 'px');
        if (h < 0) {
            h = 0
        }
        if (h > this.htrack) {
            h = this.htrack
        }
        this.hslider.css('left', h + 'px');
        if (this.vdiff > 0) {
            b = v / this.vtrack;
            this.content.css('top', Math.round(-this.vdiff * b));
            if (e && (v && v != this.vtrack)) {
                e.stopPropagation();
                e.preventDefault()
            }
        }
        if (this.hdiff > 0) {
            a = h / this.htrack;
            this.content.css('left', Math.round(-this.hdiff * a));
            if (e && (h && h != this.htrack)) {
                e.stopPropagation();
                e.preventDefault()
            }
        }
        if (this.before.v != b || this.before.h != a) {
            if (typeof this.settings.onscroll == 'function') {
                this.settings.onscroll.call(this.container.get(0), b, a)
            }
            this.before.v = b;
            this.before.h = a
        }
    };
    _ClassyScroll.prototype.easeScroll = function (v, h) {
        var n = 0;
        var a = Math.floor(this.settings.scrollTime / this.settings.scrollInterval);
        var b = this.vslider.position().top;
        var c = this.hslider.position().left;
        var d = $.easing[this.settings.scrollEasing] || $.easing.linear;
        this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.fixFn(function () {
            this.scroll(b + d(n / a, n, 0, 1, a) * v, c + d(n / a, n, 0, 1, a) * h);
            if (++n > a) {
                window.clearInterval(this.timer);
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
        }), this.settings.scrollInterval)
    };
    _ClassyScroll.prototype.fixFn = function (f, s) {
        var a = this;
        return function () {
            f.apply(s || a, Array.prototype.slice.call(arguments))
        }
    };
    _ClassyScroll.prototype.bindEvent = function (t, e, f, s) {
        return t.bind(e, this.fixFn(f, s))
    };
    _ClassyScroll.prototype.init = function () {
        var f = $(window.document);
        this.bindEvent(this.sliders, 'mousedown', function (e) {
            this.pressed = (e.target === this.vslider.get(0)) ? 1 : 2;
            var a = e.pageX;
            var b = e.pageY;
            var c = this.vslider.position().top;
            var d = this.hslider.position().left;
            this.bindEvent(f, 'mousemove', function (e) {
                if (this.pressed == 1) {
                    this.scroll(c + (e.pageY - b), d)
                } else {
                    this.scroll(c, d + (e.pageX - a))
                }
            });
            this.bindEvent(f, 'selectstart', function (e) {
                e.preventDefault()
            })
        });
        this.bindEvent(f, 'mouseup', function (e) {
            if (this.pressed == 1 && e.target !== this.vslider.get(0)) {
                this.vslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
            else if (this.pressed == 2 && e.target !== this.hslider.get(0)) {
                this.hslider.fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }
            this.pressed = 0;
            f.unbind('mousemove');
            f.unbind('selectstart')
        });
        this.bindEvent(this.container, 'touchstart', function (e) {
            var a = e.originalEvent;
            var b = a.changedTouches[0];
            this.touch.sx = b.pageX;
            this.touch.sy = b.pageY;
            this.touch.sv = this.vslider.position().top;
            this.touch.sh = this.hslider.position().left;
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
            a.stopPropagation()
        });
        this.bindEvent(this.container, 'touchmove', function (e) {
            var a = e.originalEvent;
            var b = a.targetTouches[0];
            this.scroll(this.touch.sv + (this.touch.sy - b.pageY) * this.settings.touchSpeed, this.touch.sh + (this.touch.sx - b.pageX) * this.settings.touchSpeed);
            a.preventDefault();
            a.stopPropagation()
        });
        this.bindEvent(this.container, 'touchend touchcancel', function (e) {
            var a = e.originalEvent;
            var b = a.changedTouches[0];
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity);
            a.stopPropagation()
        });
        var g = this.vpath.height(),
        htrack = this.hpath.width();
        this.bindEvent($(window), 'resize', function () {
            this.pathSize();
            this.checkScroll();
            if (this.vdiff <= 0) {
                this.content.css('top', 0)
            }
            if (this.hdiff <= 0) {
                this.content.css('left', 0)
            }
            this.scroll(Math.round(parseInt(this.vslider.css('top'), 10) * this.vpath.height() / g), Math.round(parseInt(this.hslider.css('left'), 10) * this.hpath.width() / htrack));
            g = this.vpath.height();
            htrack = this.hpath.width()
        });
        this.bindEvent(this.container, 'mousewheel', function (e, a, b, c) {
            this.scroll(this.vslider.position().top - this.settings.wheelSpeed * c, this.hslider.position().left + this.settings.wheelSpeed * b, e);
            this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, 1);
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(this.fixFn(function () {
                this.sliders.stop().fadeTo(this.settings.sliderOpacityTime, this.settings.sliderOpacity)
            }), this.settings.sliderOpacityDelay);
            if (this.settings.blockGlobalScroll && (this.vdiff || this.hdiff)) {
                e.preventDefault();
                e.stopPropagation()
            }
        });
        this.bindEvent(f, 'keydown', function (e) {
            var a = 0,
            vkey = 0;
            vkey = (e.keyCode == 38) ? -this.settings.keyScroll : vkey;
            vkey = (e.keyCode == 40) ? this.settings.keyScroll : vkey;
            a = (e.keyCode == 37) ? -this.settings.keyScroll : a;
            a = (e.keyCode == 39) ? this.settings.keyScroll : a;
            if (vkey || a) {
                this.easeScroll(vkey, a)
            }
        });
        this.bindEvent(this.container, 'uscrollbar', function (e, v, h, a) {
            if (v === 'reset') {
                this.container.find('.scrollbar-content, .scrollbar-handle').stop().css({
                    top: 0,
                    left: 0
                });
                return
            }
            v = v || 0;
            h = h || 0;
            e.stopPropagation();
            if (/^[-\d\.]+$/.test(v)) {
                v = parseFloat(v);
                if (Math.abs(v) <= 1 && !a) {
                    v *= this.vtrack
                }
                else {
                    v = v + v * (this.vtrack / this.vdiff - 1)
                }
            }
            if (/^[-\d\.]+$/.test(h)) {
                h = parseFloat(h);
                if (Math.abs(h) <= 1 && !a) {
                    h *= this.htrack
                }
                else {
                    h = h + h * (this.htrack / this.hdiff - 1)
                }
            }
            this.easeScroll(v, h)
        })
    };
    $.fn.ClassyScroll = function (s) {
        var a = {
            scroll: 'both',
            autoHide: true,
            autoHideTime: 'fast',
            lazyCheckScroll: 1000,
            blockGlobalScroll: false,
            contentFilter: '*',
            sliderSize: '21px',
            sliderOpacity: 1,
            sliderOpacityTime: 200,
            sliderOpacityDelay: 1000,
            wheelSpeed: 20,
            touchSpeed: 0.3,
            pathPadding: '0',
            keyScroll: 100,
            scrollTime: 500,
            scrollInterval: 15,
            scrollEasing: 'swing',
            zIndex: 100,
            onscroll: function () {}
        };
        $.extend(a, s);
        return this.each(function () {
            new _ClassyScroll(this, a)
        })
    }
})(jQuery);
