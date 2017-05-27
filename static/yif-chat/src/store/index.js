/**
 * 初始化vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
import IO from 'socket.io-client'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import contactBook from './modules/contactBook'
import login from './modules/login'

Vue.use(Vuex)

const state = {
  title: 'yif聊天室',
  // isLogin: false,
  // userInfo: null,
  currentPage: 'contact',
  io: IO.connect('http://192.168.0.102:1234/mysocket/', {
    path: '/restapi/websocketstock'
  })
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    login,
    contactBook
  }
})
