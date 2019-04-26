<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view class="Router"></router-view>
		</transition>
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
		data() {
			return {
				transitionName: 'slide-right',
			}
		}
	}
</script>

<style>
	body{
		margin: 0;
		overflow: hidden;
	}
	html {
		font-size: 10px;
		margin: 0;
		overflow: auto;
	}

	@media screen and (max-width:999px) {
		html {
			font-size: 10px
		}
	}

	@media screen and (min-width:1000px) and (max-width:1199px) {
		html {
			font-size: 12px
		}
	}

	@media screen and (min-width:1200px) and (max-width:1399px) {
		html {
			font-size: 14px
		}
	}

	@media screen and (min-width:1400px) and (max-width:1599px) {
		html {
			font-size: 16px
		}
	}

	@media screen and (min-width: 1600px) {
		html {
			font-size: 20px
		}
	}

	span {
		user-select: none;
	}

	#app {
		min-width: 1000px;
		min-height: 700px;
		width: 100vw;
		height: 100vh;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		position: relative;
		display: flex;
		justify-content: center;
	}

	.Router {
		width: 100%;
		height: 100%;
		transition: all .8s ease;
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
