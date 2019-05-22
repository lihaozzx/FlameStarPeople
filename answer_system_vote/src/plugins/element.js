import Vue from 'vue'

import {Notification,Button,Message,Loading,Dialog} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;