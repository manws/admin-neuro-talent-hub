<template>
  <el-drawer :title="row.scoreTypeName" :custom-class="'draw-container'" class="drawer-container" :visible.sync="showDrawer"
    size="75%" direction="rtl" :destroy-on-close="true" wrapperClosable :before-close="handleClose" @close="close">
    <div class="flex-style-column drawer-body" v-loading="bodyLoading">
      <div class="line"></div>
      <div v-if="!bodyLoading" class="content">
        <template v-for="(item, index) in level0StructList">
          <div v-if="row['level' + item.id] === 1">
            <div class="item-name">{{ item.level0Name }}</div>
            <el-checkbox-group v-model="param[item.id]">
              <el-checkbox v-for="(dict, dictIndex) in level2AllDict[item.id]" :key="dictIndex" :label="dict.level2Code"
                style="margin-top: 6px; display: block;">
                {{ dict.level2Code }}.{{ dict.level2Name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
        <div class="flex-style-base" style="height: 100px; justify-content: center; color: #cdcdcd">
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
          <span style="margin: 0 16px">到底了</span>
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
        </div>
      </div>
      <div class="flex-style-base foot">
        <div class="btn-add" @click="submit">提交</div>
      </div>
    </div>

    <!-- <el-empty v-if="loadingFail" class="empty" description="内容为空">
      <div slot="image"></div>
      <div class="btn-add btn-retry" @click="initData()">立即重试</div>
    </el-empty> -->

  </el-drawer>
</template>
<script>

import service from "./service.js";
export default {
  components: {
  },
  data() {
    return {
      showDrawer: false,
      bodyLoading: false,
      loadingFail: false,
      scoreTypeId: '',
      level0StructList: [],
      level2AllDict: {},
      scoreStructDict: {},
      param: {},
      row: {}

    };
  },
  methods: {
    resetData() {
      this.showDrawer = false;
      this.bodyLoading = false;
      this.loadingFail = false;

    },
    async openDrawer(row) {
      this.row = row
      this.scoreTypeId = row.id
      this.resetData();
      this.showDrawer = true;
      this.initData();
    },
    async waitClearData() {
      this.viewRecord = []
      return new Promise((resolve) => {
        this.$nextTick(() => {
          resolve(true);
        })
      });
    },
    async initData(isEmitVisit) {
      await this.waitClearData()
      this.bodyLoading = true;
      this.loadingFail = false;
      const { level0StructList } = await service.level0List();
      this.level0StructList = level0StructList
      const { level2AllDict, scoreStructDict } = await service.showScoreStruct(this.scoreTypeId);
      this.level2AllDict = level2AllDict
      this.scoreStructDict = scoreStructDict
      const p = {};
      level0StructList.forEach(item => {
        p[item.id] = scoreStructDict[item.id]
      })
      this.param = p
      setTimeout(() => {
        this.bodyLoading = false
      }, 0)

      if (!!level0StructList) {

      } else {
        this.loadingFail = true;
      }
      this.bodyLoading = false;

      if (!!isEmitVisit) {
        this.$emit("refresh");
      }
    },
    async submit() {
      console.log('121212', JSON.stringify(this.param))
      await service.updateScoreStruct(this.scoreTypeId, this.param)


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
  min-width: 600px;
}

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