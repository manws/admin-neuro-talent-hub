import { constantRoutes } from "@/router"
import Layout from "@/layout"
import dynamicRouter from "@/router/modules/route.js"
import defaultSettings from "@/settings"
const { flag, isRemoteRoute } = defaultSettings

const state = {
    routes: [],
    addRoutes: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
}

const actions = {
    /**
     * 生成路由
     */
    generateRoutes({ commit }, menus) {
        return new Promise((resolve) => {
            const accessedRoutes = []
            if (isRemoteRoute) {
                addDynamicRouter(accessedRoutes, menus)
            }
            accessedRoutes.push({ path: "*", redirect: "/404", hidden: true })
            commit("SET_ROUTES", accessedRoutes)
            resolve(accessedRoutes)
        });
    },
}


function addDynamicRouter(accessedRoutes, menus) {
    menus.forEach((item) => {
        if (item.childMenuList && item.childMenuList.length > 0) {
            const children = []
            item.childMenuList.forEach((it) => {
                console.log('[permission,addDynamicRouter],urlModel', item.urlModel);
                const routeComponent = !!dynamicRouter[it.urlModel] ? dynamicRouter[it.urlModel] : dynamicRouter[item.urlModel]
                if (!!routeComponent) {
                    const childrenRoute = {
                        path: `/${dynamicRouter[item.urlModel].path}/${flag}-${it.menuId}`,
                        component: routeComponent.component,
                        name: `${item.urlModel}-${it.menuId}`,
                        noCache: true,
                        meta: {
                            title: it.menuName,
                            formId: it.formId,
                        },
                    }
                    children.push(childrenRoute)
                }
            })
            const route = {
                component: Layout,
                path: `/${dynamicRouter[item.urlModel].path}/${flag}-` + item.menuId,
                name: item.urlModel,
                alwaysShow: true,
                redirect: "noRedirect",
                meta: {
                    title: item.menuName,
                    icon: dynamicRouter[item.urlModel].icon || "table",
                    formId: item.formId,
                },
                children: children,
            }
            accessedRoutes.push(route)
        } else {
            if (dynamicRouter[item.urlModel] && item.urlModel != 'dashboard') {
                const route = {
                    component: Layout,
                    path: `/${flag}-` + "parent-" + item.menuId,
                    redirect: "noRedirect",
                    children: [
                        {
                            path: `/${dynamicRouter[item.urlModel].path}/${flag}-` + item.menuId,
                            component: dynamicRouter[item.urlModel].component,
                            name: `${item.urlModel}`,
                            noCache: true,
                            meta: {
                                title: item.menuName,
                                icon: dynamicRouter[item.urlModel].icon || "table",
                                formId: item.formId,
                            },
                        },
                    ],
                }
                accessedRoutes.push(route)
            }
        }
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
