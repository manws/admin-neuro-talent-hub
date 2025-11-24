<template>
  <div class="flex-style-base login-container">
    <div class="flex-style-base company-layout">
      <img :src="logo" style="height: 5rem; width: 5rem"/>
      <span class="company-text">宣武医院神经内科</span>
    </div>

    <div class="login-body">
      <div class="flex-style-base company-bg" style="position: relative;align-items: flex-start">
        <div class="flex-style-base" style="z-index: 100;position: relative;">
          <div class="system-text">宣武神内人才考核</div>
        </div>
        <img :src="companyBg" class="preview-img"/>
      </div>
      <div style="width: 29rem;height: 29rem;">
        <div class="flex-style-column form-container">
          <div class="login-text">修改密码</div>
          <el-input class="input" autocomplete="new-password" v-model="oldPwd" :type="passwordType"
                    placeholder="旧密码" name="oldPwd" tabindex="1" @focus="oldPwdFocus = true"
                    @blur="oldPwdFocus = false">
            <svg-icon slot="prefix" icon-class="password"
                      :color="oldPwdFocus ? 'rgba(31, 130, 255, 1)' : '#808695'"/>
            <span slot="suffix" class="show-pwd" @click="showPwd">
                            <svg-icon color="#666666"
                                      :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/></span>
          </el-input>

          <el-input class="input" autocomplete="new-password" v-model="userPwd" :type="passwordType"
                    placeholder="新密码" name="userPwd" tabindex="2" @focus="userPwdFocus = true"
                    @blur="userPwdFocus = false">
            <svg-icon slot="prefix" icon-class="password"
                      :color="userPwdFocus ? 'rgba(31, 130, 255, 1)' : '#808695'"/>
            <span slot="suffix" class="show-pwd" @click="showPwd">
                            <svg-icon color="#666666"
                                      :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/></span>
          </el-input>

          <el-input class="input" autocomplete="new-password" v-model="reuserPwd" :type="passwordType"
                    placeholder="再次输入新密码" name="reuserPwd" tabindex="3" @focus="reuserPwdFocus = true"
                    @blur="reuserPwdFocus = false" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="password"
                      :color="reuserPwdFocus ? 'rgba(31, 130, 255, 1)' : '#808695'"/>
            <span slot="suffix" class="show-pwd" @click="showPwd">
                            <svg-icon color="#666666"
                                      :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/></span>
          </el-input>
          <el-button class="btn-login" :loading="loading" type="primary"
                     @click.native.prevent="handleLogin">立即修改
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from "@/components/LangSelect";
import {title} from "@/settings";

export default {
  name: "Login",
  components: {
    LangSelect,
  },
  data() {
    return {
      title,
      logo: require("@/assets/images/logo.png"),
      companyBg: require("@/assets/images/company-bg.png"),
      oldPwdFocus: false,
      userPwdFocus: false,
      reuserPwdFocus: false,
      oldPwd: "",
      userPwd: "",
      reuserPwd: "",
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
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    async handleLogin() {
      if (
        !this.oldPwd ||
        !this.userPwd ||
        !this.reuserPwd
      ) {
        this.$message({
          message: "输入框内容不能为空",
          type: "warning",
        });
        return;
      } else if (this.userPwd !== this.reuserPwd) {
        this.$message({
          message: "两次输入新密码不一致，请检查！",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      const isSuccess = await this.service.changePwd({
        newPwd: this.userPwd,
        oldPwd: this.oldPwd,
      });
      if (isSuccess) {
        this.$message({
          message: "密码修改成功！",
          type: "success",
        });
        this.$router.replace(`/login`);
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
  background-image: url("../../assets/images/login-bg.jpg");
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
    margin-top: 24px;
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
    margin-top: 32px;
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

.company-text {
  font-family: PingFangSC-Medium;
  font-size: 28px;
  color: #FFFFFF;
  letter-spacing: 0;
  font-weight: 500;
  margin-left: 16px;
}

.system-text {
  font-family: PingFangSC-Medium;
  letter-spacing: 0;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-shadow: 0 2px 6px #00327D;
  font-weight: 600;
  margin-top: 31px;
}
</style>
