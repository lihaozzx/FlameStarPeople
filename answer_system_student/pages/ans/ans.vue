<template>
	<view class="root">
		<view class="bg">
			<view class="view_navigation"></view>
			<image class="logo" :src="iszuhe?'/static/01fe5b5a6bd773a8012134663c2fee.png':'/static/018af65a6bd774a8012134669fe1c6.png'"></image>
		</view>

		<view v-if="start&&iszuhe" class="content">
			<text class="fs28 c8c">{{nowTopicNumstr}}</text>
			<text class="ts36 c8c">{{topicName}}</text>
			<view class="ans">
				<view v-for="(k,i) in ans" :key="i" class="one" :class="nowCh==i?'ch':' no'" @tap="chFont(i)">{{k.val}}</view>
				<view class="del_img" @click="delZuheans()">
					<image src="../../static/del.png"></image>
				</view>
			</view>
			<view v-if="!isqiyan" class="daan">
				<view class="one" v-for="(v,k) in daans" :key="k" @click="chzuhe(k)" :class="v.ed?'ched':''">{{v.val}}</view>
				<view class="b1"></view>
				<view class="b2"></view>
				<view class="b3"></view>
				<view class="b4"></view>
			</view>
			<view v-else class="daan2">
				<view class="one" v-for="(v,k) in daans" :key="k" @click="chzuhe(k)" :class="v.ed?'ched':''">{{v.val}}</view>
				<view class="b1"></view>
				<view class="b2"></view>
				<view class="b5"></view>
				<view class="b3"></view>
				<view class="b4"></view>
			</view>
			<view :class="sub?'subed_btn':'sure_btn'" @click="subZuhe">
				<text>锁定答案</text>
			</view>
			<view class="daojishi">
				<text>倒计时：30 秒</text>
			</view>
		</view>
		<view v-else-if="start&&iszuhe==false" class="content">
			<text class="fs28 c8c">{{nowTopicNumstr}}</text>
			<text class="ts36 c8c">{{topicName}}</text>

			<view class="xuanzedaan fs30">
				<view v-for="(k,i) in anss" :key="i" class="one" @click="xuanze(i)">
					<text>{{i=='0'?'A.':i=='1'?'B.':i=='2'?'C.':i=='3'?'D.':i=='4'?'E.':i=='5'?'F.':i=='6'?'G.':i=='7'?'H.':i=='8'?'I.':i=='9'?'J.':i=='10'?'K.':i=='11'?'L.':i=='12'?'M.':i=='12'?'N.':i=='13'?'O.':i=='14'?'P.':i=='15'?'Q.':i=='16'?'R.':i=='17'?'S.':i=='18'?'T.':i=='19'?'U.':i=='20'?'V.':i=='21'?'W.':i=='22'?'X.':i=='23'?'Y.':i=='24'?'Z.':''}}{{k}}</text>
					<image v-if="!isduoxuan && i == ch" class="ch_img" src="../../static/5c773b1038020.png"></image>
					<image v-for="c in chs" :key="c" v-if="isduoxuan && i == c" class="ch_img" src="../../static/5c773b1038020.png"></image>
				</view>
			</view>

			<view :class="sub?'subed_btn':'sure_btn'" @click="subQita">
				<text>锁定答案</text>
			</view>
			<view class="daojishi">
				<text>倒计时：{{timeCost}} 秒</text>
			</view>
		</view>
		<view v-else class="content">
			<text>请看大屏幕等待比赛开始</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		computed: {
			wsm() {
				return this.$store.getters.wsmg
			}
		},
		watch: {
			wsm(n) {
				switch (n.type) {
					case 'nextTopic':
						// 题目信息
						this.timuxinxi = n.data;
						break;
					case 'start!!!!!!':
						// 开始
						this.start = true;
						this.setTopic(this.timuxinxi);
						break;
					case 'gameover':
						// 题目信息
						uni.redirectTo({
							url: '../info/info'
						})
						break;
					default:
						break;
				}
			},
			timeCost(n) {
				if (n <= 0) {
					clearInterval(this.timeCostIn);
					if (this.iszuhe) {
						this.subZuhe()
					} else {
						this.subQita()
					}
				}
			}
		},
		data() {
			return {
				timuxinxi:null,
				start: false,
				iszuhe: true,
				isqiyan: false,
				isduoxuan: false,
				nowCh: -1,
				ans: [{
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}],
				daans: [{
					val: '啊',
					ed: false
				}, {
					val: '去',
					ed: false
				}, {
					val: '我',
					ed: false
				}, {
					val: '饿',
					ed: false
				}, {
					val: '人',
					ed: false
				}, {
					val: '是',
					ed: false
				}, {
					val: '的',
					ed: false
				}, {
					val: '发',
					ed: false
				}, {
					val: '在',
					ed: false
				}],
				ch: -1,
				chs: [],
				anss: ['asdsad', 'asdqwdwd', '按时吃是阿深V阿SaaS大V阿飞大VAV发傻撒大声地', 's发噶大V嘎都是阿斯蒂芬打怪打怪阿飞不上辅导班伤风败俗辅导班是是否报商务部伤风败俗发表是'],
				nowTopicNumstr: '',
				nowTopicNum: 0,
				topicName: '',
				topicId: '',
				sub: false,
				timeCost: 30,
				timeCostIn: null,
				thisTopicstart:null
			};
		},
		methods: {
			// 组件的方法
			chFont(k) {
				if (!this.sub) {
					if (this.nowCh == k) {
						this.nowCh = -1;
					} else {
						this.nowCh = k;
					}
				}
			},
			xuanze(k) {
				if (!this.sub) {
					if (this.isduoxuan) {
						let s = true;
						for (var i = 0; i < this.chs.length; i++) {
							if (this.chs[i] == k) {
								this.chs.splice(i, 1);
								s = false;
							}
						}
						if (s) {
							this.chs.push(k);
						}
					} else {
						this.ch = k
					}
				}
			},
			chzuhe(k) {
				if (!this.sub) {
					if (!this.daans[k].ed) {
						if (this.nowCh == -1) {
							// 未选择
							for (var i = 0; i < this.ans.length; i++) {
								if (this.ans[i].val == '') {
									this.daans.splice(k, 1, {
										val: this.daans[k].val,
										ed: true
									});
									this.ans.splice(i, 1, {
										val: this.daans[k].val,
										k: k
									});
									return;
								}
							}
						} else {
							//已选择
							if (this.ans[this.nowCh].val == '') {
								this.daans.splice(k, 1, {
									val: this.daans[k].val,
									ed: true
								});
								this.ans.splice(this.nowCh, 1, {
									val: this.daans[k].val,
									k: k
								});
							} else {
								this.daans.splice(k, 1, {
									val: this.daans[k].val,
									ed: true
								});
								this.daans.splice(this.ans[this.nowCh].k, 1, {
									val: this.ans[this.nowCh].val,
									ed: false
								});
								this.ans.splice(this.nowCh, 1, {
									val: this.daans[k].val,
									k: k
								});
							}
						}
					}
				}
			},
			delZuheans() {
				if (this.nowCh == -1) {
					// 未选择
					for (var i = this.ans.length - 1; i >= 0; i--) {
						if (this.ans[i].val != '') {
							this.daans.splice(this.ans[i].k, 1, {
								val: this.ans[i].val,
								ed: false
							});
							this.ans.splice(i, 1, {
								val: '',
								k: -1
							});
							return;
						}
					}
				} else {
					//以选择
					if (this.ans[this.nowCh].val != '') {
						this.daans.splice(this.ans[this.nowCh].k, 1, {
							val: this.ans[this.nowCh].val,
							ed: false
						});
						this.ans.splice(this.nowCh, 1, {
							val: '',
							k: -1
						});
					}
				}
			},
			subZuhe() {
				if (!this.sub) {
					this.sub = true;
					let out = '';
					this.ans.forEach(a => {
						if (a.val != '') {
							out += a.val
						}
					});
					uni.request({
						url: this.$api + '/stock/subAnswer',
						data: {
							pid: uni.getStorageSync('stuId'),
							id: this.topicId,
							timeCost: new Date() - this.thisTopicstart.getTime(),
							answer: out
						},
						success: res => {
							function out(a) {
								for (let s in a) {
									if (typeof a[s] === 'object') {
										out(a[s])
									} else {
										console.log(s);
										console.log(a[s]);
									}
								}
							}
							if (res.data.status == 0) {
								out(res.data)
							}
						}
					})
				}
			},
			subQita() {
				if (!this.sub) {
					this.sub = true;
					let out = '';
					if (this.isduoxuan) {
						this.chs.forEach(a => {
							out += this.anss[a]
						});
					} else {
						out += this.anss[this.ch]
					}
					uni.request({
						url: this.$api + '/stock/subAnswer',
						data: {
							pid: uni.getStorageSync('stuId'),
							id: this.topicId,
							timeCost: new Date() - this.thisTopicstart.getTime(),
							answer: out
						},
						success: res => {
							function out(a) {
								for (let s in a) {
									if (typeof a[s] === 'object') {
										out(a[s])
									} else {
										console.log(s);
										console.log(a[s]);
									}
								}
							}
							if (res.data.status == 0) {
								out(res.data)
							}
						}
					})
				}

			},
			setTopic(topic) {
				this.sub = false;
				this.nowTopicNum++;
				this.nowTopicNumstr = this.numToStr(this.nowTopicNum)
				this.topicName = topic.name;
				this.topicId = topic.id;
				this.thisTopicstart=new Date();
				this.timeCost = 30;
				this.timeCostIn = setInterval(() => {
					this.timeCost--;
				}, 1000)
				let newone = [...topic.xuanx];
				let o = []
				if (topic.type == '组合题') {
					this.iszuhe = true;
					if (topic.xuanx.length == 12) {
						this.isqiyan = true;
						this.ans = [{
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}];
					} else {
						this.isqiyan = false;
						this.ans = [{
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}, {
							val: '',
							k: -1
						}];
					}

					this.nowCh = -1;
					while (newone.length > 0) {
						o.push({
							val: newone.splice(Math.floor(Math.random() * newone.length), 1)[0],
							ed: false
						})
					}
					this.daans = o;
				} else if (topic.type == '多选题' || topic.type == '填空题') {
					this.isduoxuan = true;
					this.iszuhe = false;
					this.chs = [];
					this.anss = [];
					while (newone.length > 0) {
						o.push(newone.splice(Math.floor(Math.random() * newone.length), 1)[0])
					}
					this.anss = o;
				} else {
					this.isduoxuan = false;
					this.iszuhe = false;
					this.ch = -1;
					this.anss = [];
					while (newone.length > 0) {
						o.push(newone.splice(Math.floor(Math.random() * newone.length), 1)[0])
					}
					this.anss = o;
				}
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

<style scoped lang="scss">
	.root {
		position: relative;
		width: 1202upx;
		height: 706upx;
		overflow: hidden;
		display: flex;
		justify-content: center;

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;

			.view_navigation {
				height: 25upx;
			}

			.logo {
				height: calc(100% - 25upx);
				width: 100%;
			}
		}

		.content {
			.ched {
				opacity: 0.3;
			}

			width: 850upx;
			height: 100%;
			z-index: 2;
			position: relative;
			top: 25upx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.ans {
				margin-top: 14upx;
				display: flex;
				position: relative;
				left: 80upx;

				.one {
					width: 60upx;
					height: 60upx;
					border-radius: 5upx;
					margin-right: 30upx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FBAF18;
					font-size: 36px;
				}

				.no {
					border: 2upx solid rgba(0, 0, 0, 0.4);
				}

				.ch {
					border: 2upx solid rgba(251, 175, 24, 0.7);
					box-shadow: 0 0 30upx 2upx #FBAF18;
				}

				.del_img {
					width: 150upx;
					height: 75upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.daan {
				width: 360upx;
				height: 360upx;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.one {
					width: calc(100% / 3);
					height: calc(100% / 3);
					font-size: 36upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.b1 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: calc(100% / 3);
				}

				.b2 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: calc(100% / 3 * 2);
				}

				.b3 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3);
				}

				.b4 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3 * 2);
				}
			}

			.daan2 {
				width: 480upx;
				height: 360upx;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.one {
					width: 120upx;
					height: 120upx;
					font-size: 36upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.b1 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 120upx;
				}

				.b2 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 240upx;
				}

				.b5 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 360upx;
				}

				.b3 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3);
				}

				.b4 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3 * 2);
				}
			}

			.xuanzedaan {
				width: 80%;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				height: 400upx;

				.one {
					position: relative;
					width: 40%;
					margin-top: 10upx;
					margin-left: 50upx;

					.ch_img {
						position: absolute;
						width: 62upx;
						height: 62upx;
						left: -20upx;
						top: -6upx;
					}
				}

			}

			.sure_btn {
				position: absolute;
				bottom: 60upx;
				width: 300upx;
				height: 80upx;
				background: linear-gradient(270deg, rgba(250, 173, 20, 1) 0%, rgba(255, 193, 68, 1) 100%);
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0upx 3upx 6upx rgba(250, 174, 22, 1);
				border-radius: 50upx;
				font-size: 30upx;
			}

			.subed_btn {
				position: absolute;
				bottom: 60upx;
				width: 300upx;
				height: 80upx;
				background: linear-gradient(270deg, #8c8c8c 0%, #919191 100%);
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0upx 3upx 6upx #8c8c8c;
				border-radius: 50upx;
				font-size: 30upx;
				color: #ffffff;
			}

			.daojishi {
				position: absolute;
				bottom: 20upx;
				font-size: 22upx;
				z-index: 3;
			}
		}
	}
</style>
