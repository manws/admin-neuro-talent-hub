const getters = {
    sidebar: (state) => state.app.sidebar,
    language: (state) => state.app.language,
    size: (state) => state.app.size,
    device: (state) => state.app.device,
    visitedViews: (state) => state.tagsView.visitedViews,
    cachedViews: (state) => state.tagsView.cachedViews,
    token: (state) => state.user.token,
    permission_routes: (state) => state.permission.routes,
    errorLogs: (state) => state.errorLog.logs,
    user: (state) => state.user.user,
    menus: (state) => state.business.menus,
    project: (state) => state.business.project,
    notifications: (state) => state.business.notifications,
    currentRoute: (state) => state.app.currentRoute,
    settings: (state) => state.settings.defaultSettings,
}
export default getters
