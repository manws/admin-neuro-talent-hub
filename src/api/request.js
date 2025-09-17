import request from "@/utils/request"
import store from "../store"

export const postRequest = (url, data = {}, config) => {
    return request(
        Object.assign(
            {
                url,
                data,
                method: "post",
            },
            config
        )
    )
}

export const getRequest = (url, params = {}, config) => {
    return request(
        Object.assign(
            {
                url,
                params,
                method: "get",
            },
            config
        )
    )
}

export const putRequest = (url, data = {}, config) => {
    return request(
        Object.assign(
            {
                url,
                data,
                method: "put",
            },
            config
        )
    )
}

export const deleteRequest = (url, data = {}, config) => {
    return request(
        Object.assign(
            {
                url,
                data,
                method: "delete",
            },
            config
        )
    )
}

export const downloadRequest = (url, data = {}, config) => {
    const downloadKey = crypto.randomUUID()
    return request(
        Object.assign(
            {
                url,
                data,
                method: "post",
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {

                    const totalLength = progressEvent.lengthComputable
                       ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength !== null) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / totalLength);
                        const contentDisposition = progressEvent.target.getResponseHeader('content-disposition')
                         store.dispatch(
                            "business/handleNotification",
                            {
                                downloadKey,
                                percentage: percentCompleted,
                                title: getFilenameFromContentDisposition(contentDisposition),
                              },
                        )

                        if (percentCompleted >= 100) {
                            setTimeout(() => {
                                store.dispatch(
                                    "business/closeNotification",
                                    {
                                        key: downloadKey,
                                      },
                                )
                            }, 1000)

                            // setTimeout(() => {
                            //     store.dispatch(
                            //         "business/handleNotification",
                            //         {
                            //             downloadKey,
                            //             percentage: percentCompleted,
                            //             title: getFilenameFromContentDisposition(contentDisposition),
                            //             blob: progressEvent.target.response
                            //           },
                            //     )
                            // }, 300)
                        }
                    }
                }
            },
            config
        )
    )
}

function getFilenameFromContentDisposition(contentDisposition) {
    if (!contentDisposition) {
        return ''
    }
    let filename = '';
    // 先尝试匹配 filename*=UTF-8'' 格式
    const matchEncoded = contentDisposition.match(/filename\*=UTF-8''([^;]+)/);
    if (matchEncoded) {
        filename = decodeURIComponent(matchEncoded[1]);
    } else {
        // 若没有匹配到，再尝试匹配普通的 filename 格式
        const match = contentDisposition.match(/filename=([^;]+)/);
        if (match) {
            filename = match[1].replace(/"/g, '');
        }
    }
    return filename;
}
