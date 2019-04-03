<template>
	<div class="show">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="student">查看学生</el-menu-item>
				<el-menu-item index="school">查看学校</el-menu-item>
				<el-menu-item index="session">查看场次</el-menu-item>
				<el-menu-item index="bank">查看题库</el-menu-item>
				<el-menu-item index="paper">查看考卷</el-menu-item>

				<el-button v-if="activeIndex=='student'" type="primary" style='position: absolute;right: 1%;top: 20%;'>新增学生</el-button>
				<el-button v-else-if="activeIndex=='school'" type="primary" style='position: absolute;right: 1%;top: 20%;'>新增学生</el-button>
				<el-button v-else type="primary" style='position: absolute;right: 1%;top: 20%;'>新增场次</el-button>
			</el-menu>
			<router-view></router-view>
	</div>
</template>

<script>
	export default {
		computed: {
			activeIndex() {
				return this.$route.name
			}
		},
		data() {
			return {
				btnInfo: [{}],
			};
		},
		methods: {
			// 组件的方法
			handleSelect(key) {
				this.$router.push({
					name: key
				})
			}
		}
	}
</script>

<style>
	.root {
		height: calc(100% - 60px);
		position: relative;
	}

	.idx_btn {
		position: absolute;
		top: 0.625rem;
		right: 1.25rem;
	}

	.show {
		background-color: #FFFFFF;
		border-radius: 0.3125rem;
		height: 100%;
		width: 100%;
		box-shadow: 0 0 20px 3px #888888;
		box-sizing: border-box;
		padding: 0 5px 0 5px;
		position: relative;
	}
	.infoFooter {
		position: absolute;
		right: 0;
		bottom: 1%;
	}
</style>
