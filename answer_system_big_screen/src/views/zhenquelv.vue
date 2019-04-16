<template>
	<div>
		<div class="content">
			<div class="show">
				<div class="asd">
					<span>正确{{info.dui}}人</span>
					<span>错误{{info.cuo}}人</span>
				</div>
				<span>正确率{{info.duib}}人</span>
				<img :src="asd" class="asdasd">
			</div>
		</div>
	</div>
</template>

<script>
	import asd from '@/assets/asdasdasd.png'
	export default {
		computed: {
			wsm() {
				return this.$store.getters.wsmg
			}
		},
		watch: {
			wsm(n) {
				switch (n.type) {
					case 'stuInfo':
						// 学生信息
						this.perNum = n.data
						this.$store.commit('saveStuinfo', n.data);
						break;
					case 'nextTopic':
						// 下一题
						this.$router.push({
							name: 'answer',
							params: {
								topic:n.data
							}
						})
						break;
					case 'startGame':
						// 开始比赛
						this.$router.push({
							name: 'play',
							params: {
								dizhi: n.data
							}
						})
						break;
					default:
						break;
				}
			}
		},
		data() {
			return {
				info: {
					dui: '答对数量',
					cuo: '答错数量',
					duib: '答对百分比',
					cuob: '答错百分比'
				},asd
			};
		},
		created() {
			this.info = this.$route.params.zhenquelv
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
		height: 300px;
		background: rgba(12, 52, 84, 1);
		border: 2px solid rgba(240, 183, 74, 1);
		border-radius: 150px;
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
	}
	.asdasd{
		width: 500px;
		height: 500px;
		position: absolute;top: -200px;
	}
</style>
