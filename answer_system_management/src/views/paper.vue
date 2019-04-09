<template>
	<div class="root">
		<div class="infoBody" v-if="bankInfo.length!=0">
			<div v-for="(s,k) in bankInfo" :key="k" class="one_bank_info">
				<div class="div_text">
					<span class="ts18">{{s.name}}</span>
				</div>
				<div class="div_text">
					<span class="ts16">
						<span class="o26">当前题数：</span>
						<span class="a26">{{s.nums}}</span>
					</span>
				</div>
				<div class="div_text">
					<span class="ts16">
						<span class="o26">最后修改日期：</span>
						<span class="a26">2018</span>
					</span>
				</div>
				<div class="div_addPer">
					<span class="ts12 b18">查看全部</span>
					<i class="el-icon-arrow-down"></i>
				</div>
			</div>
		</div>
		<div v-else class="infoBody_none">
			<span>暂无试卷信息，请添加</span>
		</div>
		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="pageInfo.totalCount" :page-size="pageInfo.size" :current-page="pageInfo.nowPage" @current-change="selPaper"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo: [{},{},{},{},{},{}],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				}
			};
		},
		created() {
			this.selPaper()
		},
		methods: {
			// 组件的方法
			selPaper(p){
				if(p){
					this.pageInfo.nowPage = p;
				}
				let load = this.$loading({
					fullscreen: true
				});
				this.$http.get('/admin/exam', {
					params: {
						token: this.$store.getters.token,
						p: this.pageInfo.nowPage
					}
				}).then(res => {
					if (res.data.status == 0) {
						this.bankInfo = res.data.data;
						this.pageInfo = {
							totalCount: parseInt(res.data.pager.total_count),
							size: res.data.pager.page_size,
							nowPage: res.data.pager.current_page
						}
					} else {
						this.$notify.success({
							title: '错误',
							iconClass: 'el-icon-warning',
							message: res.data.msg,
							showClose: false
						});
					}
					load.close();
				}).catch(() => {
					this.$notify.success({
						title: '错误',
						iconClass: 'el-icon-warning',
						message: '服务器未响应',
						showClose: false
					});
					load.close()
				});
			}
		}
	}
</script>

<style scoped>
	.infoBody {
		width: 100%;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		padding-bottom: 50px;
		flex-wrap: wrap;
	}

	.infoBody_none {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 50px;
	}

	.one_bank_info {
		width: 350px;
		height: 190px;
		margin: 46px 0 0 50px;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 5px 5px 0.75rem 0.2rem #ececec;
		box-sizing: border-box;
		padding: 1.4rem 1.875rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.div_text {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.div_text .inbot {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.div_addPer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
