<template>
  <el-drawer :title="`${row.scoreTypeName}【${row.userName}】`" :custom-class="'draw-container'" class="drawer-container"
             :visible.sync="showDrawer" :size="drawerWidth" direction="rtl" :destroy-on-close="true" wrapperClosable
             :before-close="handleClose" @close="close">
    <div class="flex-style-column drawer-body" v-loading="bodyLoading">
      <div class="line"></div>
      <div v-if="!bodyLoading" class="content">
        <!-- 医疗工作评分详情展示 -->
        <!--        @tab-click="handleClick"-->
        <el-tabs v-model="activeLevel">
          <el-tab-pane v-for="(level0Item, level0Index) in userScore" :key="level0Index" :name="`tab-${level0Item.level0Id}`">
            <div slot="label" class="flex-style-base" :class="[activeLevel == `tab-${level0Item.level0Id}` ? 'level0-title-active' : 'level0-title']" style="width: 100%;">
              <img v-if="level0Item.level0Id == 1 && activeLevel == 'tab-1'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/icon-medical-work.png"/>
              <img v-if="level0Item.level0Id == 2 && activeLevel == 'tab-2'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/teaching-work-assessment.png"/>
              <img v-if="level0Item.level0Id == 3 && activeLevel == 'tab-3'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/research-work-assessment.png"/>
              <img v-if="level0Item.level0Id == 4 && activeLevel == 'tab-4'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/talent-training-assessment.png"/>
              <img v-if="level0Item.level0Id == 5 && activeLevel == 'tab-5'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/research-public-welfare-assessment.png"/>
              <img v-if="level0Item.level0Id == 6 && activeLevel == 'tab-6'"
                   style="width: 16px;height: 16px;margin-right: 6px;"
                   src="../../assets/images/my_self_-assessment.png"/>
              <div>{{ level0Item.level0Name }}</div>
            </div>
            <div class="flex-style-base" style="justify-content: flex-end">
              <el-tooltip v-if="level0Item.level0Id != 6 && activeLevel == `tab-${level0Item.level0Id}`" class="item" effect="dark"
                          :content="!showObj[`showContent${level0Item.level0Id}`] ? `${level0Item.level0Name}详情` : `${level0Item.level0Name}分数`"
                          placement="top-start">
                <i class="el-icon-sort"
                   :style="{rotate: showObj[`showContent${level0Item.level0Id}`] ? '0deg' : '90deg'}"
                   style="color: #00549C; cursor: pointer;font-size: 18px;"
                   @click="() => {showObj[`showContent${level0Item.level0Id}`] = !showObj[`showContent${level0Item.level0Id}`]}"></i>
              </el-tooltip>
            </div>

            <div style="height: 100%;overflow:auto;">
              <MedicalWorkComp v-if="showObj[`showContent${level0Item.level0Id}`]"
                               :contentShow="contentShow[`contentShow${level0Item.level0Id}`]"></MedicalWorkComp>

              <div v-for="(level1Item, level1Index) in level0Item.level1ScoreList"
                   v-if="!showObj[`showContent${level0Item.level0Id}`]" :key="level1Index"
                   class="flex-style-column level1-section">
                <div class="flex-style-base level1-title">
                  <div>{{ level1Item.level1Name }}</div>
                  <div style="width: 0;flex-grow: 1;background-color: #EBEBEB;height: 1px;margin-left: 8px;"></div>
                </div>
                <div v-for="(level2Item, level2Index) in level1Item.level2ScoreList" :key="level2Index">
                  <div class="flex-style-base level2-header">
                    <span class="level2-name">{{ level2Item.level2Name }}</span>
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
          </el-tab-pane>
        </el-tabs>
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
      activeLevel: 'tab-1',
      contentShow: {
        contentShow1: [],
        contentShow2: [],
        contentShow3: [],
        contentShow4: [],
        contentShow5: []
      },
      showContent: false,
      showObj: {
        showContent1: false,
        showContent2: false,
        showContent3: false,
        showContent4: false,
        showContent5: false
      },
      userScore: {}
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
      this.activeLevel = 'tab-1';

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
      const {userScore} = await service.singleAll(this.row.userId, this.row.scoreTypeId)
      this.userScore = userScore
      const {contentShow} = await service.contentShow(this.row.scoreTypeId, 1)
      this.contentShow = contentShow || []
      const level0List = []
      Object.keys(userScore).forEach(key => {
        const item = level0StructList.find(level0 => level0.id == key)
        if (item) {
          level0List.push({
            "level0Name": item.level0Name,
            "level0Id": item.id,
            "level1List": userScore[key]
          })
        }
      })
      this.level0List = level0List
      this.bodyLoading = false
      service.contentShow(this.row.scoreTypeId, 1)
        .then(res => {
          this.contentShow.contentShow1 = res.contentShow || []
        })
      service.contentShow(this.row.scoreTypeId, 2)
        .then(res => {
          this.contentShow.contentShow2 = res.contentShow || []
        })
      service.contentShow(this.row.scoreTypeId, 3)
        .then(res => {
          this.contentShow.contentShow3 = res.contentShow || []
        })
      service.contentShow(this.row.scoreTypeId, 4)
        .then(res => {
          this.contentShow.contentShow4 = res.contentShow || []
        })
      service.contentShow(this.row.scoreTypeId, 5)
        .then(res => {
          this.contentShow.contentShow5 = res.contentShow || []
        })
    },
    close() {
    },
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
}

.content {
  height: 0;
  width: 100%;
  flex-grow: 1;
  padding-left: 16px;
  padding-right: 32px;
}

// 三级数据结构样式
.level0-section {
  margin-bottom: 32px;
}

.level0-title-active {
  font-size: 16px;
  font-weight: bold;
  color: $jbPrimaryColor;
  margin-top: 8px;
  height: 50px;
  padding-bottom: 20px;
}

.level0-title {
  font-size: 16px;
  color: #333;
  margin-top: 8px;
  height: 50px;
  font-weight: normal;
  padding-bottom: 20px;
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
