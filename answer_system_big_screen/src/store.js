import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: '',
		answerNum:0
	},
	mutations: {
		changeTitle(state,k){
			state.title = k;
		},
		nextAns(state){
			state.answerNum++;
		}
	},
	actions: {

	},
	getters:{
		nowTitle(state){
			return state.title
		},
		ans(state){
			return state.answerNum
		}
	}
})
