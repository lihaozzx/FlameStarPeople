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
				<el-table-column prop="cate" label="主题" width="100"></el-table-column>
				<el-table-column prop="name" label="题目"></el-table-column>
				<el-table-column prop="score" label="分数" width="50"></el-table-column>
				<el-table-column prop="xuanx" label="选项"></el-table-column>
				<el-table-column prop="answer" label="答案" width="200"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="showInfoFun(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
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
		<!-- 弹窗 -->
		<el-dialog title="试题" :visible.sync="showInfo">
			<el-form label-width="7rem">
				<el-form-item label="类型">
					<template slot-scope="scope">
						<span>{{form.type}}</span>
					</template>
				</el-form-item>
				<el-form-item label="主题">
					<el-select v-model="form.cate" filterable placeholder="请选择">
						<el-option v-for="(c,k) in addTopic.cate" :key="k" :label="c" :value="c"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="题目">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="选项">
					<div v-for="(x,k) in form.xuanx" :key="k" style="display: flex;margin-bottom: 10px;">
						<span style="margin-right: 5px;">{{k+1}}.</span>
						<el-input v-model="form.xuanx[k]"></el-input>
						<el-button v-if="k!=0" style="margin-left: 5px;" icon="el-icon-minus" circle @click="minusxuanx(k)"></el-button>
						<div v-else style="width: 52px; height: 27px;"></div>
					</div>
					<div style="margin-top: 5px;display: flex;align-items: center;justify-content: center;">
						<el-button icon="el-icon-plus" circle @click="addxuanx"></el-button>
					</div>
				</el-form-item>
				<el-form-item label="分数">
					<el-input v-model="form.score"></el-input>
				</el-form-item>
				<el-form-item label="答案">
					<el-input v-model="form.answer"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button type="danger" @click="delStu" :disabled="inAdd">删 除</el-button> -->
				<el-button @click="showInfo = false">取 消</el-button>
				<el-button type="primary" @click="submitTopic" :disabled="inAdd">修 改</el-button>
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
				loadingTable: false,
				showInfo:false,
				form:{},
				oldForm:{},
				inAdd:false,
				addTopic:{
					type:[],
					cate:[]
				}
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
					for (var i = 0; i < res.data.data.content.length; i++) {
						this.addTopic.type[i] = res.data.data.content[i];
					}
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
			/* 题目主题 */
			this.$http.get('/admin/basisInfo', {
				params: {
					id: 2
				}
			}).then(res => {
				if(res.data.status ==0){
					for (var i = 0; i < res.data.data.content.length; i++) {
						this.addTopic.cate[i] = res.data.data.content[i];
					}
				}
				this.b = false
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
			},
			showInfoFun(e){
				this.showInfo = true;
				e.xuanx = e.xuanx.split('|');
				this.form = {...e};
				this.oldForm = { ...this.form
				}
			},
			addxuanx(){
				this.form.xuanx.push('');
			},
			minusxuanx(k){
				this.form.xuanx.splice(k,1);
			},
			submitTopic(){
				this.inAdd = true
				this.$http.post('/admin/saveTopic', this.$qs.stringify({ ...this.form,
					token: this.$store.getters.token
				})).then(res => {
					if (res.data.status == 0) {
						this.showInfo = false;
						this.$notify.success({
							title: 'Info',
							message: '修改成功',
							showClose: false
						});
						this.selTop(this.pageInfo.nowPage);
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
					}
					this.inAdd = false;
				}).catch(() => {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
					this.inAdd = false;
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
