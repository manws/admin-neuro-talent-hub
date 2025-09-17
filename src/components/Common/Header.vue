<template>
  <div class="flex-style-base header-container">
    <div class="flex-style-base img-container">
      <img class="logo-img" :src="logo" />
    </div>
    <div class="title-container">{{ tick }}</div>
    <div class="right-container">
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img class="head-img" :src="headPortrait" />
          <span style="color: white">{{ $store.getters.user.userName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/change-pwd">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { tick } from "@/settings";
export default {
  name: "Header",
  data() {
    return {
      tick,
      logo: require("@/assets/images/logo.png"),
      headPortrait: require("@/assets/images/head-portrait.png"),
    };
  },
  mounted() {
  },
  methods: {
    async logout() {
      await this.service.logout();
      window.location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  width: calc(100vw);
  height: var(--global-headerHeight);
  line-height: var(--global-headerHeight);
  background-color: #5dc998;
}

.img-container {
  width: 216px;
  background-color: #52b287;
  height: inherit;
  //   cursor: pointer;
  z-index: 100;
  justify-content: center;
}

.img-container:hover {
  // background-color: #2c6c4a;
}

.logo-img {
  height: 50%;
}

.title-container {
  color: #ffffff;
  margin-left: 16px;
  font-size: 20px;
  font-family: "microsoft sans serif";
  font-weight: 500;
}

.right-container {
  display: inline-block;
  position: absolute;
  font-family: "microsoft sans serif";
  right: 16px;
  top: 0;
  bottom: 0;
}

.head-img {
  height: 32px;
  width: 32px;
  margin-left: 20px;
  margin-right: 8px;
}

.avatar-container {
  margin-right: 8px;

  .avatar-wrapper {
    position: relative;
    cursor: pointer;

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}

.interfece-enter {
  font-size: 18px;
  margin-left: 20vw;
  font-weight: 600;
  height: 100%;
  width: 200px;
  text-align: center;
  cursor: pointer;
}

.interfece-enter:hover {
  color: #ffffff;
  background: black;
}
</style>
