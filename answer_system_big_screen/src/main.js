import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import juanzhou from '@/components/juanzhou.vue'
import axios from 'axios'

Vue.component('jz', juanzhou);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		store.commit('changeTitle', to.meta.title);
		document.title = to.meta.title;
	}
	next()
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
