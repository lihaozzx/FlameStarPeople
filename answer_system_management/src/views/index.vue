<template>
	<div style="position: relative;">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="/">查看学生</el-menu-item>
			<el-menu-item index="school">查看学校</el-menu-item>
			<el-menu-item index="session">查看场次</el-menu-item>
			
			<el-button v-if="btn=='/'" type="primary" style='position: absolute;right: 1%;top: 20%;'>新增学生</el-button>
			<el-button v-else-if="btn=='school'" type="primary" style='position: absolute;right: 1%;top: 20%;'>12</el-button>
			<el-button v-else="btn=='session'" type="primary" style='position: absolute;right: 1%;top: 20%;'>新增场次</el-button>
		</el-menu>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '/',
				btnInfo:[
					{}
				],
				btn:'/',
			};
		},
		methods: {
			// 组件的方法
			handleSelect(key, keyPath) {
				this.btn = key;
				this.$router.push({path:key})
			}
		}
	}
</script>

<style>
	.idx_btn{
		position: absolute;
		top: 0.625rem;
		right: 1.25rem;
	}
</style>
