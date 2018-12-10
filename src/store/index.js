import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

 
export default new Vuex.Store({
     state:{
       woodtype:'',
       tree:[],
       id:-1
      //  treeLable:'',
     },
     actions:{
       changeGroup(ctx,treeLable){
         ctx.commit('changetreeLable',treeLable) 
       } 
     },
     mutations:{
      changetreeLable(state,treeLable){
        state.tree=treeLable
        state.woodtype=treeLable.label //拿到点击的内容
      }, 
     }

})