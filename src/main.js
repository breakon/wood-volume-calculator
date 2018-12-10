// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from './router'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/element-ui/lib/theme-chalk/index.css'	 
import './assets/global-style.css'//初始css样式
import store from './store'

Vue.use(ElementUI);
Vue.use(Vuex)
Vue.config.productionTip = false

 
   
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, 
  components: { App },
  template: '<App/>'
})

