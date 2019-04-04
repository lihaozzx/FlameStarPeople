<template>
	<div class="root">
		<div class="infoBody">
			<div v-for="(s,k) in sessionInfo" :key="k" class="one_info">
				<div class="div_text">
					<span class="ts18">{{s.ffg}}</span>
					<span class="ts12 inbot">授权码: <span class="cf0">{{s.warrant}}</span></span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">选题视频：</span>
						<span class="a26">第二套题库。avi</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<div class="img_video">

				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">当前考卷：</span>
						<span class="a26">第二套题库。avi</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">答题人员：</span>
						<span class="a26">？人</span>
					</span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">比赛日期：</span>
						<span class="a26">{{s.date}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<div class="div_text">
					<span class="ts14">
						<span class="o26">当前状态：</span>
						<span class="a26">{{s.status}}</span>
					</span>
					<span class="ts12 inbot b18">修改</span>
				</div>
				<div class="div_addPer">
					<span class="ts12 b18">添加人员</span>
					<i class="el-icon-arrow-down"></i>
				</div>
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
				sessionInfo: [{
					ffg: '场次',
					video: '视频地址',
					date: '日期',
					status: '状态',
					warrant: '授权码',
					eid: '对应考题'
				}],
				pageInfo: {
					totalCount: 0,
					size: 1,
					nowPage: 1
				}
			};
		},
		created() {
			this.$http.get('/admin/games', {
				params: {
					token: this.$store.getters.token,
				}
			}).then(res => {
				console.log(res);
			})
		},
		methods: {
			// 组件的方法
		}
	}
</script>

<style>
	.infoBody {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding-bottom: 50px;
	}

	.one_info {
		width: 30%;
		height: 80%;
		background-color: #FFFFFF;
		border-radius: 20px;
		box-shadow: 0 0 0.75rem 0.2rem rgba(0, 0, 0, 0.2);
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

	.img_video {
		width: 100%;
		height: 150px;
		border-radius: 20px;
		background-color: #0000FE;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img_video:hover {
		transform: scale(1.05, 1.05);
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
