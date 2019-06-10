import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		token: ''
	},
	mutations: {
		setToken(state, k) {
			Vue.prototype.$utils.setCookie('token', k, 999)
			state.token = k
		}
	},
	actions: {

	},
	getters: {
		tokens(state) {
			if (state.token == '') {
				let token= Vue.prototype.$utils.getcookie('token');
				if (token == '') {
					router.push({
						name: 'login'
					});
				} else {
					Vue.prototype.$utils.setCookie('token', token, 999);
					state.token = token;
				}
			}
			return state.token;
		}
	}
})
