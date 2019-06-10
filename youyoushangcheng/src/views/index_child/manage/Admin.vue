<template>
	<div>
		<div class="head">
			<!-- <div class="search">
				<el-input placeholder="角色名称" v-model="searchName"></el-input>
			</div>
			<el-button class="btn" @click="searchFun">搜索</el-button> -->
			<el-button type="primary" @click="dialogVisible = true"><i class="el-icon-plus"></i> 添加管理员</el-button>
		</div>
		<div class="body_box">
			<el-table :data="tableData" class="table">
				<el-table-column label="序号" width="100">
					<template slot-scope="scope">
						<div>
							{{scope.$index+1}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="管理员账号" width="200"></el-table-column>
				<el-table-column prop="roleName" label="角色" width="1000"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<div>
							<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
								<el-button size="mini" @click="changeRole(scope.row)"><i
										class="el-icon-edit-outline"></i></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button type="danger" size="mini" @click="delRole(scope.row)"><i
										class="el-icon-delete-solid"></i></el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="foot_pagination">
			<!-- <el-pagination layout="prev, pager, next" :total="1000"></el-pagination> -->
		</div>
		<el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%">
			<chose-admin>
			</chose-admin>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="subRole">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改角色" :visible.sync="dialogVisible2" width="50%">
			<chose-role @changedAuths="changeAuth" @changedName="changedName" @emptyed='emptyed' :empty='emptyForm'
				:nowid="nowshowid" :nowname="nowshowname"></chose-role>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeChangeRole">取 消</el-button>
				<el-button type="primary" @click="editRole">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	class Adminn {
		id;
		username;
		roleName;
		constructor(o) {
			this.id = o.id;
			this.username = o.username;
			this.roleName = o.role_name;
		}
	}

	import choseAdmin from '@/components/choseAdmin.vue';
	export default {
		components: {
			choseAdmin
		},
		created() {
			this.getList();
		},
		data() {
			return {
				tableData: [],
				searchName: '',
				dialogVisible: false,
				dialogVisible2: false,
				cas: [],
				authName: '',
				emptyForm: false,
				nowshowid: '',
				nowshowname: '',
			}
		},
		methods: {
			getList() {
				this.$api.adminList({
					key: this.searchName
				}).then((res) => {
					this.tableData = [];
					res.data.forEach((r) => {
						this.tableData.push(new Adminn(r))
					});
				})
			},
			emptyed() {
				this.emptyForm = false;
				this.nowshowid = '';
			},
			changedName(val) {
				this.authName = val;
			},
			changeAuth(val) {
				this.cas = val;
			},
			searchFun() {
				this.getList();
			},
			subRole() {
				this.$api.saveRole({
					name: this.authName,
					role: this.cas.join(',')
				}).then(() => {
					this.$notify({
						title: '成功',
						dangerouslyUseHTMLString: true,
						message: '<strong style="color:#3CB371">添加成功</strong>',
						showClose: false
					});
					this.getList();
					this.emptyForm = true;
					this.dialogVisible = false;
				})
			},
			editRole() {
				this.$api.saveRole({
					id: this.nowshowid,
					name: this.authName,
					role: this.cas.join(',')
				}).then(() => {
					this.$notify({
						title: '成功',
						dangerouslyUseHTMLString: true,
						message: '<strong style="color:#3CB371">修改成功</strong>',
						showClose: false
					});
					this.getList();
					this.emptyForm = true;
					this.dialogVisible2 = false;
				})
			},
			closeChangeRole() {
				this.dialogVisible2 = false;
				this.emptyForm = true;
			},
			changeRole(row) {
				this.dialogVisible2 = true;
				this.nowshowid = row.id;
				this.nowshowname = row.name;
			},
			delRole(row) {
				this.$confirm('确定删除角色：' + row.name + ' 吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api.delRole({
						id: row.id
					}).then(() => {
						this.getList();
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							message: '<strong style="color:#3CB371">删除成功</strong>',
							showClose: false
						});
					})
				})
			},
		},
	}
</script>

<style lang="scss">
	.head {
		display: flex;

		.search {
			width: 300px;
			display: inline-block;
			margin-right: 10px;
		}

		.btn {
			background-color: rgb(85, 85, 85);
			color: white;
		}

		.btn:hover {
			background-color: rgb(105, 105, 105);
			color: white;
		}
	}

	.body_box {
		height: 90%;
		overflow: auto;

		.table {
			width: 100%;
		}
	}

	.body_box::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}

	.body_box::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}

	.body_box::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
</style>