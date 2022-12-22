import Vue from 'vue'
import App from './App.vue'

// 引入基础配置 base.scss
import '@/assets/base.scss'


// 引入 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
// 引入封装axios的请求
import request from "@/utils/request";
// 引入封装的message
import message from '@/utils/message'
Vue.prototype.$request = request
Vue.prototype.$message = message

import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
