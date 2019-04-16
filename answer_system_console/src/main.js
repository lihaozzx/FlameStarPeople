import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs=qs

Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://192.168.1.100:9001';

Vue.prototype.$mso = function (data) {
	let s = {
		type:'say',
		to_client_id:"all",
		content:data
	}
	return JSON.stringify(s)
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
