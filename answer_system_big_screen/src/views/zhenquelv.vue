<template>
	<div>
		<div class="content">
			<div class="show">
				<div class="asd">
					<span>正确<br>{{info.dui}}人</span>
					<span>错误<br>{{info.cuo}}人</span>
				</div>
				<span style="position: relative;top: 200px;font-size: 50px;color: #F0B74A;font-weight: 900;">正确率{{info.duib}}人</span>
				<img :src="asd1" class="asdasd1">
				<img :src="asd2" class="asdasd2">
			</div>
		</div>
	</div>
</template>

<script>
	import asd1 from '@/assets/asdasdasd1.png'
	import asd2 from '@/assets/asdasdasd2.png'
	export default {
		data() {
			return {
				info: {
					dui: '12',
					cuo: '8',
					duib: '60%',
					cuob: '答错百分比'
				},asd1,asd2
			};
		},
		created() {
			if(this.$route.params.zhenquelv!=undefined){
				this.info = this.$route.params.zhenquelv
			}
			
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 2.2% 2.5%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 30px;
	}

	.show {
		width: 1000px;
		height: 200px;
		background: rgba(12, 52, 84, 1);
		border: 2px solid rgba(240, 183, 74, 1);
		border-radius: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.asd {
		width: 80%;
		height: 200px;
		display: flex;
		justify-content: space-between;
		font-size: 48px;
		color: #F0B74A;
		box-sizing: border-box;
		padding-top: 50px;
	}
	.asdasd1{
		width: 400px;
		position: absolute;top: -50px;
	}
	.asdasd2{
		width: 500px;
		position: absolute;top: -230px;left: 275px;
	}
</style>
