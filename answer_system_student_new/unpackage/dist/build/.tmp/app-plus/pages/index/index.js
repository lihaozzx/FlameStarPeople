(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0d02":function(t,n,e){"use strict";e.r(n);var o=e("ecb9"),s=e("5f77");for(var a in s)"default"!==a&&function(t){e.d(n,t,function(){return s[t]})}(a);e("53f0");var i=e("2877"),u=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,"91c85212",null);n["default"]=u.exports},"522d":function(t,n,e){},"53f0":function(t,n,e){"use strict";var o=e("522d"),s=e.n(o);s.a},"5f77":function(t,n,e){"use strict";e.r(n);var o=e("cf5a"),s=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=s.a},cf5a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={onLoad:function(n){n.type&&(this.num=t.getStorageSync("zuoweihao"),this.show=1)},computed:{wsm:function(){return this.$store.getters.wsmg}},watch:{wsm:function(n){var e=this;switch(n.type){case"stuInfo":n.data.forEach(function(n){n.number==e.num&&(e.stuInfo=n,t.setStorageSync("stuId",n.pid),t.setStorageSync("id",n.id),t.setStorageSync("stuName",n.name),t.setStorageSync("stuSchool",n.school),e.show=2)}),1==this.show&&(this.str="座位号信息错误");break;case"startGame":t.redirectTo({url:"../ans/ans"});break;default:break}}},data:function(){return{str:"请等待答题开始",show:0,insure:!1,num:"",stuInfo:{number:"01",name:"蕾米莉亚",school:"成都七中",class:"三年级一班",img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554980610251&di=201ce787e28c8bbda1df254194512515&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg"}}},methods:{login:function(){""!=this.num?(t.setStorageSync("zuoweihao",this.num),this.wslogin(),this.show=1):t.showToast({title:"请输入座位号",icon:"none"})},asd:function(){t.navigateTo({url:"../ans/ans"})},wslogin:function(){t.sendSocketMessage({data:'{"type":"login","client_name":"pad'+this.num+'","room_id":"1"}'})},sureInfo:function(){t.sendSocketMessage({data:this.$mso({type:"sureInfo",data:this.num})}),this.insure=!0},infoWrong:function(){var n=this;plus.nativeUI.prompt("Input Game Code: ",function(e){0==e.index&&""!=e.value&&t.sendSocketMessage({data:n.$mso({type:"infoErr",data:{num:n.num,code:e.value}})})},"请输入授权码","Authorization Code",["OK","Cancel"])}}};n.default=e}).call(this,e("6e42")["default"])},ecb9:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},s=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return s})}},[["1b3d","common/runtime","common/vendor"]]]);