<template>
	<div>
		<jz>
			<div @click="next">点击下一题</div>
		</jz>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			ans() {
				return this.$store.getters.ans
			}
		},
		watch: {
			ans(n) {
				this.$store.commit('changeTitle', this.numToStr(this.ans));
				document.title = this.numToStr(n);
			}
		},
		created() {
			console.log(this.ans);
			this.$store.commit('changeTitle', this.numToStr(this.ans));
			document.title = this.numToStr(this.ans);
		},
		methods: {
			// 组件的方法
			next() {
				this.$store.commit('nextAns')
			},
			numToStr(e) {
				switch (e) {
					case 0:
						return '未开始'
						break;
					case 1:
						return '第一题'
						break;
					case 2:
						return '第二题'
						break;
					case 3:
						return '第三题'
						break;
					case 4:
						return '第四题'
						break;
					case 5:
						return '第五题'
						break;
					case 6:
						return '第六题'
						break;
					case 7:
						return '第七题'
						break;
					case 8:
						return '第八题'
						break;
					case 9:
						return '第九题'
						break;
					case 10:
						return '第十题'
						break;
					case 11:
						return '第十一题'
						break;
					case 12:
						return '第十二题'
						break;
					case 13:
						return '第十三题'
						break;
					case 14:
						return '第十四题'
						break;
					case 15:
						return '第十五题'
						break;
					case 16:
						return '第十六题'
						break;
					case 17:
						return '第十七题'
						break;
					case 18:
						return '第十八题'
						break;
					case 19:
						return '第十九题'
						break;
					case 20:
						return '第二十题'
						break;
					case 21:
						return '第二十一题'
						break;
					case 22:
						return '第二十二题'
						break;
					case 23:
						return '第二十三题'
						break;
					case 24:
						return '第二十四题'
						break;
					case 25:
						return '第二十五题'
						break;
					case 26:
						return '第二十六题'
						break;
					case 27:
						return '第二十七题'
						break;
					case 28:
						return '第二十八题'
						break;
					case 29:
						return '第二十九题'
						break;
					case 30:
						return '第三十题'
						break;
					default:
						return '答题结束'
						break;
				}
			}
		}
	}
</script>

<style>

</style>
