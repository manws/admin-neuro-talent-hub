<template>
  <div :class="className" :style="{ height: height, width: width }" style="background-color: #ffffff" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

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
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartData);
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
      let data = [];
      let names = [];

      let seriesData = this._.get(chartData, "values", []);
      let xAxisData = this._.get(chartData, "names", []);
      for (let i = 0; i < xAxisData.length; i++) {
        names.push(xAxisData[i]);
        data.push({
          name: xAxisData[i],
          value: seriesData[i],
        });
      }

      this.chart.setOption({
        color: [
          "rgba(91,143,249,0.85)",
          "rgba(90,216,166,0.85)",
          "rgba(93,112,146,0.85)",
          "rgba(246,189,22,0.85)",
          "rgba(232,104,74,0.85)",
          "rgba(109,200,236,0.85)",
          "rgba(146,112,202,0.85)",
          "rgba(255,157,77,0.85)",
          "rgba(38,154,153,0.85)",
          "rgba(255,153,195,0.85)",
        ],
        title: {
          show: true,
          text: "",
          textStyle: {
            color: "black",
          },
          top: 10,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: names,
          right: "5%",
          top: "middle",
          orient: "vertical",
          textStyle: {
            color: "#8c8c8c",
          },
          icon: "circle",
          itemHeight: 8,
          itemWidth: 8,
        },
        series: [
          {
            name: "CRF数",
            type: "pie",
            radius: [65, 95],
            center: ["35%", "50%"],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false,
            },
            data: data,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
