<template>
	<div>
		<div class="center">
			<div class="head_back">
				<img :src="back" alt="">
			</div>
			<div class="centent">
				<span class="tongzhi">重要通知：字段字段字段字段字段字段字段字段字段字段字段字段字</span>
				<div class="video_div" @click="showcontrols">
					<video v-if="!showc" :src="shipin"></video>
					<video v-else :src="shipin" controls></video>
				</div>
				<div class="info">
					<div class="stu_info">
						<span class="s1">张三</span>
						<span class="s2">三年级|成都市青羊区第七中学</span>
					</div>
					<div class="rank_info">
						<span class="s1">赛区状元榜结束倒计时</span>
						<span class="s2">8天5小时42分18秒</span>
					</div>
					<div class="num_info">
						<div class="num">
							<span class="s1">上榜值</span>
							<span class="s2">230000</span>
						</div>
						<div class="num">
							<span class="s1">当前排名</span>
							<span class="s2">20</span>
						</div>
					</div>
				</div>
				<div class="book">
					<div class="title">
						<span class="s1">国学家书</span>
						<span class="s2">已有7777名选手书写家书</span>
					</div>
				</div>
				<div class="relative">
					<div class="title">
						<span class="s1">亲友关爱</span>
						<span class="s2">已有7777名亲友加油</span>
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
			<div class="btn">助他上榜</div>
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
			},
			paper(){
				this.$router.push({name:'answer'})
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
				.infos{
					width: 100%;
					margin-top: 14px;
					.info{
						width: 100%;
						height: 60px;
						background-color: #A01C19;
						display: flex;
						.head_img{
							width: 60px;
							height: 60px;
							border-radius: 30px;
							display: flex;
							align-items: center;
							justify-content: center;
							overflow: hidden;
							img{
								width: 100%;
							}
						}
						.fm_info{
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
		.btn:hover{
			transition: .5s ease all;
			background: rgba(229, 221, 182, 1);
			user-select: none;
		}
		
	}
</style>
