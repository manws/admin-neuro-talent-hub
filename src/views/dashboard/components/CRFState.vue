<template>
  <div class="flex-style-base rank-container" :style="{ width: width }">
    <div class="flex-style-column rank-layout">
      <div class="flex-style-base">
        <div class="title-flag"></div>
        <span class="label-text">医疗工作</span>
      </div>
      <div class="flex-style-base rank-item">
        <span class="rank-text rank-label">排名</span>
        <span class="name-text rank-label">姓名</span>
        <span class="score-text rank-label">分数</span>
      </div>

      <div v-for="(item, index) in level0s1RankList" class="flex-style-base rank-item"
           :class="{'rank-item-1' : (index === 0), 'rank-item-2' : (index === 1), 'rank-item-3' : (index === 2)}">
        <div v-if="index < 3" class="flex-style-base rank-text">
          <img v-if="index === 0" style="width: 32px;height: 32px;" src="../../../assets/images/rank-1.png"/>
          <img v-if="index === 1" style="width: 32px;height: 32px;" src="../../../assets/images/rank-2.png"/>
          <img v-if="index === 2" style="width: 32px;height: 32px;" src="../../../assets/images/rank-3.png"/>
        </div>
        <span v-if="index > 2" class="rank-text">{{ index + 1 }}</span>
        <span class="name-text">{{ item.strName }}</span>
        <span class="score-text">{{ item.score }}</span>
      </div>
    </div>

    <div style="width: 12px;"></div>

    <div class="flex-style-column rank-layout">
      <div class="flex-style-base">
        <div class="title-flag"></div>
        <span class="label-text">教学工作</span>
      </div>
      <div class="flex-style-base rank-item">
        <span class="rank-text rank-label">排名</span>
        <span class="name-text rank-label">姓名</span>
        <span class="score-text rank-label">分数</span>
      </div>

      <div v-for="(item, index) in level0s2RankList" class="flex-style-base rank-item"
           :class="{'rank-item-1' : (index === 0), 'rank-item-2' : (index === 1), 'rank-item-3' : (index === 2)}">
        <div v-if="index < 3" class="flex-style-base rank-text">
          <img v-if="index === 0" style="width: 32px;height: 32px;" src="../../../assets/images/rank-1.png"/>
          <img v-if="index === 1" style="width: 32px;height: 32px;" src="../../../assets/images/rank-2.png"/>
          <img v-if="index === 2" style="width: 32px;height: 32px;" src="../../../assets/images/rank-3.png"/>
        </div>
        <span v-if="index > 2" class="rank-text">{{ index + 1 }}</span>
        <span class="name-text">{{ item.strName }}</span>
        <span class="score-text">{{ item.score }}</span>
      </div>
    </div>

    <div style="width: 12px;"></div>

    <div class="flex-style-column rank-layout">
      <div class="flex-style-base">
        <div class="title-flag"></div>
        <span class="label-text">科研工作</span>
      </div>
      <div class="flex-style-base rank-item">
        <span class="rank-text rank-label">排名</span>
        <span class="name-text rank-label">姓名</span>
        <span class="score-text rank-label">分数</span>
      </div>

      <div v-for="(item, index) in level0s3RankList" class="flex-style-base rank-item"
           :class="{'rank-item-1' : (index === 0), 'rank-item-2' : (index === 1), 'rank-item-3' : (index === 2)}">
        <div v-if="index < 3" class="flex-style-base rank-text">
          <img v-if="index === 0" style="width: 32px;height: 32px;" src="../../../assets/images/rank-1.png"/>
          <img v-if="index === 1" style="width: 32px;height: 32px;" src="../../../assets/images/rank-2.png"/>
          <img v-if="index === 2" style="width: 32px;height: 32px;" src="../../../assets/images/rank-3.png"/>
        </div>
        <span v-if="index > 2" class="rank-text">{{ index + 1 }}</span>
        <span class="name-text">{{ item.strName }}</span>
        <span class="score-text">{{ item.score }}</span>
      </div>
    </div>

    <div style="width: 12px;"></div>

    <div class="flex-style-column rank-layout">
      <div class="flex-style-base">
        <div class="title-flag"></div>
        <span class="label-text">人才培养</span>
      </div>
      <div class="flex-style-base rank-item">
        <span class="rank-text rank-label">排名</span>
        <span class="name-text rank-label">姓名</span>
        <span class="score-text rank-label">分数</span>
      </div>

      <div v-for="(item, index) in level0s4RankList" class="flex-style-base rank-item"
           :class="{'rank-item-1' : (index === 0), 'rank-item-2' : (index === 1), 'rank-item-3' : (index === 2)}">
        <div v-if="index < 3" class="flex-style-base rank-text">
          <img v-if="index === 0" style="width: 32px;height: 32px;" src="../../../assets/images/rank-1.png"/>
          <img v-if="index === 1" style="width: 32px;height: 32px;" src="../../../assets/images/rank-2.png"/>
          <img v-if="index === 2" style="width: 32px;height: 32px;" src="../../../assets/images/rank-3.png"/>
        </div>
        <span v-if="index > 2" class="rank-text">{{ index + 1 }}</span>
        <span class="name-text">{{ item.strName }}</span>
        <span class="score-text">{{ item.score }}</span>
      </div>
    </div>

    <div style="width: 12px;"></div>

    <div class="flex-style-column rank-layout">
      <div class="flex-style-base">
        <div class="title-flag"></div>
        <span class="label-text">公益工作</span>
      </div>
      <div class="flex-style-base rank-item">
        <span class="rank-text rank-label">排名</span>
        <span class="name-text rank-label">姓名</span>
        <span class="score-text rank-label">分数</span>
      </div>

      <div v-for="(item, index) in level0s5RankList" class="flex-style-base rank-item"
           :class="{'rank-item-1' : (index === 0), 'rank-item-2' : (index === 1), 'rank-item-3' : (index === 2)}">
        <div v-if="index < 3" class="flex-style-base rank-text">
          <img v-if="index === 0" style="width: 32px;height: 32px;" src="../../../assets/images/rank-1.png"/>
          <img v-if="index === 1" style="width: 32px;height: 32px;" src="../../../assets/images/rank-2.png"/>
          <img v-if="index === 2" style="width: 32px;height: 32px;" src="../../../assets/images/rank-3.png"/>
        </div>
        <span v-if="index > 2" class="rank-text">{{ index + 1 }}</span>
        <span class="name-text">{{ item.strName }}</span>
        <span class="score-text">{{ item.score }}</span>
      </div>
    </div>


  </div>
</template>

<script>
import resize from "./mixins/resize";
import echartConfig from "@/utils/echartConfig";

export default {
  name: "CRFState",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    level0s1RankList: {
      type: [Object, Array],
      required: true,
    },
    level0s2RankList: {
      type: [Object, Array],
      required: true,
    },
    level0s3RankList: {
      type: [Object, Array],
      required: true,
    },
    level0s4RankList: {
      type: [Object, Array],
      required: true,
    },
    level0s5RankList: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {},
};
</script>

<style scoped lang="scss">
.rank-container {
  align-items: flex-start;
}

.rank-layout {
  width: 0;
  flex-grow: 1;
  height: 100%;
  background-color: #F8F9FB;
  padding: 12px;
}

.title-flag {
  width: 3px;
  height: 12px;
  background-color: #0066FF;
  margin-right: 8px;
  border-radius: 2px;
}

.rank-label {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #333333;
  line-height: 16px;
  font-weight: 500;
}

.rank-item {
  height: 26px;
  line-height: 26px;
  margin: 6px 0;
  font-size: 12px;
  padding: 0 12px;
}

.rank-item-1 {
  background-image: linear-gradient(90deg, rgba(253, 248, 213, 0.19) 3%, #FFF9DF 100%);
  border-radius: 2px;
}

.rank-item-2 {
  background-image: linear-gradient(90deg, rgba(220, 230, 240, 0.00) 3%, rgba(220, 230, 239, 0.51) 100%);
  border-radius: 2px;
}

.rank-item-3 {
  background-image: linear-gradient(90deg, rgba(251, 238, 222, 0.00) 3%, rgba(250, 237, 219, 0.64) 99%);
  border-radius: 2px;
}

.rank-item-bg-1 {
  background-image: url("../../../assets/images/rank-1.png");
  background-size: cover;
  background-position: center;
}

.rank-text {
  width: 60px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  line-height: 16px;
  font-weight: 400;
  text-align: center;
  justify-content: center;
}

.name-text {
  width: 60px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  line-height: 16px;
  font-weight: 400;
}

.score-text {
  width: 0px;
  flex-grow: 1;
  text-align: end;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  line-height: 16px;
  font-weight: 400;
}

.label-text {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
}

</style>
