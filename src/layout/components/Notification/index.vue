<template>
  <div class="notification-wrapper">
    <el-card v-for="(item) in notifications" :key="item.key" shadow="always" class="card-class">
      <div style="position: relative;" @click="downloadFile(item)">
        <h5>{{ item.percentage >= 100 ? '下载完成' : "正在下载..." }}</h5>
        <p class="single-text file-title">{{ item.title }}</p>
        <el-progress :text-inside="true" :stroke-width="16" :percentage="item.percentage" :color="customColors"
          text-color="#FFFFFF"></el-progress>
        <i class="el-icon-close close-icon" @click="handleClose(item)"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
import ResizeMixin from "../../mixin/ResizeHandler";
import { mapGetters } from "vuex";

export default {
  name: "Notification",
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["notifications"]),
  },
  data() {
    return {
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
    };
  },
  methods: {
    downloadFile(notification) {
      // console.log('downloadFile', notification)
      // if (notification.percentage < 100) {
      //   this.$message({
      //     message: "正在下载，请稍后打开",
      //     type: "warning",
      //   });
      //   return
      // }
      // const link = document.createElement("a")
      // const blob = notification.blob //new Blob([data], { type: "application/vnd.ms-excel" })
      // link.style.display = "none"
      // link.href = URL.createObjectURL(blob)

      // link.setAttribute("download", notification.title)
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
      // this.handleClose(notification)
    },
    handleClose(notification) {
      this.$store.dispatch('business/closeNotification', notification)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.notification-wrapper {
  position: fixed;
  width: 300px;
  right: 10px;
  top: 0px;
  z-index: 9999;
  overflow: scroll-y;
  max-height: 100vh;
}

.card-class {
  margin-top: 8px;
}

.close-icon {
  position: absolute;
  top: -10px;
  right: -12px;
  font-size: 20px;
}

.close-icon:hover {
  color: $jbPrimaryColor;
  cursor: pointer;
}

.file-title {
  color: #666666;
  margin-top: 8px;
  margin-bottom: 4px;
}
</style>
