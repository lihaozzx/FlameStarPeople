<template>
	<view class="content">
		<view class="bg">
			<view class="view_navigation"></view>
			<image class="logo" src="/static/login_bg.png"></image>
		</view>

		<view class="login" v-if="show==0">
			<view class="title">输入信息</view>
			<view class="info">
				<view class="shuru">
					<input type="text" v-model="num" placeholder="座位号" />
				</view>
			</view>
			<view class="sure" @tap="login">
				确认
			</view>
		</view>

		<view class="login wait" v-else-if="show==1">
			<text>{{str}}</text>
		</view>

		<view class="login" v-if="show==2">
			<view class="title">核对信息</view>
			<view class="infos">
				<div class="img" :style="'background-image: url('+stuInfo.img+');'">
				</div>
				<text>座号:{{stuInfo.number}}</text>
				<text>姓名:{{stuInfo.name}}</text>
				<text>学校:{{stuInfo.school}}</text>
				<text>班级:{{stuInfo.class}}</text>
			</view>
			<view class="tishi">
				<text>注意：如信息有误，请联系现场工作人员</text>
				<image @click="infoWrong" src="../../static/set.png" mode=""></image>
			</view>
			<view v-if="!insure" class="sure" @tap="sureInfo">
				确认信息
			</view>
			<view v-else class="issure">
				<text>请等待比赛开始</text>
			</view>
		</view>

	</view>
	
</template>

<script>
	export default {
		onLoad(obj){
			if(obj.type){
				this.num = uni.getStorageSync('zuoweihao');
				this.show = 1;
			}
		},
		computed: {
			wsm() {
				return this.$store.getters.wsmg
			}
		},
		watch: {
			wsm(n) {
				switch (n.type) {
					case 'stuInfo':
						// 学生信息
						n.data.forEach(stu => {
							if (stu.number == this.num) {
								this.stuInfo = stu;
								uni.setStorageSync('stuId', stu.pid);
								uni.setStorageSync('id', stu.id);
								uni.setStorageSync('stuName',stu.name);
								uni.setStorageSync('stuSchool',stu.school);
								this.show = 2;
							}
						});
						if (this.show == 1) {
							this.str = '座位号信息错误'
						}
						break;
					case 'startGame':
						// 开始比赛
						uni.redirectTo({
							url: '../ans/ans',
						});
						break;
					default:
						break;
				}
			}
		},
		data() {
			return {
				str: '请等待答题开始',
				show: 0,
				insure: false,
				num: '',
				stuInfo: {
					number: '01',
					name: '蕾米莉亚',
					school: '成都七中',
					class: '三年级一班',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554980610251&di=201ce787e28c8bbda1df254194512515&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'
				}
			}
		},
		methods: {
			login() {
				if (this.num != '') {
					uni.setStorageSync('zuoweihao',this.num);
					this.wslogin();
					this.show = 1;
				} else {
					uni.showToast({
						title: '请输入座位号',
						icon: 'none'
					})
				}
			},
			asd() {
				uni.navigateTo({
					url: '../ans/ans'
				})
			},
			wslogin() {
				uni.sendSocketMessage({
					data: '{"type":"login","client_name":"pad' + this.num + '","room_id":"1"}'
				});
			},
			sureInfo() {
				uni.sendSocketMessage({
					data: this.$mso({
						type: 'sureInfo',
						data: this.num
					})
				});
				this.insure = true
			},
			infoWrong() {
				plus.nativeUI.prompt("Input Game Code: ", e => {
					if (e.index == 0 && e.value != '') {
						uni.sendSocketMessage({
							data: this.$mso({
								type: 'infoErr',
								data: {
									num: this.num,
									code: e.value
								}
							})
						});
					}
				}, "请输入授权码", "Authorization Code", ["OK", "Cancel"]);
			}

		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: relative;
		width: 1202upx;
		height: 706upx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;

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

		.login {
			width: 400upx;
			height: 600upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #ffffff;
			border-radius: 20upx;
			border: 2upx solid rgba(191, 191, 191, 0.4);
			box-shadow: 0upx 10upx 99upx rgba(0, 0, 0, 0.1);
			z-index: 222;
			position: relative;

			.title {
				width: 200upx;
				background-color: #BFBFBF;
				color: #ffffff;
				font-size: 30upx;
				text-align: center;
			}

			.info {
				width: 70%;
				margin-top: 60upx;

				.shuru {
					border: 2px solid rgba(191, 191, 191, 1);
					width: 100%;
					border-radius: 50upx;
					font-size: 30upx;
					box-sizing: border-box;
					padding: 0 20upx;
					margin-bottom: 70upx
				}
			}

			.infos {
				width: 70%;
				font-size: 30upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 80upx;
				line-height: 60upx;

				.img {
					width: 40%;
					padding-top: 40%;
					background-size: cover;
					border-radius: 100upx
				}
			}

			.tishi {
				font-size: 18upx;
				color: #FF0000;
				position: absolute;
				bottom: 5upx;

				image {
					width: 24upx;
					height: 24upx;
					position: relative;
					top: 6upx;
					left: 6upx;
				}
			}

			.sure {
				width: 70%;
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
				color: #ffffff;
				border: 2upx solid rgba(255, 197, 61, 1);
				background: linear-gradient(270deg, rgba(250, 173, 20, 1) 0%, rgba(255, 193, 68, 1) 100%);
				box-shadow: 0upx 3upx 6upx rgba(250, 174, 22, 1);
				border-radius: 50upx;
				position: absolute;
				bottom: 40upx;
			}

			.issure {
				color: #FAAD14;
				font-size: 36upx;
				font-weight: 900;
			}

		}

		.wait {
			font-size: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
