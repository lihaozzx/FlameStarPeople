import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		stuInfo: {
			stu: [],
			page: {},
		},
	},
	mutations: {
		setToken(state, k) {
			state.token = k
		},
		stu(state, k) {
			state.stuInfo = k
		},
	},
	actions: {

	},
	getters: {
		token(state) {
			return state.token
		},
		stuInfo(state) {
			return state.stuInfo
		},
	}
})
