<template>
	<div>
		<div class="head">
			<!-- <div class="search">
				<el-input placeholder="角色名称" v-model="searchName"></el-input>
			</div>
			<el-button class="btn" @click="searchFun">搜索</el-button> -->
			<el-button type="primary" @click="dialogVisible = true"><i class="el-icon-plus"></i> 添加角色</el-button>
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
				<el-table-column prop="name" label="角色名称" width="200"></el-table-column>
				<el-table-column prop="auths" label="拥有权限" width="1000"></el-table-column>
				<el-table-column prop="address" label="操作" align="center">
					<template>
						<div>
							<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
								<el-button size="mini"><i class="el-icon-edit-outline"></i></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button type="danger" size="mini"><i class="el-icon-delete-solid"></i></el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="foot_pagination">
			<el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
		</div>
		<el-dialog title="添加角色" :visible.sync="dialogVisible" width="70%">
			<chose-role></chose-role>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';
	import $api from '@/plugins/request';
	import choseRole from '@/components/choseRole.vue'


	class Rolee {
		id: number;
		name: string;
		auths: string;
		constructor(o: any) {
			this.id = o.id;
			this.name = o.name;
			this.auths = o.auths;
		}
	}

	@Component({
		components: {
			choseRole
		}
	})
	export default class Role extends Vue {
		tableData: Rolee[] = [];
		searchName: string = '';
		dialogVisible: boolean = false;

		created() {
			new $api().roleList().then((res: any) => {
				res.data.forEach((r: any) => {
					this.tableData.push(new Rolee(r))
				});
			})
		}

		searchFun() {
			new $api().roleList({
				key: this.searchName
			}).then((res: any) => {
				res.data.forEach((r: any) => {
					this.tableData.push(new Rolee(r))
				});
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