<template>
	<div class="root">
		<div class="infoBody">
			<div v-for="(s,k) in bankInfo" :key="k" class="one_bank_info">
				
			</div>
		</div>
		<!-- <div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="50" :page-size="3"></el-pagination>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo: [{
				},{
				},{
				},],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				},
				
			};
		},
		created() {
			/* 题库 */
			this.$http.get('/admin/topics', {
				params: {
					token: this.$store.getters.token,
					p: this.pageInfo.nowPage,
					
				}
			}).then(res => {
				console.log(res);
			});
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style scoped>
	.infoBody {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding-bottom: 50px;
		flex-wrap: wrap;
	}

	.one_bank_info {
		width: 350px;
		height: 235px;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		padding: 1.4rem 1.875rem;
	}
	
	.div_text{
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	.div_text .inbot{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.div_addPer{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
