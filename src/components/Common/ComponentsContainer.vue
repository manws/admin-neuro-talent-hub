<template>
  <div
    class="components-container"
    :style="{ height: bodyHeight, 'background-color': bodyColor }"
  >
    <div
      class="flex-style-column card"
      :style="{ 'background-color': cardBgColor }"
    >
      <slot style="height: calc(100%)"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ComponentsContainer",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tagsView: (state) => state.settings.tagsView,
    }),
    bodyHeight: function () {
      // 处理固定Tabview的情况
      if (this.isScroll) {
        return this.tagsView ? "calc(100vh - 84px)" : "calc(100vh - 56px)";
      }
      return "inherit";
    },
  },
  props: {
    isScroll: {
      type: Boolean,
      default: true,
    },
    bodyColor: {
      type: String,
      default: "#f8f8f8",
    },
    cardBgColor: {
      type: String,
      default: "#ffffff",
    },
  },
};
</script>

<style scoped lang="scss">
.components-container {
  position: relative;
  margin: 0;
  background-color: #f5f6f7;
  padding: 12px 10px 12px 12px;
  min-height: 200px;
  min-width: 800px;

  .card {
    width: 100%;
    height: calc(100% - 10px);
    margin-top: 10px;
    background-color: #ffffff;
    border-radius: 12px;
  }
}
</style>
