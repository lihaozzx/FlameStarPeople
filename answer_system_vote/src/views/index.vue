<template>
	<div>
		<div class="first_div">
			<div class="zhuangyuanbang">
				<img class="bang_img" :src="bang">
				<img class="niao_img" :src="niao">
				<img class="yun_img" :src="yun">
			</div>
			<div class="seaech_div" @click="choseSearch">
				<form @submit.prevent action="#">
					<input id="searchshuru" class="search_input" v-model="search" @keypress="searchFun" placeholder="搜索孩子姓名或编号" type="search" />
				</form>
				<!-- <input type="text" class="search_input" placeholder="搜索孩子姓名或编号" @> -->
			</div>
			<div class="scroll_yunwen" :style="'background-position-x: '+ yunwenscroll/20 +'%;'"></div>
		</div>
		<div class="two_div">
			<div class="paibian_div">
				<img :src="paibian">
			</div>
			<div class="bangdan">
				<img class="head" src="../assets/pub-bg-1.png">
				<div class="body">
					<img :src="paimin" class="paimin">
					<div class="ninaji">
						<div class="nian" v-for="(k,i) in nianjibas" :key="i" :class="ch==i?'active':'nochose'" @click="changeShownianji(i)">
							<span>{{k}}</span>
						</div>
					</div>
					<div class="stuInfo" v-for="(k,i) in show" :key="k.id" :class="i==stuInfo.length-1?'stuInfoLast':''" @click="toInfo(k.id)">
						<div class="stu_head_div">
							<div class="stu_head" :style="'background-image: url('+k.headUrl+');'"></div>
							<img :src="i==0?zhuangyuan:i==1?bangyan:i==2?tanhua:jinshi" class="img2">
						</div>
						<div class="stu_info">
							<span class="s1">{{k.name}}</span>
							<span class="s2">{{k.grade}} | {{k.school}}</span>
							<div class="info">
								<div style="width: 75%;">
									<span>上榜值：{{k.face}}</span>
								</div>
								<div>
									<span>排名：{{i+1}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="seeAll">
					<span @click="toAll">查看全部参赛人员 >></span>
				</div>
				<img class="foot" src="../assets/pub-bg-3.png">
			</div>
		</div>
		<div class="three_div">
			<div class="img_div">
				<img :src="guize">
			</div>
			<div class="video_div">
				<video controls="controls" preload="auto" x5-video-player-fullscreen="true" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-playsinline :src="shipin" :poster="fenmian">您的浏览器不支持 video 标签。</video>
			</div>
			<div class="guize">
				<div class="body">
					<div class="rule_div">
						<img src="../assets/rule.png" class="img1">
						<img src="../assets/logo-red.png" class="img2">
						<img src="../assets/banner-bg-bird.png" class="img3">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bang from '@/assets/zhuangyuanbang.png'
	import niao from '@/assets/banner-bg-big-bird.png'
	import yun from '@/assets/cloud.png'
	import paibian from '@/assets/zhuangyuanbang2.png'
	import paimin from '@/assets/rank.png'
	import zhuangyuan from '@/assets/zhuangyuan.png'
	import bangyan from '@/assets/bangyan.png'
	import tanhua from '@/assets/tanhua.png'
	import jinshi from '@/assets/jinshi.png'
	import guize from '@/assets/rule-hd.png'
	import fenmian from '@/assets/video_img.jpg'

	import shipin from '@/assets/WeChat_20190422144635.mp4'
	export default {
		computed: {
			show() {
				return this.stuInfo.filter(e => this.ch == -1 || e.grade == this.nianjibas[this.ch])
			}
		},
		beforeMount() {
			this.ch = 0;
		},
		created() {
			setInterval(() => {
				if (this.yunwenscroll > 300000) {
					this.yunwenscroll = 0;
				} else {
					this.yunwenscroll++;
				}
			}, 1);
			this.niaodong = setInterval(() => {
				if (this.niaodongqilai > 30) {
					clearInterval(this.niaodong);
					this.niaodong = setInterval(() => {
						if (this.niaodongqilai < -30) {
							clearInterval(this.niaodong);
						}
						this.niaodongqilai--;
					}, 1);
				}
				this.niaodongqilai++;
			}, 1);
			this.initInfo();
			this.getStudent();
			this.authorization();
			let that = this;
			wx.ready(function() {
				if (wx.updateAppMessageShareData) {
					wx.updateAppMessageShareData({
						title: '立德树人工程青少年国学大会', // 分享标题
						desc: '国学文化交流大使评选活动', // 分享描述
						link: 'http://tp.nzjykj.com/index',
						imgUrl: that.$url + '/uploads/stu/logo.png', // 分享图标
					});
				} else {
					wx.onMenuShareAppMessage({
						title: '立德树人工程青少年国学大会', // 分享标题
						desc: '国学文化交流大使评选活动', // 分享描述
						link: 'http://tp.nzjykj.com/index',
						imgUrl: that.$url + '/uploads/stu/logo.png', // 分享图标
					});
				}
			});
		},
		data() {
			return {
				bang,
				niao,
				yun,
				paibian,
				paimin,
				zhuangyuan,
				bangyan,
				tanhua,
				jinshi,
				guize,
				fenmian,
				shipin,
				niaodong: null,
				niaodongqilai: 0,
				yunwenscroll: 0,
				search: '',
				height: innerHeight,
				nianjibas: [],
				ch: -1,
				stuInfo: []
			};
		},
		methods: {
			// 组件的方法
			searchFun(e) {
				if (e.keyCode == 13) {
					this.$router.push({
						path: 'allStu',
						query: {
							key: this.search
						}
					});
				}
			},
			choseSearch() {
				document.getElementById("searchshuru").focus();
			},
			changeShownianji(k) {
				this.ch = k
			},
			toAll() {
				this.$router.push({
					name: 'allstu'
				})
			},
			initInfo() {
				this.$http.post('/vote/basisInfo', this.$qs.stringify({
					id: 4
				})).then(res => {
					if (res) {
						this.nianjibas.push(...res.data.content);
					}
				})
			},
			getStudent() {
				this.$http.post('/vote/players').then(res => {
					if (res) {
						this.stuInfo = res.data
					}
				})
			},
			toInfo(id) {
				let urls =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx48c6ea54e0a3e9c7&redirect_uri=http%3a%2f%2ftp.nzjykj.com%2findex%2f%23%2finfo&response_type=code&scope=snsapi_userinfo&state=' +
					id + '#wechat_redirect';
				location.href = urls;
				// 跳转详情 上线后需要切换到跳转授权
				// this.$router.push({path:'info',query:{userId:id}});
			},
			authorization() {
				this.$http.post('/vote/getSignpackage', this.$qs.stringify({
					url: window.location.href.split('#')[0]
				})).then(res => {
					if (res) {
						if (res.status == 800) {
							this.$http.post('/vote/getJsapiTicket').then(res => {
								if (res) {
									this.authorization();
								}
							})
						} else {
							wx.config({
								debug: false,
								jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage'],
								...res.data
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.first_div {
		width: 100%;
		min-height: 100vh;
		position: relative;

		.zhuangyuanbang {
			position: relative;
			padding-bottom: 20px;

			.bang_img {
				width: 100%;
			}

			.niao_img {
				width: 50%;
				position: absolute;
				left: 0;
				top: 27%;
			}

			.yun_img {
				width: 28%;
				position: absolute;
				right: -3%;
				bottom: 22%;
			}
		}

		.seaech_div {
			width: 76%;
			height: 50px;
			background-image: url(../assets/search-input-bg.png);
			background-repeat: no-repeat;
			background-size: 100%;
			position: absolute;
			left: 12%;
			bottom: 12%;
			z-index: 9;

			form {
				height: 100%;
				display: flex;
				align-items: center;
				.search_input {
					position: relative;
					top: -1px;
					left: 22%;
					font-size: 1.6rem;
					color: #FCD363;
					border: none;
					background-color: rgba($color: #000000, $alpha: 0);
					outline: none;
				}

				.search_input::-webkit-input-placeholder {
					color: #FCD363;
				}
			}
		}

		.scroll_yunwen {
			width: 100%;
			height: 120px;
			position: absolute;
			bottom: -21px;
			background-image: url(../assets/yunwen.png);
			background-size: auto 100%;
			background-repeat: repeat-x;
		}
	}

	.two_div {
		min-height: 100vh;
		width: 100%;

		.paibian_div {
			width: 100%;

			img {
				width: 100%;
				position: relative;
				top: -30px;
			}
		}

		.bangdan {
			margin-top: 44px;
			width: 94%;
			margin-left: 3%;
			background-size: 100%;
			background-repeat: repeat-y;
			position: relative;

			.head {
				width: 100%;
				position: absolute;
				top: 0;
			}

			.body {
				padding: 60px 10px;
				background-image: url(../assets/pub-bg-2.png);
				background-size: 100%;
				padding-bottom: 180px;

				.paimin {
					width: 40%;
					position: relative;
					top: -40px;
					left: 30%;
				}

				.ninaji {
					width: 100%;
					height: 30px;
					display: flex;
					position: relative;
					top: -20px;
					font-size: 1.4rem;
					flex-wrap: wrap;

					.nian {
						width: 18%;
						margin: 0 3%;
						height: 30px;
						display: flex;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						white-space: nowrap;
						margin-bottom: 3px;
					}

					.nochose {
						background-color: #F9F1CA;
						color: #AB1F1E;
						border: 2px solid #ab1f1e;
					}

					.active {
						background-color: #AB1F1E;
						color: #FCD363;
						border: 2px solid rgba(253, 210, 107, 1);
					}
				}

				.stuInfo {
					width: 100%;
					height: 100px;
					margin-bottom: 5px;
					display: flex;

					.stu_head_div {
						width: 33%;
						padding-top: 33%;
						// height: 100px;
						position: relative;

						.stu_head {
							width: 80%;
							padding-top: 80%;
							position: absolute;
							top: 0;
							margin: 10px 2%;
							border-radius: 90px;
							background-color: #F9F1CA;
							overflow: scroll;
							display: flex;
							justify-content: center;
							align-items: center;
							background-position: center;
							background-size: cover;
							border: solid 2px #ab1f1e;

							.img1 {
								width: 100%;
								position: absolute;
								top: 0;
							}

						}

						.img2 {
							position: absolute;
							left: -12%;
							width: 110%;
							bottom: 5%;
						}
					}

					.stu_head::-webkit-scrollbar {
						display: none;
					}

					.stu_info {
						width: calc(100% - 80px - 8%);
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin: 10px 2%;

						.s1 {
							color: #AB1F1E;
							font-weight: 900;
							font-size: 1.8rem;
						}

						.s2 {
							font-size: 1.2rem;
						}

						.info {
							width: 100%;
							font-size: 1.2rem;
							display: flex;
							border-radius: 5px;

							div {
								width: 50%;
								box-sizing: border-box;
								padding: 2px 5px;
								align-items: center;
								justify-content: center;
								display: flex;
								border: 1px solid rgba(171, 31, 30, 1);
								border-radius: 3px 0 0 3px;

								span {
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}

							div:nth-of-type(2) {
								border-radius: 0 3px 3px 0;
								border-left: none;
							}
						}
					}

				}

				.stuInfoLast {
					width: 94.4%;
					position: absolute;
					z-index: 99;
				}
			}

			.foot {
				width: 100%;
				position: absolute;
				bottom: 0;
			}

			.seeAll {
				width: 100%;
				text-align: center;
				font-size: 1.4rem;
				position: absolute;
				z-index: 999;
				left: 0;
				bottom: 10px;
				color: #AB1F1E;

				span {
					cursor: pointer;
				}
			}
		}
	}

	.three_div {
		width: 100%;
		margin-top: 40px;
		margin-bottom: 50px;

		.img_div {
			width: 100%;

			img {
				width: 100%;
			}
		}

		.video_div {
			margin-top: 24px;
			width: 90%;
			margin-left: 5%;
			border: #AB1F1E solid 5px;
			padding: 0;

			video {
				width: 100%;
			}
		}

		.guize {
			margin-top: 44px;
			width: 94%;
			margin-left: 3%;
			background-image: url(../assets/pub-bg-1.png), url(../assets/pub-bg-3.png);
			background-position: top, bottom;
			background-repeat: no-repeat, no-repeat;
			background-size: 100%;
			position: relative;
			padding: 8px 0 160px 0;

			.body {
				padding: 0px 10px;
				background-image: url(../assets/pub-bg-2.png);
				background-size: 100%;

				.rule_div {
					width: 100%;
					font-size: 2rem;
					font-weight: 900;
					position: relative;
					top: 10px;
					color: #B22D2C;

					.img1 {
						width: 100%;
					}

					.img2 {
						width: 50%;
						position: absolute;
						bottom: -160px;
						left: 25%;
					}

					.img3 {
						width: 50%;
						position: absolute;
						bottom: -120px;
						left: -2%;
					}
				}

			}
		}
	}
</style>
