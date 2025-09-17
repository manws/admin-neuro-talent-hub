<template>
  <div :class="className" :style="{ height: height, width: width }" style="background-color: #ffffff"
    class="echart-class" />
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
      default: "350px",
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
        setTimeout(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 200);
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
    setOptions(chartData) {



      let names = [];
      let values = [];
      chartData.forEach((item) => {
        names.push(item.siteName);
        values.push(item.data);
      });
      this.chart.setOption({
        color: ["rgba(255,157,77,0.85)"],
        title: {
          show: true,
          text: "中心入组数",
          textStyle: {
            color: "black",
          },
          top: 10,
          left: 16,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          ...echartConfig.grid,
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            data: names,
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "rgba(0, 0, 0, 0.45)",
              fontSize: 12,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(0, 0, 0, 0.15)",
              },
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            data: values,
            ...echartConfig.barSeries,
            barMaxWidth: 28,
            label: {
              show: true,
              color: "rgba(0, 0, 0, 0.45)",
              position: "right",
            },
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