<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link">
        <img v-if="logo" :src="icon" class="sidebar-logo"/>
      </div>
      <div v-else key="expand" class="flex-style-base sidebar-logo-link">
        <img v-if="logo" :src="logo" class="sidebar-logo"/>
        <h4 style="font-size: 16px;color: #FFFFFF;margin-left: 12px;">宣武神内人才考核</h4>
      </div>
    </transition>
  </div>
</template>

<script>
import {tick} from "@/settings";

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tick,
      logo: require("@/assets/images/logo2.png"),
      icon: require("@/assets/images/logo2.png"),
    };
  },
  methods: {
    toProject() {
      this.$store
        .dispatch("tagsView/delAllViews")
        .then(({visitedViews}) => {
          this.$router.replace({
            name: "project",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  // background: $jbSubPrimaryColor;
  overflow: hidden;
  cursor: pointer;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 25px;
      vertical-align: middle;
      margin-left: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

.sidebar-logo-container:hover {
  background: $jbPrimaryColor;
}
</style>
