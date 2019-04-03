<template>
	<div id="app">
		<div style="height: 74.07%;width: 66.67%;">
			<router-view></router-view>
		</div>
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

	#app {
		background-image: url(assets/login_bg.png);
		background-size: cover;
		width: 100%;
		height: 100%;
		min-height: 800px;
		min-width: 1280px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: auto;
	}

	.ts18 {
		font-size: 1.125rem;
	}

	.ts14 {
		font-size: 0.875rem;
	}

	.ts12 {
		font-size: 0.75rem;
	}

	.cf0 {
		color: #FF0000;
	}

	.o26 {
		color: #262626;
		opacity: 0.4;
	}

	.a26 {
		color: #262626;
	}

	.b18 {
		color: #1890FF;
	}
</style>
