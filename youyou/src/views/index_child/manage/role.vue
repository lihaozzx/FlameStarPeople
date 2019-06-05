<template>
	<div>
		<div class="head">
			<!-- <div class="search">
				<el-input placeholder="角色名称" v-model="searchName"></el-input>
			</div>
			<el-button class="btn" @click="searchFun">搜索</el-button> -->
			<el-button type="primary"><i class="el-icon-plus"></i> 添加角色</el-button>
		</div>
		<div class="body_box" :style="'height:'+pageHei*.8+'px'">
			<el-table :data="tableData" class="table" :height="pageHei*.8">
				<el-table-column prop="id" label="序号" width="100"></el-table-column>
				<el-table-column prop="name" label="角色名称" width="200"></el-table-column>
				<el-table-column prop="auths" label="拥有权限" width="1000"></el-table-column>
				<el-table-column prop="address" label="操作" align="center">
					<template>
						<div>
							<el-button><i class="el-icon-edit-outline"></i> 查看</el-button>
							<el-button type="danger"><i class="el-icon-delete-solid"></i>删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="foot_pagination">
			<el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
		</div>

	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';
	import $api from '@/plugins/request';

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

	@Component
	export default class Role extends Vue {
		tableData: Rolee[] = [];
		searchName: string = '';
		pageHei:number = 0;

		created() {
			new $api().userList().then((res: any) => {
				console.log(res);
				
				res.data.data.forEach((r: any) => {
					this.tableData.push(new Rolee(r))
				});
			})
			this.pageHei = Array.from(document.getElementsByClassName('center')).find(e=>e.clientHeight!=0).clientHeight;
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
	.body_box{
		height: 90%;
		.table{
			width: 100%;
		}
		.table::-webkit-scrollbar{
			width: 100%;
			display: none;
		}
	}
</style>