<template>
  <el-row :gutter="16">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="flex-style-base">
        <div class="top-card" style="flex: 3;height: 166px;width: 100%;background-color: #F8F9FB;">
          <div class="flex-style-base" style="margin-left: 16px;">
            <div class="title-flag"></div>
            <span class="title">考核名称</span>
          </div>

          <div class="flex-style-base" style="margin-top: 13px; width: 100%;">
            <div class="flex-style-base score-name-bg">
              <div class="flex-style-base score-name-icon">
                <img :src="scoreNameIcon"/>
              </div>
              <el-dropdown @command="handleCommand">
                <div class="score-name-layout">
                  <span class="score-type-name">{{ scoreTypeName }}</span>
                  <img src="../../assets/images/down-arrow.svg"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in scoreTypeList" :command="item">{{ item.scoreTypeName }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <img style="position: absolute;bottom: 4px;right: 4px;width: 54px;height: 54px;"
                   src="../../assets/images/score-bg-shuiyin.png"/>
            </div>
          </div>
        </div>

        <div style="width: 12px"></div>

        <div class="top-card" style="flex: 5;height: 166px;width: 100%;background-color: #F8F9FB;">
          <div class="flex-style-base" style="margin-left: 16px;">
            <div class="title-flag"></div>
            <span class="title">考核状态</span>
            <span class="score-date-text">{{ scoreTime }}</span>
          </div>
          <div class="flex-style-base" style="margin-top: 13px; justify-content: space-around;">
            <div class="flex-style-column score-class-1">
              <img class="score-class-2" src="../../assets/images/score-state-1.png"/>
              <span class="score-state-text z-index-1">{{ stateMap[state] }}</span>
            </div>
            <div style="width: 8px;"></div>
            <div class="flex-style-column score-class-1">
              <img class="score-class-2" src="../../assets/images/score-state-2.png"/>
              <div class="flex-style-column z-index-1" style="justify-content: center;align-items: center;">
                <span class="num-text" style="color: #0066FF">{{
                    nScoreTotalCount
                  }}</span>
                <span class="score-bottom-text">考核总人数</span>
              </div>
            </div>
            <div style="width: 8px;"></div>
            <div class="flex-style-column score-class-1">
              <img class="score-class-2" src="../../assets/images/score-state-3.png"/>
              <div class="flex-style-column z-index-1" style="justify-content: center;align-items: center;">
              <span class="num-text" style="color: #E5504F;">{{
                  nJoinScoreCount
                }}</span>
                <span class="score-bottom-text">已考核人数</span>
              </div>
            </div>
            <div style="width: 8px;"></div>
            <div class="flex-style-column score-class-1">
              <img class="score-class-2" src="../../assets/images/score-state-4.png"/>
              <div class="flex-style-column z-index-1" style="justify-content: center;align-items: center;">
              <span class="num-text" style="color: #0CA85A;">{{
                  nNoJoinSocreCount
                }}</span>
                <span class="score-bottom-text">未考核人数</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import service from './service'
import moment from "moment";

export default {
  name: "DashboardCount",
  props: {
    nScoreTotalCount: {
      type: Number,
      default: 0,
    },
    nJoinScoreCount: {
      type: Number,
      default: 0,
    },
    nNoJoinSocreCount: {
      type: Number,
      default: 0,
    },
    state: {
      type: [Number, String],
      default: '-1',
    },
  },
  data() {
    return {
      scoreTime: moment().format("YYYY-MM-DD"),
      scoreNameIcon: require('@/assets/images/score-name-icon.svg'),
      stateMap: {
        '-1': '',
        '0': '编辑',
        '1': '考核中',
        '2': '已结束',
        '99': '已删除'
      },

      showRemindDlg: false,
      showVisitDlg: false,
      remindCount: 0,
      scoreTypeList: [],

      scoreTypeId: 0,
      scoreTypeName: '',
    };
  },
  async created() {
    const {scoreTypeList} = await service.activeSTList();
    this.scoreTypeList = scoreTypeList || [];
    if (scoreTypeList.length === 0) {
      return
    }
    const currentScore = scoreTypeList[0];
    this.scoreTypeId = currentScore.id;
    this.scoreTypeName = currentScore.scoreTypeName;
    this.$emit("refresh", this.scoreTypeId);
  },
  methods: {
    handleCommand(e) {
      if (e.id !== this.scoreTypeId) {
        this.scoreTypeId = e.id;
        this.scoreTypeName = e.scoreTypeName;
        this.$emit("refresh", this.scoreTypeId);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.top-card {
  background-color: #ffffff;
  height: 130px;
  padding-top: 10px;
  flex: 1;
  flex-flow: 1;

  .score-state-text {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #DB7F04;
    letter-spacing: 0;
    text-align: center;
    font-weight: 500;
  }

  .title {
    font-size: 16px;
    color: #333333;
    line-height: 26px;
    font-weight: 500;
  }

  .num-text {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #006AFF;
    letter-spacing: 0;
    line-height: 34px;
    font-weight: 600;
  }
}

.hor-top-card {
  height: 59px;
  padding-top: 0;
  cursor: pointer;
}

.op-btn {
  margin-top: 0;
  text-align: right;
  padding-right: 16px;
  cursor: pointer;
}

.op-btn:hover {
  color: #7ac69b;
  font-weight: bold;
}

.title-flag {
  width: 3px;
  height: 12px;
  background-color: #0066FF;
  margin-right: 8px;
  border-radius: 2px;
}

.score-name-icon {
  width: 56px;
  height: 56px;
  background-color: #FFFFFF;
  border-radius: 28px;
  justify-content: center;
  margin-left: 28px;

  img {
    width: 32px;
    height: 32px;
  }
}

.score-name-bg {
  width: 100%;
  height: 102px;
  margin: 0 16px;
  background-image: linear-gradient(90deg, #006FFE 6%, rgba(0, 111, 254, 0.60) 92%);
  border-radius: 4px;
  position: relative;
}

.score-type-name {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
  font-weight: 500;
  margin-left: 16px;
}

.score-bottom-text {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
}

.score-class-1 {
  width: 0;
  position: relative;
  flex-grow: 1;
  height: 102px;
  justify-content: center;
}

.score-class-2 {
  position: absolute;
  height: 102px;
  width: 100%;
}

.z-index-1 {
  z-index: 1;
}

.score-date-text {
  font-family: PingFangSC-Regular;
  flex-grow: 1;
  font-size: 12px;
  color: #666666;
  text-align: right;
  line-height: 18px;
  font-weight: 400;
  align-items: flex-end;
  padding-right: 16px;
}

.score-name-layout :hover {
  cursor: pointer;
}
</style>
