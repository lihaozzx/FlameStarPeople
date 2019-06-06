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
        roleList: any = [];
        name: string = '';
        checkAll: any = false;
        checkedAuths: any = [];
        isIndeterminate: any = false;
        authOptions: any = [];
        
        @Prop()
        empty!: boolean;
        @Prop()
        nowid!: string;
        @Prop({
            default: ''
        })
        nowname!: string;

        //清空
        @Watch('empty')
        onEmptyInfo(n: boolean) {
            if (n) {
                this.name = '';
                this.checkAll = false;
                this.isIndeterminate = false;
                this.checkedAuths = [];
                this.enptyed();
            }
        }
        @Emit('emptyed')
        enptyed() {}
        // 名称
        @Emit('changedName')
        changeName(val: string) {}
        @Watch('name')
        onNameChange(n: string): number {
            let timer = null;
            if (timer != null) {
                clearTimeout(timer);
            }
            return timer = setTimeout(() => {
                this.changeName(n);
            }, 300);
        }
        @Watch('nowname')
        onNowNameChange(n: string) {
            this.name = n;
        }
        // 权限数组
        @Emit('changedAuths')
        changeAuth(val: any) {}

        @Watch('checkedAuths')
        onAuthChange(n: any): void {
            this.changeAuth(n);
        }
        //id
        @Watch('nowid')
        onIdChange() {
            this.getList();
        }

        created() {
            this.getList();
            this.name = this.nowname;
        }
        getList() {
            new $api().editRole({
                id: this.nowid
            }).then((res: any) => {
                this.roleList = res.data;
                this.authOptions = [];
                res.data.forEach((e: any) => {
                    e.auth.forEach((s: any) => {
                        this.authOptions.push(s.id);
                        if (s.check === 1) {
                            this.checkedAuths.push(s.id)
                        }
                    });
                });
            })
        }
        handleCheckAllChange(val: boolean) {
            this.checkedAuths = val ? this.authOptions : [];
            this.isIndeterminate = false;
        }
        authHandleCheckedCitiesChange(val: any) {
            let checkedCount = val.length;
            this.checkAll = checkedCount === this.authOptions.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.authOptions.length;
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