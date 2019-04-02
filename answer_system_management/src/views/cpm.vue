<template>
	<div>
		<div class="infoBody">
			<div class="one_info">
				<div>
					<span>阿萨德</span>
					<span>授权码</span>
				</div>
				<div>
					<span>
						<span>选题视频：</span>
						<span>第二套题库。avi</span>
					</span>
					<span>修改</span>
				</div>
			</div>
			<div class="one_info">
				
			</div>
			<div class="one_info">
				
			</div>
		</div>
		<div class="infoFooter">
			<el-pagination layout="prev, pager, next" :total="50" :page-size="3"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sessionInfo:[
					{
						name:'阿萨德',
						code:'Aqfdf',
						vdioinfo:{
							name:'wva.mp4',
							url:''
						},
						tiku:'',
						
					}
				]
			};
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style>
	.infoBody{
		width: 100%;
		height: 35rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.one_info{
		width: 30%;
		height: 80%;
		background-color: #FFFFFF;
		border-radius: 0 0 1.875rem 1.875rem;
		box-shadow: 0 0 0.75rem 0.2rem rgba(0,0,0,0.2);
	}
	.infoFooter{
		display: flex;
		flex-wrap: inherit;
		position: relative;
	}
	.el-pagination{
		position: absolute;
		right: 0;
	}
</style>
