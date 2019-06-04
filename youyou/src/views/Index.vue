<template>
	<div>
		<div class="index_head">
			<i class="el-icon-menu" @click="colFun"></i>
			<p @click="logOut">退出登录</p>
		</div>
		<el-container class="show_box">
			<el-aside class="scrool" :width="(collapse?'65':'240')+'px'">
				<el-menu :collapse="collapse" class="menu" :unique-opened="true" >
					<el-submenu :index="i+''" v-for="(menu,i) in menuList" :key="i">
						<template slot="title">
							<!-- <i class="el-icon-location"></i> -->
							<span>{{menu.name}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="cmenu.way" v-for="(cmenu,k) in menu.childer" :key="k" @click="addTab(cmenu.name,cmenu.way,cmenu.way)">{{cmenu.name}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
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
		Watch
	} from 'vue-property-decorator';
	import { Mutation } from 'vuex-class';
	import {getAuth,logout} from '@/plugins/request';
	import utils from '@/plugins/common';

	class Table {
		title: string;
		name: string;
		content: string;
		constructor(title: string, name: string, content: string ) {
			this.title = title;
			this.name = name;
			this.content = content;
		}
	}

	@Component
	export default class Index extends Vue {
		collapse: boolean = false;
		editableTabsValue: string = 'indes';
		editableTabs: Table[] = [{
			title: '主页',
			name: 'indes',
			content: 'indes'
		}];
		menuList: any[] = [];
		@Mutation('setToken') setToken:any;

		@Watch('editableTabs')
		whenTabsIsNull(n:[]){
			if(n.length==0){
				this.editableTabs.push(new Table('主页','indes','indes'))
			}
		}

		created() {
			getAuth().then((res:any)=>{
				this.menuList = res.data
			})
		}

		colFun() {
			this.collapse = !this.collapse;
		}
		removeTab(targetName: string) {
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
		addTab(title: string, name: string, content: string){
			if(this.editableTabs.find(e=>e.content==content)==undefined){
				this.editableTabs.push(new Table(title,name,content));
			}
			this.editableTabsValue=content;
		}
		logOut() {
			logout().then((res:any)=>{
				this.setToken('');
				utils.delCookie('token')
				this.$router.push({ name: 'login' });
			})
			
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

		.scrool::-webkit-scrollbar {
			display: none;
		}

	}
</style>
