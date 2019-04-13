import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: '',
		answerNum:0,
		ws:null
	},
	mutations: {
		changeTitle(state,k){
			state.title = k;
		},
		nextAns(state){
			state.answerNum++;
		},
		initws(state,k){
			state.ws = k;
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
