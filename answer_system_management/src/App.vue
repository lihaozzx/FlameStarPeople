<template>
	<div id="app">
		<div class="show"><router-view></router-view></div>
	</div>
</template>

<script>
	export default {
		name: 'app'
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
	.show{
		background-color: #FFFFFF;
		border-radius: 0.3125rem;
		height: 74%;
		width: 66%;
		box-shadow:0 0 20px 3px #888888;
		box-sizing: border-box;
		padding: 0 5px 0 5px;
	}
</style>
