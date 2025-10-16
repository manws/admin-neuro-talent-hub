<template>
  <components-container bodyColor="#ECF2F8" cardBgColor="#ECF2F8" :isScroll="false">
    <div style="background-color: #FFFFFF;padding: 16px;">
      <count @refresh="initData" :nJoinScoreCount="nJoinScoreCount" :nScoreTotalCount="nScoreTotalCount" :nNoJoinSocreCount="nNoJoinSocreCount" :state="state"></count>

      <el-row :gutter="16" style="margin-top: 16px;background-color: #FFFFFF;">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
          <div class="flex-style-base" style="padding-left: 16px;background-color: #F8F9FB;padding-top: 16px;">
            <div class="title-flag"></div>
            <span class="title">考核人数趋势</span>
          </div>
          <subject-trialing-trend :chartData="subjectIncreMonthList"></subject-trialing-trend>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="flex-style-base" style="padding-left: 16px;background-color: #F8F9FB;padding-top: 16px;">
            <div class="title-flag"></div>
            <span class="title">考核分数统计</span>
          </div>
          <subject-trialing :chartData="level0StatisList"></subject-trialing>
        </el-col>
      </el-row>

      <el-row style="margin-top: 16px;">
        <el-col :span="24">
          <CRFState :level0s1RankList="level0s1RankList" :level0s2RankList="level0s2RankList"
                    :level0s3RankList="level0s3RankList" :level0s4RankList="level0s4RankList"
                    :level0s5RankList="level0s5RankList" height="300px"></CRFState>
        </el-col>
      </el-row>
    </div>
  </components-container>
</template>

<script>
import Count from "./Count";
import SubjectTrialingTrend from "./components/SubjectTrialingTrend";
import SubjectTrialing from "./components/SubjectTrialing";
import SiteBar from "./components/SiteBar";
import CRFState from "./components/CRFState";
import CRFStatePie from "./components/CRFStatePie";
import service from "./service";

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
      scoreTypeId: 1,
      subjectIncreMonthList: [],
      level0StatisList: [],
      level0s1RankList: [],
      level0s2RankList: [],
      level0s3RankList: [],
      level0s4RankList: [],
      level0s5RankList: [],
      nScoreTotalCount: 0,
      nJoinScoreCount: 0,
      nNoJoinSocreCount: 0,
      state: -1,

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
  created() {
  },
  mounted() {
  },
  methods: {
    async initData(scoreTypeId) {
      const {
        dateList,
        joinCountList,
        level0StatisList,
        level0s1RankList,
        level0s2RankList,
        level0s3RankList,
        level0s4RankList,
        level0s5RankList,
        nScoreTotalCount,
        nJoinScoreCount,
        nNoJoinSocreCount,
        state
      } = await service.dashboard(scoreTypeId);
      this.level0s1RankList = level0s1RankList
      this.level0s2RankList = level0s2RankList
      this.level0s3RankList = level0s3RankList
      this.level0s4RankList = level0s4RankList
      this.level0s5RankList = level0s5RankList

      this.nScoreTotalCount = nScoreTotalCount
      this.nJoinScoreCount = nJoinScoreCount
      this.nNoJoinSocreCount = nNoJoinSocreCount
      this.state = state

      joinCountList.forEach((item, index) => {
        this.subjectIncreMonthList.push({
          "month": dateList[index],
          "data": item
        })
      })
      this.level0StatisList = level0StatisList
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

.title {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
}
</style>
