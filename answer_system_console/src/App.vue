<template>
	<div id="app">
		<div v-if="login" class="index">
			<div class="back"></div>
			<div class="ti">
				<span v-if="nowTopic==0" style="font-size: 100px; color: #BEBEBE;">{{gameInfo.ffg}}</span>
				<div class="showtimu" v-else>
					<span class="title">{{num2str(nowTopic)}}</span>
					<span class="topictitle">{{paper[nowTopic-1].name}}</span>
					<div v-if="paper[nowTopic-1].type == '组合题'" class="zuhe">
						<div :class="paper[nowTopic-1].xuanx.length == 9?'zuhe_son':'zuhe_son2' " v-for="(t,k) in paper[nowTopic-1].xuanx"
						 :key="k">
							<span>{{t}}</span>
						</div>
					</div>
					<div v-else class="tiankong">
						<div class="xuanxiang" v-for="(t,k) in paper[nowTopic-1].xuanx" :key="k">
							<span style="position: absolute;left: 5px;">{{k+1}}. </span>
							<span>{{t}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="anniu">
				<div class="btn_box">
					<span>大屏幕</span>
					<div class="btn_box_r">
						<div class="btn" @click="sendToindex">
							<span>显示选手到位页面</span>
						</div>
						<div class="btn" @click="sendSeeAns">
							<span>公布答案</span>
						</div>
						<div class="btn" @click="sendRaking">
							<span>显示选手排名页面</span>
						</div>
						<div class="btn" @click="sendTherr">
							<span>显示本题答对前三</span>
						</div>
						<div class="btn" @click="sendResult">
							<span>显示本题正确率</span>
						</div>
					</div>
				</div>
				<div class="btn_box">
					<span>流程控制</span>
					<div class="btn_box_r">
						<div :class="nextStr.can?'disbtn':'btn'" @click="nextTopic">
							<span>{{nextStr.val}}</span>
						</div>
						<div class="btn" @click="startAnswer">
							<span>开始答题</span>
						</div>
						<div class="btn" @click="sendStartGame">
							<span>开始比赛,播选题视频</span>
						</div>
						<div class="btn" @click="sendPlayers">
							<span>再次发送选手信息</span>
						</div>
						<div class="btn" @click="endGame">
							<span>结束比赛</span>
						</div>
						<div class="btn" @click="switchGame">
							<span>切换比赛</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="index">
			<div class="back"></div>
			<div class="login">
				<input type="text" v-model="code" placeholder="授权码" @keyup.enter="loginFun">
				<img :src="left" style="width: 50px;height:50px ;position: relative;right: 50px;" @click="loginFun">
			</div>
		</div>
		<div v-if="endGames" class="endgame">
			<span>输入授权码后将结束本次比赛</span>
			<input type="text" v-model="code2" placeholder="授权码" @keyup.enter="endGameFun">
			<img :src="left" style="width: 50px;height:50px ;position: relative;right: 50px;" @click="endGameFun">
		</div>
	</div>
</template>

<script>
	import left from '@/assets/left.png'
	export default {
		watch: {
// 			players(n,o) {
// 				console.log(o);
// 				console.log(n.length == 0);
// 				if(n!=[]){
// 					this.sendPlayers();
// 				}
// 			},
			wsm(n) {
				switch (n.type) {
					case 'infoErr':
						// 学生信息错误
						if (n.data.code == this.code) {
							alert('座位号：' + n.data.num + ' 的学生信息错误，请于后台改正')
						}
						break;
					case 'sureInfo':
						// 学生确认信息
						this.players.forEach(per => {
							if (per.number == n.data) {
								per.isSure = true;
							}
						});
						this.sendPlayers()
						break;
					default:
						break;
				}
			}
		},
		created() {
			this.initWebSocket();
		},
		name: 'app',
		data() {
			return {
				websock: null,
				wsm: null,
				login: false,
				code: '',
				code2: '',
				left,
				gameInfo: null,
				loding: false,
				paper: [],
				nowTopic: 0,
				nextStr: {
					val: '下一题',
					can: false
				},
				players: [],
				endGames: false
			}
		},
		methods: {
			/* 页面方法 */
			loginFun() {
				if (!this.loding) {
					this.loding = true;
					if (this.code != '') {
						this.$http.post('/stock/game', this.$qs.stringify({
							warrant: this.code
						})).then(res => {
							if (res.data.status == 0) {
								this.$http.post('/stock/players', this.$qs.stringify({
									gid: res.data.data.id
								})).then(ress => {
									if (res.data.status == 0) {
										ress.data.data.forEach(per => {
											this.players.push({
												...per,
												isSure: false
											})
										});
										this.sendPlayers();
										this.login = true;
										this.loding = false;
									} else {
										alert(res.data.msg);
										this.loding = false;
									}
								})
								this.gameInfo = res.data.data;
							} else {
								alert(res.data.msg);
								this.loding = false;
							}
						})
					}
				}
			},
			nextTopic() {
				/* 下一题 */
				if (!this.loding) {
					this.loding = true;
					if (this.paper.length == 0) {
						this.$http.post('/stock/exam', this.$qs.stringify({
							eid: this.gameInfo.eid
						})).then(res => {
							if (res.data.status == 0) {
								this.paper = res.data.data.topics;
								this.nowTopic++;
								this.sendTopic();
								this.loding = false;
							}
						})
					} else {
						if (this.nowTopic < this.paper.length) {
							this.nowTopic++;
							this.sendTopic();
						} else {
							this.sendOver();
							this.nextStr = {
								val: '答题结束',
								can: true
							}
						}
						this.loding = false;
					}
				}
			},
			startAnswer() {
				/* 开始答题 */
				this.sendStart()
			},
			switchGame() {
				/* 切换比赛 */
				this.sendSwitch()
				this.login = false;
				this.code = '';
				this.code2='';
				this.paper = [];
				this.nowTopic = 0;
				this.players = [];
				this.nextStr = {
					val: '下一题',
					can: false
				}
			},
			endGame() {
				this.endGames = true;
			},
			endGameFun() {
				if (!this.loding) {
					this.loding = true;
					if (this.code2 != '') {
						this.$http.post('/stock/jsgames', this.$qs.stringify({
							id:this.gameInfo.id,
							warrant: this.code2
						})).then(res => {
							if (res.data.status == 0) {
								this.endGames = false;
								alert('该比赛已结束，请点击切换比赛重新开始');
							} else {
								alert(res.data.msg);
								this.loding = false;
							}
						})
					}
				}
			},
			/* wssendmessage */
			sendStartGame() {
				/* 开始比赛 */
				this.websock.send(this.$mso({
					type: 'startGame',
					date: this.gameInfo.video
				}))
			},
			sendOver() {
				this.websock.send(this.$mso({
					type: 'gameover'
				}))
			},
			sendTopic() {
				this.websock.send(this.$mso({
					type: 'nextTopic',
					data: this.paper[this.nowTopic - 1]
				}))
			},
			sendToindex() {
				this.websock.send(this.$mso({
					type: 'toindex'
				}))
			},
			sendSwitch() {
				this.websock.send(this.$mso({
					type: 'gameswitch'
				}))
			},
			sendPlayers() {
				this.websock.send(this.$mso({
					type: 'stuInfo',
					data: this.players
				}))
			},
			sendStart() {
				this.websock.send(this.$mso({
					type: 'start!!!!!!',
				}))
			},
			sendSeeAns() {
				this.websock.send(this.$mso({
					type: 'seeans',
				}))
			},
			sendRaking() {
				this.$http.get('/stock/maxScore', {
					params: {
						gid: this.gameInfo.id
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.websock.send(this.$mso({
							type: 'seeRaking',
							data: res.data.data
						}))
					} else {
						alert('查询失败')
					}
				})
			},
			sendResult() {
				this.$http.get('/stock/rightOrwrong', {
					params: {
						gid: this.gameInfo.id,
						tid: this.paper[this.nowTopic - 1].id
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.websock.send(this.$mso({
							type: 'seeResult',
							data: res.data.data
						}))
					} else {
						alert('查询失败')
					}
				})
			},
			sendTherr() {
				this.$http.get('/stock/fastest', {
					params: {
						gid: this.gameInfo.id,
						tid: this.paper[this.nowTopic - 1].id
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.websock.send(this.$mso({
							type: 'seeTherr',
							data: res.data.data
						}))
					} else {
						alert('查询失败')
					}
				})
			},
			/* websocket */
			initWebSocket() { //初始化weosocket
				const wsuri = `ws://192.168.1.100:7272` //这个地址由后端童鞋提供
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen() { //连接建立之后执行send方法发送数据
				this.websocketsend({
					type: "login",
					client_name: "console",
					room_id: "1"
				})
			},
			websocketonerror() { //连接建立失败重连
				this.initWebSocket()
			},
			websocketonmessage(e) { //收到消息
				let r = JSON.parse(e.data);
				if (r.type == 'say') {
					this.wsm = r.content
				}
			},
			websocketsend(Data) { //数据发送
				this.websock.send(JSON.stringify(Data))
			},
			websocketclose(e) { //关闭
				console.log('断开连接', e)
			},
			/* 其他 */
			num2str(e) {
				switch (e) {
					case 0:
						return '未开始';
					case 1:
						return '第一题';
					case 2:
						return '第二题';
					case 3:
						return '第三题';
					case 4:
						return '第四题';
					case 5:
						return '第五题';
					case 6:
						return '第六题';
					case 7:
						return '第七题';
					case 8:
						return '第八题';
					case 9:
						return '第九题';
					case 10:
						return '第十题';
					case 11:
						return '第十一题';
					case 12:
						return '第十二题';
					case 13:
						return '第十三题';
					case 14:
						return '第十四题';
					case 15:
						return '第十五题';
					case 16:
						return '第十六题';
					case 17:
						return '第十七题';
					case 18:
						return '第十八题';
					case 19:
						return '第十九题';
					case 20:
						return '第二十题';
					case 21:
						return '第二十一题';
					case 22:
						return '第二十二题';
					case 23:
						return '第二十三题';
					case 24:
						return '第二十四题';
					case 25:
						return '第二十五题';
					case 26:
						return '第二十六题';
					case 27:
						return '第二十七题';
					case 28:
						return '第二十八题';
					case 29:
						return '第二十九题';
					case 30:
						return '第三十题';
					default:
						return '答题结束';
				}
			}
		}
	}
</script>

<style>
	html,
	body {
		width: 1920px;
		height: 1080px;
		margin: 0;
	}

	#app {
		width: 1920px;
		height: 1080px;
		position: relative;
	}

	.index {
		width: 100%;
		height: 100%;
	}

	.login {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login>input {
		border: none;
		background: none;
		color: #1890FF;
		font-size: 50px;
		outline: none;
		border-bottom: #1890FF solid 1px;
	}

	.back {
		width: 100%;
		height: 100%;
		position: absolute;
		background-image: url(assets/01826e5a6bd772a80120a123c724dd.jpg@1280w_1l_2o_100sh.jpg);
		background-size: cover;
		-webkit-filter: blur(5px);
		-moz-filter: blur(5px);
		-o-filter: blur(5px);
		-ms-filter: blur(5px);
		filter: blur(5px);
		z-index: -1;
	}

	.ti {
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.showtimu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.zuhe {
		width: 600px;
		height: 260px;
		display: flex;
		flex-wrap: wrap;
	}

	.tiankong {
		width: 600px;
		height: 280px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.xuanxiang {
		width: 400px;
		margin: 10px 50px;
		height: 70px;
		background-color: #BEBEBE;
		color: white;
		font-size: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.zuhe_son {
		width: 120px;
		margin: 0 40px;
		height: 70px;
		background-color: #BEBEBE;
		color: white;
		font-size: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.zuhe_son2 {
		width: 100px;
		margin: 0 20px;
		height: 70px;
		background-color: #BEBEBE;
		color: white;
		font-size: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		color: #595959;
		font-size: 72px;
		font-weight: 900;
	}

	.topictitle {
		width: 1200px;
		text-align: center;
		color: #595959;
		font-size: 64px;
	}

	.anniu {
		width: 100%;
		height: 50%;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 70px 350px;
		border-top: 1px solid #1890FF;
	}

	.btn_box {
		width: 100%;
		border-radius: 20px;
		margin-bottom: 15px;
		border: 3px solid #8c8c8c;
		padding: 20px;
		display: flex;
		flex-direction: column;
		font-size: 30px;
		justify-content: center;
		align-items: center;
	}

	.btn_box_r {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.btn {
		width: 280px;
		height: 80px;
		background-color: #1890FF;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 30px;
		margin: 15px 50px;
		cursor: pointer;
		-webkit-user-select: none;
		user-select: none;
	}

	.disbtn {
		width: 280px;
		height: 80px;
		background-color: #BEBEBE;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 30px;
		margin: 0 50px;
		-webkit-user-select: none;
		user-select: none;
	}

	.endgame {
		width: 800px;
		height: 300px;
		border-radius: 30px;
		padding: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(-30deg, #8c8c8c, #E3E3E3, #8c8c8c);
		;
		top: 500px;
		left: 200px;
		position: absolute;
		color: red;
	}

	.endgame>span {
		position: absolute;
		top: 100px;
		font-size: 30px;
	}

	.endgame>input {
		border: none;
		color: #FFFFFF;
		background: none;
		font-size: 50px;
		outline: none;
		border-bottom: #FFFFFF solid 1px;
	}
</style>
