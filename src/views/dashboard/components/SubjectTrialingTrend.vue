<template>
  <div
    :class="className"
    :style="{ height: height, width: width }"
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
    setOptions(repairMonthStat = {}) {
      let seriesData = [];
      let xAxisData = [];

      repairMonthStat.forEach((item) => {
        seriesData.push(item.data);
        xAxisData.push(item.month);
      });

      this.chart.setOption({
        color: ["#5B8FF9"],
        title: {
          show: false,
          text: "考核人数趋势",
          textStyle: {
            color: "black",
          },
          top: 10,
          left: 16,
        },
        grid: {
          ...echartConfig.grid,
          left: 30,
          top: 40,
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
          name: "人数",
          nameTextStyle: {
            color: '#999999',
            align: 'center',
            padding: [0, 0, 0, -30]
          },
          ...echartConfig.yAxis,
        },
        series: [
          // {
          //   name: "受试者数",
          //   data: seriesData,
          //   ...echartConfig.barSeries,
          // },
          {
            name: "受试者数",
            itemStyle: {
              normal: {
                color: "#0066FF",
                lineStyle: {
                  color: "#0066FF",
                  width: 2,
                },
              },
            },
            type: "line",
            data: seriesData,
            smooth: true,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
        ],
      });
    },
  },
};
</script>


<style scoped>
.echart-class {
  background-color: #F8F9FB;
}
</style>
