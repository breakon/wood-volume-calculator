<template>
  <div class="home">
    <nav>
    <div class="header">
      <div class="header-top" style="">材积表计算 </div> 
    <div @click="open" class="share-top"> 关于 </div>
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
           :command='item.name'>{{item.name}}</el-dropdown-item>   
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
        <span>总额 ：{{showSum}} </span>  
      </div> 
      <div  class="text item">
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
  <el-button   @click="resetCalcula" class="bott-butt-data reset-data" type="primary">重置</el-button>
  <el-button  @click="calculations" class="bott-butt-data   submit-data" type="primary">结算</el-button>
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
      L: 1.8,D:14,nubValue: 1, little:0 ,medium:0 ,big:0 ,sum:0, 
      isOpacity:[false,false,false],
      defaultProps: { children: 'children', label: 'label' },
      addId:0, //增加的树id 
      clickWood:[],//点击的数组
      showgroup:"",
      showSum:0,
      wood:[
        // size ：从小到大
      {name:'杂木' ,statu:false,tree:{ size:[{d:-1,m:500,s:0,n:'little'}]    }}, //tree返回的值放入data对应的数据展示
      {name:'樟木' ,statu:false,tree:{ size:[{d:-1,m:600,s:0,n:'little'},{d:20,m:1000,s:1,n:'medium'},{d:30,m:1500,s:2,n:'big'}]  }},
      {name:'苦楝木',statu:false,tree:{ size:[{d:-1,m:500,s:0,n:'little'},{d:20,m:600,s:1,n:'big'}]  }},
      {name:'春芽木',statu:false,tree:{}},
      {name:'其他木',statu:false,tree:{}}
      ],
    }
  },
   
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
      //取出切换的值  
      let tree=this.clickWood
      this.little=tree.little;
      this.medium=tree.medium;
      this.big= tree.big
      this.sum= tree.sum
      return this.showgroup
      },
      sum(){ let sum1=0; this.data.forEach((v)=>{ sum1+=v.sum;});  return this.showSum=sum1.newTofixed(5); } } ,
   
  methods:{  
       /** 下拉框选择木材 */
       handleCommand(command ){ 
         console.clear() ; console.log("command",command);
         const t=this; let wood=t.wood;  let n=0,s=0;
         switch(command){
          case wood[0].name: n=0 ;     break;//杂木 initWoddType 0默认为小
          case wood[1].name: n=1 ;s=2 ;break;//樟木              2是大中小
          case wood[2].name: n=2 ;s=1 ;break; 
          break;//苦楝木              1是大
          default: t.$message('当前木头信息尚未收集，等待开发'); return false;
         }  
         wood[n].tree={...wood[n].tree,...this.initWoddType(s,command)}; t.data.push(wood[n].tree) ;wood[n].statu=!wood[n].statu;
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

      /** 运算 */
      calculations:function(){  
      if(!this.showgroup){this.open_warn('请选择木材'); return false}
      if(this.nubValue<=0){this.open_warn('至少数量为1'); this.nubValue=1; }
      // let typeSize=this.selectType(this.showgroup,this.D) //选择木头种类
      const typeSize=this.clickWood.size;
      //  判断添加尺寸类型 小 中 大 (默认是小)
      let typemMone=typeSize[0].m; //价格
      let sizeSelct=typeSize[0].n //选择 大小
      let sizeAppendTree=0 // 选择添加到的tree  
      if(typeSize[2]&&this.D>=typeSize[2].d){ 
        typemMone=typeSize[2].m; sizeSelct=typeSize[2].n;sizeAppendTree=2
        } //大 
      else if(typeSize[1]&&this.D>=typeSize[1].d){  
        typemMone=typeSize[1].m;sizeSelct=typeSize[1].n;sizeAppendTree=1
        } //中 
      
      this[sizeSelct]=(this[sizeSelct]+woodcalcu(this.L,this.D)*this.nubValue).newTofixed(3) //单算 
      
      //判断木头种类返回的值是多少 
      let [showNumType1,showNumType2,showNumType3]=[0,0,0];//选择对应尺寸乘积的价格
      if(typeSize.length==3){ [showNumType1,showNumType2,showNumType3]=[0,1,2]   } //全部
      else if(typeSize.length==2){ [showNumType1,showNumType2,showNumType3]=[0,0,1] ;} //小 大 
 
      let sum=(Number(
      this.little*typeSize[showNumType1].m
      +this.medium*typeSize[showNumType2].m
      +this.big*typeSize[showNumType3].m
      )).newTofixed(3) //总算
      this.sum =sum.newTofixed(3) 
      this.append(sizeAppendTree,typemMone)//添加的木材表对应节点 . 存储乘积结果
      
      this.$message({
          message: `填写的值为${this.L} X ${this.D} 数量为：${this.nubValue}`,
          showClose: true,
          // duration:0,
          type: 'success'
        });
      //同步计算结果 
      this.clickWood.little=this.little; 
      this.clickWood.medium=this.medium;
      this.clickWood.big=this.big;
      this.clickWood.sum=this.sum;   
      this.nubValue=1; 
      },
      /** 添加 */
      append(res,productNum) {  
        let nowLxD=String(this.L+"x"+this.D); // 当前增加的值
        let [strLable,typeSize]=["",res]//0是小，以此类推 中 大 
        let  unRepe=this.clickWood.children[typeSize].unRepe;
        if(unRepe[nowLxD]){ 
          //  console.clear(); console.log('重复值')
           unRepe[nowLxD].num=Number(unRepe[nowLxD].num+this.nubValue) //当前根数加上原来的根数 
            let arrRepe=this.clickWood.children[typeSize].children; let oldVal=0;
           for(let i=0;i<arrRepe.length;i++){ 
             if(arrRepe[i]&&arrRepe[i].label.split(" 根")[0]==nowLxD){
                oldVal=arrRepe[i].id//保存重复出现的木头的id 使保持不变
                arrRepe.splice(i,1)  ;break; 
             }//删除重复
           }  
          strLable=`${nowLxD} 根:${unRepe[nowLxD].num} 材积:${unRepe[nowLxD].univalence} `
          let newChild ={ id:oldVal ,label:strLable  }
           console.log(newChild)
          this.clickWood.children[typeSize].children.push(newChild);
        }else{ 
          console.log('新的值newUnRepe',this.nubValue)
          unRepe[nowLxD]={ num: this.nubValue, univalence:woodcalcu(this.L,this.D) } //创建一个记录重复值的对象 
          strLable=`${nowLxD} 根:${unRepe[nowLxD].num} 材积:${unRepe[nowLxD].univalence} `
          let newChild ={ id: this.addId++,label:strLable  }
          unRepe.type[1]=productNum;//保存类型乘积数  
          this.clickWood.children[typeSize].children.push(newChild);
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
          case 2:  let newTypes=this.clone(type.children[0]);newTypes.unRepe.type[0]='中';newTypes.unRepe.type[2]=1; 
          newTypes.label=newTypes.unRepe.type[0]; newTypes.id= t.addId++; type.children.push({...newTypes}); 
          case 1: newType.unRepe.type[0]='大';newType.unRepe.type[2]=2; newType.label=newType.unRepe.type[0]; newType.id= t.addId++;
           type.children.push({...newType}); break; 
        }
        console.log("type:",type)
        return type 
      },  
      /** 木头类型位置['杂木','樟木',...] */
      woodTIndex(){ let type=[]; this.wood.forEach(v => { type.push(v.name) });  return type}, 

      /** 删除 */
      remove(node, data){   

        let bool=this.clickWood.children.findIndex(v=>{ return v.id==node.parent.data.id}) 
         bool=this.clickWood.id===data.id? 1:bool //验证是否是同一木头
        if(!confirm("是否删除")|| bool<0){ 
         if( bool<0) { 
         this.open_warn('只能选择删除当前选择木头，请选择后再操作');
          }
         window.event? window.event.cancelBubble = true : e.stopPropagation();//冒泡停止 防止选择handle
         return false 
          }  
        const parent = node.parent; //点击的上一级对象 
        let lableKey=data.label.split(' 根') 
        let deletKey=lableKey[0]  
        if(lableKey[1]){  
          let getDeletKey=parent.data.unRepe[deletKey]    //提取删除的值数据
          let [num,univalence]=[getDeletKey.num ,getDeletKey.univalence]
          let type=parent.data.unRepe.type //返回的值为木头属性材积 
          let res= (num*univalence).newTofixed(3);//type[1] ：规格大小的结果  type[0]//大小 type[1] //价格
       
          //删除对应的规格木头
          let slectTypeShow=""
          switch(type[2]){
            case 0:slectTypeShow="little";  break;//小
            case 2:slectTypeShow="big";  break;//大
            default: slectTypeShow="medium" ;break;
          }   
        
          this.clickWood[slectTypeShow]=(this.clickWood[slectTypeShow]-res).newTofixed(3); 
          console.log('删除时候当前的点击的木头总价', res)
          console.log("type[1]",type[1])
          this.little=this.clickWood.little.newTofixed(3); 
          this.big=this.clickWood.big.newTofixed(3);
          this.medium=this.clickWood.medium.newTofixed(3); 
          let [showNumType1,showNumType2,showNumType3]=[0,0,0];
          if(this.clickWood.size.length==3){ [showNumType1,showNumType2,showNumType3]=[0,1,2]   } //全部
          else if(this.clickWood.size.length==2){ [showNumType1,showNumType2,showNumType3]=[0,0,1] } //小 大 
          this.clickWood.sum=(
           this.clickWood.little*this.clickWood.size[showNumType1].m
          +this.clickWood.medium*this.clickWood.size[showNumType2].m
          +this.clickWood.big*this.clickWood.size[showNumType3].m
          ).newTofixed(3);   
          console.log(this.clickWood.sum)  
          this.sum=this.clickWood.sum;  
          delete parent.data.unRepe[deletKey] //删除检测重复属性  
        }else{ 
          
        this.little=0, this.medium=0, this.big=0, this.sum=0; this.showgroup=""
        }    
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id); 
        children.splice(index, 1);//删除展示数据属性     
      //  debugger
        //当删除了木头整个组就恢复添加木材选项
        if(this.woodTIndex().indexOf(data.label)>-1){ 
          let key=this.woodTIndex().indexOf(data.label); this.wood[key].statu=false; 
         } //打开开关 
        window.event? window.event.cancelBubble = true : e.stopPropagation();//冒泡停止 防止选择handle
      }, 
      resetCalcula(){
         if(!confirm("是否清空")){ return false }
         this.data=[]
        this.showgroup=""
        for(let w of this.wood){ w.statu=false }
      },
       open() {
        this.$alert(`  本软件是开源，使用方法很简单，添加木材后，
        选择目录树进行切换木材，如果觉得有bug或者建议可以联系我。联系方式：djl@breakon.top`, '关于', {
          confirmButtonText: '关闭',
        
        });
      },
      /** 警告添加木材*/
      open_warn(v) { this.$message({ message: v,  showClose: true, type: 'warning' }); },
      /** 深拷贝*/
      clone(obj) { return JSON.parse(JSON.stringify(obj)); } 
  } 
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
      V=V.newTofixed(3)//4舍5入
      return +V; 
    }
/** 解决精度 */
  Number.prototype.newTofixed = function (n) { 
    // arguments[0]
    if(!n ||this.toString().split('.').length===1) {return this.valueOf() }//为空就返回值本身
    else {
      let deci = this.toString().split('.')[1].length 
      let m = n||deci
      deci= Math.pow(10, m);//放大倍数 
      return Math.round(this * deci) /deci;//4舍5入 
    } 
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
  position: fixed;
  top: 5px;
  right: 5px
  font-size: 14px;
.el-card__body
  padding:10px 10px 10px 15px
.el-card__header
  padding: 4px 20px

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
  
.row-bg 
  padding: 10px 0;
  background-color: #f9fafc;
  
.el-message
  top:0px;
  height: 30px;

.header-top
  margin: auto;
  width: 100%;
  text-align: center;
  line-height: 1.9;

.bott-butt-data
  width:30%; 
.reset-data
  backgound:#51b1c7;
  float:left
  margin-left:10px
.el-button--primary 
  background:#d0a759
.submit-data
  float:right
  margin-right :10px;
  background:#36c189
.el-message-box
  width:95%;
</style>