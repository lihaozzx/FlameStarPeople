import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: '',
		answerNum:0,
		ws:null,
		message:null
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
		},
		initws(state,k){
			state.ws = k;
		},
		onMessage(state,msg){
			state.message= msg;
		}
	},
	actions: {
		send({ commit, state },d){
			state.ws.send(JSON.stringify(d))
		}
	},
	getters:{
		nowTitle(state){
			return state.title
		},
		ans(state){
			return state.answerNum
		},
		wsmg(state){
			return state.message
		}
	}
})
