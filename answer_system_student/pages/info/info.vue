<template>
	<view class="root">
		<view class="bg">
			<view class="view_navigation"></view>
			<image class="logo" src="../../static/login_bg.png"></image>
		</view>
		<view class="content">
			<view class="title">答题结束</view>
			<text space="emsp" style="position: absolute;font-size: 20upx;font-weight: 900;top: 50upx;">总分：{{allnum}} 分</text>
			<view class="info">
				<view class="topicInfo" v-for="t in topicInfo" :key="t.id" :class="parseInt(t.score)>0?'right':'wrong'">
					<text>{{parseInt(t.score)>0?'正确':'错误'}}</text>
					<text class="nowr">{{t.score}} 分</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			allnum() {
				let s = 0
				this.topicInfo.forEach(t=>{
					s+=parseInt(t.score)
				})
				return s
			},
			wsm() {
				return this.$store.getters.wsmg
			}
		},
		watch: {
			wsm(n) {
				switch (n.type) {
					case 'gameswitch':
						// 学生信息
						uni.redirectTo({
							url:'../index/index?type=next'
						})
						break;
					default:
						break;
				}
			}
		},
		created() {
			uni.request({
				url: this.$api + '/stock/playerInfo',
				data: {
					id: uni.getStorageSync('pid')
				},
				success: res => {
					if (res.data.status == 0) {
						this.topicInfo = res.data.data
					}
				}
			})
		},
		data() {
			return {
				topicInfo: []
			};
		},
		methods: {
			// 组件的方法
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

		.content {
			width: 1050upx;
			height: 600upx;
			background-color: #FFFFFF;
			border-radius: 20upx;
			box-shadow: 0upx 10upx 99upx rgba(0, 0, 0, 0.16);
			z-index: 2;
			position: relative;
			top: 25upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			flex-wrap: wrap;

			.title {
				width: 200upx;
				background: linear-gradient(270deg, rgba(250, 173, 20, 1) 0%, rgba(255, 193, 68, 1) 100%);
				box-shadow: 0upx 3upx 6upx rgba(250, 174, 22, 1);
				color: #ffffff;
				font-size: 30upx;
				text-align: center;
				position: absolute;
				top: 0;
			}

			.head_img {
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
				background: #8C8C8C;
			}

			.info {
				margin-top: 100upx;
				width: 100%;
				height: 500upx;
				display: flex;
				flex-wrap: wrap;

				.topicInfo {
					width: 9%;
					height: 25%;
					margin: 10upx 0.5%;
					color: #FFFFFF;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 10upx 0;
					font-size: 30upx;
					
					.nowr{
						white-space: nowrap;
					}
				}

				.right {
					background: rgba(82, 196, 26, 1);
				}

				.wrong {
					background: rgba(245, 34, 45, 1);
				}
			}

		}

	}
</style>
