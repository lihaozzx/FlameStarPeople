<template>
	<div>
		<img :src="jiashu" class="himg">
		<div class="writeLetter">
			<div class="body">
				<div>
					<p>选手编号</p>
					<input type="text" placeholder="请输入选手编号" disabled v-model="stuInfo.id">
				</div>
				<div>
					<p>选手姓名</p>
					<input type="text" placeholder="请输入选手姓名" disabled v-model="stuInfo.name">
				</div>
				<div>
					<p>家书内容</p>
					<textarea type="text" placeholder="请输入家书内容例:亲爱的孩子:爸爸/妈妈希望您记住:“纸上得来终觉浅，绝知此事要躬行”，做一个“知行合一” 的君子。学有所成，实现你的人生价值!" v-model="jiashuc" ></textarea>
				</div>
			</div>
			<div class="bottom_div">
				<div class="subLtr" @click="subLetter">
					<span>提交</span>
				</div>
				<span class="back" @click="goback">返回选手页面</span>
			</div>
		</div>
		<el-dialog :title="suc?'成功':'失败'" :visible.sync="showdialog" width="80%" :modal-append-to-body='false'>
			<span>{{suc?'家书上传成功,请等待审核':'家书上传失败'}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="goback">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="showerr" width="80%" :modal-append-to-body='false'>
			<span>请给孩子的家书多写一点内容</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="showerr = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import jiashu from '@/assets/jiashu.png'
	export default {
		created(){
			this.stuInfo = this.$route.params
		},
		data() {
			return {
				jiashu,
				stuInfo:null,
				jiashuc:'',
				showdialog:false,
				showerr:false,
				suc:true,
				subing:false
			};
		},
		methods: {
			// 组件的方法
			goback(){
				if(this.suc){
					this.$router.go(-1);
				}else{
					this.showdialog = false;
				}
			},
			subLetter(){
				if(this.subing){
					return;
				}
				if(this.jiashuc.length<60){
					this.showerr = true;
					return;
				}
				this.subing=true;
				this.$http.post('/vote/addletter',this.$qs.stringify({
					pid:this.stuInfo.id,
					openid: this.$store.getters.userInfo.openid,
					head: this.$store.getters.userInfo.headimgurl,
					tname: this.$store.getters.userInfo.nickname,
					content:this.jiashuc,
					// shenf: this.guanxi[this.chguanxi],
				})).then(res=>{
					if(res){
						this.showdialog = true;
						this.suc = true;
					}else{
						this.showdialog = true;
						this.suc = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.himg {
		width: 100%;
		margin: 17px 0;
	}

	.writeLetter {
		width: 94%;
		margin-left: 3%;
		margin-bottom: 50px;
		background-image: url(../assets/pub-bg-1.png), url(../assets/pub-bg-3.png);
		background-position: top, bottom;
		background-repeat: no-repeat, no-repeat;
		background-size: 100%;
		position: relative;
		padding: 8px 0 145px 0;
		position: relative;

		.body {
			padding: 0px 10px;
			background-image: url(../assets/pub-bg-2.png);
			background-size: 100%;

			div {
				width: 100%;
				
				p{
					font-size: 1.6rem;
					color: #A11F1D;
					font-weight: 900;
				}

				input {
					width: 100%;
					box-sizing: border-box;
					border-radius: 5px;
					border: 2px solid rgba(160, 28, 25, 1);
					font-size: 1.4rem;
					line-height: 2.8rem;
					padding-left: 5px;
				}

				textarea {
					width: 100%;
					height: 250px;
					box-sizing: border-box;
					border-radius: 5px;
					border: 2px solid rgba(160, 28, 25, 1);
					font-size: 1.4rem;
					line-height: 2.8rem;
					padding-left: 5px;
					resize: none;
				}

				textarea::-webkit-scrollbar {
					width: 3px;
					height: 100%;
				}

				textarea::-webkit-scrollbar-thumb {
					border-radius: 10px;
					background: red;
					border: 0px solid #fff;
				}

			}
		}

		.bottom_div {
			width: 100%;
			height: 140px;
			position: absolute;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			padding: 20px 15px;

			.subLtr {
				width: 100%;
				height: 45px;
				border-radius: 10px;
				background-color: #F9F1CA;
				color: #A01C19;
				font-size: 1.8rem;
				font-weight: 900;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}

			.back {
				color: #A11F1D;
			}
		}
	}
</style>
