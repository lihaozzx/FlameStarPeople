<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	body {
		margin: 0;
		width: 100vw;
		height: 100vh;
	}
	#app{
		background-image: url(assets/login_bg.png);
		background-size: cover;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
