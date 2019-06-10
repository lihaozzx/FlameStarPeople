<template>

    <div class="role_root">
        <el-form label-width="200px" :rules="rules" ref="ruleForm" :model="ruleForm">
            <el-form-item label="用户名" prop="username" autocomplete="off">
                <el-input v-model="ruleForm.username" class="input_short" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" autocomplete="off">
                <el-input v-model="ruleForm.pass" class="input_short" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
                <el-input v-model="ruleForm.checkpass" class="input_short" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                console.log(value);

                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.checkpass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    pass: '',
                    checkpass: '',
                },
                rules: {
                    username: [{
                        validator: validateName,
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }]
                }
            }
        }
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