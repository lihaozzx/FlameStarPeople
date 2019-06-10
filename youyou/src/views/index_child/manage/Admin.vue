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
								<el-button size="mini" @click="changeAdmin(scope.row)">
									<i class="el-icon-edit-outline"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button type="danger" size="mini" @click="delAdmin(scope.row)">
									<i class="el-icon-delete-solid"></i>
								</el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="foot_pagination">
			<!-- <el-pagination layout="prev, pager, next" :total="1000"></el-pagination> -->
		</div>
		<chose-admin :dialogVisible.sync="dialogVisible" @saveSuccess="successFun('添加')"></chose-admin>
		<chose-admin :dialogVisible.sync="dialogVisible2" @changeSuccess="successFun('修改')" :adminId="nowshowid" :adminName="nowshowname">
		</chose-admin>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
		Watch,
	} from 'vue-property-decorator';
	import $api from '@/plugins/request';
	import choseAdmin from '@/components/choseAdmin.vue';
	import {
		Notification,
		MessageBox
	} from 'element-ui';

	const http = new $api();
	class Adminn {
		id: number;
		username: string;
		roleName: string;
		constructor(o: any) {
			this.id = o.id;
			this.username = o.username;
			this.roleName = o.role_name;
		}
	}

	@Component({
		components: {
			choseAdmin
		}
	})
	export default class Admin extends Vue {
		tableData: Adminn[] = [];
		searchName: string = '';
		dialogVisible: boolean = false;
		dialogVisible2: boolean = false;
		nowshowid: string = '';
		nowshowname: string = '';

		created() {
			this.getList();
		}

		getList() {
			http.adminList({
				key: this.searchName
			}).then((res: any) => {
				this.tableData = [];
				res.data.forEach((r: any) => {
					this.tableData.push(new Adminn(r))
				});
			})
		}
		searchFun() {
			this.getList();
		}

		successFun(k: string) {
			Notification({
				title: '成功',
				dangerouslyUseHTMLString: true,
				message: '<strong style="color:#3CB371">' + k + '成功</strong>',
				showClose: false
			});
			this.dialogVisible2 = this.dialogVisible = false;
			this.getList();
		}
		changeAdmin(row: any) {
			this.dialogVisible2 = true;
			this.nowshowid = row.id;
			this.nowshowname = row.username;
		}
		delAdmin(row: any) {
			MessageBox.confirm('确定删除账号：' + row.username + ' 的管理员吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				http.delAdmin({
					id: row.id
				}).then((res: any) => {
					this.getList();
					Notification({
						title: '成功',
						dangerouslyUseHTMLString: true,
						message: '<strong style="color:#3CB371">删除成功</strong>',
						showClose: false
					});
				})
			})
		}
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