<template>
  <div class="flex-style-base navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <breadcrumb v-if="$store.getters.settings.showBreadcrumb" id="breadcrumb-container" class="breadcrumb-container" />

    <h4 class="title">
      {{ $store.getters.settings.title }}（{{
        $store.getters.project.projectCode
      }}）
    </h4>

    <div class="right-menu flex-style-base">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- v-if="$store.getters.settings.showFullscreen"  -->
        <screenfull id="screenfull" style="color: #ffffff; margin-right: 12px" class="right-menu-item hover-effect" />

        <el-tooltip v-if="$store.getters.settings.showSize" :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <lang-select v-if="$store.getters.settings.showLang" class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper flex-style-base">
          <img :src="headPortrait" class="user-avatar" />
          <span style="color: #ffffff; font-size: 14px; margin-left: 8px">{{
            $store.getters.user.userName
          }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t("navbar.dashboard") }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/change-pwd">
            <el-dropdown-item> 修改密码 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t("navbar.logOut") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    // Search
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
  },
  data() {
    return {
      headPortrait: require("@/assets/images/head-portrait.png"),
    };
  },
  mounted() { },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.service.logout();
      window.location.reload();
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--global-headerHeight);
  overflow: hidden;
  position: relative;
  background: $jbPrimaryTextColor;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  align-items: center;

  .title {
    color: #ffffff;
    flex: 1;
    font-size: 18px;
  }

  .hamburger-container {
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    margin-right: 16px;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 8px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
