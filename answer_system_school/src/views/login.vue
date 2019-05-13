<template>
	<div class="root">
		<div style="height: 150px;"></div>
		<div class="logInfo">
			<span class="ts36 clrWhite" style="margin-bottom: 30px;">请先登录</span>
			<div class="div_name">
				<input type="text" placeholder="手机号码" v-model="out.phone" class="noneBor big">
			</div>
			<div class="div_code">
				<div>
					<input type="text" placeholder="验证码" v-model="out.yzm" class="noneBor loca">
				</div>
				<div class="btn_nm clrWhite ts14" @click="getCode" v-if="codeCd == 0">
					<span>获取验证码</span>
				</div>
				<div class="btn_nm_cd" v-else>
					<span>重新获取({{codeCd}})</span>
				</div>
			</div>
			<div class="btn_big clrWhite ts16" @click="login">
				<span>登录</span>
			</div>
		</div>
		<div style="position: absolute;bottom: 78px;width: 100%;">
		</div>
		<pop :isShow="alterShow" @close='cPop' :title="alterTitle" :success="haveGou"></pop>
	</div>
</template>

<script>
	import pop from '@/components/pop.vue'
	export default {
		data() {
			return {
				out: {
					phone: '',
					yzm: ''
				},
				codeCd: 0,
				alterShow: false,
				alterTitle: '',
				haveGou: false
			};
		},
		methods: {
			// 组件的方法
			getCode() {
				if (this.out.phone.length == 11) {
					this.alterTitle = '验证码发送成功';
					this.alterShow = true;
					this.codeCd = 60;
					this.$http.get('/main/sms2?phone='+this.out.phone).then(res=>{
						this.alterTitle = res.data.msg;
						this.alterShow = true;
					});
					var i = setInterval(() => {
						this.codeCd--;
						if (this.codeCd == 0) {
							clearInterval(i)
						}
					}, 1000);
				} else {
					this.alterTitle = '电话号码异常';
					this.alterShow = true;
				}

			},
			cPop() {
				this.alterTitle = '';
				this.alterShow = false;
			},
			login(){
				this.$http.post('/user/phone_login',this.$qs.stringify(this.out)).then(res=>{
					if(res.data.status == 0){
						//登陆成功
						this.setCookie('token',res.data.data,1);
						this.$router.replace('home');
					}
				})
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
			}
		},
		components: {
			pop
		}
	}
</script>

<style scoped>
	.root {
		position: relative;
		height: 100%;
	}

	.btn_nm {
		width: 120px;
		height: 40px;
		background-color: #B81E24;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn_big {
		width: 320px;
		height: 40px;
		background-color: #B81E24;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 58px;
	}

	.logInfo {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.div_name {
		width: 320px;
		font-size: 14px;
		box-sizing: border-box;
		padding: 0 10px 2px 10px;
		border-bottom: #FFFFFF solid 1px;
	}

	.div_code {
		width: 320px;
		font-size: 14px;
		box-sizing: border-box;
		display: flex;
		margin-top: 22px;
		justify-content: space-between;
	}

	.div_code>div:nth-of-type(1) {
		width: 50%;
		border-bottom: #FFFFFF solid 1px;
		position: relative;
	}

	.noneBor {
		border: none;
		background-color: rgba(0, 0, 0, 0);
		outline: none;
		color: #FFFFFF;
	}

	.big {
		width: 100%;
	}

	input::-webkit-input-placeholder {
		color: #FFFFFF;
	}

	.loca {
		position: absolute;
		bottom: 2px;
		left: 10px;
	}

	.btn_nm_cd {
		width: 8.75rem;
		height: 2.5rem;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #C7C7C7;
		color: #051124;
	}
</style>
