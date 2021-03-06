import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		title: '',
		answerNum: 0,
		ws: null,
		message: null,
		si: [],
		showans:false,
		topic: {
			name: '无',
			xuanx: []
		},
		time:0,
		timeIn:null
	},
	mutations: {
		changeTitle(state, k) {
			state.title = k;
		},
		initAns(state) {
			state.answerNum = 0
		},
		nextAns(state,k) {
			if(k){
				state.answerNum=k;
			}else{
				state.answerNum++;
			}
		},
		initws(state, k) {
			state.ws = k;
		},
		initws(state, k) {
			state.ws = k;
		},
		onMessage(state, msg) {
			state.message = msg;
		},
		saveStuinfo(state, k) {
			state.si = k;
		},
		initStuinfo(state) {
			state.si = [];
		},
		saveTopic(state, k) {
			state.topic = k;
		},
		initTopic(state) {
			state.topic = {
				name: '无',
				xuanx: []
			}
		},
		showans(state){
			state.showans = true;
		},
		showansno(state){
			state.showans = false;
		},
		startDao(state){
			state.time = 25;
			if(state.timeIn!=null){
				clearInterval(state.timeIn);
			}
			state.timeIn = setInterval(()=>{
				if(state.time <= 0){
					clearInterval(state.timeIn);
				}else{
					state.time--;
				}
			},1000)
		}
	},
	actions: {
		send({
			commit,
			state
		}, d) {
			state.ws.send(JSON.stringify(d))
		}
	},
	getters: {
		nowTitle(state) {
			return state.title
		},
		ans(state) {
			return state.answerNum
		},
		wsmg(state) {
			return state.message
		},
		stuinfo(state) {
			return state.si;
		},
		topic(state) {
			return state.topic;
		},
		showans(state){
			return state.showans;
		},
		daojishi(state){
			return state.time;
		}
	}
})
