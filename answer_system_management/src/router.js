import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import stu from './views/stu.vue'
import sch from './views/sch.vue'
import cpm from './views/cpm.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/index.html',
			component: index,
			children: [{
					path: 'student',
					name: 'student',
					component: stu,
					meta: {
						title: '学生列表'
					}
				},
				{
					path: 'school',
					name: 'school',
					component: sch,
					meta: {
						title: '学校列表'
					}
				},
				{
					path: 'session',
					name: 'session',
					component: cpm,
					meta: {
						title: '赛程列表'
					}
				}
			]
		}, {
			path: '/login',
			name: 'login',
			component: resolve => require(['./views/login.vue'], resolve),
			meta: {
				title: '登录'
			}
		},
		{
			path: "*",
			redirect: "/login"
		}
		//     {
		//       path: '/about',
		//       name: 'about',
		//       // route level code-splitting
		//       // this generates a separate chunk (about.[hash].js) for this route
		//       // which is lazy-loaded when the route is visited.
		//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		//     }
	]
})
