import request from '@/utils/request'

export function getAllTags() {
    return request({
        url: 'api/tag',
        method: 'get',
    })
}

export function add(data) {
    return request({
        url: 'api/tag',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: 'api/tag',
        method: 'put',
        data
    })
}

export function del(ids) {
    return request({
        url: 'api/tag',
        method: 'delete',
        data: ids
    })
}

export default { add, edit, del }
