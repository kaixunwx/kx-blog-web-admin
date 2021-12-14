import request from '@/utils/request'
import qs from 'qs'

export function getAllTypes() {
    const params = {
        sort: ['createTime,desc']
    }
    return request({
        url: 'api/type?' + qs.stringify(params, { indices: false}),
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
