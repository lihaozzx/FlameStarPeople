<template>
	<div>
		<el-table v-loading="inAdd" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" height="94%" style="width: 100%;">
			<el-table-column label="选手序号" prop="pid"></el-table-column>
			<el-table-column label="家书人身份" prop="shenf"></el-table-column>
			<el-table-column label="家书人名称" prop="tname" show-overflow-tooltip></el-table-column>
			<el-table-column label="上传时间" prop="date"></el-table-column>
			<el-table-column align="right" width="240">
				<template slot="header">
					<div style="display: flex;">
						<el-input v-model="search" size="mini" placeholder="选手序号搜索" />
						<el-button type="primary" round>搜索</el-button>
					</div>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleReview(scope.$index, scope.row)">审核</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="success" @click="handleRecommend(scope.$index, scope.row)">推荐</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selCpm"></el-pagination>
		</div>
		
		<el-dialog title="修改" :visible.sync="showChange">
			<vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>

			<div slot="footer">
				<el-button @click="showChange = false">取 消</el-button>
				<el-button type="primary" @click="changeStu" :loading="inAdd">完 成</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap'
	export default {
		created() {
			this.getStuInfo()
		},
		data() {
			return {
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
				myConfig: {
					// 编辑器不自动被内容撑高
					autoHeightEnabled: false,
					// 初始容器高度
					initialFrameHeight: 480,
					// 初始容器宽度
					initialFrameWidth: '100%',
					// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
					serverUrl: 'http://35.201.165.105:8000/controller.php',
				}
			}
		},
		methods: {
			handleReview(index, row) { //审核
				this.showForm = { ...row
				};
				this.oldForm = { ...row
				};
				this.showChange = true;
			},
			handleEdit(index, row) { //编辑
				this.showForm = { ...row
				};
				this.oldForm = { ...row
				};
				this.showChange = true;
			},
			handleRecommend(index, row) { //推荐
				this.showForm = { ...row
				};
				this.oldForm = { ...row
				};
				this.showChange = true;
			},
			getStuInfo() {
				this.inAdd = true;
				this.$http.post('/admin/letters', this.$qs.stringify({
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
			cancelUp() {
				this.upedTable = [];
				this.dizhi = '';
				this.haveInfo = false;
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
				this.$http.post('/admin/upStudent', this.$qs.stringify(
					this.oco(this.showForm, this.oldForm)
				)).then(res => {
					if (res) {
						this.showChange = false;
						this.cancelUp();
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
</style>
