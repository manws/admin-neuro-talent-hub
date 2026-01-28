import store from "@/store"
import {get, reject} from 'lodash'
import {Message} from "element-ui"

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
      fieldName: '考核内容',
      fieldCode: 'level0Name',
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
      fieldName: '补充说明',
      fieldCode: 'remark',
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

  // 分页获取用户评分
  page: async (param = {}) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/UserScoreRemark/page`,
        param
      });
      const userScoreRemarkList = get(res, 'userScoreRemarkList', []) || [];
      return userScoreRemarkList;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return [];
  },

  activeSTList: async () => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `api/v2/ScoreType/activeSTList`,
      });
      const scoreTypeList = get(res, 'scoreTypeList', []) || [];
      return scoreTypeList;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return [];
  },
  level0List: async () => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/LevelStruct/level0List`,
        param: {}
      });
      const level0StructList = get(res, 'level0StructList', []) || [];
      return level0StructList;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return [];

  }
}
