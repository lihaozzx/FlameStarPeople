<template>
	<div>
		<div class="login">
			<img src="../assets/login_bg.png" class="login_left" />
			<div class="login_right">
				<div class="login_box">
					<h2 class="login_title">立德树人后台管理系统</h2>
					<p class="login_subtit">立德树人</p>
					<div class="login_inp">
						<i class="inp_icon name"></i>
						<input type="text" class="inp_val" placeholder="账户" v-model="username" />
					</div>
					<div class="login_inp">
						<i class="inp_icon pasd"></i>
						<input type="password" class="inp_val" placeholder="密码" v-model="pas" />
					</div>
					<div class="rember">
						<el-checkbox v-model="remeber">记住密码</el-checkbox>
					</div>
					<div class="y_btn" @click="login">登 录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				remeber: false,
				username: '',
				pas: ''
			};
		},
		methods: {
			// 组件的方法
			login() {
				this.$http.post('/scyld.php/main/login', this.$qs.stringify({
					username: this.username,
					password: this.pas
				})).then(res => {
					if (res.data.status == 0) {
						this.$setCookie('token', res.data.data);
						this.$router.push('index');
					} else {
						this.$notify({
							title: '提示',
							message: '账号或密码错误',
							offset: 200
						});
					}
				}).catch(() => {
					this.$notify({
						title: '提示',
						message: '连接服务器失败',
						offset: 200
					});
				})
			}
		}
	}
</script>

<style>
	.y_btn {
		height: 2.5rem;
		background-color: rgb(66, 131, 255);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #F0F5FF;
	}

	.login {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.login_left {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		z-index: -1;
	}

	.login_right {
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login_icon_1 {
		position: absolute;
		width: 230px;
		height: 160px;
		left: 18px;
		top: 19px;
	}

	.login_icon_2 {
		position: absolute;
		width: 260px;
		height: 250px;
		right: 0;
		top: 35px;
	}

	.login_icon_3 {
		position: absolute;
		width: 64px;
		height: 64px;
		left: 29px;
		top: 50%;
		margin-top: -32px;
	}

	.login_icon_4 {
		position: absolute;
		width: 140px;
		height: 100px;
		left: 19px;
		bottom: 40px;
	}

	.login_icon_5 {
		position: absolute;
		width: 44px;
		height: 44px;
		right: 53px;
		bottom: 43px;
	}

	.login_box {
		width: 23.125rem;
		height: 25rem;
		background-color: #fff;
		padding: 60px 40px 30px 40px;
		box-shadow: 0 0 100px #e6e6e6;
		margin-bottom: 3.125rem;
	}

	.login_title {
		text-align: center;
		font-size: 33px;
		font-weight: 400;
		line-height: 33px;
		color: rgba(0, 0, 0, 0.85);
		margin-bottom: 4px;
	}

	.login_subtit {
		text-align: center;
		font-size: 14px;
		line-height: 22px;
		color: rgba(0, 0, 0, 0.45);
		margin-bottom: 30px;
	}

	.login_inp {
		height: 40px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(217, 217, 217, 1);
		border-radius: 4px;
		padding: 0 12px;
		line-height: 40px;
		padding-left: 36px;
		position: relative;
		margin-bottom: 24px;
	}

	.inp_icon {
		position: absolute;
		width: 16px;
		height: 16px;
		background-repeat: no-repeat;
		background-position: center;
		left: 12px;
		top: 50%;
		margin-top: -8px;
	}

	.inp_icon.name {
		background-image: url(../assets/login_name.png);
	}

	.inp_icon.pasd {
		background-image: url(../assets/login_pasd.png);
	}

	.inp_val::-webkit-input-placeholder {
		color: #D9D9D9;
	}

	.inp_val::-moz-placeholder {
		color: #D9D9D9;
	}

	.inp_val::-moz-placeholder {
		color: #D9D9D9;
	}

	.inp_val::-ms-input-placeholder {
		color: #D9D9D9;
	}

	.inp_val {
		border: none;
		outline: none;
		height: 38px;
		line-height: 40px;
		display: block;
		width: 320px;
		color: #000;
		font-size: 16px;
	}

	.rember {
		margin-bottom: 24px;
	}


	.y_btn:hover {
		background-color: #1683e8;
	}

	.login_img {
		display: block;
		margin: 0 auto;
		width: 166px;
	}

	.y_check,
	.y_radio {
		display: inline-block;
		vertical-align: middle;
		height: 20px;
		line-height: 20px;
		padding-left: 20px;
		background-image: url(../assets/check.png);
		background-repeat: no-repeat;
		background-position: left center;
		user-select: none;
		cursor: pointer;
	}
</style>
