<template>
	<div id="app">
		<div class="logout">
			<el-button type="danger" @click="logout">退出登录</el-button>
		</div>
		<div style="height: 74.07%;width: 66.67%;">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		methods: {
			logout(){
				this.$store.commit('setToken',null);
				this.$router.push({path:'/asdsa'})
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
		width: 100vw;
		height: 100vh;
	}
	
	li{
		list-style-type:none;
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
		position: relative;
	}
	
	.logout{
		position: absolute;
		top:10px;
		right: 10px;
	}
	
	.ovy{
		height: 450px;
		overflow-y: auto;
	}
	.ovy::-webkit-scrollbar {
		display: none;
	}
	.juzhong{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ts30{
		font-size: 30px;
	}
	.ts24{
		font-size: 24px;
	}
	
	.ts18 {
		font-size: 18px;
	}
	.ts16 {
		font-size: 16px;
	}

	.ts14 {
		font-size: 14px;
	}

	.ts12 {
		font-size: 12px;
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
