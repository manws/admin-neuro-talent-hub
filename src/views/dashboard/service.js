import store from "@/store"
import {get, reject} from 'lodash'
import {Message} from "element-ui"

export default {
  dashboard: async (scoreTypeId) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/Dashboard/dashboard/${scoreTypeId}`,
        param: {}
      });
      const dashboard = get(res, 'dashboard', {});
      return dashboard;
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return {};

  },
  activeSTList: async () => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/Dashboard/activeSTList`,
        param: {}
      });
      const scoreTypeList = get(res, 'scoreTypeList', []);
      return { scoreTypeList };
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return {scoreTypeList: []};

  },
  noJoinList: async (scoreTypeId) => {
    try {
      const res = await store.dispatch("handlePost", {
        url: `/api/v2/Dashboard/noJoinList/${scoreTypeId}`,
        param: {}
      });
      const scoreTypeList = get(res, 'scoreTypeList', []);
      return {scoreTypeList};
    } catch (error) {
      console.log('error', error);
      Message.error(error && typeof error === 'string' ? error : '请求失败');
    }
    return {scoreTypeList: []};

  }
}
