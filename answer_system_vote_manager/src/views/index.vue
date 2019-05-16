<template>
	<div style="display: flex;">
		<div class="tap_div">
			<span class="title">立德树人工程投票系统后台管理</span>
			<div class="one_tap" @click="addTab('主页','indes')"><span>主页</span></div>
			<div class="one_tap" @click="addTab('学生信息','stuInfo')"><span>学生信息</span></div>
			<div class="one_tap" @click="addTab('投票题库','bank')"><span>投票题库</span></div>
			<div class="one_tap" @click="addTab('投票记录','logs')"><span>投票记录</span></div>
			<div class="one_tap" @click="addTab('家书审核','letter')"><span>家书审核</span></div>
		</div>
		<div class="show_div">
			<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
				<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
					<router-view class="center" :name="item.content"></router-view>
				</el-tab-pane>
			</el-tabs>
			<div class="logout">
				<el-button type="danger" round @click="logoutFun">退出</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editableTabsValue: 'indes',
				editableTabs: [{
						title: '主页',
						name: 'indes',
						content: 'indes'
					}],
			}
		},
		methods: {
			addTab(targetName,url) {
				if (this.editableTabs.find(e => e.title == targetName) == undefined) {
					this.editableTabs.push({
						title: targetName,
						name: url,
						content: url
					})
				}
				this.editableTabsValue = url;
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
			logoutFun(){
				this.$router.push({name:'login'});
				this.$store.commit('initToken');
				this.$utils.delCookie('token');
			}
		}
	}
</script>

<style lang="scss">
	.juzhong {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tap_div {
		width: 10rem;
		height: 100%;
		box-sizing: border-box;
		padding: 0 10px;
		border-right: 1px solid rgb(66, 185, 131);

		.title {
			font-size: 1.5rem;
			font-weight: 900;
		}

		.one_tap {
			width: 100%;
			height: 2rem;
			border-radius: 0.5rem;
			background: linear-gradient(20deg, rgb(66, 185, 131), rgb(66, 185, 131), rgb(96, 215, 161), rgb(86, 115, 151));
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			cursor: pointer;
		}

	}

	.show_div {
		width: calc(100% - 10rem);
		height: 100%;
		position: relative;
		.el-tabs{
			width: 100%;
			height: 100%;
			.el-tabs__content{
				width: 100%;
				height: 92%;
				.el-tab-pane{
					width: 100%;
					height: 100%;
				}
			}
		}
		.logout{
			transform: scale(0.7,0.7);
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.center{
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.el-table__body-wrapper::-webkit-scrollbar{
		width: 0.625rem;
		height: 0.625rem;
	}
	/*滚动条里面滑块*/
	.el-table__body-wrapper::-webkit-scrollbar-thumb {
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #409EFF;
    }
	/*滚动条里面轨道*/
	.el-table__body-wrapper::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0.3125rem;
        background: #EDEDED;
    }
</style>
