import router from './router'
import store from '@/store'
import Config from '@/settings'
import {getToken} from "@/utils/auth"


// 白名单
const whiteList = ['/login']


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title + '-' + Config.title
    }
    if (to.fullPath === '/system/md') {
        to.meta.title = '发布文章'
    }
    if (to.fullPath.indexOf('articleId') !== -1) {
        to.meta.title = '编辑文章'
    }
    if (getToken()) { // 本地保存有token
        if (to.path === "/login") {
            next({path: '/'})
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息 F5刷新页面会丢失store存储的内容 需要重新拉取
                store.dispatch('GetInfo')
                    .then(() => {
                        next({...to, replace: true})
                    }).catch(() => {
                    store.dispatch('LogOut').then(() => {
                        location.reload() // 重新实例化vue-router对象 避免bug
                    })
                })
            } else {
                next()
            }
        }

    } else {
        if (whiteList.indexOf(to.path) !== -1) {   // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 重定向到登录页
        }
    }
})
