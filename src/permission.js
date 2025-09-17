import router from "./router"
import store from "./store"
import { Message } from "element-ui"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
NProgress.configure({
    showSpinner: false,
})
import { getToken } from "@/utils/auth"
import getPageTitle from "@/utils/get-page-title"

import defaultSettings from "@/settings"
const { isRemoteRoute } = defaultSettings

// 不需要重定向到登录界面的白名单
const whiteList = ["/login", "/change-pwd", "/auth-redirect"]
// 路由跳转不需要projectDB
const whiteListPro = ["/login", "/change-pwd", "/project", "/auth-redirect"]

/**
 * 这里是对路由切换的监听,路由发生变化的时候都会执行此处的代码
 */
router.beforeEach(async (to, from, next) => {
    store.commit("app/SET_CURRENT_ROUTE", to)
    NProgress.start()
    // 设置HTML标题
    document.title = getPageTitle(to.meta.title)

    // 检查token是否存在,token存在可以等价于用户已登录过系统
    const hasToken = getToken()

    if (hasToken) {
        // 开启了服务器获取菜单
        if (isRemoteRoute) {
            // 此处检查是否获取到菜单,如果没有菜单那么需要重新获取
            const hasMenus = store.getters.menus && store.getters.menus.length > 0;
            if (hasMenus) {
                next()
            } else {
                try {
                    // 获取菜单
                    const parentMenuList = await store.dispatch(
                        "business/handleMenus"
                    )
                    // 获取需要显示的路由
                    const accessRoutes = await store.dispatch(
                        "permission/generateRoutes",
                        parentMenuList
                    )
                    // 动态添加路由
                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    // 清除token信息跳转到登录界面,让用户自动重新登录
                    await store.dispatch("user/resetToken")
                    Message.error(error || "初始化菜单失败，请联系管理员。")
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        } else {
            // 如果不需要从服务器获取菜单，那么显示本地路由
            let routeList = store.getters.permission_routes
            if (routeList && routeList.length > 0) {
                next()
            } else {
                const accessRoutes = await store.dispatch(
                    "permission/generateRoutes",
                    null
                )
                router.addRoutes(accessRoutes)
                next({ ...to, replace: true })
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果跳转的就是登录界面直接next()
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
});
