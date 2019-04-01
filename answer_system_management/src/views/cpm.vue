<template>
	<div>
		<div class="infoBody">
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
		background-color: #42B983;
	}
	.one_info{
		width: 30%;
		height: 80%;
		background-color: #888888;
	}
	.infoFooter{
		display: flex;
		flex-wrap: inherit;
	}
</style>
