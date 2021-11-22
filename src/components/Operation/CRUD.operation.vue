<!--搜索与重置-->
<template>
    <div class="crud-container">
        <!--左侧插槽-->
        <slot name="left" />
        <el-button
                v-if="optShow.add"
                class="filter-item"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="toAdd"
        >
            新增
        </el-button>
        <el-button
                v-if="optShow.del"
                slot="reference"
                class="filter-item"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="selections.length === 0"
                @click="toDelete"
        >
            批量删除
        </el-button>
        <el-button-group class="crud-opts-right">
            <el-button
                    size="mini"
                    icon="el-icon-refresh"
                    @click="toRefresh"
            />
        </el-button-group>
    </div>
</template>
<script>
    export default {
        props: {
            optShow: {
                type: Object,
                required: true
            },
            selections: {
                type: Array,
                required: true
            }
        },
        methods: {
            toAdd() {
                this.$emit('show')
            },
            toRefresh() {
                this.$emit('refresh')
            },
            toDelete() {
                this.$emit('deleteAll')
            }
        }
    }
</script>

<style lang="scss">
    .crud-container {
      padding-top: 10px;
        display: flex;
        align-items: center;
        .crud-opts-right {
          margin-left: auto;
        }
    }
</style>
