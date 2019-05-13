<template>
	<div class="div_root">
		<div class="div_form" v-if="stuInfo.length!=0">
			<el-table :data="stu" style="width: 90%;margin-left: 5%;" height="100%">
				<el-table-column prop="name" label="姓名" width="120px">
				</el-table-column>
				<el-table-column prop="class" label="班级" width="120px">
				</el-table-column>
				<el-table-column prop="phone" label="联系电话">
				</el-table-column>
			</el-table>
		</div>
		<div class="div_form_none" v-else>
			<span>暂无学生信息</span>
			<span>请将参赛人员报名表发送至</span>
			<span>lideshurenGC@163.com</span>
		</div>
		<div class="div_btns ts16 clrWhite">
			<div  :style="cansure?'background-color:#fab6b6':'background-color: #F56C6C;'">
				<el-button type="danger" @click="queren" :disabled="cansure">确认信息</el-button>
			</div>
			<div>
				<el-button type="danger" @click="todonw">题库下载</el-button>
			</div>
		</div>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
			<span>确认学生信息正确了吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sureQueren">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogVisible2" width="80%">
			<span>确认成功</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible2=false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed: {
			stu() {
				let out = [];
				if (typeof this.stuInfo == 'object') {
					this.stuInfo.forEach(s => {
						out.push({
							name: s.name,
							class: s.class + '年级',
							phone: s.phone
						})
					})
				}
				return out;
			}
		},
		data() {
			return {
				stuInfo: [],
				dialogVisible: false,
				dialogVisible2:false,
				cansure:false
			};
		},
		created: function() {
			this.$http.get('/user/info', {
				params: {
					token: this.getCookie('token')
				}
			}).then(res => {
				if(res.data.status == 0){
					if(res.data.data.status ==2){
						this.cannotsuer();
					}
				}
			})
			this.$http.post('/user/student', this.$qs.stringify({
				token: this.getCookie('token')
			})).then(res => {
				if (res.data.status == 0 && res.data.data) {
					this.stuInfo = res.data.data
				}else{
					this.cannotsuer();
				}
			})
		},
		methods: {
			cannotsuer(){
				this.cansure = true;
			},
			todonw() {
				this.$router.push('download');
			},
			setCookie: function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},
			//获取cookie
			getCookie: function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1);
					if (c.indexOf(name) != -1) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			},
			//清除cookie
			clearCookie: function() {
				this.setCookie("username", "", -1);
			},
			checkCookie: function() {
				var user = this.getCookie("username");
				if (user != "") {
					alert("Welcome again " + user);
				} else {
					user = prompt("Please enter your name:", "");
					if (user != "" && user != null) {
						this.setCookie("username", user, 365);
					}
				}
			},
			queren() {
				this.dialogVisible = true
			},
			sureQueren() {
				this.$http.post('/user/upstu', this.$qs.stringify({
					st: 2,
					token: this.getCookie('token')
				})).then(res=>{
					if(res.data.stutas == 0){
						this.cannotsuer();
						this.dialogVisible2 = true
					}
				});
			}
		}
	}
</script>

<style>
	.div_root {
		height: 100%;
		background-color: #FFFFFF;
	}

	.div_btns {
		height: 2.5rem;
		width: 100%;
		display: flex;
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		z-index: 10;
	}

	.div_btns>div {
		width: 49.8%;
		display: flex;
		justify-content: center;
		background-color: #F56C6C;
		border-radius: 0.3125rem;
	}

	.div_form {
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 2.625rem;
	}

	.div_form_none {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.25rem;
		margin-top: 20%;
	}
</style>
