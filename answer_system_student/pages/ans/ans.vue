<template>
	<view class="root">
		<view class="bg">
			<view class="view_navigation"></view>
			<image class="logo" :src="iszuhe?'/static/01fe5b5a6bd773a8012134663c2fee.png':'/static/018af65a6bd774a8012134669fe1c6.png'"></image>
		</view>
		<view class="asd" @tap="iszuhe=!iszuhe">
			切换题型
		</view>
		<view class="asd2" @tap="qiehuanqiyan">
			切换七言
		</view>

		<view v-if="iszuhe" class="content">
			<text class="fs28 c8c">3/10题</text>
			<text class="ts36 c8c">请用下列文字组成一句五言诗</text>
			<view class="ans">
				<view v-for="(k,i) in ans" :key="i" class="one" :class="nowCh==i?'ch':' no'" @tap="chFont(i)">{{k.val}}</view>
				<view class="del_img" @click="delZuheans()">
					<image src="../../static/del.png"></image>
				</view>
			</view>
			<view v-if="!isqiyan" class="daan">
				<view class="one" v-for="(v,k) in daans" :key="k" @click="chzuhe(k)" :class="v.ed?'ched':''">{{v.val}}</view>
				<view class="b1"></view>
				<view class="b2"></view>
				<view class="b3"></view>
				<view class="b4"></view>
			</view>
			<view v-else class="daan2">
				<view class="one" v-for="(v,k) in daans" :key="k" @click="chzuhe(k)">{{v.val}}</view>
				<view class="b1"></view>
				<view class="b2"></view>
				<view class="b5"></view>
				<view class="b3"></view>
				<view class="b4"></view>
			</view>
			<view class="sure_btn">
				<text>锁定答案</text>
			</view>
			<view class="daojishi">
				<text>倒计时：30 秒</text>
			</view>
		</view>
		<view v-else class="content">
			<text class="fs28 c8c">3/10题</text>
			<text class="ts36 c8c">题目：请用下列文字组成一句五言诗请用下列文字组成一句五言诗请用下列文字组成一句五言诗</text>

			<view class="xuanzedaan fs30">
				<view v-for="(k,i) in anss" :key="i" class="one" @click="xuanze(i)">
					<text>{{i=='0'?'A.':i=='1'?'B.':i=='2'?'C.':i=='3'?'D.':'E.'}}{{k}}</text>
					<image v-if="i == ch" class="ch_img" src="../../static/5c773b1038020.png"></image>
				</view>
			</view>

			<view class="sure_btn">
				<text>锁定答案</text>
			</view>
			<view class="daojishi">
				<text>倒计时：30 秒</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iszuhe: true,
				isqiyan: false,
				nowCh: -1,
				ans: [{
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}],
				daans: [{
					val: '啊',
					ed: false
				}, {
					val: '去',
					ed: false
				}, {
					val: '我',
					ed: false
				}, {
					val: '饿',
					ed: false
				}, {
					val: '人',
					ed: false
				}, {
					val: '是',
					ed: false
				}, {
					val: '的',
					ed: false
				}, {
					val: '发',
					ed: false
				}, {
					val: '在',
					ed: false
				}],
				ch: -1,
				anss: ['asdsad', 'asdqwdwd', '按时吃是阿深V阿SaaS大V阿飞大VAV发傻撒大声地', 's发噶大V嘎都是阿斯蒂芬打怪打怪阿飞不上辅导班伤风败俗辅导班是是否报商务部伤风败俗发表是']
			};
		},
		methods: {
			// 组件的方法
			chFont(k) {
				if (this.nowCh == k) {
					this.nowCh = -1;
				} else {
					this.nowCh = k;
				}
			},
			qiehuanqiyan() {
				this.isqiyan = !this.isqiyan;
				if (this.isqiyan) {
					// 七言
					this.ans=[{
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}];
					this.daans=[{
					val: '啊',
					ed: false
				}, {
					val: '去',
					ed: false
				}, {
					val: '我',
					ed: false
				}, {
					val: '饿',
					ed: false
				}, {
					val: '人',
					ed: false
				}, {
					val: '是',
					ed: false
				}, {
					val: '的',
					ed: false
				}, {
					val: '发',
					ed: false
				}, {
					val: '在',
					ed: false
				}, {
					val: '吧',
					ed: false
				}, {
					val: '好',
					ed: false
				}, {
					val: '有',
					ed: false
				}]
				} else {
					this.ans=[{
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}, {
					val: '',
					k: -1
				}];
					this.daans=[{
					val: '啊',
					ed: false
				}, {
					val: '去',
					ed: false
				}, {
					val: '我',
					ed: false
				}, {
					val: '饿',
					ed: false
				}, {
					val: '人',
					ed: false
				}, {
					val: '是',
					ed: false
				}, {
					val: '的',
					ed: false
				}, {
					val: '发',
					ed: false
				}, {
					val: '在',
					ed: false
				}]
				}
			},
			xuanze(k) {
				this.ch = k
			},
			chzuhe(k) {
				if (!this.daans[k].ed) {
					if (this.nowCh == -1) {
						// 未选择
						for (var i = 0; i < this.ans.length; i++) {
							if(this.ans[i].val == ''){
								this.daans.splice(k,1,{
									val:this.daans[k].val,
									ed:true
								});
								this.ans.splice(i,1,{
									val:this.daans[k].val,
									k:k
								});
								return;
							}
						}
					} else {
						//以选择
						this.daans.splice(k,1,{
							val:this.daans[k].val,
							ed:true
						});
						this.ans.splice(this.nowCh,1,{
							val:this.daans[k].val,
							k:k
						});
					}
				}
			},
			delZuheans() {
				if (this.nowCh == -1) {
					// 未选择
					
				} else {
					//以选择
					
				}
			}
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

		.asd {
			z-index: 2;
			position: absolute;
			right: 20upx;
			top: 40upx;
			font-size: 24upx;
		}

		.asd2 {
			z-index: 2;
			position: absolute;
			right: 20upx;
			top: 70upx;
			font-size: 24upx;
		}

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
			width: 850upx;
			height: 100%;
			z-index: 2;
			position: relative;
			top: 25upx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.ans {
				margin-top: 14upx;
				display: flex;
				position: relative;
				left: 80upx;

				.one {
					width: 60upx;
					height: 60upx;
					border-radius: 5upx;
					margin-right: 30upx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FBAF18;
					font-size: 36px;
				}

				.no {
					border: 2upx solid rgba(0, 0, 0, 0.4);
				}

				.ch {
					border: 2upx solid rgba(251, 175, 24, 0.7);
					box-shadow: 0 0 30upx 2upx #FBAF18;
				}

				.del_img {
					width: 150upx;
					height: 75upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.daan {
				width: 360upx;
				height: 360upx;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.ched {
					opacity: 0.3;
				}

				.one {
					width: calc(100% / 3);
					height: calc(100% / 3);
					font-size: 36upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.b1 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: calc(100% / 3);
				}

				.b2 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: calc(100% / 3 * 2);
				}

				.b3 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3);
				}

				.b4 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3 * 2);
				}
			}

			.daan2 {
				width: 480upx;
				height: 360upx;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.one {
					width: 120upx;
					height: 120upx;
					font-size: 36upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.b1 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 120upx;
				}

				.b2 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 240upx;
				}

				.b5 {
					width: 3upx;
					height: 100%;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					left: 360upx;
				}

				.b3 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3);
				}

				.b4 {
					width: 100%;
					height: 1upx;
					background-color: #707070;
					opacity: 0.3;
					position: absolute;
					top: calc(100% / 3 * 2);
				}
			}

			.xuanzedaan {
				width: 80%;
				display: flex;
				flex-direction: column;

				.one {
					position: relative;

					.ch_img {
						position: absolute;
						width: 62upx;
						height: 62upx;
						left: -20upx;
						top: -6upx;
					}
				}

			}

			.sure_btn {
				position: absolute;
				bottom: 60upx;
				width: 300upx;
				height: 80upx;
				background: linear-gradient(270deg, rgba(250, 173, 20, 1) 0%, rgba(255, 193, 68, 1) 100%);
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0upx 3upx 6upx rgba(250, 174, 22, 1);
				border-radius: 50upx;
				font-size: 30upx;
			}

			.daojishi {
				position: absolute;
				bottom: 20upx;
				font-size: 22upx;
				z-index: 3;
			}
		}
	}
</style>
