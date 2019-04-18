<template>
	<div class="root">
		<div class="infoBody">
			<div v-for="(s,k) in sessionInfo" :key="k" class="one_info">
				<div class="div_text">
					<span class="ts18">{{s.ffg}}</span>
					<span class="ts12 inbot">授权码: <span class="cf0">{{s.warrant}}</span></span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">选题视频地址：</span>
						<span v-if="dizhi[k]" class="a26">{{s.video}}</span>
						<div v-else>
							<el-input v-model="s.video" autocomplete="off" placeholder="视频地址"></el-input>
						</div>
					</span>
					<span class="ts12 inbot b18" @click="setDizhi(k,s.id)">{{dizhi[k]?'修改':'完成'}}</span>
				</div>
				<div class="img_video">
					<div>
						<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions[k]"></video-player>
					</div>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">当前考卷：</span>
						<span v-if="paper[k]" class="a26">{{s.ename}}</span>
						<div v-else>
							<el-select v-model="s.eid" filterable placeholder="请选择">
								<el-option v-for="item in paperInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</div>
					</span>
					<span class="ts12 inbot b18" @click="setPaper(k,s.id)">{{paper[k]?'修改':'完成'}}</span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">答题人员：</span>
						<span class="a26">{{s.players}}人</span>
					</span>
					<span class="ts12 inbot b18" @click="changePer(s.id)">查看</span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">比赛日期：</span>
						<span v-if="date[k]" class="a26">{{s.date}}</span>
						<div v-else>
							<el-date-picker v-model="s.date" type="date" placeholder="选择日期">
							</el-date-picker>
						</div>
					</span>
					<span class="ts12 inbot b18" @click="setDate(k,s.id)">{{date[k]?'修改':'完成'}}</span>
				</div>
				<!-- <div class="div_text">
					<span class="ts14">
						<span class="o26">当前状态：</span>
						<span class="a26">{{s.status}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div> -->
				<div v-if="s.status=='1'" class="div_addPer" @click="addper(s.id)">
					<span class="ts12 b18">添加人员</span>
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>
		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selCpm"></el-pagination>
		</div>

		<el-dialog title="人员信息" :visible.sync="per" width="70%">
			<el-table :data="tableData" style="width: 100%" :height="500" :border='false'>
				<el-table-column prop="number" label="座位号"></el-table-column>
				<el-table-column prop="serial" label="序号"></el-table-column>
				<el-table-column prop="paimin" label="排名"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="class" label="班级"></el-table-column>
				<el-table-column prop="timeCost" label="答题总时长">
					<template slot-scope="scope">
						<span>{{(scope.row.timeCost/60+'').split('.')[0]}}分{{scope.row.timeCost%60}}秒</span>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span>{{scope.row.status==0?'未登录':scope.row.status==1?'待确认':scope.row.status==2?'已确认':'异常'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="score" label="分数">
				</el-table-column>
				<el-table-column prop="status" label="操作">
					<template slot-scope="scope">
						<span @click="delPer(scope.row.id)" style="color: #950B02;cursor: pointer">删除</span>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="exportStu">导出成绩</el-button>
				<el-button type="primary" @click="per = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sessionInfo: [],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				},
				playerOptions: [],
				per: false,
				tableData: [],
				dizhi: [],
				paper: [],
				date: [],
				olddizhi: '',
				oldPaper: '',
				oldDate: '',
				paperInfo: [],
				nowseeid:''
			};
		},
		created() {
			this.selCpm();
			/* 试卷 */
			this.$http.get('/admin/selectexam').then(res => {
				if (res.data.status == 0) {
					this.paperInfo = res.data.data
				}
			})
		},
		methods: {
			// 组件的方法
			selCpm(p) {
				if (p) {
					this.pageInfo.nowPage = p;
				}
				let load = this.$loading({
					fullscreen: true
				});
				this.$http.get('/admin/games', {
					params: {
						token: this.$store.getters.token,
						p: this.pageInfo.nowPage
					}
				}).then(res => {
					if (res.data.status == 0) {
						res.data.data.forEach(i => {
							this.playerOptions.push({
								playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
								autoplay: false, //如果true,浏览器准备好时开始回放。
								muted: false, // 默认情况下将会消除任何音频。
								loop: false, // 导致视频一结束就重新开始。
								preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
								language: 'zh-CN',
								sources: [{
									type: "",
									src: 'http://192.168.1.100:9001/' + i.video //视频url地址
								}],
								height: 150,
								notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
								controlBar: {
									timeDivider: true,
									durationDisplay: true,
									remainingTimeDisplay: false,
									fullscreenToggle: true //全屏按钮
								}
							});
							this.dizhi.push(true);
							this.paper.push(true);
							this.date.push(true);
						});
						this.sessionInfo = res.data.data
						this.pageInfo = {
							totalCount: parseInt(res.data.pager.total_count),
							size: res.data.pager.page_size,
							nowPage: res.data.pager.current_page
						}
						load.close();
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
					load.close()
				});
			},
			addper(id) {
				this.$router.push({
					name: 'addper',
					params: {
						id: id
					}
				})
			},
			changePer(k) {
				this.nowseeid=k
				let load = this.$loading({
					fullscreen: true
				});
				this.$http.get('/admin/gamesPlayer', {
					params: {
						id: k
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.per = true;
						this.tableData=[]
						for (var i = 0; i < res.data.data.length; i++) {
							this.tableData.push({
								...res.data.data[i],
								paimin:i+1
							})
						}
						load.close();
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
					load.close()
				});
			},
			setDizhi(k, id) {
				if (this.dizhi[k]) {
					this.dizhi.splice(k, 1, false);
					this.olddizhi = this.sessionInfo[k].video
				} else {
					if (this.sessionInfo[k].video != this.olddizhi) {
						let load = this.$loading({
							fullscreen: true
						});
						this.$http.post('/admin/upGames', this.$qs.stringify({
							id: id,
							video: this.sessionInfo[k].video
						})).then(res => {
							if (res.data.status == 0) {
								this.$notify.success({
									title: '成功',
									message: res.data.msg,
									showClose: false
								});
								load.close();
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
							load.close()
						});
					}
					this.dizhi.splice(k, 1, true);
				}
			},
			setPaper(k, id) {
				if (this.paper[k]) {
					this.paper.splice(k, 1, false);
					this.oldPaper = this.sessionInfo[k].eid
				} else {
					if (this.sessionInfo[k].video != this.oldPaper) {
						let load = this.$loading({
							fullscreen: true
						});
						this.$http.post('/admin/upGames', this.$qs.stringify({
							id: id,
							eid: this.sessionInfo[k].eid
						})).then(res => {
							if (res.data.status == 0) {
								this.$notify.success({
									title: '成功',
									message: res.data.msg,
									showClose: false
								});
								this.selCpm();
								load.close();
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
							load.close()
						});
					}
					this.paper.splice(k, 1, true);
				}
			},
			setDate(k, id) {
				if (this.date[k]) {
					this.date.splice(k, 1, false);
					this.oldDate = this.sessionInfo[k].date
				} else {
					if (this.sessionInfo[k].video != this.oldPaper) {
						let load = this.$loading({
							fullscreen: true
						});
						this.$http.post('/admin/upGames', this.$qs.stringify({
							id: id,
							date: this.sessionInfo[k].date
						})).then(res => {
							if (res.data.status == 0) {
								this.$notify.success({
									title: '成功',
									message: res.data.msg,
									showClose: false
								});
								this.selCpm();
								load.close();
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
							load.close()
						});
					}
					this.date.splice(k, 1, true);
				}
			},
			delPer(id) {
				this.$confirm('是否删除该选手', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let load = this.$loading({
						fullscreen: true
					});
					this.$http.post('/admin/delGamesPlayer', this.$qs.stringify({
						id: id
					})).then(res => {
						if (res.data.status == 0) {
							this.$notify.success({
								title: '成功删除',
								message: res.data.msg,
								showClose: false
							});
							this.changePer(this.nowseeid);
							load.close();
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
						load.close()
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			exportStu(){
				this.$confirm('确认导出本场学生信息？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let urls = this.$rurl+'/admin/dcGamesPlayer?id='+this.nowseeid+'&token='+this.$store.getters.token;
					location.href = urls;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style scoped>
	.infoBody {
		width: 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		padding-bottom: 50px;
		overflow-y: auto;
		flex-wrap: wrap;
	}

	.infoBody::-webkit-scrollbar {
		width: 0.625rem;
	}

	/*滚动条里面滑块*/
	.infoBody::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #409EFF;
	}

	/*滚动条里面轨道*/
	.infoBody::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.3125rem;
		background: #EDEDED;
	}

	.one_info {
		width: 30%;
		height: 80%;
		margin: 5% 0 0 3%;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem #ececec;
		box-sizing: border-box;
		padding: 1.4rem 1.875rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.div_text {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.img_video {
		width: 100%;
		height: 150px;
		border-radius: 20px;
		display: flex;
		background-color: #000000;
		overflow: auto;
	}

	.img_video>div {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.div_text .inbot {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.div_addPer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
