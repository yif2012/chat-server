// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import './styles/reset.css'
import './styles/public.css'
import './styles/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(mintUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
