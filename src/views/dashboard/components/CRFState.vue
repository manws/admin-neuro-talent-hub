<template>
  <div :class="className" :style="{ height: height, width: width }" style="background-color: #ffffff" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import echartConfig from "@/utils/echartConfig";

export default {
  name: "CRFState",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
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
    chartData: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
    },
    setOptions(chartData = {}) {
      let seriesData = this._.get(chartData, "values", []);
      let xAxisData = this._.get(chartData, "names", []);

      this.chart.setOption({
        color: ["rgba(246,189,22,0.85)"],
        title: {
          show: true,
          text: "CRF状态统计",
          textStyle: {
            color: "black",
          },
          top: 10,
          left: 16,
        },
        grid: {
          ...echartConfig.grid,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          padding: [5, 10],
        },
        xAxis: {
          data: xAxisData,
          ...echartConfig.xAxis,
          axisLabel: {
            interval: 0,
            color: 'rgba(0, 0, 0, 0.45)',
            fontSize: 12,
          },
        },
        yAxis: {
          ...echartConfig.yAxis,
        },
        series: [
          {
            name: "受试者数",
            data: seriesData,
            ...echartConfig.barSeries,
          },
        ],
      });
    },
  },
};
</script>
