import request from '@/utils/request'

export function getAllTypes() {
    return request({
        url: 'api/type',
        method: 'get',
    })
}

export function add(data) {
    return request({
        url: 'api/type',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: 'api/type',
        method: 'put',
        data
    })
}

export function del(ids) {
    return request({
        url: 'api/type',
        method: 'delete',
        data: ids
    })
}

export default { add, edit, del }
