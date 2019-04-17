<template>
	<div>
		<jz>
			<div class="paimin">
				<div class="one_paimin" v-for="(k,s) in info" :key='k.id'>
					<div class="info">
						<div class="img_title_rank" :style="'background-image: url('+k.img+');'"></div>
						<span>{{s+1}}</span>
						<span>{{k.name}}</span>
					</div>
				</div>
			</div>
		</jz>
	</div>
</template>

<script>
	export default {
		created() {
			this.info = this.$route.params.paimin
		},
		data() {
			return {
				info: [{
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553944090284&di=06cb60eeb9de011111d23a63beb51bf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'
				}]
			};
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style scoped>
	.paimin {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 2.2% 2.5%;
		display: flex;
		flex-wrap: wrap;
	}

	.one_paimin {
		width: 9%;
		height: 40%;
		margin: 0.5% 0.5%;
	}

	.info {
		width: 100%;
		height: 100%;
		border: 1px solid #F0B74A;
		border-radius: 0.3125rem;
		font-size: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #F0B74A;
	}

	.img_title_rank {
		width: 70%;
		background-size: cover;
		padding-bottom: 70%;
		margin-top: 10%;
		border-radius: 100%;
	}
</style>
