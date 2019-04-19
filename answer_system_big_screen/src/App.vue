<template>
	<div id="app">
		<div class="top_title">
			<div><img class="img_title" :src="img_l"><span>{{title}}</span><img class="img_title" :src="img_r"></div>
		</div>
		<transition :name="transitionName">
			<router-view class="Router"></router-view>
		</transition>
		<div class="bottom_yunwen"></div>
	</div>
</template>

<script>
	import img_l from '@/assets/icon_left.png'
	import img_r from '@/assets/icon_right.png'
	export default {
		computed: {
			title() {
				return this.$store.getters.nowTitle;
			},
			wsm() {
				return this.$store.getters.wsmg
			}
		},
		watch: {
			'$route'() {
				let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
				if (isBack) {
					this.transitionName = 'slide-right'
				} else {
					this.transitionName = 'slide-left'
				}
				this.$router.isBack = false
			},
			wsm(n) {
				switch (n.type) {
					case 'nextTopic':
						// 下一题
						this.$store.commit('startDao');
						this.$store.commit('showansno');
						if (this.$router.history.current.name == "answer") {
							this.$store.commit('saveTopic', n.data.topic);
							this.$store.commit('nextAns', n.data.num + 1);
						} else {
							this.$router.push({
								name: 'answer',
								params: {
									topic: n.data.topic
								}
							})
						}
						break;
					case 'seeTopic':
						// 跳转题干
						this.$store.commit('showansno');
						if (this.$router.history.current.name != "answer") {
							this.$router.push({
								name: 'answer'
							})
						}
						break;
					case 'toindex':
						/* 跳转主页 */
						this.$router.push({
							name: 'index'
						})
						break;
					case 'seeans':
						/* 公布答案 */
						this.$store.commit('showans');
						if (this.$router.history.current.name != "answer") {
							this.$router.push({
								name: 'answer'
							})
						}
						break;
					case 'seeRaking':
						/* 显示选手排名页面 */
						this.$router.push({
							name: 'Ranking',
							params: {
								paimin: n.data
							}
						})
						break;
					case 'seeResult':
						/* 查看正确率 */
						this.$router.push({
							name: 'zhenquelv',
							params: {
								zhenquelv: n.data
							}
						})
						break;
					case 'seeTherr':
						/* 查看本题答对前三 */
						this.$router.push({
							name: 'info',
							params: {
								rank: n.data
							}
						})
						break;
					case 'gameswitch':
						// 初始化比赛
						this.$store.commit('initAns');
						this.$store.commit('initStuinfo');
						this.$store.commit('initTopic');
						this.$router.push({
							name: 'index'
						})
						break;
					case 'stuInfo':
						// 学生信息
						this.$store.commit('saveStuinfo', n.data);
						this.$router.push({
							name: 'index'
						})
						break;
					case 'startGame':
						// 开始比赛
						this.$router.push({
							name: 'play',
							params: {
								dizhi: n.data
							}
						})
						break;
					case 'seeRule':
						// 开始比赛
						this.$router.push({
							name: 'rule',
						})
						break;
				}
			}
		},
		name: 'app',
		created() {
			this.initWebSocket();
		},
		methods: {
			initWebSocket() { //初始化weosocket
				const wsuri = `ws://192.168.1.100:7272` //这个地址由后端童鞋提供
				this.websock = new WebSocket(wsuri);
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onclose = this.websocketclose;
				this.$store.commit('initws', this.websock);
			},
			websocketonopen() { //连接建立之后执行send方法发送数据
				this.websocketsend({
					type: "login",
					client_name: "bigScreen",
					room_id: "1"
				})
			},
			websocketonerror() { //连接建立失败重连
				this.initWebSocket()
			},
			websocketonmessage(e) { //收到消息
				let r = JSON.parse(e.data);
				if (r.type == 'say') {
					this.$store.commit('onMessage', r.content);
				}
			},
			websocketsend(Data) { //数据发送
				this.websock.send(JSON.stringify(Data))
			},
			websocketclose(e) { //关闭
				console.log('断开连接', e)
			}
		},
		data() {
			return {
				transitionName: 'slide-right',
				height: innerHeight,
				img_l,
				img_r,
				websock: null
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
		min-height: 100vh;
		min-width: 100vw;
		overflow: hidden;
	}

	body {
		background-image: url(assets/background.png);
		background-size: cover;
	}

	.top_title {
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #F0B74A;
		font-size: 4.5rem;
		position: absolute;
		top: 5%;
	}

	.img_title {
		margin: 0 1.875rem;
		width: 6rem;
		height: 2.125rem;
	}

	.bottom_yunwen {
		position: absolute;
		bottom: -2.2%;
		height: 8.125rem;
		width: 100vw;
		background-image: url(assets/bottom_img.png);
		background-size: auto 100%;
	}

	.Router {
		position: absolute;
		width: 100%;
		height: 100%;
		transition: all .8s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-100%, 0);
		transform: translate(-100% 0);
	}

	.abs {
		position: absolute;
	}
</style>
