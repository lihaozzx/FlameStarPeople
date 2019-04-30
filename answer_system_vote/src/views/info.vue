<template>
	<div>
		<div class="center">
			<div class="head_back">
				<img :src="back" alt="">
			</div>
			<div class="centent">
				<span class="tongzhi">重要通知：字段字段字段字段字段字段字段字段字段字段字段字段字</span>
				<div class="video_div" @click="showcontrols">
					<video v-if="!showc" :src="stuInfo.videoUrl"></video>
					<video v-else :src="stuInfo.videoUrl" controls></video>
				</div>
				<div class="info">
					<div class="stu_info">
						<span class="s1">{{stuInfo.name}}</span>
						<span class="s2">{{stuInfo.grade}}|{{stuInfo.school}}</span>
					</div>
					<div class="rank_info">
						<span class="s1">赛区状元榜结束倒计时</span>
						<span class="s2">{{showtime}}</span>
					</div>
					<div class="num_info">
						<div class="num">
							<span class="s1">上榜值</span>
							<span class="s2">{{stuInfo.face}}</span>
						</div>
						<div class="num">
							<span class="s1">当前排名</span>
							<span class="s2">{{stuInfo.pai}}</span>
						</div>
					</div>
				</div>
				<div class="book">
					<div class="title">
						<span class="s1">国学家书</span>
						<span class="s2">已有7777名选手书写家书</span>
					</div>
					<div class="content">
						<div v-if="jiashu!=null" class="have">
							<p>{{jiashu}}</p>
						</div>
						<div v-else class="none">
							<img :src="juanzhou">
							<span>【 请给孩子写一份家书 】</span>
							<p>优秀家书将有机会在复决赛现场展示并在电视节目中播出，同时将有机会获得知名书法家《国学家书》真迹。</p>
						</div>
					</div>
				</div>
				<div class="relative">
					<div class="title">
						<span class="s1">亲友关爱</span>
						<span class="s2">已有{{toupiao.length}}名亲友加油</span>
					</div>
					<div class="infos">
						<div class="info">

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn_bottom">
			<div class="btn" @click="paper">每日一卷</div>
			<div class="btn" @click="chongzhi = true">助他上榜</div>
		</div>
		<transition name="fade">
			<div v-show="chongzhi" class="filter_rel_div">
				<img :src="close" class="close" @click="chongzhi = false">
				<div class="guanxi_c">
					<span>你是选手的：</span>
					<div class="guanxis">
						<div v-for="(k,i) in guanxi" :key="k" :class="chguanxi==i?'ch':'notch'" @click="chgx(i)"><span>{{k}}</span></div>
					</div>
				</div>
				<div class="chongzhi_leixin">
					<span>请选择支持上榜值：</span>
					<div class="leixins">
						<div v-for="(k,i) in chongzhifangshi" :key="k.id" :class="chchongzhi==i?'ch':'notch'" @click="chcz(i)"><span>{{k.name}}</span></div>
					</div>
				</div>
				<div class="needpay">需支付{{chchongzhi==-1?0:chongzhifangshi[chchongzhi].price}}元</div>
				<div class="search_btn" @click="recharge">
					<span>助TA上榜</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import back from '@/assets/timg-(2).png'
	import juanzhou from '@/assets/juanzhou.png'
	import close from '@/assets/close.png'

	import shipin from '@/assets/WeChat_20190422144635.mp4'
	export default {
		computed: {
			showtime() {
				let o = '';
				let mm = this.end.getTime() - this.now.getTime();
				if (mm < 0) return '已经结束';
				o = parseInt(mm / (24 * 60 * 60 * 1000)) + '天' + (parseInt((mm % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)) < 10 ?
					'0' + parseInt((mm % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)) : parseInt((mm % (24 * 60 * 60 * 1000)) / (60 *
						60 * 1000))) + '时' + (parseInt((mm % (60 * 60 * 1000)) / (60 * 1000)) < 10 ? '0' + parseInt((mm % (60 * 60 *
					1000)) / (60 * 1000)) : parseInt((mm % (60 * 60 * 1000)) / (60 * 1000))) + '分' + (parseInt((mm % (60 * 1000)) / (
					1000)) < 10 ? '0' + parseInt((mm % (60 * 1000)) / (1000)) : parseInt((mm % (60 * 1000)) / (1000))) + '秒'
				return o;
			}
		},
		created() {
			let userid = this.getUrlParam('state');
			this.userId = userid;
			let code = this.getUrlParam('code');

			if (this.$store.getters.userInfo == null) {
				let o = this.$utils.getcookie('weixinInfo');
				if (o != '') {
					this.$store.commit('userInfo', this.$qs.parse(o));
					return
				}
				this.$http.post('/vote/get_usertoken', this.$qs.stringify({
					code: code
				})).then(res => {
					if (res) {
						this.$store.commit('userInfo', res.data);
						this.$utils.setCookie('weixinInfo', this.$qs.stringify(res.data))
					}
				});
			}

			this.$http.post('/vote/goods').then(res => {
				if (res) {
					this.chongzhifangshi = res.data;
				}
			});

			this.$http.post('/vote/basisInfo', this.$qs.stringify({
				id: 5
			})).then(res => {
				if (res) {
					this.end = new Date(res.data.content);
					setInterval(() => {
						this.now = new Date();
					}, 1000)
				}
			});
			this.$http.post('/vote/basisInfo', this.$qs.stringify({
				id: 3
			})).then(res => {
				if (res) {
					this.guanxi = res.data.content;
				}
			})
			this.getuser();
			this.$http.post('/vote/votes', this.$qs.stringify({
				pid: userid
			})).then(res => {
				if (res) {
					this.toupiao = res.data
				}
			});
		},
		data() {
			return {
				back,
				juanzhou,
				close,
				shipin,
				showc: false,
				stuInfo: {
					name: '',
					grade: '',
					school: '',
					face: '',
					videoUrl: ''
				},
				guanxi: [],
				chongzhifangshi: [],
				chguanxi: -1,
				chchongzhi: -1,
				userId: '',
				toupiao: [],
				end: new Date(),
				now: new Date(),
				jiashu: '啊啊啊滴滴滴滴滴滴滴多多多多多多多',
				chongzhi: false
			};
		},
		methods: {
			// 组件的方法
			showcontrols() {
				this.showc = !this.showc
			},
			paper() {
				this.$router.push({
					path: 'answer',
					query: {
						userId: this.userId
					}
				})
			},
			getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			chgx(k) {
				this.chguanxi = k
			},
			chcz(k) {
				this.chchongzhi = k
			},
			getuser() {
				let loadingInstance = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
				this.$http.post('/vote/playerinfo', this.$qs.stringify({
					id: this.userId
				})).then(res => {
					if (res) {
						this.stuInfo = res.data
					}
					loadingInstance.close();
				});
			},
			recharge() {
				this.$http.post('/vote/wxPay', this.$qs.stringify({
					pid: this.userId,
					gid: this.chongzhifangshi[this.chchongzhi].id,
					openid: this.$store.getters.userInfo.openid,
					shenf: this.guanxi[this.chguanxi],
					head: this.$store.getters.userInfo.headimgurl,
					tname: this.$store.getters.userInfo.nickname
				})).then(res => {
					if (res) {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', res,
							function(ress) {
								if (res.err_msg == "get_brand_wcpay_request:ok") {
									this.$http.post('/vote/ceshi', this.$qs.stringify(ress)).then(resss => {
										if (resss) {
											console.log(resss);
										}
									});
									this.chongzhi = false;
									this.getuser();
									// 使用以上方式判断前端返回,微信团队郑重提示：
									//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								}
							});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.center {
		height: calc(100% - 90px);
		background-color: white;
		margin-bottom: 90px;
		overflow-y: auto;

		.head_back {
			background-color: #A01C19;
			height: 150px;
			width: 100%;
			border-radius: 0 0 25% 25%;
			overflow: hidden;

			img {
				width: 100%;
				opacity: 0.2;
				position: relative;
				top: -30px;
			}
		}

		.centent {
			width: 85%;
			margin: 0 calc(15% / 2);
			position: relative;
			top: -150px;
			z-index: 2;
			padding-top: 24px;

			.tongzhi {
				color: #FCD363;
				font-size: 1.6rem;
			}

			.video_div {
				width: 100%;
				margin-top: 30px;

				video {
					width: 100%
				}
			}

			.info {
				width: 100%;
				border-bottom: 2px solid #dfdfdf;
				padding-bottom: 32px;

				.stu_info {
					display: flex;
					flex-direction: column;
					margin-top: 26px;

					.s1 {
						font-size: 1.6rem;
						font-weight: 900;
					}

					.s2 {
						margin-top: 6px;
						font-size: 1.4rem;
						color: rgba(0, 0, 0, 0.3);
					}
				}

				.rank_info {
					margin-top: 18px;
					height: 80px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					border: 2px solid rgba(171, 31, 30, 1);
					border-radius: 5px;

					.s1 {
						font-size: 1.4rem;
					}

					.s2 {
						font-size: 1.8rem;
						color: #AB1F1E;
					}
				}

				.num_info {
					width: 100%;
					box-sizing: border-box;
					padding: 0 4px;
					margin-top: 20px;
					display: flex;
					justify-content: space-between;

					.num {
						width: 120px;
						height: 120px;
						border-radius: 63px;
						border: 5px solid rgba(249, 241, 202, 1);
						background-color: #FEFAE9;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						.s1 {
							font-size: 1.4rem;
						}

						.s2 {
							font-size: 1.8rem;
							color: #AB1F1E;
						}
					}
				}
			}

			.book {
				width: 100%;
				border-bottom: 2px solid #dfdfdf;
				padding-bottom: 32px;

				.title {
					display: flex;
					flex-direction: column;
					margin-top: 26px;

					.s1 {
						font-size: 1.6rem;
						font-weight: 900;
					}

					.s2 {
						margin-top: 6px;
						font-size: 1.2rem;
						color: rgba(0, 0, 0, 0.3);
					}
				}

				.content {
					width: 100%;
					margin-top: 10px;
					border: 2px solid rgba(200, 200, 200, 0.6);
					box-sizing: border-box;
					border-radius: 10px;
					padding: 10px;

					.have {}

					.none {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;

						img {
							width: 50px;
						}

						span {
							border-bottom: 1px solid black;
							cursor: pointer;
							font-size: 14px;
							margin-top: 10px;
						}

						p {
							font-size: 12px;
							color: #95AAC9;
							margin: 10px 20px;
							text-align: center;
						}
					}
				}
			}

			.relative {
				width: 100%;
				border-bottom: 2px solid #dfdfdf;
				padding-bottom: 32px;

				.title {
					display: flex;
					flex-direction: column;
					margin-top: 26px;

					.s1 {
						font-size: 1.6rem;
						font-weight: 900;
					}

					.s2 {
						margin-top: 6px;
						font-size: 1.2rem;
						color: rgba(0, 0, 0, 0.3);
					}
				}

				.infos {
					width: 100%;
					margin-top: 14px;

					.info {
						width: 100%;
						height: 60px;
						background-color: #A01C19;
						display: flex;

						.head_img {
							width: 60px;
							height: 60px;
							border-radius: 30px;
							display: flex;
							align-items: center;
							justify-content: center;
							overflow: hidden;

							img {
								width: 100%;
							}
						}

						.fm_info {
							height: 100%;
							box-sizing: border-box;
							padding: 4px 0;
						}
					}
				}
			}
		}
	}

	.btn_bottom {
		width: 100%;
		height: 80px;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 18px;

		.btn {
			width: 150px;
			height: 45px;
			background: rgba(249, 241, 202, 1);
			opacity: 1;
			border-radius: 10px;
			font-size: 2rem;
			font-weight: 900;
			color: #AB1F1E;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btn:hover {
			transition: .5s ease all;
			background: rgba(229, 221, 182, 1);
			user-select: none;
		}

	}

	.filter_rel_div {
		width: 100%;
		background-color: white;
		border-radius: 20px 20px 0 0;
		position: fixed;
		bottom: 0;
		z-index: 9999999;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		border-top: 1px solid #95AAC9;
		padding: 50px 10px 100px 10px;

		.guanxi_c {
			display: flex;
			flex-direction: column;

			.guanxis {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 20%;
					margin: 4px 2.5%;
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					font-size: 1.8rem;
					border-radius: 5px;
				}

				.notch {
					border: 1px solid rgba(230, 230, 230, 1);
					color: #C6C6C6;
				}

				.ch {
					background-color: #AD2B29;
					border: 1px solid #F9F1CA;
					color: #F9F1CA;
				}
			}
		}

		.chongzhi_leixin {
			display: flex;
			flex-direction: column;

			.leixins {
				display: flex;
				flex-wrap: wrap;

				div {
					width: 48%;
					margin: 4px 1%;
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					font-size: 1.8rem;
					border-radius: 5px;
				}

				.notch {
					border: 1px solid rgba(230, 230, 230, 1);
					color: #C6C6C6;
				}

				.ch {
					background-color: #AD2B29;
					border: 1px solid #F9F1CA;
					color: #F9F1CA;
				}
			}
		}

		.needpay {
			font-size: 14px;
			color: #AB1F1E;
			width: 100%;
			text-align: center;
		}

		.close {
			width: 20px;
			height: 20px;
			position: absolute;
			right: 20px;
			top: 20px;
		}

		.search_btn {
			width: 86%;
			height: 50px;
			background-color: #F9F1CA;
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
			border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			font-weight: 900;
			color: #A01C19;
			position: absolute;
			bottom: 10px;
			left: 7%;
			cursor: pointer;
		}

	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s;
	}

	.fade-enter,
	.fade-leave-to {
		transform: translateY(100%);
		;
	}
</style>
