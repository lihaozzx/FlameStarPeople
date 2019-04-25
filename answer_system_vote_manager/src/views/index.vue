<template>
	<div style="display: flex;">
		<div class="tap_div">
			<span class="title">立德树人工程投票系统后台管理</span>
			<div class="one_tap" @click="addTab('学生信息','stuInfo')"><span>学生信息</span></div>
			<div class="one_tap" @click="addTab('投票题库','bank')"><span>投票题库</span></div>
			<div class="one_tap" @click="addTab('投票记录','logs')"><span>投票记录</span></div>
		</div>
		<div class="show_div">
			<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
				<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
					<router-view :name="item.content"></router-view>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editableTabsValue: '',
				editableTabs: [{
						title: '主页',
						name: url,
						content: ''
					}],
				tabIndex: 2
			}
		},
		methods: {
			addTab(targetName,url) {
				if (this.editableTabs.find(e => e.name == targetName) == undefined) {
					this.editableTabs.push({
						title: targetName,
						name: url,
						content: url
					})
				}
				this.editableTabsValue = targetName;
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
			}
		}
	}
</script>

<style lang="scss">
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
			margin-bottom: 10px;
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
	}
</style>
