<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    window.onTokenInvalid = () => {
      setTimeout(() => {
        this.$store.dispatch("user/resetToken").then((res) => {
          localStorage.clear();
          window.location.reload();
        });
      }, 2000);
    };
  },
};
</script>
