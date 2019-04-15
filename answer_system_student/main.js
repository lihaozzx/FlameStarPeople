import Vue from 'vue'
import qs from 'qs'
import App from './App'

Vue.prototype.$qs = qs
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
