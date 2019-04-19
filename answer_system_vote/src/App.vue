<template>
	<div id="app">
		<div id="back_yunwen"></div>
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
	html,
	body {
		margin: 0;
		background-color: #A81E1C;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		position: relative;
		height: 5000px;
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
	}

	.Router {
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
</style>
