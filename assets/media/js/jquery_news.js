! function (a, b, c, d) {
	a.fn.jConveyorTicker = function (b) {
		if (void 0 === this || 0 === this.length) return console.log("jquery.jConveyorTicker() INITIALIZATION ERROR: You need to select one or more elements. See documentation form more information."), !1;
		var c = {
				anim_duration: 200,
				reverse_elm: !1,
				force_loop: !1
			},
			d = c.anim_duration,
			e = c.reverse_elm,
			f = c.force_loop;
		b && (void 0 !== b.anim_duration && (d = b.anim_duration), void 0 !== b.reverse_elm && (e = b.reverse_elm), void 0 !== b.force_loop && (f = b.force_loop), a.extend(c, b)), this.each(function () {
			var b = a(this),
				c = b.children("ul");
			c.css({
				margin: "0",
				padding: "0",
				"list-style": "none"
			}).children("li").css({
				display: "inline-block"
			});
			var g = c.width(),
				h = c.parent().width(),
				i = h / 2 - 20;
			c.removeAttr("style").children("li").removeAttr("style"), b.addClass("jctkr-wrapper");
			var j = function () {
				var f = c.clone().children("li");
				c.append(f);
				var g = 0;
				c.children().each(function () {
					g += a(this).outerWidth()
				}), c.width(g);
				var h = function (a) {
					var b, e = c.width(),
						f = c.position().left,
						g = "-",
						i = "normal";
					if (void 0 !== a && "reverse" === a) {
						if (b = e / 2, f > 0) return c.css("left", "-" + b + "px"), void h("reverse");
						g = "+", i = "reverse"
					} else if (b = e / 2 * -1, f < b) {
						var j = -1 * (b - f);
						return c.css("left", j + "px"), void h(i)
					}
					c.animate({
						left: g + "=10px"
					}, d, "linear", function () {
						h(i)
					})
				};
				b.hover(function () {
					c.stop()
				}, function () {
					c.stop(), h("normal")
				}), e && b.prev(".jctkr-label").hover(function () {
					c.stop(), h("reverse")
				}, function () {
					c.stop(), h("normal")
				}).click(function () {
					return !1
				}), h("normal")
			};
			if (g >= i) j();
			else if (f) {
				var k, l = 0,
					m = function () {
						var a = c.clone().children("li");
						if (c.append(a), k = c.width(), l = c.parent().width(), !(k < l)) return j(), !1;
						m()
					};
				for (m(); k < l;) {
					if (k >= i) {
						j();
						break
					}
					m()
				}
			}
			b.addClass("jctkr-initialized")
		})
	}
}(jQuery, window, document);