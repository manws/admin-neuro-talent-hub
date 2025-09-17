<template>
  <div class="login-container">
    <el-form class="flex-style-column login-form" autocomplete="on" label-position="right" label-width="80px">
      <div class="flex-style-column" style="align-items: center">
        <img :src="logo" style="height: 60px; width: 210px" />
        <p class="system-title">{{ title }}</p>
      </div>

      <div class="flex-style-column form-container">
        <div class="login-text">用户登录</div>
        <el-input ref="userCode" v-model="userCode" class="input" placeholder="请输入账号" name="userCode" type="text"
          tabindex="1" autocomplete="on" @focus="userCodeFocus = true" @blur="userCodeFocus = false">
          <icon-font slot="prefix" icon="user" :color="userCodeFocus ? 'rgba(0, 152, 108, 1)' : '#808695'" />
        </el-input>

        <el-input :key="passwordType" ref="userPwd" v-model="userPwd" class="input" :type="passwordType"
          placeholder="请输入密码" name="userPwd" tabindex="2" autocomplete="new-password" @focus="userPwdFocus = true"
          @blur="userPwdFocus = false" @keyup.enter.native="handleLogin">
          <icon-font slot="prefix" icon="lock" :color="userPwdFocus ? 'rgba(0, 152, 108, 1)' : '#808695'" />
          <span slot="suffix" class="show-pwd" @click="showPwd">
            <icon-font color="#666666" :icon="passwordType === 'password' ? 'hide' : 'browse'" />
          </span>
        </el-input>
        <el-button class="btn-login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import LangSelect from "@/components/LangSelect";
import { title } from "@/settings";

export default {
  name: "Login",
  components: { LangSelect },
  data() {
    return {
      title,
      logo: require("@/assets/images/logo.png"),
      userCodeFocus: false,
      userPwdFocus: false,
      userCode: "",
      userPwd: "",
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    await this.service.clear();
    if (this.userCode === "") {
      this.$refs.userCode.focus();
    } else if (this.userPwd === "") {
      this.$refs.userPwd.focus();
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.userPwd.focus();
      });
    },
    async handleLogin() {
      this.loading = true;
      const param = {
        userCode: this.userCode,
        userPwd: this.userPwd,
      };
      const loginSuccess = await this.service.login(param);
      if (loginSuccess) {
        this.$router.push({
          path: this.redirect || "/project",
          query: this.otherQuery,
        });
      }
      this.loading = false;
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: calc(100vh);
  width: calc(100vw);
  overflow: hidden;
  background-image: url("../../assets/images/login-bg.png");
  background-size: cover;
  background-position: center;

  .system-title {
    color: white;
    font-size: 50px;
    font-weight: 500;
    margin-top: 24px;
  }

  .login-text {
    font-size: 30px;
    color: #333333;
    line-height: 26px;
    font-weight: 500;
    margin-top: 50px;
    margin-bottom: 42px;
  }

  .input {
    margin: 0 32px;
    line-height: 40px;
    margin-top: 32px;
    width: calc(100% - 64px);
  }

  .forget-pwd {
    font-size: 14px;
    color: $jbPrimaryColor;
    margin-top: 12px;
    align-self: flex-end;
    margin-right: 32px;
    cursor: pointer;
  }

  .forget-pwd:hover {
    font-weight: bold;
  }

  .btn-login {
    margin: 0 32px;
    margin-top: 50px;
    width: calc(100% - 64px);
    color: #fff;
    background-color: $jbPrimaryColor;
    border-color: $jbPrimaryColor;
    opacity: 0.8;
  }

  .btn-login:hover,
  .btn-login:focus {
    opacity: 1;
  }

  .login-form {
    position: relative;
    width: 40%;
    min-width: 600px;
    max-width: 90%;
    margin: 0 auto;
    margin-top: calc(16vh);
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
  }

  .form-container {
    width: 550px;
    height: 460px;
    margin-top: 32px;
    border-radius: 8px;
    background-color: white;
    align-items: center;
    justify-content: flex-start;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
