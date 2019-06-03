<template>
	<div>
		<div class="index_head">
			<i class="el-icon-menu" @click="colFun"></i>
			<p @click="logOut">退出登录</p>
		</div>
		<el-container class="show_box">
			<el-aside :width="(collapse?'65':'240')+'px'">
				<el-menu :collapse="collapse" class="menu">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="1-1">选项1</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
					<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
						<router-view class="center" :name="item.content"></router-view>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';

	@Component
	export default class Index extends Vue {
		collapse: boolean = true;
		msg: string = '123';
		menu_width: number = 200;
		editableTabsValue: string = 'indes';
		editableTabs: array = [{
			title: '主页',
			name: 'indes',
			content: 'indes'
		}];

		colFun() {
			this.collapse = !this.collapse;
		}
		removeTab() {
			let tabs = this.editableTabs;
			let activeName = this.editableTabsValue;
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}

			this.editableTabsValue = activeName;
			this.editableTabs = tabs.filter(tab => tab.name !== targetName);
		}
		logOut(){
			this.$router.push({name:'login'})
		}
	}
</script>

<style lang="scss">
	.index_head {
		width: 100%;
		height: 50px;
		background-color: cornflowerblue;
		padding: 10px;
		box-sizing: border-box;
		display: flex;

		.el-icon-menu {
			background-color: cornflowerblue;
			color: white;
			font-size: 30px;
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			box-shadow: 0 0 20px 1px rgba(255, 255, 255, 0.3);
			cursor: pointer;
		}

		.el-icon-menu:hover {
			box-shadow: 0 0 20px 1px rgba(255, 255, 255, 0.5);
		}
	}

	.show_box {
		height: calc(100% - 50px);

		.menu {
			height: 100%;
		}

		.el-main {
			padding: 0;
			margin: 0;

			.center {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 5px;
			}
		}

	}
</style>
