import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function add(data) {
    return request({
        url: 'api/blog',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: 'api/blog',
        method: 'put',
        data
    })
}

export function del(ids) {
    return request({
        url: 'api/blog',
        method: 'delete',
        data: ids
    })
}

export function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file)
    return request({
        url: 'api/blog/uploadImage',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
        },
    })
}

export default { add, edit, del }
