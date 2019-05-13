<template>
	<div class="root2 ts16">
		<transition name="popT">
			<div :style="'height:'+height+'px'" class="pop" v-if="isShow"></div>
		</transition>
		<transition name="alterT">
			<div class="alter" v-if="isShow">
				<span>提示</span>
				<img src="../assets/success.png" v-if="success">
				<span>{{title==''?'注册成功':title}}</span>
				<div class="btn_ok" @click="close"><span>确定</span></div>
				<img src="../assets/close.png" style="height: 0.9375rem;width: 0.9375rem;position: absolute;top: 1.25rem;right: 1.25rem;"
				 @click="close">
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			success: {
				type: Boolean,
				default: true
			},
			title: {
				type: String
			},
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				height: innerHeight
			};
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	/* 动画 */
	.popT-enter-active,
	.popT-leave-active,.alterT-enter-active,
	.alterT-leave-active {
		transition: all .5s;
	}

	.popT-enter,
	.popT-leave-to {
		opacity: 0;
	}

	.alterT-enter,
	.alterT-leave-to {
		transform: translateY(80%);
		opacity: 0;
	}

	/* 样式 */
	.pop {
		background-color: rgba(0, 0, 0, 0.4);
		width: 100%;
	}

	.root2 {
		width: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
	}

	.root2>.alter {
		width: 18.75rem;
		height: 12.5rem;
		border-radius: 0.3125rem;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		box-sizing: border-box;
		padding: 0.875rem 0 0.875rem 0;
		position: absolute;
	}

	.root2>.alter>img {
		width: 1.5625rem;
		height: 1.125rem;
	}

	.btn_ok {
		width: 17.5rem;
		height: 2.5rem;
		border-radius: 0.3125rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: #051124;
	}
</style>
