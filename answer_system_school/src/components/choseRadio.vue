<template>
	<div class="root2 ts16">
		<transition name="popT">
			<div :style="'height:'+height+'px'" class="pop" v-if="isShow" @click="close"></div>
		</transition>
		<transition name="alterT">
			<div class="alter" v-if="isShow">
				<el-select v-model="value" placeholder="请选择" @change="chosed">
					<el-option v-for="item in outOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			parameter: {
				type: Array
			},
			isShow: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			outOptions: function() {
				let out = []
				this.parameter.forEach(p => {
					out.push({
						value: p.aid,
						label: p.name
					})
				})
				return out
			}
		},
		data() {
			return {
				height: innerHeight,
				value: ''
			};
		},
		methods: {
			close() {
				this.$emit('close')
			},
			chosed(k) {
				this.$emit('chosed', k);
				this.value = '';
			}
		}
	}
</script>

<style scoped>
	/* 动画 */
	.popT-enter-active,
	.popT-leave-active,
	.alterT-enter-active,
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
	}

	.root2>.alter {
		width: 18.75rem;
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

	.btn_ok {
		width: 10rem;
		height: 2.5rem;
		margin-top: 3.125rem;
		border-radius: 0.3125rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: #051124;
	}
</style>
