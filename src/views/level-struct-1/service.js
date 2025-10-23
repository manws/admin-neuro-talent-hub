import store from "@/store"
import { get, reject } from 'lodash'
import { Message } from "element-ui"

export default {
    head: [ // 考核三级名称、考核内容、考核标准、备注、更新人员、更新时间
        {
            fieldName: '考核一级名称',
            fieldCode: 'level0Name',
            align: 'center',
            value: ''
        },
         {
            fieldName: '考核二级名称',
            fieldCode: 'level1Name',
            align: 'center',
            value: ''
        },
        {
            fieldName: '备注',
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
  level2List: async (level0Id) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/LevelStruct/level2List/${level0Id}`,
        param: {}
      });
      const level2StructList = get(res, 'level2StructList', []);
      return { level2StructList };
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return { level2StructList: [] };

  },
  addLevel2: async (level0Id) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/LevelStruct/addLevel2/${level0Id}`,
        param: {}
      });
      const level1StructList = get(res, 'level1StructList', []) || [];
      return { level1StructList };
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return { level1StructList: [] };

  }
}
