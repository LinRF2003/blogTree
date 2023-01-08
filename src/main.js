import Vue from 'vue'
import App from './App.vue'

// 引入基础配置 base.scss
import '@/assets/base.scss'
import "@/assets/icon/iconfont.css"


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
// 引入vuex
import store from '@/store/index';

// 引入上传头像的全局组件
import Upload from '@/components/Upload';
// 引入博客列表item
import BlogItem from '@/components/BlogItem'
// 引入富文本编辑器
import TextEditor from "@/components/TextEditor";
// 引入markdown编辑器
import EditorMarkdown from "@/components/EditorMarkdown";
// 引入分页器组件
import Pagination from '@/components/Pagination'
// 引入没有数据时显示的空空如也
import Null from '@/components/Null'

Vue.component('Upload', Upload)
Vue.component('BlogItem', BlogItem)
Vue.component('TextEditor', TextEditor)
Vue.component('EditorMarkdown', EditorMarkdown)
Vue.component('Pagination', Pagination)
Vue.component('Null', Null)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
