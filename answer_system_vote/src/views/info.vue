<template>
	<div>
		<div style="position: absolute;top: 0;right: 0;color: white;cursor: pointer;z-index: 99999999999999999999999999;"
		 @click="toindex"><span>回到首页</span></div>
		<div class="center">
			<div class="head_back">
				<img :src="back" alt="">
			</div>
			<div class="centent">
				<span class="tongzhi" v-if="gonggao.length!=0">重要通知：</span>
				<scroll scrollType="scroll-left-linear"></scroll>
				<div class="video_div" @click="showcontrols">
					<!-- webkit-playsinline="true" playsinline="true" -->
					<video controls :poster="stuInfo.headUrl" preload="none" x5-video-player-fullscreen="true" webkit-playsinline="true"
					 x-webkit-airplay="true" playsinline="true" x5-playsinline :src="stuInfo.videoUrl">您的浏览器不支持 video 标签。</video>
					<!-- <video v-if="!showc" :src="" ></video>
					<video v-else :src="stuInfo.videoUrl" controls autoplay></video> -->
				</div>
				<div class="info">
					<div class="stu_info">
						<div class="head" :style="'background-image: url('+stuInfo.headUrl+');'"></div>
						<div class="info">
							<span class="s1"><span style="color: #FCD363;">{{stuInfo.name}}</span> | <span style="font-size:1.4rem ;color: #A01C19;">选手编号:{{stuInfo.id}}</span></span>
							<span class="s2">{{stuInfo.grade}} | {{stuInfo.school}}</span>
						</div>
					</div>
					<div class="rank_info">
						<span class="s1">活动结束倒计时</span>
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
						<span class="s2">已有{{jssl}}名选手书写家书</span>
					</div>
					<div v-if="goodletter!=null" class="good">
						<p>今日优秀家书</p>
						<div class="good_cl" @click="togood">
							<div class="head" :style="'background-image: url('+goodletter.head+');'"></div>
							<div class="infos">
								<span>{{goodletter.stuName}}的家书</span>
								<span style="color: #E30000;">+1000上榜值</span>
							</div>
							<div class="r"></div>
						</div>
					</div>
					<div class="content">
						<div v-if="jiashu!=null" class="have">
							<p><span v-html="jiashu"></span></p>
						</div>
						<div v-else class="none">
							<img :src="juanzhou">
							<span @click="towl">【 请给孩子写一份家书 】</span>
							<p>优秀家书将会为选手增加1000上榜值，有机会在复赛、决赛现场展示并在电视节目中播出</p>
						</div>
					</div>
				</div>
				<div class="relative">
					<div class="title">
						<span class="s1">亲友助力</span>
						<span class="s2">已有{{all}}次亲友助力</span>
					</div>
					<div class="infos">
						<div class="info" v-for="u in toupiao" :key="u.id">
							<div class="head_div" :style="'background-image: url('+ u.head +')'"></div>
							<div class="xiangqin">
								<div><span>{{u.shenf!=''?u.shenf:u.tname}}</span><span>{{u.date}}</span></div>
								<span>为 {{stuInfo.name}} 增加了 {{u.num}} 上榜值</span>
							</div>
						</div>
					</div>
					<!-- <div class="loadmore">
						<span @click="loadMore">更多……</span>
					</div> -->
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

	import scroll from '../components/scrollText.vue'
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

			// 选手信息
			this.getuser();
			// 充值方式
			this.$http.post('/vote/goods').then(res => {
				if (res) {
					this.chongzhifangshi = res.data;
				}
			});
			// 结束时间
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
			// 投票记录
			this.$http.post('/vote/votes', this.$qs.stringify({
				pid: userid
			})).then(res => {
				if (res) {
					if (res.status == 0) {
						this.toupiao = res.data;
						this.all = res.pager.total_count;
					}
				}
			});
			// 家书
			this.$http.post('/vote/letter', this.$qs.stringify({
				id: userid
			})).then(res => {
				if (res) {
					if (res.status == 0) {
						this.jiashu = res.data.content
					}
				}
			});
			// 家书数量
			this.$http.post('vote/countLet').then(res => {
				if (res) {
					if (res.status == 0) {
						this.jssl = res.data
					}
				}
			});
			// 优秀家书
			this.$http.post('/vote/letter').then(res => {
				if (res) {
					if (res.status == 0) {
						this.goodletter = res.data
					}
				}
			});
			// openid那一堆
			let that = this;
			(function() {
				let code = that.getUrlParam('code');
				if (that.$store.getters.userInfo == null) {
					let o = that.$utils.getcookie('weixinInfo');
					if (o != '') {
						that.$store.commit('userInfo', that.$qs.parse(o));
					} else {
						if (code == null) {
							let urls ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx48c6ea54e0a3e9c7&redirect_uri=http%3a%2f%2ftp.nzjykj.com%2findex%2f%23%2finfo&response_type=code&scope=snsapi_userinfo&state=' + userid + '#wechat_redirect';
							location.href = urls;
						} else {
							that.$http.post('/vote/get_usertoken', that.$qs.stringify({
								code: code
							})).then(res => {
								if (res) {
									that.$store.commit('userInfo', res.data);
									that.$utils.setCookie('weixinInfo', that.$qs.stringify(res.data))
								}
							});
						}
					}
				}
				// 选手关系
				that.$http.post('/vote/basisInfo', that.$qs.stringify({
					id: 3
				})).then(res => {
					if (res) {
						that.guanxi = res.data.content;
						that.guanxi.unshift(that.$store.getters.userInfo.nickname);
					}
				});
			})()
			this.authorization(); //授权
			wx.ready(function() {
				if (wx.updateAppMessageShareData) {
					wx.updateAppMessageShareData({
						title: '国学文化交流大使', // 分享标题
						desc: '国学大会选手【' + that.stuInfo.name + '】，正在践行国学精神，落实国学行动，请帮TA加油', // 分享描述
						link: 'http://tp.nzjykj.com/index?state=' + that.stuInfo.id + '/#/info',
						imgUrl: that.$url + that.stuInfo.headUrl, // 分享图标
					});
				} else {
					wx.onMenuShareAppMessage({
						title: '国学文化交流大使', // 分享标题
						desc: '国学大会选手【' + that.stuInfo.name + '】，正在践行国学精神，落实国学行动，请帮TA加油', // 分享描述
						link: 'http://tp.nzjykj.com/index?state=' + that.stuInfo.id + '/#/info',
						imgUrl: that.$url + that.stuInfo.headUrl, // 分享图标
					});
				}
				if (wx.updateTimelineShareData) {
					wx.updateTimelineShareData({
						title: '国学大会选手【' + that.stuInfo.name + '】，正在践行国学精神，落实国学行动，请帮TA加油', // 分享标题
						link: 'http://tp.nzjykj.com/index?state=' + that.stuInfo.id + '/#/info', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.$url + that.stuInfo.headUrl, // 分享图标
					})
				} else {
					wx.onMenuShareTimeline({
						title: '国学大会选手【' + that.stuInfo.name + '】，正在践行国学精神，落实国学行动，请帮TA加油', // 分享标题
						link: 'http://tp.nzjykj.com/index?state=' + that.stuInfo.id + '/#/info', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: that.$url + that.stuInfo.headUrl, // 分享图标
					});
				}
			});
		},
		data() {
			return {
				back,
				juanzhou,
				close,
				all: 0,
				showc: false,
				stuInfo: {
					name: '',
					grade: '',
					school: '',
					face: '',
					videoUrl: '',
					headUrl: ''
				},
				gonggao: '',
				guanxi: [],
				chongzhifangshi: [],
				chguanxi: 0,
				chchongzhi: -1,
				userId: '',
				toupiao: [],
				end: new Date(),
				now: new Date(),
				jiashu: null,
				chongzhi: false,
				test: null,
				jssl: 0,
				goodletter: null,
				czed:false
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
						this.stuInfo = res.data;
					}
					loadingInstance.close();
				});
			},
			recharge() {
				if (this.chguanxi == -1 || this.chchongzhi == -1) {
					this.$notify({
						title: '提示',
						dangerouslyUseHTMLString: true,
						iconClass: 'el-icon-warning',
						message: '<strong>请选择与选手关系或助力方式</strong>',
						showClose: false
					});
					return;
				}
				if(this.czed)return;
				this.czed = true;
				this.$http.post('/vote/wxPay', this.$qs.stringify({
					pid: this.userId,
					gid: this.chongzhifangshi[this.chchongzhi].id,
					openid: this.$store.getters.userInfo.openid,
					shenf: this.guanxi[this.chguanxi],
					head: this.$store.getters.userInfo.headimgurl,
					tname: this.$store.getters.userInfo.nickname
				})).then(res => {
					if (res) {
						WeixinJSBridge.invoke('getBrandWCPayRequest', res,function(ress) {
								this.test = ress;

								if (ress.err_msg == "get_brand_wcpay_request:ok") {
									// 使用以上方式判断前端返回,微信团队郑重提示：
									//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
									this.chongzhi = false;
									this.getuser();
								}
						});
						this.czed = false;
					}
				});
			},
			authorization() {
				let sq = this.$utils.getcookie('wxsqxq');
				if (sq != '') {
					let sqo = this.$qs.parse(sq);
					wx.config({
						debug: false,
						jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'updateTimelineShareData',
							'onMenuShareTimeline'
						],
						...sqo
					});
					return;
				}
				this.$http.post('/vote/getSignpackage', this.$qs.stringify({
					url: window.location.href.split('#')[0]
				})).then(res => {
					if (res) {
						if (res.status == 800) {
							this.$http.post('/vote/getJsapiTicket').then(res => {
								if (res.status != 0) {
									return;
								} else {
									setTimeout(() => {
										this.authorization();
									}, 4000)
								}
							})
						} else {
							this.$utils.setCookie('wxsqxq', this.$qs.stringify(res.data), 0.0625);
							wx.config({
								debug: false,
								jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'updateTimelineShareData',
									'onMenuShareTimeline'
								],
								...res.data
							});
						}
					}
				});
			},
			toindex() {
				location.href = this.$url + '/index';
			},
			towl() {
				this.$router.push({
					name: 'writeLetter',
					params: this.stuInfo
				});
			},
			togood() {
				this.$router.push({
					name: 'goodLetter',
				});
			}
		},
		components: {
			scroll
		},
	}
</script>

<style scoped lang="scss">
	.center {
		height: calc(100% - 90px);
		background-color: white;
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
			overflow-x: hidden;
			top: -150px;
			z-index: 2;
			padding-top: 24px;

			.tongzhi {
				color: #FCD363;
				font-size: 1.6rem;
				width: 100%;
				overflow: hidden;
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
				padding-bottom: 32px;

				.stu_info {
					height: 5rem;
					display: flex;
					margin-top: 26px;

					.head {
						width: 6rem;
						height: 5rem;
						border-radius: 9990px;
						background-size: 250%;
						background-position: center 10%;
						margin-left: 5px;
						margin-right: 10px;
						border: 1px solid #A01C19;
					}

					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

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
				}

				.rank_info {
					width: 80%;
					margin-left: 10%;
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
					width: 80%;
					margin-left: 10%;
					box-sizing: border-box;
					padding: 0 4px;
					margin-top: 20px;
					display: flex;
					justify-content: space-between;

					.num {
						width: 80px;
						height: 80px;
						border-radius: 45px;
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

				.good {
					width: 100%;

					p {
						color: #E2087C;
						font-size: 1.2rem;
						font-weight: 900;
					}

					.good_cl {
						width: 100%;
						height: 60px;
						margin-top: 5px;
						box-sizing: border-box;
						border: 2px solid #C6C6C6;
						display: flex;
						border-radius: 5px;

						.head {
							width: 45px;
							height: 45px;
							margin: 6px 10px;
							border-radius: 25px;
							background-position: center;
							background-size: cover;
						}

						.infos {
							margin-left: 10px;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							box-sizing: border-box;
							padding: 5px 0;
							font-size: 1.2rem;
						}

						.r {}
					}
				}

				.content {
					width: 100%;
					margin-top: 10px;
					border: 2px solid rgba(200, 200, 200, 0.6);
					box-sizing: border-box;
					border-radius: 10px;
					padding: 10px;

					.have {
						width: 100%;
						height: 100%;
						background-color: #ffffff;
						border-radius: 5px;
						font-size: 1.4rem;
					}

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
						display: flex;
						border: none;

						.head_div {
							width: 60px;
							border-radius: 30px;
							background-position: auto;
							background-size: 100%
						}

						.xiangqin {
							width: calc(100% - 60px);
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							div {
								width: 100%;
								display: flex;
								justify-content: space-between;
							}
						}
					}
				}

				.loadmore {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 16px;
					color: #A01C19;
					font-weight: 900;
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
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					font-size: 1.6rem;
					border-radius: 5px;

					span {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap
					}
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
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					font-size: 1.6rem;
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

		.note {
			color: #008000;
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
	}
</style>
