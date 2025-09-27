import store from "@/store"
import axios from "axios"
import { get, reject } from 'lodash'
import { Message } from "element-ui"

export default {
    head: [
        {
            fieldName: '账号',
            fieldCode: 'userCode',
            align: 'center',
            value: ''
        },
        {
            fieldName: '用户名',
            fieldCode: 'userName',
            align: 'center',
            value: ''
        },
        {
            fieldName: '权限',
            fieldCode: 'usergroupId',
            align: 'center',
            value: ''
        },
        {
            fieldName: '手机号',
            fieldCode: 'phone',
            align: 'center',
            value: ''
        },
        {
            fieldName: '邮箱',
            fieldCode: 'email',
            align: 'center',
            value: ''
        },
        {
            fieldName: '是否激活',
            fieldCode: 'enabled',
            align: 'center',
            value: ''
        },
        {
            fieldName: '更新人员',
            fieldCode: 'updateBy',
            align: 'center',
            value: ''
        },
        {
            fieldName: '更新时间',
            fieldCode: 'updateOn',
            align: 'center',
            value: ''
        }
    ],


    /**
     * 
     * 用户管理部分
     */
    userList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/page`,
                param
            });
            const siteList = get(res, 'siteList', []) || [];
            const userList = get(res, 'userList', []) || [];
            const usergroupList = get(res, 'usergroupList', []) || [];
            const permission = get(res, 'permission', {}) || {};
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            return { siteList, userList, usergroupList, page, permission };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { siteList: [], userList: [], usergroupList: [], page: { pageIndex: 1, pageSize: 50, totalCount: 0 }, permission: {} };
    },
    userAdd: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/add`,
            });

            return get(res, 'siteList', []);
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];

    },
    userSingle: async (userId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/single/${userId}`,
            });

            return get(res, 'siteList', []);
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];

    },
    userInsert: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/insert`,
                param
            });
            return get(res, 'userId', '');
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
    },
    userUpdate: async (id, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/update/${id}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },
    resetPwd: async (userId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/resetPwd/${userId}`,
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    }
}
