import Vue from 'vue';
import store from '../store';
import router from '../router';
import axios, { AxiosInstance } from 'axios';
import $qs from 'qs';

let request = axios.create();

let url = process.env.NODE_ENV === 'development' ? '/test' : 'http://uu.scyouyou.com/admin.php'
request.defaults.baseURL = url;
request.defaults.timeout = 30000;
request.defaults.headers.common['TOKEN'] = store.getters.tokens;

request.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	if (response.status == 200) {
		if (response.data.status == 401) {
			// 1000表示token失效，重新登录
			Vue.prototype.$notify({
				title: '异常',
				dangerouslyUseHTMLString: true,
				iconClass: 'el-icon-warning',
				message: '<strong>登录状态已失效</strong>',
				showClose: false
			});
			router.push('login');
		} else {
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

declare module 'Vue/types/vue' {
	interface Vue {
	  $http: AxiosInstance
	}
}
export const http = request;

function err(params:string) {
	Vue.prototype.$notify({
		title: '异常',
		dangerouslyUseHTMLString: true,
		iconClass: 'el-icon-warning',
		message: '<strong style="color:red">'+params+'</strong>',
	});
}

export function getAuth():Promise<any>{
	return new Promise((resolve,reject)=>{
		request.post('/main/get_auth').then((res:any)=>{
			if(res.code === 200){
				resolve(res);
			}else{
				err(res.msg);
				reject(res);
			}
		})
	})
}
export function login(data={}){
	return new Promise((resolve,reject)=>{
		request.post('/main/login',$qs.stringify(data)).then((res:any)=>{
			if(res.code === 200){
				resolve(res);
			}else{
				err(res.msg);
				reject(res);
			}
		})
	})
}
export function roleList(data={}){
	return new Promise((resolve,reject)=>{
		request.post('/admin/role_list',$qs.stringify(data)).then((res:any)=>{
			if(res.code === 200){
				resolve(res);
			}else{
				err(res.msg);
				reject(res);
			}
		})
	})
}
export function logout(data={}){
	return new Promise((resolve,reject)=>{
		request.post('/main/out_login',$qs.stringify(data)).then((res:any)=>{
			if(res.code === 200){
				resolve(res);
			}else{
				err(res.msg);
				reject(res);
			}
		})
	})
}