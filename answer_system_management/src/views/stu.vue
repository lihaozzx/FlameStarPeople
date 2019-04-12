<template>
	<div class="stu_tab">
		<div class="div_search">
			<el-form inline size="mini">
				<el-form-item>
					<el-input v-model="search.name" autocomplete="off" placeholder="学生姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-form-item v-if="sid == 'all'" type="primary">
						<el-input v-model="search.sname" autocomplete="off" placeholder="学校名称"></el-input>
					</el-form-item>
					<el-button type="primary" @click="getStuInfo">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="removeSearch">清空</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table v-loading="loadingTable" :data="tableData" style="width: 100%" :height="height*0.5" :border='false'>
			<el-table-column prop="number" label="序号"> </el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="age" label="年龄"></el-table-column>
			<el-table-column prop="size" label="衣服尺码"></el-table-column>
			<el-table-column prop="school" label="学校"></el-table-column>
			<el-table-column prop="grade" label="年级"></el-table-column>
			<el-table-column prop="class" label="班级"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button @click="showInfoFun(scope.row)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selStu"></el-pagination>
		</div>

		<!-- 弹窗 -->
		<el-dialog title="学校信息" :visible.sync="showInfo">
			<el-form :model="form" :label-width="formLabelWidth">
				<el-form-item label="序号">
					<el-input v-model="form.number" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="form.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年级">
					<el-input v-model="form.grade" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级">
					<el-input v-model="form.class" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="衣服尺码">
					<el-input v-model="form.size" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input v-model="form.phone" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showInfo = false">取 消</el-button>
				<el-button type="primary" @click="submitSch" :disabled="inAdd">修 改</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			height() {
				return innerHeight > 800 ? (innerHeight > 1080 ? innerHeight : 1080) : 800
			}
		},
		data() {
			return {
				loadingTable: true,
				tableData: [],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				},
				sid: 'all',
				formLabelWidth: '7rem',
				showInfo: false,
				search: {
					name: '',
					sname: ''
				},
				form: {
					number: '',
					name: '',
					age: '',
					grade: '',
					class: '',
					address: '',
					size: '',
					phone: '',
				},
				inAdd: false
			};
		},
		created() {
			let info = this.$store.getters.stuInfo.stu;
			let page = this.$store.getters.stuInfo.page;
			if (info.length != 0) {
				this.tableData = info;
				this.pageInfo = page;
				this.loadingTable = false;
			} else {
				this.selStu();
			}
		},
		methods: {
			// 组件的方法
			selStu(p) {
				this.loadingTable = true;
				if (p) {
					this.pageInfo.nowPage = p;
				}

				this.$http.get('/admin/student', {
					params: {
						token: this.$store.getters.token,
						p: this.pageInfo.nowPage,
						name:this.search.name,
						sname:this.search.sname
					}
				}).then(res => {
					if (res.status == 200 && res.data.status == 0) {
						this.tableData = res.data.data
						this.pageInfo = {
							totalCount: parseInt(res.data.pager.total_count),
							size: res.data.pager.page_size,
							nowPage: res.data.pager.current_page
						};
						this.$store.commit('stu', {
							stu: res.data.data,
							page: {
								totalCount: parseInt(res.data.pager.total_count),
								size: res.data.pager.page_size,
								nowPage: res.data.pager.current_page
							}
						})
					}
					this.loadingTable = false
				})
			},
			submitSch() {
				this.inAdd = true
				let out = this.oco(this.form, this.oldForm);
				this.$http.post('/admin/upStudent', this.$qs.stringify({ ...out,
					token: this.$store.getters.token
				})).then(res => {
					if (res.data.status == 0) {
						this.showInfo = false;
						this.$notify.success({
							title: 'Info',
							message: '修改成功',
							showClose: false
						});
						this.getStuInfo();
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
			},
			showInfoFun(e) {
				this.showInfo = true
				this.form = e;
				this.oldForm = { ...this.form
				}
			},
			getStuInfo() {
				this.selStu(1)
			},
			removeSearch() {
				this.search = {
					name: '',
					sname: ''
				}
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
		}
	}
</script>

<style>
	.stu_tab {
		box-sizing: border-box;
		padding-top: 0.625rem;
		height: calc(100% - 1.82rem - 60px);
	}

	.div_search {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		height: 1.82rem;
	}

	.el-table__body-wrapper::-webkit-scrollbar {
		width: 0.625rem;
	}

	/*滚动条里面滑块*/
	.el-table__body-wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #409EFF;
	}

	/*滚动条里面轨道*/
	.el-table__body-wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.3125rem;
		background: #EDEDED;
	}
</style>
