<template>
	<div id="app" :style="'height:'+height+'px'">
		<transition :name="transitionName">
			<router-view class="Router"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				transitionName: 'slide-right',
				height: innerHeight
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
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
	}

	#app {
		background-image: url(assets/background.png);
		background-size: 100% 100%;
	}

	.Router {
		position: absolute;
		width: 100%;
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

	.ts14 {
		font-size: 0.875rem;
	}

	.ts16 {
		font-size: 1rem;
	}

	.ts20 {
		font-size: 1.25rem;
	}

	.ts26 {
		font-size: 1.625rem;
	}

	.ts36 {
		font-size: 2.25rem;
	}

	.clrRed {
		color: #B81E24;
	}

	.clrWhite {
		color: #FFFFFF;
	}
</style>
