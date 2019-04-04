<template>
	<div class="show">
		<div class="div_head">
			<el-button type="primary" @click="asdasdad">完成</el-button>
			<span class="ts30">新建试卷</span>
		</div>
		<div class="div_clome">
			<div class="one">
				<transition>

				</transition>
			</div>
			<div class="two">
				<div class="ch">
					<el-menu default-active="0" mode="horizontal" @select="handleSelect">
						<el-menu-item v-for="(t,k) in titype" :key="k" :index="k+''">{{t}}</el-menu-item>
					</el-menu>
				</div>
				<div class="topics">
					<transition name="letopic">
						<div class="onetop" v-for="(topic,k) in showTopic" :key="k">
							<div class="topinfo">
								{{topic}}
								<span>{{topic.name}}</span>
								<span>分数:{{topic.score}}</span>
							</div>
							<div class="btn">
								<div class="replace juzhong">
									<div>
										<i class="el-icon-sort"></i>
										<span>替换</span>
									</div>
								</div>
								<div class="add juzhong" @click="addToPaper(k)">
									<div>
										<i class="el-icon-plus"></i>
										<span>添加</span>
									</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<div class="div_back b18">
			<div @click="backsure = true">
				<i class="el-icon-back"></i>
				<span>返回试卷列表</span>
			</div>
		</div>
		<el-dialog title="提示" :visible.sync="backsure" width="30%">
			<span class="ts18">返回后添加的试题将不被保存</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="backsure = false">取 消</el-button>
				<el-button type="primary" @click="goback()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			showTopic() {
				return this.tiku[parseInt(this.showTiku)]
			}
		},
		data() {
			return {
				showTiku: '0',
				backsure: false,
				titype: ['题目类型'],
				tiku: []
			};
		},
		created() {
			let load = this.$loading({
				fullscreen: true
			});
			this.bi().then(res => {
				if (res.data.status == 0) {
					this.titype = res.data.data.content;
					let a = [];
					for (var i = 0; i < this.titype.length; i++) {
						a.push(this.topics(i));
					}
					let _this = this
					this.$http.all(a).then(this.$http.spread(function() {
						for (var i = 0; i < arguments.length; i++) {
							if (arguments[i].data.status == 0) {
								_this.tiku.push(arguments[i].data.data)
							}
						}
						load.close();
					}))
				} else {
					load.close();
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: res.data.msg,
						showClose: false
					});
				}
			}).catch(() => {
				load.close();
				this.$notify.success({
					title: '错误',
					iconClass: 'el-icon-warning',
					message: '服务器未响应',
					showClose: false
				});
			});
		},
		methods: {
			asdasdad() {
				console.log(this.tiku);
			},
			topics(t) {
				return this.$http.post('/admin/topics', this.$qs.stringify({
					token: this.$store.getters.token,
					type: t
				}))
			},
			bi() {
				return this.$http.post('/admin/basisInfo', this.$qs.stringify({
					id: 1,
					token: this.$store.getters.token
				}))
			},
			goback() {
				this.$router.go(-1)
			},
			handleSelect(e) {
				this.showTiku = e
			},
			addToPaper(k) {
				this.showTopic.splice(k,1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.letopic-enter-active,
	.letopic-leave-active {
		transition: opacity .5s;
	}

	.letopic-enter,
	.letopic-leave-to

	/* .fade-leave-active below version 2.1.8 */
		{
		opacity: 0;
	}

	.show {
		background-color: #FFFFFF;
		border-radius: 0.3125rem;
		height: 100%;
		width: 100%;
		box-shadow: 0 0 20px 3px #888888;
		box-sizing: border-box;
		padding: 40px 30px;
		position: relative;
	}

	.div_clome {
		width: 100%;
		height: calc(100% - 90px);
		display: flex;

		.one {
			height: 100%;
			width: 50%;
		}

		.two {
			height: 100%;
			width: 50%;

			.ch {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.topics {
				width: 100%;
				height: calc(100% - 50px);
				border-left: solid 1px #707070;
				box-sizing: border-box;
				padding: 24px;
				padding-right: 11px;
				overflow: auto;

				.onetop {
					width: 100%;
					height: 120px;
					border-radius: 20px;
					box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.2);
					margin-bottom: 26px;
					display: flex;


					.topinfo {
						width: 86%;
						height: 100%;
					}

					.btn {
						width: 14%;
						height: 100%;
						border-radius: 0 20px 20px 0;
						border: solid 1px #1890FF;

						.replace {
							width: 100%;
							height: 50%;
							color: #1890FF;
						}

						.add {
							width: 100%;
							height: 50%;
							border-radius: 0 0 20px 0;
							background-color: #1890FF;
							color: white;
						}
					}
				}
			}

			.topics::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.el-menu--horizontal>.el-menu-item {
		height: 50px;
		font-size: 23px;
	}

	.div_head {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px;
		position: relative;
	}

	.div_back {
		width: 100%;
		height: 30px;

		div {
			width: 10%;
		}
	}
</style>
