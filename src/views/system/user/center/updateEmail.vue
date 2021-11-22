<template>
    <div style="display: inline-block;">
        <el-dialog :visible.sync="dialog" title="修改邮箱" :close-on-click-modal="false" :before-close="cancel"
                   append-to-body width="475px" @close="cancel">
            <div class="input-container">
                <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="0px">
                    <el-form-item prop="email">
                        <el-input v-model="form.email" auto-complete="off" placeholder="请输入新邮箱">
                            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.code" auto-complete="off" placeholder="验证码">
                            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                        </el-input>
                        <el-button :loading="codeLoading" :disable="codeLoading" type="primary"
                                   class="el-button code-button" @click="sendCode">
                            <span v-if="!codeLoading">点击获取</span>
                            <span v-else>{{codeCountDown}}s后重试</span>
                        </el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <div class="footer-button">
                        <el-button class="cancel" type="text" @click="cancel">取消</el-button>
                        <el-button class="confirm" :loading="loading" type="text" @click="doSubmit">确认</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import store from '@/store'
    import {validEmail} from '@/utils/validate'
    import {updateEmail} from '@/api/system/user'
    import {getCode} from "@/api/login";

    export default {
        props: {
            email: {
                type: String,
                required: true
            }
        },
        created() {
            this.doCodeCountDown()
        },
        data() {
            const validMail = (rule, value, callback) => {
                if (value === '' || value === null) {
                    callback(new Error('新邮箱不能为空'))
                } else if (value === this.email) {
                    callback(new Error('新邮箱不能与旧邮箱相同'))
                } else if (validEmail(value)) {
                    callback()
                } else {
                    callback(new Error('邮箱格式错误'))
                }
            }
            return {
                loading: false,
                dialog: false,
                form: {email: '', code: '', uuid: ''},
                codeLoading: false,
                codeCountDown: 0,
                rules: {
                    email: [
                        {required: true, validator: validMail, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            sendCode() {
                this.form.code = ''
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // 按钮倒计时
                        this.codeLoading = true
                        Cookies.set('codeTimestamp', Date.parse(new Date()));
                        this.doCodeCountDown();
                        // 获取验证码
                        getCode(this.form.email).then(res => {
                            this.form.uuid = res.uuid
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            doCodeCountDown() {
                const interval = setInterval(() => {
                    const timestamp = Date.parse(new Date());  // 获取当前时间戳
                    const seconds = (timestamp - Cookies.get('codeTimestamp')) / 1000  // 计算当前时间和点击获取验证码时的时间差
                    if (seconds <= 60) { // 如果时间差小于60 等待
                        this.codeLoading = true
                        this.codeCountDown = 60 - seconds
                    } else { // 如果大于60 button重新激活 清除定时器 清除cookie中的时间戳
                        this.codeCountDown = 60
                        this.codeLoading = false
                        clearInterval(interval)
                        Cookies.remove('codeTimestamp')
                    }
                }, 1000) // 1s运行一次
            },
            doSubmit() {
                 this.$refs['form'].validate((valid) => {
                     if (valid) {
                        this.loading = true
                         updateEmail(this.form).then(res => {
                            this.loading = false
                            this.resetForm()
                            this.$notify({
                                title: '邮箱修改成功',
                                type: 'success',
                                duration: 1500
                            })
                            store.dispatch('GetInfo').then(() => {
                            })
                           Cookies.remove('codeTimestamp')
                        }).catch(err => {
                            this.loading = false
                            console.log(err.response.data.message)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input-container {
        padding-left: 3em;
        padding-right: 3em;
    }

    .code-button {
        position: absolute !important;
        right: 0;
        height: 40px;
        width: 35%;
        font-size: 12px !important;
    }

    .code-button.is-loading {
        position: absolute !important;
        right: 0;
        height: 40px;
        width: 35%;
        font-size: 12px !important;
    }

    .dialog-footer {
        display: flex;

        .footer-button {
            margin-left: auto;
        }
    }
</style>
