<template>
	<div>
		<div class="two_div">
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
							<img :src="name != ''&&i==0?zhuangyuan:i==1?bangyan:i==2?tanhua:jinshi" class="img2">
						</div>
						<div class="stu_info">
							<span class="s1">{{k.name}}</span>
							<span class="s2">{{k.grade}} | {{k.school}}</span>
							<div class="info">
								<div style="width: 75%;">
									<span>上榜值：{{k.face}}</span>
								</div>
								<div v-if="name == ''">
									<span>排名：{{i+1}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="seeAll" @click="toAll">
					<span>查看更多 >></span>
				</div>
				<img class="foot" src="../assets/pub-bg-3.png">
			</div>
		</div>
		<!-- <div class="filter_div" @click="searchFilter"><span>按条件筛选></span></div>
		<div style="height: 20px;"></div>
		<transition name="fade">
			<div v-show="flter" class="filter_rel_div">
				<img :src="close" class="close" @click="closeFliter">
				<input type="text" class="sein" v-model="name" placeholder="请输入学生姓名">
				<input type="text" class="sein" v-model="sname" placeholder="请输入学校名称">
				<div class="search_btn" @click="searchNow">
					<span>立即筛选</span>
				</div>
			</div>
		</transition> -->
	</div>
</template>

<script>
	import bang from '@/assets/zhuangyuanbang.png'
	import niao from '@/assets/banner-bg-big-bird.png'
	import yun from '@/assets/cloud.png'
	import paibian from '@/assets/timg.png'
	import paimin from '@/assets/rank.png'
	import zhuangyuan from '@/assets/zhuangyuan.png'
	import bangyan from '@/assets/bangyan.png'
	import tanhua from '@/assets/tanhua.png'
	import jinshi from '@/assets/jinshi.png'
	import guize from '@/assets/rule-hd.png'
	import fenmian from '@/assets/video_img.jpg'
	import close from '@/assets/close.png'

	export default {
		computed: {
			show() {
				return this.stuInfo.filter(e => this.ch == -1 || e.grade == this.nianjibas[this.ch])
			}
		},
		created() {
			this.name = this.$route.query.key == undefined ? '' : this.$route.query.key;
			this.initInfo();
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
				close,
				nowPage: 1,
				nianjibas: [],
				ch: -1,
				flter: false,
				name: '',
				sname: '',
				stuInfo: []
			};
		},
		methods: {
			// 组件的方法
			changeShownianji(k) {
				if (this.ch == k) {
					this.ch = -1
				} else {
					this.ch = k
				}
			},
			searchFilter() {
				this.flter = true;
			},
			closeFliter() {
				this.flter = false;
			},
			searchNow() {
				this.flter = false;
				this.nowPage = 1;
				this.stuInfo = [];
				this.getStudent();
			},
			initInfo() {
				this.$http.post('/vote/basisInfo', this.$qs.stringify({
					id: 4
				})).then(res => {
					if (res) {
						this.nianjibas = res.data.content;
						if (this.name != '') {
							this.$http.post('/vote/allplayers', this.$qs.stringify({
								name: this.name,
								sname: this.sname,
								grade: '',
								p: this.nowPage
							})).then(res => {
								if (res) {
									if (res.status == 100) {
										this.$notify({
											title: '异常',
											dangerouslyUseHTMLString: true,
											iconClass: 'el-icon-warning',
											message: '<strong>没有信息</strong>',
											showClose: false
										});
									} else {
										this.stuInfo.push(...res.data);
									}
								}
							});
						} else {
							res.data.content.forEach(g => {
								this.$http.post('/vote/allplayers', this.$qs.stringify({
									name: this.name,
									sname: this.sname,
									grade: g,
									p: this.nowPage
								})).then(res => {
									if (res) {
										if (res.status == 100) {
											this.$notify({
												title: '异常',
												dangerouslyUseHTMLString: true,
												iconClass: 'el-icon-warning',
												message: '<strong>已全部加载</strong>',
												showClose: false
											});
										} else {
											this.stuInfo.push(...res.data);
										}
									}
								});
							})
						}

					}
				})
			},
			getStudent() {
				this.$http.post('/vote/allplayers', this.$qs.stringify({
					name: this.name,
					sname: this.sname,
					grade: this.ch !== -1 ? this.nianjibas[this.ch] : '',
					p: this.nowPage
				})).then(res => {
					if (res) {
						if (res.status == 100) {
							this.$notify({
								title: '异常',
								dangerouslyUseHTMLString: true,
								iconClass: 'el-icon-warning',
								message: '<strong>已全部加载</strong>',
								showClose: false
							});
						} else {
							this.stuInfo.push(...res.data);
						}
					}
				});
			},
			toAll() {
				this.nowPage++;
				this.getStudent();
			},
			toInfo(id) {
				let urls =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx48c6ea54e0a3e9c7&redirect_uri=http%3a%2f%2ftp.nzjykj.com%2findex%2f%23%2finfo&response_type=code&scope=snsapi_userinfo&state=' +
					id + '#wechat_redirect';
				location.href = urls;
				// this.$router.push({name:'info',params:{userId:id}})
			}
		}
	}
</script>

<style lang="scss">
	.filter_div {
		position: fixed;
		bottom: 50px;
		left: calc((100% - 132px) / 2);
		width: 132px;
		height: 30px;
		color: #FDD26B;
		background-color: #AB1F1E;
		font-size: 14px;
		color: rgba(252, 211, 99, 1);
		z-index: 999999;
		border: 2px solid rgba(253, 210, 107, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.filter_rel_div {
		width: 100%;
		height: 350px;
		background-color: white;
		border-radius: 20px 20px 0 0;
		position: fixed;
		bottom: 0;
		z-index: 9999999;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 100px 50px;

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

		.sein {
			font-size: 30px;
			border: none;
			outline: none;
			border-bottom: 1px solid #8c8c8c;
			color: #8c8c8c;
			padding: 5px;
		}
	}

	.seeAll {
		font-weight: 900;
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
