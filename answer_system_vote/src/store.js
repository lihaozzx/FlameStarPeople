import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo:null
	},
	mutations: {
		userInfo(state,k){
			state.userInfo = k
		},
	},
	actions: {
	},
	getters: {
		token(){
			return '1'
		},
		userInfo (state){
			return state.userInfo;
		}
	}
})
