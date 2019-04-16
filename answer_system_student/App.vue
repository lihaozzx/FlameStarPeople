<script>
	export default {
		onLaunch: function() {
			uni.connectSocket({
				url: 'ws://192.168.1.100:7272'
			});
			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketError(function(res) {
				console.log('WebSocket连接打开失败，请检查！');
				uni.connectSocket({
					url: 'ws://192.168.1.100:7272'
				});
			});
			uni.onSocketMessage(res => {
				let e = JSON.parse(res.data);
				if (e.type == 'login') {
					console.log('已登录');
				}
				if (e.type == 'say') {
					this.$store.commit('onMessage', e.content)
				}
			});
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	.fs26 {
		font-size: 26upx;
	}

	.fs28 {
		font-size: 28upx;
	}

	.fs30 {
		font-size: 30upx;
	}

	.ts36 {
		font-size: 36upx;
	}

	.c8c {
		color: #8C8C8C;
	}
</style>
