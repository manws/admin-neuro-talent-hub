import store from "@/store"
import { get, reject } from 'lodash'
import { Message } from "element-ui"

export default {
    head: [
        // {
        //     fieldName: '考核名称',
        //     fieldCode: 'scoreTypeName',
        //     align: 'center',
        //     value: ''
        // },
        {
            fieldName: '医疗工作',
            fieldCode: 'level1',
            align: 'center',
            value: ''
        },
        {
            fieldName: '教学工作',
            fieldCode: 'level2',
            align: 'center',
            value: ''
        },
        {
            fieldName: '科研工作',
            fieldCode: 'level3',
            align: 'center',
            value: ''
        },
        {
            fieldName: '人才培养',
            fieldCode: 'level4',
            align: 'center',
            value: ''
        },
        {
            fieldName: '公益工作',
            fieldCode: 'level5',
            align: 'center',
            value: ''
        },
         {
            fieldName: '考核状态',
            fieldCode: 'state',
            align: 'center',
            value: ''
        },
        {
            fieldName: '发布人员',
            fieldCode: 'subBy',
            align: 'center',
            value: ''
        },
        {
            fieldName: '发布时间',
            fieldCode: 'subOn',
            align: 'center',
            value: ''
        },
        {
            fieldName: '结束时间',
            fieldCode: 'endOn',
            align: 'center',
            value: ''
        }
    ],
    getScoreTypeList: async (param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/ScoreType/page`,
                param
            });
            const scoreTypeList = get(res, 'scoreTypeList', []);
            const page = get(res, 'page', { pageIndex: 1, pageSize: 50, totalCount: 0 });
            return { scoreTypeList, page };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { scoreTypeList: [], page: { pageIndex: 1, pageSize: 50, totalCount: 0 } };
    },
    level0List: async() => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/LevelStruct/level0List`,
                param: {}
            });
            const level0StructList = get(res, 'level0StructList', []);
            return { level0StructList };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { level0StructList: [] };

    },
    showScoreStruct: async(scoreTypeId) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/ScoreType/showScoreStruct/${scoreTypeId}`,
                param: {}
            });
            const level2AllDict = get(res, 'level2AllDict', {});
            const scoreStructDict = get(res, 'scoreStructDict', {});
            return { level2AllDict, scoreStructDict };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { scoreStructDict: {}, level2AllDict: {} };

    },
    updateScoreStruct: async(scoreTypeId, param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/ScoreType/updateScoreStruct/${scoreTypeId}`,
                param
            });
            Message.success('更新评分信息信息成功！');
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '更新评分信息信息失败！');
        }
        return false;

    },
    insert: async(param) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/ScoreType/insert`,
                param
            });
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;

    },
    updateState: async(scoreTypeId, state) => {
         try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/ScoreType/updateState/${scoreTypeId}/${state}`,
                param: {}
            });
            Message.success('评分状态更新成功！');
            return true;
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return false;
    }
}
