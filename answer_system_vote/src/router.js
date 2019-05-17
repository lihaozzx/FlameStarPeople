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
				title: '国学文化交流大使评选活动'
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
		},
		{
			path: '/writeLetter',
			name: 'writeLetter',
			component: resolve => require(['@/views/writeLetter.vue'], resolve),
			meta: {
				title: '书写家书'
			}
		},
		{
			path: '/goodLetter',
			name: 'goodLetter',
			component: resolve => require(['@/views/goodLetter.vue'], resolve),
			meta: {
				title: '优秀家书'
			}
		}
	]
})
