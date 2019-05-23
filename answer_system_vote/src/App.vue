<template>
	<div id="app">
		<div id="back_yunwen"></div>
		<div id="back_red"></div>
		<router-view class="Router"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		watch: {
			'$route'() {
				let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
				if (isBack) {
					this.transitionName = 'slide-right'
				} else {
					this.transitionName = 'slide-left'
				}
				this.$router.isBack = false
			}
		},
		created(){
				const loading = this.$loading({
				lock: true,
				text: '服务器升级中，请稍后',
				spinner: 'el-icon-warning',
				background: 'rgba(0, 0, 0, 0.9)'
			});
		},
		data() {
			return {
				transitionName: 'slide-right',
			}
		}
	}
</script>

<style>
	html {
		font-size: 10px
	}

	@media screen and (min-width:321px) and (max-width:375px) {
		html {
			font-size: 11px
		}
	}

	@media screen and (min-width:376px) and (max-width:414px) {
		html {
			font-size: 14px
		}
	}

	@media screen and (min-width:415px) and (max-width:639px) {
		html {
			font-size: 15px
		}
	}

	@media screen and (min-width:640px) and (max-width:719px) {
		html {
			font-size: 20px
		}
	}

	@media screen and (min-width:720px) and (max-width:749px) {
		html {
			font-size: 22.5px
		}
	}

	@media screen and (min-width:750px) and (max-width:799px) {
		html {
			font-size: 23.5px
		}
	}

	@media screen and (min-width:800px) {
		html {
			font-size: 25px
		}
	}

	html,
	body {
		margin: 0;
		overflow-x: hidden;
	}

	span {
		user-select: none;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		position: relative;
		overflow-x: hidden;
		display: flex;
		justify-content: center;
	}

	#back_yunwen {
		position: absolute;
		top: 0;
		background-image: url(assets/260498-1302051H30459.jpg);
		background-size: 100%;
		background-repeat: repeat-y;
		width: 100%;
		height: 100%;
		opacity: 0.1;
		z-index: -1;
	}

	#back_red {
		position: absolute;
		top: 0;
		background-color: #A81E1C;
		width: 100%;
		height: 100%;
		z-index: -2;
	}

	.Router {
		max-width: 1100px;
		min-width: 300px;
		width: 100%;
		height: 100vh;
		transition: all .8s ease;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
		z-index: 1;
		overflow-x: hidden;
	}

	.Router::-webkit-scrollbar {
		display: none;
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
</style>
