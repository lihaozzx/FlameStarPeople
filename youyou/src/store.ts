import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		token:''
  },
  mutations: {
		
  },
  actions: {
		
  },
	getters:{
		tokens(state){
			if(state.token == ''){
				router.push({name:'login'});
			}
			return state.token;
		}
	}
});
