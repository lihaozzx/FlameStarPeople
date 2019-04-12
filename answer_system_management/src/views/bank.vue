<template>
	<div class="root">
		<div class="infoBody">
			<div v-for="(s,k) in bankInfo" :key="k" class="one_bank_info">
				<span class="title">{{s.type}}</span>
				<span class="num">总题数:{{s.timu.length}}</span>
				<div class="div_addPer" @click="seeBank(k)">
					<span class="ts12 b18">查看全部</span>
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>
		<el-dialog title="题目信息" :visible.sync="per" width="70%">
			<el-table :data="bankInfo[show].timu" style="width: 100%" :height="500" :border='false'>
				<el-table-column prop="cate" label="主题">
					<template slot-scope="scope">
						<span>{{scope.row.cate==0?'诗词歌赋':scope.row.cate==1?'人文故事':scope.row.cate==2?'历史故事':'未知'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="题目"></el-table-column>
				<el-table-column prop="score" label="分数"></el-table-column>
				<el-table-column prop="xuanx" label="选项"></el-table-column>
				<el-table-column prop="answer" label="答案"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span>{{scope.row.status==0?'0':scope.row.status==1?'1':scope.row.status==2?'2':'3'}}</span>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="per = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- <div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="50" :page-size="3"></el-pagination>
		</div> -->
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
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				},
				show: 0,
				per: false
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
					this.bankInfo=[]
					res.data.data.content.forEach(t => {
						this.bankInfo.push({
							type: t,
							timu: []
						});
						http.push(this.topic(t));
					});
					/* 题库 */
					let _this = this;
					this.$http.all(http).then(this.$http.spread(function () {
						for (var i = 0; i < arguments.length; i++) {
							if (arguments[i].data.status == 0) {
								_this.bankInfo[i].timu=arguments[i].data.data
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
			topic(i){
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
</style>
