<template>
	<div>
		<img :src="jiashu" class="himg">
		<div class="writeLetter">
			<div class="body">
				<span v-html="showInfo.content"></span>
			</div>
			<div class="bottom_div">
				<span class="back" @click="goback">返回选手页面</span>
			</div>
		</div>
	</div>
</template>

<script>
	import jiashu from '@/assets/goodLetter.png'
	export default {
		created(){
			// 优秀家书
			this.$http.post('/vote/letter').then(res => {
				if (res) {
					if (res.status == 0) {
						this.showInfo = res.data
					}
				}
			});
		},
		data() {
			return {
				jiashu,
				showInfo:{content:'‘'},
			};
		},
		methods: {
			// 组件的方法
			goback(){
					this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss">
	.himg {
		width: 100%;
		margin: 17px 0;
	}

	.writeLetter {
		width: 94%;
		margin-left: 3%;
		margin-bottom: 50px;
		background-image: url(../assets/pub-bg-1.png), url(../assets/pub-bg-3.png);
		background-position: top, bottom;
		background-repeat: no-repeat, no-repeat;
		background-size: 100%;
		position: relative;
		padding: 8px 0 145px 0;
		position: relative;

		.body {
			padding: 0px 10px;
			background-image: url(../assets/pub-bg-2.png);
			background-size: 100%;
			font-size: 1.4rem;

			div {
				width: 100%;
				
				p{
					font-size: 1.6rem;
					color: #A11F1D;
					font-weight: 900;
				}

				input {
					width: 100%;
					box-sizing: border-box;
					border-radius: 5px;
					border: 2px solid rgba(160, 28, 25, 1);
					font-size: 1.4rem;
					line-height: 2.8rem;
					padding-left: 5px;
				}

				textarea {
					width: 100%;
					height: 250px;
					box-sizing: border-box;
					border-radius: 5px;
					border: 2px solid rgba(160, 28, 25, 1);
					font-size: 1.4rem;
					line-height: 2.8rem;
					padding-left: 5px;
					resize: none;
				}

				textarea::-webkit-scrollbar {
					width: 3px;
					height: 100%;
				}

				textarea::-webkit-scrollbar-thumb {
					border-radius: 10px;
					background: red;
					border: 0px solid #fff;
				}

			}
		}

		.bottom_div {
			width: 100%;
			height: 140px;
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			padding: 20px 15px;

			.subLtr {
				width: 100%;
				height: 45px;
				border-radius: 10px;
				background-color: #F9F1CA;
				color: #A01C19;
				font-size: 1.8rem;
				font-weight: 900;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}

			.back {
				font-size: 1.5rem;
				color: #A11F1D;
			}
		}
	}
</style>
