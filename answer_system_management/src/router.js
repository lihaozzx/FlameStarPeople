import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import stu from './views/stu.vue'
import sch from './views/sch.vue'
import cpm from './views/cpm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: index,
			children:[
				{
					path: '/',
          component: stu
				},
				{
					path: 'school',
				  component: sch
				},
				{
					path: 'session',
				  component: cpm
				}
			]
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
