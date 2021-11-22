<template>
    <div class="login" :style="'background-image:url('+ background +');'">
        <el-card class="login-card">
            <h3 class="title">
                KX-BLOG管理后台
            </h3>
            <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    label-position="left"
                    label-width="0px"
                    @submit.native.prevent
            >
                <el-form-item prop="validation">
                    <el-input v-model="loginForm.validation" type="text" auto-complete="off" placeholder="手机/邮箱">
                        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" type="text" auto-complete="off" placeholder="短信/邮箱验证码"  @keyup.enter.native="handleLogin">
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <el-button :loading="loginCodeLoading" :disable="loginCodeLoading" type="primary"
                               class="el-button code-button"
                               @click="getLoginCode" prop="button">
                        <span v-if="!loginCodeLoading">点击获取</span>
                        <span v-else>{{loginCodeCountDown}}s后重试</span>
                    </el-button>
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 10px 0;">记住我</el-checkbox>
                <el-form-item style="width:100%;">
                    <el-button :loading="loginLoading" size="medium" type="primary" style="width:100%;"
                               @click.native.prevent="handleLogin">
                        <span v-if="!loginLoading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Background from '@/assets/images/backgroud.jpeg'
    import Cookies from 'js-cookie'
    import {getCode} from "@/api/login";
    import {isValidUsername} from "@/utils/validate"
    import Config from '@/settings'
    import qs from 'qs'

    export default {
        name: "Login",
        components: {},
        data() {
            return {
                loginLoading: false,
                background: Background, // 登录页背景图
                loginForm: {  // 登录form
                    validation: '18567786303@163.com',
                    code: '',
                    uuid: '',
                    rememberMe: false
                },
                loginRules: {
                    validation: [{required: true, trigger: 'blur', validator: isValidUsername}],
                },
                loginCodeLoading: false,
                loginCodeCountDown: 0,
                redirect: undefined,
                codeUrl: '',
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const data = route.query
                    if (data && data.redirect) {
                        this.redirect = data.redirect
                        delete data.redirect
                        if (JSON.stringify(data) !== '{}') {
                            this.redirect = this.redirect + '&' + qs.stringify(data, {indices: false})
                        }
                    }
                },
                immediate: true
            }
        },
        created() {
            // 短信验证码倒计时
            this.doLoginCodeCountDown()
            // 用户点击了记住我，从cookie中获取账号和密码填入表单
            this.getCookie()
            // token 过期提示
            this.point()
        },
        methods: {
            getCookie() {
                const validation = Cookies.get('validation')
                const rememberMe = Cookies.get('rememberMe')
                this.loginForm = {
                    validation: validation === undefined ? this.loginForm.validation : validation,
                    rememberMe: rememberMe === undefined ? this.loginForm.rememberMe : rememberMe,
                    code: ''
                }
            },
            point() {
                const point = Cookies.get('point') !== undefined
                if (point) {
                    this.$notify({
                        title: '提示',
                        message: '当前登录状态已过期，请重新登录！',
                        type: 'warning',
                        duration: 5000
                    })
                    Cookies.remove('point')
                }
            },
            getLoginCode() {
                this.loginForm.code = ''
                this.$refs.loginForm.validate(valid => {
                    if(valid) {
                        // 按钮倒计时
                        this.loginCodeLoading = true
                        Cookies.set('loginCodeTimestamp', Date.parse(new Date()));
                        this.doLoginCodeCountDown();
                        // 获取验证码
                        getCode(this.loginForm.validation).then(res => {
                            this.loginForm.uuid = res.uuid
                        }).catch(() => {
                            this.loginCodeLoading = false
                            Cookies.remove('loginCodeTimestamp')
                        })
                    }else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            // 验证码倒计时
            doLoginCodeCountDown() {
                const interval = setInterval(() => {
                    const timestamp = Date.parse(new Date());  // 获取当前时间戳
                    const seconds = (timestamp - Cookies.get('loginCodeTimestamp')) / 1000  // 计算当前时间和点击获取验证码时的时间差
                    if (seconds <= 60) { // 如果时间差小于60 等待
                        this.loginCodeLoading = true
                        this.loginCodeCountDown = 60 - seconds
                    } else { // 如果大于60 button重新激活 清除定时器 清除cookie中的时间戳
                        this.loginCodeCountDown = 60
                        this.loginCodeLoading = false
                        clearInterval(interval)
                        Cookies.remove('loginCodeTimestamp')
                    }
                }, 1000) // 1s运行一次
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    const user = {
                        validation: this.loginForm.validation,
                        rememberMe: this.loginForm.rememberMe,
                        code: this.loginForm.code,
                        uuid: this.loginForm.uuid
                    }
                    if (valid) {
                        this.loginLoading = true
                        if (user.rememberMe) { // 保存用户名到cookie
                            Cookies.set('validation', user.validation, {expires: Config.passCookieExpires})
                            Cookies.set('rememberMe', user.rememberMe, {expires: Config.passCookieExpires})
                        } else {
                            Cookies.remove('validation')
                            Cookies.remove('rememberMe')
                        }
                        this.$store.dispatch('Login', user).then(() => {
                            this.loginLoading = false
                            this.$router.push({path: this.redirect || '/'})
                        }).catch(() => {
                            this.loginLoading = false
                            this.$refs.loginForm.resetFields()
                            Cookies.remove('loginCodeTimestamp')  // 删除验证码倒计时
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
    }

    .title {
        margin: 0 auto 10px auto;
        text-align: center;
        color: #707070;
    }

    .login-card {
        border-radius: 6px;
        background: #ffffff;
        width: 385px;
        padding: 25px 25px 5px 25px;

        .el-input {
            height: 38px;
            position: relative;
            display: inline-block;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }

    .code-button {
        position: absolute !important;
        right: 0;
        height: 38px;
        width: 35%;
        font-size: 12px !important;
    }
    .code-button.is-loading {
        position: absolute !important;
        right: 0;
        height: 38px;
        width: 35%;
        font-size: 12px !important;
    }
</style>
