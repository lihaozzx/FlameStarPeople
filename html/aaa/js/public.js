var rootUrl = "/html",
	pagUrl = "../",
	imgUrl = "/html/aaa/",
	// reqUrl = "http://192.168.1.100:8989",
	reqUrl = "http://fy.sem98.com",
	isLogin = getCookie("isLogin"),
	ul = window.location.href.slice(),
	pagname = ul.slice(ul.lastIndexOf("/") + 1, ul.lastIndexOf(".")),
	tokens = getCookie("tokens");
$(function () { "true" != isLogin && "login" != pagname && ($(".y_mhd")[0] ? reLogin() : parent.window.reLogin()), $(
		window).scroll(function () { var a = $(window).scrollTop();
		200 < a ? !$(".y_goTop")[0] && $("body").append("<img class=\"y_goTop\" src=\"" + imgUrl +
				"images/icon/top.png\" alt=\"\u56DE\u5230\u9876\u90E8\" title=\"\u56DE\u5230\u9876\u90E8\" />") : $(".y_goTop")
			.remove() }), $(document).on("click", ".y_goTop", function () { $("html,body").animate({ scrollTop: "0px" }, 300) }); var
		a;
	$(document).on("click", ".y_dat_open", function () { a = $(this), y_date(a, function (b, c, e) { a.val(b + "-" + (10 >
				c ? "0" + c : c) + "-" + (10 > e ? "0" + e : e)) }) }), $(document).on("click", ".y_dat_opens", function () { a =
			$(this), y_date(a, function (b, c, e, d, f) { a.val(b + "-" + (10 > c ? "0" + c : c) + "-" + (10 > e ? "0" + e :
					e) + " " + (10 > d ? "0" + d : d) + ":" + (10 > f ? "0" + f : f)) }, !0) }); var b;
	$(document).on("click", ".y_dat_time_open", function () { b = $(this), y_time(b, function (a, c) { b.val((10 > a ?
				"0" + a : a) + ":" + (10 > c ? "0" + c : c)) }) }), $(document).click(function (a) { if ("string" == typeof a.target
			.className)
			if (-1 != a.target.className.indexOf("y_slectMenu")) { var b = $(a.target),
					c = b.children(".y_slect"),
					d = 0,
					e = 0;
				b.hasClass("active") ? b.removeClass("active") : ($(".y_slectMenu").removeClass("active"), b.addClass("active")),
					d = c.width() + b.offset().left > $(window).width() ? b.offset().left - (c.width() - b[0].offsetWidth + 2) : b
					.offset().left, e = c.height() + b.offset().top + b[0].offsetHeight - $(window).scrollTop() > $(window).height() ?
					b.offset().top - (c.height() + 2) - $(window).scrollTop() : b.offset().top + b[0].offsetHeight - $(window).scrollTop(),
					b.children(".y_slect").css({ right: 30, top: e }) } else $(".y_slectMenu").removeClass("active") }), $(window).scroll(
		function () { $(".y_slectMenu").removeClass("active") }), $(".y_mhd").bind("contextmenu", function () { return !1 }); var
		c;
	$(document).on("mousedown", ".y_mhd_item", function (a) { $(".y_key").remove(); var b = $(this).index(),
				d = $(this); if (c = d, 2 == a.buttons) { var d = $(this),
					e = "<ul class=\"y_key\">"; if (0 != b && (e +=
						"<li class=\"y_keyItem\" data-type=\"current\"><a>\u5173\u95ED</a></li>"), (0 == b && 2 == $(".y_mhd_item").length ||
						2 < $(".y_mhd_item").length) && (e +=
						"<li class=\"y_keyItem\" data-type=\"other\"><a>\u5173\u95ED\u5176\u4ED6</a></li>"), 1 < b && (e +=
						"<li class=\"y_keyItem\" data-type=\"left\"><a>\u5173\u95ED\u5DE6\u4FA7\u6240\u6709</a></li>"), b < $(
						".y_mhd_item").length - 1 && (e +=
						"<li class=\"y_keyItem\" data-type=\"right\"><a>\u5173\u95ED\u53F3\u4FA7\u6240\u6709</a></li>"), 1 < $(
						".y_mhd_item").length && 0 != b && (e +=
						"<li class=\"y_keyItem\" data-type=\"all\"><a>\u5173\u95ED\u5168\u90E8</a></li>"), e += "</ul>", 0 > e.indexOf(
						"y_keyItem")) return;
				$("body").append(e); var f = $(".y_key"),
					g = a.clientX + 10,
					i = a.clientY + 10,
					j = a.clientX,
					k = a.clientY;
				j = f.width() + g > $(window).width() ? g - f.width() - 20 : g, k = i, f.css({ left: j, top: k }) } }), $(
			document).on("click", ".y_keyItem", function () { var a = $(this),
				b = a.attr("data-type"),
				d = c.index(),
				e = "",
				f = []; if ("current" == b ? f.push(c.attr("data-class")) : "other" == b ? (e = c.attr("data-class"), $(
					".y_mhd_item").each(function (a, b) { 0 != a && a != d && f.push($(b).attr("data-class")) })) : "left" == b ? (
					e = c.attr("data-class"), $(".y_mhd_item").each(function (a, b) { 0 != a && a < d && a && f.push($(b).attr(
							"data-class")) })) : "right" == b ? $(".y_mhd_item").each(function (a, b) { 0 != a && a > d && f.push($(b).attr(
						"data-class")) }) : "all" == b && $(".y_mhd_item").each(function (a, b) { 0 != a && f.push($(b).attr(
						"data-class")) }), e || f[0])
				for (var g = 0; g < f.length; g++) closeHtml(f[g], e) }), $(document).click(function (a) { "string" != typeof a.target
				.className || -1 != a.target.className.indexOf("y_mhd") || ($(".y_mhd")[0] ? keyClose() : parent.window.keyClose()) }),
		$(document).click(function (a) { if ("string" == typeof a.target.className)
				if (-1 != a.target.className.indexOf("y_inpSect")) {
					function h(a) { return a.hasClass("y_inpSect") ? a : !!(2 > c) && (++c, h(a.parent())) } var b = $(a.target),
						c = 0,
						d = h(b); if (!d) return; var e = d.children(".y_inpSect_box"),
						f = 0,
						g = 0;
					$(".y_inpSect").removeClass("active"), d.addClass("active"), f = e.width() + d.offset().left > $(window).width() ?
						d.offset().left - (e.width() - d[0].offsetWidth + 2) : d.offset().left, g = e.height() + d.offset().top + d[0]
						.offsetHeight - $(window).scrollTop() > $(window).height() ? d.offset().top - (e.height() + 2) - $(window).scrollTop() -
						6 : d.offset().top + d[0].offsetHeight - $(window).scrollTop() + 6, d.children(".y_inpSect_box").css({ left: f,
							top: g }) } else $(".y_inpSect").removeClass("active") }), $(document).on("click", ".y_inpSect_item", function (
			a) { stop(a); var b = $(this);
			$(".y_inpSect").removeClass("active"), b.parent().parent().parent().parent().children(".y_inpSect_tex").text(b.text()),
				b.parent().parent().parent().parent().children(".y_inpSect_val").val(b.attr("data-val")).change() }), $(window).scroll(
			function () { $(".y_inpSect").removeClass("active") }), $(document).on("click", ".y_reset", function () { Reset() }),
		$(document).on("click", ".y_copy", function () { var a = $(this),
				b = document.createElement("input");
			$(b).val(a.attr("data-text")).css({ position: "fixed", left: "-999px", top: "-999px" }), $("body").append(b),
				Alert("\u590D\u5236\u6210\u529F", function () { b.select(), document.execCommand("Copy"), $(b).remove() }) }), $(
			document).on("focus", ".y_input", function () { $(this).addClass("active") }), $(document).on("focusout",
			".y_input",
			function () { $(this).removeClass("active") }), $(".y_grpBtn").each(function (a, b) { $(b).children().last().css({ border: "none" }) }),
		$(document).on("click", ".y_grpItem", function () { var a = $(this);
			a.parent().children(".y_grpItem").removeClass("active"), a.addClass("active") }), $(document).on("click",
			".y_radio",
			function () { $("input[name=\"" + $(this).next().attr("name") + "\"]").prev().removeClass("active"), $(this).toggleClass(
					"active") }), $(document).on("click", ".y_check", function () { if ($(this).toggleClass("active"), $(this).hasClass(
					"y_checkson")) { let a = $(this).attr("data-checkall"),
					b = !0;
				$(".y_checkson").each((c, d) => { b && $(d).attr("data-checkall") == a && !$(d).hasClass("active") && (b = !1) }),
					b ? $(".y_checkAll").each((b, c) => { a == $(c).attr("data-checkall") && $(c).addClass("active") }) : $(
						".y_checkAll").each((b, c) => { a == $(c).attr("data-checkall") && $(c).removeClass("active") }) } }), $(
			document).on("click", ".y_checkAll", function () { $(this).toggleClass("active"); let b = $(this).hasClass(
					"active"),
				c = $(this).attr("data-checkall");
			c && $(".y_checkson").each((a, d) => { $(d).attr("data-checkall") == c && (b ? $(d).hasClass("active") || $(d).trigger(
					"click") : $(d).hasClass("active") && $(d).trigger("click")) }) }), $(document).on("click", ".y_newHtml",
			function () { var a = $(this);
				$(".y_main_body")[0] ? newHtml(a) : parent.window.newHtml(a) }), $(document).on("click", ".y_mhd_item", function () { var
				a = $(this);
			$(".y_mhd_item").removeClass("active"), $("iframe.y_html").removeClass("active"), a.addClass("active"), $(
				"iframe.y_html." + a.attr("data-class")).addClass("active") }), $(document).on("click", ".y_mhd_clos", function (
			a) { stop(a); var b = $(this).parent().parent();
			closeHtml(b.attr("data-class")) }), exchangTr(), $(document).on("click", ".one .y_pers_child_item ", function (a) { stop
				(a); var b = $(this);
			$(".y_pers_child_item").removeClass("active"), b.addClass("active") }), $(document).on("click",
			".two .y_pers_child_item ",
			function (a) { stop(a); var b = $(this);
				b.toggleClass("active"), b.parent().prev().children(".y_pers_item_check").removeClass("active") }), $(document).on(
			"click", ".one .y_pers_item_check",
			function () { var a = $(this);
				$(".y_pers_item_check"), a.parent().children(".y_pers_item_icon")[0] || ($(".one .y_pers_item_check").removeClass(
					"active"), a.addClass("active")) }), $(document).on("click", ".two .y_pers_item_check", function (a) { stop(a); var
				b = $(this);
			b.toggleClass("active"), b.parent().children(".y_pers_item_icon")[0] && (b.hasClass("active") ? b.parent().next()
				.children().each(function (a, b) { $(b).addClass("active") }) : b.parent().next().children().each(function (a,
					b) { $(b).removeClass("active") })) }), $(document).on("click", ".y_pers_item_name", function () { var a = $(
				this);
			a.parent().toggleClass("active"), a.children(".y_pers_item_icon")[0] && (a.parent().hasClass("active") ? ($(
				".y_pers_child").each(function (b, c) { c != a.next()[0] && ($(c).animate({ height: 0 }, 300), $(c).parent().removeClass(
					"active")) }), a.next().animate({ height: 40 * a.next().children(".on").length }, 300)) : ($(".y_pers_child")
				.animate({ height: 0 }, 300), $(".y_pers_item").removeClass("active"))) }), $(document).on("click",
			".y_pers_serch_btn",
			function () { var a = $(".y_pers_serch_val").val();
				a ? $(".y_pers_item").each(function (b, c) { var d = $(c).children(".y_pers_item_name"); if (!d.children(
							".y_pers_item_icon")[0]) - 1 < d.children(".y_pers_item_check").text().indexOf(a) ? $(c).show() : $(c).hide();
					else if (-1 < d.children(".y_pers_item_check").text().indexOf(a)) $(c).children(".y_pers_child").children().addClass(
						"on"), $(c).show().addClass("active").children(".y_pers_child").css({ height: 40 * $(c).children(
							".y_pers_child").children(".on").length });
					else { var e = !1;
						$(c).children(".y_pers_child").children().each(function (b, c) { var d = $(c).children(".y_pers_child_name").children(
									".y_pers_child_check"); - 1 < d.text().indexOf(a) ? ($(c).addClass("on"), e = !0) : $(c).removeClass("on") }),
							e ? $(c).show().addClass("active").children(".y_pers_child").css({ height: 40 * $(c).children(
									".y_pers_child").children(".on").length }) : $(c).hide() } }) : PersonInit() }), $(document).on("click",
			".y_head_menu_item.user",
			function (a) { a.stopPropagation(), $(this).toggleClass("active") }), $(document).on("click", function (a) { a.target !=
				$(".y_head_menu_item.user")[0] && $(".y_head_menu_item.user").eq(0).hasClass("active") ? $(
					".y_head_menu_item.user").eq(0).removeClass("active") : !$(".y_head_menu_item.user")[0], parent.window.menuClos() }),
		$(document).on("click", ".y_newPop", function () { var a = $(this),
				b = a.attr("data-title"),
				c = a.attr("data-url"),
				d = a.attr("data-class");
			$(".y_main_body")[0] ? d == null ? newPop(b, c) : newPop(b, c, d) : d == null ? parent.window.newPop(b, c) :
				parent.window.newPop(b, c, d) }), $(document).on("click", ".y_popClose", function () { var a = $(this).parent().parent();
			closePop(a) }), $(document).on("click", ".radioItem", function (a) { a.stopPropagation(); var b = $(this);
			b.parent().children(".radioItem").removeClass("active"), b.addClass("active"), b.parent().children("input").val(b
				.attr("data-val")), b.parent().children("input").change() }), $(document).on("click", ".checkItem", function (a) { a
				.stopPropagation(); var b = $(this);
			b.hasClass("active") ? (b.removeClass("active"), b.parent().children("input").val((b.parent().children("input").val() +
				"").replace(b.attr("data-val") + "/", "")), b.parent().children("input").change()) : (b.addClass("active"), b.parent()
				.children("input").val(b.parent().children("input").val() + b.attr("data-val") + "/"), b.parent().children(
					"input").change()) }), $(document).on("click", ".checkbox", function () { var a = this;
			$(a).toggleClass("active") }), $(document).on("click", ".DelFile", function () { var a = $(this);
			parent.window.Confirm("\u786E\u5B9A\u5220\u9664\uFF1F", function (b) { b && a.parent().remove() }) }), $(document)
		.on("click", ".download-a", function () { var a = $(this).attr("itemid");
			window.location.href = "/main/download?id=" + a }), $(document).on("click", ".y_inPop", function () { var a = $(
				this).attr("data-popid");
			inPop(a) }), $(document).on("click", ".y_otPop", function () { var a = $(this).attr("data-popid");
			otPop(a) }), $(document).on("click", ".y_fileDel", function () { var a = $(this);
			parent.window.Confirm("\u786E\u5B9A\u5220\u9664\uFF1F", function (b) { b && a.parent().remove() }) }), $(
			".y_fileAdd").click(function () { $(this).prev().click() }) });

function keyClose() { $(".y_key").remove() }

function menuClos() { $(".y_head_menu_item.user").removeClass("active") } window.onresize = function () { navChang(),
		saveWidth() };

function exchangTr() { $(".y_exchag tr").each(function (a, b) { 0 == a % 2 ? $(b).addClass("y_even") : $(b).removeClass(
			"y_even") }) }

function newHtml(a) { var b = a.attr("data-class"),
		c = a.attr("data-url"),
		d = a.attr("data-title");
	$("iframe.y_html").removeClass("active"), $(".y_mhd_item").removeClass("active"), $("iframe." + b)[0] ? ($("iframe." +
		b).addClass("active"), $(".y_mhd_item." + b).addClass("active"), $("iframe." + b).attr("src") != c && ($("iframe." +
		b)[0].src = c)) : ($(".y_main_body").append("<iframe src=\"" + c + "\" class=\"y_html active " + b + "\"name=\"" + b +
		"\" ></iframe>"), $(".y_mhd").append("<li class=\"y_mhd_item " + b + " active\" data-class=\"" + b +
		"\"><a><span class=\"y_mhd_tx " + b + "\">" + d + "</span><i class=\"y_mhd_clos\"></i></a></li>"), navChang(), $(
		".y_main_head_scroll").scrollLeft($(".y_mhd_item.active").offset().left)) }

function closeHtml(a, b) { var c = $(".y_mhd_item." + a);
	$("iframe.y_html." + a).remove(), $(".y_mhd_item").removeClass("active"), $("iframe.y_html").removeClass("active"), b ?
		($(".y_mhd_item." + b).addClass("active"), $("iframe.y_html." + b).addClass("active")) : ($(".y_mhd_item").eq(c.index() -
			1).addClass("active"), $("iframe.y_html." + $(".y_mhd_item").eq(c.index() - 1).attr("data-class")).addClass(
			"active")), c.remove(), navChang() }

function newPop(a, b, c) { var d = document.createElement("div");
	d.className = "y_pop", $(d).append(
		"<div class=\"y_mark\"></div><div class=\"y_popBox\"><div class=\"y_popTit\"><span>" + a +
		"</span><span class=\"y_popClose\"></span></div><div class=\"y_popCont\"><iframe class=\"y_popHtml\" src=\"" + b +
		"\" name=\"" + c + "\"></iframe></div></div>"), $("body").append(d), $(d).children(".y_popBox").animate({ top: .15 *
			$(window).height() }, 300), $(d).children(".y_popBox").children(".y_popCont").css({ height: .7 * $(window).height() -
			40 }) }

function closePop(a, b) { var a = a;
	a || (a = $(".y_popBox").last()), a.animate({ top: "-999px" }, 300, function () { "function" == typeof b && b(), a.parent()
			.remove() }) }

function navInt() { var a = $(".y_nav_item.active .y_nav_item_box");
	a.css({ height: 36 * a.children().length }), navChang(), $(document).on("click", ".y_nav_item.end", function (a) { stop
				(a); var b = $(this),
				c = b.children(".y_nav_names"); if (c.toggleClass("active"), c.hasClass("active")) { var d = 36 * c.next().children()
					.length;
				c.next().css({ height: d }), b.parent().animate({ height: b.parent().height() + d }, 300) } else { var d = 36 * c.next()
					.children().length;
				c.next().animate({ height: 0 }, 300), b.parent().animate({ height: b.parent().height() - d }, 300) } keyClose() }),
		$(document).on("click", ".y_nav_item.not a.y_nav_name", function () { var a = $(this);
			$(".y_nav_name").removeClass("on"), a.addClass("on") }), $(document).on("click", ".y_nav_item.has a.y_nav_name",
			function (a) { stop(a); var b = $(this);
				$(".y_nav_name").removeClass("on"), b.addClass("on"), keyClose() }), $(document).on("click", ".y_nav_item.not",
			function () { $(".y_nav_item_box").animate({ height: 0 }, 300), $(".y_nav_items_box").animate({ height: 0 }, 300), $(
					".y_nav_item").removeClass("active"), $(".y_nav_names").removeClass("active"), $(this).addClass("active") }), $(
			document).on("click", ".y_nav_item.has", function () { var a = $(this);
			a.toggleClass("active"); var b = a.children(".y_nav_item_box");
			a.hasClass("active") ? ($(".y_nav_item").each(function (b, c) { c != a[0] && $(c).removeClass("active") }), $(
				".y_nav_item_box").each(function (a, c) { c != b[0] && $(c).animate({ height: 0 }, 300) }), b.animate({ height: 36 *
					b.children().length }, 300)) : $(".y_nav_item_box").animate({ height: 0 }, 300), $(".y_nav_items_box").animate({ height: 0 },
				300), $(".y_nav_names").removeClass("active") }) }

function navChang() { var a = $(window).height(),
		b = $(".y_header").height(),
		c = $(".y_main_head").height();
	$(".y_nav_scroll").css({ height: a - b }), $(".y_main_body").css({ height: a - b - c }), $(".y_popCont").css({ height: .7 *
				$(window).height() - 40 }), $(".y_mhd").width() > $(".y_main_head_scroll").width() ? $(".y_main_head_scroll").css({ "overflow-x": "scroll" }) :
		$(".y_main_head_scroll").css({ overflow: "hidden" }) }

function Confirm(a, b) {
	function c() { $(".y_confirmBox").animate({ top: "-500px" }, 300, function () { $(d).remove(), $(".y_mhd")[0] ? $(
				"body").css({ overflow: "hidden" }) : $("body").css({ overflow: "auto" }) }) } if (!$(".y_confirm")[0]) { var d =
			document.createElement("div");
		d.className = "y_confirm", $(d).append(
			"<div class=\"y_mark\"></div><div class=\"y_confirmBox\"><div class=\"y_confirmTit\"><span>\u7CFB\u7EDF\u63D0\u793A</span><span class=\"y_confirmClose\">\xD7</span></div><div class=\"y_confirmCont\"><div class=\"y_confirmQuest\">" +
			a +
			"</div></div><div class=\"y_confirmBtn\"><span class=\"y_confirmCancel\">\u53D6\u6D88</span><span class=\"y_confirmShure\">\u786E\u5B9A</span></div></div>"
		), $("body").append(d), y_drag(".y_confirmTit"), $(".y_confirmBox").animate({ top: parseInt($(window).height() / 3) -
				parseInt($(".y_confirmBox").height() / 2) }, 300), $(d).click(function (a) { a.target == $(
				".y_confirmBox .y_confirmClose")[0] ? (c(), "function" == typeof b && b(!1)) : a.target == $(
				".y_confirmBox .y_confirmShure")[0] ? (c(), "function" == typeof b && b(!0)) : a.target == $(
				".y_confirmBox .y_confirmCancel")[0] && (c(), "function" == typeof b && b(!1)) }) } }

function Alert(a, b) {
	function c() { $(".y_alertBox").animate({ top: "-500px" }, 300, function () { $(d).remove(), $(".y_mhd")[0] ? $("body")
				.css({ overflow: "hidden" }) : $("body").css({ overflow: "auto" }) }) } if (!$(".y_alert")[0]) { var d = document.createElement(
			"div");
		d.className = "y_alert", $(d).append(
				"<div class=\"y_mark\"></div><div class=\"y_alertBox\"><div class=\"y_alertTit\"><span>\u7CFB\u7EDF\u63D0\u793A</span><span class=\"y_alertClose\">\xD7</span></div><div class=\"y_alertCont\"><div class=\"y_alertQuest\">" +
				a + "</div></div><div class=\"y_alertBtn\"><span class=\"y_alertShure\">\u786E\u5B9A</span></div></div>"), $("body")
			.append(d).css({ overflow: "hidden" }), y_drag(".y_alertTit"), $(".y_alertBox").animate({ top: parseInt($(window).height() /
					3) - parseInt($(".y_alertBox").height() / 2) }, 300), $(d).click(function (a) { a.target == $(
					".y_alertBox .y_alertClose")[0] ? (c(), "function" == typeof b && b(!0)) : a.target == $(
					".y_alertBox .y_alertShure")[0] && (c(), "function" == typeof b && b(!0)) }) } }

function y_isLeapYear(a) { return !!(0 == a % 4 && 0 != a % 100 || 0 == a % 400) }

function y_getD(b, c) { var d = [],
		a = 1;
	a = 1 == c || 3 == c || 5 == c || 7 == c || 8 == c || 10 == c || 12 == c ? 32 : 2 == c ? y_isLeapYear(b) ? 30 : 29 :
		31; for (var e = 1; e < a; e++) d.push(e); return d }

function y_time(a, b) {
	function c(a) { var b = 0; "hour" == a ? (b = 24, $(".y_dat_time_hd").text("\u5C0F\u65F6")) : "mint" == a && (b = 60,
			$(".y_dat_time_hd").text("\u5206\u949F")); for (var a = "", c = 0; c < b; c++) a += "<li class=\"y_dat_time_item\">" +
			(10 > c ? "0" + c : c) + "</li>";
		$(".y_dat_time_scroll").css({ height: $(".y_dat_cont").height() }), $(".y_dat_time_itmbox").children().remove(), $(
			".y_dat_time_itmbox").append(
			"<div class=\"y_dat\"><div class=\"y_dat_hd\"><div class=\"y_dat_tit\">\u65F6\u95F4\u9009\u62E9</div></div><div class=\"y_dat_cont\"><div class=\"y_dat_time\" style=\"margin-top: 55px\"><span class=\"y_dat_time_inp hour\">00</span><span class=\"y_dat_time_\">:</span><span class=\"y_dat_time_inp mint\">00</span><span class=\"y_dat_time_btn\">\u786E\u5B9A</span></div><div class=\"y_dat_time_box\"><div class=\"y_dat_time_hd\"></div><div class=\"y_dat_time_cont\"><div class=\"y_dat_time_scroll\"><ul class=\"y_dat_time_itmbox\"></ul></div></div></div></div>"
		), $(".y_dat_time_box").show(), $(".y_dat_time_item").click(function () { var a = $(this);
			$(".y_dat_time_item").removeClass("active"), a.addClass("active"); var b = $(".y_dat_time_hd").text(); "\u5C0F\u65F6" ==
			b ? $(".y_dat_time_inp.hour").text(a.text()) : "\u5206\u949F" == b && $(".y_dat_time_inp.mint").text(a.text()), $(
				".y_dat_time_box").hide() }) } $(".y_dat").remove();
	$("body").append(
		"<div class=\"y_dat\"><div class=\"y_dat_hd\"><div class=\"y_dat_tit\">\u65F6\u95F4\u9009\u62E9</div></div><div class=\"y_dat_cont\"><div class=\"y_dat_time\" style=\"margin-top: 55px\"><span class=\"y_dat_time_inp hour\">00</span><span class=\"y_dat_time_\">:</span><span class=\"y_dat_time_inp mint\">00</span><span class=\"y_dat_time_btn\">\u786E\u5B9A</span></div><div class=\"y_dat_time_box\"><div class=\"y_dat_time_hd\"></div><div class=\"y_dat_time_cont\"><div class=\"y_dat_time_scroll\"><ul class=\"y_dat_time_itmbox\"></ul></div></div></div></div>"
	), $(".y_dat_cont").height(150); var d, e, f = $(".y_dat").width(),
		g = $(".y_dat").height();
	d = f + a.offset().left > $(window).width() ? a.offset().left - (f - a[0].offsetWidth + 2) : a.offset().left;
	e = g + a.offset().top + a[0].offsetHeight - $(window).scrollTop() > $(window).height() ? a.offset().top - (g + 2) - $(
		window).scrollTop() : a.offset().top + a[0].offsetHeight - $(window).scrollTop(), $(".y_dat").css({ left: d, top: 20 >
			e ? 20 : e }), console.log(1), $(".y_dat_time_btn").click(function () { b($(".y_dat_time_inp.hour").text() - 0, $(
			".y_dat_time_inp.mint").text() - 0), $(".y_dat").remove() }), $(".y_dat_time_inp.mint").click(function () { c(
			"mint") }), $(".y_dat_time_inp.hour").click(function () { c("hour") }), $(document).click(function (a) { "string" !=
		typeof a.target.className || -1 != a.target.className.indexOf("y_dat") || $(".y_dat").remove() }) }

function y_date(a, b, c) {
	function e(e, f, g) { var j = new Date(e, f, g),
			e = j.getFullYear(),
			f = j.getMonth(),
			g = j.getDate();
		$(".y_dat_box").children().remove(), $(".y_dat_tit.y").text(e + "\u5E74"), $(".y_dat_tit.m").text(f + 1 + "\u6708"); for (
			var k = new Date(e, f, 1).getDay(), l = "", q = 0; q < k; q++) l += "<li class=\"y_dat_item y_of\"></li>"; var r =
			y_getD(e, f + 1);
		$.each(r, function (a, b) { l += e == n && f == o && b == p ? "<li class=\"y_dat_item active\"data-y=\"" + e +
				"\"data-m=\"" + (f + 1) + "\"data-d=\"" + b + "\">" + b + "</li>" : "<li class=\"y_dat_item\"data-y=\"" + e +
				"\"data-m=\"" + (f + 1) + "\"data-d=\"" + b + "\">" + b + "</li>" }), $(".y_dat_box").append(l); var s, t, u = $(
				".y_dat").width(),
			v = $(".y_dat").height();
		s = u + a.offset().left > $(window).width() ? a.offset().left - (u - a[0].offsetWidth + 2) : a.offset().left;
		t = v + a.offset().top + a[0].offsetHeight - $(window).scrollTop() > $(window).height() ? a.offset().top - (v + 2) -
			$(window).scrollTop() : a.offset().top + a[0].offsetHeight - $(window).scrollTop(), $(".y_dat").css({ left: s, top: 20 >
					t ? 20 : t }), $(".y_dat_item").click(function () { var a = $(this);
				a.hasClass("y_of") || ($(".y_dat_item").removeClass("active"), a.addClass("active"), e = a.attr("data-y"), f = a.attr(
					"data-m"), g = a.attr("data-d"), c || (b(e, f, g), $(".y_dat").remove())) }) }

	function f(a) { var b = 0; "hour" == a ? (b = 24, $(".y_dat_time_hd").text("\u5C0F\u65F6")) : "mint" == a && (b = 60,
			$(".y_dat_time_hd").text("\u5206\u949F")); for (var a = "", c = 0; c < b; c++) a += "<li class=\"y_dat_time_item\">" +
			(10 > c ? "0" + c : c) + "</li>";
		$(".y_dat_time_scroll").css({ height: $(".y_dat_cont").height() }), $(".y_dat_time_itmbox").children().remove(), $(
			".y_dat_time_itmbox").append(a), $(".y_dat_time_box").show(), $(".y_dat_time_item").click(function () { var a = $(
				this);
			$(".y_dat_time_item").removeClass("active"), a.addClass("active"); var b = $(".y_dat_time_hd").text(); "\u5C0F\u65F6" ==
			b ? $(".y_dat_time_inp.hour").text(a.text()) : "\u5206\u949F" == b && $(".y_dat_time_inp.mint").text(a.text()), $(
				".y_dat_time_box").hide() }) } $(".y_dat").remove(); var g = new Date,
		h = g.getFullYear(),
		i = g.getMonth(),
		j = g.getDate(),
		k = g.getHours(),
		l = g.getMinutes(),
		n = h,
		o = i,
		p = j,
		q =
		"<div class=\"y_dat\"><div class=\"y_dat_hd\"><span class=\"y_dat_btn prev y\"></span><span class=\"y_dat_tit y\"></span><span class=\"y_dat_btn next y\"></span><span class=\"y_dat_btn prev m\"></span><span class=\"y_dat_tit m\"></span><span class=\"y_dat_btn next m\"></span><span class=\"y_dat_curr\">\u5F53\u5929</span></div><div class=\"y_dat_cont\"><ul class=\"y_dat_week\"><li class=\"y_dat_weekitem\">\u65E5</li><li class=\"y_dat_weekitem\">\u4E00</li><li class=\"y_dat_weekitem\">\u4E8C</li><li class=\"y_dat_weekitem\">\u4E09</li><li class=\"y_dat_weekitem\">\u56DB</li><li class=\"y_dat_weekitem\">\u4E94</li><li class=\"y_dat_weekitem\">\u516D</li></ul><ul class=\"y_dat_box\"></ul>";
	c && (q +=
		"<div class=\"y_dat_time\"><span class=\"y_dat_time_inp hour\">00</span><span class=\"y_dat_time_\">:</span><span class=\"y_dat_time_inp mint\">00</span><span class=\"y_dat_time_btn\">\u786E\u5B9A</span></div><div class=\"y_dat_time_box\"><div class=\"y_dat_time_hd\">\u5C0F\u65F6</div><div class=\"y_dat_time_cont\"><div class=\"y_dat_time_scroll\"><ul class=\"y_dat_time_itmbox\"></ul></div></div></div>"
	), q += "</div>", $("body").append(q), e(h, i, j), $(".y_dat_time_btn").click(function () { var a = $(
			".y_dat_item.active");
		a[0] && (h = a.attr("data-y"), i = a.attr("data-m"), j = a.attr("data-d"), b(h, i, j, $(".y_dat_time_inp.hour").text() -
			0, $(".y_dat_time_inp.mint").text() - 0), $(".y_dat").remove()) }), $(".y_dat_time_inp.mint").click(function () { f
			("mint") }), $(".y_dat_time_inp.hour").click(function () { f("hour") }), $(".y_dat_btn.prev.m").click(function () {--
		i, e(h, i, j) }), $(".y_dat_btn.next.m").click(function () {++i, e(h, i, j) }), $(".y_dat_btn.prev.y").click(
		function () {--h, e(h, i, j) }), $(".y_dat_btn.next.y").click(function () {++h, e(h, i, j) }), $(".y_dat_curr").click(
		function () { h = g.getFullYear(), i = g.getMonth(), j = g.getDate(), e(h, i, j) }), $(document).click(function (a) { "string" !=
		typeof a.target.className || -1 != a.target.className.indexOf("y_dat") || $(".y_dat").remove() }) }

function setCookie(a, b) { var c = setCookie.arguments,
		e = setCookie.arguments.length,
		f = 2 < e ? c[2] : null; if (null != f) { var g = new Date;
		g.setTime(g.getTime() + 24 * (3600 * (1e3 * f))) } var h = new Date;
	document.cookie = a + "=" + escape(b) + "; expires=" + h.toGMTString(h.setHours(h.getHours() + 720)) + "; path=" +
		rootUrl + "/;" }

function getCookie(a) { var b = a + "="; return 0 < document.cookie.length ? (offset = document.cookie.indexOf(b), -1 ==
		offset ? "" : (offset += b.length, end = document.cookie.indexOf(";", offset), -1 == end && (end = document.cookie.length),
			unescape(document.cookie.substring(offset, end)))) : "" }

function deleteCookie(a) { var b = new Date;
	b.setTime(b.getTime() - 86400000), setCookie(a, "", b) }

function loading(a, b) { $(".y_loading").remove(), b ? "none" == a ? $(b).children(".y_loading").remove() : $(b).append(
		"<div class=\"y_loading small\"><div class=\"y_mark\"></div><img src=\"" + imgUrl +
		"images/icon/loading.gif\"/></div></div>") : "none" == a ? ($(".y_loading").remove(), $(".y_mhd")[0] ? $("body").css({ overflow: "hidden" }) :
		$("body").css({ overflow: "auto" })) : $("body").append(
		"<div class=\"y_loading\"><div class=\"y_mark\"></div><img src=\"" + imgUrl +
		"images/icon/loading.gif\"/></div></div>").css({ overflow: "hidden" }) }

function y_drag(a) { $(a).css({ cursor: "all-scroll" }).addClass("y_noSelect"), $(a).mousedown(function (a) { var b =
			this,
			c = $(b).parent()[0].offsetLeft,
			d = $(b).parent()[0].offsetTop,
			e = a.screenX,
			f = a.screenY;
		document.onmousemove = function (a) { var g = a.screenX,
				h = a.screenY,
				i = c + (g - e),
				j = d + (h - f);
			0 > i ? i = 0 : i, i > $(window).width() - ($(b).parent().width() + 2) ? i = $(window).width() - ($(b).parent().width() +
				2) : i, 0 > j ? j = 0 : j, j > $(window).height() - ($(b).parent().height() + 2) ? j = $(window).height() - ($(
				b).parent().height() + 2) : j, $(b).parent().offset({ left: i, top: j }) } }), $(a).mouseleave(function () { document
			.onmousemove = function () {} }), $(a).mouseup(function () { document.onmousemove = function () {} }) }

function stop(a) { a.stopPropagation(), a.preventDefault() }

function Reload(a) { a ? window[a].location.reload() : window[$(".y_html.active").attr("name")].location.reload() }

function Refresh() { window.location.reload() }

function sliderLower(a, b) {
	function c() { e.eq(f).animate({ top: -d }, 300), ++f == a.length ? f = 0 : f, e.eq(f).animate({ top: 0 }, 300,
			function () { 0 == f ? e.eq(a.length - 1).css({ top: d }) : e.eq(f - 1).css({ top: d }) }) } var d = a.height(),
		e = a.parent().children(),
		f = 0;
	a.css({ top: d }), e.eq(0).css({ top: 0 });
	setInterval(c, b) }

function slide() {
	function a() { $(i[g]).animate({ left: -e }, 500), ++g == i.length ? g = 0 : g, $(i[g]).animate({ left: 0 }, 500,
			function () { 0 == g ? $(i[i.length - 1]).css({ left: e }) : $(i[g - 1]).css({ left: e }) }) }

	function b() { $(i[g]).animate({ left: e }, 500), -1 == --g ? g = i.length - 1 : g, $(i[g]).css({ left: -e }), $(i[g])
			.animate({ left: 0 }, 500) } $(".slide").width($(window).width()), $(".slide-item").width($(window).width()), $(
		".slide").height($(".slide-item").eq(0).height()); var c, d, e = $(".slide-item").width(),
		f = null,
		g = 0,
		h = 1e4,
		i = $(".slide-item"); if (i.css({ left: e }), $(i[g]).css({ left: 0 }), clearInterval(f), !(2 > i.length)) { f =
			setInterval(a, h); var j = isPC(),
			k = j ? "mousedown" : "touchstart",
			l = j ? "mousemove" : "touchmove",
			m = j ? "mouseup" : "touchend";
		$(".slide-item").on(k, function (a) { c = a.screenX || a.originalEvent.targetTouches[0].pageX, $(document).on(l,
				function (a) { d = a.screenX || a.originalEvent.targetTouches[0].pageX }) }), $(".slide-item").on(m, function () { null
				== d || (100 < c - d ? (a(), clearInterval(f), f = setInterval(a, h)) : 100 < d - c && (b(), clearInterval(f), f =
					setInterval(a, h)), c = d = void 0, document.onmousemove = function () {}, $(document).on(l, function () {})) }) } }

function isPC() { for (var a = navigator.userAgent, b = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad",
			"iPod"], c = !0, d = 0; d < b.length; d++)
		if (0 < a.indexOf(b[d])) { c = !1; break } return c }

function ChousPerson(a, b, c, d) {
	function e(a) { var b = 0,
			c = 0; return $.each(a, function (a, d) { c++, Find(f, d.id) && b++ }), 0 == b ? 0 : b == c ? 2 : 1 } if (!$(
			".y_pers")[0]) { var f = [];
		f = "one" == b ? [c] : c.split(","); var g = document.createElement("div"),
			h = "";
		g.className = "y_pers " + ("one" == b ? "one" : "two"), h +=
			"<div class=\"y_mark\"></div><div class=\"y_pers_box\"><div class=\"y_pers_tit\"><span>\u9009\u62E9\u4EBA\u5458</span><span class=\"y_pers_close\"></span></div><div class=\"y_pers_serch\"><div class=\"y_pers_serch_box\"><i class=\"y_pers_serch_icon\"></i><input type=\"text\" class=\"y_pers_serch_val\" /><span class=\"y_pers_serch_btn\">\u641C\u7D22</span></div></div><div class=\"y_pers_cont\"><div class=\"y_pers_scroll\"><ul class=\"y_pers_menu\">",
			1 == a.status ? $.each(a.data, function (a, b) { h +=
					"<li class=\"y_pers_item\"><div class=\"y_pers_item_name\"><span class=\"y_pers_item_check " + (Find(f, b.id) ?
						"active" : "") + "\"data-id=\"" + b.id + "\"data-name=\"" + b.name + "\"  title=\"" + b.name + "\">" + b.name +
					"</span></div></li>" }) : 2 == a.status && $.each(a.data, function (a, c) { h += "<li class=\"y_pers_item " + (e(c
						.users) ? "active" : "") + "\"><div class=\"y_pers_item_name " + (e(c.users) ? "active" : "") +
					"\"><span class=\"y_pers_item_check " + ("one" == b ? "dont" : "") + " " + (2 == e(c.users, !0) ? "active" : "") +
					"\"data-id=\"" + c.id + "\"data-name=\"" + c.name + "\">" + c.name +
					"</span><i class=\"y_pers_item_icon\"></i></div><ul class=\"y_pers_child\">", $.each(c.users, function (a, b) { var
							c = b.positionname ? b.positionname : "\u65E0";
						h += "<li class=\"y_pers_child_item on " + (Find(f, b.id) ? "active" : "") + "\"data-id=\"" + b.id +
							"\"data-name=\"" + b.name + "\"><div class=\"y_pers_child_name\"><span class=\"y_pers_child_check\">" + b.name +
							"\uFF08" + c + "\uFF09</span></div></li>" }), h += "</ul></li>" }), h +=
			"</ul></div></div><div class=\"y_pers_btn\"><span class=\"y_pers_shure\">\u786E\u5B9A</span></div>", $(g).append(h),
			$("body").append(g), $(g).show(), $(g).children(".y_pers_box").animate({ top: .15 * $(window).height() }, 300), $(
				".y_pers_item_name.active").each(function (a, b) { var c = 0;
				$(b).parent().children(".y_pers_child").children().each(function () { c += 40 }), $(b).parent().children(
					".y_pers_child").height(c) }), $(g).click(function (c) { if ("y_pers_close" == c.target.className) $(g).children(
					".y_pers_box").animate({ top: "-500px" }, 300, function () { $(g).remove() });
				else if ("y_pers_shure" == c.target.className) { var e = $(g).children(".y_pers_box").children(".y_pers_cont").children(
							".y_pers_scroll").children(".y_pers_menu").children(".y_pers_item"),
						f = "",
						h = "";
					1 == a.status ? e.each(function (a, c) { var d = $(c).children(".y_pers_item_name").children(".y_pers_item_check"); if (
							d.hasClass("active")) { if ("one" == b) return f = d.attr("data-name"), void(h = d.attr("data-id"));
							f ? (f += "," + d.attr("data-name"), h += "," + d.attr("data-id")) : (f += d.attr("data-name"), h += d.attr(
								"data-id")) } }) : 2 == a.status && e.each(function (a, c) { var d = $(c).children(".y_pers_child").children(
							".y_pers_child_item");
						d.each(function (a, c) { if ($(c).hasClass("active")) { if ("one" == b) return f = $(c).attr("data-name"),
									void(h = $(c).attr("data-id"));
								f ? (f += "," + $(c).attr("data-name"), h += "," + $(c).attr("data-id")) : (f += $(c).attr("data-name"), h +=
									$(c).attr("data-id")) } }) }), $(g).children(".y_pers_box").animate({ top: "-999px" }, 300, function () { $(
							g).remove(), d && d(f, h) }) } }) } }

function ChousProject(a, b, c, d) { if (!$(".y_pers")[0]) { var e = [];
		e = "one" == b ? [c] : c.split(","); var f = document.createElement("div"),
			g = "";
		f.className = "y_pers " + ("one" == b ? "one" : "two"), g +=
			"<div class=\"y_mark\"></div><div class=\"y_pers_box\"><div class=\"y_pers_tit\"><span>\u9009\u62E9\u9879\u76EE</span><span class=\"y_pers_close\"></span></div><div class=\"y_pers_serch\"><div class=\"y_pers_serch_box\"><i class=\"y_pers_serch_icon\"></i><input type=\"text\" class=\"y_pers_serch_val\" /><span class=\"y_pers_serch_btn\">\u641C\u7D22</span></div></div><div class=\"y_pers_cont\"><div class=\"y_pers_scroll\"><ul class=\"y_pers_menu\">",
			1 == a.status ? $.each(a.data, function (a, b) { g +=
					"<li class=\"y_pers_item\"><div class=\"y_pers_item_name\"><span class=\"y_pers_item_check " + (Find(e, b.id) ?
						"active" : "") + "\"data-id=\"" + b.id + "\"data-name=\"" + b.name + "\"  title=\"" + b.name + "\">" + b.name +
					"</span></div></li>" }) : 2 == a.status && (g +=
				"<li class=\"y_pers_item active\"><div class=\"y_pers_item_name active\"><span class=\"y_pers_item_check " + ("one" ==
					b ? "dont" : "") +
				" active\">\u9879\u76EE\u76EE\u5F55</span><i class=\"y_pers_item_icon\"></i></div><ul class=\"y_pers_child\">", $.each(
					a.data,
					function (a, b) { b.positionname ? b.positionname : "\u65E0";
						g += "<li class=\"y_pers_child_item on " + (Find(e, b.id) ? "active" : "") + "\"data-id=\"" + b.id +
							"\"data-name=\"" + b.title +
							"\"><div class=\"y_pers_child_name\"><span class=\"y_pers_child_check\" style=\"width:280px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap\">" +
							b.title + "</span></div></li>" }), g += "</ul></li>"), g +=
			"</ul></div></div><div class=\"y_pers_btn\"><span class=\"y_pers_shure\">\u786E\u5B9A</span></div>", $(f).append(g),
			$("body").append(f), $(f).show(), $(f).children(".y_pers_box").animate({ top: .15 * $(window).height() }, 300), $(
				".y_pers_item_name.active").each(function (a, b) { var c = 0;
				$(b).parent().children(".y_pers_child").children().each(function () { c += 40 }), $(b).parent().children(
					".y_pers_child").height(c) }), $(f).click(function (c) { if ("y_pers_close" == c.target.className) $(f).children(
					".y_pers_box").animate({ top: "-500px" }, 300, function () { $(f).remove() });
				else if ("y_pers_shure" == c.target.className) { var e = $(f).children(".y_pers_box").children(".y_pers_cont").children(
							".y_pers_scroll").children(".y_pers_menu").children(".y_pers_item"),
						g = "",
						h = "";
					1 == a.status ? e.each(function (a, c) { var d = $(c).children(".y_pers_item_name").children(".y_pers_item_check"); if (
							d.hasClass("active")) { if ("one" == b) return g = d.attr("data-name"), void(h = d.attr("data-id"));
							g ? (g += "," + d.attr("data-name"), h += "," + d.attr("data-id")) : (g += d.attr("data-name"), h += d.attr(
								"data-id")) } }) : 2 == a.status && e.each(function (a, c) { var d = $(c).children(".y_pers_child").children(
							".y_pers_child_item");
						d.each(function (a, c) { if ($(c).hasClass("active")) { if ("one" == b) return g = $(c).attr("data-name"),
									void(h = $(c).attr("data-id"));
								g ? (g += "," + $(c).attr("data-name"), h += "," + $(c).attr("data-id")) : (g += $(c).attr("data-name"), h +=
									$(c).attr("data-id")) } }) }), $(f).children(".y_pers_box").animate({ top: "-999px" }, 300, function () { $(
							f).remove(), d && d(g, h) }) } }) } }

function ChousCustomer(a, b, c, d) { if (!$(".y_pers")[0]) { var e = [];
		e = "one" == b ? [c] : c.split(","); var f = document.createElement("div"),
			g = "";
		f.className = "y_pers " + ("one" == b ? "one" : "two"), g +=
			"<div class=\"y_mark\"></div><div class=\"y_pers_box\"><div class=\"y_pers_tit\"><span>\u9009\u62E9\u9879\u76EE</span><span class=\"y_pers_close\"></span></div><div class=\"y_pers_serch\"><div class=\"y_pers_serch_box\"><i class=\"y_pers_serch_icon\"></i><input type=\"text\" class=\"y_pers_serch_val\" /><span class=\"y_pers_serch_btn\">\u641C\u7D22</span></div></div><div class=\"y_pers_cont\"><div class=\"y_pers_scroll\"><ul class=\"y_pers_menu\">",
			1 == a.status ? $.each(a.data, function (a, b) { g +=
					"<li class=\"y_pers_item\"><div class=\"y_pers_item_name\"><span class=\"y_pers_item_check " + (Find(e, b.id) ?
						"active" : "") + "\"data-id=\"" + b.id + "\"data-name=\"" + b.name + "\"  title=\"" + b.name + "\">" + b.name +
					"</span></div></li>" }) : 2 == a.status && (g +=
				"<li class=\"y_pers_item active\"><div class=\"y_pers_item_name active\"><span class=\"y_pers_item_check " + ("one" ==
					b ? "dont" : "") +
				" active\">\u5BA2\u6237\u76EE\u5F55</span><i class=\"y_pers_item_icon\"></i></div><ul class=\"y_pers_child\">", $.each(
					a.data,
					function (a, b) { b.positionname ? b.positionname : "\u65E0";
						g += "<li class=\"y_pers_child_item on " + (Find(e, b.id) ? "active" : "") + "\"data-id=\"" + b.id +
							"\"data-name=\"" + b.name +
							"\"><div class=\"y_pers_child_name\"><span class=\"y_pers_child_check\" style=\"width:280px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap\">" +
							b.name + "</span></div></li>" }), g += "</ul></li>"), g +=
			"</ul></div></div><div class=\"y_pers_btn\"><span class=\"y_pers_shure\">\u786E\u5B9A</span></div>", $(f).append(g),
			$("body").append(f), $(f).show(), $(f).children(".y_pers_box").animate({ top: .15 * $(window).height() }, 300), $(
				".y_pers_item_name.active").each(function (a, b) { var c = 0;
				$(b).parent().children(".y_pers_child").children().each(function () { c += 40 }), $(b).parent().children(
					".y_pers_child").height(c) }), $(f).click(function (c) { if ("y_pers_close" == c.target.className) $(f).children(
					".y_pers_box").animate({ top: "-500px" }, 300, function () { $(f).remove() });
				else if ("y_pers_shure" == c.target.className) { var e = $(f).children(".y_pers_box").children(".y_pers_cont").children(
							".y_pers_scroll").children(".y_pers_menu").children(".y_pers_item"),
						g = "",
						h = "";
					1 == a.status ? e.each(function (a, c) { var d = $(c).children(".y_pers_item_name").children(".y_pers_item_check"); if (
							d.hasClass("active")) { if ("one" == b) return g = d.attr("data-name"), void(h = d.attr("data-id"));
							g ? (g += "," + d.attr("data-name"), h += "," + d.attr("data-id")) : (g += d.attr("data-name"), h += d.attr(
								"data-id")) } }) : 2 == a.status && e.each(function (a, c) { var d = $(c).children(".y_pers_child").children(
							".y_pers_child_item");
						d.each(function (a, c) { if ($(c).hasClass("active")) { if ("one" == b) return g = $(c).attr("data-name"),
									void(h = $(c).attr("data-id"));
								g ? (g += "," + $(c).attr("data-name"), h += "," + $(c).attr("data-id")) : (g += $(c).attr("data-name"), h +=
									$(c).attr("data-id")) } }) }), $(f).children(".y_pers_box").animate({ top: "-999px" }, 300, function () { $(
							f).remove(), d && d(g, h) }) } }) } }

function PersonInit() { $(".y_pers_item").show(), $(".y_pers_item ").removeClass("active"), $(".y_pers_child_item").addClass(
		"on"), $(".y_pers_child_item").removeClass("active"), $(".y_pers_serch_val").val(""), $(".y_pers_item_check ").removeClass(
		"active"), $(".y_pers_child").height(0) }

function Find(a, b) { for (var c = 0; c < a.length; c++)
		if (a[c] - 0 == b - 0) return !0; return !1 }

function Format(a, b) { var c = a,
		d = function (a, b) { b || (b = 2), a = a + ""; for (var c = 0, d = ""; c < b - a.length; c++) d += "0"; return d + a }; return b
		.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function (a) { switch (a) {
			case "d":
				return c.getDate();
			case "dd":
				return d(c.getDate());
			case "ddd":
				return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][c.getDay()];
			case "dddd":
				return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][c.getDay()];
			case "M":
				return c.getMonth() + 1;
			case "MM":
				return d(c.getMonth() + 1);
			case "MMM":
				return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][c.getMonth()];
			case "MMMM":
				return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
					"November", "December"][c.getMonth()];
			case "yy":
				return (c.getFullYear() + "").substr(2);
			case "yyyy":
				return c.getFullYear();
			case "h":
				return c.getHours() % 12 || 12;
			case "hh":
				return d(c.getHours() % 12 || 12);
			case "H":
				return c.getHours();
			case "HH":
				return d(c.getHours());
			case "m":
				return c.getMinutes();
			case "mm":
				return d(c.getMinutes());
			case "s":
				return c.getSeconds();
			case "ss":
				return d(c.getSeconds());
			case "l":
				return d(c.getMilliseconds(), 3);
			case "L":
				var b = c.getMilliseconds(); return 99 < b && (b = Math.round(b / 10)), d(b);
			case "tt":
				return 12 > c.getHours() ? "am" : "pm";
			case "TT":
				return 12 > c.getHours() ? "AM" : "PM";
			case "Z":
				return c.toUTCString().match(/[A-Z]+$/);
			default:
				return a.substr(1, a.length - 2); } }) }

function Graph(c, d, e, f) {
	function g(a) { $(a).mousemove(function (a) { var b = $(this),
				c = a.pageX + 20,
				d = a.pageY;
			$(".GrapCursor").css({ display: "block", left: c - $(window).scrollLeft(), top: d - $(window).scrollTop() }), $(
				".GrapCursorName").text(b.attr("data-name")), $(".GrapCursorRece").text("\u5B8C\u6210\u91D1\u989D\uFF1A" + b.attr(
				"data-succ")), $(".GrapCursorExpe").text("\u76EE\u6807\u91D1\u989D\uFF1A" + b.attr("data-expe")), $(
				".GrapCursorPay").text("\u5B8C\u6210\u767E\u5206\u6BD4\uFF1A" + b.attr("data-bfb")) }), $(a).mouseout(function () { $
				(".GrapCursor").css({ display: "none" }) }) } if (c.maxexpe) { for (var h = c.results, l = c.maxexpe > c.maxsucc ?
				c.maxexpe : c.maxsucc, m = 0; m < h.length - 1; m++)
			for (var n = m + 1; n < h.length; n++)
				if (h[m].succ < h[n].succ) { var o = $.extend({}, h[n]),
						a = $.extend({}, h[m]);
					h[m] = o, h[n] = a } $(d + " .GraphMapX").children(".GraphMapXItemBox").remove(), $.each(h, function (a, b) { $(d +
				" .GraphMapX").append("<li class=\"GraphMapXItemBox\"><span class=\"GraphMapXItem\">" + b.name +
				"</span><div class=\"GraphMapSucc " + (f ? f == b.id ? "Blue" : "" : "") + "\">" + (b.succ > b.expe ?
					"<duv class=\"GraphMapMore\"style=\"max-height:100%\"></div>" : "") +
				"</div><div class=\"GraphMapGrap\"></div></li>") }); for (var b = 1, m = 1; 0 < m; m++)
			if (1e4 * (m * e) >= l) { b = m; break } var p = 1e4 * (e * b);
		$(d + " .GraphMapY").children(".GraphMapYLine").remove(); for (var m = 1; m < e + 1; m++) $(d + " .GraphMapY").children()
			.eq(0).before("<li class=\"GraphMapYLine\"><span class=\"GraphMapYTextL\">" + m * b + "</span></li>"); var q = $(d +
				" .GraphMap").height(),
			r = $(d + " .GraphMap").width(),
			s = $(d + " .GraphMapYLine"),
			t = $(d + " .GraphMapXItemBox");
		s.each(function (a, b) { $(b).css({ top: (q / s.length).toFixed(2) * a }) }), t.each(function (a, b) { $(b).css({ left: (
					r / t.length).toFixed(2) * a, width: parseInt(r / t.length) - 30 }); var c = parseInt($(b).width());
			$(b).children(d + " .GraphMapGrap").css({ width: c, "max-width": "40px", height: 100 * ((h[a].expe ? h[a].expe : 0) /
					p).toFixed(4) + "%", left: "50%", "margin-left": 40 < c ? "-20px" : -c / 2 }), $(b).children(d +
				" .GraphMapSucc").css({ width: c, "max-width": "40px", height: 100 * ((h[a].succ ? h[a].succ : 0) / p).toFixed(4) +
					"%", left: "50%", "margin-left": 40 < c ? "-20px" : -c / 2 }), $(b).children(d + " .GraphMapGrap").attr({ "data-succ": h[
					a].succ ? h[a].succ : 0, "data-expe": h[a].expe ? h[a].expe : 0, "data-bfb": h[a].expe ? (100 * (h[a].succ / h[
					a].expe)).toFixed(2) : "100%", "data-name": h[a].name }), $(b).children(d + " .GraphMapSucc").attr({ "data-succ": h[
					a].succ ? h[a].succ : 0, "data-expe": h[a].expe ? h[a].expe : 0, "data-bfb": h[a].expe ? (100 * (h[a].succ / h[
					a].expe)).toFixed(2) : "100%", "data-name": h[a].name }), $(b).children(d + " .GraphMapMore").attr({ "data-succ": h[
					a].succ ? h[a].succ : 0, "data-expe": h[a].expe ? h[a].expe : 0, "data-bfb": h[a].expe ? (100 * (h[a].succ / h[
					a].expe)).toFixed(2) : "100%", "data-name": h[a].name }) }), g(".GraphMapSucc"), g(".GraphMapGrap"), g(
			".GraphMapMore"), $("body").append(
			"<div class=\"GrapCursor\" style=\"display:none\"><p class=\"GrapCursorName\"></p><p class=\"GrapCursorRece\"></p><p class=\"GrapCursorExpe\"></p><p class=\"GrapCursorPay\"></p></div>"
		) } }

function saveWidth() { $(".row").each(function (a, b) { $(b).children(".col6").each(function (a, c) { $(c).width(
				parseInt($(b).width() / 2) - 16), 0 == a % 2 && $(c).css({ "margin-right": "20px" }) }) }) }

function selectInit(a, b, c, d, f, g, e) { $(document).on("click", a, function (c) { c.stopPropagation(); var d = $(
				this);
			$(b).hide(), $(a).removeClass("active"), d.children(b).show(), g ? d.children(g).focus() : "", d.children(b).css({ width: d[
						0].offsetWidth - 2, top: d.offset().top + d[0].offsetHeight + f - $(window).scrollTop(), left: d.offset().left -
						$(window).scrollLeft() }), $(d).addClass("active"), 4 < d.children(b).children().length ? d.children(b).css({ "overflow-y": "scroll" }) :
				"" }), e ? $(document).on("click", d, function (a) { a.stopPropagation(); var b = $(this);
			b.hasClass("active") ? (b.removeClass("active"), b.parent().parent().children(g).val(b.parent().parent().children(g)
					.val().replace(b.children(".MoreSelectItemVal").text() + " ", "")), b.parent().parent().children(c).val(b.parent()
					.parent().children(c).val().replace(b.children(".MoreSelectItemVal").attr("data-val") + " ", "")), b.parent().parent()
				.children(c).change()) : (b.addClass("active"), b.parent().parent().children(g).val(b.parent().parent().children(
				g).val() + b.children(".MoreSelectItemVal").text() + " "), b.parent().parent().children(c).val(b.parent().parent()
				.children(c).val() + b.children(".MoreSelectItemVal").attr("data-val") + " "), b.parent().parent().children(c).change()) }) :
		$(document).on("click", d, function (a) { a.stopPropagation(); var d = $(this);
			g ? d.parent().parent().children(g).val(d.text()) : "", g ? d.parent().parent().children(c).val(d.attr("data-val")) :
				d.parent().parent().children(c).text(d.attr("data-val")), d.parent().parent().children(c).change(), $(b).hide() }),
		g && $(document).on("input", g, function (a) { a.stopPropagation(); var c = $(this),
				e = c.val();
			c.parent().children(b).children(d).each(function (a, b) {-1 == $(b).text().indexOf(e) ? $(b).hide() : $(b).show() }) }),
		$(document).on("click", function () { $(b).hide(), $(a).removeClass("active") }), $(window).on("scroll", function () { $
				(b).hide(), $(a).removeClass("active") }) }

function inPop(a) { if (-1 == a.indexOf("#")) var b = $("#" + a);
	else var b = $(a);
	b.show(), b.children(".y_inPopBox").animate({ top: .1 * $(window).height() }, 300) }

function otPop(a) { if (-1 == a.indexOf("#")) var b = $("#" + a);
	else var b = $(a);
	b.children(".y_inPopBox").animate({ top: "-999px" }, 300, function () { b.hide() }) }

function noData(a) { $(".y_noData").remove();
	$(a).append("<div class=\"y_noData\"><img class=\"y_deft_img\" src=\"" + imgUrl +
		"images/img/nodata.png\"/><div class=\"y_deft_cont\"><p class=\"y_deft_sub\">\u62B1\u6B49\uFF0C\u5F53\u524D\u9875\u9762\u6682\u65E0\u6570\u636E</p></div></div>"
	) }

function reLogin() { window.location.href = "/html/main/login.html" }

function setPage(a, b) { var c = $(a); if (c.children().remove(), b && b.next_page) { var d =
			"<ul class=\"y_page\"><li class=\"y_page_item\" data-page=\"1\"><a>&lt;&lt;\u9996\u9875</a></li>"; if (!(5 < b.total_page))
			$.each(b.all_pages, function (a, c) { d += "<li class=\"y_page_item " + (c == b.current_page ? "active" : "") +
					"\" data-page=\"" + c + "\"><a>" + c + "</a></li>" });
		else if (5 > b.current_page)
			for (var e = 1; 6 > e; e++) d += "<li class=\"y_page_item " + (e == b.current_page ? "active" : "") +
				"\" data-page=\"" + e + "\"><a>" + e + "</a></li>";
		else d += "<li class=\"y_page_item\" data-page=\"" + (b.current_page - 2) + "\"><a>" + (b.current_page - 2) +
			"</a></li><li class=\"y_page_item\" data-page=\"" + (b.current_page - 1) + "\"><a>" + (b.current_page - 1) +
			"</a></li><li class=\"y_page_item active\" data-page=\"" + b.current_page + "\"><a>" + b.current_page + "</a></li>",
			b.current_page + 1 <= b.total_page && (d += "<li class=\"y_page_item\" data-page=\"" + (b.current_page + 1) +
				"\"><a>" + (b.current_page + 1) + "</a></li>"), b.current_page + 2 <= b.total_page && (d +=
				"<li class=\"y_page_item\" data-page=\"" + (b.current_page + 2) + "\"><a>" + (b.current_page + 2) + "</a></li>");
		d += "<li class=\"y_page_item\" data-page=\"" + b.last_page + "\"><a>\u672B\u9875&gt;&gt;</a></li></ul>", c.append(d) } }

function Reset(a) { a ? ($(a + " input").val(""), $(a + " textarea").val(""), $(a + " .y_inpSect_tex").each(function (a,
		b) { $(b).text($(b).attr("data-int")) }), $(a + " select").each(function (a, b) { $(b).children("option").first().prop(
			"selected", "selected") })) : ($("input").val(""), $("textarea").val(""), $(".y_inpSect_tex").each(function (a, b) { $
			(b).text($(b).attr("data-int")) }), $("select").each(function (a, b) { $(b).children("option").first().prop(
			"selected", "selected") })) }

function imgBase(a, b) { var c = new FileReader;
	c.readAsDataURL(a), c.onload = function (a) { var c = new Image;
		c.src = a.target.result, c.onload = function () { var a = document.createElement("canvas"),
				d = this.width,
				e = this.height;
			a.width = d, a.height = e; var f = a.getContext("2d");
			f.drawImage(c, 0, 0, d, e); var g = a.toDataURL();
			b(g) } } }

function getIdFromUrl() { var a = window.location.href; return decodeURI(a.slice(a.indexOf("id=") + 3)) }
function getParametersFromUrl(key) { var a = window.location.href; return decodeURI(a.slice(a.indexOf(key+"=") + 1 + key.length)) }
