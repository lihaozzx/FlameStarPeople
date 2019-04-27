import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				title: '立德树人'
			}
		},
		{
			path: '/answer',
			name: 'answer',
			component: resolve => require(['@/views/answer.vue'], resolve),
			meta: {
				title: '每日答题'
			}
		},
		{
			path: '/info',
			name: 'info',
			component: resolve => require(['@/views/info.vue'], resolve),
			meta: {
				title: '选手信息'
			}
		},
		{
			path: '/allStu',
			name: 'allstu',
			component: resolve => require(['@/views/allstu.vue'], resolve),
			meta: {
				title: '所有选手'
			}
		}
	]
})
