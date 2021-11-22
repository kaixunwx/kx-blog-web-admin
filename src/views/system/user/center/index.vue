<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
                <el-card class="box-card">
                    <div slot="header">
                        <span>个人信息</span>
                    </div>
                    <div>
                        <div style="text-align: center">
                            <div class="el-upload">
                                <img :src="user.avatar ? user.avatar : Avatar" title="点击上传头像" class="avatar"
                                     @click="toggleShow">
                                <myUpload
                                        v-model="show"
                                        :headers="headers"
                                        :url="updateAvatarApi"
                                        @crop-upload-success="cropUploadSuccess"
                                />
                            </div>
                        </div>
                        <ul class="user-info">
                            <li>
                                <div style="height: 100%">
                                    <svg-icon icon-class="login"/>
                                    登录账号
                                    <div class="user-right">{{ user.username }}</div>
                                </div>
                            </li>
                            <li>
                                <svg-icon icon-class="user1"/>
                                用户昵称
                                <div class="user-right">{{ user.nickname }}</div>
                            </li>
                            <li>
                                <svg-icon icon-class="phone"/>
                                手机号码
                                <div class="user-right">{{ user.phone }}</div>
                            </li>
                            <li>
                                <svg-icon icon-class="email"/>
                                用户邮箱
                                <div class="user-right">{{ user.email }}</div>
                            </li>
                            <li>
                                <svg-icon icon-class="anq"/>
                                安全设置
                                <div class="user-right">
                                    <a @click="$refs.email.dialog = true">修改邮箱</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
                <!--    用户资料    -->
                <el-card class="box-card">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="用户资料" name="first">
                            <el-form ref="form" :model="form" :rules="rules" style="margin-top: 10px;" size="small"
                                     label-width="65px">
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input v-model="form.nickname" style="width: 35%"/>
                                    <span style="color: #C0C0C0;margin-left: 10px;">用户昵称不作为登录使用</span>
                                </el-form-item>
                                <el-form-item label="简介" prop="biography">
                                    <textarea v-model="form.biography" rows="5" style="width: 35%"></textarea>
                                </el-form-item>
                                <el-form-item label="QQ" prop="qq">
                                    <el-input v-model="form.qq" style="width: 35%;"/>
                                </el-form-item>
                                <el-form-item label="Github" prop="github">
                                    <el-input v-model="form.github" style="width: 35%;"/>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.gender" style="width: 178px">
                                        <el-radio label="男">男</el-radio>
                                        <el-radio label="女">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button :loading="saveLoading" size="mini" type="primary" @click="doSubmit">
                                        保存配置
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <!--    操作日志    -->
                        <el-tab-pane label="操作日志" name="second">
                            <h3>尚未开放</h3>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <updateEmail ref="email" :email="user.email"/>
    </div>
</template>

<script>
    import myUpload from 'vue-image-crop-upload'
    import {mapGetters} from 'vuex'
    import updateEmail from './updateEmail'
    import {getToken} from '@/utils/auth'
    import store from '@/store'
    import {editUser} from '@/api/system/user'
    import Avatar from '@/assets/images/avatar.png'

    export default {
        name: 'Center',
        components: {updateEmail, myUpload},
        data() {
            return {
                show: false,
                Avatar: Avatar,
                activeName: 'first',
                saveLoading: false,
                headers: {
                    'Authorization': getToken()
                },
                form: {},
                rules: {
                    nickname: [
                        {required: true, message: '请输入用户昵称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    biography: [
                        {required: true, message: '请输入用户简介', trigger: 'blur'},
                    ],
                    qq: [
                        {required: true, message: '请输入用户QQ', trigger: 'blur'},
                    ],
                    github: [
                        {required: true, message: '请输入用户github', trigger: 'blur'},
                    ],

                }
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'updateAvatarApi',
                'baseApi'
            ])
        },
        created() {
            this.form = {
                id: this.user.id,
                nickname: this.user.nickname,
                biography: this.user.biography,
                qq: this.user.qq,
                github: this.user.github,
                gender: this.user.gender,
            }
        },
        methods: {
            toggleShow() {
                this.show = !this.show
            },
            cropUploadSuccess(jsonData, field) {
                store.dispatch('GetInfo')
            },
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true
                        editUser(this.form).then(() => {
                            this.editSuccessNotify()
                            store.dispatch('GetInfo').then(() => {
                            })
                            this.saveLoading = false
                        }).catch(() => {
                            this.saveLoading = false
                        })
                    }
                })
            },
            editSuccessNotify() {
                this.$notify({
                    title: '编辑成功',
                    type: 'success',
                    duration: 2500
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info {
        padding-left: 0;
        list-style: none;

        li {
            border-bottom: 1px solid #F0F3F4;
            padding: 11px 0;
            font-size: 13px;
        }

        .user-right {
            float: right;

            a {
                color: #317EF3;
            }
        }
    }
</style>
