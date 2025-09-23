<template>
  <div class="login-container">
    <div class="bg-container">
      <p class="title">{{ title }}</p>
      <el-card class="box-card" shadow="always">
        <div class="img-container"><img class="img-class" :src="logo" /></div>
        <el-form
          class="login-form"
          autocomplete="on"
          label-position="right"
        >
          <div class="form-container">
            <el-form-item prop="mobile">
              <el-input
                ref="mobile"
                v-model="userCode"
                :placeholder="$t('login.username')"
                name="mobile"
                type="text"
                tabindex="1"
                autocomplete="on"
                @focus="userCodeFocus = true"
                @blur="userCodeFocus = false"
              >
                <svg-icon
                  slot="prefix"
                  icon-class="user"
                  style="margin-left: 6px;"
                  :color="userCodeFocus ? '#2B97EF' : '#808695'"
                />
              </el-input>
            </el-form-item>

            <el-form-item prop="password" style="margin-top: 30px;">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="userPwd"
                :type="passwordType"
                :placeholder="$t('login.password')"
                name="password"
                tabindex="2"
                autocomplete="new-password"
                @focus="userPwdFocus = true"
                @blur="userPwdFocus = false"
                @keyup.enter.native="handleLogin"
              >
                <svg-icon
                  slot="prefix"
                  icon-class="password"
                  style="margin-left: 6px;"
                  :color="userPwdFocus ? '#2B97EF' : '#808695'"
                />
                <span slot="suffix" class="show-pwd" @click="showPwd">
                  <svg-icon
                    color="#666666"
                    style="margin-right: 6px;"
                    :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                  />
                </span>
              </el-input>
            </el-form-item>
          </div>

          <div class="flex-style-base btn-container">
            <p>忘记密码？请联系管理员！</p>
            <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">
              {{ $t('login.login') }}
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect';
import { title } from '@/settings';
import md5 from 'js-md5';

export default {
  data() {
    return {
      title,
      logo: require('@/assets/images/icon.png'),
      userCodeFocus: false,
      userPwdFocus: false,
      userCode: "",
      userPwd: "",
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  mounted() {
    localStorage.clear();
    if (this.userCode === '') {
      this.$refs.mobile.focus();
    } else if (this.userPwd === '') {
      this.$refs.password.focus();
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      if (!this.userCode) {
        this.$message.error('请输入用户名');
      } else if (!this.userPwd) {
        this.$message.error('请输入密码');
      } else {
        this.loading = true;
        let loginOn = parseInt(Date.now() / 1000);
        let sign = `userCode=${this.userCode}&&userPwd=${this.userPwd}&&loginOn=${loginOn}&&key=xhedc_jiangbo_wangshuang_123!@#`
        const param = {
          userCode: this.userCode,
          userPwd: this.userPwd,
          loginOn: loginOn,
          sign: md5(sign)
        };
        this.$store.dispatch('user/login', param).then(
          () => {
            this.$router.push({ path: this.redirect || '/patient', query: this.otherQuery });
            this.loading = false;
          },
          err => {
            console.log(err)
            this.loading = false;
            this.$message.error('登录失败');
          }
        );
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: calc(100vw);
  height: calc(100vh);
  position: relative;

  .title {
    color: white;
    font-size: 2rem;
    height: 32px;
    line-height: 32px;
    top: calc(15vh - 16px);
    left: calc(10vw);
    position: inherit;
  }

  .img-container {
    overflow: hidden;
  }
  .img-class {
    height: 120px;
    margin: auto;
    display: block;
    overflow: hidden;
    position: relative;
    // filter: drop-shadow(0px 60px #409eff);
    // transform: translate(0, -60px);
    // -webkit-transform: translate(0, -60px);
    // -ms-transform: translate(0, -60px);
    // -o-transform: translate(0, -60px);
  }

  .bg-container {
    width: calc(100vw);
    height: calc(30vh);
    top: calc(35vh);
    position: absolute;
    background-image: url('../../assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
  }

  .box-card {
    top: calc(-10vh);
    right: calc(15vw);
    min-width: 350px;
    width: calc(25vw);
    height: calc(50vh);
    position: absolute;
    
    min-height: 400px;
  }

  .login-form {
    margin-top: 32px;
  }

  .btn-container {
    height: 80px;
    justify-content: space-between;

    p {
      font-family: microsoft sans serif;
      color: #666666;
    }
  }
}
</style>
