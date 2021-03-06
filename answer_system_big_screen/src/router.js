import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import info from './views/answerInfo.vue'
import paimin from './views/paimin.vue'
import answer from './views/answer.vue'
import play from './views/playVideo.vue'
import correctRate from './views/zhenquelv.vue'
import tupian from './views/tupian.vue'

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				title: '选手到位情况'
			}
		},
		{
			path: '/info',
			name: 'info',
			component: info,
			meta: {
				title: '本题答对前三名'
			}
		},
		{
			path: '/Ranking',
			name: 'Ranking',
			component: paimin,
			meta: {
				title: '选手排名情况'
			}
		},
		{
			path: '/answer',
			name: 'answer',
			component: answer
		},
		{
			path: '/play',
			name: 'play',
			component: play,
			meta: {
				title: '准备'
			}
		},
		{
			path: '/asdf',
			name: 'zhenquelv',
			component: correctRate,
			meta: {
				title: '本题正确率'
			}
		},
		{
			path: '/rule',
			name: 'rule',
			component: tupian,
			meta: {
				title: '规则'
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
