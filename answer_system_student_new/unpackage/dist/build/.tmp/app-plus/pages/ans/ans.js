(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ans/ans"],{"05c8":function(t,s,a){"use strict";var n=function(){var t=this,s=t.$createElement;t._self._c},e=[];a.d(s,"a",function(){return n}),a.d(s,"b",function(){return e})},"082e":function(t,s,a){"use strict";a.r(s);var n=a("b0eb"),e=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(s,t,function(){return n[t]})}(i);s["default"]=e.a},"663a":function(t,s,a){},"8a51":function(t,s,a){"use strict";a.r(s);var n=a("05c8"),e=a("082e");for(var i in e)"default"!==i&&function(t){a.d(s,t,function(){return e[t]})}(i);a("96a2");var h=a("2877"),r=Object(h["a"])(e["default"],n["a"],n["b"],!1,null,"5c4971a1",null);s["default"]=r.exports},"96a2":function(t,s,a){"use strict";var n=a("663a"),e=a.n(n);e.a},b0eb:function(t,s,a){"use strict";(function(t){function a(t){return i(t)||e(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function e(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(t){if(Array.isArray(t)){for(var s=0,a=new Array(t.length);s<t.length;s++)a[s]=t[s];return a}}Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var h={computed:{wsm:function(){return this.$store.getters.wsmg}},watch:{wsm:function(s){switch(s.type){case"nextTopic":this.xiansuonum=0,this.timuxinxi=s.data.topic,this.nowTopicNum=s.data.num+1,this.start=!0,this.setTopic(this.timuxinxi),this.canQiang=!1;break;case"showClue":this.xiansuonum++,this.canQiang=!1;break;case"startGrabAnswer":this.canQiang=!0;break;case"gameover":t.redirectTo({url:"../info/info"});break;default:break}},timeCost:function(t){t<=0&&(clearInterval(this.timeCostIn),0==this.iszuhe?this.subZuhe():this.subQita())}},data:function(){return{timuxinxi:null,start:!1,iszuhe:0,isqiyan:!1,isduoxuan:!1,nowCh:-1,ans:[{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1}],daans:[{val:"啊",ed:!1},{val:"去",ed:!1},{val:"我",ed:!1},{val:"饿",ed:!1},{val:"人",ed:!1},{val:"是",ed:!1},{val:"的",ed:!1},{val:"发",ed:!1},{val:"在",ed:!1}],ch:-1,chs:[],anss:["asdsad","asdqwdwd","按时吃是阿深V阿SaaS大V阿飞大VAV发傻撒大声地","s发噶大V嘎都是阿斯蒂芬打怪打怪阿飞不上辅导班伤风败俗辅导班是是否报商务部伤风败俗发表是"],nowTopicNumstr:"",nowTopicNum:0,topicType:"",topicName:"",topicId:"",sub:!1,timeCost:25,timeCostIn:null,thisTopicstart:null,xiansuonum:0,canQiang:!1}},methods:{chFont:function(t){this.sub||(this.nowCh==t?this.nowCh=-1:this.nowCh=t)},xuanze:function(t){if(!this.sub)if(this.isduoxuan){for(var s=!0,a=0;a<this.chs.length;a++)this.chs[a]==t&&(this.chs.splice(a,1),s=!1);s&&this.chs.push(t)}else this.ch=t},chzuhe:function(t){if(!this.sub&&!this.daans[t].ed)if(-1==this.nowCh){for(var s=0;s<this.ans.length;s++)if(""==this.ans[s].val)return this.daans.splice(t,1,{val:this.daans[t].val,ed:!0}),void this.ans.splice(s,1,{val:this.daans[t].val,k:t})}else""==this.ans[this.nowCh].val?(this.daans.splice(t,1,{val:this.daans[t].val,ed:!0}),this.ans.splice(this.nowCh,1,{val:this.daans[t].val,k:t})):(this.daans.splice(t,1,{val:this.daans[t].val,ed:!0}),this.daans.splice(this.ans[this.nowCh].k,1,{val:this.ans[this.nowCh].val,ed:!1}),this.ans.splice(this.nowCh,1,{val:this.daans[t].val,k:t}))},delZuheans:function(){if(-1==this.nowCh){for(var t=this.ans.length-1;t>=0;t--)if(""!=this.ans[t].val)return this.daans.splice(this.ans[t].k,1,{val:this.ans[t].val,ed:!1}),void this.ans.splice(t,1,{val:"",k:-1})}else""!=this.ans[this.nowCh].val&&(this.daans.splice(this.ans[this.nowCh].k,1,{val:this.ans[this.nowCh].val,ed:!1}),this.ans.splice(this.nowCh,1,{val:"",k:-1}))},subZuhe:function(){if(!this.sub){this.sub=!0;var s="";this.ans.forEach(function(t){""!=t.val&&(s+=t.val)}),t.request({url:this.$api+"/stock/subAnswer",data:{pid:t.getStorageSync("stuId"),id:this.topicId,timeCost:new Date-this.thisTopicstart.getTime(),answer:s},success:function(s){function a(t){for(var s in t)"object"===typeof t[s]?a(t[s]):(console.log(s," at pages\\ans\\ans.vue:326"),console.log(t[s]," at pages\\ans\\ans.vue:327"))}0==s.data.status&&(a(s.data),t.showToast)}})}},subQita:function(){var s=this;if(!this.sub){this.sub=!0;var a="";this.isduoxuan?this.chs.forEach(function(t){a+=s.anss[t]+"@"}):a+=this.anss[this.ch],this.isduoxuan&&(a=a.substring(0,a.length-1)),console.log(a," at pages\\ans\\ans.vue:355"),t.request({url:this.$api+"/stock/subAnswer",data:{pid:t.getStorageSync("stuId"),id:this.topicId,timeCost:new Date-this.thisTopicstart.getTime(),answer:a},success:function(t){function s(t){for(var a in t)"object"===typeof t[a]?s(t[a]):(console.log(a," at pages\\ans\\ans.vue:370"),console.log(t[a]," at pages\\ans\\ans.vue:371"))}t.data.status,s(t.data)}})}},setTopic:function(t){var s=this;this.sub=!1,this.nowTopicNumstr=this.numToStr(this.nowTopicNum);while(-1!=t.name.indexOf("#"))t.name=t.name.substring(0,t.name.indexOf("#"))+" __ "+t.name.substring(t.name.indexOf("#")+1,t.name.length);this.topicName=t.name,this.topicId=t.id,this.topicType=t.type,this.thisTopicstart=new Date,this.timeCost=25,null!=this.timeCostIn&&clearInterval(this.timeCostIn),this.timeCostIn=setInterval(function(){s.timeCost--},1e3);var n=a(t.xuanx),e=[];if("组合题"==t.type){this.iszuhe=0,12==t.xuanx.length?(this.isqiyan=!0,this.ans=[{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1}]):(this.isqiyan=!1,this.ans=[{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1},{val:"",k:-1}]),this.nowCh=-1;while(n.length>0)e.push({val:n.splice(Math.floor(Math.random()*n.length),1)[0],ed:!1});this.daans=e}else if("多选题"==t.type||"填空题"==t.type){this.isduoxuan=!0,this.iszuhe=1,this.chs=[],this.anss=[];while(n.length>0)e.push(n.splice(Math.floor(Math.random()*n.length),1)[0]);this.anss=e}else if("抢答题"==t.type)this.iszuhe=2,this.timeCost=25e10;else{this.isduoxuan=!1,this.iszuhe=1,this.ch=-1,this.anss=[];while(n.length>0)e.push(n.splice(Math.floor(Math.random()*n.length),1)[0]);this.anss=e}},qdfun:function(){this.canQiang=!1;var s={name:t.getStorageSync("stuName"),id:t.getStorageSync("id"),num:t.getStorageSync("zuoweihao")};t.sendSocketMessage({data:this.$mso({type:"clickQiangda",data:s})})},numToStr:function(t){switch(t){case 0:return"未开始";case 1:return"第一题";case 2:return"第二题";case 3:return"第三题";case 4:return"第四题";case 5:return"第五题";case 6:return"第六题";case 7:return"第七题";case 8:return"第八题";case 9:return"第九题";case 10:return"第十题";case 11:return"第十一题";case 12:return"第十二题";case 13:return"第十三题";case 14:return"第十四题";case 15:return"第十五题";case 16:return"第十六题";case 17:return"第十七题";case 18:return"第十八题";case 19:return"第十九题";case 20:return"第二十题";case 21:return"第二十一题";case 22:return"第二十二题";case 23:return"第二十三题";case 24:return"第二十四题";case 25:return"第二十五题";case 26:return"第二十六题";case 27:return"第二十七题";case 28:return"第二十八题";case 29:return"第二十九题";case 30:return"第三十题";default:return"答题结束"}}}};s.default=h}).call(this,a("6e42")["default"])}},[["1cb5","common/runtime","common/vendor"]]]);