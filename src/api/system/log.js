import request from '@/utils/request'

export function getAllError() {
    return request({
        url: 'api/logs/error',
        method: 'get'
    })
}

export function queryErrorLogDetail(id) {
    return request({
        url: `api/logs/error/${id}`,
        method: 'get'
    })
}

export function queryUserLog() {
    return request({
        url: 'api/logs/user',
        method: 'get'
    })
}

export function delAllInfo() {
    return request({
        url: 'api/logs/del/info',
        method: 'delete'
    })
}

export function delAllError() {
    return request({
        url: 'api/logs/del/error',
        method: 'delete'
    })
}
