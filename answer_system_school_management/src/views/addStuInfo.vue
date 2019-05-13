<template>
	<div>
		<img src="../assets/login_bg.png" class="login_left" />
		<div class="btn_div">
			<div class="back_icon" @click="goback">
				<i class="el-icon-error"></i>
			</div>
			<div>
				<el-upload action="asdqsd" :before-upload="asd">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
				</el-upload>
			</div>
			<div style="margin-left: 10%;">
				<el-button size="small" type="success" :disabled="dizhi==''?true:false" @click="suurImp">确认导入</el-button>
			</div>
		</div>
		<div class="div_table">
			<el-table :data="tableData" border style="width: 100%" :height="height*0.7">
				<el-table-column fixed prop="number" label="序号" width="50">
				</el-table-column>
				<el-table-column prop="grade" label="年级" width="80">
				</el-table-column>
				<el-table-column prop="class" label="班级" width="80">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="50">
				</el-table-column>
				<el-table-column prop="size" label="尺码" width="120">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="120">
				</el-table-column>
				<el-table-column prop="address" label="地址" width="120">
				</el-table-column>
				<el-table-column prop="cz" label="提示" width="120">
					<template slot-scope="scope">
						<span :style="scope.row.cz === 1? 'color:#f5222d':'color:#52c41a'">{{scope.row.cz === 1? '已存在':'正常'}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				height: innerHeight,
				dizhi: '',
				tableData: [],
				showinfo: null,
				id: '',
				all:''
			};
		},
		methods: {
			goback() {
				this.$router.go(-1);
			},
			asd(file) {
				// {number:'序号',grade:'年级',class:'班级',name:'姓名',age:'年龄',size:'尺码',phone:'电话',address:'地址 cz=1已经添加'}
				let fd = new FormData();
				fd.append('file', file); //传文件
				this.$http.post('/scyld.php/school/selectkqList', fd).then(res => {
					if (res.data.status == 0) {
						let d = res.data.data;
						this.dizhi = d.dizhi;
						this.tableData = d.student;
						this.showinfo = d.school;
					}
				});
				return false
			},
			suurImp() {
				let dizhi2 = this.dizhi;
				this.dizhi = '';
				this.$http.post('/scyld.php/school/daoruStu', this.$qs.stringify({
					dizhi: dizhi2,
					token: this.$getCookie('token')
				})).then(res => {
					if (res.data.status == 0) {
						this.$notify.success({
							title: 'Info',
							message: '导入成功',
							showClose: false
						});
						setTimeout(() => {
							this.$router.go(-1);
						}, 2000)
					} else {
						this.$notify.success({
							title: 'Info',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
						this.dizhi = this.dizhi;
					}
				})
			}
		}
	}
</script>

<style>
	.btn_div {
		margin-top: 2.5rem;
		margin-left: 10%;
		display: flex;
	}

	.back_icon {
		margin-right: 1.875rem;
	}
</style>
