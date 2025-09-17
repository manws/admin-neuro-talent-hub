<template>
  <el-row :gutter="16">
    <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
      <div class="flex-style-base">
        <div class="top-card" style="flex: 2">
          <span class="title">研究中心</span>
          <div class="flex-style-base" style="margin-top: 20px; justify-content: space-around">
            <div class="flex-style-column" style="width: 80px">
              <span class="num-text">{{ nSiteActive }}</span>
              <span class="label">入组中心数</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: #00986c">{{
                nSiteAll
              }}</span>
              <span>中心总数</span>
            </div>
          </div>
        </div>

        <div style="width: 12px"></div>

        <div class="top-card" style="flex: 5">
          <span class="title">受试者试验数</span>
          <div class="flex-style-base" style="margin-top: 20px; justify-content: space-around">
            <div class="flex-style-column" style="width: 80px">
              <span class="num-text" style="color: #4c87ff">{{
                nSubjectActive
              }}</span>
              <span class="label">入组数</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: #00986c">{{
                nSubjectTarget
              }}</span>
              <span>目标数</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: ##00cdcd">{{
                nSubjectTrialing
              }}</span>
              <span>进行中</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: #12cd00">{{
                nSubjectTrialSuccessOver
              }}</span>
              <span>正常完成</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: #00986c">{{
                nSubjectTrialOver
              }}</span>
              <span>总完成</span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
      <div class="flex-style-base">
        <div class="top-card" style="flex: 1">
          <span class="title">CRF表</span>
          <div class="flex-style-base" style="margin-top: 20px; justify-content: space-around">
            <div class="flex-style-column" style="width: 80px">
              <span class="num-text">{{ nCRFRecord }}</span>
              <span class="label">录入数</span>
            </div>
            <div style="height: 30px; width: 1px; background-color: #ebebeb"></div>
            <div class="flex-style-column" style="width: 80px; align-items: center">
              <span class="num-text" style="color: #00986c">{{
                nCRFTotal
              }}</span>
              <span>总数</span>
            </div>
          </div>
        </div>

        <div style="width: 12px"></div>

        <div style="flex: 1">
          <div class="flex-style-base top-card hor-top-card" style="height: 59px; padding-top: 0; cursor: pointer"
            @click="showRemindDlg = true">
            <span class="title" style="margin-top: 0; flex: 1">访视提醒</span>
            <span class="num-text op-btn">{{ remindCount }}</span>
          </div>

          <div style="width: 12px"></div>

          <div class="flex-style-base top-card hor-top-card" @click="showVisitDlg = true">
            <span class="title" style="margin-top: 0; flex: 1; width: 100px">访视计划</span>
            <div class="flex-style-base" style="justify-content: space-around">
              <span class="num-text op-btn" style="font-size: 14px">查看</span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <remind-dialog v-model="showRemindDlg"></remind-dialog>
    <visit-schedule-dialog v-model="showVisitDlg"></visit-schedule-dialog>
  </el-row>
</template>

<script>
import RemindDialog from "./RemindDialog.vue";
import VisitScheduleDialog from "./VisitScheduleDialog.vue";

export default {
  components: { RemindDialog, VisitScheduleDialog },
  name: "DashboardCount",
  props: {
    nCRFAccept: {
      type: Number,
      default: 0,
    },
    nCRFRecord: {
      type: Number,
      default: 0,
    },
    nCRFTotal: {
      type: Number,
      default: 0,
    },
    nSiteActive: {
      type: Number,
      default: 0,
    },
    nSiteAll: {
      type: Number,
      default: 0,
    },
    nSubjectActive: {
      type: Number,
      default: 0,
    },
    nSubjectTarget: {
      type: Number,
      default: 0,
    },
    nSubjectTrialOver: {
      type: [Number, String],
      default: '--',
    },
    nSubjectTrialSuccessOver: {
      type: [Number, String],
      default: '--',
    },
    nSubjectTrialing: {
      type: [Number, String],
      default: '--',
    },
  },
  data() {
    return {
      showRemindDlg: false,
      showVisitDlg: false,
      remindCount: 0,
    };
  },
  async created() {
    this.remindCount = await this.service.remindCount();
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.top-card {
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 130px;
  padding-top: 10px;
  margin-top: 10px;
  flex: 1;
  flex-flow: 1;

  .label {
    font-size: 14px;
    color: #1a1a1a;
    letter-spacing: 0;
    text-align: center;
    line-height: 18px;
  }

  .title {
    font-size: 18px;
    color: #333333;
    line-height: 26px;
    font-weight: 500;
    margin-left: 16px;
    margin-top: 8px;
  }

  .num-text {
    font-size: 26px;
    color: #4c87ff;
    letter-spacing: 0;
    text-align: center;
    line-height: 26px;
    font-weight: 500;
    margin-top: 6px;
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
</style>
