<!--父组件中引入子组件-->
<template>
  <div>
    <a href="javascript:;" @click="show = true">点击</a>
    <t-dialog :show.sync="show"></t-dialog> 
      <!-- </template> -->
      
        <!-- <div v-for="(itme1,index1) in itme0"      >{{itme1.type}}</div>   -->
        <br>      
      <!-- <template v-for="(itme1,index1) in itme0"   :data=itme1>  -->
        <!-- <template  v-for="(itme2,index2) in itme1"   >{{ key2 +"-----"+itme2+"---"+index2}}</template> -->
         <!-- <template  v-for="(itme3,key3,index3) in itme0"   >{{itme3}}</template> -->
      <!-- </template> -->
    
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  data(){
    return {
      show:false,
      mytype:[{type:"杂木1",onffo:false},{type:"杂木2",onffo:true},{type:"杂木3",onffo:false},{type:"杂木4",onffo:false},{type:"杂木5",onffo:false},{type:"杂木6",onffo:false}]
    }
  },
  components:{
    "t-dialog":dialog
  },
  methods:{
      name(v) {
      return v
    }
  }
}
</script>