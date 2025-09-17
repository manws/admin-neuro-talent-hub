import axios from "axios"
import { getToken, setToken } from "@/utils/auth"
import { flagToken } from "@/settings"

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5 * 60 * 1000, // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers[flagToken] = getToken()
        }
        return config
    },
    (error) => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const { data, status } = response
        if (status === 200 && response.headers[flagToken]) {
            setToken(response.headers[flagToken])
        }

        // 下载附件的情况
        if (data.type) {
            let fileName = Date.now() + '.xlsx'
            if (response.headers['content-disposition']) {
                let splitArr = decodeURI(response.headers['content-disposition']).split('UTF-8')
                if (splitArr.length >= 2) {
                fileName = splitArr[1].replace('\'\'', '')
                }
            }
            return {
                data,
                fileName
            }
        }

        const { code, message } = data

        // 检查是否有返回值
        if (code === 255) {
            window.onTokenInvalid()
            return Promise.reject(message)
        }

        // 错误提示
        if (code !== 200) {
            // Message.error(message)
        }
        return {
            data,
            status,
            message
        }
    },
    (error) => {
        // Message({
        //     message: error.message,
        //     type: "error",
        //     duration: 5 * 1000,
        // })
        return Promise.reject(error)
    }
)

export default service
