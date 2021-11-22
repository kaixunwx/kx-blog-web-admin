import Vue from 'vue'


import {
    initData,
    download
} from '@/api/data'
import {
    parseTime,
    downloadFile
} from '@/utils/index'


export default {
    data() {
        return {
            // 表格数据
            data: [],
            // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
            sort: ['createTime,desc'],
            // 页码
            page: 1,
            // 每页数据条数
            size: 8,
            // 总数据条数
            total: 0,
            // 请求数据的url
            url: '',
            // 查询数据的参数
            params: {},
            // 待查询的对象
            query: {},
            // 多选框选中选项
            selections: [],
            // 等待时间
            time: 50,
            // 是否为新增类型的表单
            isAdd: false,
            // 导出的 Loading
            downloadLoading: false,
            // 表格 Loading 属性
            loading: true,
            // 删除 Loading 属性
            delLoading: false,
            delAllLoading: false,
            // 弹窗属性
            dialog: false,
            // Form 表单
            form: {},
            defaultForm: {},
            // 重置表单 用来保存添加之前的form状态 添加成功或取消添加后用来恢复form到初始状态
            resetForm: {},
            // 标题
            title: '',
            // 通用增删改方法
            crudMethod: {
                add: (form) => {
                },
                del: (id) => {
                },
                edit: (form) => {
                },
                get: (id) => {
                }
            },
            // 显示操作按钮
            optShow: {
                search: true,
                add: true,
                edit: true,
                del: true,
                download: true,
                reset: true
            },
        }
    },
    methods: {
        parseTime,
        downloadFile,
        async init() {
            if (!await this.beforeInit()) {
                return
            }
            return new Promise((resolve, reject) => {
                this.loading = true
                // 请求数据
                initData(this.url, this.getQueryParame()).then(data => {
                    this.total = data.totalElements
                    this.data = data.content
                    // time 毫秒后显示表格
                    setTimeout(() => {
                        this.loading = false
                    }, this.time)
                    resolve(data)
                }).catch(err => {
                    this.loading = false
                    reject(err)
                })
            })
        },
        beforeInit() {
            return true
        },
        getQueryParame: function () {
            return {
                page: this.page - 1,
                size: this.size,
                sort: this.sort,
                ...this.query,
                ...this.params
            }
        },
        // 获取id值
        getDataId(data) {
            return data['id']
        },
        // 改变页码
        pageChange(val) {
            this.page = val
            this.init()
        },
        selectionChangeHandler(val) {
            this.selections = val
        },
        // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
        dleChangePage(size) {
            if (this.data.length === size && this.page !== 0) {
                this.page = this.page - 1
            }
        },
        // 查询方法
        toQuery() {
            this.page = 1
            this.init()
        },
        // 重置搜索项
        resetQuery(toQuery = true) {
            this.params = {}
            if (toQuery) {
                this.toQuery()
            }
        },
        /**
         * 通用的提示封装
         */
        submitSuccessNotify() {
            this.$notify({
                title: '提交成功',
                type: 'success',
                duration: 2500
            })
        },
        addSuccessNotify() {
            this.$notify({
                title: '新增成功',
                type: 'success',
                duration: 2500
            })
        },
        editSuccessNotify() {
            this.$notify({
                title: '编辑成功',
                type: 'success',
                duration: 2500
            })
        },
        delSuccessNotify() {
            this.$notify({
                title: '删除成功',
                type: 'success',
                duration: 2500
            })
        },
        notify(title, type) {
            this.$notify({
                title: title,
                type: type,
                duration: 2500
            })
        },
        /**
         * 删除前可以调用 beforeDelMethod 做一些操作
         */
        beforeDelMethod() {
            return true
        },
        // 通用删除
        doDelete(data) {
            const ids = []
            if (data instanceof Array) {
                data.forEach(item => {
                    ids.push(this.getDataId(item))
                })
            } else {
                ids.push(this.getDataId(data))
            }
            this.delLoading = true
            this.crudMethod.del(ids).then(() => {
                this.delLoading = false
                this.dleChangePage(data.size)
                this.delSuccessNotify()
                this.afterDelMethod()
                this.init()
            }).catch(() => {
                this.delLoading = false
            })
        },
        afterDelMethod() {
            // TODO 可以在删除数据后做些操作
        },
        /**
         * 多选删除 带提示
         */
        doDeleteAll(data) {
            this.$confirm(`你确定删除选中${data.length}条数据吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDelete(data)
            })
        },
        /**
         * 显示新增弹窗
         */
        showAddFormDialog() {
            this.isAdd = true
            this.resetForm = JSON.parse(JSON.stringify(this.form))
            this.dialog = true
            setTimeout(() => {
                this.$refs['focus'].focus()
            }, 500)
        },
        /**
         * 显示编辑弹窗
         */
        showEditFormDialog(data = '') {
            this.isAdd = false
            this.resetForm = JSON.parse(JSON.stringify(this.form))
            if (data) {
                this.form = JSON.parse(JSON.stringify(data))
            }
            this.dialog = true
        },
        /**
         * 关闭表单 打开图片上传
         */
        toggleShow() {
            this.dialog = false
            this.uploadShow = !this.uploadShow
        },
        /**
         * 图片上传成功回调
         * @param jsonData
         * @param field
         */
        cropUploadSuccess(jsonData, field) {
            this.init()
        },
        /**
         * 编辑之前通过默认表单重写form表单 按照defaultForm定义的字段格式提交
         * @param data
         */
        refreshForm() {
            const defaultForm = this.defaultForm
            const crudForm = this.form
            for (const key in defaultForm) {
                // eslint-disable-next-line no-prototype-builtins
                if (crudForm.hasOwnProperty(key)) {
                    crudForm[key] = defaultForm[key]
                } else {
                    Vue.set(crudForm, key, defaultForm[key])
                }
            }
        },
        beforeCancelDialog(done) {
            this.form = {}
            this.$refs['form'].resetFields()
            this.$refs['form'].clearValidate()
            done()
        },
        /**
         * 关闭dialog
         * */
        cancelDialog() {
            this.form = {}
            this.$refs['form'].resetFields()
            this.$refs['form'].clearValidate()
            this.dialog = false
        },
        /**
         * 新增方法
         */
        addMethod() {
            this.crudMethod.add(this.form).then(() => {
                this.addSuccessNotify()
                this.loading = false
                this.afterAddMethod()
                this.cancelDialog()
                this.init()
            }).catch(() => {
                this.loading = false
                this.afterAddErrorMethod()
            })
        },
        /**
         * 新增后可以调用该方法
         */
        afterAddMethod() {
            this.$refs['form'].resetFields()
        },
        /**
         * 新增失败后调用该方法
         */
        afterAddErrorMethod() {

        },
        /**
         * 通用的编辑方法
         */
        editMethod() {
            this.crudMethod.edit(this.form).then(() => {
                this.editSuccessNotify()
                this.loading = false
                this.afterEditMethod()
                this.cancelDialog()
                this.init()
            }).catch(() => {
                this.loading = false
            })
        },
        /**
         * 编辑后可以调用该方法
         */
        afterEditMethod() {
            this.$refs['form'].resetFields()
            this.$refs['form'].clearValidate()
        },
        /**
         * 提交前可以调用该方法
         */
        beforeSubmitMethod() {
            return true
        },
        /**
         * 提交
         */
        doSubmit() {
            if (!this.beforeSubmitMethod()) {
                return
            }
            if (this.$refs['form']) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.isAdd) {
                            this.addMethod()
                        } else this.editMethod()
                    }
                })
            }
        },
        /**
         * 获取弹窗的标题
         */
        getFormTitle() {
            return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
        },
        /**
         * 通用导出
         */
        downloadMethod() {
            this.beforeInit()
            this.downloadLoading = true
            download(this.url + '/download', this.params).then(result => {
                this.downloadFile(result, this.title + '数据', 'xlsx')
                this.downloadLoading = false
            }).catch(() => {
                this.downloadLoading = false
            })
        }
    }
}
