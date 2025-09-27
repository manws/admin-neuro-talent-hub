import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)
import Layout from "@/layout"
import { businessRouter } from "./modules/route"
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch((err) => err)
}

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
    {
        path: "/redirect",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index"),
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index"),
        hidden: true,
        meta: { title: "登录" },
    },
    {
        path: "/change-pwd",
        name: "change-pwd",
        component: () => import("@/views/change-pwd/index"),
        hidden: true,
        meta: {
            title: "修改密码",
        },
    },
    {
        path: "/auth-redirect",
        component: () => import("@/views/login/auth-redirect"),
        hidden: true,
    },
    {
        path: "/404",
        component: () => import("@/views/error-page/404"),
        hidden: true,
    },
    {
        path: "/401",
        component: () => import("@/views/error-page/401"),
        hidden: true,
    },
    {
        path: "/",
        component: Layout,
        redirect: "/score-type",
        children: [
            {
                path: "score-type",
                component: () => import("@/views/score-type/index"),
                name: "ScoreType",
                meta: { title: "考核信息管理", icon: "menu-dashboard", affix: true },
            },
        ],
    },
    {
        path: "/user-score",
        component: Layout,
        hidden: false,
        children: [
            {
                path: "index",
                component: () => import("@/views/user-score/index"),
                name: "Icons",
                meta: { title: "人员考核结果", icon: "form", noCache: true },
            },
        ],
    },
    {
        path: "/level-struct",
        component: Layout,
        hidden: false,
        meta: { title: "考核字典", icon: "chart", noCache: true },
        children: [
            {
                path: "dict-1",
                component: () => import("@/views/level-struct/index"),
                name: "Icons",
                meta: { title: "考核一级字典", icon: "nested", noCache: true },
            },
             {
                path: "dict-2",
                component: () => import("@/views/level-struct-1/index"),
                name: "Icons",
                meta: { title: "考核二级字典", icon: "nested", noCache: true },
            },
             {
                path: "dict-3",
                component: () => import("@/views/level-struct-2/index"),
                name: "Icons",
                meta: { title: "考核三级字典", icon: "nested", noCache: true },
            },
        ],
    },
    {
        path: "/user",
        component: Layout,
        hidden: false,
        children: [
            {
                path: "index",
                component: () => import("@/views/user/index"),
                name: "User",
                meta: { title: "用户管理", icon: "peoples", noCache: true },
            },
        ],
    },
    {
        path: "/icon",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "index",
                component: () => import("@/views/icons/index"),
                name: "Icons",
                meta: { title: "icons", icon: "icon", noCache: true },
            },
        ],
    },
]

/**
 * 异步路由
 */
export const asyncRoutes = []

const createRouter = () =>
    new Router({
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    })

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
