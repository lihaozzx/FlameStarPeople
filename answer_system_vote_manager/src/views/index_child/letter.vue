<template>
	<div>
		<el-table v-loading="inAdd" :data="tableData" height="94%" style="width: 100%;">
			<el-table-column label="选手编号" prop="pid"></el-table-column>
			<el-table-column label="家书人身份" prop="shenf"></el-table-column>
			<el-table-column label="家书人名称" prop="tname" show-overflow-tooltip></el-table-column>
			<el-table-column label="上传时间" prop="date"></el-table-column>
			<el-table-column align="right" width="240">
				<template slot="header" slot-scope="scope">
					<div style="display: flex;">
						<el-input v-model="search" size="mini" placeholder="选手序号搜索" />
						<el-button type="primary" round @click="searchFun">搜索</el-button>
					</div>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleReview(scope.$index, scope.row)" :disabled="scope.row.review==1">审核</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="success" @click="handleRecommend(scope.$index, scope.row)">{{scope.row.zhu==1?'取消推荐':'推荐'}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<span class="mr">未审核</span>
			<el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="chsh"></el-switch>
		</div>
		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selCpm"></el-pagination>
		</div>

		<el-dialog :title="isReview?'审核':'修改'" :visible.sync="showChange">
			<vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>

			<div slot="footer">
				<el-button @click="showChange = false">取 消</el-button>
				<el-button v-if="isReview" type="primary" @click="changeStu" :loading="inAdd">通 过</el-button>
				<el-button v-else type="primary" @click="changeLetter" :loading="inAdd">修 改</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'
	export default {
		watch: {
			chsh() {
				this.inAdd = true;
				this.pageInfo.nowPage =1;
				this.$http.post('/admin/letters', this.$qs.stringify({
					p: this.pageInfo.nowPage,
					fre:this.chsh?1:'',
					number:this.search
				})).then(res => {
					if (res) {
						this.tableData = res.data;
						this.pageInfo = {
							totalCount: parseInt(res.pager.total_count),
							size: res.pager.page_size,
							nowPage: res.pager.current_page,
						}
					}
					this.inAdd = false;
				})
			}
		},
		created() {
			this.getStuInfo()
		},
		data() {
			return {
				chsh:false,
				tableData: [],
				upedTable: [],
				search: '',
				search2: '',
				showup: false,
				showChange: false,
				inAdd: false,
				haveInfo: false,
				dizhi: '',
				showForm: {},
				oldForm: {},
				name: '',
				sname: '',
				pageInfo: {
					totalCount: 0,
					size: 0,
					nowPage: 1,
				},
				msg: '',
				oldmsg: '',
				nowCL: '',
				myConfig: {
					// 编辑器不自动被内容撑高
					autoHeightEnabled: false,
					// 初始容器高度
					initialFrameHeight: 480,
					// 初始容器宽度
					initialFrameWidth: '100%',
					// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
					serverUrl: 'http://35.201.165.105:8000/controller.php',
				},
				isReview: true,
			}
		},
		methods: {
			searchFun() {
				this.inAdd = true;
				this.pageInfo.nowPage = 1;
				this.$http.post('/admin/letters', this.$qs.stringify({
					p: this.pageInfo.nowPage,
					number:this.search
				})).then(res => {
					if (res) {
						this.tableData = res.data;
						this.pageInfo = {
							totalCount: parseInt(res.pager.total_count),
							size: res.pager.page_size,
							nowPage: res.pager.current_page,
						}
					}
					this.inAdd = false;
				})
			},
			handleReview(index, row) { //审核
				this.isReview = true;
				this.msg = row.content;
				this.nowCL = row.id;
				this.showChange = true;
			},
			handleEdit(index, row) { //编辑
				this.isReview = false;
				this.msg = row.content;
				this.oldmsg = row.content;
				this.nowCL = row.id;
				this.showChange = true;
			},
			handleRecommend(index, row) { //推荐
				const h = this.$createElement;
				if (row.zhu == 1) {
					this.$msgbox({
						title: '消息',
						message: h('p', null, [
							h('span', {
								style: 'color: red'
							}, '确认取消推荐这份家书吗'),
						]),
						showCancelButton: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						beforeClose: (action, instance, done) => {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '执行中...';
								this.$http.post('/admin/qxzhu', this.$qs.stringify({
									id: row.id
								})).then(res => {
									if (res) {
										done();
										instance.confirmButtonLoading = false;
									}
								})
							} else {
								done();
							}
						}
					}).then(() => {
						this.getStuInfo();
					});
				} else {
					this.$msgbox({
						title: '消息',
						message: h('p', null, [
							h('span', null, '确认推荐这份家书吗'),
						]),
						showCancelButton: true,
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						beforeClose: (action, instance, done) => {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								instance.confirmButtonText = '执行中...';
								this.$http.post('/admin/zhuLet', this.$qs.stringify({
									id: row.id
								})).then(res => {
									if (res) {
										done();
										instance.confirmButtonLoading = false;
									}
								})
							} else {
								done();
							}
						}
					}).then(() => {
						this.getStuInfo();
					});
				}

			},
			getStuInfo() {
				this.inAdd = true;
				this.$http.post('/admin/letters', this.$qs.stringify({
					fre:this.chsh?1:'',
					number:this.search,
					p: this.pageInfo.nowPage
				})).then(res => {
					if (res) {
						this.tableData = res.data;
						this.pageInfo = {
							totalCount: parseInt(res.pager.total_count),
							size: res.pager.page_size,
							nowPage: res.pager.current_page,
						}
					}
					this.inAdd = false;
				})
			},
			selCpm(p) {
				this.pageInfo.nowPage = p;
				this.getStuInfo();
			},
			upload(file) {
				let fd = new FormData();
				fd.append('file', file); //传文件
				this.$http.post('/admin/selectkqList', fd).then(res => {
					if (res) {
						this.upedTable = res.data.student;
						this.dizhi = res.data.dizhi;
						this.haveInfo = true;
					}
				});
				return false
			},
			submitStu() {
				this.inAdd = true;
				this.$http.post('/admin/daoruStu', this.$qs.stringify({
					dizhi: this.dizhi
				})).then(res => {
					if (res) {
						this.showup = false;
					}
					this.inAdd = false;
				});
			},
			changeStu() {
				this.inAdd = true;
				this.$http.post('/admin/uplettrs', this.$qs.stringify({
					id: this.nowCL,
					content: this.msg
				})).then(res => {
					if (res) {
						this.inAdd = true;
						this.$http.post('/admin/reviewLet', this.$qs.stringify({
							id: this.nowCL,
							review: 1
						})).then(res => {
							if (res) {
								this.showChange = false;
								this.getStuInfo();
								this.$notify({
									title: '成功',
									dangerouslyUseHTMLString: true,
									iconClass: 'el-icon-success',
									message: '<strong style="color:#7FFF00">审核成功</strong>',
									showClose: false
								});
							}
							this.inAdd = false;
						});
					}
					this.inAdd = false;
				});
			},
			changeLetter() {
				this.inAdd = true;
				this.$http.post('/admin/uplettrs', this.$qs.stringify({
					id: this.nowCL,
					content: this.msg
				})).then(res => {
					if (res) {
						this.showChange = false;
						this.getStuInfo();
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:#7FFF00">修改成功</strong>',
							showClose: false
						});
					}
					this.inAdd = false;
				});
			},
			downMOban() {

			},
			oco(n, o) {
				let out = {}
				for (let k in n) {
					for (let j in o) {
						if (k == j) {
							if (n[k] == o[j] && k != 'id') {
								out[k] = '';
							} else {
								out[k] = n[k];
							}
						}
					}
				}
				return out;
			}
		},
		components: {
			VueUeditorWrap
		}
	}
</script>

<style scoped>
	.juzhong {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cell_span {
		width: 100%;
		text-align: center;
	}

	.ovy {
		height: 50vh;
		overflow-y: auto;
	}

	.ovy::-webkit-scrollbar {
		display: none;
	}

	.infoFooter {
		position: absolute;
		right: 5px;
		bottom: 1%;
	}
	.mr{
		margin-right: 2px;
	}
</style>
