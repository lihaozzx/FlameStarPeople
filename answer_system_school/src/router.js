import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Index from './views/index.vue'
import Home from './views/home.vue'
import Download from './views/download.vue'

Vue.use(Router)
Router.prototype.goBack = function () { 
　　this.isBack = true;
　　window.history.go(-1);
}
export default new Router({
	routes: [{
			path: '/',
			name: '赛程赛制',
			component: Index,
			meta: {
				title: '赛程赛制'
			}
		},
		{
			path: '/login',
			name: '学校登录',
			component: Login,
			meta: {
				title: '学校登录'
			}
		},
		{
			path: '/home',
			name: '主页',
			component: Home,
			meta: {
				title: '主页'
			}
		},
		{
			path: '/download',
			name: '下载',
			component: Download,
			meta: {
				title: '下载题库'
			}
		}
	]
})
