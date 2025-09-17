export default {
  grid: {
    top: 70,
    left: 20,
    right: 50,
    bottom: 20,
    containLabel: true
  },
  xAxis: {
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 12,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.15)'
      }
    },
    splitArea: {
      show: false
    }
  },
  yAxis: {
    minInterval: 1,
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 12,
    },
    axisLine: {
      show: false
    },
    splitArea: {
      show: false
    }
  },
  barSeries: {
    barMaxWidth: 44,
    // barWidth: "60%",
    type: 'bar',
    label: {
      show: true,
      color: 'rgba(0, 0, 0, 0.45)',
      position: 'top'
    },
    animationDuration: 2800,
    animationEasing: 'cubicInOut'
  }
}