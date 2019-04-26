import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		token:''
  },
  mutations: {
		setToken(state,k){
			state.token = k;
		},
		initToken(state){
			state.token = '';
		}
  },
  actions: {
  },
	getters: {
		tokens(state){
			return state.token;
		}
	}
})
