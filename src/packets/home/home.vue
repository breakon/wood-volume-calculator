<template>
  <div class="home">
    <nav>
    <div class="header">
      <center>
      材积表计算
      </center>
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
          <el-dropdown-item v-for="( item ,key,index )  in woodType "  :key="index" :disabled="item.statu"     :command='item.type'>{{item.type}}</el-dropdown-item>   
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      </el-col>
      </el-row>
      <div class="block height40"  > 
      <el-tree :data="data" ref="tree" :props="defaultProps" node-key="id" @node-click="handleNodeClick"> 
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span> 
            <el-button type="text" size="mini" @click="() => remove(node, data)">
              Delete
            </el-button>
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
  <div class="block margin-top10">
      数量
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
      data: [
        // {
        //   label: '春芽木',
        //   children: [{
        //     label: '小',
        //      children: [{
        //     label: this.toStrWoodVale()
        //   }]

        //   }]
        // } 
        ],
        L: 2,D: 14,nubValue: 1,
        little:0 ,medium:0 ,big:0 ,sum:0, 
        tree:[],
        isOpacity:[false,false,false],
        defaultProps: {
          children: 'children',
          label: 'label',  
        },
        addId:0, //增加的树id
        woodType:[ {type:'杂木',statu:false},{type:'樟木',statu:true},{type:'苦楝木',statu:true},{type:'春芽木',statu:true},{type:'其他木',statu:true}],
        clickWood:[],//点击的数组
        woodT:[],
        showgroup:"", 
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
         this.little=0 ;this.medium=0 ;this.big=0 ;this.sum=0 
       return this.showgroup
      }
    } ,
  methods:{ 
       handleCommand(command ){ 
        //  下拉框选择木材
         console.clear() 
         const t=this; 
         console.log("command",command);
        let tWType=t.woodType;  
         switch(command){
          case tWType[0].type:this.data.push({id:t.addId++,label: command,sum:0,
            children: [{id:t.addId++,label:'小 L X D',children:[],big:[]} ] }) ;tWType[0].statu=true;
            break;//杂木
          case tWType[1].type:t.data.push({id:t.addId++,label: command,
            children: [{id:t.addId++,label:'小',children:[],big:["2 x 14"]},{id:t.addId++,label:'中',children:[],big:["2 x 14"]},{id:t.addId++,label:'大',children:[],big:[]}] 
            }); tWType[1].statu=true; ;break; //樟木

          case tWType[2].type:t.data.push({id:t.addId++,label: command,
            children: [{id:t.addId++,label:'小',children:[]} ,{id:t.addId++,label:'大',children:[]}] 
            })  ;tWType[2].statu=true; break;//苦楝木 
          default: t.$message('当前木头信息尚未收集，等待开发');
         }  
         
      }, 
       handleNodeClick(data ,e ,vueComp ) {
        // 点击木材表树 返回对应点击的元素值
          // console.clear()  
        console.log( "handleNodeCilk",data);  
        let woodIndex=this.woodTIndex().indexOf(data.label)
        if(woodIndex>-1){
          if(vueComp.$el.parentNode.querySelectorAll('.select-wood').length>0){ 
          // 检测对应的木材类型高亮
            vueComp.$el.parentNode.querySelector('.select-wood').classList.remove("select-wood");
          }
          vueComp.$el.childNodes[0].className +=" select-wood"  
           this.showgroup=data.label; //点击的   
           this.clickWood=data
        }  
      },

      // 运算
      calculations:function(){  
      if(this.showgroup==""){
      this.open_warn('请选择木材')
        return false
      }  
      let multiple=this.selectType(this.showgroup,this.D).m //判断木头种类返回的值是多少 
      //计算
      this.append(this.addSum(multiple))//添加的木材表对应节点
      },  
       append(res) {
        // 增加 
        // if(this.clickWood.big=){}
        let toStr;
        // console.log('append',this.clickWood.children[0])  
        let repe=String(this.L+"x"+this.D);

        console.log("repe",repe.length)
        let  repeValue=this.clickWood.children[0].big.filter(function(item){return item.only==repe })
        console.log('repeValue.length',repeValue.length)
         if(  repeValue.length>0){  
          console.log('append重复进入') 
           let arrRepe=this.clickWood.children[0].children; 
           for(let i=0;i<arrRepe.length;i++){ 
             if(arrRepe[i]&&arrRepe[i].label.split(" 根")[0]==repe){
                arrRepe.splice(i,1) //删除重复
             }
           }
             
            let nub=repeValue[0].nub+=this.nubValue 
            console.log("nub ", nub)
            let vd=
            // debugger
            console.log(vd)
            toStr=[this.L,"x",this.D," 根:", nub," 单个",this.valeData()," ￥",0] 
              
              
          }else{
             console.log('append 第一次进入')
            toStr=[this.L,"x",this.D," 根:", this.nubValue," 单个",this.valeData()," ￥",0] 
            
            this.clickWood.children[0].big.push({only:toStr[0]+toStr[1]+toStr[2],nub:this.nubValue})  
         }

          toStr[8]=(toStr[8]+(toStr[4]*(+this.valeData())*500)).toFixed(3);
          this.clickWood.sum=res
      
       let newChild ={ id: this.addId++,label:toStr.join("") }
      //  console.log( this.children[0].children)
        
        if (!this.clickWood.children[0].children) {
          this.$set(this.clickWood, 'children', []);
        }
        this.clickWood.children[0].children.push(newChild);//小中大
      }, 
      woodTIndex(){
        // 对象的位置
        let type=[];
        this.woodType.forEach(v => {
           type.push(v.type) //保存对象的位置
        });  
        return type
      }, 

      
      remove(node, data,e){  
        // 删除
        console.log("删除",data.label);
        if(this.woodTIndex().indexOf(data.label)>-1){ 
          let key=this.woodTIndex().indexOf(data.label)
          this.woodType[key].statu=false;  
        } //打开开关  
        this.showgroup="" ;this.little=0 ;this.medium=0 ;this.big=0 ;this.sum=0 
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);  
        window.event? window.event.cancelBubble = true : e.stopPropagation();
      },
      selectType(v,D){
        console.log(v,D)
        let[ m,n]=[0,0] 
        if(v=="樟木"){
          if (D >= 30){ m=1500;  n=+(this.big+this.valeData()) ; this.big=+(n.toFixed(3)) }
          else if (D >= 20 ){ m=1000 ;n=+(this.medium+this.valeData()) ; this.medium=+(n.toFixed(3))}
          else {m=600 ; n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3))}
        }
        else if(v=="苦楝木"){
          if(D>=20) {m=600 ;n=+(this.big+this.valeData()) ; this.big=+(n.toFixed(3))}
          else {m=500;n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3))}
          
        }else{
          m=500;n=+(this.little+this.valeData()) ; this.little=+(n.toFixed(3));
        } 
        return {m,n}
       
      },
      valeData(){
      //计算单价
      let _v=+(woodcalcu(this.L,this.D)*this.nubValue).toFixed(3)   //计算单价
 
      return _v//返回值
      },

      addSum:function(v){
        //运算结果
        let [multiple=1]=[+v]
        let sum=Number(this.little+this.medium+this.big)*multiple
        return this.sum=sum.toFixed(3)
      },
      open_warn(v) {
      // 警告添加木材
        this.$message({
          message: v,
          type: 'warning'
        });
      },
        
    
      
  } 
 
};

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
  //公式
 function  woodcalcu(L,D,_nub){
        let V=0; 
        if(D>4&&D<=12&&L>=2&&L<10){
            let dl = (D + 0.45 * L + 0.2) ** 2 
            V = 0.7854 * L * dl / 10 ** 4; 
        }else if(D>=14&&L>=2&&L<10){
            V = 0.7854 * L * [D + 0.5 * L + 0.005 * (L**2) + 0.000125 * L * ((14 - L)**2) * (D - 10)] ** 2 / 10000 
            
        }else{
            V = 0.8 * L * (D + 0.5 * L) ** 2/10**4
        }
        V=V.toFixed(3)//4舍5入
        return +V; 

        }
//解决精度
  Math.formatFloat = function (nub, multiple) {
    let deci = nub.toString().split('.')[1].length
    let m = multiple === undefined ? deci : multiple
    // console.log(m) 
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

</style>