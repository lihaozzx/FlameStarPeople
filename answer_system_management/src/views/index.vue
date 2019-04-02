<template>
	<div class="show">
		<div style="position: relative;">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="student">查看学生</el-menu-item>
				<el-menu-item index="school">查看学校</el-menu-item>
				<el-menu-item index="session">查看场次</el-menu-item>

				<el-button v-if="btn=='student'" type="primary" style='position: absolute;right: 1%;top: 20%;'>新增学生</el-button>
				<el-button v-else-if="btn=='/school'" type="primary" style='position: absolute;right: 1%;top: 20%;'>12</el-button>
				<el-button v-else type="primary" style='position: absolute;right: 1%;top: 20%;'>新增场次</el-button>
			</el-menu>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 'student',
				btnInfo: [{}],
				btn: 'student',
			};
		},
		methods: {
			// 组件的方法
			handleSelect(key) {
				this.btn = key;
				this.$router.push({
					name: key
				})
			}
		}
	}
</script>

<style>
	.idx_btn {
		position: absolute;
		top: 0.625rem;
		right: 1.25rem;
	}

	.show {
		background-color: #FFFFFF;
		border-radius: 0.3125rem;
		height: 74%;
		width: 66%;
		box-shadow: 0 0 20px 3px #888888;
		box-sizing: border-box;
		padding: 0 5px 0 5px;
	}
</style>
