/* 项目根路径 */
var rootUrl = '/oa';
/*页面地址前缀*/
var pagUrl = '../';
/*图片地址前缀*/
var imgUrl = rootUrl + '/aaa/';
/*接口请求前缀*/
var reqUrl = 'http://192.168.1.100:8989';
//var reqUrl = 'http://fy.sem98.com';
/*验证登录*/
var isLogin = getCookie('isLogin');
var ul = window.location.href.slice()
var pagname = ul.slice(ul.lastIndexOf('/') + 1, ul.lastIndexOf('.'));
/*登录token值*/
var tokens = getCookie('tokens');

/*页面初始化完成*/
$(function() {
	/*验证登录*/
	if (isLogin != 'true' && pagname != 'login') {
		if (!$('.y_mhd')[0]) {
			parent.window.reLogin();
		} else {
			reLogin();
		}
	}

	/*回到顶部*/
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 200) {
			if (!$('.y_goTop')[0]) {
				$('body').append('<img class="y_goTop" src="' + imgUrl + 'images/icon/top.png" alt="回到顶部" title="回到顶部" />');
			}
		} else {
			$('.y_goTop').remove();
		}
	})
	$(document).on('click', '.y_goTop', function() {
		$('html,body').animate({
			'scrollTop': '0px'
		}, 300);
	})

	/*日历启动*/
	var datobj;
	$(document).on('click', '.y_dat_open', function() {
		datobj = $(this);
		y_date(datobj, function(y, m, d) {
			datobj.val(y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d))
		})
	})
	$(document).on('click', '.y_dat_opens', function() {
		datobj = $(this);
		y_date(datobj, function(y, m, d, h, s) {
			datobj.val(y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) +
				':' + (s < 10 ? '0' + s : s))
		}, true)
	})

	/*时间选择启动*/
	var timeobj;
	$(document).on('click', '.y_dat_time_open', function() {
		timeobj = $(this);
		y_time(timeobj, function(h, s) {
			timeobj.val((h < 10 ? '0' + h : h) + ':' + (s < 10 ? '0' + s : s))
		})
	})

	/*下拉菜单*/
	$(document).click(function(e) {
		if (typeof e.target.className != 'string') {
			return
		}
		if (e.target.className.indexOf('y_slectMenu') != -1) {
			var that = $(e.target);
			var menu = that.children('.y_slect');
			var w = 0;
			var h = 0;
			if (that.hasClass('active')) {
				that.removeClass('active');
			} else {
				$('.y_slectMenu').removeClass('active');
				that.addClass('active');
			}

			if ((menu.width() + that.offset().left) > $(window).width()) {
				w = that.offset().left - (menu.width() - that[0].offsetWidth + 2);
			} else {
				w = that.offset().left;
			};

			if ((menu.height() + that.offset().top + that[0].offsetHeight - $(window).scrollTop()) > $(window).height()) {
				h = that.offset().top - (menu.height() + 2) - $(window).scrollTop();
			} else {
				h = that.offset().top + that[0].offsetHeight - $(window).scrollTop();
			}

			that.children('.y_slect').css({
				left: w,
				top: h
			})
		} else {
			$('.y_slectMenu').removeClass('active')
		}
	})
	$(window).scroll(function() {
		$('.y_slectMenu').removeClass('active')
	})

	/*右键菜单*/
	$('.y_mhd').bind('contextmenu', function() {
		return false;
	});
	var keyObj;
	$(document).on('mousedown', '.y_mhd_item', function(e) {
		$('.y_key').remove();
		var index = $(this).index();
		var that = $(this);
		keyObj = that;
		if (e.buttons == 2) {
			var that = $(this);
			var str = '<ul class="y_key">';
			if (index != 0) {
				str += '<li class="y_keyItem" data-type="current"><a>关闭</a></li>';
			}
			if ((index == 0 && $('.y_mhd_item').length == 2) || $('.y_mhd_item').length > 2) {
				str += '<li class="y_keyItem" data-type="other"><a>关闭其他</a></li>';
			}
			if (index > 1) {
				str += '<li class="y_keyItem" data-type="left"><a>关闭左侧所有</a></li>';
			}
			if (index < $('.y_mhd_item').length - 1) {
				str += '<li class="y_keyItem" data-type="right"><a>关闭右侧所有</a></li>';
			}
			if ($('.y_mhd_item').length > 1 && index != 0) {
				str += '<li class="y_keyItem" data-type="all"><a>关闭全部</a></li>';
			}
			str += '</ul>';
			if (str.indexOf('y_keyItem') < 0) {
				return
			}
			$('body').append(str);
			var menu = $('.y_key');
			var x = e.clientX + 10;
			var y = e.clientY + 10;
			var w = e.clientX;
			var h = e.clientY;

			if ((menu.width() + x) > $(window).width()) {
				w = x - menu.width() - 20;
			} else {
				w = x;
			};

			h = y;

			menu.css({
				left: w,
				top: h
			})
		}
	})
	$(document).on('click', '.y_keyItem', function(e) {
		var that = $(this);
		var type = that.attr('data-type');
		var index = keyObj.index();
		var clas = '';
		var clase = [];
		if (type == 'current') {
			clase.push(keyObj.attr('data-class'));
		} else if (type == 'other') {
			clas = keyObj.attr('data-class');
			$('.y_mhd_item').each(function(k, v) {
				if (k != 0 && k != index) {
					clase.push($(v).attr('data-class'));
				}
			})
		} else if (type == 'left') {
			clas = keyObj.attr('data-class');
			$('.y_mhd_item').each(function(k, v) {
				if (k != 0 && k < index && k) {
					clase.push($(v).attr('data-class'));
				}
			})
		} else if (type == 'right') {
			$('.y_mhd_item').each(function(k, v) {
				if (k != 0 && k > index) {
					clase.push($(v).attr('data-class'));
				}
			})
		} else if (type == 'all') {
			$('.y_mhd_item').each(function(k, v) {
				if (k != 0) {
					clase.push($(v).attr('data-class'));
				}
			})
		}
		if (clas || clase[0]) {
			for (var i = 0; i < clase.length; i++) {
				closeHtml(clase[i], clas)
			}
		}
	})
	$(document).click(function(e) {
		if (typeof e.target.className != 'string') {
			return
		}
		if (e.target.className.indexOf('y_mhd') != -1) {} else {
			if (!$('.y_mhd')[0]) {
				parent.window.keyClose()
			} else {
				keyClose()
			}
		}
	})

	/*模拟下拉*/
	$(document).click(function(e) {
		if (typeof e.target.className != 'string') {
			return
		}
		if (e.target.className.indexOf('y_inpSect') != -1) {
			var dm = $(e.target);
			var i = 0;

			function getthat(dm) {
				if (dm.hasClass('y_inpSect')) {
					return dm
				} else if (i < 2) {
					++i
					return getthat(dm.parent())
				} else {
					return false
				}
			};
			var that = getthat(dm);
			if (!that) {
				return
			}
			var menu = that.children('.y_inpSect_box');
			var w = 0;
			var h = 0;
			$('.y_inpSect').removeClass('active');
			that.addClass('active');

			if ((menu.width() + that.offset().left) > $(window).width()) {
				w = that.offset().left - (menu.width() - that[0].offsetWidth + 2);
			} else {
				w = that.offset().left;
			};

			if ((menu.height() + that.offset().top + that[0].offsetHeight - $(window).scrollTop()) > $(window).height()) {
				h = that.offset().top - (menu.height() + 2) - $(window).scrollTop() - 6;
			} else {
				h = that.offset().top + that[0].offsetHeight - $(window).scrollTop() + 6;
			}

			that.children('.y_inpSect_box').css({
				left: w,
				top: h
			})
		} else {
			$('.y_inpSect').removeClass('active')
		}
	})
	$(document).on('click', '.y_inpSect_item', function(e) {
		stop(e);
		var that = $(this);
		$('.y_inpSect').removeClass('active');
		that.parent().parent().parent().parent().children('.y_inpSect_tex').text(that.text())
		that.parent().parent().parent().parent().children('.y_inpSect_val').val(that.attr('data-val')).change();
	})
	$(window).scroll(function() {
		$('.y_inpSect').removeClass('active')
	})

	/*表单重置*/
	$(document).on('click', '.y_reset', function() {
		Reset();
	})

	/*复制文本*/
	$(document).on('click', '.y_copy', function() {
		var that = $(this);
		var urls = document.createElement('input');
		$(urls).val(that.attr('data-text')).css({
			'position': 'fixed',
			'left': '-999px',
			'top': '-999px'
		})
		$('body').append(urls)
		Alert('复制成功', function() {
			urls.select();
			document.execCommand("Copy");
			$(urls).remove()
		})
	})

	/*输入框边框*/
	$(document).on('focus', '.y_input', function() {
		$(this).addClass('active');
	})
	$(document).on('focusout', '.y_input', function() {
		$(this).removeClass('active');
	})

	/*按钮组*/
	$('.y_grpBtn').each(function(k, v) {
		$(v).children().last().css({
			'border': 'none'
		})
	})
	$(document).on('click', '.y_grpItem', function() {
		var that = $(this);
		that.parent().children('.y_grpItem').removeClass('active');
		that.addClass('active');
	})

	/*单选框*/
	$(document).on('click', '.y_radio', function() {
		$('input[name="' + $(this).next().attr('name') + '"]').prev().removeClass('active');
		$(this).toggleClass('active');
	})

	/*多选框*/
	$(document).on('click', '.y_check', function() {
		$(this).toggleClass('active');
	})
	$(document).on('click','.y_checkAll', function () {
		$(this).toggleClass('active');
		let t = $(this).hasClass('active');
		let a = $(this).attr('data-checkall');
		if(a){
			$('.y_checkson').each((k,v)=>{
				if($(v).attr('data-checkall')==a){
					if(t){
						if($(v).hasClass('active')){
						}else{
							$(v).trigger("click");
						}
					}else{
						if($(v).hasClass('active')){
							$(v).trigger("click");
						}else{
						}
					}
				}
			})
		}
	})

	/*新开页面*/
	$(document).on('click', '.y_newHtml', function() {
		var that = $(this);
		/*判断是否父级页面*/
		if ($('.y_main_body')[0]) {
			newHtml(that)
		} else {
			parent.window.newHtml(that)
		}
	})

	/*头部页面切换*/
	$(document).on('click', '.y_mhd_item', function() {
		var that = $(this);
		$('.y_mhd_item').removeClass('active');
		$('iframe.y_html').removeClass('active');
		that.addClass('active')
		$('iframe.y_html.' + that.attr('data-class')).addClass('active');
	})

	/*头部页面关闭*/
	$(document).on('click', '.y_mhd_clos', function(e) {
		stop(e)
		var that = $(this).parent().parent();
		closeHtml(that.attr('data-class'))
	})

	/*表格隔行变色*/
	exchangTr();

	/*弹窗数据选择*/
	$(document).on('click', '.one .y_pers_child_item ', function(e) {
		stop(e);
		var that = $(this);
		$('.y_pers_child_item').removeClass('active')
		that.addClass('active');
	})
	$(document).on('click', '.two .y_pers_child_item ', function(e) {
		stop(e);
		var that = $(this);
		that.toggleClass('active');
		that.parent().prev().children('.y_pers_item_check').removeClass('active')
	})
	$(document).on('click', '.one .y_pers_item_check', function(e) {
		var that = $(this);
		$('.y_pers_item_check');
		if (!that.parent().children('.y_pers_item_icon')[0]) {
			$('.one .y_pers_item_check').removeClass('active');
			that.addClass('active');
		}
	})
	$(document).on('click', '.two .y_pers_item_check', function(e) {
		stop(e);
		var that = $(this);
		that.toggleClass('active');
		if (that.parent().children('.y_pers_item_icon')[0]) {
			if (that.hasClass('active')) {
				that.parent().next().children().each(function(k, v) {
					$(v).addClass('active');
				})
			} else {
				that.parent().next().children().each(function(k, v) {
					$(v).removeClass('active');
				})
			}
		}
	})
	$(document).on('click', '.y_pers_item_name', function() {
		var that = $(this);
		that.parent().toggleClass('active');
		if (that.children('.y_pers_item_icon')[0]) {
			if (that.parent().hasClass('active')) {
				$('.y_pers_child').each(function(k, v) {
					if (v != that.next()[0]) {
						$(v).animate({
							'height': 0
						}, 300);
						$(v).parent().removeClass('active')
					}
				})
				that.next().animate({
					'height': that.next().children('.on').length * 40
				}, 300);
			} else {
				$('.y_pers_child').animate({
					'height': 0
				}, 300);
				$('.y_pers_item').removeClass('active')
			}
		}
	})
	$(document).on('click', '.y_pers_serch_btn', function() {
		var val = $('.y_pers_serch_val').val();
		if (val) {
			$('.y_pers_item').each(function(k, v) {
				var that = $(v).children('.y_pers_item_name');
				if (that.children('.y_pers_item_icon')[0]) {
					if (that.children('.y_pers_item_check').text().indexOf(val) > -1) {
						$(v).children('.y_pers_child').children().addClass('on');
						$(v).show().addClass('active').children('.y_pers_child').css({
							'height': $(v).children('.y_pers_child').children('.on').length * 40
						});
					} else {
						var boo = false;
						$(v).children('.y_pers_child').children().each(function(k1, v1) {
							var _that = $(v1).children('.y_pers_child_name').children('.y_pers_child_check');
							if (_that.text().indexOf(val) > -1) {
								$(v1).addClass('on');
								boo = true;
							} else {
								$(v1).removeClass('on')
							}
						})
						if (boo) {
							$(v).show().addClass('active').children('.y_pers_child').css({
								'height': $(v).children('.y_pers_child').children('.on').length * 40
							});
						} else {
							$(v).hide()
						}
					}
				} else {
					if (that.children('.y_pers_item_check').text().indexOf(val) > -1) {
						$(v).show();
					} else {
						$(v).hide();
					}
				}
			})
		} else {
			PersonInit();
		}
	})

	/*头部用户下拉*/
	$(document).on('click', '.y_head_menu_item.user', function(e) {
		e.stopPropagation()
		$(this).toggleClass('active')
	})
	$(document).on('click', function(e) {
		if (e.target != $('.y_head_menu_item.user')[0] && $('.y_head_menu_item.user').eq(0).hasClass('active')) {
			$('.y_head_menu_item.user').eq(0).removeClass('active')
		} else if (!$('.y_head_menu_item.user')[0]) {} {
			parent.window.menuClos()
		}
	})

	/*弹窗页面*/
	$(document).on('click', '.y_newPop', function() {
		var that = $(this);
		var title = that.attr('data-title');
		var url = that.attr('data-url');
		var name = that.attr('data-class');
		/*判断是否父级页面*/
		if ($('.y_main_body')[0]) {
			if(name != undefined){
				newPop(title, url ,name);
			}else{
				newPop(title, url);
			}
		} else {
			if(name != undefined){
				parent.window.newPop(title, url ,name);
			}else{
				parent.window.newPop(title, url);
			}
		}
	})

	/*关闭弹窗页面*/
	$(document).on('click', '.y_popClose', function() {
		var that = $(this).parent().parent();
		closePop(that);
	})

	/*
	 * 单选框组件
	 * */
	$(document).on('click', '.radioItem', function(e) {
		e.stopPropagation()
		var that = $(this);
		that.parent().children('.radioItem').removeClass('active');
		that.addClass('active');
		that.parent().children('input').val(that.attr('data-val'))
		that.parent().children('input').change()
	})
	/*
	 * 多选框组件
	 * */
	$(document).on('click', '.checkItem', function(e) {
		e.stopPropagation()
		var that = $(this);
		if (that.hasClass('active')) {
			that.removeClass('active');
			that.parent().children('input').val((that.parent().children('input').val() + '').replace(that.attr('data-val') +
				'/', ''))
			that.parent().children('input').change()
		} else {
			that.addClass('active');
			that.parent().children('input').val(that.parent().children('input').val() + that.attr('data-val') + '/')
			that.parent().children('input').change()
		}
	})
	$(document).on('click', '.checkbox', function(e) {
		var that = this;
		$(that).toggleClass('active');
	})

	/*删除选择文件*/
	$(document).on('click', '.DelFile', function() {
		var that = $(this);
		parent.window.Confirm('确定删除？', function(e) {
			if (e) {
				that.parent().remove()
			}
		})
	})

	/*文件下载*/
	$(document).on('click', '.download-a', function() {
		var id = $(this).attr('itemid');
		window.location.href = '/main/download?id=' + id;
	});

	/*内部页面弹窗*/
	$(document).on('click', '.y_inPop', function() {
		var id = $(this).attr('data-popid');
		inPop(id);
	})
	$(document).on('click', '.y_otPop', function() {
		var id = $(this).attr('data-popid');
		otPop(id);
	})

	/*选择文件*/
	$(document).on('click', '.y_fileDel', function() {
		var that = $(this);
		parent.window.Confirm('确定删除？', function(e) {
			if (e) {
				that.parent().remove()
			}
		})
	})
	$('.y_fileAdd').click(function() {
		$(this).prev().click()
	});
});

/*关闭右键菜单*/
function keyClose() {
	$('.y_key').remove();
}

/*关闭用户下拉*/
function menuClos() {
	$('.y_head_menu_item.user').removeClass('active');
}
/*窗口变化*/
window.onresize = function() {
	navChang();
	saveWidth();
}

/*表格隔行变色*/
function exchangTr() {
	$('.y_exchag tr').each(function(k, v) {
		if (k % 2 == 0) {
			$(v).addClass('y_even');
		} else {
			$(v).removeClass('y_even');
		}
	})
}

/*新开页面*/
function newHtml(that) {
	var clas = that.attr('data-class');
	var urls = that.attr('data-url');
	var name = that.attr('data-title');

	$('iframe.y_html').removeClass('active');
	$('.y_mhd_item').removeClass('active');

	/*判断是否存在页面*/
	if ($('iframe.' + clas)[0]) {
		$('iframe.' + clas).addClass('active');
		$('.y_mhd_item.' + clas).addClass('active');
		if ($('iframe.' + clas).attr('src') != urls) {
			$('iframe.' + clas)[0].src = urls
		}
	} else {
		$('.y_main_body').append('<iframe src="' + urls + '" class="y_html active ' + clas + '"name="' + clas +
			'" ></iframe>')
		$('.y_mhd').append(
			'<li class="y_mhd_item ' + clas + ' active" data-class="' + clas + '"><a><span class="y_mhd_tx ' + clas + '">' +
			name + '</span><i class="y_mhd_clos"></i></a></li>'
		)
		navChang();
		$('.y_main_head_scroll').scrollLeft($('.y_mhd_item.active').offset().left)
	}
};

/*关闭新开页面*/
function closeHtml(clas, cutclas) {
	var that = $('.y_mhd_item.' + clas);
	$('iframe.y_html.' + clas).remove()
	$('.y_mhd_item').removeClass('active');
	$('iframe.y_html').removeClass('active')
	if (cutclas) {
		$('.y_mhd_item.' + cutclas).addClass('active');
		$('iframe.y_html.' + cutclas).addClass('active');
	} else {
		$('.y_mhd_item').eq(that.index() - 1).addClass('active');
		$('iframe.y_html.' + $('.y_mhd_item').eq(that.index() - 1).attr('data-class')).addClass('active');
	}
	that.remove();
	navChang();
};

/*弹窗页面*/
function newPop(title, url,name) {
	var pop = document.createElement('div');
	pop.className = 'y_pop';
	$(pop).append(
		'<div class="y_mark"></div><div class="y_popBox"><div class="y_popTit">' +
		'<span>' + title + '</span><span class="y_popClose"></span></div><div class="y_popCont">' +
		'<iframe class="y_popHtml" src="' + url + '" name="'+name+'"></iframe></div></div>'
	)
	$('body').append(pop);
	$(pop).children('.y_popBox').animate({
		'top': $(window).height() * 0.15
	}, 300)
	$(pop).children('.y_popBox').children('.y_popCont').css({
		'height': $(window).height() * 0.7 - 40
	})
}

/*关闭弹窗页面*/
function closePop(that, callback) {
	var that = that;
	if (!that) {
		that = $('.y_popBox').last();
	}
	that.animate({
		'top': '-999px'
	}, 300, function() {
		if (typeof callback == 'function') {
			callback()
		}
		that.parent().remove();
	})
}

/*导航*/
function navInt() {
	var ints = $('.y_nav_item.active .y_nav_item_box');
	ints.css({
		'height': ints.children().length * 36
	})
	navChang();
	$(document).on('click', '.y_nav_item.end', function(e) {
		stop(e);
		var that = $(this);
		var that_ = that.children('.y_nav_names');
		that_.toggleClass('active');
		if (that_.hasClass('active')) {
			var h = that_.next().children().length * 36
			that_.next().css({
				'height': h
			});
			that.parent().animate({
				'height': that.parent().height() + h
			}, 300)
		} else {
			var h = that_.next().children().length * 36
			that_.next().animate({
				'height': 0
			}, 300);
			that.parent().animate({
				'height': that.parent().height() - h
			}, 300)
		}
		keyClose();
	})
	$(document).on('click', '.y_nav_item.not a.y_nav_name', function(e) {
		var that = $(this);
		$('.y_nav_name').removeClass('on');
		that.addClass('on');
	})
	$(document).on('click', '.y_nav_item.has a.y_nav_name', function(e) {
		stop(e)
		var that = $(this);
		$('.y_nav_name').removeClass('on');
		that.addClass('on');
		keyClose();
	})
	$(document).on('click', '.y_nav_item.not', function() {
		$('.y_nav_item_box').animate({
			'height': 0
		}, 300);
		$('.y_nav_items_box').animate({
			'height': 0
		}, 300);
		$('.y_nav_item').removeClass('active');
		$('.y_nav_names').removeClass('active');
		$(this).addClass('active');
	})
	$(document).on('click', '.y_nav_item.has', function() {
		var that = $(this);
		that.toggleClass('active');
		var box = that.children('.y_nav_item_box');
		if (that.hasClass('active')) {
			$('.y_nav_item').each(function(k, v) {
				if (v != that[0]) {
					$(v).removeClass('active');
				}
			})
			$('.y_nav_item_box').each(function(k, v) {
				if (v != box[0]) {
					$(v).animate({
						'height': 0
					}, 300)
				}
			});
			box.animate({
				'height': box.children().length * 36
			}, 300)
		} else {
			$('.y_nav_item_box').animate({
				'height': 0
			}, 300);
		}
		$('.y_nav_items_box').animate({
			'height': 0
		}, 300);
		$('.y_nav_names').removeClass('active');
	})
};

/*导航高度设置*/
function navChang() {
	var wind = $(window).height();
	var head = $('.y_header').height();
	var hdmu = $('.y_main_head').height();
	$('.y_nav_scroll').css({
		'height': wind - head
	});
	$('.y_main_body').css({
		'height': wind - head - hdmu
	});
	$('.y_popCont').css({
		'height': $(window).height() * 0.7 - 40
	})
	if ($('.y_mhd').width() > $('.y_main_head_scroll').width()) {
		$('.y_main_head_scroll').css({
			'overflow-x': 'scroll'
		});
	} else {
		$('.y_main_head_scroll').css({
			'overflow': 'hidden'
		})
	}
};

/*询问框*/
function Confirm(quest, callback) {
	if ($('.y_confirm')[0]) {
		return
	}
	var Confirm = document.createElement('div');
	Confirm.className = 'y_confirm';
	$(Confirm).append(
		'<div class="y_mark"></div><div class="y_confirmBox"><div class="y_confirmTit"><span>系统提示</span><span class="y_confirmClose">' +
		'×</span></div><div class="y_confirmCont"><div class="y_confirmQuest">' + quest +
		'</div></div><div class="y_confirmBtn">' +
		'<span class="y_confirmCancel">取消</span><span class="y_confirmShure">确定</span></div></div>'
	);
	$('body').append(Confirm);
	y_drag('.y_confirmTit');
	$('.y_confirmBox').animate({
		'top': parseInt($(window).height() / 3) - parseInt($('.y_confirmBox').height() / 2)
	}, 300);
	$(Confirm).click(function(e) {

		if (e.target == $('.y_confirmBox .y_confirmClose')[0]) {

			Remove()
			if (typeof callback == 'function') {
				callback(false)
			};
		} else if (e.target == $('.y_confirmBox .y_confirmShure')[0]) {

			Remove()
			if (typeof callback == 'function') {
				callback(true)
			};
		} else if (e.target == $('.y_confirmBox .y_confirmCancel')[0]) {

			Remove()
			if (typeof callback == 'function') {
				callback(false)
			};
		}
	})

	function Remove() {
		$('.y_confirmBox').animate({
			'top': '-500px'
		}, 300, function() {
			$(Confirm).remove();
			if ($('.y_mhd')[0]) {
				$('body').css({
					'overflow': 'hidden'
				})
			} else {
				$('body').css({
					'overflow': 'auto'
				})
			}
		})
	}
};

/*提示框*/
function Alert(quest, callback) {
	if ($('.y_alert')[0]) {
		return
	}
	var Alert = document.createElement('div');
	Alert.className = 'y_alert';
	$(Alert).append(
		'<div class="y_mark"></div><div class="y_alertBox"><div class="y_alertTit"><span>系统提示</span><span class="y_alertClose">' +
		'×</span></div><div class="y_alertCont"><div class="y_alertQuest">' + quest + '</div></div><div class="y_alertBtn">' +
		'<span class="y_alertShure">确定</span></div></div>'
	);
	$('body').append(Alert).css({
		'overflow': 'hidden'
	});
	y_drag('.y_alertTit');
	$('.y_alertBox').animate({
		'top': parseInt($(window).height() / 3) - parseInt($('.y_alertBox').height() / 2)
	}, 300);
	$(Alert).click(function(e) {

		if (e.target == $('.y_alertBox .y_alertClose')[0]) {

			Remove()
			if (typeof callback == 'function') {
				callback(true)
			};
		} else if (e.target == $('.y_alertBox .y_alertShure')[0]) {

			Remove()
			if (typeof callback == 'function') {
				callback(true)
			};
		}
	})

	function Remove() {
		$('.y_alertBox').animate({
			'top': '-500px'
		}, 300, function() {
			$(Alert).remove();
			if ($('.y_mhd')[0]) {
				$('body').css({
					'overflow': 'hidden'
				})
			} else {
				$('body').css({
					'overflow': 'auto'
				})
			}
		})
	}
};

/*判断闰年*/
function y_isLeapYear(year) {
	var cond1 = year % 4 == 0; //条件1：年份必须要能被4整除
	var cond2 = year % 100 != 0; //条件2：年份不能是整百数
	var cond3 = year % 400 == 0; //条件3：年份是400的倍数
	var cond = cond1 && cond2 || cond3;
	if (cond) {
		return true;
	} else {
		return false;
	}
};

/*获取月份中的日期*/
function y_getD(y, m) {
	var a = [];
	var n = 1;
	if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
		n = 32;
	} else if (m == 2) {
		if (y_isLeapYear(y)) {
			n = 30;
		} else {
			n = 29;
		};
	} else {
		n = 31;
	};
	for (var i = 1; i < n; i++) {
		a.push(i);
	};
	return a
};

/*时间插件*/
function y_time(that, call) {

	$('.y_dat').remove();
	var hour, mint;

	var str = '<div class="y_dat"><div class="y_dat_hd"><div class="y_dat_tit">时间选择</div></div><div class="y_dat_cont">' +
		'<div class="y_dat_time" style="margin-top: 55px"><span class="y_dat_time_inp hour">00</span><span class="y_dat_time_">:</span><span class="y_dat_time_inp mint">00</span>' +
		'<span class="y_dat_time_btn">确定</span></div><div class="y_dat_time_box"><div class="y_dat_time_hd"></div><div class="y_dat_time_cont">' +
		'<div class="y_dat_time_scroll"><ul class="y_dat_time_itmbox"></ul></div></div></div></div>'
	$('body').append(str);
	$('.y_dat_cont').height(150);
	var wid = $('.y_dat').width();
	var hei = $('.y_dat').height();
	var w, h;
	if ((wid + that.offset().left) > $(window).width()) {
		w = that.offset().left - (wid - that[0].offsetWidth + 2);
	} else {
		w = that.offset().left;
	};

	if ((hei + that.offset().top + that[0].offsetHeight - $(window).scrollTop()) > $(window).height()) {
		h = that.offset().top - (hei + 2) - $(window).scrollTop();
	} else {
		h = that.offset().top + that[0].offsetHeight - $(window).scrollTop();
	}
	$('.y_dat').css({
		left: w,
		top: h < 20 ? 20 : h
	});
	console.log(1)
	$('.y_dat_time_btn').click(function() {
		call($('.y_dat_time_inp.hour').text() - 0, $('.y_dat_time_inp.mint').text() - 0)
		$('.y_dat').remove();
	})

	$('.y_dat_time_inp.mint').click(function() {
		settime('mint');
	})

	$('.y_dat_time_inp.hour').click(function() {
		settime('hour');
	})

	$(document).click(function(e) {
		if (typeof e.target.className != 'string') {
			return
		}
		if (e.target.className.indexOf('y_dat') != -1) {} else {
			$('.y_dat').remove();
		}
	})

	function settime(str) {
		var num = 0;
		if (str == 'hour') {
			num = 24;
			$('.y_dat_time_hd').text('小时');
		} else if (str == 'mint') {
			num = 60;
			$('.y_dat_time_hd').text('分钟');
		}
		var str = '';
		for (var i = 0; i < num; i++) {
			str += '<li class="y_dat_time_item">' + (i < 10 ? '0' + i : i) + '</li>'
		}
		$('.y_dat_time_scroll').css({
			'height': $('.y_dat_cont').height()
		})
		$('.y_dat_time_itmbox').children().remove();
		$('.y_dat_time_itmbox').append(str);
		$('.y_dat_time_box').show();

		$('.y_dat_time_item').click(function() {
			var that = $(this);
			$('.y_dat_time_item').removeClass('active');
			that.addClass('active');
			var tex = $('.y_dat_time_hd').text();
			if (tex == '小时') {
				$('.y_dat_time_inp.hour').text(that.text())
			} else if (tex == '分钟') {
				$('.y_dat_time_inp.mint').text(that.text())
			}
			$('.y_dat_time_box').hide();
		})
	};
}


/*日期插件*/
function y_date(that, call, time) {

	$('.y_dat').remove();
	var dat = new Date();
	var y = dat.getFullYear();
	var m = dat.getMonth();
	var d = dat.getDate();
	var hour = dat.getHours();
	var mint = dat.getMinutes();
	var ty = y,
		tm = m,
		td = d;

	var str = '<div class="y_dat"><div class="y_dat_hd"><span class="y_dat_btn prev y"></span>' +
		'<span class="y_dat_tit y"></span><span class="y_dat_btn next y"></span><span class="y_dat_btn prev m"></span><span class="y_dat_tit m">' +
		'</span><span class="y_dat_btn next m"></span><span class="y_dat_curr">当天</span></div>' +
		'<div class="y_dat_cont"><ul class="y_dat_week"><li class="y_dat_weekitem">日</li>' +
		'<li class="y_dat_weekitem">一</li><li class="y_dat_weekitem">二</li><li class="y_dat_weekitem">三</li>' +
		'<li class="y_dat_weekitem">四</li><li class="y_dat_weekitem">五</li><li class="y_dat_weekitem">六</li>' +
		'</ul><ul class="y_dat_box"></ul>'
	if (time) {
		str +=
			'<div class="y_dat_time"><span class="y_dat_time_inp hour">00</span><span class="y_dat_time_">:</span><span class="y_dat_time_inp mint">00</span>' +
			'<span class="y_dat_time_btn">确定</span></div><div class="y_dat_time_box"><div class="y_dat_time_hd">小时</div><div class="y_dat_time_cont">' +
			'<div class="y_dat_time_scroll"><ul class="y_dat_time_itmbox"></ul></div></div></div>'
	}
	str += '</div>'
	$('body').append(str);
	setdat(y, m, d);

	$('.y_dat_time_btn').click(function() {
		var that = $('.y_dat_item.active');
		if (!that[0]) {
			return
		}
		y = that.attr('data-y');
		m = that.attr('data-m');
		d = that.attr('data-d');
		call(y, m, d, $('.y_dat_time_inp.hour').text() - 0, $('.y_dat_time_inp.mint').text() - 0)
		$('.y_dat').remove();
	})

	$('.y_dat_time_inp.mint').click(function() {
		settime('mint');
	})

	$('.y_dat_time_inp.hour').click(function() {
		settime('hour');
	})

	$('.y_dat_btn.prev.m').click(function() {
		--m
		setdat(y, m, d)
	})

	$('.y_dat_btn.next.m').click(function() {
		++m
		setdat(y, m, d)
	})

	$('.y_dat_btn.prev.y').click(function() {
		--y
		setdat(y, m, d)
	})

	$('.y_dat_btn.next.y').click(function() {
		++y
		setdat(y, m, d)
	})

	$('.y_dat_curr').click(function() {
		y = dat.getFullYear();
		m = dat.getMonth();
		d = dat.getDate();
		setdat(y, m, d);
	})

	$(document).click(function(e) {
		if (typeof e.target.className != 'string') {
			return
		}
		if (e.target.className.indexOf('y_dat') != -1) {} else {
			$('.y_dat').remove();
		}
	})

	function setdat(y, m, d) {
		var dat = new Date(y, m, d);
		var y = dat.getFullYear();
		var m = dat.getMonth();
		var d = dat.getDate();
		$('.y_dat_box').children().remove()
		$('.y_dat_tit.y').text(y + '年')
		$('.y_dat_tit.m').text((m + 1) + '月')
		var days = (new Date(y, m, 1)).getDay();
		var st = '';
		for (var i = 0; i < days; i++) {
			st += '<li class="y_dat_item y_of"></li>'
		}
		var arr = y_getD(y, m + 1);
		$.each(arr, function(k, v) {
			if (y == ty && m == tm && v == td) {
				st += '<li class="y_dat_item active"data-y="' + y + '"data-m="' + (m + 1) + '"data-d="' + v + '">' + v + '</li>'
			} else {
				st += '<li class="y_dat_item"data-y="' + y + '"data-m="' + (m + 1) + '"data-d="' + v + '">' + v + '</li>'
			}
		});
		$('.y_dat_box').append(st)
		var wid = $('.y_dat').width();
		var hei = $('.y_dat').height();
		var w, h;
		if ((wid + that.offset().left) > $(window).width()) {
			w = that.offset().left - (wid - that[0].offsetWidth + 2);
		} else {
			w = that.offset().left;
		};

		if ((hei + that.offset().top + that[0].offsetHeight - $(window).scrollTop()) > $(window).height()) {
			h = that.offset().top - (hei + 2) - $(window).scrollTop();
		} else {
			h = that.offset().top + that[0].offsetHeight - $(window).scrollTop();
		}
		$('.y_dat').css({
			left: w,
			top: h < 20 ? 20 : h
		})

		$('.y_dat_item').click(function() {
			var that = $(this);
			if (that.hasClass('y_of')) {
				return
			}
			$('.y_dat_item').removeClass('active');
			that.addClass('active')
			y = that.attr('data-y');
			m = that.attr('data-m');
			d = that.attr('data-d');
			if (time) {

			} else {
				call(y, m, d)
				$('.y_dat').remove();
			}
		})
	}

	function settime(str) {
		var num = 0;
		if (str == 'hour') {
			num = 24;
			$('.y_dat_time_hd').text('小时');
		} else if (str == 'mint') {
			num = 60;
			$('.y_dat_time_hd').text('分钟');
		}
		var str = '';
		for (var i = 0; i < num; i++) {
			str += '<li class="y_dat_time_item">' + (i < 10 ? '0' + i : i) + '</li>'
		}
		$('.y_dat_time_scroll').css({
			'height': $('.y_dat_cont').height()
		})
		$('.y_dat_time_itmbox').children().remove();
		$('.y_dat_time_itmbox').append(str);
		$('.y_dat_time_box').show();

		$('.y_dat_time_item').click(function() {
			var that = $(this);
			$('.y_dat_time_item').removeClass('active');
			that.addClass('active');
			var tex = $('.y_dat_time_hd').text();
			if (tex == '小时') {
				$('.y_dat_time_inp.hour').text(that.text())
			} else if (tex == '分钟') {
				$('.y_dat_time_inp.mint').text(that.text())
			}
			$('.y_dat_time_box').hide();
		})
	};
}

//保存cookie
function setCookie(name, value) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if (expires != null) {
		var LargeExpDate = new Date();
		LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
	}
	var d = new Date();
	document.cookie = name + "=" + escape(value) + "; expires=" + d.toGMTString(d.setHours(d.getHours() + (24 * 30))) +
		"; path=" + rootUrl + "/;";
}

/*获取cookie*/
function getCookie(Name) {
	var search = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		if (offset != -1) {
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if (end == -1) end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		} else return ""
	} else return ""
}

/*删除cookie*/
function deleteCookie(name) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
	setCookie(name, "", expdate);
}

/*加载中*/
function loading(str, clas) {
	$('.y_loading').remove();
	if (clas) {
		if (str == 'none') {
			$(clas).children('.y_loading').remove()
		} else {
			$(clas).append('<div class="y_loading small"><div class="y_mark"></div><img src="' + imgUrl +
				'images/icon/loading.gif"/></div></div>');
		}
	} else {
		if (str == 'none') {
			$('.y_loading').remove();
			if ($('.y_mhd')[0]) {
				$('body').css({
					'overflow': 'hidden'
				})
			} else {
				$('body').css({
					'overflow': 'auto'
				})
			}
		} else {
			$('body').append('<div class="y_loading"><div class="y_mark"></div><img src="' + imgUrl +
				'images/icon/loading.gif"/></div></div>').css({
				'overflow': 'hidden'
			})
		}
	}
}

/*弹窗拖动*/
function y_drag(className) {
	$(className).css({
		'cursor': 'all-scroll'
	}).addClass('y_noSelect')
	$(className).mousedown(function(e) {
		var that = this;
		var w = $(that).parent()[0].offsetLeft;
		var h = $(that).parent()[0].offsetTop;
		var w1 = e.screenX;
		var h1 = e.screenY;
		document.onmousemove = function(e1) {
			var w2 = e1.screenX;
			var h2 = e1.screenY;
			var new_w = w + (w2 - w1);
			var new_h = h + (h2 - h1);
			new_w < 0 ? new_w = 0 : new_w;
			new_w > ($(window).width() - ($(that).parent().width() + 2)) ? new_w = $(window).width() - ($(that).parent().width() +
				2) : new_w;
			new_h < 0 ? new_h = 0 : new_h;
			new_h > ($(window).height() - ($(that).parent().height() + 2)) ? new_h = $(window).height() - ($(that).parent().height() +
				2) : new_h;
			$(that).parent().offset({
				left: new_w,
				top: new_h
			})
		}
	})
	$(className).mouseleave(function(e) {
		document.onmousemove = function(e1) {}
	})
	$(className).mouseup(function(e) {
		document.onmousemove = function(e1) {}
	})
};

/*阻止默认事件、冒泡*/
function stop(e) {
	e.stopPropagation()
	e.preventDefault()
};

/*刷新*/
function Reload(str) {
	if (str) {
		window[str].location.reload()
	} else {
		window[$('.y_html.active').attr('name')].location.reload()
	}
};

function Refresh(boo) {
	window.location.reload();
}

/*文本纵向滚动*/
function sliderLower(item, time) {
	var h = item.height();
	var pitem = item.parent().children();
	var index = 0;
	item.css({
		'top': h
	});
	pitem.eq(0).css({
		'top': 0
	});
	var timer = setInterval(move, time)

	function move() {
		pitem.eq(index).animate({
			'top': -h
		}, 300);
		++index == item.length ? index = 0 : index;
		pitem.eq(index).animate({
			'top': 0
		}, 300, function() {
			index == 0 ? pitem.eq(item.length - 1).css({
				'top': h
			}) : pitem.eq(index - 1).css({
				'top': h
			})
		})
	}
}

/*移动端轮播*/
function slide() {
	$('.slide').width($(window).width())
	$('.slide-item').width($(window).width())
	$('.slide').height($('.slide-item').eq(0).height())
	var w = $('.slide-item').width();
	var timer = null;
	var index = 0;
	var time = 10000;
	var item = $('.slide-item');
	var w1, w2;
	item.css({
		'left': w
	})
	$(item[index]).css({
		'left': 0
	})
	clearInterval(timer);
	if (item.length < 2) {
		return;
	}
	timer = setInterval(move, time)

	var _isPc = isPC();
	var startEvent = _isPc ? 'mousedown' : 'touchstart';
	var moveEvent = _isPc ? 'mousemove' : 'touchmove';
	var upEvent = _isPc ? 'mouseup' : 'touchend';

	$('.slide-item').on(startEvent, function(e) {

		w1 = e.screenX || e.originalEvent.targetTouches[0].pageX;
		$(document).on(moveEvent, function(e1) {
			w2 = e1.screenX || e1.originalEvent.targetTouches[0].pageX;
		})
	});
	$('.slide-item').on(upEvent, function() {
		if (w2 == undefined) {
			return
		}
		if ((w1 - w2) > 100) {
			move();
			clearInterval(timer);
			timer = setInterval(move, time);
		} else if ((w2 - w1) > 100) {
			move_();
			clearInterval(timer);
			timer = setInterval(move, time);
		}
		w1 = w2 = undefined
		document.onmousemove = function() {
			return;
		}
		$(document).on(moveEvent, function() {})
	});

	function move() {
		$(item[index]).animate({
				'left': -w
			}, 500)
			++index == item.length ? index = 0 : index
		$(item[index]).animate({
			'left': 0
		}, 500, function() {
			index == 0 ? $(item[item.length - 1]).css({
				'left': w
			}) : $(item[index - 1]).css({
				'left': w
			})
		})
	}

	function move_() {
		$(item[index]).animate({
				'left': w
			}, 500)
			--index == -1 ? index = item.length - 1 : index
		$(item[index]).css({
			'left': -w
		})
		$(item[index]).animate({
			'left': 0
		}, 500)
	}
};

/*判断是否是移动端的代码*/
function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

/*人员选择      res = 数据  type = 单选、多选   val = 原val值   callback = 回调	*/
function ChousPerson(res, type, val, callback) {
	if ($('.y_pers')[0]) {
		return;
	}
	var ids = [],
		boo;
	if (type == 'one') {
		ids = [val];
	} else {
		ids = val.split(',');
	}
	var Tan = document.createElement('div'),
		str = '';
	Tan.className = 'y_pers ' + (type == 'one' ? 'one' : 'two');
	str += '<div class="y_mark"></div><div class="y_pers_box"><div class="y_pers_tit">' +
		'<span>选择人员</span><span class="y_pers_close"></span></div><div class="y_pers_serch">' +
		'<div class="y_pers_serch_box"><i class="y_pers_serch_icon"></i><input type="text" class="y_pers_serch_val" />' +
		'<span class="y_pers_serch_btn">搜索</span></div></div><div class="y_pers_cont"><div class="y_pers_scroll"><ul class="y_pers_menu">'

	if (res.status == 1) {
		$.each(res.data, function(k, v) {
			str += '<li class="y_pers_item"><div class="y_pers_item_name">' +
				'<span class="y_pers_item_check ' + (Find(ids, v.id) ? "active" : "") + '"data-id="' + v.id + '"data-name="' + v.name +
				'"  title="' + v.name + '">' + v.name + '</span></div></li>'
		});
	} else if (res.status == 2) {
		$.each(res.data, function(k, v) {
			str += '<li class="y_pers_item ' + (find(v.users) ? "active" : "") + '"><div class="y_pers_item_name ' + (find(v.users) ?
					"active" : "") + '">' +
				'<span class="y_pers_item_check ' + (type == 'one' ? 'dont' : '') + ' ' + (find(v.users, true) == 2 ? "active" :
					"") + '"data-id="' + v.id + '"data-name="' + v.name + '">' + v.name + '</span>' +
				'<i class="y_pers_item_icon"></i></div><ul class="y_pers_child">'
			$.each(v.users, function(k1, v1) {
				var positionname = v1.positionname ? v1.positionname : '无';
				str += '<li class="y_pers_child_item on ' + (Find(ids, v1.id) ? "active" : "") + '"data-id="' + v1.id +
					'"data-name="' + v1.name + '"><div class="y_pers_child_name">' +
					'<span class="y_pers_child_check">' + v1.name + '（' + positionname + '）</span></div></li>'
			});
			str += '</ul></li>'
		});
	}
	str += '</ul></div></div><div class="y_pers_btn"><span class="y_pers_shure">确定</span></div>'

	$(Tan).append(str)
	$('body').append(Tan)
	$(Tan).show()
	$(Tan).children('.y_pers_box').animate({
		'top': $(window).height() * 0.15
	}, 300)

	$('.y_pers_item_name.active').each(function(k, v) {
		var h = 0;
		$(v).parent().children('.y_pers_child').children().each(function(k, v) {
			h += 40
		})
		$(v).parent().children('.y_pers_child').height(h);
	})

	function find(arr) {
		var num = 0;
		var num1 = 0;
		$.each(arr, function(k, v) {
			num1++
			if (Find(ids, v.id)) {
				num++
			}
		})
		if (num == 0) {
			return 0
		} else if (num == num1) {
			return 2
		} else {
			return 1
		}
	}
	$(Tan).click(function(e) {
		if (e.target.className == 'y_pers_close') {
			$(Tan).children('.y_pers_box').animate({
				'top': '-500px'
			}, 300, function() {
				$(Tan).remove()
			})
		} else if (e.target.className == 'y_pers_shure') {
			var list = $(Tan).children('.y_pers_box').children('.y_pers_cont').children('.y_pers_scroll').children(
				'.y_pers_menu').children('.y_pers_item')
			var valTex = '',
				valVal = '';
			if (res.status == 1) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_item_name').children('.y_pers_item_check');
					if (check.hasClass('active')) {
						if (type == 'one') {
							valTex = check.attr('data-name');
							valVal = check.attr('data-id');
							return
						} else {
							if (valTex) {
								valTex += ',' + check.attr('data-name');
								valVal += ',' + check.attr('data-id');
							} else {
								valTex += check.attr('data-name');
								valVal += check.attr('data-id');
							}
						}
					}
				})
			} else if (res.status == 2) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_child').children('.y_pers_child_item');
					check.each(function(k1, v1) {

						if ($(v1).hasClass('active')) {
							if (type == 'one') {
								valTex = $(v1).attr('data-name');
								valVal = $(v1).attr('data-id');
								return
							} else {
								if (valTex) {
									valTex += ',' + $(v1).attr('data-name');
									valVal += ',' + $(v1).attr('data-id');
								} else {
									valTex += $(v1).attr('data-name');
									valVal += $(v1).attr('data-id');
								}
							}
						}
					})
				})
			}
			$(Tan).children('.y_pers_box').animate({
				'top': '-999px'
			}, 300, function() {
				$(Tan).remove()
				if (callback) {
					callback(valTex, valVal)
				}
			})
		}
	})
}

/*项目选择      res = 数据  type = 单选、多选   val = 原val值   callback = 回调	*/
function ChousProject(res, type, val, callback) {
	if ($('.y_pers')[0]) {
		return;
	}
	var ids = [],
		boo;
	if (type == 'one') {
		ids = [val];
	} else {
		ids = val.split(',');
	}
	var Tan = document.createElement('div'),
		str = '';
	Tan.className = 'y_pers ' + (type == 'one' ? 'one' : 'two');
	str += '<div class="y_mark"></div><div class="y_pers_box"><div class="y_pers_tit">' +
		'<span>选择项目</span><span class="y_pers_close"></span></div><div class="y_pers_serch">' +
		'<div class="y_pers_serch_box"><i class="y_pers_serch_icon"></i><input type="text" class="y_pers_serch_val" />' +
		'<span class="y_pers_serch_btn">搜索</span></div></div><div class="y_pers_cont"><div class="y_pers_scroll"><ul class="y_pers_menu">'

	if (res.status == 1) {
		$.each(res.data, function(k, v) {
			str += '<li class="y_pers_item"><div class="y_pers_item_name">' +
				'<span class="y_pers_item_check ' + (Find(ids, v.id) ? "active" : "") + '"data-id="' + v.id + '"data-name="' + v.name +
				'"  title="' + v.name + '">' + v.name + '</span></div></li>'
		});
	} else if (res.status == 2) {
		str += '<li class="y_pers_item active"><div class="y_pers_item_name active">' +
			'<span class="y_pers_item_check ' + (type == 'one' ? 'dont' : '') + ' active">项目目录</span>' +
			'<i class="y_pers_item_icon"></i></div><ul class="y_pers_child">'

		$.each(res.data, function(k1, v1) {
			var positionname = v1.positionname ? v1.positionname : '无';
			str += '<li class="y_pers_child_item on ' + (Find(ids, v1.id) ? "active" : "") + '"data-id="' + v1.id +
				'"data-name="' + v1.title + '"><div class="y_pers_child_name">' +
				'<span class="y_pers_child_check" style="width:280px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap">' +
				v1.title + '</span></div></li>'
		});
		str += '</ul></li>'
	}
	str += '</ul></div></div><div class="y_pers_btn"><span class="y_pers_shure">确定</span></div>'

	$(Tan).append(str)
	$('body').append(Tan)
	$(Tan).show()
	$(Tan).children('.y_pers_box').animate({
		'top': $(window).height() * 0.15
	}, 300)

	$('.y_pers_item_name.active').each(function(k, v) {
		var h = 0;
		$(v).parent().children('.y_pers_child').children().each(function(k, v) {
			h += 40
		})
		$(v).parent().children('.y_pers_child').height(h);
	})

	function find(arr) {
		var num = 0;
		var num1 = 0;
		$.each(arr, function(k, v) {
			num1++
			if (Find(ids, v.id)) {
				num++
			}
		})
		if (num == 0) {
			return 0
		} else if (num == num1) {
			return 2
		} else {
			return 1
		}
	}
	$(Tan).click(function(e) {
		if (e.target.className == 'y_pers_close') {
			$(Tan).children('.y_pers_box').animate({
				'top': '-500px'
			}, 300, function() {
				$(Tan).remove()
			})
		} else if (e.target.className == 'y_pers_shure') {
			var list = $(Tan).children('.y_pers_box').children('.y_pers_cont').children('.y_pers_scroll').children(
				'.y_pers_menu').children('.y_pers_item')
			var valTex = '',
				valVal = '';
			if (res.status == 1) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_item_name').children('.y_pers_item_check');
					if (check.hasClass('active')) {
						if (type == 'one') {
							valTex = check.attr('data-name');
							valVal = check.attr('data-id');
							return
						} else {
							if (valTex) {
								valTex += ',' + check.attr('data-name');
								valVal += ',' + check.attr('data-id');
							} else {
								valTex += check.attr('data-name');
								valVal += check.attr('data-id');
							}
						}
					}
				})
			} else if (res.status == 2) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_child').children('.y_pers_child_item');
					check.each(function(k1, v1) {

						if ($(v1).hasClass('active')) {
							if (type == 'one') {
								valTex = $(v1).attr('data-name');
								valVal = $(v1).attr('data-id');
								return
							} else {
								if (valTex) {
									valTex += ',' + $(v1).attr('data-name');
									valVal += ',' + $(v1).attr('data-id');
								} else {
									valTex += $(v1).attr('data-name');
									valVal += $(v1).attr('data-id');
								}
							}
						}
					})
				})
			}
			$(Tan).children('.y_pers_box').animate({
				'top': '-999px'
			}, 300, function() {
				$(Tan).remove()
				if (callback) {
					callback(valTex, valVal)
				}
			})
		}
	})
}

/*客户选择      res = 数据  type = 单选、多选   val = 原val值   callback = 回调	*/
function ChousCustomer(res, type, val, callback) {
	if ($('.y_pers')[0]) {
		return;
	}
	var ids = [],
		boo;
	if (type == 'one') {
		ids = [val];
	} else {
		ids = val.split(',');
	}
	var Tan = document.createElement('div'),
		str = '';
	Tan.className = 'y_pers ' + (type == 'one' ? 'one' : 'two');
	str += '<div class="y_mark"></div><div class="y_pers_box"><div class="y_pers_tit">' +
		'<span>选择项目</span><span class="y_pers_close"></span></div><div class="y_pers_serch">' +
		'<div class="y_pers_serch_box"><i class="y_pers_serch_icon"></i><input type="text" class="y_pers_serch_val" />' +
		'<span class="y_pers_serch_btn">搜索</span></div></div><div class="y_pers_cont"><div class="y_pers_scroll"><ul class="y_pers_menu">'

	if (res.status == 1) {
		$.each(res.data, function(k, v) {
			str += '<li class="y_pers_item"><div class="y_pers_item_name">' +
				'<span class="y_pers_item_check ' + (Find(ids, v.id) ? "active" : "") + '"data-id="' + v.id + '"data-name="' + v.name +
				'"  title="' + v.name + '">' + v.name + '</span></div></li>'
		});
	} else if (res.status == 2) {
		str += '<li class="y_pers_item active"><div class="y_pers_item_name active">' +
			'<span class="y_pers_item_check ' + (type == 'one' ? 'dont' : '') + ' active">客户目录</span>' +
			'<i class="y_pers_item_icon"></i></div><ul class="y_pers_child">'

		$.each(res.data, function(k1, v1) {
			var positionname = v1.positionname ? v1.positionname : '无';
			str += '<li class="y_pers_child_item on ' + (Find(ids, v1.id) ? "active" : "") + '"data-id="' + v1.id +
				'"data-name="' + v1.name + '"><div class="y_pers_child_name">' +
				'<span class="y_pers_child_check" style="width:280px;overflow:hidden;text-overflow:ellipsis; white-space:nowrap">' +
				v1.name + '</span></div></li>'
		});
		str += '</ul></li>'
	}
	str += '</ul></div></div><div class="y_pers_btn"><span class="y_pers_shure">确定</span></div>'

	$(Tan).append(str)
	$('body').append(Tan)
	$(Tan).show()
	$(Tan).children('.y_pers_box').animate({
		'top': $(window).height() * 0.15
	}, 300)

	$('.y_pers_item_name.active').each(function(k, v) {
		var h = 0;
		$(v).parent().children('.y_pers_child').children().each(function(k, v) {
			h += 40
		})
		$(v).parent().children('.y_pers_child').height(h);
	})

	function find(arr) {
		var num = 0;
		var num1 = 0;
		$.each(arr, function(k, v) {
			num1++
			if (Find(ids, v.id)) {
				num++
			}
		})
		if (num == 0) {
			return 0
		} else if (num == num1) {
			return 2
		} else {
			return 1
		}
	}
	$(Tan).click(function(e) {
		if (e.target.className == 'y_pers_close') {
			$(Tan).children('.y_pers_box').animate({
				'top': '-500px'
			}, 300, function() {
				$(Tan).remove()
			})
		} else if (e.target.className == 'y_pers_shure') {
			var list = $(Tan).children('.y_pers_box').children('.y_pers_cont').children('.y_pers_scroll').children(
				'.y_pers_menu').children('.y_pers_item')
			var valTex = '',
				valVal = '';
			if (res.status == 1) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_item_name').children('.y_pers_item_check');
					if (check.hasClass('active')) {
						if (type == 'one') {
							valTex = check.attr('data-name');
							valVal = check.attr('data-id');
							return
						} else {
							if (valTex) {
								valTex += ',' + check.attr('data-name');
								valVal += ',' + check.attr('data-id');
							} else {
								valTex += check.attr('data-name');
								valVal += check.attr('data-id');
							}
						}
					}
				})
			} else if (res.status == 2) {
				list.each(function(k, v) {
					var check = $(v).children('.y_pers_child').children('.y_pers_child_item');
					check.each(function(k1, v1) {

						if ($(v1).hasClass('active')) {
							if (type == 'one') {
								valTex = $(v1).attr('data-name');
								valVal = $(v1).attr('data-id');
								return
							} else {
								if (valTex) {
									valTex += ',' + $(v1).attr('data-name');
									valVal += ',' + $(v1).attr('data-id');
								} else {
									valTex += $(v1).attr('data-name');
									valVal += $(v1).attr('data-id');
								}
							}
						}
					})
				})
			}
			$(Tan).children('.y_pers_box').animate({
				'top': '-999px'
			}, 300, function() {
				$(Tan).remove()
				if (callback) {
					callback(valTex, valVal)
				}
			})
		}
	})
}

/*人员选择初始化*/
function PersonInit() {
	$('.y_pers_item').show();
	$('.y_pers_item ').removeClass('active')
	$('.y_pers_child_item').addClass('on');
	$('.y_pers_child_item').removeClass('active')
	$('.y_pers_serch_val').val('');
	$('.y_pers_item_check ').removeClass('active')
	$('.y_pers_child').height(0)
}

/*id查找*/
function Find(arr, k) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] - 0 == k - 0) {
			return true
		}
	}
	return false
}

/*
 * 修改时间格式
 * Format(new Date(dangerList[i].findtime),"yy-MM-dd HH:mm:ss")
 * */
function Format(now, mask) {
	var d = now;
	var zeroize = function(value, length) {
		if (!length) length = 2;
		value = String(value);
		for (var i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
		switch ($0) {
			case 'd':
				return d.getDate();
			case 'dd':
				return zeroize(d.getDate());
			case 'ddd':
				return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
			case 'dddd':
				return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
			case 'M':
				return d.getMonth() + 1;
			case 'MM':
				return zeroize(d.getMonth() + 1);
			case 'MMM':
				return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
			case 'MMMM':
				return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
					'November', 'December'
				][d.getMonth()];
			case 'yy':
				return String(d.getFullYear()).substr(2);
			case 'yyyy':
				return d.getFullYear();
			case 'h':
				return d.getHours() % 12 || 12;
			case 'hh':
				return zeroize(d.getHours() % 12 || 12);
			case 'H':
				return d.getHours();
			case 'HH':
				return zeroize(d.getHours());
			case 'm':
				return d.getMinutes();
			case 'mm':
				return zeroize(d.getMinutes());
			case 's':
				return d.getSeconds();
			case 'ss':
				return zeroize(d.getSeconds());
			case 'l':
				return zeroize(d.getMilliseconds(), 3);
			case 'L':
				var m = d.getMilliseconds();
				if (m > 99) m = Math.round(m / 10);
				return zeroize(m);
			case 'tt':
				return d.getHours() < 12 ? 'am' : 'pm';
			case 'TT':
				return d.getHours() < 12 ? 'AM' : 'PM';
			case 'Z':
				return d.toUTCString().match(/[A-Z]+$/);
				// Return quoted strings with the surrounding quotes removed
			default:
				return $0.substr(1, $0.length - 2);
		}
	});
};


/*销售简报*/
function Graph(res, clas, num, id) {
	if (!res.maxexpe) {
		return
	};
	var arr = res.results
	var max = res.maxexpe > res.maxsucc ? res.maxexpe : res.maxsucc;

	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i].succ < arr[j].succ) {
				var a = $.extend({}, arr[j]);
				var b = $.extend({}, arr[i]);
				arr[i] = a
				arr[j] = b
			}
		}
	}
	$(clas + ' .GraphMapX').children('.GraphMapXItemBox').remove()
	$.each(arr, function(k, v) {
		$(clas + ' .GraphMapX').append(
			'<li class="GraphMapXItemBox"><span class="GraphMapXItem">' + v.name + '</span><div class="GraphMapSucc ' + (id ?
				id == v.id ? "Blue" : "" : "") + '">' + (v.succ > v.expe ?
				'<duv class="GraphMapMore"style="max-height:100%"></div>' : '') + '</div><div class="GraphMapGrap"></div></li>'
		);
	})
	var k = 1;
	for (var i = 1; i > 0; i++) {
		if (i * num * 10000 >= max) {
			k = i;
			break
		}
	}
	var all_x = num * k * 10000
	$(clas + ' .GraphMapY').children('.GraphMapYLine').remove()
	for (var i = 1; i < num + 1; i++) {
		$(clas + ' .GraphMapY').children().eq(0).before('<li class="GraphMapYLine"><span class="GraphMapYTextL">' + (i * k) +
			'</span></li>') //<span class="GraphMapYTextR colorGre">'+(i*k)+'</span>
	}
	var map_h = $(clas + ' .GraphMap').height();
	var map_w = $(clas + ' .GraphMap').width();
	var y_item = $(clas + ' .GraphMapYLine');
	var x_item = $(clas + ' .GraphMapXItemBox');
	y_item.each(function(k, v) {
		$(v).css({
			'top': (map_h / y_item.length).toFixed(2) * k
		});
	})
	x_item.each(function(k, v) {
		$(v).css({
			'left': (map_w / x_item.length).toFixed(2) * k,
			'width': parseInt(map_w / x_item.length) - 30
		});
		var w = parseInt($(v).width());
		$(v).children(clas + ' .GraphMapGrap').css({
			'width': w,
			'max-width': '40px',
			'height': ((arr[k].expe ? arr[k].expe : 0) / all_x).toFixed(4) * 100 + '%',
			'left': '50%',
			'margin-left': w > 40 ? '-20px' : -w / 2
		})
		$(v).children(clas + ' .GraphMapSucc').css({
			'width': w,
			'max-width': '40px',
			'height': ((arr[k].succ ? arr[k].succ : 0) / all_x).toFixed(4) * 100 + '%',
			'left': '50%',
			'margin-left': w > 40 ? '-20px' : -w / 2
		})
		$(v).children(clas + ' .GraphMapGrap').attr({
			'data-succ': arr[k].succ ? arr[k].succ : 0,
			'data-expe': arr[k].expe ? arr[k].expe : 0,
			'data-bfb': arr[k].expe ? ((arr[k].succ / arr[k].expe) * 100).toFixed(2) : 100 + '%',
			'data-name': arr[k].name
		})
		$(v).children(clas + ' .GraphMapSucc').attr({
			'data-succ': arr[k].succ ? arr[k].succ : 0,
			'data-expe': arr[k].expe ? arr[k].expe : 0,
			'data-bfb': arr[k].expe ? ((arr[k].succ / arr[k].expe) * 100).toFixed(2) : 100 + '%',
			'data-name': arr[k].name
		})
		$(v).children(clas + ' .GraphMapMore').attr({
			'data-succ': arr[k].succ ? arr[k].succ : 0,
			'data-expe': arr[k].expe ? arr[k].expe : 0,
			'data-bfb': arr[k].expe ? ((arr[k].succ / arr[k].expe) * 100).toFixed(2) : 100 + '%',
			'data-name': arr[k].name
		})
	})
	enter('.GraphMapSucc');
	enter('.GraphMapGrap');
	enter('.GraphMapMore');
	$('body').append(
		'<div class="GrapCursor" style="display:none"><p class="GrapCursorName"></p><p class="GrapCursorRece"></p><p class="GrapCursorExpe"></p><p class="GrapCursorPay"></p></div>'
	)

	function enter(clas) {
		$(clas).mousemove(function(e1) {
			var that = $(this);
			var w2 = e1.pageX + 20;
			var h2 = e1.pageY;
			$('.GrapCursor').css({
				'display': 'block',
				'left': w2 - $(window).scrollLeft(),
				'top': h2 - $(window).scrollTop()
			})
			$('.GrapCursorName').text(that.attr('data-name'))
			$('.GrapCursorRece').text('完成金额：' + that.attr('data-succ'))
			$('.GrapCursorExpe').text('目标金额：' + that.attr('data-expe'))
			$('.GrapCursorPay').text('完成百分比：' + that.attr('data-bfb'))
		})
		$(clas).mouseout(function(e) {
			$('.GrapCursor').css({
				'display': 'none'
			})
		})
	};
};

/*
 * 宽度设置
 * */
function saveWidth() {
	$('.row').each(function(k, v) {
		$(v).children('.col6').each(function(k1, v1) {
			$(v1).width(parseInt($(v).width() / 2) - 16)
			if (k1 % 2 == 0) {
				$(v1).css({
					'margin-right': '20px'
				})
			}
		})
	})
}

/*
 * 下拉框组件
 * */
function selectInit(group, groupMenu, textVal, selectItem, num, serch, more) {
	$(document).on('click', group, function(e) {
		e.stopPropagation()
		var that = $(this);
		$(groupMenu).hide()
		$(group).removeClass('active')
		that.children(groupMenu).show();
		serch ? that.children(serch).focus() : ''

		that.children(groupMenu).css({
			'width': that[0].offsetWidth - 2,
			'top': that.offset().top + that[0].offsetHeight + num - $(window).scrollTop(),
			'left': that.offset().left - $(window).scrollLeft()
		})
		$(that).addClass('active')
		that.children(groupMenu).children().length > 4 ? that.children(groupMenu).css({
			'overflow-y': 'scroll'
		}) : ''
	})
	if (more) {
		$(document).on('click', selectItem, function(e) {
			e.stopPropagation()
			var that = $(this);

			if (that.hasClass('active')) {
				that.removeClass('active');
				that.parent().parent().children(serch).val(that.parent().parent().children(serch).val().replace(that.children(
					'.MoreSelectItemVal').text() + ' ', ''))
				that.parent().parent().children(textVal).val(that.parent().parent().children(textVal).val().replace(that.children(
					'.MoreSelectItemVal').attr('data-val') + ' ', ''))
				that.parent().parent().children(textVal).change()
			} else {
				that.addClass('active')
				that.parent().parent().children(serch).val(that.parent().parent().children(serch).val() + that.children(
					'.MoreSelectItemVal').text() + ' ')
				that.parent().parent().children(textVal).val(that.parent().parent().children(textVal).val() + that.children(
					'.MoreSelectItemVal').attr('data-val') + ' ')
				that.parent().parent().children(textVal).change()
			}
		})
	} else {

		$(document).on('click', selectItem, function(e) {
			e.stopPropagation()
			var that = $(this);
			serch ? that.parent().parent().children(serch).val(that.text()) : ''
			serch ? that.parent().parent().children(textVal).val(that.attr('data-val')) : that.parent().parent().children(
				textVal).text(that.attr('data-val'))
			that.parent().parent().children(textVal).change()
			$(groupMenu).hide()
		})
	}
	if (serch) {
		$(document).on('input', serch, function(e) {
			e.stopPropagation()
			var that = $(this);
			var val = that.val();
			that.parent().children(groupMenu).children(selectItem).each(function(k, v) {
				if ($(v).text().indexOf(val) != -1) {
					$(v).show()
				} else {
					$(v).hide()
				}
			})
		})
	}

	$(document).on('click', function(e) {
		$(groupMenu).hide()
		$(group).removeClass('active')
	})
	$(window).on('scroll', function() {
		$(groupMenu).hide()
		$(group).removeClass('active')
	})
}

/*内部页面弹窗*/
function inPop(id) {
	if (id.indexOf('#') == -1) {
		var box = $('#' + id);
	} else {
		var box = $(id);
	}
	box.show();
	box.children('.y_inPopBox').animate({
		'top': $(window).height() * 0.1
	}, 300)
};
/*内部页面弹窗关闭*/
function otPop(id) {
	if (id.indexOf('#') == -1) {
		var box = $('#' + id);
	} else {
		var box = $(id);
	}
	box.children('.y_inPopBox').animate({
		'top': '-999px'
	}, 300, function() {
		box.hide()
	})
};

/*没有数据*/
function noData(clas) {
	$('.y_noData').remove();
	var str = '<div class="y_noData"><img class="y_deft_img" src="' + imgUrl + 'images/img/nodata.png"/>' +
		'<div class="y_deft_cont"><p class="y_deft_sub">抱歉，当前页面暂无数据</p></div></div>'
	$(clas).append(str);
}

/*页面重定向到登录*/
function reLogin() {
	window.location.href = rootUrl + '/main/login.html';
};

/*分页设置*/
function setPage(clas, page) {
	var that = $(clas);
	that.children().remove();
	if (!page || !page.next_page) {
		return
	};

	var str = '<ul class="y_page"><li class="y_page_item" data-page="1"><a>&lt;&lt;首页</a></li>';
	if (page.total_page > 5) {
		if (page.current_page < 5) {
			for (var i = 1; i < 6; i++) {
				str += '<li class="y_page_item ' + (i == page.current_page ? "active" : "") + '" data-page="' + i + '"><a>' + i +
					'</a></li>';
			}
		} else {
			str += '<li class="y_page_item" data-page="' + (page.current_page - 2) + '"><a>' + (page.current_page - 2) +
				'</a></li>' +
				'<li class="y_page_item" data-page="' + (page.current_page - 1) + '"><a>' + (page.current_page - 1) + '</a></li>' +
				'<li class="y_page_item active" data-page="' + (page.current_page) + '"><a>' + (page.current_page) + '</a></li>'
			if (page.current_page + 1 <= page.total_page) {
				str += '<li class="y_page_item" data-page="' + (page.current_page + 1) + '"><a>' + (page.current_page + 1) +
					'</a></li>'
			}
			if (page.current_page + 2 <= page.total_page) {
				str += '<li class="y_page_item" data-page="' + (page.current_page + 2) + '"><a>' + (page.current_page + 2) +
					'</a></li>'
			}
		}
	} else {
		$.each(page.all_pages, function(k, v) {
			str += '<li class="y_page_item ' + (v == page.current_page ? "active" : "") + '" data-page="' + v + '"><a>' + v +
				'</a></li>';
		});
	}
	str += '<li class="y_page_item" data-page="' + page.last_page + '"><a>末页&gt;&gt;</a></li></ul>';
	that.append(str);
};

/*表单重置*/
function Reset(clas) {
	if (clas) {
		$(clas + ' input').val('');
		$(clas + ' textarea').val('');
		$(clas + ' .y_inpSect_tex').each(function(k, v) {
			$(v).text($(v).attr('data-int'))
		})
		$(clas + ' select').each(function(k, v) {
			$(v).children('option').first().prop("selected", 'selected');
		})
	} else {
		$('input').val('');
		$('textarea').val('');
		$('.y_inpSect_tex').each(function(k, v) {
			$(v).text($(v).attr('data-int'))
		})
		$('select').each(function(k, v) {
			$(v).children('option').first().prop("selected", 'selected');
		})
	}
};

/*图片base64转换*/
function imgBase(file, call) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(event) {
		var image = new Image();
		image.src = event.target.result;
		image.onload = function() {

			var canvas = document.createElement('canvas');
			var width = this.width;
			var height = this.height;
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, width, height);
			var imgurl = canvas.toDataURL();
			call(imgurl)
		}
	}
};

/* url截取id */
function getIdFromUrl() {
	var urls = window.location.href;
	return decodeURI(urls.slice(urls.indexOf('id=') + 3));
}