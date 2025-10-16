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
      required: true
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
    setOptions(chartData = []) {
      // 处理箱线图数据
      const boxplotData = chartData.map((item, index) => {
        // 箱线图数据格式: [min, Q1, median, Q3, max]
        // 这里假设 dMin=最小值, dAvg=Q1, dMid=中位数, dMax=Q3和最大值
        return [
          item.dMin,           // 最小值
          item.dQ1_4,           // Q1 (第一四分位数)
          item.dMid,           // 中位数
          item.dQ3_4,  // Q3 (第三四分位数)
          item.dMax            // 最大值
        ];
      });

      const names = ['医疗工作', '教学工作', '科研工作', '人才培养', '公益工作']
      // 生成类别标签
      const categories = chartData.map((_, index) => names[index]);

      this.chart.setOption({
        title: {
          show: false,
          text: "考核分数分布箱线图",
          textStyle: {
            color: "black",
          },
          top: 10,
          left: 16,
        },
        grid: {
          ...echartConfig.grid,
          top: 40,
        },
        tooltip: {
          trigger: 'item',
          formatter: function (param) {
            return [
              '类别: ' + param.name,
              '最大值: ' + param.data.value[5],
              'Q3: ' + param.data.value[4],
              '中位数: ' + param.data.value[3],
              'Q1: ' + param.data.value[2],
              '最小值: ' + param.data.value[1]
            ].join('<br/>');
          },
        },
        xAxis: {
          type: 'category',
          data: categories,
          ...echartConfig.xAxis,
        },
        yAxis: {
          name: "分数",
          nameTextStyle: {
            color: '#999999',
            align: 'center',
            padding: [0, 0, 0, -30]
          },
          ...echartConfig.yAxis,
        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            data: boxplotData.map((item, index) => {
              const colors = ['#1072FF99', '#2BD18F99', '#FFBB0099', '#9E90F599', '#FB7C7B99'];
              const borderColors = ['#1072FF', '#2BD18F', '#FFBB00', '#9E90F5', '#FB7C7B'];
              return {
                value: item,
                itemStyle: {
                  color: colors[index % colors.length],
                  borderColor: borderColors[index % colors.length]
                }
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            smooth: true,
            animationDuration: 800,
            animationEasing: "cubicInOut",
          }
        ]
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
