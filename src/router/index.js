import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/packets/home/home'
import test from '@/packets/test/test'
Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/test',
      name: 'test',
      component: test
    },]
})
