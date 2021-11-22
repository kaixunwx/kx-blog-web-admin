<template>
    <el-pagination
            background
            hide-on-single-page
            :page-size.sync="size"
            :total="total"
            :current-page.sync="currentPage"
            style="margin-top: 8px;"
            layout="total, prev, pager, next"
            @current-change="change"
    />
</template>

<script>
    export default {
        name: "index",
        props: {
            page: {
                type: Number,
                required: true
            },
            size: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                currentPage: this.page,
            }
        },
        methods: {
            change(val) {
                this.$emit('pageChangeHandler', val)
            }
        }
    }
</script>

<style scoped>

</style>
