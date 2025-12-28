<template>
  <el-drawer :title="row.scoreTypeName" :custom-class="'draw-container'" class="drawer-container"
             :visible.sync="showDrawer" :size="drawerWidth" direction="rtl" :destroy-on-close="true" wrapperClosable
             :before-close="handleClose" @close="close">
    <div class="flex-style-column drawer-body" v-loading="bodyLoading">
      <div class="line"></div>
      <div v-if="!bodyLoading" class="content">
        <template v-for="(item, index) in level0StructList">
          <div style="line-height: 48px;font-size: 18px;">{{ item.level0Name }}</div>
          <el-upload
            class="upload"
            :headers="headers"
            accept=".doc,.docx"
            :action="`https://snscore.xhedc.com/api/v2/ScoreType/uploadContent/${scoreTypeId}/${item.id}`"
            :file-list="fileList"
            :on-success="onSuccess">
            <el-button size="small" type="primary">{{ row[`level${item.id}Content`] ? "重新上传" : "点击上传" }}</el-button>
            <div slot="tip" class="el-upload__tip">只能上传word文件，且不超过5MB</div>
          </el-upload>
        </template>
        <div class="flex-style-base" style="height: 100px; justify-content: center; color: #cdcdcd">
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
          <span style="margin: 0 16px">到底了</span>
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>

import service from "./service.js";
import {getToken} from "@/utils/auth";
import {flagToken} from "@/settings";

export default {
  components: {},
  data() {
    return {
      showDrawer: false,
      bodyLoading: false,
      scoreTypeId: '',
      level0StructList: [],
      row: {},
      fileList: []
    };
  },
  computed: {
    headers: function () {
      const token = getToken()
      const header = {}
      header[flagToken] = token
      return header
    },
    drawerWidth() {
      // 获取屏幕宽度
      const screenWidth = window.innerWidth;
      // 计算50%屏幕宽度
      const halfScreenWidth = screenWidth * 0.5;
      // 最大宽度800px，最小宽度为屏幕的50%
      const width = Math.min(1000, Math.max(halfScreenWidth, 400));
      return `${width}px`;
    }
  },
  methods: {
    resetData() {
      this.showDrawer = false;
      this.bodyLoading = false;

    },
    async openDrawer(row, isEdit) {
      this.row = row
      this.scoreTypeId = row.id
      this.resetData();
      this.showDrawer = true;
      this.initData();
    },
    async initData() {
      this.bodyLoading = true;
      const {level0StructList} = await service.level0List();
      this.level0StructList = level0StructList
      this.bodyLoading = false
    },
    onSuccess(response, file, fileList) {
      this.$emit('refresh')
    },
    close() {

    },
    handleClose(done) {
      done();
    },
    closeDrawer() {
      this.showDrawer = false;
    },
  },
};
</script>

<style lang="scss">
.draw-container {
  .el-drawer__header {
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    font-weight: 600;
    padding: 12px;
    margin-bottom: 0;
  }
}
</style>

<style scoped lang="scss">
.upload {
  margin-bottom: 32px;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
}

.drawer-body {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.content {
  height: 0;
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  padding-left: 16px;
  padding-right: 32px;
  padding-top: 16px;
}

.item-name {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
}

.foot {
  width: 100%;
  height: 64px;
  background-color: #f8f8f8;
  padding: 0 21px;
  justify-content: flex-end;
}

.btn-cancel {
  width: 100px;
}

.empty {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 1000;

  .btn-retry {
    background-color: #0099ff;
    opacity: 0.8;
  }

  .btn-retry:hover {
    opacity: 1;
  }
}
</style>
