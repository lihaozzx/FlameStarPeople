import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import home from './views/index_child/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
			children:[{
				path: '/',
				name: 'index',
				components:{
					indes: home,
					stuInfo:resolve => require(['@/views/index_child/stuInfo.vue'], resolve),
					bank:resolve => require(['@/views/index_child/bank.vue'], resolve),
					logs:resolve => require(['@/views/index_child/logs.vue'], resolve),
				}
			}],
			meta: {
				title: '立德树人'
			}
    },
		{
			path: '/login',
			name:'login',
			component: resolve => require(['@/views/login.vue'], resolve),
			meta: {
				title: '登录'
			}
		},
		{
			path: "*",
			redirect: "/login"
		}
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
