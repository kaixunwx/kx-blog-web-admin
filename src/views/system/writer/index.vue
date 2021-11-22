<template>
    <div>
        <form ref="form" :model="form">
            <div class="article-bar">
                <div class="article-bar__link-box">
                    <router-link to="/system/articles" title="文章管理">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="89px"
                             height="17px" viewBox="0 0 89 17" version="1.1">
                            <g id="页面1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="MD编辑器优化-20190916" transform="translate(-24.000000, -24.000000)" fill="#6B6B6B">
                                    <g id="Group-4" transform="translate(21.000000, 24.000000)">
                                        <path d="M11.2719767,13.1315385 C11.4864972,13.3286154 11.6239413,13.6086154 11.6239413,13.9230769 C11.6239413,14.5175385 11.1410006,15 10.5459486,15 C10.2651315,15 10.0118033,14.8901538 9.81992058,14.7140769 L9.8172256,14.7167692 L3.34926962,8.79369231 L3.3519646,8.791 C3.13690507,8.59392308 3,8.31392308 3,8 C3,7.68553846 3.13690507,7.40553846 3.3519646,7.20846154 L3.34926962,7.20630769 L9.8172256,1.28323077 L9.81992058,1.28538462 C10.0118033,1.10984615 10.2651315,1 10.5459486,1 C11.1410006,1 11.6239413,1.48192308 11.6239413,2.07692308 C11.6239413,2.39084615 11.4864972,2.67138462 11.2719767,2.86792308 L11.2741327,2.87061538 L5.6734218,8 L11.2741327,13.1288462 L11.2719767,13.1315385 Z M21.152,3.336 L28.604,3.336 C28.118,2.382 27.524,1.482 26.804,0.636 L28.1,0.168 C28.784,1.032 29.396,2.094 29.972,3.336 L36.848,3.336 L36.848,4.632 L34.04,4.632 C33.158,7.476 31.826,9.87 30.062,11.778 C31.97,13.398 34.364,14.73 37.244,15.792 L36.542,16.872 C33.554,15.756 31.106,14.37 29.162,12.696 C27.11,14.586 24.554,15.972 21.494,16.854 L20.81,15.72 C23.834,14.91 26.318,13.632 28.262,11.868 C26.174,9.816 24.734,7.404 23.924,4.632 L21.152,4.632 L21.152,3.336 Z M25.202,4.632 C25.976,7.062 27.29,9.168 29.162,10.968 C30.764,9.222 31.934,7.116 32.69,4.632 L25.202,4.632 Z M46.37,12.066 L41.348,12.066 L41.348,6.594 L52.688,6.594 L52.688,12.066 L47.702,12.066 L47.702,13.326 L54.92,13.326 L54.92,14.478 L47.702,14.478 L47.702,16.728 L46.37,16.728 L46.37,14.478 L39.08,14.478 L39.08,13.326 L46.37,13.326 L46.37,12.066 Z M42.626,9.834 L42.626,10.986 L51.41,10.986 L51.41,9.834 L42.626,9.834 Z M51.41,8.826 L51.41,7.674 L42.626,7.674 L42.626,8.826 L51.41,8.826 Z M42.968,2.688 L40.25,2.688 L40.25,1.554 L46.208,1.554 C46.064,1.122 45.902,0.708 45.722,0.348 L47.108,0.132 C47.288,0.564 47.45,1.032 47.63,1.554 L53.75,1.554 L53.75,2.688 L51.086,2.688 L50.438,4.362 L54.686,4.362 L54.686,5.478 L39.332,5.478 L39.332,4.362 L43.634,4.362 L42.968,2.688 Z M44.948,4.362 L49.106,4.362 L49.736,2.688 L44.282,2.688 L44.948,4.362 Z M70.148,7.404 L70.148,10.932 L61.166,10.932 L61.166,12.174 L70.976,12.174 L70.976,16.8 L69.698,16.8 L69.698,16.044 L61.166,16.044 L61.166,16.782 L59.87,16.782 L59.87,7.404 L70.148,7.404 Z M61.166,14.892 L69.698,14.892 L69.698,13.218 L61.166,13.218 L61.166,14.892 Z M61.166,9.888 L68.888,9.888 L68.888,8.448 L61.166,8.448 L61.166,9.888 Z M72.632,5.226 L72.632,8.484 L71.372,8.484 L71.372,6.342 L58.628,6.342 L58.628,8.484 L57.368,8.484 L57.368,5.226 L64.496,5.226 C64.316,4.794 64.136,4.416 63.938,4.056 L65.198,3.84 L65.09,3.768 C65.954,2.688 66.566,1.518 66.962,0.222 L68.204,0.492 C68.078,0.87 67.952,1.23 67.808,1.59 L73.01,1.59 L73.01,2.724 L69.806,2.724 C70.184,3.228 70.49,3.696 70.706,4.128 L69.554,4.56 C69.23,3.912 68.852,3.3 68.42,2.724 L67.286,2.724 C66.962,3.336 66.584,3.912 66.188,4.452 L65.216,3.858 C65.414,4.272 65.612,4.722 65.792,5.226 L72.632,5.226 Z M59.528,2.724 C59.096,3.426 58.628,4.074 58.088,4.668 L56.954,3.948 C58.034,2.832 58.826,1.572 59.33,0.204 L60.572,0.474 C60.428,0.87 60.266,1.23 60.122,1.59 L64.946,1.59 L64.946,2.724 L61.922,2.724 C62.318,3.264 62.66,3.786 62.912,4.272 L61.724,4.722 C61.4,4.038 61.004,3.372 60.554,2.724 L59.528,2.724 Z M81.488,1.014 L90.29,1.014 L90.29,9.33 L86.546,9.33 L86.546,11.454 L90.596,11.454 L90.596,12.678 L86.546,12.678 L86.546,15.018 L91.262,15.018 L91.262,16.26 L80.426,16.26 L80.426,15.018 L85.25,15.018 L85.25,12.678 L81.182,12.678 L81.182,11.454 L85.25,11.454 L85.25,9.33 L81.488,9.33 L81.488,1.014 Z M89.048,8.178 L89.048,5.748 L86.546,5.748 L86.546,8.178 L89.048,8.178 Z M85.25,8.178 L85.25,5.748 L82.73,5.748 L82.73,8.178 L85.25,8.178 Z M82.73,4.614 L85.25,4.614 L85.25,2.166 L82.73,2.166 L82.73,4.614 Z M86.546,2.166 L86.546,4.614 L89.048,4.614 L89.048,2.166 L86.546,2.166 Z M75.134,6.972 L77.096,6.972 L77.096,2.706 L74.882,2.706 L74.882,1.482 L80.624,1.482 L80.624,2.706 L78.428,2.706 L78.428,6.972 L80.408,6.972 L80.408,8.214 L78.428,8.214 L78.428,12.3 C79.112,12.066 79.76,11.814 80.408,11.526 L80.408,12.786 C78.752,13.47 76.97,14.046 75.062,14.514 L74.738,13.272 C75.53,13.128 76.322,12.948 77.096,12.732 L77.096,8.214 L75.134,8.214 L75.134,6.972 Z"
                                              id="形状结合"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </router-link>
                </div>
                <div class="article-bar__input-box">
                    <input type="text" maxlength="100" placeholder="请输入文章标题（5~100个字）" class="article-bar__title"
                           v-model="form.title" onkeypress="return event.keyCode != 13;" />
                    <span v-if="(articleBarNumber - form.title.length) > 0" class="article-bar__number">还需要输入{{articleBarNumber - form.title.length}}个字</span>
                </div>
                <div class="article-bar__button-box">
                    <button type="button" class="btn btn-save">保存草稿</button>
                    <button type="button" class="btn btn-publish" @click="submit">发布文章</button>
                </div>
            </div>
            <div class="article-editor">
                <mavon-editor ref="md" style="height: 600px" v-model="form.content" :ishljs="false" @imgAdd="imgAdd" @imgDel="imgDel" @change="change"/>
            </div>
        </form>
    </div>
</template>

<script>
    import crud from '@/mixins/crud'
    import crudMethod from '@/api/system/blog'
    import { uploadImage } from '@/api/system/blog'
    import Config from '@/settings'

    export default {
        name: "Writer",
        mixins: [crud],
        data() {
            return {
                url: 'api/blog',
                params: {
                    id: null,
                },
                isAdd: true,
                articleBarNumber: 5,
                crudMethod: {
                    ...crudMethod
                },
                form: {
                    title: '',
                    content: '',
                    contentHtml: ''
                },
                img_file: {}
            }
        },
        methods: {
            beforeSubmit() {
                this.form.authorization = Config.authorization
                this.form.authorizationUrl = Config.authorizationUrl
            },
            imgAdd(fileName, file) {
                this.img_file[fileName] = file;
                uploadImage(file).then((res) => {
                    this.$refs.md.$img2Url(fileName, res.url);
                })
            },
            imgDel(fileName) {
              delete this.img_file[fileName]
            },
            change(value, render) {
                this.form.contentHtml = render
            },
            submit() {
                this.beforeSubmit()
                if(this.isAdd) {
                    this.crudMethod.add(this.form).then(() => {
                        this.$notify({
                            title: '发布成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.$router.push({path: '/system/articles'})
                    })
                } else {
                    this.crudMethod.edit(this.form).then(res => {
                        this.$notify({
                            title: '修改成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.$router.push({path: '/system/articles'})
                    })
                }
                this.$store.dispatch('tagsView/delView', this.$route)
            }
        },
        created() {
            const id = this.$route.query.articleId
            if(id) {
                this.isAdd = false
                this.params.id = id
                this.init().then(res => {
                    this.form = JSON.parse(JSON.stringify(res.content[0]))
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
