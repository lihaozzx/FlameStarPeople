<template>
    <div class="role_root">
        <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="角色名称">
                <el-input v-model="form.name" class="input_short"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                </el-checkbox>
            </el-form-item>
            <el-checkbox-group v-model="checkedAuths" @change="authHandleCheckedCitiesChange">
                <el-form-item v-for="r in roleList" :label="r.name" :key="r.id">
                    <el-checkbox :label="sr.name" v-for="sr in r.auth" :key="sr.id">{{sr.name}}</el-checkbox>
                </el-form-item>
            </el-checkbox-group>
        </el-form>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
    } from 'vue-property-decorator';
    import $api from '@/plugins/request';

    @Component
    export default class choseRole extends Vue {
        roleList: any = [];
        form: any = {
            name: ''
        }
        checkAll: any = false;
        checkedAuths: any = [];
        isIndeterminate: any = false;
        authOptions:any = []

        created() {
            new $api().editRole().then((res: any) => {
                this.roleList = res.data;
                res.data.forEach((e:any) => {
                    e.auth.forEach((s:any) => {
                        this.checkedAuths.push(s.id);
                    });
                    
                });
            })
        }
        handleCheckAllChange(val:boolean) {
            console.log(this.authOptions);
            
            this.checkedAuths = val ? this.authOptions : [];
            this.isIndeterminate = false;
        }
        authHandleCheckedCitiesChange() {
            console.log(3);

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