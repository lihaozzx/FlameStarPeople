<template>
	<div>
		<div class="center">
			<div class="head_back">
				<img :src="back" alt="">
			</div>
			<div class="centent">
				<span class="tongzhi">重要通知：字段字段字段字段字段字段字段字段字段字段字段字段字</span>
				<div class="video_div" @click="showcontrols">
					<video v-if="!showc" :src="shipin" ></video>
					<video v-else :src="shipin" controls></video>
				</div>
			</div>
		</div>
		<div class="btn_bottom">
 <!--  -->
		</div>
	</div>
</template>

<script>
	import back from '@/assets/timg-(2).png'

	import shipin from '@/assets/WeChat_20190422144635.mp4'
	export default {
		data() {
			return {
				back,
				shipin,
				showc: false
			};
		},
		methods: {
			// 组件的方法
			showcontrols() {
				this.showc = !this.showc
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
			background-color: #A01C19;
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

				video {
					width: 100%
				}
			}
		}
	}

	.btn_bottom {
		height: 80px;
		position: fixed;
		bottom: 0;
	}
</style>
