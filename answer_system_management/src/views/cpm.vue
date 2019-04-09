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
						<span class="o26">选题视频：</span>
						<span class="a26">{{s.video}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<div class="img_video">
					<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions[k]"></video-player>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">当前考卷：</span>
						<span class="a26">{{s.ename}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
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
						<span class="a26">{{s.date}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<!-- <div class="div_text">
					<span class="ts14">
						<span class="o26">当前状态：</span>
						<span class="a26">{{s.status}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div> -->
				<div class="div_addPer" @click="addper(s.id)">
					<span class="ts12 b18">添加人员</span>
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>
		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage"
			 @current-change="selCpm"></el-pagination>
		</div>
		
		<el-dialog title="人员信息" :visible.sync="per" width="70%">
			<el-table :data="tableData" style="width: 100%"  :height="500" :border='false'>
				{name:'姓名',class:'班级',number:'序号',score:'',timeCost:'答题总时长',status:'0.未登陆，1.待确认，2.已确认'}
				<el-table-column prop="number" label="序号"> </el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="age" label="年龄"></el-table-column>
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
			</el-table>
			<span slot="footer" class="dialog-footer">
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
				per:false,
				tableData:[]
			};
		},
		created() {
			this.selCpm()
		},
		methods: {
			// 组件的方法
			selCpm(p) {
				this.pageInfo.nowPage = p;
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
							})
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
			changePer(k){
				let load = this.$loading({
					fullscreen: true
				});
				this.$http.get('/admin/gamesPlayer', {
					params: {
						id: k
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.per=true;
						this.tableData=res.data.data;
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
		display: none;
	}

	.one_info {
		width: 30%;
		height: 80%;
		margin: 5% 0 0 3%;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem rgba(0, 0, 0, 0.2);
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
