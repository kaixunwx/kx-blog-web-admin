const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    sidebarLogo: state => state.settings.sidebarLogo,
    tagsView: state => state.settings.tagsView,
    uniqueOpened: state => state.settings.uniqueOpened,
    footerTxt: state => state.settings.footerTxt,
    caseNumber: state => state.settings.caseNumber,
    showFooter: state => state.settings.showFooter,
    roles: state => state.user.roles,
    user: state => state.user.user,
    imagesUploadApi: state => state.api.imagesUploadApi,
    baseApi: state => state.api.baseApi,
    fileUploadApi: state => state.api.fileUploadApi,
    updateAvatarApi: state => state.api.updateAvatarApi,
    updateBlogThumbnailApi: state => state.api.updateBlogThumbnailApi,
    updateTypeThumbnailApi: state => state.api.updateTypeThumbnailApi,
    updateTagThumbnailApi: state => state.api.updateTagThumbnailApi,
    updateEmailApi: state => state.api.updateEmailApi,
    sqlApi: state => state.api.sqlApi,
    swaggerApi: state => state.api.swaggerApi,
}
export default getters
