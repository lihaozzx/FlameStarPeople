<template>
	<div>
		<div class="two_div">
			<div class="paibian_div">
			</div>
			<div class="bangdan">
				<img class="head" src="../assets/pub-bg-1.png">
				<div class="body">
					<div class="ninaji" style="margin-bottom: 20px;">
						<div class="nian" v-for="(k,i) in nianjibas" :key="i" :class="ch==i?'active':'nochose'" @click="changeShownianji(i)">
							<span>{{k}}</span>
						</div>
					</div>
					<div class="stuInfo" v-for="(k,i) in stuInfo" :key="k.id" :class="i==stuInfo.length-1?'stuInfoLast':''">
						<div class="stu_head_div">
							<div class="stu_head"><img :src="k.img" class="img1"></div>
						</div>
						<div class="stu_info">
							<span class="s1">{{k.name}}</span>
							<span class="s2">{{k.school}}</span>
							<div class="info">
								<div>
									<span>上榜值：{{k.num}}</span>
								</div>
								<div>
									<span>赛区排名：{{k.rank}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<img class="foot" src="../assets/pub-bg-3.png">
			</div>
		</div>
		<div class="filter_div" @click="searchFilter"><span>按条件筛选></span></div>
		<div style="height: 20px;"></div>
		<transition name="fade">
			<div v-show="flter" class="filter_rel_div">
				<img :src="close" class="close" @click="closeFliter">
				<input type="text" class="sein" v-model="name" placeholder="请输入学生姓名">
				<input type="text" class="sein" v-model="sname" placeholder="请输入学校名称">
				<div class="search_btn" @click="searchNow">
					<span>立即筛选</span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import bang from '@/assets/zhuangyuanbang.png'
	import niao from '@/assets/banner-bg-big-bird.png'
	import yun from '@/assets/cloud.png'
	import paibian from '@/assets/timg.png'
	import paimin from '@/assets/rank.png'
	import zhuangyuan from '@/assets/zhuangyuan.png'
	import bangyan from '@/assets/bangyan.png'
	import tanhua from '@/assets/tanhua.png'
	import jinshi from '@/assets/jinshi.png'
	import guize from '@/assets/rule-hd.png'
	import fenmian from '@/assets/video_img.jpg'
	import close from '@/assets/close.png'

	export default {
		created(){
			
		},
		data() {
			return {
				bang,
				niao,
				yun,
				paibian,
				paimin,
				zhuangyuan,
				bangyan,
				tanhua,
				jinshi,
				guize,
				fenmian,
				close,
				nianjibas: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
				ch: 0,
				flter: false,
				name:'',
				sname:'',
				stuInfo: [{
					id: 0,
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555921915934&di=95135c035f04b12d5a86cc79bee7116b&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201206%2F12%2F20120612161649_PiiPx.thumb.700_0.jpeg',
					school: '成都七中'
				}, {
					id: 1,
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555921915934&di=23250b43b8be84e7a5a57411c35622f6&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Fent%2Fm%2Ff%2F2011-05-12%2FU3987P28T3D3305912F326DT20110512100709.jpg',
					school: '成都七中'
				}, {
					id: 2,
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555921915933&di=f54ae7343b5be305055a7634d435a65e&imgtype=0&src=http%3A%2F%2Fwww.people.com.cn%2Fmediafile%2Fpic%2F20150427%2F24%2F15504386549463392428.jpg',
					school: '成都七中'
				}, {
					id: 3,
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555921915991&di=117b0c3086be20bfb52265df5c3af688&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1411%2F18%2Fc14%2F41049739_1416307146946_mthumb.jpg',
					school: '成都七中'
				}, {
					id: 4,
					name: '张三',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555921915991&di=117b0c3086be20bfb52265df5c3af688&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1411%2F18%2Fc14%2F41049739_1416307146946_mthumb.jpg',
					school: '成都七中'
				}, {
					id: 5,
					name: '张三',
					school: '成都七中'
				}, {
					id: 6,
					name: '张三',
					school: '成都七中'
				}]
			};
		},
		methods: {
			// 组件的方法
			changeShownianji(k) {
				this.ch = k
			},
			searchFilter() {
				this.flter = true;
			},
			closeFliter(){
				this.flter = false;
			},
			searchNow(){
				this.flter = false;
				this.getStudent();
			},
			getStudent(){
				this.$http.post('/vote/allplayers',this.$qs.stringify({
					name:this.name,
					sname:this.sname
				}))
			}
		}
	}
</script>

<style lang="scss">
	.filter_div {
		position: fixed;
		bottom: 50px;
		left: calc((100% - 132px) / 2);
		width: 132px;
		height: 30px;
		color: #FDD26B;
		background-color: #AB1F1E;
		font-size: 14px;
		color: rgba(252, 211, 99, 1);
		z-index: 999999;
		border: 2px solid rgba(253, 210, 107, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.filter_rel_div{
		width: 100%;
		height: 350px;
		background-color: white;
		border-radius: 20px 20px 0 0;
		position: fixed;
		bottom: 0;
		z-index: 9999999;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 100px 50px;
		
		.close{
			width: 20px;
			height: 20px;
			position: absolute;
			right: 20px;
			top: 20px;
		}
		
		.search_btn{
			width: 86%;
			height:50px;
			background-color: #F9F1CA;
			box-shadow:0px 3px 6px rgba(0,0,0,0.16);
			border-radius:10px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			font-weight: 900;
			color:#A01C19;
			position: absolute;
			bottom: 10px;
			left: 7%;
			cursor: pointer;
		}
		
		.sein{
			font-size: 30px;
			border: none;
			outline: none; 
			border-bottom: 1px solid #8c8c8c;
			color: #8c8c8c;
			padding: 5px;
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all .5s;
	}

	.fade-enter,
	.fade-leave-to {
		transform: translateY(100%);
		;
	}
</style>
