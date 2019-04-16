<template>
	<div class="root">
		<img class="abs left" :src="juanzhou">
		<img class="abs right" :src="juanzhou">
		<slot></slot>
	</div>
</template>

<script>
	import juanzhou from '@/assets/juanzhou.png'
	export default {
		data() {
			return {
				juanzhou
			};
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style scoped>
	.left {
		width: 1.8%;
		height: 125%;
		left: -0.9%;
		top: -11.5%;
	}

	.right {
		width: 1.8%;
		height: 125%;
		right: -0.9%;
		top: -11.5%;
	}

	.root {
		height: 72%;
		width: 93%;
		background-image: url(../assets/background_juanzhou.png);
		background-size: auto 100%;
		position: relative;
	}
</style>
