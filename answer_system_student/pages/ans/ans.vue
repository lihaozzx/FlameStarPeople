<template>
	<view class="content">
		<view class="bg">
			<view class="view_navigation"></view>
			<image class="logo" :src="iszuhe?'/static/01fe5b5a6bd773a8012134663c2fee.png':'/static/018af65a6bd774a8012134669fe1c6.png'"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iszuhe:true
			};
		},
		methods: {
			// 组件的方法
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
	}
</style>
