<template>
	<div class="div_download">
		<div class="stuInfo" :style="'height='+height*70%+'px'">
			<div v-for="(d,k) in donwInfo" :key="k" @click="donw(d.url)">
				<span>{{d.name}}</span>
			</div>
		</div>
		<div class="">
			<logo></logo>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				height: innerHeight,
				donwInfo: []
			};
		},
		created: function() {
			this.$http.get('/user/download?token=' + this.getCookie('token')).then(res => {
				if (res.data.status == 0) {
					this.donwInfo = res.data.data;
				}
			})
		},
		methods: {
			donw(k){
				let urls = "http://www.nzjykj.com"+k;
				location.href = urls;
			},
			//获取cookie
			getCookie: function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1);
					if (c.indexOf(name) != -1) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			}
		}
	}
</script>

<style>
	.div_download {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stuInfo {
		width: 80%;
		overflow-y: auto;
		margin-top: 9.375rem;
		margin-bottom: 3.125rem;
	}

	.stuInfo>div {
		border-radius: 0.3125rem;
		margin-bottom: 1.25rem;
		width: 100%;
		height: 2.5rem;
		background-color: #B81E24;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
