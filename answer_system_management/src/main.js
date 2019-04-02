import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.1.100:9001';
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

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
