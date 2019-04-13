import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs=qs

axios.defaults.baseURL = 'http://192.168.1.100:9001';
Vue.prototype.$http = axios;

Vue.prototype.$a = axios.get('/stock/fastest')
Vue.prototype.$b = axios.get('/stock/maxScore')
Vue.prototype.$c = axios.get('/stock/rightOrwrong')
Vue.prototype.$d = axios.get('/stock/players')
Vue.prototype.$e = axios.get('/stock/BenTopic')