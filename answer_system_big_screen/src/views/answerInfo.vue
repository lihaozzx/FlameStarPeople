<template>
	<div>
		<jz>
			<div class="content">
				<div class="kuang">
					<div class="img_title_ans" :style="'background-image: url('+info[0].img+');'"></div>
					<span style="font-size: 4rem;">第一名</span>
					<span>{{info[0].num}} | {{info[0].name}}</span>
					<span>{{info[0].time}}</span>
				</div>
				<div class="kuang">
					<div class="img_title_ans" :style="'background-image: url('+info[1].img+');'"></div>
					<span style="font-size: 4rem;">第二名</span>
					<span>{{info[1].num}} | {{info[1].name}}</span>
					<span>{{info[1].time}}</span>
				</div><div class="kuang">
					<div class="img_title_ans" :style="'background-image: url('+info[2].img+');'"></div>
					<span style="font-size: 4rem;">第三名</span>
					<span>{{info[2].num}} | {{info[2].name}}</span>
					<span>{{info[2].time}}</span>
				</div>
			</div>
		</jz>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info:[{
					num:'01',
					name:'阿萨德',
					time:'1分21',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553944090284&di=06cb60eeb9de011111d23a63beb51bf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'
				},{
					num:'02',
					name:'版本',
					time:'1分21',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553944090284&di=06cb60eeb9de011111d23a63beb51bf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'
				},{
					num:'023',
					name:'气味儿',
					time:'1分21',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553944090284&di=06cb60eeb9de011111d23a63beb51bf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'
				}]
			};
		},
		created() {

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
		justify-content: space-around;
	}

	.kuang {
		width: 21.125rem;
		height: 100%;
		border: 2px solid #F0B74A;
		border-radius: 1.25rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		color: #F0B74A;
		font-size: 3rem;
	}
	
	.img_title_ans{
		width: 67%;
		background-size: cover;
		padding-bottom: 67%;
		margin-top: 10%;
		border-radius: 100%;
	}
</style>
