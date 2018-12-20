<template>
  <div class="home">
    <nav>
    <div class="header">
      <center> 材积表计算 </center>
    <!-- <div class="share-top">
    分享
    </div> -->
    </div> 
    </nav>
     <main style="height:100%">
      <div class="main-class">
    <el-row class="head-conte">
    <el-col :span="12"><div class="grid-content   vertical-flex">木材表</div></el-col>
    <el-col :span="12" >
      <div class="grid-content  vertical-flex">
      <el-dropdown @command="handleCommand" >
        <span class="el-dropdown-link ">
          添加木材<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu   slot="dropdown">  
          <el-dropdown-item v-for="( item ,key,index )  in wood "  :key="index" :disabled="item.statu"    
           :command='item.type'>{{item.type}}</el-dropdown-item>   
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      </el-col>
      </el-row>
      <div class="block height40"  > 
      <el-tree :data="data" ref="tree" :props="defaultProps" node-key="id" @node-click="handleNodeClick"> 
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span  v-show="showDelete(node.label)">  
            <el-button  type="text" size="mini" @click="() => remove(node, data)"> 删除</el-button>
          </span>
        </span> 
      </el-tree> 
    </div> 
      </div> 
    </main>
     <div class="input-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总额 ：{{clickWood.sum}} </span>  
      </div> 
      <div @click="calculations"  class="text item">
        <div v-bind:class="{ opacityfont:isOpacity[0]}" >小：<span >{{little}}</span></div>
        <div v-bind:class="{ opacityfont:isOpacity[1]}" >中：<span v-text="medium" >0</span></div>
        <div v-bind:class="{ opacityfont:isOpacity[2]}" >大：<span  v-text="big" >0</span></div>
        <div   ><span v-text="showgroup" ></span>组和：<span v-text="sum" >0.00</span>元</div> 
      </div> 
    </el-card>
     <div>
      <div class="el-input el-input-group el-input-group--prepend " >
        <div class="el-input-group__prepend">L 长度
          <span>m&nbsp; &nbsp;</span>
        </div>
        <el-input-number size="medium"   v-model="L" :precision="1" :step="0.2" :max="10"></el-input-number>
      </div>
    </div>
    <div>
      <div class="el-input el-input-group el-input-group--prepend " >
        <div class="el-input-group__prepend">D 直径
          <span>cm</span>
        </div>
        <el-input-number   size="medium"  v-model="D" :precision="2" :step="2" :max="100"></el-input-number>
      </div>
    </div>
  <div class="block margin-top10"> 数量
    <el-slider
      v-model="nubValue"
      show-input>
    </el-slider>
  </div>  
  </div>
  </div>
</template>

<script>  
export default {
  name: "Home", 
  components: {   
  },
   data(){
    return {
      data: [],
      L: 2,D:14,nubValue: 1, little:0 ,medium:0 ,big:0 ,sum:0, 
      isOpacity:[false,false,false],
      defaultProps: { children: 'children', label: 'label' },
      addId:0, //增加的树id 
      clickWood:[],//点击的数组
      showgroup:"", 
      wood:[
      {type:'杂木',statu:false,tree:{}}, //tree返回的值放入data对应的数据展示
      {type:'樟木',statu:false,tree:{}},
      {type:'苦楝木',statu:false,tree:{}},
      {type:'春芽木',statu:false,tree:{}},
      {type:'其他木',statu:false,tree:{}}
      ],
    }
  },
  //  computed:{
  //    sum:function(v1,v2){  
  //      console.log('计算属性 run ok' ,v1,v2) 
  //     //  return v1+1
  //    }
  //   },
   watch:{
      showgroup:function(newVal, oldVal){
        console.log("show:",newVal)
          // 找到了点击的树枝子节点
        let index=this.data.findIndex((value, index, arr) => {
          return value.label== this.showgroup
        });
        if(newVal!=""){ //当不等于空的时候执行
        let [branch,opacity]=[this.data[index],this.isOpacity] //木材表,输入透明度修改
        switch(branch.children.length){ // 选择 木头D类别
        case 1:opacity[0]=false; opacity[2]=true; opacity[1]=true; break;
        case 2: opacity[0]=false; opacity[1]=true;opacity[2]=false; break;
        case 3: opacity[0]=false; opacity[1]=false; opacity[2]=false;break;
        default: alert('数据异常')
        }
      } 
      //取出切换的
      let tree=this.clickWood
      this.little=tree.little;
      this.medium=tree.medium;
      this.big= tree.big
      this.sum= tree.sum
      return this.showgroup
      }
    } ,
   
  methods:{  
       /** 下拉框选择木材 */
       handleCommand(command ){ 
         console.clear() ; console.log("command",command);
         const t=this; let wood=t.wood;  
         switch(command){
          case wood[0].type: wood[0].tree=this.initWoddType(0,command);t.data.push(wood[0].tree) ;wood[0].statu=true;
          break;//杂木 initWoddType 0默认为小
          case wood[1].type: wood[1].tree=this.initWoddType(2,command);t.data.push(wood[1].tree) ;wood[1].statu=true; 
          break;//樟木              2是全部类型
          case wood[2].type: wood[2].tree=this.initWoddType(1,command);t.data.push(wood[2].tree) ;wood[2].statu=true; 
          break;//苦楝木              1是大
          default: t.$message('当前木头信息尚未收集，等待开发');
         }  
         
      },
      showDelete(v){
         let boolean=true;
        switch(v){
          case '大': boolean=!boolean;  break; 
          case '中': boolean=!boolean;  break; 
          case '小': boolean=!boolean;  break; 
        }
        return boolean;
      } ,
 
       /** 点击木材表树 返回对应点击的元素值*/
       handleNodeClick(data ,e ,vueComp ) { 
        let woodIndex=this.woodTIndex().indexOf(data.label)
        if(woodIndex>-1){
          if(vueComp.$el.parentNode.querySelectorAll('.select-wood').length>0){ 
          // 检测对应的木材类型高亮
            vueComp.$el.parentNode.querySelector('.select-wood').classList.remove("select-wood");
          }
          vueComp.$el.childNodes[0].className +=" select-wood"  
           this.showgroup=data.label; //点击的
           console.log( "handleNodeCilk",data);  
           this.clickWood=data
           
        }  
      },

      /** 运算*/
      calculations:function(){  
      if(this.showgroup==""){this.open_warn('请选择木材'); return false}  
      let typeSize=this.selectType(this.showgroup,this.D)
      let multiple=typeSize.m //判断木头种类返回的值是多少 
      let sum=+(Number(this.little+this.medium+this.big)*multiple).toFixed(3) 
      this.sum =+(this.sum+sum).toFixed(3)
      this.append(typeSize.s,typeSize.m)//添加的木材表对应节点 . 存储乘积结果
      //同步计算结果
      this.clickWood.little=+this.little; 
      this.clickWood.medium=+this.medium;
      this.clickWood.big=+this.big;
      this.clickWood.sum=+this.sum; 
      },
      /** 添加 */
      append(res,productNum) { 
        let nowLxD=String(this.L+"x"+this.D); // 当前增加的值
        let [strLable,typeSize]=["",res]//0是小，以此类推 中 大 
        let  unRepe=this.clickWood.children[typeSize].unRepe;
        if(unRepe[nowLxD]!==undefined){ 
          //  console.clear(); console.log('重复值')
           unRepe[nowLxD].num=Number(unRepe[nowLxD].num+this.nubValue) //当前根数加上原来的根数 
            let arrRepe=this.clickWood.children[typeSize].children; let oldVal=0;
           for(let i=0;i<arrRepe.length;i++){ 
             if(arrRepe[i]&&arrRepe[i].label.split(" 根")[0]==nowLxD){
                oldVal=arrRepe[i].id//保存重复出现的木头的id 使保持不变
                arrRepe.splice(i,1)  ;break; 
             }//删除重复
           }  
          strLable=`${nowLxD} 根:${unRepe[nowLxD].num} 材积:${this.valeData()} `
          let newChild ={ id:oldVal ,label:strLable  }
           console.log(newChild)
          this.clickWood.children[typeSize].children.push(newChild);
        }else{ 
          console.log('新的值newUnRepe',this.nubValue)
          unRepe[nowLxD]={ num: this.nubValue, univalence: this.valeData() } //创建一个记录重复值的对象 
          strLable=`${nowLxD} 根:${this.nubValue} 材积:${this.valeData()} `
          let newChild ={ id: this.addId++,label:strLable  }
          this.clickWood.children[typeSize].children.push(newChild);
          unRepe.type[1]=productNum;//保存类型乘积数
        }
      }, 
      /** 初始化添加木头类型 0小 2中 1大 */
      initWoddType(typeNub,woodType){
       const t=this;
       let type={id:t.addId++,label:woodType,sum:0,big:0,little:0 ,medium:0 , children: [
          {id:t.addId++,label:'小',children:[],unRepe:{type:['小',0,0]}} ]}
        //  newType={...type.children[0] }; //创建新的类型 浅拷贝这一层
       let newType=this.clone(type.children[0])
        //有中的话就执行全部 ，小是默认执行
        switch(typeNub){
          case 2:  let newTypes=this.clone(type.children[0]);newTypes.unRepe.type[0]='中'; 
          newTypes.label=newTypes.unRepe.type[0]; newTypes.id= t.addId++; type.children.push({...newTypes});

          case 1: newType.unRepe.type[0]='大'; newType.label=newType.unRepe.type[0]; newType.id= t.addId++;
           type.children.push({...newType}); break; 
        }
        console.log("type:",type)
        return type 
      },  
      /** 木头类型位置['杂木','樟木',...] */
      woodTIndex(){ let type=[]; this.wood.forEach(v => { type.push(v.type) });  return type}, 

      /** 删除 */
      remove(node, data){  
        console.log("删除",data.label);
        if(!confirm("是否删除")){  return false  }
        const parent = node.parent; //点击的上一级对象 
        let lableKey=data.label.split(' 根') 
        let deletKey=lableKey[0]
        if(lableKey[1] !== undefined){  
          let getDeletKey=parent.data.unRepe[deletKey]    //提取删除的值数据
          let [num,univalence]=[getDeletKey.num ,getDeletKey.univalence]
          let type=parent.data.unRepe.type //返回的值为木头属性材积 
          let res= +(num*univalence).toFixed(3);//type[1] ：规格大小的结果  type[0]//大小
          //删除对应的规格木头
          switch(type[0]){
            case '小':this.clickWood.little=+(this.clickWood.little-res).toFixed(3); break;
            case '大': this.clickWood.big= +(this.clickWood.big-res).toFixed(3);break;
            default: this.clickWood.medium=+(this.clickWood.medium-res).toFixed(3);break;
          }  
          console.log('删除时候当前的点击的木头总价', res)
          this.clickWood.sum=+((this.clickWood.big+this.clickWood.little+this.clickWood.medium)*type[1]).toFixed(3);   
          this.little=+(+this.clickWood.little).toFixed(3); this.big=+this.clickWood.big;
          this.medium=+this.clickWood.medium;               this.sum=+(+this.clickWood.sum).toFixed(3);
          delete parent.data.unRepe[deletKey] //删除检测重复属性 
        }else{
        this.little=0,
         this.medium=0,
         this.big=0,
         this.sum=0;
         this.showgroup=""
        }   
        
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        console.log('当前id',index)
        children.splice(index, 1);//删除展示数据属性    
       
        //当删除了木头整个组就恢复添加木材选项
        if(this.woodTIndex().indexOf(data.label)>-1){ 
          let key=this.woodTIndex().indexOf(data.label); this.wood[key].statu=false; 
         } //打开开关 

        window.event? window.event.cancelBubble = true : e.stopPropagation();//冒泡停止 防止选择handle
      },
      /**选择类型 */
      selectType(v,D){
        console.log(v,D)
        let[ m,n,s]=[0,0,0] 
        if(v=="樟木"){
          if (D >= 30){ m=1500;  n=+(this.big+this.valeData()) ; this.big=+(n.toFixed(3)) ;s=2 }
          else if (D >= 20 ){ m=1000 ;n=+(this.medium+this.valeData()) ; this.medium=+(n.toFixed(3)); s=1 }
          else {m=600 ; n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3));}
        }
        else if(v=="苦楝木"){
          if(D>=20){m=600 ;n=+(this.big+this.valeData()) ; this.big=+(n.toFixed(3));s=1}
          else {m=500;n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3))}
          
        }else{
          m=500;n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3));
        } 
        return {m,n,s}// m:判断类别材积的值
       
      },
    
      /** 计算单根材积 */
      valeData(){ return +(woodcalcu(this.L,this.D)*this.nubValue).toFixed(3);   }, 
      /** 警告添加木材*/
      open_warn(v) { this.$message({ message: v, type: 'warning' }); },
      /** 深拷贝*/
      clone(obj) { return JSON.parse(JSON.stringify(obj)); } 
  } 
};

/**重置四舍六入无成双 ，为四舍五入 */
  Number.prototype.toFixed=function (d) { 
      var s=this+""; 
      if(!d)d=0; 
      if(s.indexOf(".")==-1)s+="."; 
      s+=new Array(d+1).join("0"); 
      if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
          var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
          if(a==d+2){
              a=s.match(/\d/g); 
              if(parseInt(a[a.length-1])>4){
                  for(var i=a.length-2;i>=0;i--){
                      a[i]=parseInt(a[i])+1;
                      if(a[i]==10){
                          a[i]=0;
                          b=i!=1;
                      }else break;
                  }
              }
              s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

          }if(b)s=s.substr(1); 
          return (pm+s).replace(/\.$/,"");
      }return this+"";

  }; 
/**
 * L:长m,D:直径cm
 * _nub: 数量 
 */
  function  woodcalcu(L,D,_nub){
      let V=0; 
      if(D>4&&D<=12&&L>=2&&L<10){ 
        let dl = (D + 0.45 * L + 0.2) ** 2 ;V = 0.7854 * L * dl / 10 ** 4; 
      }
      else if(D>=14&&L>=2&&L<10){ 
        V = 0.7854 * L * [D + 0.5 * L + 0.005 * (L**2) + 0.000125 * L * ((14 - L)**2) * (D - 10)] ** 2 / 10000 
      }
      else{ V = 0.8 * L * (D + 0.5 * L) ** 2/10**4 }
      V=V.toFixed(3)//4舍5入
      return +V; 
    }
/**解决精度 */
  Math.formatFloat = function (nub, multiple) {
    let deci = nub.toString().split('.')[1].length
    let m = multiple === undefined ? deci : multiple
    m = Math.pow(10, m);//放大倍数
    // console.log(Math.round(nub * m) / m)
    return Math.round(nub * m) / m;//4舍5入
} 
</script>

<style lang="stylus">
.home 
  background: #EFF3F5;
  height :100%
.header 
  box-shadow: 0px 1px 5px #d3dce6
  height: 30px
  width: 100%
  background:#fff
  position :fixed
  top:0px
  z-index 999 
.share-top
  float :right

.select-wood
  background: #cbe9ec  !important;
.addTable-wood
  height :auto 
.main-class
  position: fixed;
  padding-top :30px;
  overflow-y:scroll;
  height:39%;
  width :100%
.custom-tree-node 
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
.head-conte 
  background: rgb(255, 255, 255); 

.opacityfont
  opacity: 0.34;
.input-box 
  position: fixed;
  bottom: 38px;
  z-index :30;
  height: 51%;
  width: 100%;
  // background-color: rgb(137, 220, 245);

.el-slider__runway
    margin-left :12px
.el-input-number--medium , .el-input__inner
    width :100% !important;
  
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.el-message{
   top: 110px;
}
</style>