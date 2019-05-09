<template>
	<div>
		<jz>
			<div class="infoans" v-if="topic.type=='抢答题'">
				<div class="topicInfo">
					<span class="anstitle">{{topic.name}}</span>
					
					<div class="xiansuo">
						<p v-for="(t,i) in topic.xuanx" :key="i">{{i<xiansuoNum?t:''}}</p>
					</div>
				</div>
				<div class="man">
					<div class="show_stu_info">
						<div class="head_div"></div>
						<div class="stu_num">{{nowQiangdaStu.num}}</div>
						<div class="stu_name">{{nowQiangdaStu.name}}</div>
					</div>
				</div>
				<div class="typess">
					<span>{{topic.type}}</span>
				</div>
			</div>
			<div class="infoans" v-else>
				<div class="cont">
					<span class="anstitle">{{topic.name}}</span>
					<div class="ans" v-if="!showanss">
						<div :class="suiji.length<5?'oneans2':'oneans'" v-for="(t,k) in suiji" :key="t">
							<span>{{k+1}}.{{t}}</span>
						</div>
					</div>
					<div class="ans" v-else>
						<span>{{topic.answer}}</span>
					</div>
				</div>
				<div class="dao">
					<span>{{daojishi}} 秒</span>
				</div>
				<div class="typess">
					<span>{{topic.type}}</span>
				</div>
			</div>
		</jz>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				topic: {
					name: '无',
					xuanx: []
				},
				nowQiangdaStu:{
					num:'001',
					name:'张三'
				}
			};
		},
		computed: {
			ans() {
				return this.$store.getters.ans
			},
			suiji() {
				let newone = [...this.topic.xuanx];
				let o = []
				while (newone.length > 0) {
					o.push(newone.splice(Math.floor(Math.random() * newone.length), 1)[0])
				}
				return o
			},
			topicFromX(){
				return this.$store.getters.topic;
			},
			showanss(){
				return this.$store.getters.showans;
			},
			daojishi(){
				return this.$store.getters.daojishi;
			},
			xiansuoNum(){
				return this.$store.getters.xiansuoNum;
			}
		},
		watch: {
			ans(n) {
				this.$store.commit('changeTitle', this.numToStr(this.ans));
				document.title = this.numToStr(n);
			},
			topicFromX(n){
				while(n.answer.indexOf('@')!= -1){
					n.answer = n.answer.substring(0,n.answer.indexOf('@'))+'、' + n.answer.substring(n.answer.indexOf('@')+1,n.answer.length)
				}
				while(n.name.indexOf('#')!= -1){
					n.name = n.name.substring(0,n.name.indexOf('#'))+' __ ' + n.name.substring(n.name.indexOf('#')+1,n.name.length)
				}
				this.topic = n;
			}
		},
		created() {
			if (this.$route.params.topic != undefined) {
				this.topic = this.$route.params.topic;
				this.$store.commit('saveTopic',this.$route.params.topic);
				this.$store.commit('nextAns');
			}else{
				this.topic = this.$store.getters.topic;
			}
			this.$store.commit('changeTitle', this.numToStr(this.ans));
			document.title = this.numToStr(this.ans);
			this.$a().then(res=>{
				console.log(res);
			})
		},
		methods: {
			// 组件的方法
			next() {
				this.$store.commit('nextAns')
			},
			numToStr(e) {
				switch (e) {
					case 0:
						return '未开始'
						break;
					case 1:
						return '第一题'
						break;
					case 2:
						return '第二题'
						break;
					case 3:
						return '第三题'
						break;
					case 4:
						return '第四题'
						break;
					case 5:
						return '第五题'
						break;
					case 6:
						return '第六题'
						break;
					case 7:
						return '第七题'
						break;
					case 8:
						return '第八题'
						break;
					case 9:
						return '第九题'
						break;
					case 10:
						return '第十题'
						break;
					case 11:
						return '第十一题'
						break;
					case 12:
						return '第十二题'
						break;
					case 13:
						return '第十三题'
						break;
					case 14:
						return '第十四题'
						break;
					case 15:
						return '第十五题'
						break;
					case 16:
						return '第十六题'
						break;
					case 17:
						return '第十七题'
						break;
					case 18:
						return '第十八题'
						break;
					case 19:
						return '第十九题'
						break;
					case 20:
						return '第二十题'
						break;
					case 21:
						return '第二十一题'
						break;
					case 22:
						return '第二十二题'
						break;
					case 23:
						return '第二十三题'
						break;
					case 24:
						return '第二十四题'
						break;
					case 25:
						return '第二十五题'
						break;
					case 26:
						return '第二十六题'
						break;
					case 27:
						return '第二十七题'
						break;
					case 28:
						return '第二十八题'
						break;
					case 29:
						return '第二十九题'
						break;
					case 30:
						return '第三十题'
						break;
					default:
						return '答题结束'
						break;
				}
			}
		}
	}
</script>

<style>
	.infoans {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 64px;
		color: #F0B74A;
		position: relative;
	}
	.topicInfo{
		width: 60%;
		height: 100%;
		box-sizing: border-box;
		padding: 50px;
	}
	.man{
		width: 40%;
		height: 100%;
		box-sizing: border-box;
		padding: 50px;
	}
	.show_stu_info{
		width: 60%;
		margin-left: 10%;
		height: 100%;
		box-sizing: border-box;
		border: 2px solid #F0B74A;
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		
	}
	.xiansuo{
		font-size: 40px;
		padding-left:40px ;
	}

	.cont {
		width: 1300px;
		height: 600px;
		border: 1px solid #F0B74A;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding-top: 10px;
	}
	
	.anstitle{
		width: 95%;
		text-align: left;
	}

	.ans {
		width: 100%;
		height: 76%;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 10px 50px 10px 130px;
	}

	.oneans {
		min-width: 230px;
		margin: 20px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.oneans2{
		min-width: 450px;
		margin: 20px 50px;
		display: flex;
		align-items: center;
	}
	.dao{
		position: absolute;
		top: -100px;
		right: 80px;
		font-size: 48px;
		color: #F0B74A;
	}
	.typess{
		position: absolute;
		top: -100px;
		left: 80px;
		font-size: 48px;
		color: #F0B74A;
	}
</style>
