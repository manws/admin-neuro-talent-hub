<template>
  <components-container bodyColor="#f8f8f8" cardBgColor="#f8f8f8" :isScroll="false">
    <count :nCRFRecord="nCRFRecord" :nCRFTotal="nCRFTotal" :nSiteActive="nSiteActive" :nSiteAll="nSiteAll"
      :nSubjectActive="nSubjectActive" :nSubjectTarget="nSubjectTarget" :nSubjectTrialOver="nSubjectTrialOver"
      :nSubjectTrialSuccessOver="nSubjectTrialSuccessOver" :nSubjectTrialing="nSubjectTrialing"></count>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
        <subject-trialing-trend :chartData="subjectIncreMonthList"></subject-trialing-trend>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
        <subject-trialing :chartData="subjectTrialingData"></subject-trialing>
      </el-col>
    </el-row>

    <el-row style="
        margin-top: 16px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      ">
      <el-col :span="17">
        <CRFState :chartData="crfStateData" height="300px"></CRFState>
      </el-col>
      <el-col :span="7">
        <CRFStatePie :chartData="crfStateData" height="300px"></CRFStatePie>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="24">
        <site-bar :chartData="siteProcessList" :height="(siteProcessList.length * 32 + 80) + 'px'"></site-bar>
      </el-col>
    </el-row>
  </components-container>
</template>

<script>
import Count from "./Count";
import SubjectTrialingTrend from "./components/SubjectTrialingTrend";
import SubjectTrialing from "./components/SubjectTrialing";
import SiteBar from "./components/SiteBar";
import CRFState from "./components/CRFState";
import CRFStatePie from "./components/CRFStatePie";

export default {
  name: "Dashboard",
  components: {
    Count,
    SubjectTrialingTrend,
    SubjectTrialing,
    SiteBar,
    CRFState,
    CRFStatePie,
  },
  data() {
    return {
      nCRFRecord: 0,
      nCRFTotal: 0,
      nSiteActive: 0,
      nSiteAll: 0,
      nSubjectActive: 0,
      nSubjectTarget: 0,
      nSubjectTrialOver: '--',
      nSubjectTrialSuccessOver: '--',
      nSubjectTrialing: '--',
      nSubjectTrialFailureOver: 0,

      siteProcessList: [],
      subjectIncreMonthList: [],
      subjectSingleMonthList: [],

      subjectTrialingData: {
        names: [],
        values: [],
      },

      crfStateData: {
        names: [],
        values: [],
      },
    };
  },
  computed: {},
  created() { },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const result = await this.service.dashboard();
      this.nCRFRecord = result.nCRFRecord;
      this.nCRFTotal = result.nCRFTotal;
      this.nSiteActive = result.nSiteActive;
      this.nSiteAll = result.nSiteAll;
      this.nSubjectActive = result.nSubjectActive;
      this.nSubjectTarget = result.nSubjectTarget;

      this.nSubjectTrialOver = result.nSubjectTrialOver === -1 ? '--' : result.nSubjectTrialOver;
      this.nSubjectTrialSuccessOver = result.nSubjectTrialSuccessOver === -1 ? '--' : result.nSubjectTrialSuccessOver;
      this.nSubjectTrialing = result.nSubjectTrialing === -1 ? '--' : result.nSubjectTrialing;

      this.nSubjectTrialFailureOver = result.nSubjectTrialFailureOver;

      this.siteProcessList = result.siteProcessList.reverse();
      this.subjectIncreMonthList = result.subjectIncreMonthList || [];
      this.subjectSingleMonthList = result.subjectSingleMonthList || [];


      this.subjectTrialingData = {
        names: [
          "受试者总数",
          // "试验进行中",
          // "试验结束数",
          // "试验完成数",
          // "试验脱离数",
        ],
        values: [
          this.nSubjectActive,
          // this.nSubjectTrialing,
          // this.nSubjectTrialSuccessOver,
          // this.nSubjectTrialOver,
          // this.nSubjectTrialFailureOver,
        ],
      };

      if (result.nSubjectTrialing != -1) {
        this.subjectTrialingData.names.push('试验进行中')
        this.subjectTrialingData.values.push(this.nSubjectTrialing)
      }

      if (result.nSubjectTrialSuccessOver != -1) {
        this.subjectTrialingData.names.push('试验结束数')
        this.subjectTrialingData.values.push(this.nSubjectTrialSuccessOver)
      }

      if (result.nSubjectTrialOver != -1) {
        this.subjectTrialingData.names.push('试验完成数')
        this.subjectTrialingData.values.push(this.nSubjectTrialOver)
      }

      if (result.nSubjectTrialFailureOver != -1) {
        this.subjectTrialingData.names.push('试验脱离数')
        this.subjectTrialingData.values.push(this.nSubjectTrialFailureOver)
      }

      // CRF 状态统计
      this.crfStateData = {
        names: [
          "失活",
          "空白",
          "逻辑错误",
          "质疑数",
          "待DM接受",
          "待CRA审核",
          "待PI签字",
          "待冻结",
          "待锁表",
          "锁表",
        ],
        values: [
          result.nCRFNoactive,
          result.nCRFEmpty,
          result.nCRFRule,
          result.nCRFQuery,
          result.nCRFAccept,
          result.nCRFVerify,
          result.nCRFSign,
          result.nCRFFreeze,
          result.nCRFLock,
          result.nCRFLocked,
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>