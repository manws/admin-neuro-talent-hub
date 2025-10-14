<template>
  <components-container bodyColor="#ECF2F8" cardBgColor="#ECF2F8" :isScroll="false">
    <div style="background-color: #FFFFFF;padding: 16px;">
      <count @refresh="initData"></count>

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
        level0s5RankList
      } = await service.dashboard(scoreTypeId);
      this.level0s1RankList = level0s1RankList
      this.level0s2RankList = level0s2RankList
      this.level0s3RankList = level0s3RankList
      this.level0s4RankList = level0s4RankList
      this.level0s5RankList = level0s5RankList

      joinCountList.forEach((item, index) => {
        this.subjectIncreMonthList.push({
          "month": dateList[index],
          "data": item
        })
      })
      // this.level0StatisList = level0StatisList
      this.level0StatisList = [
        {
          "dMin": 15,
          "dMax": 25,
          "dMid": 21,
          "dAvg": 22
        },
        {
          "dMin": 10,
          "dMax": 100,
          "dMid": 50,
          "dAvg": 55
        },
        {
          "dMin": 12.8,
          "dMax": 32.8,
          "dMid": 22.8,
          "dAvg": 22.8
        },
        {
          "dMin": 45.3,
          "dMax": 145.3,
          "dMid": 95.3,
          "dAvg": 85.3
        },
        {
          "dMin": 10.5,
          "dMax": 100.5,
          "dMid": 60.5,
          "dAvg": 50.5
        }
      ]


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
