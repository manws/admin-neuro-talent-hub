<template>
  <div class="flex-style-base login-container">
    <div class="flex-style-base company-layout">
      <img :src="logo" style="height: 3.3125rem; width: 12.625rem" />
    </div>

    <div class="login-body">
      <div class="flex-style-base company-bg" style="position: relative;">
        <div class="flex-style-column" style="z-index: 100;position: relative;align-items: center;">
          <div class="system-text">宣海人才考核平台</div>
        </div>
        <img :src="companyBg" class="preview-img" />
      </div>
      <div style="width: 29rem;height: 29rem;">
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
          <el-button class="btn-login" :loading="loading" type="primary"
            @click.native.prevent="handleLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { title } from "@/settings";
import md5 from 'js-md5';

export default {
  name: "Login",
  data() {
    return {
      title,
      logo: require("@/assets/images/company-logo.png"),
      companyBg: require("@/assets/images/company-bg.png"),
      userCodeFocus: false,
      userPwdFocus: false,
      userCode: "",
      userPwd: "",
      passwordType: "password",
      loading: false,
      otherQuery: {},
    };
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
      let loginOn = parseInt(Date.now() / 1000);
      let sign = `userCode=${this.userCode}&&userPwd=${this.userPwd}&&loginOn=${loginOn}&&key=xhedc_jiangbo_wangshuang_123!@#`
      const param = {
        userCode: this.userCode,
        userPwd: this.userPwd,
        loginOn: loginOn,
        sign: md5(sign)
      };
      const loginSuccess = await this.service.login(param);
      if (loginSuccess) {
        this.$router.push({
          path: "/user",
        });
      }
      this.loading = false;
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
  justify-content: center;
  min-width: 37.5rem;


  .company-layout {
    position: fixed;
    left: 3rem;
    top: 3rem;
  }

  .login-body {
    width: 58rem;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .company-bg {
    width: 29rem;
    height: 29rem;
    justify-content: center;
    align-items: center;
  }

  .ctms {
    font-family: Arial-Black;
    font-size: 50px;
    color: $jbPrimaryColor;
    letter-spacing: 0;
    font-weight: 900;
  }

  .preview-img {
    width: 29rem;
    height: 29rem;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }

  .system-text {
    font-family: PingFangSC-Medium;
    font-size: 44px;
    color: $jbPrimaryColor;
    letter-spacing: 0;
    font-weight: 500;
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


  .form-container {
    width: 29rem;
    height: 29rem;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
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

  @media screen and (max-width: 900px) {

    .company-layout {
      left: calc(50% - 6.3125rem);
    }

    .company-bg {
      display: none;
    }

    .login-body {
      width: 29rem;
    }

    .form-container {
      border-radius: 8px;
    }
  }
}
</style>
