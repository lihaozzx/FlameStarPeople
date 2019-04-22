<template>
	<div>
		<div v-if="topic.type=='选择题'" class="content">
			<div class="head">
				<span class="for">您正在为 {{forName}} 答题加上榜值</span><br>
				<span class="title">{{topic.title}}</span>
			</div>
			<div class="dati">
				<div class="onexuanx" v-for="(t,i) in topic.xuanx" :key="t" :class="ch==i?'ched':'noch'" @click="choseAns(i)">
					<span>{{i=='0'?'A.':i=='1'?'B.':i=='2'?'C.':i=='3'?'D.':i=='4'?'E.':i=='5'?'F.':i=='6'?'G.':i=='7'?'H.':i=='8'?'I.':i=='9'?'J.':i=='10'?'K.':i=='11'?'L.':i=='12'?'M.':i=='12'?'N.':i=='13'?'O.':i=='14'?'P.':i=='15'?'Q.':i=='16'?'R.':i=='17'?'S.':i=='18'?'T.':i=='19'?'U.':i=='20'?'V.':i=='21'?'W.':i=='22'?'X.':i=='23'?'Y.':i=='24'?'Z.':''}}
					{{t}}</span>
				</div>
			</div>
			<div class="sub">
				下一题
			</div>
		</div>
		<div v-else class="content">
			<div class="head">
				<span class="for">您正在为 {{forName}} 答题加上榜值</span><br>
				<span class="title">{{topic.title}}</span>
			</div>
			<div class="ans_div">
				<span>{{zuhedaan}}</span>
				<img :src="del" @click="delzuhe">
			</div>
			<div class="zuhe_dati">
				<div class="onexuanx" v-for="(t,i) in topic.xuanx" :key="t" :class="ch==i?'ched':'noch'" @click="choseAns(t)">
					<span>{{t}}</span>
				</div>
				<div class="xian1"></div>
				<div class="xian2"></div>
				<div class="xian3"></div>
				<div class="xian4"></div>
			</div>
			<div class="sub_zuhe">
				下一题
			</div>
		</div>
	</div>
</template>

<script>
	import del from '@/assets/del.png'
	export default {
		data() {
			return {
				del,
				forName: '王麻子',
				topic: {
					title: '满汉全席兴起于满汉全席兴起于满汉全席兴起于满汉全席兴起于满汉全席兴起于满汉全席兴起于？',
					xuanx: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
					type:'组合题'
				},
				ch: -1,
				zuhedaan:''
			};
		},
		methods: {
			// 组件的方法
			choseAns(k) {
				if(this.topic == '选择题'){
					this.ch == k ? this.ch = -1 : this.ch = k
				}else{
					this.zuhedaan +=k;
				}
			},
			delzuhe(){
				this.zuhedaan = this.zuhedaan.substring(0,this.zuhedaan.length-1)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 34px 10px 10px 10px;

		.head {
			width: 100%;
			margin-left: 20px;

			.for {
				color: #FCD363;
				font-size: 1.6rem;
			}

			.title {
				display: block;
				font-size: 2rem;
				color: #FFFFFF;
				margin: 30px 0;
				width: 90%;
			}
		}
		.ans_div{
			width: 50%;
			height: 54px;
			border-bottom: solid 1px white;
			margin-left: 24%;
			margin-bottom: 20px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			span{
				width: 100%;
				font-size: 2rem;
				text-align: center;
			}
			img{
				position: absolute;
				top: 14px;
				right: -100px;
				width: 100px;
			}
		}

		.dati {
			width: 100%;
			font-size: 1.6rem;

			.onexuanx {
				height: 60px;
				box-sizing: border-box;
				padding-left: 10%;
				border-radius: 10px;
				display: flex;
				align-items: center;
				color: #FFFFFF;
				margin-bottom: 10px;
			}

			.ched {
				border: 2px solid rgba(249, 241, 202, 1);
			}

			.noch {
				border: 2px solid rgba(249, 241, 202, 0);
			}
		}
		.zuhe_dati{
			width: 100%;
			font-size: 1.6rem;
			border: 2px solid rgba(249,241,202,1);
			border-radius:10px;
			display: flex;
			flex-wrap: wrap;
			position: relative;
			.onexuanx {
				width: calc(100% / 3);
				padding-top: calc(100% / 3);
				position: relative;
				span{
					position: absolute;
					top: calc(50% - 1.5rem);
					left: calc(50% - 1.5rem);
					color: #FFFFFF;
					font-size: 3rem;
				}
			}
			.xian1{
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 3);
			}
			.xian2{
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 3 *2);
			}
			.xian3{
				height: 3px;
				width: 100%;
				background-color: #F5E6C1;
				position: absolute;
				top: calc(100% / 3);
			}
			.xian4{
				height: 3px;
				width: 100%;
				background-color: #F5E6C1;
				position: absolute;
				top: calc(100% / 3 * 2);
			}
		}

		.sub {
			margin-top: 120px;
			width: 80%;
			height: 45px;
			margin-left: 10%;
			background: rgba(249, 241, 202, 1);
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
			border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.8rem;
			color: #A01C19;
			font-weight: 900;
		}
		.sub_zuhe{
			margin-top: 20px;
			width: 80%;
			height: 45px;
			margin-left: 10%;
			background: rgba(249, 241, 202, 1);
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
			border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.8rem;
			color: #A01C19;
			font-weight: 900;
		}
	}
</style>
