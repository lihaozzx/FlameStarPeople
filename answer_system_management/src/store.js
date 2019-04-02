import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
	},
	mutations: {
		setToken(state,k){
			state.token = k
		}
	},
	actions: {

	},
	getters:{
		token(state){
			return state.token
		}
	}
})
