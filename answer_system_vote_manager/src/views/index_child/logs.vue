<template>
	<div>
		<el-table v-loading="inAdd" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		 height="94%" style="width: 100%;">
			<el-table-column label="助力人" prop="tname"></el-table-column>
			<el-table-column label="身份" prop="shenf"></el-table-column>
			<el-table-column label="票数" prop="num"></el-table-column>
			<el-table-column label="投票时间" prop="date"></el-table-column>
			<el-table-column>
				<template slot="header">
					<el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
					<el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</template>
				<template slot-scope="scope">
					<span>{{scope.row.type==1?'答题':'充值'}}</span>
				</template>
			</el-table-column>
		</el-table>

		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage"
			 @current-change="selCpm"></el-pagination>
		</div>

		<el-dialog title="上传" :visible.sync="showup">
			<div v-if="haveInfo">
				<el-table :data="upedTable.filter(data => !search2 || data.name.toLowerCase().includes(search2.toLowerCase()))"
				 style="width: 100%">
					<el-table-column label="分数" prop="score"></el-table-column>
					<el-table-column label="题目" prop="name" width="250"></el-table-column>
					<el-table-column label="主题" prop="cate" width="100"></el-table-column>
					<el-table-column label="类型" prop="type"></el-table-column>
					<el-table-column label="选项" prop="xuanx"></el-table-column>
					<el-table-column label="答案" prop="answer"></el-table-column>
					<el-table-column align="right" fixed="right" width="100">
						<template slot="header" slot-scope="scope">
							<el-input v-model="search2" size="mini" placeholder="题目" />
						</template>
						<template slot-scope="scope">
							<span class="cell_span">{{scope.row.cz==0?'不存在':'已存在'}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div v-else class="juzhong">
				<el-upload drag action="asd" :before-upload="upload">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">
						只能上传xlsx/xls文件
						<span @click="downMOban" style="color:#409EFF;cursor: pointer">下载模板</span>
					</div>
				</el-upload>
			</div>
			<div slot="footer">
				<el-button @click="cancelUp">取消上传</el-button>
				<el-button @click="showup = false">取 消</el-button>
				<el-button type="primary" @click="submitStu" :loading="inAdd">添 加</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="showChange">
			<div class="ovy">
				<el-form label-width="6rem">
					<el-form-item label="姓名">
						<el-input v-model="showForm.name"></el-input>
					</el-form-item>
					<el-form-item label="学校">
						<el-input v-model="showForm.school"></el-input>
					</el-form-item>
					<el-form-item label="年级">
						<el-input v-model="showForm.grade"></el-input>
					</el-form-item>
					<el-form-item label="头像地址">
						<el-input v-model="showForm.headUrl"></el-input>
					</el-form-item>
					<el-form-item label="视频地址">
						<el-input v-model="showForm.videoUrl"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer">
				<el-button @click="showChange = false">取 消</el-button>
				<el-button type="primary" @click="changeStu" :loading="inAdd">修 改</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
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
				type: '',
				pid: '',
				pageInfo: {
					totalCount: 0,
					size: 0,
					nowPage: 1,
				}
			}
		},
		methods: {
			handleEdit(index, row) {
				this.showForm = { ...row
				};
				this.oldForm = { ...row
				};
				this.showChange = true;
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			getStuInfo() {
				this.inAdd = true;
				this.$http.post('/admin/votes', this.$qs.stringify({
					type: this.type,
					pid: this.pid,
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
				this.$http.post('/admin/selecttopicList', fd).then(res => {
					if (res) {
						this.upedTable = res.data.topics;
						this.dizhi = res.data.dizhi;
						this.haveInfo = true;
					}
				});
				return false
			},
			submitStu() {
				this.inAdd = true;
				this.$http.post('/admin/daoruTopic', this.$qs.stringify({
					dizhi: this.dizhi
				})).then(res => {
					if (res) {
						this.showup = false;
						this.getStuInfo();
						this.cancelUp();
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:#7FFF00">添加成功</strong>',
							showClose: false
						});
					}
					this.inAdd = false;
				});
			},
			changeStu() {
				this.inAdd = true;
				this.$http.post('/admin/saveTopic', this.$qs.stringify(
					this.oco(this.showForm, this.oldForm)
				)).then(res => {
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
