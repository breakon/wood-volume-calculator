webpackJsonp([1],{NHnr:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s("7+uW"),o={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("el-dialog",{attrs:{visible:t.$store.state.show},on:{"update:visible":function(e){t.$set(t.$store.state,"show",e)}}})},staticRenderFns:[]},a={data:function(){return{show:!1,mytype:[{type:"杂木1",onffo:!1},{type:"杂木2",onffo:!0},{type:"杂木3",onffo:!1},{type:"杂木4",onffo:!1},{type:"杂木5",onffo:!1},{type:"杂木6",onffo:!1}]}},components:{"t-dialog":s("VU/8")({},o,!1,null,null,null).exports},methods:{name:function(t){return t}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("t-dialog",{attrs:{show:t.show},on:{"update:show":function(e){t.show=e}}}),t._v(" "),i("br")],1)},staticRenderFns:[]},r=s("VU/8")(a,l,!1,null,null,null).exports,d={name:"App",components:{Test:r}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view"),t._v(" "),i("div",{staticClass:"bott-nav"},[i("el-row",[i("el-col",{attrs:{span:6}},[i("div",{staticClass:"grid-content vertical-flex nav-lins-color"},[t._v("计算")])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("div",{staticClass:"grid-content vertical-flex"},[t._v("材积表")])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("div",{staticClass:"grid-content vertical-flex"},[t._v("关于产品")])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("div",{staticClass:"grid-content vertical-flex"},[t._v("个人服务")])])],1)],1)],1)},staticRenderFns:[]};var u=s("VU/8")(d,c,!1,function(t){s("VFhj")},null,null).exports,h=s("zL8q"),p=s.n(h),v=s("/ocq"),m=s("mvHQ"),f=s.n(m),b=s("Dd8w"),g=s.n(b),w={name:"Home",components:{},data:function(){return{data:[],L:2,D:14,nubValue:1,little:0,medium:0,big:0,sum:0,isOpacity:[!1,!1,!1],defaultProps:{children:"children",label:"label"},addId:0,clickWood:[],showgroup:"",wood:[{type:"杂木",statu:!1,tree:{}},{type:"樟木",statu:!1,tree:{}},{type:"苦楝木",statu:!1,tree:{}},{type:"春芽木",statu:!1,tree:{}},{type:"其他木",statu:!1,tree:{}}]}},watch:{showgroup:function(t,e){var i=this;console.log("show:",t);var s=this.data.findIndex(function(t,e,s){return t.label==i.showgroup});if(""!=t){var n=[this.data[s],this.isOpacity],o=n[1];switch(n[0].children.length){case 1:o[0]=!1,o[2]=!0,o[1]=!0;break;case 2:o[0]=!1,o[1]=!0,o[2]=!1;break;case 3:o[0]=!1,o[1]=!1,o[2]=!1;break;default:alert("数据异常")}}var a=this.clickWood;return this.little=a.little,this.medium=a.medium,this.big=a.big,this.sum=a.sum,this.showgroup}},methods:{handleCommand:function(t){console.clear(),console.log("command",t);var e=this,i=e.wood;switch(t){case i[0].type:i[0].tree=this.initWoddType(0,t),e.data.push(i[0].tree),i[0].statu=!0;break;case i[1].type:i[1].tree=this.initWoddType(2,t),e.data.push(i[1].tree),i[1].statu=!0;break;case i[2].type:i[2].tree=this.initWoddType(1,t),e.data.push(i[2].tree),i[2].statu=!0;break;default:e.$message("当前木头信息尚未收集，等待开发")}},showDelete:function(t){var e=!0;switch(t){case"大":case"中":case"小":e=!e}return e},handleNodeClick:function(t,e,i){this.woodTIndex().indexOf(t.label)>-1&&(i.$el.parentNode.querySelectorAll(".select-wood").length>0&&i.$el.parentNode.querySelector(".select-wood").classList.remove("select-wood"),i.$el.childNodes[0].className+=" select-wood",this.showgroup=t.label,console.log("handleNodeCilk",t),this.clickWood=t)},calculations:function(){if(""==this.showgroup)return this.open_warn("请选择木材"),!1;var t=this.selectType(this.showgroup,this.D),e=t.m,i=+(Number(this.little+this.medium+this.big)*e).toFixed(3);this.sum=+(this.sum+i).toFixed(3),this.append(t.s,t.m),this.clickWood.little=+this.little,this.clickWood.medium=+this.medium,this.clickWood.big=+this.big,this.clickWood.sum=+this.sum},append:function(t,e){var i=String(this.L+"x"+this.D),s="",n=t,o=this.clickWood.children[n].unRepe;if(void 0!==o[i]){o[i].num=Number(o[i].num+this.nubValue);for(var a=this.clickWood.children[n].children,l=0,r=0;r<a.length;r++)if(a[r]&&a[r].label.split(" 根")[0]==i){l=a[r].id,a.splice(r,1);break}var d={id:l,label:s=i+" 根:"+o[i].num+" 材积:"+this.valeData()+" "};console.log(d),this.clickWood.children[n].children.push(d)}else{console.log("新的值newUnRepe",this.nubValue),o[i]={num:this.nubValue,univalence:this.valeData()},s=i+" 根:"+this.nubValue+" 材积:"+this.valeData()+" ";var c={id:this.addId++,label:s};this.clickWood.children[n].children.push(c),o.type[1]=e}},initWoddType:function(t,e){var i=this,s={id:i.addId++,label:e,sum:0,big:0,little:0,medium:0,children:[{id:i.addId++,label:"小",children:[],unRepe:{type:["小",0,0]}}]},n=this.clone(s.children[0]);switch(t){case 2:var o=this.clone(s.children[0]);o.unRepe.type[0]="中",o.label=o.unRepe.type[0],o.id=i.addId++,s.children.push(g()({},o));case 1:n.unRepe.type[0]="大",n.label=n.unRepe.type[0],n.id=i.addId++,s.children.push(g()({},n))}return console.log("type:",s),s},woodTIndex:function(){var t=[];return this.wood.forEach(function(e){t.push(e.type)}),t},remove:function(t,i){if(console.log("删除",i.label),!confirm("是否删除"))return!1;var s=t.parent,n=i.label.split(" 根"),o=n[0];if(void 0!==n[1]){var a=s.data.unRepe[o],l=[a.num,a.univalence],r=l[0],d=l[1],c=s.data.unRepe.type,u=+(r*d).toFixed(3);switch(c[0]){case"小":this.clickWood.little=+(this.clickWood.little-u).toFixed(3);break;case"大":this.clickWood.big=+(this.clickWood.big-u).toFixed(3);break;default:this.clickWood.medium=+(this.clickWood.medium-u).toFixed(3)}console.log("删除时候当前的点击的木头总价",u),this.clickWood.sum=+((this.clickWood.big+this.clickWood.little+this.clickWood.medium)*c[1]).toFixed(3),this.little=+(+this.clickWood.little).toFixed(3),this.big=+this.clickWood.big,this.medium=+this.clickWood.medium,this.sum=+(+this.clickWood.sum).toFixed(3),delete s.data.unRepe[o]}else this.little=0,this.medium=0,this.big=0,this.sum=0,this.showgroup="";var h=s.data.children||s.data,p=h.findIndex(function(t){return t.id===i.id});if(console.log("当前id",p),h.splice(p,1),this.woodTIndex().indexOf(i.label)>-1){var v=this.woodTIndex().indexOf(i.label);this.wood[v].statu=!1}window.event?window.event.cancelBubble=!0:e.stopPropagation()},selectType:function(t,e){console.log(t,e);var i=0,s=0,n=0;return"樟木"==t?e>=30?(i=1500,s=+(this.big+this.valeData()),this.big=+s.toFixed(3),n=2):e>=20?(i=1e3,s=+(this.medium+this.valeData()),this.medium=+s.toFixed(3),n=1):(i=600,s=+(this.little+this.valeData()),this.little=+s.toFixed(3)):"苦楝木"==t&&e>=20?(i=600,s=+(this.big+this.valeData()),this.big=+s.toFixed(3),n=1):(i=500,s=+(this.little+this.valeData()),this.little=+s.toFixed(3)),{m:i,n:s,s:n}},valeData:function(){return+(function(t,e,i){var s=0;if(e>4&&e<=12&&t>=2&&t<10){var n=Math.pow(e+.45*t+.2,2);s=.7854*t*n/Math.pow(10,4)}else s=e>=14&&t>=2&&t<10?.7854*t*Math.pow([e+.5*t+.005*Math.pow(t,2)+125e-6*t*Math.pow(14-t,2)*(e-10)],2)/1e4:.8*t*Math.pow(e+.5*t,2)/Math.pow(10,4);return+(s=s.toFixed(3))}(this.L,this.D)*this.nubValue).toFixed(3)},open_warn:function(t){this.$message({message:t,type:"warning"})},clone:function(t){return JSON.parse(f()(t))}}};Number.prototype.toFixed=function(t){var e=this+"";if(t||(t=0),-1==e.indexOf(".")&&(e+="."),e+=new Array(t+1).join("0"),new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(t+1)+"})?)\\d*$").test(e)){e="0"+RegExp.$2;var i=RegExp.$1,s=RegExp.$3.length,n=!0;if(s==t+2){if(s=e.match(/\d/g),parseInt(s[s.length-1])>4)for(var o=s.length-2;o>=0&&(s[o]=parseInt(s[o])+1,10==s[o]);o--)s[o]=0,n=1!=o;e=s.join("").replace(new RegExp("(\\d+)(\\d{"+t+"})\\d$"),"$1.$2")}return n&&(e=e.substr(1)),(i+e).replace(/\.$/,"")}return this+""},Math.formatFloat=function(t,e){var i=t.toString().split(".")[1].length,s=void 0===e?i:e;return s=Math.pow(10,s),Math.round(t*s)/s};var _={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("nav",[i("div",{staticClass:"header"},[i("center",[t._v(" 材积表计算 ")])],1)]),t._v(" "),i("main",{staticStyle:{height:"100%"}},[i("div",{staticClass:"main-class"},[i("el-row",{staticClass:"head-conte"},[i("el-col",{attrs:{span:12}},[i("div",{staticClass:"grid-content   vertical-flex"},[t._v("木材表")])]),t._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"grid-content  vertical-flex"},[i("el-dropdown",{on:{command:t.handleCommand}},[i("span",{staticClass:"el-dropdown-link "},[t._v("\n        添加木材"),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.wood,function(e,s,n){return i("el-dropdown-item",{key:n,attrs:{disabled:e.statu,command:e.type}},[t._v(t._s(e.type))])}))],1)],1)])],1),t._v(" "),i("div",{staticClass:"block height40"},[i("el-tree",{ref:"tree",attrs:{data:t.data,props:t.defaultProps,"node-key":"id"},on:{"node-click":t.handleNodeClick},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.node,n=e.data;return i("span",{staticClass:"custom-tree-node"},[i("span",[t._v(t._s(s.label))]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.showDelete(s.label),expression:"showDelete(node.label)"}]},[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return t.remove(s,n)}}},[t._v(" 删除")])],1)])}}])})],1)],1)]),t._v(" "),i("div",{staticClass:"input-box"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("总额 ："+t._s(t.clickWood.sum)+" ")])]),t._v(" "),i("div",{staticClass:"text item",on:{click:t.calculations}},[i("div",{class:{opacityfont:t.isOpacity[0]}},[t._v("小："),i("span",[t._v(t._s(t.little))])]),t._v(" "),i("div",{class:{opacityfont:t.isOpacity[1]}},[t._v("中："),i("span",{domProps:{textContent:t._s(t.medium)}},[t._v("0")])]),t._v(" "),i("div",{class:{opacityfont:t.isOpacity[2]}},[t._v("大："),i("span",{domProps:{textContent:t._s(t.big)}},[t._v("0")])]),t._v(" "),i("div",[i("span",{domProps:{textContent:t._s(t.showgroup)}}),t._v("组和："),i("span",{domProps:{textContent:t._s(t.sum)}},[t._v("0.00")]),t._v("元")])])]),t._v(" "),i("div",[i("div",{staticClass:"el-input el-input-group el-input-group--prepend "},[t._m(0),t._v(" "),i("el-input-number",{attrs:{size:"medium",precision:1,step:.2,max:10},model:{value:t.L,callback:function(e){t.L=e},expression:"L"}})],1)]),t._v(" "),i("div",[i("div",{staticClass:"el-input el-input-group el-input-group--prepend "},[t._m(1),t._v(" "),i("el-input-number",{attrs:{size:"medium",precision:2,step:2,max:100},model:{value:t.D,callback:function(e){t.D=e},expression:"D"}})],1)]),t._v(" "),i("div",{staticClass:"block margin-top10"},[t._v(" 数量\n  "),i("el-slider",{attrs:{"show-input":""},model:{value:t.nubValue,callback:function(e){t.nubValue=e},expression:"nubValue"}})],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"el-input-group__prepend"},[this._v("L 长度\n        "),e("span",[this._v("m   ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"el-input-group__prepend"},[this._v("D 直径\n        "),e("span",[this._v("cm")])])}]};var x=s("VU/8")(w,_,!1,function(t){s("hqqF")},null,null).exports;n.default.use(v.a);var y=new v.a({routes:[{path:"/",name:"Home",component:x},{path:"/test",name:"test",component:r}]}),k=s("NYxO");s("tvR6"),s("SWQJ");n.default.use(k.a);var C=new k.a.Store({state:{woodtype:"",tree:[],id:-1},actions:{changeGroup:function(t,e){t.commit("changetreeLable",e)}},mutations:{changetreeLable:function(t,e){t.tree=e,t.woodtype=e.label}}});n.default.use(p.a),n.default.use(k.a),n.default.config.productionTip=!1,new n.default({el:"#app",router:y,store:C,components:{App:u},template:"<App/>"})},SWQJ:function(t,e){},VFhj:function(t,e){},hqqF:function(t,e){},tvR6:function(t,e){}},["NHnr"]);