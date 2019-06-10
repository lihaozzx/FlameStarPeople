<template>
    <div class="role_root">
        <el-form label-width="200px">
            <el-form-item label="角色名称">
                <el-input v-model="nowname" class="input_short" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                </el-checkbox>
            </el-form-item>
            <el-checkbox-group v-model="checkedAuths" @change="authHandleCheckedCitiesChange">
                <el-form-item v-for="r in roleList" :label="r.name" :key="r.id">
                    <el-checkbox :label="sr.id" v-for="sr in r.auth" :key="sr.id">{{sr.name}}</el-checkbox>
                </el-form-item>
            </el-checkbox-group>
        </el-form>
    </div>
</template>
<script>
    export default {
        created() {
            this.getList();
            this.name = this.nowname;
        },
        props: {
            empty:{
                default:'',
            },
            nowid:{
                default:'',
            },
            nowname:{
                default:'',
            }
        },
        data() {
            return {
                roleList: [],
                name: '',
                checkAll: false,
                checkedAuths: [],
                isIndeterminate: false,
                authOptions: [],
            }
        },
        watch: {
            empty(n) {
                if (n) {
                    this.name = '';
                    this.checkAll = false;
                    this.isIndeterminate = false;
                    this.checkedAuths = [];
                    this.$emit('emptyed');
                }
            },
            name(n) {
                let timer = null;
                if (timer != null) {
                    clearTimeout(timer);
                }
                return timer = setTimeout(() => {
                    this.$emit('changedName', n)
                    this.changeName(n);
                }, 300);
            },
            nowname(n) {
                this.name = n;
            },
            checkedAuths(n) {
                this.$emit('changedAuths', n)
            },
            nowid() {
                this.getList();
            },
        },
        methods: {
            getList() {
                this.$api.editRole({
                    id: this.nowid
                }).then((res) => {
                    this.roleList = res.data;
                    this.authOptions = [];
                    res.data.forEach((e) => {
                        e.auth.forEach((s) => {
                            this.authOptions.push(s.id);
                            if (s.check === 1) {
                                this.checkedAuths.push(s.id)
                            }
                        });
                    });
                })
            },
            handleCheckAllChange(val) {
                this.checkedAuths = val ? this.authOptions : [];
                this.isIndeterminate = false;
            },
            authHandleCheckedCitiesChange(val) {
                let checkedCount = val.length;
                this.checkAll = checkedCount === this.authOptions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.authOptions.length;
            }
        },
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