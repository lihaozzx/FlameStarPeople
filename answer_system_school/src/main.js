import Vue from 'vue'
import App from './App.vue'
import router from './router'
import logo from '@/components/logo.vue'
import axios from 'axios'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs';


axios.defaults.baseURL = 'http://www.nzjykj.com';
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;

Vue.component('logo',logo);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
});
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
