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
            <crudOperation :optShow="optShow" :selections="selections" @show="toWrite"
                           @deleteAll="doDeleteAll(selections)" @refresh="toQuery"/>
        </div>
        <!-- 表单渲染-->
        <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="dialog" title="文章配置" width="570px">
            <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px"
                     @submit.native.prevent>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title"/>
                </el-form-item>
                <el-form-item label="分类" prop="type">
                    <el-select
                            v-model="typeSelection"
                            style="width: 178px"
                            placeholder="请选择"
                    >
                        <el-option
                                v-for="item in defaultTypes"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-select
                            v-model="tagSelections"
                            style="width: 178px"
                            multiple
                            placeholder="请选择"
                    >
                        <el-option
                                v-for="item in defaultTags"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="置顶">
                    <el-radio-group v-model="form.top" style="width: 178px">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="推荐">
                    <el-radio-group v-model="form.recommend" style="width: 178px">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
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
                :url="updateBlogThumbnailApi"
                @crop-upload-success="cropUploadSuccess"
        />
        <!--表格渲染-->
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;"
                  @selection-change="selectionChangeHandler">
            <el-table-column type="selection" width="55"/>
            <el-table-column :show-overflow-tooltip="true" prop="title" label="标题"/>
            <el-table-column :show-overflow-tooltip="true" prop="author" label="作者">
                <template slot-scope="scope">
                    <div>{{ scope.row.author.nickname }}</div>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="分类">
                <template slot-scope="scope">
                    <div v-if="scope.row.type">{{ scope.row.type.name }}</div>
                    <div v-else></div>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="tags" label="标签">
                <template slot-scope="scope">
                    <el-tag size="mini" class="tag-item" v-for="item in scope.row.tags">{{ item.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="thumbnail" label="封面"/>
            <el-table-column label="置顶" align="center" prop="top">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.top"
                            active-color="#409EFF"
                            inactive-color="#F56C6C"
                            @change="changeTop(scope.row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="推荐" align="center" prop="recommend">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.recommend"
                            active-color="#409EFF"
                            inactive-color="#F56C6C"
                            @change="changeRecommend(scope.row)"
                    />
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="发布日期"/>
            <el-table-column label="操作" width="165" align="center" fixed="right">
                <template slot-scope="scope">
                    <udOperation :data="scope.row" :enableEdit="true" :enableSettings="true" @show="beforeShowEditForm"
                                 @delete="doDelete"/>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <div class="m-pagination">
            <Pagination :page="page" :size="size" :total="total" @pageChangeHandler="pageChange"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import crud from '@/mixins/crud'
    import {getAllTags} from "@/api/system/tag";
    import {getAllTypes} from "@/api/system/type";
    import crudMethod from '@/api/system/blog'
    import {udOperation, rROperation, crudOperation} from '@/components/Operation'
    import Pagination from '@/components/Pagination'
    import myUpload from 'vue-image-crop-upload'
    import {getToken} from '@/utils/auth'

    export default {
        name: "Blog",
        mixins: [crud],
        components: {
            udOperation,
            rROperation,
            crudOperation,
            Pagination,
            myUpload
        },
        computed: {
            ...mapGetters([
                'updateBlogThumbnailApi',
            ])
        },
        data() {
            return {
                url: 'api/blog',
                data: [],
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 5, max: 100, message: '长度在 5 到 100 个字', trigger: 'blur'}
                    ],
                },
                params: {
                    blurry: '',
                },
                defaultForm: {type: null, tags: [],},  // 用来重写form表单个别字段，传输时候根据default表单格式传输
                form: {},
                crudMethod: {
                    ...crudMethod
                },
                defaultTypes: [],
                defaultTags: [],
                typeSelection: null,
                tagSelections: [],
                uploadShow: false, // 控制上传封面dialog
                headers: {
                    'Authorization': getToken(),
                },
            }
        },
        created() {
            this.init();
            this.initTypeTags();
        },
        methods: {
            // 打开编辑框前 初始化默认选中分类和标签
            beforeShowEditForm(data) {
                this.typeSelection = null
                this.tagSelections = []
                if (data.type) {
                    this.typeSelection = data.type.id
                }
                data.tags.forEach(item => {
                    this.tagSelections.push(item.id)
                })
                // 设置完成后打开弹窗
                this.showEditFormDialog(data)
            },
            beforeSubmitMethod() {
                this.refreshForm()
                // 重置为空
                this.form.type = null
                this.form.tags = []
                // 选择框的值赋值给对应字段
                if (this.typeSelection) {
                    const data = {id: this.typeSelection}
                    this.form.type = data
                }
                this.tagSelections.forEach(item => {
                    const data = {id: item}
                    this.form.tags.push(data)
                })
                return true
            },
            changeTop(data) {
                this.isAdd = false
                if(data.top) { // 置顶默认推荐
                    data.recommend = true
                }
                this.form = JSON.parse(JSON.stringify(data))
                this.crudMethod.edit(this.form).then(() => {
                    if (data.top) {
                        this.$notify({
                            title: '置顶成功',
                            type: 'success',
                            duration: 2500
                        })
                    } else this.$notify({
                        title: '取消置顶',
                        type: 'success',
                        duration: 2500
                    })
                    this.init()
                }).catch(() => {
                })
            },
            changeRecommend(data) {
                this.isAdd = false
                this.form = JSON.parse(JSON.stringify(data))
                this.crudMethod.edit(this.form).then(() => {
                    if (data.recommend) {
                        this.$notify({
                            title: '推荐成功',
                            type: 'success',
                            duration: 2500
                        })
                    } else this.$notify({
                        title: '取消推荐',
                        type: 'success',
                        duration: 2500
                    })
                    this.init()
                }).catch(() => {
                })
            },
            // 新增button点击直接跳转到文章发布页
            toWrite() {
                this.$router.push('/system/md')
            },
            initTypeTags() {
                new Promise((resolve, reject) => {
                    getAllTags().then(data => {
                        this.defaultTags = data.content
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    });
                })
                new Promise((resolve, reject) => {
                    getAllTypes().then(data => {
                        this.defaultTypes = data.content
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    });
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    ::v-deep .vue-treeselect__control, ::v-deep .vue-treeselect__placeholder, ::v-deep .vue-treeselect__single-value {
        height: 30px;
        line-height: 30px;
    }

    .tag-item {
        margin-left: 1px !important;
    }

    .m-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
