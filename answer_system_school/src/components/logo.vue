<template>
	<div class="div_bottom">
		<div class="ts20 clrWhite div_biaoyu">
			<span>"立德树人工程"</span>
		</div>
		<div class="logoImg">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.div_bottom {
		display: flex;
		width: 100%;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px 28px 0 28px;
	}

	.div_biaoyu {
		height: 4.0625rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.logoImg {
		background-image:url(../assets/footer-logo@3x.png);
		background-size:cover;
		background-position:5.125rem;
		background-repeat:no-repeat;
		width: 164px;
		height: 65px;
	}

</style>
