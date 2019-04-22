import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import answer from './views/answer.vue'
import info from './views/info.vue'


Vue.use(Router);

export default new Router({
	routes: [{
			path: '/asd',
			name: 'index',
			component: index,
			meta: {
				title: '立德树人'
			}
		},
		{
			path: '/qwe',
			name: 'answer',
			component: answer,
			meta: {
				title: '每日答题'
			}
		},
		{
			path: '/',
			name: 'info',
			component: info,
			meta: {
				title: '选手信息'
			}
		}
		//     {
		//       path: '/about',
		//       name: 'about',
		//       // route level code-splitting
		//       // this generates a separate chunk (about.[hash].js) for this route
		//       // which is lazy-loaded when the route is visited.
		//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// 			 component:resolve => require(['@/views/layout/App.vue'], resolve)
		//     }
	]
})
