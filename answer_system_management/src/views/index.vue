<template>
	<div class="show">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="student">查看学生</el-menu-item>
			<el-menu-item index="session">查看场次</el-menu-item>
			<el-menu-item index="bank">查看题库</el-menu-item>
			<el-menu-item index="paper">查看考卷</el-menu-item>

			<el-button v-if="activeIndex=='student'" type="primary" style='position: absolute;right: 1%;top: 20%;' @click="showInfo = true">新增学生</el-button>
			<el-button v-else-if="activeIndex=='session'" type="primary" style='position: absolute;right: 1%;top: 20%;' @click="showInfo = true">新增场次</el-button>
			<el-button v-else-if="activeIndex=='bank'" type="primary" style='position: absolute;right: 1%;top: 20%;' @click="showInfo = true">新增题目</el-button>
			<el-button v-else-if="activeIndex=='paper'" type="primary" style='position: absolute;right: 1%;top: 20%;' @click="toaddPaper">新增试卷</el-button>
			<el-button v-else type="primary" style='display: none;'></el-button>
		</el-menu>
		<router-view></router-view>

		<!-- 弹窗 -->
		<el-dialog :width="activeIndex=='student'?'50%':activeIndex=='bank'?'30%':activeIndex=='session'?'30%':'代做'" :title="activeIndex=='student'?'添加学生':activeIndex=='bank'?'添加题目':activeIndex=='session'?'添加场次':'代做'"
		 :visible.sync="showInfo">
			<!-- 添加学生 -->
			<div class="div_dialog" v-if="activeIndex=='student'">
				<div class="juzhong" v-if="addStu.status">
					<el-upload drag action="asd" :before-upload="upload">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传xlsx/xls文件</div>
					</el-upload>
				</div>
				<div v-else>
					<div class="ovy">
						<el-table :data="addStu.tableData" style="width: 100%" :border='false'>
							<el-table-column prop="number" label="序号"></el-table-column>
							<el-table-column prop="name" label="姓名"></el-table-column>
							<el-table-column prop="age" label="年龄"></el-table-column>
							<el-table-column prop="size" label="衣服尺码"></el-table-column>
							<el-table-column prop="school" label="学校"></el-table-column>
							<el-table-column prop="grade" label="年级"></el-table-column>
							<el-table-column prop="class" label="班级"></el-table-column>
							<el-table-column prop="address" label="地址"></el-table-column>
							<el-table-column prop="phone" label="电话"></el-table-column>
							<el-table-column prop="cz" label="提示">
								<template slot-scope="scope">
									<span :style="scope.row.cz === 1? 'color:#f5222d':'color:#52c41a'">{{scope.row.cz === 1? '已存在':'正常'}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div slot="footer">
						<el-button @click="showInfo = false">取 消</el-button>
						<el-button type="primary" @click="submitStu" :loading="inAdd">上 传</el-button>
					</div>
				</div>
			</div>

			<!-- 添加题目 -->
			<div class="div_dialog" v-else-if="activeIndex=='bank'">
				<div class="div_rag">
					<el-radio-group v-model="addTopic.status" style="margin-bottom: 30px;">
						<el-radio-button label="0">添加</el-radio-button>
						<el-radio-button label="1">导入</el-radio-button>
					</el-radio-group>
				</div>
				<div class="juzhong" v-if="addTopic.status==1">
					<el-upload drag action="asd" :before-upload="uploadTopic">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传xlsx/xls文件</div>
					</el-upload>
				</div>
				<div v-else-if="addTopic.status==0">
					<div class="ovy">
						<el-form v-loading="bankLoading" :label-width="formLabelWidth">
							<el-form-item label="类型">
								<el-radio-group v-model="addTopic.form.type">
									<el-radio-button v-for="(s,k) in addTopic.type" :label="k" :key="k">{{s}}</el-radio-button>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="主题">
								<el-select v-model="addTopic.form.cate" filterable placeholder="请选择">
									<el-option v-for="(c,k) in addTopic.cate" :key="k" :label="c" :value="k"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="题目">
								<el-input v-model="addTopic.form.name"></el-input>
							</el-form-item>
							<el-form-item label="选项">
								<div v-for="(x,k) in addTopic.form.xuanx" :key="k" style="display: flex;margin-bottom: 10px;">
									<span style="margin-right: 5px;">{{k+1}}.</span>
									<el-input v-model="addTopic.form.xuanx[k]"></el-input>
									<el-button v-if="k!=0" style="margin-left: 5px;" icon="el-icon-minus" circle @click="minusxuanx(k)"></el-button>
									<div v-else style="width: 52px; height: 27px;"></div>
								</div>
								<div style="margin-top: 5px;display: flex;align-items: center;justify-content: center;">
									<el-button icon="el-icon-plus" circle @click="addxuanx"></el-button>
								</div>
							</el-form-item>
							<el-form-item label="分数">
								<el-input v-model="addTopic.form.score"></el-input>
							</el-form-item>
							<el-form-item label="答案">
								<el-input v-model="addTopic.form.answer"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div slot="footer">
						<el-button @click="showInfo = false">取 消</el-button>
						<el-button type="primary" @click="submitTopic" :loading="inAdd">添 加</el-button>
					</div>
				</div>
				<div v-else-if="addTopic.status==2">
					<div class="ovy">
						<el-table :data="addStu.tableData" style="width: 100%" :border='false'>
							<el-table-column prop="number" label="序号"></el-table-column>
							<el-table-column prop="name" label="姓名"></el-table-column>
							<el-table-column prop="age" label="年龄"></el-table-column>
							<el-table-column prop="size" label="衣服尺码"></el-table-column>
							<el-table-column prop="school" label="学校"></el-table-column>
							<el-table-column prop="grade" label="年级"></el-table-column>
							<el-table-column prop="class" label="班级"></el-table-column>
							<el-table-column prop="address" label="地址"></el-table-column>
							<el-table-column prop="phone" label="电话"></el-table-column>
							<el-table-column prop="cz" label="提示">
								<template slot-scope="scope">
									<span :style="scope.row.cz === 1? 'color:#f5222d':'color:#52c41a'">{{scope.row.cz === 1? '已存在':'正常'}}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div slot="footer">
						<el-button @click="showInfo = false">取 消</el-button>
						<el-button type="primary" @click="submitStu" :disabled="inAdd">上 传</el-button>
					</div>
				</div>
			</div>

			<!-- 添加场次 -->
			<div class="div_dialog" v-else-if="activeIndex=='session'">
				<div class="ovy">
					<el-form v-loading="bankLoading" :label-width="formLabelWidth">
						<el-form-item label="场次名称">
							<el-input v-model="addSession.form.ffg"></el-input>
						</el-form-item>
						<el-form-item label="选题视频地址">
							<el-input v-model="addSession.form.video"></el-input>
						</el-form-item>
						<el-form-item label="开赛时间">
							<el-date-picker v-model="addSession.form.date" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="试卷">
							<el-select v-model="addSession.form.eid" filterable placeholder="请选择">
								<el-option v-for="item in paperInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div slot="footer">
					<el-button @click="showInfo = false">取 消</el-button>
					<el-button type="primary" @click="submitSession" :loading="inAdd">添 加</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			activeIndex() {
				return this.$route.name
			},
			bankLoading() {
				return this.a && this.b
			}
		},
		data() {
			return {
				formLabelWidth: '100px',
				showInfo: false,
				a: true,
				b: true,
				form: {},
				inAdd: false,
				paperInfo: [],
				addStu: {
					status: true,
					tableData: [],
					dizhi: ''
				},
				addTopic: {
					cate: {},
					type: {},
					status: 0, //添加0 导入1 导入确认2
					form: {
						type: '',
						cate: '',
						name: '',
						xuanx: [''],
						score: '',
						answer: '',
						id: ''
					}
				},
				addSession: {
					form: {
						ffg: '',
						video: '',
						date: '',
						eid: ''
					}
				}
			};
		},
		created() {
			/* 题目类型 */
			this.$http.get('/admin/basisInfo', {
				params: {
					id: 1
				}
			}).then(res => {
				for (var i = 0; i < res.data.data.content.length; i++) {
					this.addTopic.type[i] = res.data.data.content[i];
				}
				this.a = false
			});
			/* 题目主题 */
			this.$http.get('/admin/basisInfo', {
				params: {
					id: 2
				}
			}).then(res => {
				for (var i = 0; i < res.data.data.content.length; i++) {
					this.addTopic.cate[i] = res.data.data.content[i];
				}
				this.b = false
			});
			/* 试卷 */
			this.$http.get('/admin/selectexam').then(res => {
				if (res.data.status == 0) {
					this.paperInfo = res.data.data
				}
			})
		},
		methods: {
			// 组件的方法
			handleSelect(key) {
				this.$router.push({
					name: key
				})
			},
			upload(file) {
				let fd = new FormData();
				fd.append('file', file); //传文件
				fd.append('token', this.$store.getters.token);
				this.$http.post('/admin/selectkqList', fd).then(res => {
					if (res.data.status == 0) {
						this.addStu.status = false;
						this.addStu.dizhi = res.data.data.dizhi;
						this.addStu.tableData = res.data.data.student
					}
				});
				return false
			},
			uploadTopic(file) {
				let fd = new FormData();
				fd.append('file', file); //传文件
				fd.append('token', this.$store.getters.token);
				this.$http.post('/admin/selectkqList', fd).then(res => {
					if (res.data.status == 0) {
						this.addStu.status = false;
						this.addStu.dizhi = res.data.data.dizhi;
						this.addStu.tableData = res.data.data.student
					}
				});
				return false
			},
			submitStu() {
				this.inAdd = true
				this.$http.post('/admin/daoruStu', this.$qs.stringify({
					dizhi: this.addStu.dizhi
				})).then(res => {
					if (res.data.status == 0) {
						this.$notify.success({
							title: '错误',
							message: res.data.msg,
							showClose: false
						});
						this.addStu = {
							status: true,
							tableData: [],
							dizhi: ''
						}
						this.showInfo = false;
						this.inAdd = false;
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
						this.inAdd = false;
					}
				}).catch(() => {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
					this.inAdd = false;
				});
			},
			submitTopic() {
				this.inAdd = true
				this.$http.post('/admin/saveTopic', this.$qs.stringify({
					...this.addTopic.form
				})).then(res => {
					if (res.data.status == 0) {
						this.$notify.success({
							title: '成功',
							message: res.data.msg,
							showClose: false
						});

						this.addTopic = {
							cate: {},
							type: {},
							status: 0, //添加0 导入1 导入确认2
							form: {
								type: '',
								cate: '',
								name: '',
								xuanx: [''],
								score: '',
								answer: '',
								id: ''
							}
						}
						this.showInfo = false;
						this.inAdd = false;
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
						this.inAdd = false;
					}
				}).catch(() => {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
					this.inAdd = false;
				});
			},
			submitSession() {
				this.inAdd = true
				this.$http.post('/admin/addGames', this.$qs.stringify({
					...this.addSession.form,
				})).then(res => {
					if (res.data.status == 0) {
						this.$notify.success({
							title: '成功',
							message: res.data.msg,
							showClose: false
						});

						this.addSession = {
							form: {
								ffg: '',
								video: '',
								date: '',
								eid: ''
							}
						}
						this.showInfo = false;
						this.inAdd = false;
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
						this.inAdd = false;
					}
				}).catch(() => {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
					this.inAdd = false;
				});
			},
			addxuanx() {
				this.addTopic.form.xuanx.push('')
			},
			minusxuanx(k) {
				this.addTopic.form.xuanx.splice(k, 1)
			},
			toaddPaper() {
				this.$router.push({
					path: '/addpaper'
				})
			}
		}
	}
</script>

<style>
	.root {
		height: calc(100% - 60px);
		position: relative;
	}

	.idx_btn {
		position: absolute;
		top: 0.625rem;
		right: 1.25rem;
	}

	.show {
		background-color: #FFFFFF;
		border-radius: 0.3125rem;
		height: 100%;
		width: 100%;
		box-shadow: 0 0 20px 3px #888888;
		box-sizing: border-box;
		padding: 0 5px 0 5px;
		position: relative;
	}

	.infoFooter {
		position: absolute;
		right: 0;
		bottom: 1%;
	}

	.div_dialog {
		position: relative;
	}

	.div_rag {
		position: absolute;
		top: -68px;
		left: 100px;
	}
</style>
