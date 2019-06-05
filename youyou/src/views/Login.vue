<template>
	<div class="center">
		<div class="form_box">
			<el-input v-model="username" placeholder="用户名"></el-input>
			<el-input v-model="pas" placeholder="密码 " show-password></el-input>
			<el-checkbox v-model="checked">记住密码</el-checkbox><br>
			<el-button class="btn" @click="login">登录</el-button>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		Component,
		Vue,
	} from 'vue-property-decorator';
	import {
		Mutation
	} from 'vuex-class';
	import $api from '@/plugins/request';

	@Component
	export default class Login extends Vue {
		username: string = '';
		pas: string = '';
		checked: boolean = false;
		@Mutation('setToken') setToken: any;

		login() {
			new $api().login({
				name: this.username,
				password: this.pas
			}).then((res: any) => {
				this.setToken(res.data.token);
				this.$router.push({
					name: 'index'
				});
			})
		}
	}
</script>

<style scoped>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form_box {
		width: 500px;
		height: 600px;
		border: solid 1px black;
		padding: 20px 50px;
	}

	.btn {
		margin-top: 50px;
		width: 300px;
	}
</style>