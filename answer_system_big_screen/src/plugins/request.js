import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs

axios.defaults.baseURL = 'http://192.168.1.100:9001';
Vue.prototype.$http = axios;

Vue.prototype.$a = function() {
	return axios.post('/stock/fastest');
}