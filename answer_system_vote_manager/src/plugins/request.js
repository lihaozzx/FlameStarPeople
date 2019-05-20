import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'

Vue.prototype.$qs = qs

// Vue.prototype.$url = 'http://tp.nzjykj.com';
// axios.defaults.baseURL = 'http://tp.nzjykj.com';

Vue.prototype.$url = 'http://192.168.1.100:9002';
axios.defaults.baseURL = 'http://192.168.1.100:9002';

axios.defaults.timeout = 50000;
Vue.prototype.$http = axios;

axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	let a = config.url.split('/');
	if (a[a.length - 1] != 'login') {
		// 不是login接口就添加token
		if(config.method=='get'){
			config.params = {
				...config.params,
				token: store.getters.tokens
			}
		}else{
			if(typeof config.data === 'object'){
				//上传才是FormData对象 其他都是qs格式化了的字符串
				config.data.append('token',store.getters.tokens);
			}else{
				config.data=qs.stringify({
					...qs.parse(config.data),
					token: store.getters.tokens
				})
			}
			
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
			Vue.prototype.$notify({
				title: '异常',
				dangerouslyUseHTMLString: true,
				iconClass: 'el-icon-warning',
				message: '<strong>登录状态已失效</strong>',
				showClose: false
			});
			router.push('asd');
		} else if (response.data.status == 1) {
			// 1表示无返回数据
			Vue.prototype.$notify({
				title: '异常',
				dangerouslyUseHTMLString: true,
				iconClass: 'el-icon-warning',
				message: '<strong style="color:red">'+response.data.msg+'</strong>',
			});
			return false;
		}else {
			return response.data;
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
				Vue.prototype.$notify({
					title: '异常',
					dangerouslyUseHTMLString: true,
					iconClass: 'el-icon-warning',
					message: `<strong>请求地址出错: ${err.response.config.url}</strong>`,
					showClose: false
				});
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
