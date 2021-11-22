<template>
    <div class="button-container">
        <el-button v-if="enableEdit" slot="reference" type="primary" title="编辑" icon="el-icon-edit-outline" size="mini"
                   @click="toEdit(data)"/>
        <el-button v-if="enableSettings" slot="reference" type="primary" title="设置" icon="el-icon-setting" size="mini"
                   @click="toConfig(data)"/>
        <el-popover v-model="pop" placement="top" width="180" trigger="manual" style="margin-left: 3px">
            <p>{{ msg }}</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="doCancel">取消</el-button>
                <el-button :loading="deleteLoading" type="primary" size="mini" @click="doDelete(data)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" title="删除" icon="el-icon-delete" size="mini" @click="toDelete"/>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: "Operation",
        props: {
            data: {
                type: Object,
                required: true
            },
            enableEdit: {
                type: Boolean,
                required: true
            },
            enableSettings: {
                type: Boolean,
                required: true
            },
            msg: {
                type: String,
                default: '确定删除本条数据吗？'
            }
        },
        data() {
            return {
                pop: false,
                deleteLoading: false,
            }
        },
        methods: {
            toEdit() {
                this.$router.push({ path: 'md/', query: { articleId: this.data.id }})
            },
            toConfig(data) {
                this.$emit('show', data)
            },
            toDelete() {
                this.pop = true
            },
            doDelete(data) {
                this.$emit('delete', data)
                this.doCancel()
            },
            doCancel() {
                this.pop = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-button + .el-button {
        margin-left: 3px;
    }

</style>
