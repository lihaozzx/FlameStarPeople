<template>
	<div>
		<div class="index_head">
			<i class="el-icon-menu" @click="colFun"></i>
			<p @click="logOut">退出登录</p>
		</div>
		<el-container class="show_box">
			<el-aside class="scrool" :width="(collapse?'65':'240')+'px'">
				<el-menu :collapse="collapse" class="menu" :unique-opened="true">
					<el-submenu :index="i+''" v-for="(menu,i) in menuList" :key="i">
						<template slot="title">
							<!-- <i class="el-icon-location"></i> -->
							<span>{{menu.name}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="cmenu.way" v-for="(cmenu,k) in menu.childer" :key="k"
								@click="addTab(cmenu.name,cmenu.way,cmenu.way)">{{cmenu.name}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
					<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"
						:closable="item.title!='主页'">
						<router-view class="center" :name="item.content"></router-view>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { log } from 'util';
class Table {
		title;
		name;
		content;
		constructor(title, name, content) {
			this.title = title;
			this.name = name;
			this.content = content;
		}
	}
	export default {
		data() {
			return {
				collapse: false,
				editableTabsValue: 'indes',
				editableTabs: [{
					title: '主页',
					name: 'indes',
					content: 'indes'
				}],
				menuList: [],
			}
		},
		created() {
			this.$api.getAuth().then((res) => {
				this.menuList = res.data
			})
		},
		methods: {
			colFun() {
				this.collapse = !this.collapse;
			},
			removeTab(targetName) {
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
			},
			addTab(title, name, content) {
				if (this.editableTabs.find(e => e.content == content) == undefined) {
					this.editableTabs.push(new Table(title, name, content));
				}
				this.editableTabsValue = content;
			},
			logOut() {
				this.$api.logout().then(() => {
					this.setToken('');
					this.$utils.delCookie('token')
					this.$router.push({
						name: 'login'
					});
				})
			}
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
			width: 100%;
			height: 100%;


			.el-tabs {
				height: 100%;

				.el-tabs__content {
					height: calc(100% - 56px);

					.el-tab-pane {
						height: 100%;
					}
				}
			}

			.center {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 5px;
			}
		}

		.scrool::-webkit-scrollbar {
			display: none;
		}

	}
</style>