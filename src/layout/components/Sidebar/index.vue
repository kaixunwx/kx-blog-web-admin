<template>
    <div class="sidebar-container" :class="{'has-logo':showLogo}">
        <Logo v-if="showLogo" :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :unique-opened="isUnique"
                    :active-text-color="variables.menuActiveText"
                    :collapse-transition="false"
                    mode="vertical"
            >
                <sidebar-item v-for="route in sidebarRouters" :key="route.path" :item="route" :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import { Logo, SidebarItem } from "./components"
    import { mapState } from 'vuex'
    import variables from '@/assets/styles/variables.scss'
    import { constantRouterMap } from '@/router/router'


    export default {
        name: "index",
        components: {
            Logo,
            SidebarItem
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                sidebarLogo: state => state.settings.sidebarLogo,
                uniqueOpened: state => state.settings.uniqueOpened,
            }),
            sidebarRouters() {
                return constantRouterMap
            },
            activeMenu() {
                const route = this.$route
                const {meta, path} = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            isCollapse() {
                return !this.sidebar.opened
            },
            showLogo() {
                return this.sidebarLogo
            },
            variables() {
                return variables
            },
            isUnique() {
                return this.uniqueOpened
            }
        }
    }
</script>

<style scoped>

</style>
