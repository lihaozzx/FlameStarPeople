import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs

axios.defaults.baseURL = '';
axios.defaults.timeout = 5000;
Vue.prototype.$http = axios;

axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	let a = config.url.split('/');
	if (a[a.length - 1] != 'login') {
		// 不是login接口就添加token
		config.params = {
			...config.params,
			token: Vue.prototype.$store.getters.token
		}
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	if (response.status == 200) {
		if (response.data.status >= 1000) {
			// 1000表示token失效，重新登录
			router.push('asd');
		} else {
			return response;
		}
	} else {
		Vue.prototype.$notify({
			title: '异常',
			dangerouslyUseHTMLString: true,
			iconClass: 'el-icon-warning',
			message: '<strong>服务器未响应，请稍后再试</strong>',
			showClose: false
		});
	}
}, function(err) {
	// 对响应错误做点什么
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				break
			case 401:
				err.message = '未授权，请登录'
				break
			case 403:
				err.message = '拒绝访问'
				break
			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break
			case 408:
				err.message = '请求超时'
				break
			case 500:
				err.message = '服务器内部错误'
				break
			case 501:
				err.message = '服务未实现'
				break
			case 502:
				err.message = '网关错误'
				break
			case 503:
				err.message = '服务不可用'
				break
			case 504:
				err.message = '网关超时'
				break
			case 505:
				err.message = 'HTTP版本不受支持'
				break
			default:
		}
	}
	return Promise.reject(err)
});
