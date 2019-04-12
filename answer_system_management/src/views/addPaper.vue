<template>
	<div class="show">
		<div class="div_head">
			<span class="ts30">{{ischange?pagerName:'新建试卷'}}({{paperTopic.length}}题)</span>
			<div class="search">
				<el-select v-model="value" placeholder="请选择主题">
					<el-option v-for="item in cates" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div class="search">
				<el-input placeholder="题目搜索" v-model="searchKey" clearable></el-input>
			</div>
			<el-button type="primary" @click="sub">完成</el-button>
		</div>
		<div class="div_clome">
			<div class="one">
				<div class="topics">
					<transition-group name="letopic" tag="ul">
						<li v-for="(topic,k) in paperTopic" :key="topic.id" @click="choseTopic(k)">
							<div class="onetop" :class="nowChose==k?'active':'none'">
								<div class="topinfo">
									<span>{{k+1}}.</span>
									<span>{{topic.name}}</span>
								</div>
								<div class="del" @click.stop="delt4p(k)">
									<span>删除</span>
								</div>
							</div>
						</li>
					</transition-group>
				</div>
			</div>
			<div class="two">
				<div class="ch">
					<el-menu default-active="0" mode="horizontal" @select="handleSelect">
						<el-menu-item v-for="(t,k) in titype" :key="k" :index="k+''">{{t}}</el-menu-item>
					</el-menu>
				</div>
				<div class="topics">
					<transition-group v-if="value!=''" name="letopic" tag="ul">
						<li v-for="(topic,k) in showTopic" :key="topic.id">
							<div class="onetop">
								<div class="topinfo">
									<span>{{topic.name}}</span>
									<span>选项:{{topic.xuanx}}</span>
									<!-- <span style="color: #006400;">答案:{{topic.answer}}</span> -->
									<span>分数:{{topic.score}}</span>
								</div>
								<div class="btn">
									<div class="replace juzhong" @click="changeToPaper(k)">
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
						</li>
					</transition-group>
					<div v-else>
						<span>请先选择题目主题</span>
					</div>
				</div>
			</div>
		</div>
		<div class="div_back b18">
			<div v-if="!ischange" @click="backsure = true">
				<i class="el-icon-back"></i>
				<span>返回试卷列表</span>
			</div>
			<div v-else @click="goback()">
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
		<el-dialog title="提示" :visible.sync="subshow" width="30%">
			<span class="ts18">{{ischange?'确认修改？':'提交试卷？'}}</span>
			<el-input v-model="pagerName" placeholder="请输入试卷名称" style="margin-top: 20px;" :disabled="ischange"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="subshow = false">取 消</el-button>
				<el-button type="primary" @click="submit()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		watch: {
			value(newValue) {
				/* 添加试卷 */
				let load = this.$loading({
					fullscreen: true
				});
				this.basis().then(res=>{
					this.cates = res.data.data.content;
				})
				this.bi().then(res => {
					if (res.data.status == 0) {
						this.titype = res.data.data.content;
						let a = [];
						for (var i = 0; i < this.titype.length; i++) {
							a.push(this.topics(i,this.value));
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
			}
		},
		computed: {
			showTopic() {
				if (typeof this.tiku[parseInt(this.showTiku)] === 'object') {
					if (this.searchKey == '') {
						return this.tiku[parseInt(this.showTiku)];
					} else {
						let o = [];
						this.tiku[parseInt(this.showTiku)].forEach(t => {
							if (t.name.indexOf(this.searchKey) != -1) {
								o.push(t)
							}
						});
						return o;
					}
				} else {
					return null;
				}

			},
			ids() {
				let ids = []
				this.paperTopic.forEach(p => {
					ids.push(p.id)
				})
				return ids
			}
		},
		data() {
			return {
				showTiku: '0',
				backsure: false,
				titype: ['题目类型'],
				tiku: [],
				paperTopic: [],
				nowChose: -1,
				shangxian: 2,
				pagerName: '',
				subshow: false,
				searchKey: '',
				timer: null,
				ischange: false,
				cates:[],
				value:''
			};
		},
		created() {
			if (this.$route.query.id == undefined) {
				this.basis().then(res=>{
					this.cates = res.data.data.content;
				})
				if(this.value != ''){
					/* 添加试卷 */
					let load = this.$loading({
						fullscreen: true
					});
					this.bi().then(res => {
						if (res.data.status == 0) {
							this.titype = res.data.data.content;
							let a = [];
							for (var i = 0; i < this.titype.length; i++) {
								a.push(this.topics(i,this.value));
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
				}
			} else {
				this.ischange = true;
				/* 添加试卷 */
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

							/* 修改试卷 */
							_this.$http.post('/admin/examInfo', _this.$qs.stringify({
								id: _this.$route.query.id
							})).then(res => {
								if (res.data.status == 0) {
									_this.pagerName = res.data.data.name
									_this.paperTopic = res.data.data.topics;
									res.data.data.topics.forEach(t => {
										for (var i = 0; i < _this.tiku[parseInt(t.type)].length; i++) {
											if (_this.tiku[t.type][i].id == t.id) {
												_this.tiku[t.type].splice(i, 1);
											}
										}
									})
									load.close();
								} else {
									load.close();
									_this.$notify.success({
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
			}

		},
		methods: {
			sub() {
				this.subshow = true
			},
			submit() {
				// 没有上限
				if (true) {
					let load = this.$loading({
						fullscreen: true
					});
					if (this.ischange) {
						this.$http.post('/admin/upexmaTopic', this.$qs.stringify({
							ids: this.ids,
							id: this.$route.query.id
						})).then(res => {
							if (res.data.status == 0) {
								setTimeout(() => {
									this.goback();
								}, 500)
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
							} else {
								this.$notify.success({
									title: '错误',
									iconClass: 'el-icon-warning',
									message: res.data.msg,
									showClose: false
								});
							}
							load.close();
						}).catch(() => {
							this.$notify.success({
								title: '错误',
								iconClass: 'el-icon-warning',
								message: '服务器未响应',
								showClose: false
							});
							load.close();
						});
					} else {
						this.$http.post('/admin/exmaTopic', this.$qs.stringify({
							token: this.$store.getters.token,
							ids: this.ids,
							name: this.pagerName
						})).then(res => {
							if (res.data.status == 0) {
								setTimeout(() => {
									this.goback();
								}, 500)
								this.$message({
									type: 'success',
									message: '提交成功!'
								});
							} else {
								this.$notify.success({
									title: '错误',
									iconClass: 'el-icon-warning',
									message: res.data.msg,
									showClose: false
								});
							}
							load.close();
						}).catch(() => {
							this.$notify.success({
								title: '错误',
								iconClass: 'el-icon-warning',
								message: '服务器未响应',
								showClose: false
							});
							load.close();
						});
					}
				} else {
					this.$message({
						type: 'info',
						message: '还不够' + this.shangxian + '题哟!'
					});
				}
			},
			topics(t,c) {
				return this.$http.post('/admin/topics', this.$qs.stringify({
					token: this.$store.getters.token,
					type: this.titype[t],
					cate:c
				}))
			},
			bi() {
				return this.$http.post('/admin/basisInfo', this.$qs.stringify({
					id: 1,
					token: this.$store.getters.token
				}))
			},
			basis() {
				return this.$http.post('/admin/basisInfo', this.$qs.stringify({
					id: 2,
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
				if (false) {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '试卷上限' + this.shangxian + '题',
						showClose: false
					});
				} else {
					this.paperTopic.push(this.showTopic.splice(k, 1)[0]);
				}
			},
			changeToPaper(k) {
				if (this.paperTopic[this.nowChose].type == this.showTopic[k].type) {
					this.paperTopic.splice(this.nowChose, 1, this.showTopic.splice(k, 1, this.paperTopic[this.nowChose])[0]);
				} else {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '类型不同不能替换',
						showClose: false
					});
				}

			},
			choseTopic(k) {
				if (this.nowChose == k) {
					this.nowChose = -1;
				} else {
					this.nowChose = k;
				}
			},
			delt4p(k) {
				this.tiku[this.paperTopic[k].type].push(this.paperTopic[k]);
				this.paperTopic.splice(k, 1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.letopic-enter-active,
	.letopic-leave-active {
		transition: all .5s;
	}

	.letopic-enter,
	.letopic-leave-to {
		opacity: 0;
		transform: translateY(30px);
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

			.topics {
				width: 100%;
				height: calc(100% - 50px);
				box-sizing: border-box;
				padding: 24px 24px 24px 0;
				padding-right: 11px;
				overflow: auto;

				ul {
					padding: 5px;
				}

				.onetop {
					width: 100%;
					height: 60px;
					border-radius: 20px;
					margin-bottom: 26px;
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.del {
						width: 70px;
						border-radius: 0 20px 20px 0;
						background-color: brown;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #FFFFFF
					}

					.topinfo {
						width: 86%;
						height: 100%;
						padding: 5px 10px;
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

				.active {
					box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.2);
					background-color: rgba(243, 249, 255, 1);
					border: 1px solid #1890FF;
				}

				.none {
					box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.2);
					border: 1px solid rgba(0, 0, 0, 0.2);
				}
			}

			.topics::-webkit-scrollbar {
				display: none;
			}
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
					height: 150px;
					border-radius: 20px;
					box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.2);
					margin-bottom: 26px;
					display: flex;


					.topinfo {
						width: 86%;
						height: 100%;
						box-sizing: border-box;
						padding: 25px 25px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						position: relative;

						span:nth-of-type(1) {
							font-size: 16px;
							font-weight: 900;
						}

						span:nth-of-type(2) {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						span:nth-of-type(3) {
							font-size: 12px;
							position: absolute;
							top: 0;
							right: 5px;
						}
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
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px;
		position: relative;

		.search {
			padding-left: 120px
		}
	}

	.div_back {
		width: 100%;
		height: 30px;

		div {
			width: 10%;
		}
	}
</style>
