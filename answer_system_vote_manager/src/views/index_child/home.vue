<template>
	<div>
		<div class="cent">
			<el-button @click="stz = true;">修改通告</el-button>
			<el-button @click="ssb = true;">修改充值方式</el-button>
			<el-button @click="sendt = true;">修改结束时间</el-button>
			<el-button @click="savt = true;">添加票数</el-button>
		</div>
		<el-dialog title="公告" :visible.sync="stz" width="50%" :modal-append-to-body='false'>
			<el-input v-model="gongao" placeholder="请输入公告"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="stz = false">取 消</el-button>
				<el-button type="primary" @click="subgonggao">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="助力上榜方式" :visible.sync="ssb" width="70%" :modal-append-to-body='false'>
			<el-table v-loading="inAdd" :data="sbtype" height="500px" style="width: 100%;">
				<el-table-column label="名称" prop="name"></el-table-column>
				<el-table-column label="助力值" prop="num" width="250"></el-table-column>
				<el-table-column label="价格" prop="price" width="100"></el-table-column>
				<el-table-column align="right" width="240">
					<template slot="header">
						<div style="display: flex;">
							<el-button type="success" round @click="addsb=true">新增</el-button>
						</div>
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ssb=false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="新增" :visible.sync="addsb" width="50%">
			<el-form label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="zhuli.name" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input-number v-model="zhuli.num" :precision="0" :step="1"></el-input-number>
				</el-form-item>
				<el-form-item label="价格(元)">
					<el-input-number v-model="zhuli.price" :precision="2" :step="0.01"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addsb = false">取 消</el-button>
				<el-button type="primary" @click="addzhuli" :loading="inAdd">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="结束时间" :visible.sync="sendt" width="25%" :modal-append-to-body='false'>
			<el-date-picker v-model="time" type="datetime" placeholder="选择日期时间">
			</el-date-picker>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sendt = false">取 消</el-button>
				<el-button type="primary" @click="subEndTime">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加助力值" :visible.sync="savt" width="25%">
			<el-form label-width="80px">
				<el-form-item label="选手id">
					<el-input v-model="addvote.id" placeholder="请输入选手id"></el-input>
				</el-form-item>
				<el-form-item label="票数">
					<el-input-number v-model="addvote.num" :precision="0" :step="1"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="savt = false">取 消</el-button>
				<el-button type="primary" @click="subAddVote">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		created() {
			this.$http.post('/admin/basis').then(res => {
				console.log(res);
			})
			this.getzhuliInfo();
		},
		data() {
			return {
				inAdd: false,
				stz: false,
				ssb: false,
				sendt: false,
				savt:false,
				addsb: false,
				gongao: '',
				sbtype: [],
				zhuli: {
					name: '',
					num: '',
					price: '',
				},
				chsbid: '',
				time:'',
				addvote:{
					id:'',
					num:0
				}
			};
		},
		methods: {
			// 组件的方法
			subgonggao() {
				this.$http.post('/admin/upBasis', this.$qs.stringify({
					id: 6,
					content: [this.gongao]
				})).then(res => {
					if (res) {
						this.stz = false;
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:green">公告修改成功</strong>',
						});
					}
				})
			},
			subEndTime() {
				let d = this.time.getFullYear()+'/'+(this.time.getMonth()+1)+'/'+this.time.getDate()+' '+this.time.getHours()+':'+this.time.getMinutes()+':00'
				this.$http.post('/admin/upBasis', this.$qs.stringify({
					id: 5,
					content: [d]
				})).then(res => {
					if (res) {
						this.sendt = false;
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:green">结束时间修改成功</strong>',
						});
					}
				})
			},
			handleEdit(r) {
				this.zhuli = {
					name: r.name,
					num: r.num,
					price: r.price
				};
				this.chsbid = r.id;
				this.addsb = true;
			},
			handleDelete(r) {
				this.$confirm('确认删除此助力方式?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/admin/delgood', this.$qs.stringify({
						id: r.id
					})).then(res => {
						if (res) {
							this.getzhuliInfo();
							this.$notify({
								title: '成功',
								dangerouslyUseHTMLString: true,
								iconClass: 'el-icon-success',
								message: '<strong style="color:green">助力方式删除成功</strong>',
							});
						}
					});
				})
			},
			addzhuli() {
				this.inAdd = true;
				this.$http.post('', this.$qs.stringify({
					...this.addvote,
				})).then(res => {
					if (res) {
						this.addsb = false;
						this.addvote = {
							id:'',
							num:0
						}
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:green">助力方式' + this.chsbid == '' ? '添加' : '修改' + '成功</strong>',
						});
						this.inAdd = fasle;
					}
				});
			},
			subAddVote(){
				this.inAdd = true;
				this.$http.post('/admin/saveGood', this.$qs.stringify({
					...this.zhuli,
					id: this.chsbid
				})).then(res => {
					if (res) {
						this.zhuli = {
							name: '',
							num: '',
							price: '',
						}
						this.$notify({
							title: '成功',
							dangerouslyUseHTMLString: true,
							iconClass: 'el-icon-success',
							message: '<strong style="color:green">添加成功</strong>',
						});
						this.inAdd = fasle;
					}
				});
			},
			getzhuliInfo() {
				this.inAdd = true;
				this.$http.post('/admin/goods').then(res => {
					if (res) {
						this.sbtype = res.data;
						this.inAdd = false;
					}
				})
			}
		}
	}
</script>

<style>
	.cent {
		box-sizing: border-box;
		padding: 50px;
	}
</style>
