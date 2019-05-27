<template>
	<div>
		<img :src="this.type==0?r1:this.type==1?r2:r3" style="width: 100%;z-index: 99;height: 100%;">
	</div>
</template>

<script>
	import r1 from '@/assets/rule.png'
	import r2 from '@/assets/rule2.png'
	import r3 from '@/assets/rule3.png'
	export default {
		computed: {
			type() {
				return this.$store.state.ruletype
			}
		},
		data(){
			return{
				r1,r2,r3
			}
		}
	}
</script>

<style scoped>
</style>
