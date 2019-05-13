import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Login from './views/login.vue'
import see from './views/seeStudents.vue'
import add from './views/addStuInfo.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: '登录',
			component: Login,
			meta: {
				title: '登录'
			}
		}, {
			path: '/index',
			name: '主页',
			component: Home,
			meta: {
				title: '主页'
			}
		}, {
			path: '/seeStudents',
			name: 'seeStudentsInfo',
			component: see,
			meta: {
				title: '学生信息'
			}
		},
		{
			path: '/addStuFromExcl',
			name: 'addStuFromExcl',
			component: add,
			meta: {
				title: '批量导入'
			}
		}
	]
})
