import store from "@/store"
import axios from "axios"
import { get, reject } from 'lodash'

import { Message } from "element-ui"

export default {
    clear: async () => {
        await store.dispatch("user/resetToken");
        localStorage.clear();
    },
    login: async param => {
        try {
            await store.dispatch("user/login", param);
            return true
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    logout: async () => {
        try {
            await store.dispatch("user/logout");
            return true
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    changePwd: async param => {
        try {
            await store.dispatch("user/changePwd", param);
            return true
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    projects: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: '/api/v2/Project/page',
                param
            });

            const projectList = get(res, 'projectList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            return { projectList, page };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { projectList: [], page: { pageIndex: 1, pageSize: 50, totalCount: 0 } };
    },
    checkProject: async (dbName) => {
        try {
            const { code, message } = await store.dispatch("handlePost", {
                url: `/api/v2/Project/check/${dbName}`,
            });
            return { code, message };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];
    },
    unEnabledSubject: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/Unenabled/${store.getters.project.projectDB}/${subjectId}`
            });
            
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    subjectList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/page/${store.getters.project.projectDB}`,
                param
            });
            const permission = get(res, 'permission', {});
            const subjectList = get(res, 'subjectList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            return { permission, subjectList, page };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {};
    },
    subjectAdd: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/add/${store.getters.project.projectDB}`,
            });

            return get(res, 'siteList', []);
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];

    },
    subjectSingle: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/single/${store.getters.project.projectDB}/${subjectId}`,
            });

            return get(res, 'siteList', []);
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];

    },
    subjectInsert: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/insert/${store.getters.project.projectDB}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },
    subjectUpdate: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/update/${store.getters.project.projectDB}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },
    siteSubject: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Subject/siteSubject/${store.getters.project.projectDB}`,
            });
            const siteList = get(res, 'siteList', []);
            const subjectList = get(res, 'subjectList', {});
            return { siteList, subjectList };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { siteList, subjectList };

    },

    /**
     * Stati
     * @returns 
     */
    statiPage: async (formId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Stati/page/${store.getters.project.projectDB}/${formId}`,
                param
            });
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            const body = get(res, 'body', []);
            const head = get(res, 'head', []);
            const permission = get(res, 'permission', {});
            return { page, body, head, permission };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { page: { pageIndex: 1, pageSize: 50, totalCount: 0 }, body: [], head: [], permission: {} };
    },
    statiDownload: async (formId) => {
        try {

            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Stati/download/${store.getters.project.projectDB}/${formId}`,
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }

    },

    remindDownload: async ()  => {
        try {

            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Remind/download/${store.getters.project.projectDB}`,
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }

    },


    visitSchedule: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/schedule/${store.getters.project.projectDB}`,
            });
            const visitList = get(res, 'visitList', []);
            const visitSchedule = get(res, 'visitSchedule', []);

            return { visitList, visitSchedule };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { visitList: [], visitSchedule: [] };
    },
    /**
     * visit   /api/v2/Visit/process/{dbName}/{subjectId}
     */
    visitProcess: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/process/${store.getters.project.projectDB}/${subjectId}`,
            });
            const body = get(res, 'body', []);
            const head = get(res, 'head', []);
            const nextList = get(res, 'nextList', []);
            const nFlagAddVisit = get(res, 'nFlagAddVisit', 0);
            const nFlagDeleteLast = get(res, 'nFlagDeleteLast', 0);
            const nFlagFreezeBatch = get(res, 'nFlagFreezeBatch', 0);
            const nFlagLockBatch = get(res, 'nFlagLockBatch', 0);
            const nFlagSignBatch = get(res, 'nFlagSignBatch', 0);
            return {
                body, head, nextList, nFlagAddVisit, nFlagDeleteLast, nFlagFreezeBatch, nFlagLockBatch, nFlagSignBatch
            }
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {
            body: [], head: [], nextList: [], nFlagAddVisit: 0, nFlagDeleteLast: 0, nFlagFreezeBatch: 0, nFlagLockBatch: 0, nFlagSignBatch: 0
        };
    },
    visitAdd: async (subjectId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/add/${store.getters.project.projectDB}/${subjectId}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    visitUpdate: async (subjectId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/update/${store.getters.project.projectDB}/${subjectId}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    visitDeleteLast: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/deleteLast/${store.getters.project.projectDB}/${subjectId}`,
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    visitSignBatch: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/signBatch/${store.getters.project.projectDB}/${subjectId}`,
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    visitFreezeBatch: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/freezeBatch/${store.getters.project.projectDB}/${subjectId}`,
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    visitLockBatch: async (subjectId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/lockBatch/${store.getters.project.projectDB}/${subjectId}`,
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    updateVisitDate: async (subjectId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Visit/updateVisitDate/${store.getters.project.projectDB}/${subjectId}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },


    /**
     * 中心
     */
    siteList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Site/list/${store.getters.project.projectDB}`,
                param
            });
            const siteList = get(res, 'siteList', []);
            const permission = get(res, 'permission', {})
            return {siteList, permission};
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {siteList: [], permission: {}};
    },
    siteSingle: async (siteId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Site/single/${store.getters.project.projectDB}/${siteId}`,
            });

            return get(res, 'siteList', []);
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];

    },
    siteInsert: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Site/insert/${store.getters.project.projectDB}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },
    siteUpdate: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Site/update/${store.getters.project.projectDB}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },



    /**
     * 导出
     */
    exportStruct: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Export/struct/${store.getters.project.projectDB}`,
            });
            const CRFFieldDict = get(res, 'CRFFieldDict', {});
            const visitCRFDict = get(res, 'visitCRFDict', {});
            const visitList = get(res, 'visitList', []);

            return { CRFFieldDict, visitCRFDict, visitList };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { CRFFieldDict: {}, visitCRFDict: {}, visitList: [] };
    },
    exportAll: async (siteId, subjectId) => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/all/${store.getters.project.projectDB}/${siteId}/${subjectId}`,
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return null;
    },
    exportCrfData: async () => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/all/table/${store.getters.project.projectDB}`,
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return null;
    },

    exportCustom: async (siteId, subjectId, param) => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/custom/${store.getters.project.projectDB}/${siteId}/${subjectId}`,
                param
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return null;
    },


    /**
     * 
     * 用户管理部分
     */
    userList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/page/${store.getters.project.projectDB}`,
                param
            });
            const siteList = get(res, 'siteList', []);
            const userList = get(res, 'userList', []);
            const usergroupList = get(res, 'usergroupList', []);
            const permission = get(res, 'permission', {});
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            return { siteList, userList, usergroupList, page, permission };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {siteList: [], userList: [],  usergroupList: [], page: { pageIndex: 1, pageSize: 50, totalCount: 0 }, permission: {} };
    },
    userAdd: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/add/${store.getters.project.projectDB}`,
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
                url: `/api/v2/User/single/${store.getters.project.projectDB}/${userId}`,
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
                url: `/api/v2/User/insert/${store.getters.project.projectDB}`,
                param
            });
            return get(res, 'userId', '');
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
    },
    userUpdate: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/User/update/${store.getters.project.projectDB}`,
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
    },


    /**
     * 
     * remind
     */
    remindList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Remind/page/${store.getters.project.projectDB}`,
                param
            });
            const remindList = get(res, 'remindList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });

            return { remindList, page };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { remindList: [], page: { pageIndex: 1, pageSize: 50, totalCount: 0 } };

    },
    remindCount: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Remind/count/${store.getters.project.projectDB}`,
            });

            return get(res, 'remindCount', '--');
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return '--';

    },


    /**
     * 
     * CrfView---------------------------------------------
     */
    crfView: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/view/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });
            const viewRecord = get(res, 'viewRecord', []);
            const crfHead = get(res, 'crfHead', {});
            const skip = get(res, 'skip', null);
            const codegroup = get(res, 'codegroup', {});
            const violation = get(res, 'violation', null);
            const query = get(res, 'query', null);
            const isAudit = get(res, 'isAudit', 0);
            const permission = get(res, 'permission', {});
            const updateBy = get(res, 'updateBy', '');
            const updateOn = get(res, 'updateOn', '');
            const meddraList = get(res, 'meddraList', {}) ? get(res, 'meddraList', {}) : {}
            return { viewRecord, crfHead, skip, codegroup, violation, query, isAudit, permission, updateBy, updateOn, meddraList };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        // return { viewRecord: [], crfHead: {}, skip: {}, codegroup: {}, violation: {}, query: {}, isAudit: 0, permission: {}, updateBy: '', updateOn: '' };
        return null;
    },

    crfViewEdit: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFEdit/crfEdit/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });
            const viewRecord = get(res, 'editRecord', []);
            const crfHead = get(res, 'crfHead', {});
            const skip = get(res, 'skip', null);
            const codegroup = get(res, 'codegroup', {});
            const score = get(res, 'score', ) || [];
            const meddraList = get(res, 'meddraList', {}) ? get(res, 'meddraList', {}) : {}
            return { viewRecord, crfHead, skip, codegroup, score, meddraList };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return null;
    },

    crfViewUpdate: async (formId, recordId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFEdit/update/${store.getters.project.projectDB}/${formId}/${recordId}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },

    /**
     * 
     * 回复质疑
     */
    operateQuery: async (param) => {
        try {

            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/operateQuery/${store.getters.project.projectDB}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    /**
     * 
     * 回复规则
     */
    responseViolation: async (param) => {
        try {

            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/responseViolation/${store.getters.project.projectDB}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },

    crfSubmit: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/submit/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfAccept: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/accept/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfVerify: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/verify/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfSign: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/sign/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfFreeze: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/freeze/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfLock: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/lock/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfUnlock: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/unlock/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfUnfreeze: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/unfreeze/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfActive: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/active/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfNoactive: async (formId, recordId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/noactive/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    insertQuery: async (formId, recordId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/insertQuery/${store.getters.project.projectDB}/${formId}/${recordId}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },

    responseQuery: async (queryId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/responseQuery/${store.getters.project.projectDB}/${queryId}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    editQuery: async (queryId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/editQuery/${store.getters.project.projectDB}/${queryId}`,
                param
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    closeQuery: async (queryId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/closeQuery/${store.getters.project.projectDB}/${queryId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    deleteQuery: async (queryId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFView/deleteQuery/${store.getters.project.projectDB}/${queryId}`,
            });

            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    crfAudit: async (formId, recordId) => {
        const commonHead = [
            {
                fieldName: '序号',
                fieldCode: 'fieldCode',
                align: 'center',
                value: ''
            },
            {
                fieldName: '字段名称',
                fieldCode: 'fieldName',
                align: 'center',
                value: ''
            }
        ]
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFAudit/crfAudit/${store.getters.project.projectDB}/${formId}/${recordId}`,
            });
            const body = get(res, 'auditBody', []);
            let auditHead = get(res, 'auditHead', []);
            let firstValue = [];
            const appendHead = [];
            if (body.length > 0) {
                firstValue = body[0].value
            }
            firstValue.forEach((key, index) => {
                appendHead.push({
                    fieldName: `第${index + 1}次提交`,
                    fieldCode: `value${index}`,
                    align: 'center',
                    value: '',
                    index
                })
            })
            const head = commonHead.concat(appendHead)
            console.log('head', head)
            return { body, head };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { body: [], head: commonHead };
    },



    /**
     * 
     * crfList
     */
    crfList: async (formId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/CRFList/page/${store.getters.project.projectDB}/${formId}`,
                param
            });
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            const body = get(res, 'body', []);
            const head = get(res, 'head', []);
            const permission = get(res, 'permission', {});
            const codegroup = get(res, 'codegroup', []);
            return { page, body, head, permission, codegroup };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { page: { pageIndex: 1, pageSize: 50, totalCount: 0 }, body: [], head: [], permission: {}, codegroup: [] };
    },

    crfListDownload: async (formId) => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/CRFList/download/${store.getters.project.projectDB}/${formId}`,
                config: {
                    responseType: "blob",
                },
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    /**
     * 
     * Meddra      // const source = axios.CancelToken.source();
     */
    meddraPageList: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/meddraPageList`,
                param
            });
            const meddraList = get(res, 'meddraList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            
            return {meddraList, page};
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {meddraList: [], page: {pageIndex: 1, pageSize: 50, totalCount: 0 }};
    },
    recordMeddraList: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/recordMeddraList/${store.getters.project.projectDB}`,
                param
            });
            const meddraList = get(res, 'meddraList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            
            return {meddraList, page};
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {meddraList: [], page: {pageIndex: 1, pageSize: 50, totalCount: 0 }};
    },
    recordMeddraUpdate: async (formId, recordId, param = {}) => { // 暂时不用
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/recordMeddra/update/${store.getters.project.projectDB}/${formId}/${recordId}`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    matchLLT1List: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/matchLLT1List`,
                param
            });
            const meddraList = get(res, 'meddraList', []);
            
            return meddraList || [];
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];
    },
    matchLLT2List: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/matchLLT2List`,
                param
            });
            const meddraList = get(res, 'meddraList', []);
            
            return meddraList || [];
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];
    },
    meddraList: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/matchLLT0List`,
                param
            });
            const meddraList = get(res, 'meddraList', []);
            
            return meddraList || [];
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return [];
    },
    updateMeddra: async (formId, recordId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Meddra/meddraLocal/update/${store.getters.project.projectDB}/${formId}/${recordId}`,
                param
            });
            
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    subjectExport: async (formId) => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/subject/${store.getters.project.projectDB}`,
                config: {
                    responseType: "blob",
                },
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    siteExport: async (formId) => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/site/${store.getters.project.projectDB}`,
                config: {
                    responseType: "blob",
                },
            });
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },
    userExport: async () => {
        try {
            const {data, fileName} = await store.dispatch("handleDownload", {
                url: `/api/v2/Export/user/${store.getters.project.projectDB}`,
                config: {
                    responseType: "blob",
                },
            });
            
            const link = document.createElement("a")
            const blob = new Blob([data], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    },

    dashboard: async () => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Dashboard/view/${store.getters.project.projectDB}`,
            });
            const nCRFAccept = get(res, 'dashboard.nCRFAccept', 0);
            const nCRFEmpty = get(res, 'dashboard.nCRFEmpty', 0);
            const nCRFFreeze = get(res, 'dashboard.nCRFFreeze', 0);
            const nCRFLock = get(res, 'dashboard.nCRFLock', 0);
            const nCRFLocked = get(res, 'dashboard.nCRFLocked', 0);
            const nCRFNoactive = get(res, 'dashboard.nCRFNoactive', 0);
            const nCRFQuery = get(res, 'dashboard.nCRFQuery', 0);
            const nCRFRecord = get(res, 'dashboard.nCRFRecord', 0);
            const nCRFRule = get(res, 'dashboard.nCRFRule', 0);
            const nCRFSign = get(res, 'dashboard.nCRFSign', 0);
            const nCRFTotal = get(res, 'dashboard.nCRFTotal', 0);
            const nCRFVerify = get(res, 'dashboard.nCRFVerify', 0);
            const nSiteActive = get(res, 'dashboard.nSiteActive', 0);
            const nSiteAll = get(res, 'dashboard.nSiteAll', 0);

            const nSubjectActive = get(res, 'dashboard.nSubjectActive', 0);
            const nSubjectTarget = get(res, 'dashboard.nSubjectTarget', 0);
            const nSubjectTrialFailureOver = get(res, 'dashboard.nSubjectTrialFailureOver', 0);
            const nSubjectTrialOver = get(res, 'dashboard.nSubjectTrialOver', 0);
            const nSubjectTrialSuccessOver = get(res, 'dashboard.nSubjectTrialSuccessOver', 0);
            const nSubjectTrialing = get(res, 'dashboard.nSubjectTrialing', 0);
            const siteProcessList = get(res, 'dashboard.siteProcessList', []);
            const subjectIncreMonthList = get(res, 'dashboard.subjectIncreMonthList', []);
            const subjectSingleMonthList = get(res, 'dashboard.subjectSingleMonthList', []);

            return {
                nCRFAccept,
                nCRFEmpty,
                nCRFFreeze,
                nCRFLock,
                nCRFLocked,
                nCRFNoactive,
                nCRFQuery,
                nCRFRecord,
                nCRFRule,
                nCRFSign,
                nCRFTotal,
                nCRFVerify,
                nSiteActive,
                nSiteAll,
                nSubjectActive,
                nSubjectTarget,
                nSubjectTrialFailureOver,
                nSubjectTrialOver,
                nSubjectTrialSuccessOver,
                nSubjectTrialing,
                siteProcessList,
                subjectIncreMonthList,
                subjectSingleMonthList
            };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return {
            nCRFAccept: 0,
            nCRFEmpty: 0,
            nCRFFreeze: 0,
            nCRFLock: 0,
            nCRFLocked: 0,
            nCRFNoactive: 0,
            nCRFQuery: 0,
            nCRFRecord: 0,
            nCRFRule: 0,
            nCRFSign: 0,
            nCRFTotal: 0,
            nCRFVerify: 0,
            nSiteActive: 0,
            nSiteAll: 0,
            nSubjectActive: 0,
            nSubjectTarget: 0,
            nSubjectTrialFailureOver: 0,
            nSubjectTrialOver: 0,
            nSubjectTrialSuccessOver: 0,
            nSubjectTrialing: 0,
            siteProcessList: [],
            subjectIncreMonthList: [],
            subjectSingleMonthList: []
        };
    },

    score: async (scaleName, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/Score/scale/${scaleName}`,
                param
            });
            const score = get(res, 'score', 0);
            return score;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return 0;
    },



}