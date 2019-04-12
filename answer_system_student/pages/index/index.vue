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
					<input type="text" password placeholder="授权码" />
				</view>
				<view class="shuru">
					<input type="text" placeholder="选手编号" />
				</view>
			</view>
			<view class="sure" @tap="login">
				确认
			</view>
		</view>

		<view class="login" v-if="show==1">
			<view class="title">核对信息</view>
			<view class="infos">
				<div class="img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554980610251&di=201ce787e28c8bbda1df254194512515&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg);">
				</div>
				<text>编号:01</text>
				<text>姓名:蕾米莉亚</text>
				<text>学号:666</text>
				<text>班级:三年级一班</text>
			</view>
			<view class="tishi">
				<text>注意：如信息有误，请联系现场工作人员</text>
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view v-if="!insure" class="sure" @tap="sureInfo">
				确认信息
			</view>
			<view v-else  class="issure">
				<text>请等待答题开始</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: 0,
				insure:false
			}
		},
		onLoad() {

		},
		methods: {
			sureInfo(){
				this.insure = true
			},
			login(){
				this.show=1
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: relative;
		width: 1202upx;
		height: 706upx;
		overflow: hidden;
		background-color: #7eca1e;
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
				height: 25px;
				background-color: #000000;
			}

			.logo {
				height: calc(100% - 25px);
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
				
				.img{
					width: 40%;
					padding-top: 40%;
					background-size: cover;
					border-radius: 100upx
				}
			}
			
			.tishi{
				font-size: 18upx;
				color: #FF0000;
				position: absolute;
				bottom: 5upx;
				image{
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
			
			.issure{
				color: #FAAD14;
				font-size: 36upx;
				font-weight: 900;
			}

		}
	}
</style>
