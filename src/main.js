// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'babel-polyfill'
import store from './store'
import './components'
import './style/xfx.css'
import minxins from './mixin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../config/ipConf.js'
import './util/http.js'
import './util/coachViewUtil.js'
import './util/dhtmlx.js'
import './util/CV.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
minxins.forEach(item => {
  Vue.mixin(item)
})
/* eslint-disable no-new */
global.dora = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
