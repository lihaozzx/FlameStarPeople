import Vue from 'vue';

class utils {
	ls;
	ss;
	constructor() {
		this.ls = window.localStorage;
		this.ss = window.sessionStorage;
	}
	/**
	 * 获取cookie
	 * @param {Object} cname 名称
	 */
	getcookie(cname) {
		const name = cname + '=';
		const ca = document.cookie.split(';');
		for (let c of ca) {
			while (c.charAt(0) === ' ') c = c.substring(1);
			if (c.indexOf(name) !== -1) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}
	/**
	 * 存储cookie
	 * @param {Object} cname cookie名称
	 * @param {Object} cvalue cookie值
	 * @param {Object} exdays 过期时间（天）
	 */
	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		const expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + '; ' + expires;
	}
	/**
	 * 删除cookie
	 * @param {Object} key cookie名称
	 */
	delCookie(key) {
		let date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = key + '=v; expires =' + date.toUTCString();
	}
	/**
	 * 获取url传参
	 * @param {Object} name 参数名
	 */
	getUrlParam(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return '';
	}
	/**
	 * 格式化Date对象
	 * @param {Object} fmt 格式
	 * @param {Object} date Date()
	 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
	 */
	formatTime(time, cFormat) {
		if (arguments.length === 0) return null
		if ((time + '').length === 10) {
			time = +time * 1000
		}
		let format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
			date
		if (typeof time === 'object') {
			date = time
		} else {
			date = new Date(time)
		}
		let formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		}
		let time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			let value = formatObj[key];
			if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	}
	/*-----------------localStorage---------------------*/
	/*设置localStorage*/
	setLocal(key, val) {
		let setting = arguments[0];
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (let i in setting) {
				this.ls.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ls.setItem(key, JSON.stringify(val))
		}
	}

	/*获取localStorage*/
	getLocal(key) {
		if (key) return JSON.parse(this.ls.getItem(key))
		return null;
	}

	/*移除localStorage*/
	removeLocal(key){
		this.ls.removeItem(key)
	}

	/*移除所有localStorage*/
	clearLocal() {
		this.ls.clear()
	}

	/*-----------------sessionStorage---------------------*/
	/*设置sessionStorage*/
	setSession(key, val) {
		let setting = arguments[0];
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (let i in setting) {
				this.ss.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ss.setItem(key, JSON.stringify(val))
		}
	}

	/*获取sessionStorage*/
	getSession(key){
		if (key) return JSON.parse(this.ss.getItem(key))
		return null;

	}

	/*移除sessionStorage*/
	removeSession(key){
		this.ss.removeItem(key)
	}

	/*移除所有sessionStorage*/
	clearSession(){
		this.ss.clear()
	}
}

Vue.prototype.$utils = new utils();