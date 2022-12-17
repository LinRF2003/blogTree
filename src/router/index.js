import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* 配置路由 */
const routes = [
    {
        path: '/',
        component: () => import('@/views/framework.vue'), //页面框架
        children: [
            {
                path: '/',
                component: () => import('@/views/blog/blog.vue'),
            },
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
    }
]

/* 实例化路由 */
const router = new VueRouter({
    routes,            // （简写）相当于 routes: routes
    mode: "history"    // 去掉网站里的#/ 
})

/* 导出路由模块 */
export default router