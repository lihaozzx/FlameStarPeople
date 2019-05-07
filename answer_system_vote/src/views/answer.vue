<template>
	<div>
		<div v-if="topic.type=='组合题'" class="content">
			<div class="head">
				<span class="for">您正在为 {{stuInfo.name}} 答题加上榜值</span><br>
				<span class="title">{{topic.name}}</span>
			</div>
			<div class="ans_div">
				<span>{{zuhedaan}}</span>
				<img :src="del" @click="delzuhe">
			</div>
			<div class="zuhe_dati" v-if="topic.xuanx.length<10">
				<div class="onexuanx" v-for="(t,i) in topic.xuanx" :key="i" @click="choseAns(t)">
					<span>{{t}}</span>
				</div>
				<div class="xian1"></div>
				<div class="xian2"></div>
				<div class="xian3"></div>
				<div class="xian4"></div>
			</div>
			<div class="zuhe_dati2" v-else>
				<div class="onexuanx" v-for="(t,i) in topic.xuanx" :key="i" @click="choseAns(t)">
					<span>{{t}}</span>
				</div>
				<div class="xian1"></div>
				<div class="xian2"></div>
				<div class="xian5"></div>
				<div class="xian3"></div>
				<div class="xian4"></div>
			</div>
			<div class="sub_zuhe" @click="next">
				下一题
			</div>
		</div>
		<div v-else class="content">
			<div class="head">
				<span class="for">您正在为 {{stuInfo.name}} 答题加上榜值</span><br>
				<span class="title">{{topic.name}}</span>
			</div>
			<div class="dati">
				<div class="ans_div" v-if="topic.type == '填空题'">
					<span>{{zuhedaan}}</span>
					<img :src="del" @click="delzuhe">
				</div>
				<div class="ans_div" v-else-if="topic.type == '多选题'">
					<span>{{duouxnadaan}}</span>
					<img :src="del" @click="delduoxuan">
				</div>
				<div class="onexuanx" v-for="(t,i) in topic.xuanx" :key="i" :class="ch==i?'ched':'noch'" @click="choseAns(i)">
					<span>{{i=='0'?'A.':i=='1'?'B.':i=='2'?'C.':i=='3'?'D.':i=='4'?'E.':i=='5'?'F.':i=='6'?'G.':i=='7'?'H.':i=='8'?'I.':i=='9'?'J.':i=='10'?'K.':i=='11'?'L.':i=='12'?'M.':i=='12'?'N.':i=='13'?'O.':i=='14'?'P.':i=='15'?'Q.':i=='16'?'R.':i=='17'?'S.':i=='18'?'T.':i=='19'?'U.':i=='20'?'V.':i=='21'?'W.':i=='22'?'X.':i=='23'?'Y.':i=='24'?'Z.':''}}{{t}}</span>
				</div>
			</div>
			<div class="sub" @click="next">
				{{this.now==9?'完成':'下一题'}}
			</div>
		</div>
		<el-dialog :title="dialogText==0?'请登录':'成功'" :visible.sync="showdialog" width="30%">
			<span>{{dialogText==0?'答题之前请登录':'您已经为' + this.stuInfo.name + '增加' + this.score * 10 + '上榜值'}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showdialog = false">取 消</el-button>
				<el-button type="primary" @click="goback">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import del from '@/assets/del.png'
	export default {
		computed: {
			topic() {
				return this.tiku[this.now]
			},
			duouxnadaan() {
				let o = "";
				this.chs.forEach(e => {
					o += this.topic.xuanx[e] + '、'
				})
				o = o.substring(0, o.length - 1)
				return o
			}
		},
		created() {
			this.$http.post('/vote/playerinfo', this.$qs.stringify({
				id: this.$route.query.userId
			})).then(res => {
				this.stuInfo = res.data
			});
			if (this.$store.getters.userInfo != null) {
				this.$http.post('/vote/topics', this.$qs.stringify({
					pid: this.$route.query.userId,
					openid: this.$store.getters.userInfo.openid
				})).then(res => {
					if (res) {
						res.data.forEach(t => {
							while (t.name.indexOf('#') != -1) {
								t.name = t.name.substring(0, t.name.indexOf('#')) + ' __ ' + t.name.substring(t.name.indexOf('#') + 1, t.name
									.length);
							}
							let o = [];
							while (t.xuanx.length > 0) {
								o.push(t.xuanx.splice(Math.floor(Math.random() * t.xuanx.length), 1)[0])
							}
							t.xuanx = o;
						})
						this.tiku = res.data;
					}
				});
			} else {
				this.showdialog = true;
				this.dialogText = 0;
			}

		},
		data() {
			return {
				del,
				stuInfo: {
					name: ''
				},
				tiku: [{
					type: ''
				}],
				now: 0,
				ch: -1,
				chs: [],
				zuhedaan: '',
				score: 0,
				cannext: true,
				showdialog: false,
				dialogText: 0
			};
		},
		methods: {
			// 组件的方法
			goback() {
				if(this.dialogText==0){
					this.$router.push({
						name: 'index'
					});
				}else{
					this.$router.go(-1);
				}
			},
			choseAns(k) {
				if (this.topic.type == '组合题') {
					this.zuhedaan += k;
				} else if (this.topic.type == '填空题') {
					this.zuhedaan += this.topic.xuanx[k];
				} else if (this.topic.type == '多选题') {
					let a = true;
					this.chs.forEach(c => {
						if (c == k) {
							a = false;
						}
					})
					if (a) {
						this.chs.push(k)
					}
				} else {
					this.ch == k ? this.ch = -1 : this.ch = k;
				}
			},
			delzuhe() {
				this.zuhedaan = this.zuhedaan.substring(0, this.zuhedaan.length - 1)
			},
			delduoxuan() {
				this.chs.pop();
			},
			next() {
				if (this.ch == -1 && this.chs.length == 0 && this.zuhedaan == '') {
					this.$message('请选择答案');
				} else {
					if (this.now == 9) {
						if (this.isright()) {
							this.$message('答对了');
							this.score++;
						} else {
							this.$message('回答错误');
						}
						//提交
						this.$http.post('/vote/addVoteType', this.$qs.stringify({
							pid: this.stuInfo.id,
							openid: this.$store.getters.userInfo.openid,
							head: this.$store.getters.userInfo.headimgurl,
							tname: this.$store.getters.userInfo.nickname,
							num: this.score * 10
						})).then(res => {
							if (res) {
								this.showdialog = true;
								this.dialogText = 1;
							}
						})
					} else {
						if (this.cannext) {
							this.cannext = false;
							if (this.isright()) {
								this.$message('回答正确，3秒后下一题');
								this.score++;
							} else {
								this.$message('回答错误，正确答案：' + this.topic.answer + '，3秒后下一题');
							}
							setTimeout(() => {
								this.now++;
								this.cannext = true;
							}, 3000);
							this.ch = -1;
							this.chs = [];
							this.zuhedaan = '';
						}
					}
				}
			},
			isright() {
				let t = { ...this.topic
				}
				if (t.type == '问答题') {
					return t.answer == t.xuanx[this.ch]
				} else if (t.type == '填空题') {
					let o = this.zuhedaan.split('');
					let ans = '';
					o.forEach(a => {
						ans += a + '@';
					})
					return t.answer == ans.substring(0, ans.length - 1);
				} else if (t.type == '多选题') {
					let a = t.answer.split('@');
					let b = this.duouxnadaan.split('、');
					return a.length == b.length && a.sort().toString() == b.sort().toString();
				} else if (t.type == '组合题') {
					return t.answer == this.zuhedaan;
				}
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

		.ans_div {
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

			span {
				width: 100%;
				font-size: 2rem;
				text-align: center;
			}

			img {
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

		.zuhe_dati {
			margin: 0 auto;
			width: 80%;
			font-size: 1.6rem;
			border: 2px solid rgba(249, 241, 202, 1);
			border-radius: 10px;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.onexuanx {
				width: calc(100% / 3);
				padding-top: calc(100% / 3);
				position: relative;

				span {
					position: absolute;
					top: calc(50% - 1.5rem);
					left: calc(50% - 1.5rem);
					color: #FFFFFF;
					font-size: 3rem;
				}
			}

			.xian1 {
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 3);
			}

			.xian2 {
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 3 *2);
			}

			.xian3 {
				height: 3px;
				width: 100%;
				background-color: #F5E6C1;
				position: absolute;
				top: calc(100% / 3);
			}

			.xian4 {
				height: 3px;
				width: 100%;
				background-color: #F5E6C1;
				position: absolute;
				top: calc(100% / 3 * 2);
			}
		}

		.zuhe_dati2 {
			margin: 0 auto;
			width: 80%;
			font-size: 1.6rem;
			border: 2px solid rgba(249, 241, 202, 1);
			border-radius: 10px;
			display: flex;
			flex-wrap: wrap;
			position: relative;

			.onexuanx {
				width: calc(100% / 4);
				padding-top: calc(100% / 3);
				position: relative;

				span {
					position: absolute;
					top: calc(50% - 1.5rem);
					left: calc(50% - 1.5rem);
					color: #FFFFFF;
					font-size: 3rem;
				}
			}

			.xian1 {
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 4);
			}

			.xian2 {
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 4 *2);
			}

			.xian5 {
				height: 100%;
				width: 3px;
				background-color: #F5E6C1;
				position: absolute;
				left: calc(100% / 4 *3);
			}

			.xian3 {
				height: 3px;
				width: 100%;
				background-color: #F5E6C1;
				position: absolute;
				top: calc(100% / 3);
			}

			.xian4 {
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

		.sub_zuhe {
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
