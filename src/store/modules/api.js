// 适配 Nginx 反向代理
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 图片上传
    imagesUploadApi: baseUrl + '/api/localStorage/pictures',
    // 修改头像
    updateAvatarApi: baseUrl + '/api/user/updateAvatar',
    // 修改文章封面
    updateBlogThumbnailApi: baseUrl + '/api/blog/updateThumbnail',
    // 修改类型封面
    updateTypeThumbnailApi: baseUrl + '/api/type/updateThumbnail',
    // 修改标签封面
    updateTagThumbnailApi: baseUrl + '/api/tag/updateThumbnail',
    // 修改邮箱
    updateEmailApi: baseUrl + '/api/user/updateEmail',
    // Sql 监控
    sqlApi: baseUrl + '/druid/index.html',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html',
    // 文件上传
    fileUploadApi: baseUrl + '/api/localStorage',
    // baseUrl，
    baseApi: baseUrl
  }
}

export default api
