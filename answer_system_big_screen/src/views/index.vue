<template>
	<div>
		<jz>
			<div class="content">
				<div class="c1">
					<div :class="perNum.length<10?'perInfo1':perNum.length<17?'perInfo2':perNum.length<26?'perInfo3':perNum.length<37?'perInfo4':perNum.length<50?'perInfo5':'perInfo6' " v-for="(p,k) in perNum" :key="k">
						<div class="infos">
							<span>{{p.name}}</span>
							<div class="head" v-if="perNum.length<26" :style="'background-image: url('+p.img+');'"></div>
							<span>名称</span>
						</div>
					</div>
				</div>
				<div class="c1">
					<div :class="perNum.length<10?'perInfo1':perNum.length<17?'perInfo2':perNum.length<26?'perInfo3':perNum.length<37?'perInfo4':perNum.length<50?'perInfo5':'perInfo6' " v-for="(p,k) in perNum" :key="k">
						<div class="infos">
							<span>{{p.name}}</span>
							<div class="head" v-if="perNum.length<26" :style="'background-image: url('+p.img+');'"></div>
							<span>名称</span>
						</div>
					</div>
				</div>
			</div>
		</jz>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				perNum: [1, 2, 3, 4,{name:'asd',img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553944090284&di=06cb60eeb9de011111d23a63beb51bf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806181034_WNiP3.jpeg'}]
			};
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
	}

	.c1 {
		width: 50%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.gName {
		color: antiquewhite;
		font-size: 2.25rem;
		display: flex;
		justify-content: center;
		margin-bottom: 0.3125rem;
	}

	.infos {
		border: 1px solid #F0B74A;
		width: 100%;
		height: 100%;
		color: #F0B74A;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		padding: 1%;
	}

	.perInfo1 {
		width: calc(88% / 3);
		height: calc(93% / 3);
		margin: 1% 2% 1% 2%;
		font-size: 1.875rem;
	}

	.perInfo2 {
		width: calc(88% / 4);
		height: calc(92% / 4);
		margin: 1% 1.5% 1% 1.5%;
		font-size: 1.3rem;
	}

	.perInfo3 {
		width: calc(85% / 5);
		height: calc(90% / 5);
		margin: 1% 1.5% 1% 1.5%;
		font-size: 1.1rem;
	}

	.perInfo4 {
		width: calc(85.6% / 6);
		height: calc(88% / 6);
		margin: 1% 1.2% 1% 1.2%;
		font-size: 0.8rem;
	}

	.perInfo5 {
		width: calc(91.6% / 7);
		height: calc(94.4% / 7);
		margin: 0.4% 0.6% 0.4% 0.6%;
		font-size: 1.5rem;
	}

	.perInfo6 {
		width: calc(92% / 8);
		height: calc(95.2% / 8);
		margin: 0.3% 0.5% 0.3% 0.5%;
		font-size: 1.3rem;
	}
	.head{
		width: 35%;
		background-size: cover;
		padding-bottom: 35%;
		border-radius: 100%;
		border: 2px solid #F0B74A;
	}
</style>
