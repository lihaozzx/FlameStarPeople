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
				<!-- answer: "0"
cate: "0"
id: "2"
name: "请问"
score: "12"
status: "0"
type: "0"
xuanx: "["\u53bb","\u6211","\u997f"]" -->
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
						<span>{{scope.row.status==0?'未登录':scope.row.status==1?'待确认':scope.row.status==2?'已确认':'异常'}}</span>
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
					type: '问答题',
					timu: []
				}, {
					type: '填空题',
					timu: []
				}, {
					type: '组合题',
					timu: []
				}, ],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				},
				show:0,
				per:false
			};
		},
		created() {
			/* 题库 */
			this.$http.get('/admin/topics', {
				params: {
					type: 0
				}
			}).then(res => {
				if(res.data.status == 0){
					this.bankInfo[0].timu = res.data.data
				}
			});
			this.$http.get('/admin/topics', {
				params: {
					type: 1
				}
			}).then(res => {
				if(res.data.status == 0){
					this.bankInfo[1].timu = res.data.data
				}
			});
			this.$http.get('/admin/topics', {
				params: {
					type: 2
				}
			}).then(res => {
				if(res.data.status == 0){
					this.bankInfo[2].timu = res.data.data
				}
			});
		},
		methods: {
			// 组件的方法
			seeBank(k){
				this.per = true
				this.show = k
			}
		}
	}
</script>

<style scoped>
	.infoBody {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding-bottom: 50px;
		flex-wrap: wrap;
	}

	.one_bank_info {
		width: 350px;
		height: 235px;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem #ececec;
		box-sizing: border-box;
		padding: 1.4rem 1.875rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.title{
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
