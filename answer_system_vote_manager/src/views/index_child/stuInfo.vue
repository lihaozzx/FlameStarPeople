<template>
	<div>
		<!-- tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
		<el-table v-loading="inAdd" :data="tableData" height="94%"  style="width: 100%;">
			<el-table-column label="序号" prop="id"></el-table-column>
			<el-table-column label="姓名" prop="name"></el-table-column>
			<el-table-column label="学校" prop="school" show-overflow-tooltip></el-table-column>
			<el-table-column label="年级" prop="grade"></el-table-column>
			<el-table-column label="头像名称" prop="head"></el-table-column>
			<el-table-column label="" prop="video">
				<template slot="header" slot-scope="scope">
					<div style="display: flex;">
						<span>视频名称</span>
						<el-input v-model="name" size="mini" placeholder="姓名搜索" />
					</div>
				</template>
			</el-table-column>
			<el-table-column align="right" width="240">
				<template slot="header" slot-scope="scope">
					<div style="display: flex;">
						<el-button @click="getStuInfo">搜索</el-button>
						<el-button type="success" round @click="showup=true">上传</el-button>
					</div>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" disabled>删除</el-button>
					<el-button size="mini" @click="handledc(scope.row)">导出</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selCpm"></el-pagination>
		</div>

		<el-dialog title="上传" :visible.sync="showup">
			<div v-if="haveInfo">
				<el-table :data="upedTable.filter(data => !search2 || data.name.toLowerCase().includes(search2.toLowerCase()))" style="width: 100%" height="500px">
					<el-table-column label="编号" prop="serial" width="50" fixed="left"></el-table-column>
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="学校" prop="school"></el-table-column>
					<el-table-column label="年级" prop="grade"></el-table-column>
					<el-table-column label="头像地址" prop="head"></el-table-column>
					<el-table-column label="视频地址" prop="video"></el-table-column>
					<el-table-column align="right" fixed="right" width="100">
						<template slot="header" slot-scope="scope">
							<el-input v-model="search2" size="mini" placeholder="姓名" />
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
						<el-input v-model="showForm.head"></el-input>
					</el-form-item>
					<el-form-item label="视频地址">
						<el-input v-model="showForm.video"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer">
				<el-button @click="showChange = false">取 消</el-button>
				<el-button type="primary" @click="changeStu" :loading="inAdd">修 改</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导出" :visible.sync="sdc">
			<div style="display: flex;align-items: center;justify-content: space-between;height: 200px;">
				<el-button @click="dcdd" :loading="inAdd2">导出支付订单</el-button>
				<el-button @click="dcdt" :loading="inAdd2">导出答题助力</el-button>
				<el-button @click="dczf" :loading="inAdd2">导出支付助力</el-button>
				<el-button @click="dcjs" :loading="inAdd2">导出家书加分</el-button>
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
				sdc:false,
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
				dcId:'',
				inAdd2:false
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
			handledc(row){
				this.sdc=true;
				this.dcId = row.id
			},
			dcdd(){
				location.href = this.$url + '/admin/dcPays?st=1&pid=' +this.dcId + '&token=' + this.$store.getters.tokens;
			},
			dcdt(){
				location.href = this.$url + '/admin/dcVoter?type=1&pid=' +this.dcId + '&token=' + this.$store.getters.tokens;
			},
			dczf(){
				location.href = this.$url + '/admin/dcVoter?type=2&pid=' +this.dcId + '&token=' + this.$store.getters.tokens;
			},
			dcjs(){
				location.href = this.$url + '/admin/dcVoter?type=3&pid=' +this.dcId + '&token=' + this.$store.getters.tokens;
			},
			getStuInfo() {
				this.inAdd = true;
				this.$http.post('/admin/student', this.$qs.stringify({
					id: this.name,
					p:this.pageInfo.nowPage
				})).then(res => {
					if (res) {
						this.tableData = res.data;
						this.pageInfo={
							totalCount:parseInt(res.pager.total_count),
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
						this.cancelUp();
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
	}
</script>

<style scoped>
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
