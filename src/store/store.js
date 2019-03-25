import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultCity = '上海'
try {
    if (localStorage.city) {
        defaultCity = localStorage.city
    }
} catch (e) {}

const types = {
    SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED', // 是否认证通过
    SET_USER: 'SET_USER', // 用户信息
    SET_SPEC_INFO:'SET_SPEC_INFO', //商品规格弹窗
    SET_ALL_GOODS:'SET_ALL_GOODS',//存储所有商品
    CLEAR_SPEC_INFO:'CLEAR_SPEC_INFO', //清除商品规格信息
    CHANGE_CITY:'CHANGE_CITY'
}

const state = { // 需要维护的状态
    isAuthenticated: false,// 是否认证
    user: {}, // 存储用户信息
    specInfo:{},
    allGoods:{},
    city:defaultCity
}
const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    allGoods:state=>state.allGoods,
    specInfo:state=>state.specInfo,
    city:state=>state.city
}
const mutations = {
    [types.SET_IS_AUTHENTICATED](state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated ? isAuthenticated : false;
        // if(isAuthenticated){
        //   state.isAuthenticated=isAuthenticated
        // }else{
        //   state.isAuthenticated=false
        // }
    },
    [types.SET_USER](state, user) {
        state.user = user ? user : {}
    },
    [types.SET_SPEC_INFO](state,specInfo){
        state.specInfo=specInfo?specInfo:{}
    },
    [types.SET_ALL_GOODS](state,allGoods){
        state.allGoods=allGoods?allGoods:{}
    },
    [types.CLEAR_SPEC_INFO](state){
        state.specInfo={}
    },
    [types.CHANGE_CITY] (state, city) {
        state.city = city
        try {
            localStorage.city = city
        } catch (e) {}
    }
}
const actions = {
    setIsAuthenticated:({commit},isAuthenticated)=>{
        commit(types.SET_IS_AUTHENTICATED,isAuthenticated)
    },
    setUser:({commit},user)=>{
        commit(types.SET_USER,user)
    },
    clearCurrentState:({commit})=>{
        commit(types.SET_IS_AUTHENTICATED,false)
        commit(types.SET_USER,null)
    },
    setAllGoods:({commit},allGoods)=>{
        commit(types.SET_ALL_GOODS,allGoods)
    },
    setSpecInfo:({commit},specInfo)=>{
        commit(types.SET_SPEC_INFO,specInfo)
    },
    clearSpecInfo:({commit})=>{
        commit(types.CLEAR_SPEC_INFO)
    },
      changeCity ({commit}, city) {
        commit(types.CHANGE_CITY, city)
      }

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
