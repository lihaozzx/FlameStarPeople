<template>
    <div class="role_root">
        <el-form label-width="200px" :rules="rules" ref="ruleForm">
            <el-form-item label="用户名" prop="username" autocomplete="off">
                <el-input v-model="username" class="input_short" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" autocomplete="off">
                <el-input v-model="pass" class="input_short" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
                <el-input v-model="checkpass" class="input_short" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
        Watch,
        Prop,
        Emit
    } from 'vue-property-decorator';
    import $api from '@/plugins/request';

    @Component
    export default class choseRole extends Vue {
        username: string = '';
        pass: string = '';
        checkpass: string = '';
        rules: any = {
            username: [{
                validator: this.validateName,
                trigger: 'blur'
            }],
            pass: [{
                validator: this.validatePass,
                trigger: 'blur'
            }],
            checkPass: [{
                validator: this.validatePass2,
                trigger: 'blur'
            }]
        }

        validateName(rule:any, value:any, callback:any) {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                callback();
            }
        };
        validatePass(rule:any, value:any, callback:any) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.checkpass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        validatePass2(rule:any, value:any, callback:any) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
    }
</script>
<style lang="scss">
    .role_root {
        height: 500px;
        overflow: auto;

        .input_short {
            width: 240px;
        }
    }
</style>