<template>
	<div class="root">
		<div class="infoBody">
			<div v-for="(s,k) in bankInfo" :key="k" class="one_bank_info">
				<span class="title">{{s.type}}</span>
				<span class="num">总题数:{{s.allNum}}</span>
				<div class="div_addPer" @click="seeBank(k)">
					<span class="ts12 b18">查看全部</span>
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>
		<el-dialog title="题目信息" :visible.sync="per" width="70%">
			<el-table v-loading="loadingTable" :data="bankInfo[show].timu" style="width: 100%" :height="500" :border='false'>
				<el-table-column prop="cate" label="主题"></el-table-column>
				<el-table-column prop="name" label="题目"></el-table-column>
				<el-table-column prop="score" label="分数"></el-table-column>
				<el-table-column prop="xuanx" label="选项"></el-table-column>
				<el-table-column prop="answer" label="答案"></el-table-column>
				<!-- <el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span>{{scope.row.status==0?'0':scope.row.status==1?'1':scope.row.status==2?'2':'3'}}</span>
					</template>
				</el-table-column> -->
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="per = false">确 定</el-button>
			</span>
			<div class="infoFooterDialog">
				<el-pagination layout="prev, pager, next" :total="pageInfo[show].totalCount" :page-size="pageInfo[show].size"
				 :current-page="pageInfo[show].nowPage" @current-change="selTop"></el-pagination>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo: [{
					type: '暂无',
					timu: []
				}],
				pageInfo: [{
					totalCount: 0,
					size: 0,
					nowPage: 0
				}],
				show: 0,
				per: false,
				loadingTable: false
			};
		},
		created() {
			/* 题型 */
			let load = this.$loading({
				fullscreen: true
			});
			let http = [];
			this.$http.post('/admin/basisInfo', this.$qs.stringify({
				id: 1,
				token: this.$store.getters.token
			})).then(res => {
				if (res.data.status == 0) {
					this.bankInfo = []
					res.data.data.content.forEach(t => {
						this.bankInfo.push({
							type: t,
							timu: [],
							allNum: 0
						});
						http.push(this.topic(t));
					});
					/* 题库 */
					let _this = this;
					this.$http.all(http).then(this.$http.spread(function() {
						_this.pageInfo = [];
						for (var i = 0; i < arguments.length; i++) {
							if (arguments[i].data.status == 0) {
								_this.bankInfo[i].timu = arguments[i].data.data;
								_this.bankInfo[i].allNum = arguments[i].data.pager.total_count;
								_this.pageInfo.push({
									totalCount: parseInt(arguments[i].data.pager.total_count),
									size: arguments[i].data.pager.page_size,
									nowPage: arguments[i].data.pager.current_page
								})
							}
						}
						load.close();
					}));
				}
			});
		},
		methods: {
			// 组件的方法
			seeBank(k) {
				this.per = true
				this.show = k
			},
			selTop(p) {
				this.loadingTable = true;
				this.$http.get('/admin/topics', {
					params: {
						type: this.bankInfo[this.show].type,
						p: p
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.bankInfo[this.show].timu = res.data.data;
						this.pageInfo[this.show] = {
							totalCount: parseInt(res.data.pager.total_count),
							size: res.data.pager.page_size,
							nowPage: res.data.pager.current_page
						}
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
					}
					this.loadingTable = false;
				}).catch(() => {
					this.loadingTable = false;
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
				});
			},
			topic(i) {
				return this.$http.get('/admin/topics', {
					params: {
						type: i
					}
				})
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
		flex-wrap: wrap;
		overflow-y: auto;
	}

	.one_bank_info {
		width: 350px;
		height: 235px;
		margin-top: 40px;
		margin-left: 50px;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem #ececec;
		box-sizing: border-box;
		padding: 1.4rem 1.875rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.title {
		font-size: 30px;
	}

	.div_addPer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.infoFooterDialog {
		position: absolute;
		right: 5px;
		top: 585px
	}
</style>
