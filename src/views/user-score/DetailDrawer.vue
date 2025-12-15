<template>
  <el-drawer :title="row.scoreTypeName" :custom-class="'draw-container'" class="drawer-container"
             :visible.sync="showDrawer" :size="drawerWidth" direction="rtl" :destroy-on-close="true" wrapperClosable
             :before-close="handleClose" @close="close">
    <div class="flex-style-column drawer-body" v-loading="bodyLoading">
      <div class="line"></div>
      <div v-if="!bodyLoading" class="content">
        <!-- 医疗工作评分详情展示 -->
        <div v-for="(level0Item, level0Index) in level0List" :key="level0Index" class="level0-section">
          <div class="flex-style-base level0-title" style="width: 100%;">
            <img v-if="level0Item.level0Id == 1" style="width: 16px;height: 16px;margin-right: 6px;"
                 src="../../assets/images/icon-medical-work.png"/>
            <img v-if="level0Item.level0Id == 2" style="width: 16px;height: 16px;margin-right: 6px;"
                 src="../../assets/images/teaching-work-assessment.png"/>
            <img v-if="level0Item.level0Id == 3" style="width: 16px;height: 16px;margin-right: 6px;"
                 src="../../assets/images/research-work-assessment.png"/>
            <img v-if="level0Item.level0Id == 4" style="width: 16px;height: 16px;margin-right: 6px;"
                 src="../../assets/images/talent-training-assessment.png"/>
            <img v-if="level0Item.level0Id == 5" style="width: 16px;height: 16px;margin-right: 6px;"
                 src="../../assets/images/research-public-welfare-assessment.png"/>
            <div>{{ level0Item.level0Name }}</div>

            <div style="flex-grow: 1;"></div>

            <el-tooltip class="item" effect="dark" :content="!showContent ? '医疗评估详情' : '医疗评估分数'" placement="top-start">
              <i class="el-icon-sort" :style="{rotate: showContent ? '0deg' : '90deg'}" style="color: #00549C; cursor: pointer;font-size: 18px;" @click="() => {showContent = !showContent}"></i>
            </el-tooltip>
          </div>
          <MedicalWorkComp v-if="level0Item.level0Id == 1 && showContent" :contentShow="contentShow"></MedicalWorkComp>
          <div v-for="(level1Item, level1Index) in level0Item.level1List" v-if="!(level0Item.level0Id == 1 && showContent)" :key="level1Index"
               class="flex-style-column level1-section">
            <div class="flex-style-base level1-title">
              <div>{{ level1Item.level1Name }}</div>
              <div style="width: 0;flex-grow: 1;background-color: #EBEBEB;height: 1px;margin-left: 8px;"></div>
            </div>
            <div v-for="(level2Item, level2Index) in level1Item.level2List" :key="level2Index">
              <div class="flex-style-base level2-header">
                <span class="level2-name">{{ level2Item.name }}</span>
                <span class="level2-score">{{ level2Item.score }}分</span>
              </div>
              <!-- 图片展示区域 -->
              <div v-if="level2Item.urlList && level2Item.urlList.length > 0" class="image-gallery">
                <el-image
                  v-for="(imageUrl, imageIndex) in level2Item.urlList"
                  :key="imageIndex"
                  class="gallery-image"
                  :src="imageUrl"
                  :preview-src-list="level2Item.urlList"
                  fit="cover"
                  lazy>
                </el-image>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-style-base" style="height: 100px; justify-content: center; color: #cdcdcd">
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
          <span style="margin: 0 16px">到底了</span>
          <span style="height: 1px; background-color: #cdcdcd; width: 30px"></span>
        </div>
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
import store from "@/store"
import MedicalWorkComp from "@/views/user-score/MedicalWorkComp.vue";

export default {
  components: {MedicalWorkComp},
  data() {
    return {
      showDrawer: false,
      bodyLoading: false,
      loadingFail: false,
      row: {},
      level0List: [],
      contentShow: [],
      showContent: false,
    };
  },
  computed: {
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
      this.loadingFail = false;

    },
    async openDrawer(row, isEdit) {
      this.row = row
      this.resetData();
      this.showDrawer = true;
      this.initData();
    },
    async initData() {
      this.bodyLoading = true;
      this.loadingFail = false;
      const {level0StructList} = await service.level0List();
      const {level2Data} = await service.singleAll(this.row.userId, this.row.scoreTypeId)
      const { contentShow } = await service.contentShow(this.row.scoreTypeId, 1)
      this.contentShow = contentShow || []
      const level0List = []
      Object.keys(level2Data).forEach(key => {
        const item = level0StructList.find(level0 => level0.id == key)
        if (item) {
          level0List.push({
            "level0Name": item.level0Name,
            "level0Id": item.id,
            "level1List": level2Data[key]
          })
        }
      })
      this.level0List = level0List
      this.bodyLoading = false
    },
    close() {},
    handleClose(done) {
      done();
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

// 三级数据结构样式
.level0-section {
  margin-bottom: 32px;
}

.level0-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
  height: 40px;
}

.level1-section {
  margin-left: 24px;
  margin-top: 8px;
}

.level1-title {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
  height: 40px;
}

.level2-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-left: 16px;
}

.level2-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.level2-name {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 400;
}

.level2-score {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  text-align: right;
  line-height: 22px;
  font-weight: 400;
}

// 图片展示样式
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.gallery-image {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  cursor: pointer;
}

.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  color: #c0c4cc;
  font-size: 20px;
}

.no-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: #c0c4cc;
  background-color: #f5f7fa;
  border-radius: 6px;
  border: 1px dashed #dcdfe6;

  i {
    font-size: 24px;
    margin-bottom: 4px;
  }

  span {
    font-size: 12px;
  }
}

.item-name {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
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
