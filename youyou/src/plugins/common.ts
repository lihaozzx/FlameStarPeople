import Vue from 'vue';
export default {
	/**
	 * 获取cookie
	 * @param {Object} cname 名称
	 */
	getcookie: function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	/**
	 * 存储cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie值
	 * @param {Object} exdays 过期时间（天）
	 */
	setCookie: function (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	/**
	 * 删除cookie
	 * @param {Object} key cookie名称
	 */
	delCookie: function (key) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = key + "=v; expires =" + date.toGMTString();
	},
	/**
	 * 获取url传参
	 * @param {Object} name 参数名
	 */
	getUrlParam: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},
	/**
	 * 节流函数
	 * @param {Object} method 需要节流的函数
	 * @param {Object} mustRunDelay 时间
	 */
	throttle: function (method, mustRunDelay) {
		let timer,
			args = arguments,
			start;
		return function loop() {
			let self = this;
			let now = Date.now();
			if (!start) {
				start = now;
			}
			if (timer) {
				clearTimeout(timer);
			}
			if (now - start >= mustRunDelay) {
				method.apply(self, args);
				start = now;
			} else {
				timer = setTimeout(function () {
					loop.apply(self, args);
				}, 50);
			}
		}
	},
	/**
	 * 格式化Date对象
	 * @param {Object} fmt 格式
	 * @param {Object} date Date()
	 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
	 */
	formatTime: function (time, cFormat) {
		if (arguments.length === 0) return null
		if ((time + '').length === 10) {
			time = +time * 1000
		}
		var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
			date
		if (typeof time === 'object') {
			date = time
		} else {
			date = new Date(time)
		}
		var formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		}
		var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			var value = formatObj[key]
			if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	},
	/*-----------------localStorage---------------------*/
	/*设置localStorage*/
	setLocal: function (key, val) {
		var setting = arguments[0];
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (var i in setting) {
				this.ls.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ls.setItem(key, JSON.stringify(val))
		}

	},

	/*获取localStorage*/
	getLocal: function (key) {
		if (key) return JSON.parse(this.ls.getItem(key))
		return null;

	},

	/*移除localStorage*/
	removeLocal: function (key) {
		this.ls.removeItem(key)
	},

	/*移除所有localStorage*/
	clearLocal: function () {
		this.ls.clear()
	},

	/*-----------------sessionStorage---------------------*/
	/*设置sessionStorage*/
	setSession: function (key, val) {
		var setting = arguments[0];
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (var i in setting) {
				this.ss.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ss.setItem(key, JSON.stringify(val))
		}

	},

	/*获取sessionStorage*/
	getSession: function (key) {
		if (key) return JSON.parse(this.ss.getItem(key))
		return null;

	},

	/*移除sessionStorage*/
	removeSession: function (key) {
		this.ss.removeItem(key)
	},

	/*移除所有sessionStorage*/
	clearSession: function () {
		this.ss.clear()
	},
}
