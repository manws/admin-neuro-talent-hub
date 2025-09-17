<template>
  <div
    :class="className"
    :style="{ height: height, width: width }"
    style="background-color: #ffffff"
    class="echart-class"
  />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import echartConfig from "@/utils/echartConfig";

export default {
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
        color: ["rgba(90,216,166,0.85)"],
        title: {
          show: true,
          text: "实验进展",
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


<style scoped>
.echart-class {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>