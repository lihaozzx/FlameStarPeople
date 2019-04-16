<template>
	<div>
		<jz>
			<div class="infoans">
				<div class="cont">
					<span>{{topic.name}}</span>
					<div class="ans" v-if="showans">
						<div class="oneans" v-for="(t,k) in suiji" :key="t">
							<span>{{k+1}}.{{t}}</span>
						</div>
					</div>
					<div class="ans" v-else>
						<span>{{topic.answer}}</span>
					</div>
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
				showans: true
			};
		},
		computed: {
			ans() {
				return this.$store.getters.ans
			},
			wsm() {
				return this.$store.getters.wsmg
			},
			suiji() {
				let newone = [...this.topic.xuanx];
				let o = []
				while (newone.length > 0) {
					o.push(newone.splice(Math.floor(Math.random() * newone.length), 1)[0])
				}
				return o
			}
		},
		watch: {
			ans(n) {
				this.$store.commit('changeTitle', this.numToStr(this.ans));
				document.title = this.numToStr(n);
			},
			wsm(n) {
				switch (n.type) {
					case 'nextTopic':
						// 下一题
						this.topic = n.data;
						this.$store.commit('nextAns');
						break;
					case 'toindex':
						/* 跳转主页 */
						this.$router.push({
							name: 'index'
						})
						break;
					case 'seeans':
						/* 公布答案 */
						this.showans = false
						break;
					case 'seeRaking':
						/* 查看排名 */
						this.$router.push({
							name: 'Ranking',
							params: {
								paimin: n.data
							}
						})
						break;
					case 'seeResult':
						/* 查看正确率 */
						this.$router.push({
							name: 'zhenquelv',
							params: {
								zhenquelv: n.data
							}
						})
						break;
					case 'seeTherr':
						/* 查看前三 */
						this.$router.push({
							name: 'info',
							params: {
								rank: n.data
							}
						})
						break;
					case 'gameswitch':
						// 初始化比赛
						this.$store.commit('initAns');
						this.$store.commit('initStuinfo');
						this.$router.push({
							name: 'index'
						})
						break;
					default:
						break;
				}
			}
		},
		created() {
			console.log();
			if (this.$route.params.topic != undefined) {
				this.topic = this.$route.params.topic;
				this.$store.commit('nextAns');
			}
			this.$store.commit('changeTitle', this.numToStr(this.ans));
			document.title = this.numToStr(this.ans);
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
	}

	.cont {
		width: 1300px;
		height: 600px;
		border: 1px solid #F0B74A;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.ans {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 10px 50px;
	}

	.oneans {
		min-width: 230px;
		margin: 20px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
