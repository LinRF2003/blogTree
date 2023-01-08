import Vue from 'vue';
import Vuex from 'vuex';
import requests from '@/utils/request';
Vue.use(Vuex);
//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象
const store = new Vuex.Store({
    strict: debug,//在不是生产环境下都开启严格模式
    state: {
        userInfo: {},
        term: false,// 退出登录后为true
    },
    getters: {
    },
    mutations: {

        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        logout(state, term) {
            state.term = term
        }
    },
    actions: {
        //获取当前用户信息
        async getUserInfo({ commit }) {
            let result = await requests.post('/userInfo');
            if (result.status === 200) {
                commit("GETUSERINFO", result.data.data);
            }
            // let token = window.localStorage.getItem('token') || ''
            // const userInfo = jwtDecode(token);
            // commit("GETUSERINFO", userInfo);
        },


    }
})
export default store;
