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
		name: 'app',
		computed:{
			title(){
				return this.$store.getters.nowTitle;
			}
		},
		data() {
			return {
				transitionName: 'slide-right',
				height: innerHeight,
				img_l,
				img_r
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
		min-height: 100vh;
		min-width: 100vw;
		overflow: hidden;
	}
	
	body{
		background-image: url(assets/background.png);
		background-size: cover;
	}
	
	.top_title{
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #F0B74A;
		font-size: 4.5rem;
		position: absolute;
		top: 5%;
	}
	.img_title{
		margin: 0 1.875rem;
		width:6rem;
		height: 2.125rem;
	}
	
	.bottom_yunwen{
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
	
	.abs{
		position: absolute;
	}
</style>
