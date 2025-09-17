import request from "@/utils/request"
import store from "@/store"

export function login(data) {
    return request({
        url: "/api/v2/User/login",
        method: "post",
        data,
    })
}

export function getMenus() {
    return request({
        url: "/api/v2/Menu/list/" + store.getters.project.projectDB,
        method: "post",
    })
}

export function logout() {
    return request({
        url: "/api/v2/User/logout",
        method: "post",
    })
}

export function changePwd(data) {
    return request({
        url: "/api/v2/User/changePwd",
        method: "post",
        data,
    })
}
