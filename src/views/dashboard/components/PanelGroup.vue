<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="shangchuanwenjianshu" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总工单数</div>
          <count-to :start-val="0" :end-val="panelData.nAllOrder" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="weijihuobaogao" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">最近一月工单数</div>
          <count-to :start-val="0" :end-val="panelData.nMonthOrder" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="tree" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">最近一周工单数</div>
          <count-to :start-val="0" :end-val="panelData.nWeekOrder" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="fenxishibai" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">待工单数</div>
          <count-to :start-val="0" :end-val="panelData.nNeedRepair" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-five">
          <svg-icon icon-class="mu-repair2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">正在维修工单</div>
          <count-to :start-val="0" :end-val="panelData.nRepairing" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-six">
          <svg-icon icon-class="yijihuobaogao" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已完结工单</div>
          <count-to :start-val="0" :end-val="panelData.nOver" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>


  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to';

  export default {
    components: {
      CountTo
    },
    props: {
      panelData: {
        type: [Object, Array],
        default: () => {
          return {
            "nOver": 0,
            "nAllOrder": 0,
            "nNeedRepair": 0,
            "nRepairing": 0,
            "nWeekOrder": 0,
            "nMonthOrder": 0
          }
        },
        required: true
      }
    },
    data() {
      return {};
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 0px;

    .card-panel-col {
      margin-bottom: 16px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3;
        }

        .icon-five {
          background: #aa5500;
        }

        .icon-six {
          background: #005500;
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3;
      }

      .icon-five {
        color: #aa5500;
      }

      .icon-six {
        color: #005500;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        // float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
