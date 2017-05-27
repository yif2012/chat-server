import Vue from 'vue'
import Router from 'vue-router'
// 代码分块语法 (路由懒加载 -- 访问到该页面才会加载相应代码)
const index = resolve => require(['../views/index'], resolve)
// 聊天室组件
const chat = resolve => require(['../views/chat'], resolve)
// 我的组件
const me = resolve => require(['../views/account'], resolve)
const edit = resolve => require(['../views/account'], resolve)

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    redirect: { name: 'chat' },
    component: chat
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
      path: 'chat',
      name: 'chat',
      component: chat
    },
    {
      path: 'me',
      name: 'me',
      component: me,
      children: [{
        path: 'edit',
        name: 'edit',
        component: edit
      }]
    }]
  }]
})
