import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: ''
	},
	mutations: {
		changeTitle(state,k){
			state.title = k;
		}
	},
	actions: {

	},
	getters:{
		nowTitle(state){
			return state.title
		}
	}
})
