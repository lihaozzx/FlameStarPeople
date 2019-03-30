import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				title: '选手到位情况'
			}
		},
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
