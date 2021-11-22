import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import Layout from '@/layout'
import Login from "@/views/Login";


export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/Home'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'index', affix: true, noCache: true }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'center',
                component: () => import('@/views/system/user/center'),
                name: '个人中心',
                meta: { title: '个人中心' }
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: { title: '登录', noCache: true },
        hidden: true
    },
    {
        path: '/system',
        component: Layout,
        meta: { title: '系统管理', icon: 'system'},
        children: [
            {
                path: 'md',
                component: () => import('@/views/system/writer/'),
                name: 'Writer',
                meta: { title: '发布文章', icon: 'editor'},
            },
            {
                path: 'articles',
                component: () => import('@/views/system/blog'),
                name: 'Articles',
                meta: { title: '文章管理', icon: 'article'}
            },
            {
                path: 'types',
                component: () => import('@/views/system/type'),
                name: 'Types',
                meta: { title: '分类管理', icon: 'tag'}
            },
            {
                path: 'tags',
                component: () => import('@/views/system/tag'),
                name: 'Tags',
                meta: { title: '标签管理', icon: 'tag'}
            }
        ]
    },
    {
        path: '/monitor',
        component: Layout,
        meta: { title: '系统监控', icon: 'monitor'},
        children: [
            {
                path: 'logs',
                component: () => import('@/views/monitor/log'),
                name: 'Log',
                meta: { title: '操作日志', icon: 'log'}
            },
            {
                path: 'errors',
                component: () => import('@/views/monitor/error'),
                name: 'Error',
                meta: { title: '异常日志', icon: 'error'}
            },
            {
                path: 'druid',
                component: () => import('@/views/monitor/druid'),
                name: 'Druid',
                meta: { title: 'SQL监控', icon: 'sqlMonitor'}
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: constantRouterMap
})

export default router
