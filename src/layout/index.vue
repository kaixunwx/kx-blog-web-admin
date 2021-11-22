<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <Sidebar/>
        <div :class="{'hasTagsView': tagsView}" class="main-container">
            <div :class="{'fixed-header': fixedHeader}">
                <Navbar/>
                <TagsView/>
            </div>
            <AppMain/>
        </div>
    </div>
</template>

<script>
    import { Sidebar, Navbar, AppMain, TagsView } from "./components";
    import ResizeMixin from './mixin/ResizeHandler'
    import { mapState } from 'vuex'


    export default {
        name: "index",
        components: {
            AppMain,
            Sidebar,
            Navbar,
            TagsView
        },
        mixins: [ResizeMixin],
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                tagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader,
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/mixin.scss";
    @import "~@/assets/styles/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
        padding: 0;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }

</style>
