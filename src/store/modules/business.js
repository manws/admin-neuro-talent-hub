import { getMenus } from "@/api/user"
import _ from "lodash"
const state = {
    menus: [],
    project: localStorage.getItem("Project") ? JSON.parse(localStorage.getItem("Project")) : {},
    notifications: []
}

const mutations = {
    SET_MENUS: (state, menus) => {
        state.menus = menus
    },
    SET_PROJECT: (state, project) => {
        state.project = project
        localStorage.setItem("Project", JSON.stringify(project))
    },
    SET_NOTIFICATION: (state, notifications) => {
        state.notifications = notifications
    },
}

const actions = {
    handleMenus({ commit, state }) {
        return new Promise((resolve, reject) => {
            getMenus()
                .then((response) => {
                    const { code, message, result } = response.data
                    if (code !== 200) {
                        reject(message)
                    } else {
                        const menuList =  _.get(result, 'menuList', [])
                        commit("SET_MENUS", _.get(result, 'menuList', []))
                        resolve(menuList)
                    }
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    handleNotification({ commit, state }, {downloadKey, percentage, title = '', blob}) {
        const findNotification = state.notifications.find(item => item.key === downloadKey)
        console.log('[blob]', blob)
        if (findNotification) {
            findNotification.percentage = percentage
            if (blob) {
                findNotification.blob = blob
            }
        } else {
            state.notifications.push({
                key: downloadKey,
                title,
                percentage,
                blob
            })
        }
        commit("SET_NOTIFICATION", state.notifications)
    },
    closeNotification({ commit, state }, notification) {
        const notifications = state.notifications.filter(item => item.key != notification.key)
        commit("SET_NOTIFICATION", notifications)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
