<template>
	<div class="TextScroll">
		<transition-group tag="ul" :name="scrollType">
			<li v-for="(item,index) in datalist" :key='index' v-show="index == count">
				<span>{{item}}</span>
			</li>
		</transition-group>
	</div>
</template>
<script>
	export default {
		name: 'TextScroll',
		props: {
			scrollType: {
				type: String,
				default: 'scroll-up'
			}
		},
		data() {
			return {
				count: 0, // 当前索引
				intervalId: null, // 定时器ID
				playTime: 2000, // 定时器执行间隔
				datalist:['','']
			}
		},
		methods: {
			getText() {
				let len = this.datalist.length; // 获取数组长度
				if (len == 0) {
					return // 当数组为空时，直接返回
				}
				if (this.count == len - 1) { // 当前为最后一个时
					this.count = 0 // 从第一个开始
				} else {
					this.count++ // 自增
				}
			}
		},
		created() {
			// 根据不同的动画效果，指定不同的动画时间，可配合底部的css样式修改
			switch (this.scrollType) {
				case 'scroll-up':
					this.playTime = 2000
					break;
				case 'scroll-up-linear':
					this.playTime = 1000
					break;
				case 'scroll-left':
					this.playTime = 2000
					break;
				case 'scroll-left-linear':
					this.playTime = 4000
					break;
				default:
					this.playTime = 2000
					break;
			}
			this.intervalId = setInterval(() => { // 定义定时器
				this.getText();
			}, this.playTime)
			// 通知公告
			this.$http.post('/vote/basisInfo', this.$qs.stringify({
				id: 6
			})).then(res => {
				if (res) {
					this.datalist.unshift(...res.data.content);
				}
			});
		},
		destroyed() {
			clearInterval(this.intervalId) // 清除定时器
		}
	}
</script>

<style scoped>
	.TextScroll {
		width: 100%;
		position: relative;
		top:-2rem
	}

	.TextScroll ul {
		position: relative;
		width: 100%;
		height: 2rem;
		/* overflow: hidden; */
	}

	.TextScroll li {
		width: 100%;
		height: 2rem;
		list-style:none;
		/* overflow: hidden; */
		position: absolute;
	}

	.TextScroll li span {
		font-size: 1.6rem;
		/*px*/
		margin: 0;
		overflow: hidden;
		color: #FCD363;
		/* text-overflow: ellipsis; */
		white-space: nowrap;
	}

	/* 向上滚动动画 */
	.scroll-up-enter-active,
	.scroll-up-leave-active {
		transition: all .5s ease;
	}

	.scroll-up-enter {
		transform: translate3d(0, 100%, 0);
	}

	.scroll-up-leave-to {
		transform: translate3d(0, -100%, 0);
	}

	/* 向上匀速滚动动画 */
	.scroll-up-linear-enter-active,
	.scroll-up-linear-leave-active {
		transition: all 1s linear;
		/*此时间必须和 playTime 保持一致*/
	}

	.scroll-up-linear-enter {
		transform: translate3d(0, 100%, 0);
	}

	.scroll-up-linear-leave-to {
		transform: translate3d(0, -100%, 0);
	}

	/* 向左滚动动画 */
	.scroll-left-enter-active,
	.scroll-left-leave-active {
		transition: all 1s ease;
	}

	.scroll-left-enter {
		transform: translate3d(100%, 0, 0);
	}

	.scroll-left-leave-to {
		transform: translate3d(-100%, 0, 0);
	}

	/* 向左匀速滚动动画 */
	.scroll-left-linear-enter-active,
	.scroll-left-linear-leave-active {
		transition: all 4s linear;
		/*此时间必须和 playTime 保持一致*/
	}

	.scroll-left-linear-enter {
		transform: translate3d(100%, 0, 0);
	}

	.scroll-left-linear-leave-to {
		transform: translate3d(-100%, 0, 0);
	}
</style>
