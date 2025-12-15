import store from "@/store"
import { get, reject } from 'lodash'
import { Message } from "element-ui"

// 	字段：考核名称，考核人员，总评分、医疗工作评分、教学工作评分、科研工作评分、人才培养评分、公益工作评分、更新时间、更新人员。
// 	检索字段：考核名称、考核人员。
// 	整体操作：数据导出。
export default {
    head: [ // 考核三级名称、考核内容、考核标准、备注、更新人员、更新时间
        {
            fieldName: '考核名称',
            fieldCode: 'scoreTypeName',
            align: 'center',
            value: ''
        },
        {
            fieldName: '考核人员',
            fieldCode: 'userName',
            align: 'center',
            value: ''
        },
        {
            fieldName: '总评分',
            fieldCode: 'tsAll',
            align: 'center',
            value: ''
        },
        {
            fieldName: '医疗工作评分',
            fieldCode: 'ts01',
            align: 'center',
            value: ''
        },
        {
            fieldName: '教学工作评分',
            fieldCode: 'ts02',
            align: 'center',
            value: ''
        },
        {
            fieldName: '科研工作评分',
            fieldCode: 'ts03',
            align: 'center',
            value: ''
        },
        {
            fieldName: '人才培养评分',
            fieldCode: 'ts04',
            align: 'center',
            value: ''
        },
        {
            fieldName: '公益工作评分',
            fieldCode: 'ts05',
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

    // UserScore API 接口
    // 获取用户评分列表（微信列表）
    wxList: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/wxList`,
                param
            });
            const userScoreList = get(res, 'userScoreList', []) || [];
            const total = get(res, 'total', 0) || 0;
            return { userScoreList, total };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { userScoreList: [], total: 0 };
    },

    // 获取用户评分列表（最后一次）
    wxLast: async (param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/wxLast`,
                param
            });
            const userScoreList = get(res, 'userScoreList', []) || [];
            const lastUpdateTime = get(res, 'lastUpdateTime', '') || '';
            return { userScoreList, lastUpdateTime };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { userScoreList: [], lastUpdateTime: '' };
    },

    // 插入用户评分
    insertUserScore: async (userScoreId, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/Insert/${userScoreId}`,
                param
            });
            Message.success('插入成功');
            const success = get(res, 'success', false) || false;
            const message = get(res, 'message', '') || '';
            return { success, message };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '插入失败');
        }
        return { success: false, message: '插入失败' };
    },

    // 更新用户评分
    updateUserScore: async (scoreTypeId, level0Id, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/update/${scoreTypeId}/${level0Id}`,
                param
            });
            Message.success('更新成功');
            const success = get(res, 'success', false) || false;
            const updatedData = get(res, 'data', {}) || {};
            const message = get(res, 'message', '') || '';
            return { success, updatedData, message };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '更新失败');
        }
        return { success: false, updatedData: {}, message: '更新失败' };
    },

    // 获取单个L0级别评分
    singleL0: async (scoreTypeId, level0Id, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/singleL0/${scoreTypeId}/${level0Id}`,
                param
            });
            const level0Score = get(res, 'level0Score', {}) || {};
            const subScores = get(res, 'subScores', []) || [];
            const totalScore = get(res, 'totalScore', 0) || 0;
            return { level0Score, subScores, totalScore };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { level0Score: {}, subScores: [], totalScore: 0 };
    },

    // 分页获取用户评分
  page: async (param = {}) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/UserScore/page`,
        param
      });
      const scoreTypeList = get(res, 'scoreTypeList', []) || [];
      return { scoreTypeList };
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return { scoreTypeList: [] };
  },

  activeScoreTypeList: async () => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `api/v2/ScoreType/activeScoreTypeList`,
      });
      const scoreTypeList = get(res, 'scoreTypeList', []) || [];
      return scoreTypeList;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return [];
  },

    // 获取单个用户所有评分
    singleAll: async (userId, scoreTypeId, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/singleAll/${userId}/${scoreTypeId}`,
                param
            });
            const level2Data = get(res, 'level2Data', {}) || {};
            return { level2Data };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { level2Data: {} };
    },
    level0List: async () => {
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

    // 获取单个用户所有L1级别评分
    singleAllL1: async (scoreTypeId, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/singleAllL1/${scoreTypeId}`,
                param
            });
            const level1ScoreList = get(res, 'level1ScoreList', []) || [];
            const scoreTypeInfo = get(res, 'scoreTypeInfo', {}) || {};
            const summary = get(res, 'summary', {}) || {};
            return { level1ScoreList, scoreTypeInfo, summary };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { level1ScoreList: [], scoreTypeInfo: {}, summary: {} };
    },

    // 获取单个用户所有L2级别评分
    singleAllL2: async (scoreTypeId, param = {}) => {
        try {
            const res = await store.dispatch("handlePost", {
                url: `/api/v2/UserScore/singleAllL2/${scoreTypeId}`,
                param
            });
            const level2ScoreList = get(res, 'level2ScoreList', []) || [];
            const scoreTypeInfo = get(res, 'scoreTypeInfo', {}) || {};
            const statistics = get(res, 'statistics', {}) || {};
            return { level2ScoreList, scoreTypeInfo, statistics };
        } catch (error) {
            console.log('error', error);
            Message.error(error && typeof error === 'string' ? error : '请求失败');
        }
        return { level2ScoreList: [], scoreTypeInfo: {}, statistics: {} };
    },

  scoreExport: async (param) => {
    try {
      const {data, fileName} = await store.dispatch("handleDownload", {
        url: `/api/v2/UserScore/exportData`, param
      });
      const link = document.createElement("a")
      const blob = new Blob([data], { type: "application/vnd.ms-excel" })
      link.style.display = "none"
      link.href = URL.createObjectURL(blob)
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      Message.success('导出成功');
    } catch (error) {
      console.log(error, 'error 23456')
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
  },

  // 获取单个用户所有L2级别评分
  contentShow: async (scoreTypeId, level0Id, param = {}) => {
    try {
      const userId = store.getters.user.userId
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/Content/contentShow/${userId}/${scoreTypeId}/${level0Id}`,
        param
      });
      console.log('res', res);
      return res;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return {level2ScoreList: [], scoreTypeInfo: {}, statistics: {}};
  }
}
