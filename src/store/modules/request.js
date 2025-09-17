import {
    postRequest,
    getRequest,
    putRequest,
    deleteRequest,
    downloadRequest,
} from "@/api/request.js"

const state = {}

const mutations = {}

const actions = {
    handlePost({ commit }, source) {
        return new Promise((resolve, reject) => {
            postRequest(source.url, source.param, source.config)
                .then(
                    (res) => {
                        const { code, message, result } = res.data
                        if (source.url.indexOf('/Project/check') > -1) {
                            resolve({code, message});
                        } else {
                            if (code === 200) {
                                resolve(result)
                            } else {
                                reject(message)
                            }
                        }
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((e) => {
                    reject(e)
                });
        })
    },
    handleGet({ commit }, source) {
        return new Promise((resolve, reject) => {
            getRequest(source.url, source.param, source.config)
                .then(
                    (res) => {
                        const { code, message, result } = res.data
                        if (code === 200) {
                            resolve(result)
                        } else {
                            reject(message)
                        }
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((e) => {
                    reject(e)
                });
        })
    },
    handlePut({ commit }, source) {
        return new Promise((resolve, reject) => {
            putRequest(source.url, source.param, source.config)
                .then(
                    (res) => {
                        const { code, message, result } = res.data
                        if (code === 200) {
                            resolve(result)
                        } else {
                            reject(message)
                        }
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((e) => {
                    reject(e)
                });
        })
    },
    handleDelete({ commit }, source) {
        return new Promise((resolve, reject) => {
            deleteRequest(source.url, source.param, source.config)
                .then(
                    (res) => {
                        const { code, message, result } = res.data
                        if (code === 200) {
                            resolve(result)
                        } else {
                            reject(message)
                        }
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((e) => {
                    reject(e)
                });
        })
    },
    handleDownload({ commit }, source) {
        return new Promise((resolve, reject) => {
            downloadRequest(source.url, source.param)
                .then(
                    (res) => {
                        resolve(res)
                    },
                    (err) => {
                        reject(err)
                    }
                )
                .catch((e) => {
                    reject(e)
                });
        })
    },
}

export default {
    namespaced: false,
    state,
    mutations,
    actions,
}
