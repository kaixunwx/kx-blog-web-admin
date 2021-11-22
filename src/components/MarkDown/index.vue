<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: 'Markdown',
        data() {
            return {
                content: ''
            }
        },
        // computed: {
        //     ...mapGetters([
        //         'imagesUploadApi',
        //         'baseApi'
        //     ])
        // },
        methods: {
            changeInput() {
                this.$emit('refreshContent', this.content)
            }
        }
    }
</script>

<style scoped>

</style>
