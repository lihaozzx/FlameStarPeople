import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			component: () => import( /* webpackChunkName: "index" */ '@/views/Index.vue'),
			children: [{
				path: '/',
				name: 'index',
				components: {
					indes: () => import( /* webpackChunkName: "index_child_home" */ '@/views/index_child/home.vue'),
					role_list: () => import( /* webpackChunkName: "index_child_role_list" */ '@/views/index_child/manage/Role.vue'),
					admin_list:()=> import( /* webpackChunkName: "index_child_admin_list" */ '@/views/index_child/manage/Admin.vue'),
					user_list:()=> import( /* webpackChunkName: "index_child_user_list" */ '@/views/index_child/member/User.vue'),
					// stuInfo: resolve => require(['@/views/index_child/stuInfo.vue'], resolve),
					// bank: resolve => require(['@/views/index_child/bank.vue'], resolve),
					// logs: resolve => require(['@/views/index_child/logs.vue'], resolve),
					// letter: resolve => require(['@/views/index_child/letter.vue'], resolve),
				}
			}],
			meta: {
				title: '侑侑商城后台管理'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "Login" */ '@/views/Login.vue')
		},
	],
});