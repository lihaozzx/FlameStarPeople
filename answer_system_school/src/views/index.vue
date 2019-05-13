<template>
	<div class="root">
		<div class="div_bottom">
			<div class="logoImg2">
				<img src="../assets/footer-logo@3x23.png" alt="">
			</div>
		</div>
		<div class="div_bottom_index">
			<div class="btm_bl clrWhite ts16" @click="showRegister = true">
				<span>学校报名</span>
			</div>
		</div>
		<div class="schedule">
			<div class="div_text2">
				
				<span>“立德树人工程”</span><br>
				<span>青少年国学大会</span><br>
				<span>活动简介</span><br>
			</div>
			<div class="div_text" v-for="(t,k) in text" style="margin-top: 10px;" :key="k">
				<span>{{t}}</span>
			</div>
			<div style="height: 1.875rem;"></div>
		</div>
		<transition name="fade">
			<div v-show="showRegister" class="div_register">
				<div @touchstart="drag($event)" @touchmove="drop($event)" @touchend="allowDrop($event)" class="div_touch">
					<div class="hr_top"></div>
				</div>
				<div class="div_choseInfo">
					<span>{{shenName==''?'请选择省份':shenName}}</span>
				</div>
				<div class="div_choseInfo">
					<span>{{shiName==''?'请选择市':shiName}}</span>
				</div>
				<div class="div_choseInfo" @click="choseLoc(2)">
					<span>{{quName==''?'请选择地区':quName}}</span>
					<img src="../assets/downicon.png" alt>
				</div>
				<div class="div_choseInfo">
					<input type="text" placeholder="联系人名称" v-model="loginInfo.name">
				</div>
				<div class="div_choseInfo">
					<input type="text" placeholder="学校名称" v-model="loginInfo.company">
				</div>
				<div class="div_choseInfo">
					<input type="number" placeholder="手机号码" v-model="loginInfo.phone">
					<span></span>
				</div>
				<div class="div_choseInfo_btn">
					<div class="div_in">
						<input type="text" placeholder="验证码" v-model="loginInfo.code">
					</div>
					<div class="btn_nm" @click="getCode" v-if="codeCd == 0">
						<span>获取验证码</span>
					</div>
					<div class="btn_nm_cd" v-else>
						<span>重新获取({{codeCd}})</span>
					</div>
				</div>
				<div class="div_register_now" @click="register">
					<span>立即注册</span>
				</div>
				<div class="login ts14">
					<span>已有账号</span>
					<span class="clrRed" style="margin-left: 0.1875rem;" @click="tologin">直接登录</span>
				</div>
			</div>
		</transition>
		<pop :isShow="alterShow" @close="cPop" :title="alterTitle" :success="haveGou"></pop>

		<chose-radio :parameter="parameterName==0?shenfenInfo:parameterName==1?shiInfo:quInfo" :isShow="choseShow" @close="cClose"
		 @chosed="cChosed"></chose-radio>
	</div>
</template>

<script>
	import pop from "@/components/pop.vue";
	import choseRadio from "@/components/choseRadio.vue";
	export default {
		computed: {
			canCloseReg: function() {
				if (
					this.touchInfo.endLoc - this.touchInfo.startLoc > innerHeight / 20 &&
					this.touchInfo.endTime - this.touchInfo.startTime < 500
				) {
					return true;
				} else if (
					this.touchInfo.endLoc - this.touchInfo.startLoc >
					innerHeight / 10
				) {
					return true;
				} else {
					return false;
				}
			},
			shenName: function() {
				let name = "";
				this.shenfenInfo.forEach(s => {
					if (s.aid == this.loginInfo.province) {
						name = s.name;
					}
				});
				return name;
			},
			shiName: function() {
				let name = "";
				this.shiInfo.forEach(s => {
					if (s.aid == this.loginInfo.city) {
						name = s.name;
					}
				});
				return name;
			},
			quName: function() {
				let name = "";
				this.quInfo.forEach(s => {
					if (s.aid == this.loginInfo.area) {
						name = s.name;
					}
				});
				return name;
			}
		},
		data() {
			return {
				text: [
					"       为深入贯彻落实十九大精神，实现中华民族伟大复兴中国梦。在中央高度重视培育和践行社会主义核心价值观、推进教育精准脱贫背景下，按照中共中央办公厅印发《关于培育和践行社会主义价值观的意见》、《关于实施中华优秀传统文化传承发展工程的意见》。为进一步助力脱贫攻坚教育“扶智”行动，用中华优秀传统文化涵养、培育中、小学生。中国教育网络电视台国学台在开展全国青少儿国学新六艺展演暨国学春晚期间，特举办“立德树人工程”青少年国学大会公益活动。",
					"        通过该公益活动，中国教育网络电视台国学台将把地方本土优秀文化与国学经典交融传播，打造、培育青少年儿童的国学情怀，培植国学根基，展示学校的传统文化艺术教育成果。在浓厚的国学文化和优秀本土文化氛围下、用本土优秀文化涵养，培育德才兼备的新时代中华栋梁之才。"
				],
				showRegister: false,
				alterShow: false,
				choseShow: false,
				touchInfo: {
					startTime: 0,
					endTime: 0,
					startLoc: 0,
					endLoc: 0,
					now: 0
				},
				loginInfo: {
					province: "",
					city: "",
					area: "",
					name: "",
					company: "",
					phone: "",
					code: ""
				},
				codeCd: 0,
				shenfenInfo: [],
				shiInfo: [],
				quInfo: [],
				alterTitle: "",
				parameterName: 0,
				onLoading: false,
				haveGou: true
			};
		},
		created: function() {
			this.$http
				.get("/main/getpca")
				.then(res => {
					if (res.data.status == 0) {
						this.shenfenInfo = res.data.data.result;
					} else {
						this.alterTitle = "异常";
						this.alterShow = true;
					}
				})
				.catch(() => {
					this.Alter("连接服务器失败，请稍后再试", false);
				});
			this.$http
				.get("/main/getpca", {
					params: {
						aid: 51
					}
				})
				.then(res => {
					if (res.data.status == 0) {
						this.shiInfo = res.data.data.result;
					} else {
						this.alterTitle = "异常";
						this.alterShow = true;
					}
				})
				.catch(() => {
					this.Alter("连接服务器失败，请稍后再试", false);
				});
			this.$http
				.get("/main/getpca", {
					params: {
						aid: 5117
					}
				})
				.then(res => {
					if (res.data.status == 0) {
						this.quInfo = res.data.data.result;
					} else {
						this.alterTitle = "异常";
						this.alterShow = true;
					}
				})
				.catch(() => {
					this.Alter("连接服务器失败，请稍后再试", false);
				});
			this.loginInfo.province = 51;
			this.loginInfo.city = 5117;
		},
		methods: {
			Alter(str, b) {
				this.alterTitle = str;
				this.haveGou = b;
				this.alterShow = true;
			},
			drag(e) {
				this.touchInfo.startTime = e.timeStamp;
				this.touchInfo.startLoc = e.changedTouches[0].clientY;
			},
			drop(e) {
				this.touchInfo.now = e.changedTouches[0].clientY;
			},
			allowDrop(e) {
				this.touchInfo.endTime = e.timeStamp;
				this.touchInfo.endLoc = e.changedTouches[0].clientY;

				if (this.canCloseReg) {
					this.showRegister = false;
				}
			},
			register() {
				let out = {
					...this.loginInfo
				};
				let canSubmit = true;
				Object.keys(out).forEach(key => {
					if (canSubmit && out[key] == "") {
						this.alterTitle = this.attr2Str(key) + "不能为空";
						this.alterShow = true;
						canSubmit = false;
					}
				});
				if (canSubmit) {
					this.$http
						.post("/user/reg", this.$qs.stringify(out))
						.then(res => {
							if (res.data.status == 0) {
								this.Alter(res.data.msg + " 5秒后自动跳转", true);
								this.setCookie("token", res.data.data, 1);
								setTimeout(() => {
									this.$router.push("home");
								}, 5000);
							}
						})
				}
			},
			getCode() {
				this.Alter("验证码已发送", true);
				if (this.loginInfo.phone.length == 11) {
					this.codeCd = 60;
					this.$http
						.get("/main/sms1", {
							params: {
								phone: this.loginInfo.phone
							}
						})
						.then(res => {
							this.Alter(res.data.msg);
						});
					var i = setInterval(() => {
						this.codeCd--;
						if (this.codeCd == 0) {
							clearInterval(i);
						}
					}, 1000);
				} else {
					this.alterTitle = "电话号码异常";
					this.alterShow = true;
				}
			},
			tologin() {
				this.$router.push("login");
			},
			cPop() {
				this.alterTitle = "";
				this.alterShow = false;
			},
			choseLoc(k) {
				if (!this.onLoading) {
					this.choseShow = true;
					this.parameterName = k;
				}
			},
			cClose() {
				this.choseShow = false;
			},
			cChosed(k) {
				this.choseShow = false;
				this.onLoading = true;
				switch (this.parameterName) {
					case 0:
						this.loginInfo.province = k;
						this.loginInfo.city = "";
						this.loginInfo.area = "";
						this.shiInfo = [];
						this.quInfo = [];
						break;
					case 1:
						this.loginInfo.city = k;
						this.loginInfo.area = "";
						this.quInfo = [];
						break;
					case 2:
						this.loginInfo.area = k;
						break;
				}
				if (this.parameterName != 2) {
					this.$http
						.get("/main/getpca", {
							params: {
								aid: k
							}
						})
						.then(res => {
							if (res.data.status == 0) {
								if (this.parameterName == 0) {
									this.shiInfo = res.data.data.result;
								} else if (this.parameterName == 1) {
									this.quInfo = res.data.data.result;
								}
							} else {
								this.alterTitle = "异常";
								this.alterShow = true;
							}
							this.onLoading = false;
						})
						.catch(() => {
							this.alterTitle = "异常";
							this.alterShow = true;
						});
				} else {
					this.onLoading = false;
				}
			},
			attr2Str(attr) {
				switch (attr) {
					case "province":
						return "省份 ";
					case "city":
						return "市 ";
					case "area":
						return "区 ";
					case "name":
						return "联系人姓名 ";
					case "company":
						return "学校名称 ";
					case "phone":
						return "电话 ";
					case "code":
						return "验证码 ";
				}
			},
			setCookie: function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
				var expires = "expires=" + d.toUTCString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},
			//获取cookie
			getCookie: function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(";");
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == " ") c = c.substring(1);
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
			pop,
			choseRadio
		}
	};
</script>

<style scoped>
	/* 动画 */
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}

	.fade-enter,
	.fade-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}

	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		position: relative;
	}

	/* logo */
	.div_bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-content: center;
		box-sizing: border-box;
		padding: 10px 28px 0 28px;
	}

	.div_biaoyu {
		height: 4.0625rem;
		display: flex;
		flex-direction: column;
	}

	.logoImg2 {
		width: 156px;
		height: 93px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logoImg2 img {
		width: 156px;
		height: 93px;
	}

	/* 主体 */
	.schedule {
		overflow-y: auto;
		height: 75%;
		width: 90%;
		box-sizing: border-box;
		padding: 2.125rem 1.4375rem 1.875rem 0.8125rem;
		/* border: 0.3125rem solid rgba(0, 0, 0, 0.4); */
		/* background-color: rgba(255, 255, 255, 0.2); */
		border-radius: 0.3125rem;
		margin-top: 0.55rem;
		color: #FFFFFF;
	}

	.schedule .div_text {
		width: 100%;
		padding-left: 0.3rem;
		line-height: 2em;
	}

	.schedule .div_text2 {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.5rem;
		line-height: 1.5rem;
	}

	.div_text>span {
		white-space: pre-wrap;
	}

	.div_bottom_index {
		height: 2.5rem;
		width: 100%;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 10px;
	}

	.btm_bl {
		width: 12.5rem;
		height: 2.5rem;
		background-color: #b81e24;
		border-radius: 0.3125rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 注册 */
	.div_register {
		width: 100%;
		/* height: calc(100% - 4.0625rem - 0.75rem); */
		background-color: #ffffff;
		border-radius: 1.25rem 1.25rem 0 0;
		position: absolute;
		bottom: 0;
		margin-top: 4.8125rem;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.div_touch {
		height: 2.5rem;
		width: 80%;
		display: flex;
		justify-content: center;
	}

	.div_choseInfo {
		width: 85%;
		border-bottom: 1px solid #707070;
		margin-top: 0.5rem;
		margin-bottom: 2rem;
		padding-bottom: 0.3125rem;
		position: relative;
		color: #8e8e93;
		font-size: 0.875rem;
	}

	.div_choseInfo_btn {
		width: 85%;
		margin-top: 0.5rem;
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
	}

	.div_choseInfo_btn .div_in {
		width: 50%;
		border-bottom: 1px solid #707070;
		padding-bottom: 0.3125rem;
		color: #8e8e93;
		position: relative;
	}

	.div_choseInfo_btn .div_in input {
		width: 80%;
		position: absolute;
		bottom: 0.3125rem;
	}

	.div_choseInfo_btn .btn_nm {
		width: 8.75rem;
		height: 2.5rem;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #42597e;
		color: #ffffff;
	}

	.div_choseInfo_btn .btn_nm_cd {
		width: 8.75rem;
		height: 2.5rem;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #c7c7c7;
		color: #051124;
	}

	.div_choseInfo img {
		width: 1.25rem;
		height: 0.75rem;
		position: absolute;
		right: 0.625rem;
		bottom: 0.3125rem;
	}

	.hr_top {
		width: 3.4375rem;
		height: 0.3125rem;
		border-radius: 0.1875rem;
		background-color: #cbcbcb;
		margin-top: 1.125rem;
	}

	.div_register_now {
		width: 21.25rem;
		height: 3rem;
		background-color: #051124;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.3125rem;
	}

	.login {
		margin-top: 1.875rem;
		margin-bottom: 1rem;
	}

	input {
		font-size: 0.875rem;
		border: none;
		outline: none;
		color: #8e8e93;
	}

	input::-webkit-input-placeholder {
		color: #8e8e93;
	}
</style>
