import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'
import utils from './plugins/common'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: ''
	},
	mutations: {
		setToken(state, k: string) {
			new utils().setCookie('token', k, 999)
			state.token = k
		}
	},
	actions: {

	},
	getters: {
		tokens(state) {
			if (state.token == '') {
				let token: string = new utils().getcookie('token');
				if (token == '') {
					router.push({
						name: 'login'
					});
				} else {
					new utils().setCookie('token', token, 999);
					state.token = token;
				}
			}
			return state.token;
		}
	}
});