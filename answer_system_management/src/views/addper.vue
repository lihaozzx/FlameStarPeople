<template>
	<div class="stu_tab">
		<div>
			<el-button type="primary" @click="seeInfo">选中选手信息</el-button>
		</div>
		<div class="div_search">
			<el-form inline size="mini">
				<el-form-item>
					<el-input v-model="search.name" autocomplete="off" placeholder="学生姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="search.sname" autocomplete="off" placeholder="学校名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getStuInfo">搜索</el-button>
					<el-button type="primary" @click="removeSearch">清空</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table v-loading="loadingTable" :data="canaddStu" style="width: 100%" :height="height*0.55" :border='false' ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="number" label="序号"> </el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="age" label="年龄"></el-table-column>
			<el-table-column prop="size" label="衣服尺码"></el-table-column>
			<el-table-column prop="school" label="学校"></el-table-column>
			<el-table-column prop="grade" label="年级"></el-table-column>
			<el-table-column prop="class" label="班级"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
			<el-table-column prop="phone" label="电话"></el-table-column>
		</el-table>
		<div class="div_back" @click="goback">
			<i class="el-icon-back"></i>
			<span>返回场次列表</span>
		</div>

		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selStu"></el-pagination>
		</div>

		<!-- 弹窗 -->
		<el-dialog title="学校信息" :visible.sync="showInfo">
			<el-table v-loading="loadingTable" :data="showChoseStu" style="width: 100%" :height="height*0.5" :border='false'>
				<el-table-column prop="number" label="座位号">
					<template slot-scope="scope">
						<el-input :disabled="!scope.row.isnew" v-model="scope.row.number" placeholder="座位号"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="school" label="学校"></el-table-column>
				<el-table-column prop="grade" label="年级"></el-table-column>
				<el-table-column prop="class" label="班级"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showInfo = false">取 消</el-button>
				<el-button type="primary" @click="submitSch" :disabled="inAdd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			height() {
				return innerHeight > 800 ? (innerHeight > 1080 ? innerHeight : 1080) : 800
			},
			out() {
				let o = []
				this.choseStu.forEach(s => {
					o.push({
						id: s.id,
						number: s.number
					})
				});
				return o
			},
			canaddStu(){
				let o = [];
				this.tableData.forEach(all=>{
					let a = true;
					for (var i = 0; i < this.chosedStu.length; i++) {
						if(this.chosedStu[i].pid==all.id){
							a = false;
							return;
						}
					}
					if(a){
						o.push(all)
					}
				});
				return o;
			},
			showChoseStu(){
				let o = [];
				this.choseStu.forEach(a=>{
					o.push(a)
				})
				this.chosedStu.forEach(a=>{
					o.push(a)
				})
				return o
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
				inAdd: false,
				id: '',
				choseStu: [],
				chosedStu:[]
			};
		},
		created() {
			this.id = this.$route.params.id
			this.selStu();
			this.findAdded();
		},
		methods: {
			// 组件的方法
			selStu(p) {
				this.loadingTable = true;
				if (p) {
					this.pageInfo.nowPage = p;
				}

				this.$http.get('/admin/student2', {
					params: {
						p: this.pageInfo.nowPage,
						name: this.search.name,
						sname: this.search.sname
					}
				}).then(res => {
					if (res.status == 200 && res.data.status == 0) {
						this.tableData = res.data.data
						this.pageInfo = {
							totalCount: parseInt(res.data.pager.total_count),
							size: res.data.pager.page_size,
							nowPage: res.data.pager.current_page
						};
					}
					this.loadingTable = false
				})
			},
			findAdded() {
				this.$http.post('/admin/gamesPlayer', this.$qs.stringify({
					id: this.id
				})).then(res => {
					if(res.data.status == 0){
						this.chosedStu=res.data.data
					}
				})
			},
			handleSelectionChange(val) {
				this.choseStu = [];
				val.forEach(v => {
					let a = {...v,
					isnew:true};
					a.number = ''
					this.choseStu.push(a);
				})
			},
			seeInfo() {
				this.showInfo = true;
			},
			submitSch() {
				this.inAdd = true
				this.$http.post('/admin/addGamesPlayer', this.$qs.stringify({
					players: this.out,
					id: this.id
				})).then(res => {
					if (res.data.status == 0) {
						this.$notify.success({
							title: 'Info',
							message: '添加成功',
							showClose: false
						});
						this.$router.go(-1);
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
			goback() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.stu_tab {
		height: 100%;
		box-sizing: border-box;
		padding-top: 0.625rem;
		background-color: #FFFFFF;
		border-radius: 20px;
		position: relative;
	}

	.div_search {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		height: 1.82rem;
	}

	.div_back {
		width: 100%;
		height: 30px;
		position: relative;
		top: 10px;
		left: 30px;
		color: #1890FF;
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
