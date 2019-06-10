<template>
	<div>
		<div class="head">
			<div class="search">
				<el-input placeholder="用户名" v-model="search.name"></el-input>
			</div>
			<div class="search">
				<el-input placeholder="手机号" v-model="search.phone"></el-input>
			</div>
			<el-button class="btn" @click="searchFun">搜索</el-button>
			<el-button @click="searchEmpty">清空</el-button>
			<el-button type="primary" @click="dialogVisible = true"><i class="el-icon-plus"></i> 添加会员</el-button>
		</div>
		<div class="body_box">
			<el-table :data="tableData" class="table" v-loading="loads.table" @sort-change="tableSort">
				<el-table-column label="序号" width="50">
					<template slot-scope="scope">
						<div>
							{{scope.$index+1}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="nickname" label="昵称"></el-table-column>
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="integral" label="积分" sortable="custom" ></el-table-column>
				<el-table-column prop="money" label="累计销售额" sortable="custom" ></el-table-column>
				<el-table-column prop="last_log_time" label="注册时间" sortable="custom"  width="190"></el-table-column>
				<el-table-column prop="reg_time" label="最后登录时间" sortable="custom"  width="190"></el-table-column>
				<el-table-column prop="dealer" label="供应商" width="220"></el-table-column>
				<!-- <el-table-column prop="status" label="用户状态" width="100" align="center"></el-table-column> -->
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<div>
							<el-tooltip class="item" effect="dark" content="添加维修订单" placement="top-start">
								<el-button size="mini" class="mini" type="primary">
									<i class="el-icon-plus"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="会员总览" placement="top-start">
								<el-button type="warning" size="mini" class="mini">
									<i class="el-icon-s-order"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="查看订单" placement="top-start">
								<el-button type="info" size="mini" class="mini">
									<i class="el-icon-s-shop"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="查看评论" placement="top-start">
								<el-button type="primary" size="mini" class="mini">
									<i class="el-icon-chat-round"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="重置密码" placement="top-start">
								<el-button type="warning" size="mini" @click="resetPass(scope.row)" class="mini">
									<i class="el-icon-lock"></i>
								</el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button type="danger" size="mini" @click="delUser(scope.row)" class="mini">
									<i class="el-icon-delete-solid"></i>
								</el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="foot_pagination">
			<el-pagination layout="prev, pager, next" :total="pageInfo.total" :page-size="pageInfo.limit"
				:current-page="pageInfo.nowPage" @current-change="pageChange"></el-pagination>
		</div>
		<chose-admin :dialogVisible.sync="dialogVisible" @saveSuccess="successFun('添加')"></chose-admin>
		<chose-admin :dialogVisible.sync="dialogVisible2" @changeSuccess="successFun('修改')" :adminId="nowshowid"
			:adminName="nowshowname">
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
	class Userr {
		id: number; //id
		did: number; //不管
		integral: number; //积分
		last_log_time: Date; //最后登录时间
		reg_time: Date; //注册时间爱你
		money: string; //钱
		nickname: string; //昵称
		phone: string; //电话
		dealer: string; //供销商
		status: number; //状态 0冻结 1正常 2 3
		constructor(o: any) {
			this.id = o.id;
			this.did = o.did;
			this.integral = o.integral;
			this.last_log_time = o.last_log_time;
			this.reg_time = o.reg_time;
			this.money = o.money;
			this.nickname = o.nickname;
			this.phone = o.phone;
			this.dealer = o.dealer;
			this.status = o.status;
		}
	}
	class PageInfo {
		limit: number;
		nowPage: number;
		total: number;
		constructor(total: number, now: number, limit: number) {
			this.total = total;
			this.nowPage = now;
			this.limit = limit;
		}
	}

	@Component({
		components: {
			choseAdmin
		}
	})
	export default class User extends Vue {
		tableData: Userr[] = [];
		loads: any = {
			table: false
		}
		search: any = {
			name: '',
			phone: '',
			order:''
		}
		dialogVisible: boolean = false;
		dialogVisible2: boolean = false;
		nowshowid: string = '';
		nowshowname: string = '';
		timer:any = null;

		pageInfo: PageInfo = new PageInfo(0, 1, 0);

		created() {
			this.getList();
		}

		getList() {
			this.loads.table = true;
			http.userList({
				page: this.pageInfo.nowPage,
				nickname: this.search.name,
				phone: this.search.phone,
				order_by:this.search.order
			}).then((res: any) => {
				this.tableData = [];
				res.data.data.forEach((r: any) => {
					this.tableData.push(new Userr(r));
				});
				this.setPage(res.data);
				this.loads.table = false;
			})
		}
		setPage(data: any) {
			this.pageInfo = new PageInfo(data.total_rows, data.page, data.limit);
		}
		pageChange(p:number){
			if(this.timer!=null){
				clearTimeout(this.timer);
			}
			return this.timer = setTimeout(() => {
				this.pageInfo.nowPage=p;
				this.getList();
			}, 300);
		}
		searchFun() {
			this.getList();
		}
		searchEmpty() {
			if(this.search.name==''&&this.search.phone=='')return;
			this.search = {
				name: '',
				phone: '',
				order:this.search.order
			}
			this.getList();
		}
		tableSort(val:any){
			if(val.order!==null){
				if(val.order==='descending'){//dese
					this.search.order = '["'+val.prop+'","desc"]';
				}else{//ase
					this.search.order = '["'+val.prop+'","asc"]';
				}
			}else{
				this.search.order = '';
			}
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
		resetPass(row:any){
			MessageBox.confirm('你确定重置密码吗？重置后该用户的密码变更为：123456', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				http.editUser({
					id: row.id
				}).then((res: any) => {
					Notification({
						title: '成功',
						dangerouslyUseHTMLString: true,
						message: '<strong style="color:#3CB371">密码已重置</strong>',
						showClose: false
					});
				})
			})
		}
		delUser(row: any) {
			MessageBox.confirm('确定删除用户：' + row.nickname + ' 吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				http.delUser({
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
			width: 240px;
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
		.mini{
			padding: 5px 2px;
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