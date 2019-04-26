import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/request.js'
import './plugins/element.js'
import common from './plugins/common'

Vue.prototype.$utils = common;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}

	// 登录验证
	let token = store.getters.tokens;
	if (to.name != 'login' && (token == '' || token == undefined)) {
		token = common.getcookie('token');
		if (token == '') {
			router.push({
				path: 'login'
			});
			if(from.name == 'login'){
				return
			}
		} else {
			store.commit('setToken', token);
		}
	}
	next()
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')