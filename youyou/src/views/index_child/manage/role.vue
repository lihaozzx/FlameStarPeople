<template>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="序号" width="100"></el-table-column>
			<el-table-column prop="name" label="角色名称" width="200"></el-table-column>
			<el-table-column prop="auths" label="拥有权限" width="1000"></el-table-column>
			<el-table-column prop="address" label="操作" align="center" >
				<template>
					<div>
						<el-button><i class="el-icon-edit-outline"></i> 查看</el-button>
						<el-button type="danger"><i class="el-icon-delete-solid"></i>删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';
	import {roleList} from '@/plugins/request';

	class Rolee{
		id:number;
		name:string;
		auths:string;
		constructor(o:any){
			this.id = o.id;
			this.name = o.name;
			this.auths = o.auths;
		}
	}

	@Component
	export default class Role extends Vue {
		tableData:Rolee[]=[]
		created() {
			roleList().then((res:any)=>{
				if(res.code == 200){
					res.data.forEach((r:any) => {
						this.tableData.push(new Rolee(r))
					});
				}else{

				}
			})	
		}
	}
</script>

<style>

</style>