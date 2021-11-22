import request from '@/utils/request'

export function editUser(data) {
    return request({
        url: 'api/user/update/',
        method: 'post',
        data
    })
}

export function updateEmail(form) {
    const data = {
        email: form.email,
        code: form.code,
        uuid: form.uuid
    }
    return request({
        url: 'api/user/updateEmail/',
        method: 'post',
        data
    })
}
