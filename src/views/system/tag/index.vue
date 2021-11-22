<template>
    <div class="app-container">
        <!--工具栏-->
        <div class="head-container">
            <div>
                <!-- 搜索 -->
                <el-input
                        v-model="params.blurry"
                        clearable
                        size="small"
                        placeholder="输入名称搜索"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="toQuery"
                />
                <rROperation @query="toQuery" @reset="resetQuery" :optShow="optShow"/>
            </div>
            <crudOperation :optShow="optShow" :selections="selections" @show="showAddFormDialog"
                           @deleteAll="doDeleteAll(selections)" @refresh="toQuery"/>
        </div>
        <!-- 表单渲染-->
        <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="dialog" :before-close="beforeCancelDialog" title="新增标签" width="570px">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px"
                     @submit.native.prevent>
                <el-form-item label="标签名" prop="name">
                    <el-input ref="focus" v-model="form.name" @keyup.enter.native="doSubmit"/>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input v-model="form.alias" @keyup.enter.native="doSubmit"/>
                </el-form-item>
                <el-form-item v-if="!isAdd" label="封面">
                    <el-button @click="toggleShow">点击上传</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancelDialog">取消</el-button>
                <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
            </div>
        </el-dialog>
        <myUpload
                v-model="uploadShow"
                :headers="headers"
                :params="{ id: form.id }"
                :url="updateTagThumbnailApi"
                @crop-upload-success="cropUploadSuccess"
        />
        <!--表格渲染-->
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;"
                  @selection-change="selectionChangeHandler">
            <el-table-column type="selection" width="55"/>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="名称"/>
            <el-table-column :show-overflow-tooltip="true" prop="createBy" label="创建人"/>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期"/>
            <el-table-column label="操作" width="115" align="center" fixed="right">
                <template slot-scope="scope">
                    <udOperation :data="scope.row" :enableEdit="false" :enableSettings="true" @show="showEditFormDialog" @delete="doDelete"/>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <div class="m-pagination">
            <Pagination :page="page" :size="size" :total="total" @pageChangeHandler="pageChange" />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import crud from '@/mixins/crud'
    import crudMethod from '@/api/system/tag'
    import {udOperation, rROperation, crudOperation} from '@/components/Operation'
    import Pagination from '@/components/Pagination'
    import myUpload from 'vue-image-crop-upload'
    import {getToken} from '@/utils/auth'


    export default {
        name: "index",
        components: {
            udOperation,
            rROperation,
            crudOperation,
            Pagination,
            myUpload
        },
        mixins: [crud],
        created() {
            this.init();
        },
        computed: {
            ...mapGetters([
                'updateTagThumbnailApi',
            ])
        },
        data() {
            return {
                url: 'api/tag',
                params: {
                    blurry: '',
                },
                selections: [],
                crudMethod: {
                    ...crudMethod
                },
                rules: {
                    name: [
                        {required: true, message: '请输入标签名', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    alias: [
                        {required: true, message: '请输入别名', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ]
                },
                headers: {
                    'Authorization': getToken(),
                },
                uploadShow: false, // 控制上传封面dialog
            }
        },
    }
</script>

<style lang="scss" scoped>
    .m-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
