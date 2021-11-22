<template>
    <div class="app-container">
        <div class="m-head-container">
            <!--搜索框-->
            <el-input
                    v-model="params.blurry"
                    clearable
                    size="small"
                    placeholder="请输入你要搜索的内容"
                    style="width: 200px;"
                    class="filter-item"
                    @keyup.enter.native="toQuery"
            />
            <date-range-picker v-model="params.createTime" class="filter-item"/>
            <rROperation :optShow="optShow" class="filter-item" @query="toQuery"/>
            <el-button
                    slot="left"
                    class="filter-item"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :loading="delAllLoading"
                    @click="confirmDelAll"
            >清空
            </el-button>
            <el-button
                    size="mini"
                    icon="el-icon-refresh"
                    @click="toQuery"
                    class="refresh"
            />
        </div>
        <div>

        </div>
        <!--表格渲染-->
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;" size="small">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="请求方法">
                            <span>{{ scope.row.method }}</span>
                        </el-form-item>
                        <el-form-item label="请求参数">
                            <span>{{ scope.row.params }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="requestIp" label="IP"/>
            <el-table-column :show-overflow-tooltip="true" prop="address" label="IP归属地"/>
            <el-table-column prop="description" label="描述"/>
            <el-table-column prop="browser" label="浏览器"/>
            <el-table-column prop="time" label="请求耗时" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="180px"/>
        </el-table>
        <!--分页组件-->
        <div class="m-pagination">
            <Pagination :page="page" :size="size" :total="total" @pageChangeHandler="pageChange"/>
        </div>
    </div>
</template>

<script>
    import crud from '@/mixins/crud'
    import {crudOperation, rROperation} from '@/components/Operation'
    import {delAllInfo} from '@/api/system/log'
    import Pagination from '@/components/Pagination'
    import DateRangePicker from '@/components/DateRangePicker'

    export default {
        name: "Log",
        components: {
            rROperation,
            DateRangePicker,
            Pagination,
            crudOperation
        },
        mixins: [crud],
        created() {
            this.init()
        },
        data() {
            return {
                url: 'api/logs',
                delAllLoading: false,
                params: {
                    blurry: '',
                    createTime: '',
                },
                optShow: {
                    add: false,
                    del: false,
                    reset: false
                }
            }
        },
        methods: {
            confirmDelAll() {
                this.$confirm(`确认清空所有操作日志吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAllLoading = true
                    delAllInfo().then(res => {
                        this.delAllLoading = false
                        this.dleChangePage(1)
                        this.delSuccessNotify()
                        this.toQuery()
                    }).catch(err => {
                        this.delAllLoading = false
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-head-container {
        display: flex;
        align-items: center;

        .filter-item {
            margin-left: 5px;
        }

        .filter-item:first-child {
            margin-left: 0px;
        }
    }

</style>
