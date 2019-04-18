<template>
	<div style="display: flex;align-items: center;justify-content: center;font-size: 4.5rem;width: 100%;height: 100%;color: #F0B74A;">
		<span>答题即将开始，请各位选手做好准备</span>
		<!-- <video @click="videoPlay" class="index_video" id="video_content" style="object-fit:fill" webkit-playsinline='true' playsinline="true" x5-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-ignore-metadata="true" x5-video-orientation="landscape" preload="preload">
			<source src="http://192.168.1.100:9001/uploads/video/06.MP4" type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'>
		</video> -->
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
