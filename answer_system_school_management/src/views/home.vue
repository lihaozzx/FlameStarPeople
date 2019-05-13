<template>
	<div>
		<img src="../assets/login_bg.png" class="login_left" />
		<div class="btn_div2">
			<span>立德树人后台管理系统</span>
			<div>
				<el-button type="primary" @click="exportSchool">导出学校</el-button>
				<el-button type="primary" @click="addSchool">添加学校</el-button>
				<el-button type="primary" @click="seeAllStuden">查看所有学生</el-button>
			</div>
		</div>
		<div class="div_table">
			<div class="div_search">
				<el-form inline size="mini">
					<el-form-item>
						<el-select v-model="search.st" placeholder="请选择" clearable>
							<el-option label="未确认" value="1"></el-option>
							<el-option label="已确认" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input v-model="search.comp" autocomplete="off" placeholder="学校名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="search.phone" autocomplete="off" placeholder="联系电话"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="search.name" autocomplete="off" placeholder="联系人"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getSchool">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="removeSearch">清空</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table v-loading="loadingTable" :data="tableData" border style="width: 100%" :height="height*0.7">
				<el-table-column prop="pname" label="省" width="100">
				</el-table-column>
				<el-table-column prop="cname" label="市" width="100">
				</el-table-column>
				<el-table-column prop="aname" label="区" width="100">
				</el-table-column>
				<el-table-column prop="company" label="学校名称" width="300">
				</el-table-column>
				<el-table-column prop="name" label="联系人" width="300">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" width="200">
				</el-table-column>
				<el-table-column prop="type" label="状态">
					<template slot-scope="scope">
						<span>{{scope.row.status == 0 ? '冻结' : scope.row.status == 1 ? '未确认' : scope.row.status == 2 ? '已确认学员信息' : '异常'}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看学生</el-button>
						<el-button @click="showInfoFun(scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="div_page">
				<el-pagination background layout="prev, pager, next" :total="page.total" :page-size="5" :current-page="page.now"
				 @current-change="asd"></el-pagination>
			</div>
		</div>

		<el-dialog title="学校信息" :visible.sync="showInfo">
			<el-form :model="form" :label-width="formLabelWidth">
				<el-form-item label="省份">
					<el-select v-loading="loadingInfo.shen" v-model="form.province" placeholder="请选择省份" :disabled="loadingInfo.shen">
						<el-option v-for="(s,k) in shenInfo" :key="k" :label="s.name" :value="s.aid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="城市">
					<el-select v-loading="loadingInfo.shi" v-model="form.city" placeholder="请选择城市" :disabled="loadingInfo.shi">
						<el-option v-for="(s,k) in shiInfo" :key="k" :label="s.name" :value="s.aid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="地区">
					<el-select v-loading="loadingInfo.qu" v-model="form.area" placeholder="请选择地区" :disabled="loadingInfo.qu">
						<el-option v-for="(s,k) in quInfo" :key="k" :label="s.name" :value="s.aid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学校名称">
					<el-input v-model="form.company" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人姓名">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
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
					phone: '',
					company: '',
					province: '',
					city: '',
					area: ''
				},
				oldForm: {},
				shenInfo: [],
				shiInfo: [],
				quInfo: [],
				inAdd: false,
				add: false,
				search: {
					st: '',
					comp: '',
					phone: '',
					name: ''
				},
				page: {
					now: 1,
					total: 0
				}
			};
		},
		watch: {
			shen(n, o) {
				this.getlocInfo(n);
				if (o != '') {
					this.form.city = '';
					this.form.area = '';
					this.quInfo = []
				}
			},
			shi(n, o) {
				this.getlocInfo(n);
				if (o != '') {
					this.form.area = '';
				}
			}
		},
		created: function() {
			this.getSchool();
			this.getlocInfo();
		},
		methods: {
			exportSchool(){
				let urls = "http://1.sem98.com/main/dcschool";
				location.href = urls;
			},
			seeAllStuden(){
				this.$router.push({
					path: 'seeStudents',
					query: {
						schoolId: 'all'
					}
				});
			},
			asd(e) {
				this.page.now = e
				this.getSchool();
			},
			removeSearch() {
				this.search = {
					st: '',
					comp: '',
					phone: '',
					name: ''
				}
			},
			addSchool() {
				this.setForm({
					id: '',
					name: '',
					phone: '',
					company: '',
					province: '',
					city: '',
					area: ''
				});
				this.showInfo = true;
				this.add = true;
			},
			showInfoFun(e) {
				this.setForm(e);
				this.showInfo = true;
				this.add = false;
			},
			setForm(e) {
				this.form.id = e.id
				this.form.name = e.name;
				this.form.phone = e.phone;
				this.form.company = e.company;
				this.form.province = e.province;
				this.form.city = e.city;
				this.form.area = e.area;
				this.oldForm = { ...this.form
				};
				this.getlocInfo(e.province);
				this.getlocInfo(e.city);
			},
			getSchool() {
				this.loadingTable = true;
				this.$http.post('/scyld.php/main/school', this.$qs.stringify({
					page: this.page.now,
					token: this.$getCookie('token'),
					...this.search
				})).then(res => {
					this.page.now = res.data.pager.current_page;
					this.page.total = parseInt(res.data.pager.total_count);
					this.tableData = res.data.data;
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
				this.$router.push({
					path: 'seeStudents',
					query: {
						schoolId: k.id
					}
				});
			},
			submitSch() {
				this.inAdd = true
				let out = this.oco(this.form, this.oldForm);
				this.$http.post(this.add ? '/scyld.php/school/saveSchool' : '/scyld.php/school/upSchool', this.$qs.stringify(
					this.add ? { ...this.form
					} : { ...out,
						token: this.$getCookie('token')
					})).then(res => {
					if (res.data.status == 0) {
						this.showInfo = false;
						this.$notify.success({
							title: 'Info',
							message: this.add ? '添加成功' : '修改成功',
							showClose: false
						});
						this.getSchool();
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

<style>
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
	}

	.div_search {
		display: flex;
		justify-content: center;
		align-items: ;
	}

	.div_page {
		position: absolute;
		bottom: 1.2rem;
		right: 0;
		z-index: 10;
	}
</style>
