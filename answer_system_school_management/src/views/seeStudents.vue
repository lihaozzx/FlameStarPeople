<template>
	<div>
		<img src="../assets/login_bg.png" class="login_left" />
		<div class="btn_div2">
			<div class="back_icon" @click="goback">
				<i class="el-icon-error"></i>
			</div>
			<span>学生信息查看</span>
			<div>
				<el-button v-if="sid == 'all'" type="primary" @click="addSchool">批量导入</el-button>
			</div>
		</div>
		<div class="div_table">
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
			<el-table v-loading="loadingTable" :data="tableData" border style="width: 100%" :height="height*0.7">
				<el-table-column prop="number" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="100">
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="100">
				</el-table-column>
				<el-table-column prop="size" label="衣服尺码" width="100">
				</el-table-column>
				<el-table-column prop="grade" label="年级" width="80">
				</el-table-column>
				<el-table-column prop="class" label="班级" width="80">
				</el-table-column>
				<el-table-column prop="address" label="地址" width="240">
				</el-table-column>
				<el-table-column prop="phone" label="电话">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-button @click="showInfoFun(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="div_page">
				<el-pagination background layout="prev, pager, next" :total="page.total" :page-size="20" :current-page="page.now"
				 @current-change="asd"></el-pagination>
			</div>
		</div>

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
				<el-button type="primary" @click="submitSch" :disabled="inAdd">{{add?'添 加':'修 改'}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			shen() {
				return this.form.province;
			},
			shi() {
				return this.form.city;
			}
		},
		data() {
			return {
				height: innerHeight,
				dizhi: '',
				loadingTable: true,
				loadingInfo: {
					shen: false,
					shi: false,
					qu: false
				},
				tableData: [],
				showinfo: null,
				showInfo: false,
				formLabelWidth: '7rem',
				form: {
					id: '',
					name: '',
					age:'',
					size:'',
					grade:'',
					class:'',
					address:'',
					phone:'',
					number:''
				},
				oldForm: {},
				shenInfo: [],
				shiInfo: [],
				quInfo: [],
				inAdd: false,
				add: false,
				search: {
					name: '',
					sname:''
				},
				page: {
					now: 1,
					total: 0
				},
				sid: ''
			};
		},
		created: function() {
			this.sid = this.$route.query.schoolId;
			this.getStuInfo();
			this.getlocInfo();
		},
		methods: {
			goback() {
				this.$router.go(-1);
			},
			asd(e) {
				this.page.now = e
				this.getStuInfo();
			},
			removeSearch() {
				this.search = {
					name: ''
				}
			},
			addSchool() {
				this.$router.push({
					name: 'addStuFromExcl'
				});
			},
			showInfoFun(e) {
				console.log(e)
				this.setForm(e);
				this.showInfo = true;
				this.add = false;
			},
			setForm(e) {
				this.form.id=e.id;
				this.form.name=e.name;
				this.form.age=e.age;
				this.form.size=e.size;
				this.form.grade=e.grade;
				this.form.class=e.class;
				this.form.address=e.address;
				this.form.phone=e.phone;
				this.form.number=e.number
				this.oldForm = { ...this.form}
			},
			getStuInfo() {
				this.loadingTable = true;
				this.$http.post('/scyld.php/main/student', this.$qs.stringify({
					sid:this.sid,
					page: this.page.now,
					token: this.$getCookie('token'),
					...this.search
				})).then(res => {
					if(res.data.status == 0){
						if(res.data.pager){
							this.page.now = res.data.pager.current_page;
							this.page.total = parseInt(res.data.pager.total_count);
						}
						this.tableData = [];
						res.data.data.forEach(i => {
							this.tableData.push({ ...i
							})
						});
					}
					this.loadingTable = false;
				});
			},
			getlocInfo(aid) {
				if (!aid) {
					this.loadingInfo.shen = true;
				} else if (aid.length == 2) {
					this.loadingInfo.shi = true;
				} else {
					this.loadingInfo.qu = true;
				}
				this.$http.get('/main/getpca', {
					params: {
						aid: aid
					}
				}).then(res => {
					if (res.data.status == 0) {
						if (!aid) {
							this.shenInfo = res.data.data.result;
							this.loadingInfo.shen = false;
						} else if (aid.length == 2) {
							this.shiInfo = res.data.data.result;
							this.loadingInfo.shi = false;
						} else {
							this.quInfo = res.data.data.result;
							this.loadingInfo.qu = false;
						}
					}
				});
			},
			handleClick(k) {

			},
			submitSch() {
				this.inAdd = true
				let out = this.oco(this.form, this.oldForm);
				this.$http.post('/scyld.php/school/upStudent', this.$qs.stringify({ ...out,
						token: this.$getCookie('token')
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
				})
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

<style scoped>
	.btn_div2 {
		margin-top: 2.5rem;
		margin-left: 10%;
		display: flex;
		flex-wrap: wrap;
		font-size: 3.125rem;
		width: 80%;
		justify-content: space-between;
		z-index: 10;
	}

	.div_table {
		margin-top: 2rem;
		width: 80%;
		min-width: 50rem;
		margin-left: 10%;
		position: relative;
		padding-bottom: 3.125rem;
		background-color: #F0F5FF;
	}

	.div_search {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding-top:0.625rem;
	}

	.div_page {
		position: absolute;
		bottom: 1.2rem;
		right: 0;
		z-index: 10;
	}
</style>
