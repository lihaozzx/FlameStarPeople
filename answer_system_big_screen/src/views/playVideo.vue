<template>
	<div>
		<video @click="videoPlay" class="index_video" id="video_content" style="object-fit:fill" webkit-playsinline='true'
		 playsinline="true" x5-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5"
		 x5-video-player-fullscreen="true" x5-video-ignore-metadata="true" x5-video-orientation="landscape" preload="preload">
			<source :src="dizhi" type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'>
		</video>
	</div>
</template>

<script>
	export default {
		created() {
			this.dizhi = this.$route.params.dizhi
		},
		data() {
			return {
				dizhi: ''
			};
		},
		methods: {
			// 组件的方法
			videoPlay() {

			}
		}
	}
</script>

<style>

</style>
