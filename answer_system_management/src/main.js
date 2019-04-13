import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer)
Vue.prototype.$rurl='http://192.168.1.100:9001'
axios.defaults.baseURL = 'http://192.168.1.100:9001';
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	let a = config.url.split('/');
	if(a[a.length-1]!='login'){
		config.params = {
			...config.params,
			token:store.getters.token
		}
	}
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
	if(response.data.status>=1000){
		router.push('asd');
	}else{
		return response;
	}
   
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

Vue.prototype.$outInfo=function (obj) {
	let str = '';
	for (let k in obj) {
		str += '&'+k+'='+obj[k]
	}
	return str;
}

function getcookie(cname) {
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
}

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	
	let token = store.getters.token;
	if (to.path != '/login' && token == '') {
		token = getcookie('token');
		if(token == ''){
			router.push({
				path: 'login'
			});
		}else{
			store.commit('setToken',token);
		}
	}
	next()
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
