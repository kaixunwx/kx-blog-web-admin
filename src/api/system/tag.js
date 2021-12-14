import request from '@/utils/request'
import qs from 'qs'

export function getAllTags() {
    const params = {
        sort: ['createTime,desc']
    }
    return request({
        url: 'api/tag?' + qs.stringify(params, { indices: false }),
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
